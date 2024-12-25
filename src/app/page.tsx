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
import PageTransition from "@/_components/primitives/loading/PageTransition";
import VerticalListSection from "./_components/gameRepresentation/list/VerticalListSection";
import VerticalListSkeleton from "@/_components/skeletons/list/VerticalListItemSkeleton";
import VerticalCardSkeleton from "@/_components/skeletons/cards/VerticalCardSkeleton";
import CardDetailsSkeleton from "@/_components/skeletons/cards/CardDetailsSkeleton";
import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";

// function createListFromComponent(
//   Component: React.JSX.Element,
//   itemCount: number,
//   key: string
// ): React.JSX.Element[] {
//   const components: ReturnType<typeof createListFromComponent> = [];

//   for (let i = 0; i < itemCount; i++) {
//     components.push(<Component key={`${key}_${i}`} />);
//   }

//   return components;
// }

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
        <FixedSizeCarousel>
          <VerticalCardSkeleton>
            <CardDetailsSkeleton type="RATING" />
          </VerticalCardSkeleton>
        </FixedSizeCarousel>
      </div>
      <div className="max-w-[1280px] [@media(min-width:1344px)]:mx-auto ml-4 md:ml-8">
        <VerticalListSection>
          <OfflineGames gameData={gameData?.offlineGames.result} />
          <VerticalRay />
          <OnlineGames gameData={gameData?.onineGames.result} />
          <VerticalRay />
          <CasualGames gameData={gameData?.casualGames.result} />
        </VerticalListSection>
      </div>
      <div className="[@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <UpcomingReleases gameData={gameData?.upcomingReleases.result} />
      </div>
      <PageTransition />
    </main>
  );
}
