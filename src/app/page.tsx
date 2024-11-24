import { getGameById, getHomeData, getMoreFromCompany } from "@/services/igdb";

export default async function Home() {
  const { data: gameData, error: gameError } = await getGameById(119133);
  if (gameError) throw gameError;
  const { data, error } = await getMoreFromCompany(
    gameData![0]["involved_companies"]
  );
  console.log(gameData![0]["involved_companies"]);
  console.log(data);

  return <main className=""></main>;
}
