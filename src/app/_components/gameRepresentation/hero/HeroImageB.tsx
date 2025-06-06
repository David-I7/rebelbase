import { imagesMap } from "@/data/constants/gamePageEnums";
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
          width="400px"
          height="533px"
          loading="lazy"
          className="object-cover w-full"
          src={`${imagesMap.baseUrl}${imagesMap.verticalCardLarge}_2x/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default HeroImageB;
