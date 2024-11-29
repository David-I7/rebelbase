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
    <section className="mt-20 w-full">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        {heading} <MdChevronRight size={32} />
      </h2>
      <ul className="grid grid-rows-1 grid-cols-[repeat(15,minmax(164px,1fr))] md:grid-cols-[repeat(15,minmax(204px,1fr))] lg:grid-cols-[repeat(15,minmax(244px,1fr))] mt-4 gap-4 overflow-x-auto carousel pr-4 lg:pr-8 [@media(min-width:1280px)]:pr-[calc((100vw_-_1280px)_/_2)]">
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
