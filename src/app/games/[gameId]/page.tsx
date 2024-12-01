import { getGameById, getMoreFromCompany } from "@/services/igdb";
import { notFound } from "next/navigation";
import GameMetadata from "./_components/GameMetadata";
import MoreByCompany from "./_components/gameSections/MoreByCompany";

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

  const { data: companyData, error: moreFromCompanyError } =
    await getMoreFromCompany(gameData?.[0]?.involved_companies);

  return (
    <main>
      <GameMetadata game={gameData!} />
      <MoreByCompany gameData={companyData} />
      {/* <SimilarGames gameData={gameData![0]?.similar_games} /> */}
    </main>
  );
}
