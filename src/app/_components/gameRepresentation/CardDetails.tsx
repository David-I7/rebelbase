import { CardData } from "@/interfaces/igdb";
import React from "react";
import Dot from "@/_components/Dot";
import { MdStar } from "react-icons/md";
import { convertRating, getCardTags } from "@/utils/dataTransformation";
import format from "date-fns/format";

type CardDetailsProps = {
  game: CardData;
  lastRow: "RATING" | "FIRST_RELEASE_DATE" | "";
};

const CardDetails = ({ game, lastRow }: CardDetailsProps) => {
  const tags = getCardTags(game);

  return (
    <div>
      {tags.length && (
        <div className="font-body-xs text-on-surface-body-varient-low flex items-center gap-x-2 gap-y-0 ">
          <div className="min-w-max">{tags[0]}</div>
          {tags.length > 1 && (
            <>
              <Dot
                style={{
                  backgroundColor: "var(--color-on-surface-body-varient-low)",
                }}
              />

              <div className="line-clamp-1 text-ellipsis">{tags[1]}</div>
            </>
          )}
        </div>
      )}
      <h3
        className={`text-base line-clamp-2 text-ellipsis ${
          lastRow ? "mb-2" : ""
        }`}
      >
        {game.name}
      </h3>
      {lastRow === "RATING" && (
        <div className="font-body-s flex items-center gap-[2px]">
          {convertRating(game.rating) ? (
            <>
              {convertRating(game.rating)} <MdStar size={16} />
            </>
          ) : (
            "N/A"
          )}
        </div>
      )}
      {lastRow === "FIRST_RELEASE_DATE" && (
        <div className="font-body-s">
          {game.first_release_date &&
            format(
              new Date(game.first_release_date * 1000),
              "'Available' dd MMM y"
            )}
          {!game.first_release_date && "Release date TBD"}
        </div>
      )}
    </div>
  );
};

export default CardDetails;
