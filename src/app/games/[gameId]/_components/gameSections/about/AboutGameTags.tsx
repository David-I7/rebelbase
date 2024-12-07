import FilterChipLink from "@/_components/chips/filterchip/FilterChipLink";
import { GameData } from "@/interfaces/igdb";
import { getGameTags } from "@/utils/dataTransformation";
import React from "react";

const AboutGameTags = ({ game }: { game: GameData }) => {
  const gameTags = getGameTags(game);

  if (!gameTags || !gameTags.length) return;

  return (
    <section className="mt-6">
      <ul className="flex flex-wrap gap-x-2 gap-y-4">
        {gameTags.map((tag) => {
          return (
            <li key={`${tag.tagType}_${tag.name}_${tag.id}`}>
              <FilterChipLink
                pathName="/discover"
                query={{ [tag.tagType]: tag.name }}
                label={tag.name}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutGameTags;
