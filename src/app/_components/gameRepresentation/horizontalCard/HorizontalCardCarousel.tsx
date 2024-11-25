import React from "react";
import HorizontalCard from "./HorizontalCard";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import { CardData } from "@/interfaces/igdb";

type HorizontalCardCarouselProps = {
  gameData?: CardData[];
};

const HorizontalCardCarousel = ({ gameData }: HorizontalCardCarouselProps) => {
  if (!gameData) return;

  return (
    <div className="overflow-x-auto">
      <ul className="mt-4 flex gap-4">
        {gameData.map((game) => (
          <li key={`Horizontal_card_${game.id}`}>
            <HorizontalCard>
              <CardImage gameName={game.name} imgId={game.cover?.image_id} />
              <CardDetails game={game} lastRow="FIRST_RELEASE_DATE" />
            </HorizontalCard>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorizontalCardCarousel;
