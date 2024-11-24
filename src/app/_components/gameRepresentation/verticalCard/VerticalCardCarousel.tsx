import React from "react";
import VerticalCard from "./VerticalCard";
import CardImage from "./CardImage";
import { CardData } from "@/interfaces/igdb";
import CardDetails from "./CardDetails";

type VerticalCardCarouselProps = {
  gameData?: CardData[];
};

const VerticalCardCarousel = ({ gameData }: VerticalCardCarouselProps) => {
  if (!gameData) return;

  return (
    <ul className=" mt-4 flex gap-4 overflow-hidden overflow-x-auto">
      {gameData.map((game) => (
        <li key={`vertical_card_${game.id}`}>
          <VerticalCard>
            <CardImage gameName={game.name} imgId={game.cover?.image_id} />
            <CardDetails game={game} />
          </VerticalCard>
        </li>
      ))}
    </ul>
  );
};

export default VerticalCardCarousel;
