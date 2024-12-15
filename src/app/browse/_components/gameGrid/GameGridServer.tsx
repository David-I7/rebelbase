import { CardData } from "@/interfaces/igdb";
import GameGrid from "./GameGrid";

const GameGridServer = async ({
  gameData,
  sortBy,
}: {
  gameData: Promise<DataOrError<CardData[], Error>>;
  sortBy: "newReleases" | "upcomingReleases" | "topRated";
}) => {
  const { data, error } = await gameData;

  if (error) throw error;

  return <GameGrid sortBy={sortBy} gameData={data!} />;
};

export default GameGridServer;
