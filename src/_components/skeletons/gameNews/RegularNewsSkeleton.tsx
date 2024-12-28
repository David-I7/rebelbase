import React from "react";
import RegularArticleSkeleton from "./RegularArticleSkeleton";
import NewsSummarySkeleton from "./NewsSummarySkeleton";

const renderCount = 4;

const RegularNewsSkeleton = () => {
  const Articles: React.JSX.Element[] = [];
  for (let i = 0; i < renderCount; i++) {
    Articles.push(
      <RegularArticleSkeleton
        customClass={
          i === 0
            ? "my-0"
            : i === 1
            ? "[@media(min-width:960px)]:my-0 my-4"
            : "my-4"
        }
        key={`regular_game_article_skeleton_${i}`}
      >
        <div className="min-w-[147px] max-w-[147px] sm:min-w-[205px] sm:max-w-[205px] rounded bg-surface-container-normal aspect-video"></div>
        <NewsSummarySkeleton orientation="landscape" />
      </RegularArticleSkeleton>
    );
  }

  return (
    <section
      className={`animate-pulse grid gap-x-6 mt-12 [@media(min-width:960px)]:grid-cols-2 [@media(min-width:960px)]:grid-rows-[1fr_1fr_0_0_0] grid-rows-[1fr_1fr_1fr_1fr_0_0_0]`}
    >
      {Articles}
    </section>
  );
};

export default RegularNewsSkeleton;
