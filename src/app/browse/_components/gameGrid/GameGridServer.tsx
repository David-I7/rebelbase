import { CardData } from "@/interfaces/igdb";
import GameGrid from "./GameGrid";

const GameGridServer = async ({
  gameData,
}: {
  gameData: Promise<DataOrError<CardData[], Error>>;
}) => {
  const { data, error } = await gameData;

  if (error) throw error;

  return <GameGrid gameData={data!} />;
};

export default GameGridServer;
