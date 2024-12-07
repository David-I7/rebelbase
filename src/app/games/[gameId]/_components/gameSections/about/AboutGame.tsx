import { GameData } from "@/interfaces/igdb";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import AboutDescription from "./AboutDescription";

import AboutGameSupport from "./AboutGameSupport";
import AboutSocialLinks from "./AboutSocialLinks";
import AboutGameTags from "./AboutGameTags";

const AboutGame = ({ game }: { game: GameData }) => {
  return (
    <section className="mt-16">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        About {game[0].name} <MdChevronRight size={32} />
      </h2>
      <div>
        <AboutDescription game={game} />
        <AboutGameSupport game={game} />
        <AboutSocialLinks game={game} />
        <AboutGameTags game={game} />
      </div>
    </section>
  );
};

export default AboutGame;

function getGameTags(game: GameData) {}
