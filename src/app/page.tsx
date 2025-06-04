import { getHomeData } from "@/services/igdb";
import CACHE_KEYS, { DEFAULT_CACHE_EXPIRATION } from "@/data/constants/cache";
import { unstable_cache } from "next/cache";
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
import { Suspense } from "react";
import LoadingHome from "@/_components/skeletons/HomeSkeleton";
import { getIGDBAccessToken } from "@/services/twitch";
import GameEventsSkeleton from "@/_components/skeletons/gameEvents/GameEventsSkeletonCarousel";
import GamingEvents from "./_components/sections/gameEvents/GamingEvents";

export default function Home() {
  return (
    <Suspense fallback={<LoadingHome />}>
      <HomePage />
    </Suspense>
  );
}

const cachedGetHomeData = unstable_cache(getHomeData, [CACHE_KEYS.homePage], {
  revalidate: DEFAULT_CACHE_EXPIRATION,
});

async function HomePage() {
  const { data: twitchAccessToken, error: err } = await getIGDBAccessToken();
  if (err) throw err;
  const { data: gameData, error: gameError } = await cachedGetHomeData(
    twitchAccessToken!.access_token
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
      <div className="[@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] ml-4 md:ml-8">
        <section className="mt-20">
          <Suspense fallback={<GameEventsSkeleton />}>
            <GamingEvents />
          </Suspense>
        </section>
      </div>
      <PageTransition />
    </main>
  );
}
