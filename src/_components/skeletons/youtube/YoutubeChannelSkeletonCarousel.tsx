import React from "react";
import YoutubeCardSkeleton from "./YoutubeCardSkeleton";
import DynamicSizeCarousel from "@/_components/nonPrimitives/carousel/DynamicSizeCarousel";

const itemCount = 8;

const YoutubeChannelSkeletonCarousel = () => {
  const channelSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    channelSkeletons.push(
      <YoutubeCardSkeleton key={`youtube_card_skeleton_${i}`} />
    );
  }

  return (
    <DynamicSizeCarousel>
      <ul className="inline-flex gap-4">{channelSkeletons}</ul>
    </DynamicSizeCarousel>
  );
};

export default YoutubeChannelSkeletonCarousel;
