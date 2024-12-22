import FilterChipLink from "@/_components/primitives/chips/filterchip/FilterChipLink";
import { GameData } from "@/interfaces/igdb";
import { getGameTags } from "@/utils/dataTransformation";
import React from "react";

const AboutGameTags = ({ game }: { game: GameData }) => {
  const gameTags = getGameTags(game);
  console.log(gameTags);
  if (!gameTags || !gameTags.length) return;

  return (
    <section className="mt-6">
      <ul className="flex flex-wrap gap-x-2 gap-y-4">
        {gameTags.map((tag) => {
          return (
            <li key={`${tag.tagType}_${tag.uiName}_${tag.id}`}>
              <FilterChipLink
                pathName="/browse"
                query={{ [tag.tagType]: tag.urlName }}
                label={tag.uiName}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutGameTags;
