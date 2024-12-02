import React from "react";
import GameMetadata from "../GameMetadata";
import GameIdentifier from "../GameIdentifier";
import { GameData } from "@/interfaces/igdb";
import HeroCard from "../HeroCard";

const HeroSection = ({
  game,
  developerCompanyName,
}: {
  game: GameData;
  developerCompanyName?: string;
}) => {
  return (
    <section className="py-8 bg-surface-container-low">
      <HeroCard gameName={game[0].name} imgId={game[0].cover?.image_id}>
        <GameIdentifier
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%) translateY(50%)",
          }}
          responsiveClassName="sm:hidden"
          gameName={game[0].name}
          developerCompanyName={developerCompanyName}
        />
      </HeroCard>

      <GameMetadata game={game} />
    </section>
  );
};

export default HeroSection;
