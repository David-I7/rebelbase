import React from "react";
import HorizontalCard from "./HorizontalCard";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import { CardData } from "@/interfaces/igdb";
import { MdChevronRight } from "react-icons/md";

type HorizontalCardCarouselProps = {
  gameData?: CardData[];
  heading: string;
};

const HorizontalCardCarousel = ({
  gameData,
  heading,
}: HorizontalCardCarouselProps) => {
  if (!gameData) return;

  return (
    <section className="overflow-x-auto mt-12">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        {heading} <MdChevronRight size={32} />
      </h2>
      <ul className="flex gap-4">
        {gameData.map((game) => (
          <li key={`Horizontal_card_${game.id}`}>
            <HorizontalCard>
              <CardImage gameName={game.name} imgId={game.cover?.image_id} />
              <CardDetails game={game} lastRow="FIRST_RELEASE_DATE" />
            </HorizontalCard>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HorizontalCardCarousel;
