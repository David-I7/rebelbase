import React from "react";
import GameMetadata from "../GameMetadata";
import GameIdentifier from "../GameIdentifier";
import { GameData } from "@/interfaces/igdb";
import HeroCard from "../HeroCard";
import HeroVideoTrailer from "../HeroVideoTrailer";
import { getHeroVideo } from "@/utils/dataTransformation";
import ViewTrailerDialog from "./media/ViewTrailerDialog";

const HeroSection = ({
  game,
  developerCompanyName,
}: {
  game: GameData;
  developerCompanyName?: string;
}) => {
  const heroVideo = getHeroVideo(game[0]["videos"]);

  return (
    <>
      <section className={`bg-surface-container-low relative`}>
        <div className="py-8 md:pb-8 md:pt-0 relative max-w-[1280px] max-h-[75svh] md:flex md:justify-end [@media(min-width:1280px)]:mx-auto">
          <HeroCard
            hasHeroVideo={heroVideo ? true : false}
            developerCompanyName={developerCompanyName}
            game={game}
          />
          {heroVideo && (
            <HeroVideoTrailer heroVideo={heroVideo} gameName={game[0].name} />
          )}
          <div
            className={`md:absolute z-10 left-4 lg:left-8 [@media(min-width:1344px)]:left-0 ${
              heroVideo ? "bottom-8" : "top-2/4 md:-translate-y-2/4"
            }`}
          >
            <GameIdentifier
              gameName={game[0].name}
              developerCompanyName={developerCompanyName}
            />
            <GameMetadata hasHeroVideo={heroVideo ? true : false} game={game} />
          </div>
          {heroVideo && (
            <div className="absolute bottom-[55px] right-4 lg:right-8 [@media(min-width:1344px)]:right-0 hidden md:block">
              <ViewTrailerDialog
                heroVideo={heroVideo}
                gameName={game[0].name}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
