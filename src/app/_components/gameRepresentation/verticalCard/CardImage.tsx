import { imagesMap } from "@/data/constants/gamePageEnums";
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
      } max-w-[244px] aspect-[3/4] rounded-xl overflow-hidden mb-3`}
    >
      {imgId && (
        <img
          width="244px"
          height="325px"
          loading="lazy"
          src={`${imagesMap.baseUrl}${imagesMap.verticalCardLarge}/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default CardImage;
