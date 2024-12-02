import VerticalRay from "@/_components/VerticalRay";
import { imagesMap } from "@/data/constants/igdbEnums";
import { GameData } from "@/interfaces/igdb";
import { convertRating, getAgeRating } from "@/utils/dataTransformation";
import { format } from "date-fns";
import React from "react";
import { MdStar } from "react-icons/md";

const GameMetadata = async ({ game }: { game: GameData }) => {
  const ageRating = getAgeRating(game[0]?.age_ratings);

  return (
    <div
      className={`grid ${
        ageRating
          ? "grid-cols-[repeat(3,auto)] [@media(min-width:409px)_and_(max-width:639px)]:grid-cols-[repeat(7,auto)] sm:grid-cols-[repeat(8,auto)]"
          : "grid-cols-[repeat(5,auto)]"
      } gap-4 items-center justify-center sm:justify-start mt-14`}
    >
      {game[0]?.videos?.length && (
        <div
          className={`${
            game[0].cover?.image_id ? "" : "bg-surface-container-low"
          } aspect-[3/4] hidden sm:block max-w-16 rounded-lg overflow-hidden flex-shrink-0`}
        >
          {game[0].cover?.image_id && (
            <img
              src={`${imagesMap.baseUrl}${imagesMap.verticalCardSmall}/${game[0].cover?.image_id}.jpg`}
              alt={`${game[0].name} game cover`}
            />
          )}
        </div>
      )}
      <div className="grid gap-2 min-h-[54px]">
        <div className="flex items-center justify-center text-on-surface-heading-varient font-body-l font-medium">
          {game[0]?.rating ? (
            <>
              {convertRating(game[0].rating)} <MdStar size={24} />
            </>
          ) : (
            "N/A"
          )}{" "}
        </div>
        <span className="font-body-s text-center">Rating</span>
      </div>
      <VerticalRay />
      <div className="grid gap-2 items-center min-h-[54px]">
        <span className="text-on-surface-heading-varient font-body-l font-medium text-center">
          {game[0]?.first_release_date
            ? format(Math.floor(game[0].first_release_date * 1000), "dd MMM, y")
            : "TBD"}
        </span>
        <span className="font-body-s text-center">Release date</span>
      </div>
      <VerticalRay
        responsiveClassName={`${
          ageRating ? "[@media(min-width:409px)]:block hidden" : ""
        }`}
      />
      <div className="grid gap-2 min-h-[54px]">
        <span className="text-on-surface-heading-varient font-body-l font-medium text-center">
          {game[0]?.platforms ? game[0].platforms.length : 0}
        </span>
        <span className="font-body-s text-center">Platforms</span>
      </div>
      {ageRating && (
        <>
          <VerticalRay />
          <div className="grid grid-cols-1 grid-rows-[28px_auto] items-center justify-items-center gap-2 min-h-[54px]">
            <img
              className="h-full"
              src={ageRating.imgSrc.src}
              alt={`${ageRating.name} age rating icon`}
            />
            <span className="font-body-s text-center">{ageRating.name}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default GameMetadata;
