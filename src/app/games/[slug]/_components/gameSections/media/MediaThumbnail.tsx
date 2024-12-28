import { imagesMap } from "@/data/constants/gamePageEnums";
import React from "react";

const MediaThumbnail = ({
  imgId,
  gameName,
  mediaType,
}: {
  imgId: string;
  gameName: string;
  mediaType: string;
}) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <img
        className="aspect-video w-full object-cover"
        width="308px"
        height="547px"
        loading="lazy"
        src={`${imagesMap.baseUrl}${imagesMap.horizontalCardLarge}_2x/${imgId}.jpg`}
        alt={`${gameName} ${mediaType}`}
      />
    </div>
  );
};

export default MediaThumbnail;
