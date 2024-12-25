import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import React from "react";
import GameEventSkeleton from "./GameEventSkeleton";

const itemCount = 15;

const GameEventsSkeletonCarousel = () => {
  const gameEvents: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    gameEvents.push(<GameEventSkeleton key={`game_event_skelelton_${i}`} />);
  }

  return (
    <FixedSizeCarousel>
      <ul className="inline-flex gap-4">{gameEvents}</ul>
    </FixedSizeCarousel>
  );
};

export default GameEventsSkeletonCarousel;
