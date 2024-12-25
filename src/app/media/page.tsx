import { Suspense } from "react";
import GameNewsData from "./_components/gameNews/GameNewsData";
import HeroNewsSkeleton from "@/_components/skeletons/gameNews/HeroNewsSkeleton";
import RegularNewsSkeleton from "@/_components/skeletons/gameNews/RegularNewsSkeleton";
import TopGamingChannels from "./_components/youtube/TopGamingChannels";
import GamingMemes from "./_components/memes/GamingMemes";
import GamingEvents from "./_components/gameEvents/GamingEvents";

export default function Media() {
  return (
    <main className="max-w-[1280px] mx-4 md:mx-8 [@media(min-width:1344px)]:mx-auto">
      <Suspense
        fallback={
          <section className="mt-[104px]">
            <HeroNewsSkeleton />
            <RegularNewsSkeleton />
          </section>
        }
      >
        <GameNewsData />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <TopGamingChannels />
      </Suspense>
      <Suspense>
        <GamingEvents />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <GamingMemes />
      </Suspense>
    </main>
  );
}
