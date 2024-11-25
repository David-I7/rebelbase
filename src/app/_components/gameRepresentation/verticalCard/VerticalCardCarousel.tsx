import React from "react";
import VerticalCard from "./VerticalCard";
import CardImage from "./CardImage";
import { CardData } from "@/interfaces/igdb";
import CardDetails from "../CardDetails";

type VerticalCardCarouselProps = {
  gameData?: CardData[];
};

const VerticalCardCarousel = ({ gameData }: VerticalCardCarouselProps) => {
  if (!gameData) return;

  return (
    <div className="overflow-x-auto">
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
    </div>
  );
};

export default VerticalCardCarousel;
