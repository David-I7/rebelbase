import Dot from "@/_components/Dot";
import { CardData } from "@/interfaces/igdb";
import { convertRating, getCardTags } from "@/utils/dataTransformation";
import React from "react";
import { MdStar } from "react-icons/md";

type HeroCardDetailsBProps = {
  game: CardData;
};

const HeroCardDetailsB = ({ game }: HeroCardDetailsBProps) => {
  const tags = getCardTags(game);

  return (
    <div className="absolute z-20 backdrop-blur-sm py-2 px-3 bottom-3 left-0 right-0">
      {tags.length && (
        <div className="font-body-s text-on-surface-body-varient-low flex items-center gap-x-2 gap-y-0 ">
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
      <h2 className={`line-clamp-2 text-ellipsis `}>{game.name}</h2>

      <div className="font-body-m flex items-center gap-[2px]">
        {convertRating(game.rating) ? (
          <>
            {convertRating(game.rating)} <MdStar size={18} />
          </>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
};

export default HeroCardDetailsB;
