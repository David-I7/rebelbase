import { getGameById, getHomeData, getMoreFromCompany } from "@/services/igdb";
import getOrSetCache from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import VerticalCardCarousel from "./_components/gameRepresentation/verticalCard/VerticalCardCarousel";
import HorizontalCardCarousel from "./_components/gameRepresentation/horizontalCard/HorizontalCardCarousel";
import VerticalListSection from "./_components/gameRepresentation/list/VerticalListSection";
import HeroSection from "./_components/gameRepresentation/hero/HeroSection";

export default async function Home() {
  const { data: gameData, error: gameError } = await getOrSetCache(
    CACHE_KEYS.homePage,
    getHomeData
  );
  if (gameError) throw gameError;

  return (
    <main className="lg:px-8 max-w-[1280px] mx-auto mt-8">
      <HeroSection gameData={gameData?.topNewReleases.result} />
      <div className="px-4 lg:px-0">
        <HorizontalCardCarousel
          heading="Most Anticipated"
          gameData={gameData?.mostAnticipated.result}
        />
        <VerticalCardCarousel
          heading="Top Rated"
          gameData={gameData?.topRated.result}
        />
        <VerticalListSection
          firstSectionHeading="Offline Games"
          secondSectionHeading="Online Games"
          thirdSectionHeading="Casual Games"
          firstSectionData={gameData?.offlineAndOnlineGames.result.offlineGames}
          secondSectionData={gameData?.offlineAndOnlineGames.result.onlineGames}
          thirdSectionData={gameData?.casualGames.result}
        />

        <HorizontalCardCarousel
          heading="Upcoming Releases"
          gameData={gameData?.upcomingReleases.result}
        />
      </div>
    </main>
  );
}
