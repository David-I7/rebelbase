import { Suspense } from "react";
import GameNewsData from "./_components/gameNews/GameNewsData";
import HeroNewsSkeleton from "@/_components/skeletons/gameNews/HeroNewsSkeleton";
import RegularNewsSkeleton from "@/_components/skeletons/gameNews/RegularNewsSkeleton";
import TopGamingChannels from "./_components/youtube/TopGamingChannels";
import GamingMemes from "./_components/memes/GamingMemes";
import GamingEvents from "./_components/gameEvents/GamingEvents";
import YoutubeCreatorsSkeleton from "@/_components/skeletons/youtube/YoutubeCreatorsSkeleton";
import GameEventsSkeleton from "@/_components/skeletons/gameEvents/GameEventsSkeletonCarousel";
import MemesSkeleton from "@/_components/skeletons/memes/MemeCardSkeletonCarousel";
import SkipSections from "@/_components/nonPrimitives/skipSection/SkipSections";
import PageTransition from "@/_components/primitives/loading/PageTransition";
import TestUseEffect from "@/_components/test/TestUseEffect";

const sectionIds = [
  "gamingNews",
  "gamingCreators",
  "gamingEvents",
  "gamingMemes",
] as const;

const labels = ["News", "Creators", "Events", "Memes"] as const;

export default function Media() {
  return (
    <main className="">
      <div className="px-4 md:px-8 [@media(min-width:1344px)]:px-0 sticky top-0 flex sm:justify-center scroll-hidden z-20 bg-surface-container-lowest overflow-x-auto ">
        <SkipSections
          customClass="max-w-[1280px] flex-1"
          sectionIds={sectionIds}
          labels={labels}
        />
      </div>

      <Suspense
        fallback={
          <section
            id={sectionIds[0]}
            className="max-w-[1280px] mt-6 scroll-mt-20 mx-4 md:mx-8 [@media(min-width:1344px)]:mx-auto "
          >
            <HeroNewsSkeleton />
            <RegularNewsSkeleton />
          </section>
        }
      >
        <GameNewsData sectionId={sectionIds[0]} />
      </Suspense>
      <Suspense
        fallback={
          <section
            className="max-w-[1280px] mt-20 scroll-mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:mx-auto "
            id={sectionIds[1]}
          >
            <YoutubeCreatorsSkeleton />
          </section>
        }
      >
        <TopGamingChannels sectionId={sectionIds[1]} />
      </Suspense>
      <Suspense
        fallback={
          <section
            className="mt-20 scroll-mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)]"
            id={sectionIds[2]}
          >
            <GameEventsSkeleton />
          </section>
        }
      >
        <GamingEvents sectionId={sectionIds[2]} />
      </Suspense>
      <Suspense
        fallback={
          <section
            className="mt-20 scroll-mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] "
            id={sectionIds[3]}
          >
            <MemesSkeleton />
          </section>
        }
      >
        <GamingMemes sectionId={sectionIds[3]} />
      </Suspense>
      <PageTransition />
    </main>
  );
}
