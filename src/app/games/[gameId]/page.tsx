import { getGameById, getMoreFromCompany } from "@/services/igdb";
import { notFound } from "next/navigation";
import MoreByCompany from "./_components/gameSections/MoreByCompany";
import { getDeveloperCompany } from "@/utils/dataTransformation";
import { CardData } from "@/interfaces/igdb";
import SimilarGames from "./_components/gameSections/SimilarGames";
import HeroSection from "./_components/gameSections/HeroSection";
import MediaSection from "./_components/gameSections/media/MediaSection";
import AboutGame from "./_components/gameSections/about/AboutGame";

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
      <div className="max-w-[1280px] [@media(min-width:1344px)]:mx-auto">
        <MediaSection game={gameData!.result!} />
        <div className="mx-4 lg:mx-8 [@media(min-width:1344px)]:mx-0">
          <AboutGame game={gameData!.result!} />
          <SimilarGames similarGames={gameData!.result[0]["similar_games"]} />
          <MoreByCompany
            data={companyData}
            gameId={gameData!.result[0].id}
            developerCompanyName={company.developerCompanyName}
          />
        </div>
      </div>
    </main>
  );
}
