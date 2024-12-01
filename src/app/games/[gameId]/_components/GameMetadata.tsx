import VerticalRay from "@/_components/VerticalRay";
import { GameData } from "@/interfaces/igdb";
import { convertRating, getAgeRating } from "@/utils/dataTransformation";
import { format } from "date-fns";
import React from "react";
import { MdStar } from "react-icons/md";

const GameMetadata = async ({ game }: { game: GameData }) => {
  const ageRating = getAgeRating(game[0]?.age_ratings);

  return (
    <div className="flex gap-4">
      <div className="grid gap-2 min-h-[54px]">
        <div className="flex items-center text-on-surface-heading-varient font-body-l font-medium">
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
      <VerticalRay />
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
