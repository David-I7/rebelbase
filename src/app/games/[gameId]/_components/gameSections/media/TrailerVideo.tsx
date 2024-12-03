import { RelevantVideoData } from "@/utils/dataTransformation";
import React from "react";

const TrailerVideo = ({
  heroVideo,
  gameName,
}: {
  heroVideo: RelevantVideoData;
  gameName: string;
}) => {
  return (
    <div className="rounded-xl overflow-hidden max-w-[308px] md:hidden">
      <iframe
        className="aspect-video pointer-events-none w-full"
        src={`https://www.youtube.com/embed/${heroVideo.videoId}?&modestbranding=1&rel=0`}
        title={`${gameName} ${heroVideo.name}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default TrailerVideo;
