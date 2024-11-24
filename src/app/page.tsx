import { getGameById, getHomeData, getMoreFromCompany } from "@/services/igdb";
import getOrSetCache from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import VerticalCardCarousel from "./_components/gameRepresentation/verticalCard/VerticalCardCarousel";

export default async function Home() {
  const { data: gameData, error: gameError } = await getOrSetCache(
    CACHE_KEYS.homePage,
    getHomeData
  );
  if (gameError) throw gameError;

  return (
    <main className="px-4">
      <VerticalCardCarousel gameData={gameData?.topRated.result} />
    </main>
  );
}
