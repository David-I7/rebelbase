"use client";
import React from "react";

import dynamic from "next/dynamic";
import { RelevantVideoData } from "@/utils/dataTransformation";

const VideoTrailer = dynamic(() => import("./VideoTrailer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full bg-surface-container-normal"></div>
  ),
});

const HeroVideoTrailer = ({
  heroVideo,
  gameName,
}: {
  heroVideo: RelevantVideoData;
  gameName: string;
}) => {
  return (
    <div className="hidden w-3/4 aspect-video md:block relative isolate rounded-tl-xl rounded-bl-xl [@media(min-width:1280px)]:rounded-xl [@media(min-width:1280px)]:mt-8  overflow-hidden ">
      <div className="hero-video"></div>
      <VideoTrailer heroVideo={heroVideo} gameName={gameName} />
    </div>
  );
};

export default HeroVideoTrailer;
