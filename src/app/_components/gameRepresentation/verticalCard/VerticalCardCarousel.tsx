import React from "react";
import VerticalCard from "./VerticalCard";
import CardImage from "./CardImage";
import { CardData } from "@/interfaces/igdb";
import CardDetails from "../CardDetails";
import { MdChevronRight } from "react-icons/md";

type VerticalCardCarouselProps = {
  gameData?: CardData[];
  heading: string;
};

const VerticalCardCarousel = ({
  gameData,
  heading,
}: VerticalCardCarouselProps) => {
  if (!gameData) return;

  return (
    <section className="overflow-x-auto mt-12">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        {heading} <MdChevronRight size={32} />
      </h2>
      <ul className="h-full w-full mt-4 flex gap-4">
        {gameData.map((game) => (
          <li key={`vertical_card_${game.id}`}>
            <VerticalCard>
              <CardImage gameName={game.name} imgId={game.cover?.image_id} />
              <CardDetails game={game} lastRow="RATING" />
            </VerticalCard>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VerticalCardCarousel;
