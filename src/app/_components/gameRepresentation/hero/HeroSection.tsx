import { CardData } from "@/interfaces/igdb";
import React from "react";
import HeroCarouselC from "./HeroCarouselC";

type HeroSectionProps = {
  gameData?: CardData[];
};

const HeroSection = ({ gameData }: HeroSectionProps) => {
  if (!gameData) return;

  return (
    <section className="[@media(max-width:390px)]:h-[397px] h-[450px]">
      <HeroCarouselC gameData={gameData} />
    </section>
  );
};

export default HeroSection;
