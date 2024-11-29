"use client";
import React from "react";
import HorizontalCard from "./HorizontalCard";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import { CardData } from "@/interfaces/igdb";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { handleWheel } from "@/utils/eventHandlers";

export type HorizontalCardCarouselProps = {
  gameData: CardData[];
};

const HorizontalCardCarousel = ({ gameData }: HorizontalCardCarouselProps) => {
  return (
    <div className="relative overflow-hidden">
      <ul
        onWheel={(e) => {
          handleWheel(e);
        }}
        data-position="0"
        style={{ transform: "translateX(0px)" }}
        className="inline-grid grid-rows-1 grid-cols-[repeat(15,200px)] md:grid-cols-[repeat(15,254px)] lg:grid-cols-[repeat(15,308px)] gap-4 carousel pr-4 lg:pr-8 [@media(min-width:1280px)]:pr-[calc((100vw_-_1280px)_/_2)] transition-transform duration-300"
      >
        {gameData.map((game) => (
          <li key={`Horizontal_card_${game.id}`}>
            <HorizontalCard>
              <CardImage gameName={game.name} imgId={game.cover?.image_id} />
              <CardDetails game={game} lastRow="FIRST_RELEASE_DATE" />
            </HorizontalCard>
          </li>
        ))}
      </ul>
      <button
        // onClick={handlePrev}
        className="z-10 hidden place-content-center rounded-full h-14 w-14 absolute left-0 ml-4 lg:ml-8 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
      >
        <MdChevronLeft size={40} />
      </button>
      <button
        // onClick={handleNext}
        className="z-10 hidden place-content-center rounded-full h-14 w-14 absolute right-0 mr-4 lg:mr-8 vertical-center text-white backdrop-blur-md bg-background-blur-dark"
      >
        <MdChevronRight size={40} />
      </button>
    </div>
  );
};

export default HorizontalCardCarousel;
