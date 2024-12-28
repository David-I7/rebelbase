import React from "react";
import YoutubeCardSkeleton from "./YoutubeCardSkeleton";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";
import { MdChevronRight } from "react-icons/md";

const itemCount = 8;

const YoutubeCreatorsSkeleton = () => {
  const channelSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    channelSkeletons.push(
      <YoutubeCardSkeleton key={`youtube_card_skeleton_${i}`} />
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
          Popular Creators
        </h2>
        <MdChevronRight size={32} className="text-on-surface-heading" />
      </div>

      <DynamicSizeCarousel>
        <ul className="animate-pulse inline-flex gap-4 pr-4 md:pr-8 [@media(min-width:1344px)]:pr-0">
          {channelSkeletons}
        </ul>
      </DynamicSizeCarousel>
    </div>
  );
};

export default YoutubeCreatorsSkeleton;
