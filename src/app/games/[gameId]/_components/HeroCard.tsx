import { imagesMap } from "@/data/constants/gamePageEnums";
import { GameData } from "@/interfaces/igdb";
import React, { ReactNode } from "react";

const HeroCard = ({
  game,
  developerCompanyName,
  hasHeroVideo,
}: {
  game: GameData;
  developerCompanyName?: string;
  hasHeroVideo: boolean;
}) => {
  const responsiveStyles = hasHeroVideo
    ? "md:hidden"
    : "md:justify-end md:pt-8";
  const imgId = game[0]["cover"]?.image_id;
  return (
    <div className={`${responsiveStyles} relative flex justify-center`}>
      <div
        className={`${
          imgId ? "" : "bg-surface-container-low"
        } max-h-[533px] h-[50vh] relative aspect-[3/4] rounded-xl overflow-hidden darken-image md:after:hidden select-none mx-auto md:mx-0 md:mr-4`}
      >
        {imgId && (
          <img
            className="object-cover w-full"
            src={`${imagesMap.baseUrl}${imagesMap.verticalCardLarge}_2x/${imgId}.jpg`}
            alt={`${game[0].name} game cover`}
            loading="eager"
          />
        )}
      </div>
      <div
        className={`absolute bottom-0 left-2/4 -translate-x-2/4 translate-y-2/4 max-w-[400px] w-full px-4 md:hidden`}
      >
        <h1 className="text-center md:text-start text-4xl line-clamp-2 text-ellipsis">
          {game[0].name}
        </h1>
        {developerCompanyName && (
          <div className="font-medium text-primary text-center md:text-start whitespace-nowrap overflow-hidden text-ellipsis">
            {developerCompanyName}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCard;
