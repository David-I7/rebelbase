import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameNews } from "@/services/worldNewsApi";

export default async function Media() {
  const { data, error } = await getOrSetCache(CACHE_KEYS.gameNews, getGameNews);
  if (error) throw error;

  console.log(data);

  return <main>hello Media</main>;
}
