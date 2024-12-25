import YoutubeChannelCarousel from "@/app/media/_components/youtube/YoutubeChannelCarousel";
import React from "react";
import YoutubeCardSkeleton from "./YoutubeCardSkeleton";

const itemCount = 8;

const YoutubeChannelSkeletonCarousel = () => {
  const channelSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    channelSkeletons.push(
      <YoutubeCardSkeleton key={`youtube_card_skeleton_${i}`} />
    );
  }

  return (
    <YoutubeChannelCarousel>
      <ul className="inline-flex gap-4">{channelSkeletons}</ul>
    </YoutubeChannelCarousel>
  );
};

export default YoutubeChannelSkeletonCarousel;
