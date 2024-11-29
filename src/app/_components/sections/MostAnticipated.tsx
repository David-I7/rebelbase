import React from "react";
import HorizontalCardCarousel from "../gameRepresentation/horizontalCard/HorizontalCardCarousel";
import { CardData } from "@/interfaces/igdb";
import { MdChevronRight } from "react-icons/md";

const MostAnticipated = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="mt-20 w-full">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        Most Anticipated <MdChevronRight size={32} />
      </h2>
      <HorizontalCardCarousel gameData={gameData} />
    </section>
  );
};

export default MostAnticipated;
