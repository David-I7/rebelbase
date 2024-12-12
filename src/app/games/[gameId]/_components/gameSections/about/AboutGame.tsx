import { GameData } from "@/interfaces/igdb";
import React from "react";
import AboutDescription from "./AboutDescription";
import AboutGameSupport from "./AboutGameSupport";
import AboutSocialLinks from "./AboutSocialLinks";
import AboutGameTags from "./AboutGameTags";
import AboutGameDialog from "./AboutGameDialog";
import { imagesMap } from "@/data/constants/gamePageEnums";
import CloseGameDialog from "./CloseGameDialog";
import AboutAccordion from "./AboutAccordion";

const AboutGame = ({ game }: { game: GameData }) => {
  return (
    <section className="mt-16 mb-12">
      <h2 className="flex items-center gap-2 mb-4 text-2xl ">
        <AboutGameDialog>
          <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
            <div className="grid grid-cols-[48px_1fr] gap-4 pr-16">
              {game[0]["cover"] && (
                <img
                  className="aspect-[3/4] w-full rounded-xl"
                  loading="lazy"
                  src={`${imagesMap.baseUrl}${imagesMap.verticalCardSmall}/${game[0]["cover"].image_id}.jpg`}
                />
              )}

              <div className="grid content-start">
                <div className="text-2xl line-clamp-2 text-ellipsis">
                  {game[0].name}
                </div>
                <div className="font-body-m text-on-surface-body-varient-low">
                  About this game
                </div>
              </div>
            </div>
            <CloseGameDialog />
          </header>
          <div className="text-on-surface-body  px-6 pb-6">
            <AboutDescription game={game} />
            <AboutGameSupport game={game} />
            <AboutSocialLinks game={game} />
            <AboutGameTags game={game} />
          </div>
        </AboutGameDialog>
      </h2>
      <AboutAccordion>
        <AboutDescription game={game} />
        <AboutGameSupport game={game} />
        <AboutSocialLinks game={game} />
      </AboutAccordion>

      <AboutGameTags game={game} />
    </section>
  );
};

export default AboutGame;

function getGameTags(game: GameData) {}
