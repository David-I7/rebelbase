import { imagesMap } from "@/data/constants/igdbEnums";
import React from "react";

type HeroImageBProps = {
  imgId?: string;
  gameName: string;
};

const HeroImageB = ({ imgId, gameName }: HeroImageBProps) => {
  return (
    <div
      className={`${
        imgId ? "" : "bg-surface-container-low"
      } max-w-[400px] aspect-[3/4] rounded-xl overflow-hidden darken-image select-none`}
    >
      {imgId && (
        <img
          className="object-cover w-full"
          src={`${imagesMap.baseUrl}${imagesMap.verticalCardLarge}_2x/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default HeroImageB;
