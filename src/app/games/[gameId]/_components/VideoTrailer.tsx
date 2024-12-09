"use client";
import React from "react";

import useWindowSizeRange from "@/hooks/useWindowSizeRange";
import { RelevantVideoData } from "@/utils/dataTransformation";

const VideoTrailer = ({
  heroVideo,
  gameName,
}: {
  heroVideo: RelevantVideoData;
  gameName: string;
}) => {
  const inRangeMedium = useWindowSizeRange(768, Number.POSITIVE_INFINITY);

  if (!inRangeMedium) return;

  return (
    <iframe
      loading="eager"
      className="aspect-video pointer-events-none w-full"
      src={`https://www.youtube.com/embed/${heroVideo.videoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideo.videoId}&controls=0&modestbranding=1&rel=0`}
      title={`${gameName} ${heroVideo.name}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoTrailer;
