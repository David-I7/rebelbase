import { imagesMap } from "@/data/constants/igdbEnums";
import React from "react";

type CardImageProps = {
  imgId?: string;
  gameName: string;
};

const CardImage = ({ imgId, gameName }: CardImageProps) => {
  return (
    <div
      className={`${
        imgId ? "" : "bg-surface-container-low"
      } max-w-[308px] aspect-video rounded-xl overflow-hidden mb-3`}
    >
      {imgId && (
        <img
          width="308px"
          height="547px"
          loading="lazy"
          src={`${imagesMap.baseUrl}${imagesMap.horizontalCardLarge}/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default CardImage;
