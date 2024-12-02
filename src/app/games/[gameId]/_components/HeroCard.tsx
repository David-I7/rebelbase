import { imagesMap } from "@/data/constants/igdbEnums";
import React, { ReactNode } from "react";

const HeroCard = ({
  children,
  imgId,
  gameName,
  videoTrailer,
}: {
  children: ReactNode;
  imgId?: string;
  gameName: string;
  videoTrailer: boolean;
}) => {
  const responsiveStyles = videoTrailer ? "sm:hidden" : "sm:justify-end";

  return (
    <div className={`${responsiveStyles} relative flex justify-center`}>
      <div
        className={`${
          imgId ? "" : "bg-surface-container-low"
        } max-h-[533px] h-[50vh] relative aspect-[3/4] rounded-xl overflow-hidden darken-image select-none mx-auto sm:mx-0 sm:mr-4`}
      >
        {imgId && (
          <img
            className="object-cover w-full"
            src={`${imagesMap.baseUrl}${imagesMap.verticalCardLarge}_2x/${imgId}.jpg`}
            alt={`${gameName} game cover`}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default HeroCard;
