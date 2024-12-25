import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";
import React from "react";
import GameEventSkeleton from "./GameEventSkeleton";
import { MdChevronRight } from "react-icons/md";

const itemCount = 15;

const GameEventsSkeleton = () => {
  const gameEvents: React.JSX.Element[] = [];

  for (let i = 0; i < itemCount; i++) {
    gameEvents.push(<GameEventSkeleton key={`game_event_skelelton_${i}`} />);
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
          Recent Events
        </h2>
        <MdChevronRight size={32} className="text-on-surface-heading" />
      </div>
      <FixedSizeCarousel>
        <ul className="inline-flex gap-4">{gameEvents}</ul>
      </FixedSizeCarousel>
    </div>
  );
};

export default GameEventsSkeleton;
