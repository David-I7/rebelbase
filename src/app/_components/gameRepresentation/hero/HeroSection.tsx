import { CardData } from "@/interfaces/igdb";
import React from "react";
import HeroCarouselC from "./HeroCarouselC";

type HeroSectionProps = {
  gameData?: CardData[];
};

const HeroSection = ({ gameData }: HeroSectionProps) => {
  if (!gameData) return;

  return (
    <section>
      <HeroCarouselC gameData={gameData} />
    </section>
  );
};

export default HeroSection;
