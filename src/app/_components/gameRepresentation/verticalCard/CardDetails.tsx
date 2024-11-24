import { CardData } from "@/interfaces/igdb";
import React from "react";
import Dot from "../../Dot";
import { MdStar } from "react-icons/md";

type CardDetailsProps = {
  game: CardData;
};

function getCardTags(game: CardData): string[] {
  const tags: string[] = [];
  const TAG_COUNT = 2;

  if (game["genres"]) {
    for (let i = 0; i < game["genres"].length; i++) {
      tags.push(game["genres"][i].name);
      if (tags.length === TAG_COUNT) return tags;
    }
  }

  if (game["themes"]) {
    for (let i = 0; i < game["themes"].length; i++) {
      tags.push(game["themes"][i].name);
      if (tags.length === TAG_COUNT) return tags;
    }
  }

  return tags;
}

function convertRating(rating?: number): string | undefined {
  if (!rating) return;
  // convert from 0-100 to 0-5 rating
  return (rating / 20).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

const CardDetails = ({ game }: CardDetailsProps) => {
  const tags = getCardTags(game);

  return (
    <div className="mt-3">
      {tags.length && (
        <div className="font-body-xs text-on-surface-body-varient-low flex items-center gap-x-2 gap-y-0 flex-wrap">
          {tags[0]}
          {tags.length > 1 && (
            <>
              <Dot
                style={{
                  backgroundColor: "var(--color-on-surface-body-varient-low)",
                }}
              />
              {tags[1]}
            </>
          )}
        </div>
      )}
      <h3 className="text-base line-clamp-2 text-ellipsis mb-2 ">
        {game.name}
      </h3>
      <div className="font-body-s flex items-center gap-[2px]">
        {convertRating(game.rating) ? (
          <>
            {convertRating(game.rating)} <MdStar size={16} />
          </>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
};

export default CardDetails;
