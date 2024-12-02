import { getGameById, getMoreFromCompany } from "@/services/igdb";
import { notFound } from "next/navigation";
import GameMetadata from "./_components/GameMetadata";
import MoreByCompany from "./_components/gameSections/MoreByCompany";
import { getDeveloperCompany } from "@/utils/dataTransformation";
import { CardData } from "@/interfaces/igdb";
import GameIdentifier from "./_components/GameIdentifier";
import SimilarGames from "./_components/gameSections/SimilarGames";
import HeroSection from "./_components/gameSections/HeroSection";

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

  const company = getDeveloperCompany(gameData?.[0]?.involved_companies);

  let companyData: Promise<DataOrError<CardData[], Error>> | undefined;

  if (company.developerCompanyId) {
    companyData = getMoreFromCompany(
      company.developerCompanyId,
      gameData?.[0]?.involved_companies
    );
  }

  return (
    <main>
      <HeroSection
        game={gameData!}
        developerCompanyName={company.developerCompanyName}
      />
      <SimilarGames similarGames={gameData![0]?.similar_games} />
      <MoreByCompany
        data={companyData}
        gameId={gameData![0].id}
        developerCompanyName={company.developerCompanyName}
      />
    </main>
  );
}
