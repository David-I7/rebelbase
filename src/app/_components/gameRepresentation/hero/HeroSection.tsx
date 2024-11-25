import { CardData } from "@/interfaces/igdb";
import React from "react";
import HeroCard from "./HeroCard";
import HeroImage from "./HeroImage";

type HeroSectionProps = {
  gameData?: CardData[];
};

const HeroSection = ({ gameData }: HeroSectionProps) => {
  if (!gameData) return;

  return (
    <HeroCard>
      <HeroImage
        gameName={gameData[0].name}
        imgId={gameData[0].cover?.image_id}
      />
    </HeroCard>
  );
};

export default HeroSection;
