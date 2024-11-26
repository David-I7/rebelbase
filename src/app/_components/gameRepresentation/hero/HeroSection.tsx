import { CardData } from "@/interfaces/igdb";
import React from "react";
import HeroCarouselB from "./HeroCarouselB";

type HeroSectionProps = {
  gameData?: CardData[];
};

const HeroSection = ({ gameData }: HeroSectionProps) => {
  if (!gameData) return;

  return (
    <section>
      <HeroCarouselB gameData={gameData} />
    </section>
  );
};

export default HeroSection;
