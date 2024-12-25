import { getHomeData } from "@/services/igdb";
import getOrSetCache from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import HeroSection from "./_components/gameRepresentation/hero/HeroSection";
import MostAnticipated from "./_components/sections/MostAnticipated";
import UpcomingReleases from "./_components/sections/UpcomingReleases";
import TopRated from "./_components/sections/TopRated";
import OfflineGames from "./_components/sections/OfflineGames";
import OnlineGames from "./_components/sections/OnlineGames";
import CasualGames from "./_components/sections/CasualGames";
import VerticalRay from "@/_components/VerticalRay";
import Test from "@/_components/test/TestUseQuery";
import TestUseEffect from "@/_components/test/TestUseEffect";
import PageTransition from "@/_components/primitives/loading/PageTransition";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

export default async function Home() {
  const { data: gameData, error: gameError } = await getOrSetCache(
    CACHE_KEYS.homePage,
    getHomeData
  );
  if (gameError) throw gameError;

  return (
    <main>
      <div className="max-w-[1280px] mx-auto mt-8">
        <HeroSection gameData={gameData?.topNewReleases.result} />
      </div>
      <div className="flex flex-col [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <MostAnticipated gameData={gameData?.mostAnticipated.result} />
        <TopRated gameData={gameData?.topRated.result} />
      </div>
      <div className="max-w-[1280px] [@media(min-width:1344px)]:mx-auto ml-4 md:ml-8">
        <DynamicSizeCarousel>
          <OfflineGames gameData={gameData?.offlineGames.result} />
          <VerticalRay />
          <OnlineGames gameData={gameData?.onineGames.result} />
          <VerticalRay />
          <CasualGames gameData={gameData?.casualGames.result} />
        </DynamicSizeCarousel>
      </div>
      <div className="[@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <UpcomingReleases gameData={gameData?.upcomingReleases.result} />
      </div>
      <PageTransition />
    </main>
  );
}
