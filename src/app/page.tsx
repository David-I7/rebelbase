import { getHomeData } from "@/services/igdb";

export default async function Home() {
  // const topRatedPromise = getTopRated();
  // const topNewRealesesPromise = getTopNewReleases();
  // const mostAnticipatedPromise = getMostAnticipated();
  const { data, error } = await getHomeData();
  // const { data: data2, error: error2 } = await getOnlineGames();
  if (error) throw error;
  // if (error2) throw error2;
  console.log(data);

  // const { data, error } = await testQuery();
  // console.log(data);

  // const data = Promise.all([
  //   topRatedPromise,
  //   topNewRealesesPromise,
  //   mostAnticipatedPromise,
  // ]);

  // (await data).map((res) => {
  //   if (res.error) {
  //     throw res.error;
  //   }

  //   console.log(res.data);
  // });

  return <main className=""></main>;
}
