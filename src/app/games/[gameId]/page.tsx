import { getGameById, getMoreFromCompany } from "@/services/igdb";
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

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const gameId = (await params).gameId;

  if (isNaN(Number(gameId))) return notFound();

  const { data: gameData, error: gameDataError } = await getGameById(
    Number(gameId)
  );

  if (gameDataError) return notFound();

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
          <Suspense fallback={<VerticalListSkeleton />}>
            <MoreByCompany
              data={companyData}
              gameId={gameData!.result[0].id}
              developerCompanyName={company.developerCompanyName}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
