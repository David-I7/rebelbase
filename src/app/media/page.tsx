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
import { Metadata } from "next";

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
      <section
        id={sectionIds[0]}
        className="max-w-[1280px] mt-6 scroll-mt-[79px] mx-4 md:mx-8 [@media(min-width:1344px)]:mx-auto"
      >
        <Suspense
          fallback={
            <>
              <HeroNewsSkeleton />
              <RegularNewsSkeleton />
            </>
          }
        >
          <GameNewsData />
        </Suspense>
      </section>
      <section
        className="scroll-mt-[79px] max-w-[1280px] mt-20 ml-4 md:ml-8 [@media(min-width:1344px)]:mx-auto"
        id={sectionIds[1]}
      >
        <Suspense fallback={<YoutubeCreatorsSkeleton />}>
          <TopGamingChannels />
        </Suspense>
      </section>
      <section
        id={sectionIds[2]}
        className="mt-20 scroll-mt-[79px] ml-4 md:ml-8 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)]"
      >
        <Suspense fallback={<GameEventsSkeleton />}>
          <GamingEvents />
        </Suspense>
      </section>

      <section
        id={sectionIds[3]}
        className="mt-20 scroll-mt-[79px] ml-4 md:ml-8 [@media(min-width:1344px)]:ml-[calc((100vw_-_1280px)_/_2)] "
      >
        <Suspense fallback={<MemesSkeleton />}>
          <GamingMemes />
        </Suspense>
      </section>
      <PageTransition />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Media - RebelBase",
  description:
    "RebelBase serves as a hub for gaming enthusiasts, offering personalized recommendations, trending titles, and curated lists across various genres and platforms.",
};
