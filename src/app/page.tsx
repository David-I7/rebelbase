import { getGameById, getHomeData, getMoreFromCompany } from "@/services/igdb";
import getOrSetCache from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import VerticalCardCarousel from "./_components/gameRepresentation/verticalCard/VerticalCardCarousel";
import HorizontalCardCarousel from "./_components/gameRepresentation/horizontalCard/HorizontalCardCarousel";
import VerticalList from "./_components/gameRepresentation/list/VerticalList";
import VerticalListSection from "./_components/gameRepresentation/list/VerticalListSection";
import HeroSection from "./_components/gameRepresentation/hero/HeroSection";
import Test from "@/_components/test/Test";

export default async function Home() {
  const { data: gameData, error: gameError } = await getOrSetCache(
    CACHE_KEYS.homePage,
    getHomeData
  );
  if (gameError) throw gameError;

  return (
    <main>
      <HeroSection gameData={gameData?.topNewReleases.result} />
      <div className="px-4">
        <HorizontalCardCarousel gameData={gameData?.mostAnticipated.result} />
        <VerticalCardCarousel gameData={gameData?.topRated.result} />
        <VerticalListSection
          firstSectionData={gameData?.offlineAndOnlineGames.result.offlineGames}
          secondSectionData={gameData?.offlineAndOnlineGames.result.onlineGames}
          thirdSectionData={gameData?.casualGames.result}
        />

        <HorizontalCardCarousel gameData={gameData?.upcomingReleases.result} />
      </div>
    </main>
  );
}
