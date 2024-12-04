import { GameData } from "@/interfaces/igdb";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import AboutDescription from "./AboutDescription";

import AboutGameSupport from "./AboutGameSupport";

const AboutGame = ({ game }: { game: GameData }) => {
  getSocialLinks(game);
  return (
    <section className="mt-16">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        About {game[0].name} <MdChevronRight size={32} />
      </h2>
      <div>
        <AboutDescription game={game} />
        <AboutGameSupport game={game} />
        <section>
          <div>links</div>
        </section>
        <section>game tags that link to filter page</section>
      </div>
    </section>
  );
};

export default AboutGame;

function getSocialLinks(game: GameData) {
  const links = game[0]["websites"];

  if (!links) return;
  console.log(game);
}
function getGameTags(game: GameData) {}
