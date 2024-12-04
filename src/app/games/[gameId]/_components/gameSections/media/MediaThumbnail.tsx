import { imagesMap } from "@/data/constants/igdbEnums";
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
    <div className="rounded-xl overflow-hidden max-w-[308px] lg:max-w-[565px]">
      <img
        className="aspect-video w-full"
        width="308px"
        height="547px"
        loading="lazy"
        src={`${imagesMap.baseUrl}${imagesMap.horizontalCardLarge}/${imgId}.jpg`}
        alt={`${gameName} ${mediaType}`}
      />
    </div>
  );
};

export default MediaThumbnail;
