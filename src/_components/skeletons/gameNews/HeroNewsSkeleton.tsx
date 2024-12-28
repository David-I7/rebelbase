import React from "react";
import HeroArticleSkeleton from "./HeroArticleSkeleton";
import NewsSummarySkeleton from "./NewsSummarySkeleton";

const largeCount = 3;

const HeroNewsSkeleton = () => {
  const Articles: React.JSX.Element[] = [];
  for (let i = 0; i < largeCount; i++) {
    Articles.push(
      <HeroArticleSkeleton key={`hero_game_article_skeleton_${i}`}>
        <div className="min-w-[275px] rounded bg-surface-container-normal aspect-video"></div>
        <NewsSummarySkeleton orientation="portrait" />
      </HeroArticleSkeleton>
    );
  }

  return (
    <section className="animate-pulse grid grid-rows-[1fr_0_0] overflow-hidden sm:grid-cols-2 [@media(min-width:960px)]:grid-cols-3 gap-6 gap-y-0">
      {Articles}
    </section>
  );
};

export default HeroNewsSkeleton;
