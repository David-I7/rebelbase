"use client";
import { CardData } from "@/interfaces/igdb";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const ITEMS_IN_CAROUSEL = 8;

const HeroCarouselSimplified = ({ gameData }: { gameData: CardData[] }) => {
  const [offset, setOffset] = useState(0);

  const handlePrev = () => {
    setOffset((prev) => (prev === 0 ? gameData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setOffset((prev) => (prev + 1) % gameData.length);
  };

  return (
    <div className="relative overflow-hidden">
      <button
        className="z-10 grid place-content-center rounded-full h-14 w-14 absolute left-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark"
        onClick={handlePrev}
      >
        <MdChevronLeft size={56} />
      </button>
      <button
        className="z-10 grid place-content-center rounded-full h-14 w-14 absolute right-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark"
        onClick={handleNext}
      >
        <MdChevronRight size={56} />
      </button>
      <ul className="h-[545px] relative">
        {gameData.map((game, index) => {
          // Calculate position relative to offset
          const position = (index - offset + gameData.length) % gameData.length;

          // Define CSS classes for each position
          let className =
            "absolute top-0 left-2/4 transition-transform duration-300";
          if (position === 0)
            className += "z-30 transform -translate-x-1/2 scale-100";
          else if (position === 1)
            className += " z-20 transform translate-x-1/4 scale-90 opactity-90";
          else if (position === gameData.length - 1)
            className +=
              " z-20 transform -translate-x-3/4 scale-90 opactity-90";
          else className += " z-10 opacity-0 pointer-events-none";

          return (
            <li key={game.id} className={className}>
              {/* Replace with your HeroCard component */}
              <div className="bg-gray-800 text-white p-4 rounded">
                {game.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeroCarouselSimplified;
