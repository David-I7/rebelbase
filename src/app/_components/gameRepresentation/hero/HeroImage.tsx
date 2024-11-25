import { imagesMap } from "@/data/constants/igdbEnums";
import React from "react";

type HeroImageProps = {
  imgId?: string;
  gameName: string;
};

const HeroImage = ({ imgId, gameName }: HeroImageProps) => {
  return (
    <div
      className={`${
        imgId ? "" : "bg-surface-container-low"
      } max-w-[835px] aspect-video rounded-xl overflow-hidden mb-3`}
    >
      {imgId && (
        <img
          src={`${imagesMap.baseUrl}${imagesMap.horizonatalCardHero}/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default HeroImage;
