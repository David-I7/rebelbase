import { getHomeData } from "@/services/igdb";
import getOrSetCache from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import VerticalCardCarousel from "./_components/gameRepresentation/verticalCard/VerticalCardCarousel";
import HorizontalCardCarousel from "./_components/gameRepresentation/horizontalCard/HorizontalCardCarousel";
import VerticalListSection from "./_components/gameRepresentation/list/VerticalListSection";
import HeroSection from "./_components/gameRepresentation/hero/HeroSection";
import MostAnticipated from "./_components/sections/MostAnticipated";

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
      <div className="flex flex-col [@media(min-width:1280px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 lg:ml-8">
        <MostAnticipated gameData={gameData?.mostAnticipated.result} />
        <VerticalCardCarousel
          heading="Top Rated"
          gameData={gameData?.topRated.result}
        />
      </div>
      <div className="max-w-[1280px] mx-auto">
        <VerticalListSection
          firstSectionHeading="Offline Games"
          secondSectionHeading="Online Games"
          thirdSectionHeading="Casual Games"
          firstSectionData={gameData?.offlineAndOnlineGames.result.offlineGames}
          secondSectionData={gameData?.offlineAndOnlineGames.result.onlineGames}
          thirdSectionData={gameData?.casualGames.result}
        />
      </div>
      <div className="[@media(min-width:1280px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 lg:ml-8">
        {/* <HorizontalCardCarousel
          heading="Upcoming Releases"
          gameData={gameData?.upcomingReleases.result}
        /> */}
      </div>
    </main>
  );
}
