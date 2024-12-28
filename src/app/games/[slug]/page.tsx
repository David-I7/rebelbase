import { getGameBySlug, getMoreFromCompany } from "@/services/igdb";
import { notFound } from "next/navigation";
import MoreByCompany from "./_components/gameSections/MoreByCompany";
import { getDeveloperCompany } from "@/utils/dataTransformation";
import { CardData } from "@/interfaces/igdb";
import SimilarGames from "./_components/gameSections/SimilarGames";
import HeroSection from "./_components/gameSections/HeroSection";
import MediaSection from "./_components/gameSections/media/MediaSection";
import AboutGame from "./_components/gameSections/about/AboutGame";
import { Suspense } from "react";
import VerticalListSkeleton from "@/_components/skeletons/list/VerticalListItemSkeleton";
import PageTransition from "@/_components/primitives/loading/PageTransition";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
  {
    params,
  }: {
    params: Promise<{ slug: string | number }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const rawSlug = (await params).slug;

  const { data: gameData, error } = await getGameBySlug(rawSlug);

  if (error) return notFound();

  return {
    title: `${gameData?.result[0].name} - RebelBase`,
    description: (await parent).description,
  };
};

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string | number }>;
}) {
  const rawSlug = (await params).slug;

  const { data: gameData, error } = await getGameBySlug(rawSlug);

  if (error) return notFound();

  const company = getDeveloperCompany(gameData!.result[0]?.involved_companies);

  let companyData: Promise<DataOrError<CardData[], Error>> | undefined;

  if (company.developerCompanyId) {
    companyData = getMoreFromCompany(
      company.developerCompanyId,
      gameData!.accessToken!,
      gameData!.result[0]?.involved_companies
    );
  }

  return (
    <main>
      <HeroSection
        game={gameData!.result!}
        developerCompanyName={company.developerCompanyName}
      />
      <div className="game-grid mt-16 mx-4 md:mx-8 max-w-[1280px] [@media(min-width:1344px)]:mx-auto">
        <MediaSection game={gameData!.result!} />
        <AboutGame game={gameData!.result!} />
        <div className="grid gap-12 content-start">
          <SimilarGames similarGames={gameData!.result[0]["similar_games"]} />
          {company.developerCompanyName && (
            <Suspense
              fallback={
                <VerticalListSkeleton
                  sectionName={`More by ${company.developerCompanyName}`}
                />
              }
            >
              <MoreByCompany
                data={companyData}
                gameId={gameData!.result[0].id}
                developerCompanyName={company.developerCompanyName}
              />
            </Suspense>
          )}
        </div>
      </div>
      <PageTransition />
    </main>
  );
}
