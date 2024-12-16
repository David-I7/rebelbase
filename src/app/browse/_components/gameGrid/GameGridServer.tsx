import { CardData } from "@/interfaces/igdb";
import GameGrid from "./GameGrid";

const GameGridServer = async ({
  gameData,
  sortBy,
  qs,
}: {
  gameData: Promise<DataOrError<CardData[], Error>>;
  sortBy: "newReleases" | "upcomingReleases" | "topRated";
  qs: string;
}) => {
  const { data, error } = await gameData;

  if (error) throw error;

  return <GameGrid qs={qs} sortBy={sortBy} gameData={data!} />;
};

export default GameGridServer;
