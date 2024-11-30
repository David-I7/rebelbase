"use client";
import { CardData } from "@/interfaces/igdb";
import React, { ReactElement, useRef, useState } from "react";
import HeroCard from "./HeroCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Carouselndicator from "@/_components/buttons/carousel/Carouselndicator";
import HeroImageB from "./HeroImageB";
import HeroCardDetailsB from "./HeroCardDetailsB";

const HeroCarouselC = ({ gameData }: { gameData: CardData[] }) => {
  //change to make the cards server comp if they don't need interactivity

  const [offset, setOffset] = useState(0);
  const isTransitioning = useRef<boolean>(false);

  const handlePrev = () => {
    if (isTransitioning.current) return;
    setOffset((prev) => (prev === 0 ? gameData.length - 1 : prev - 1));
    isTransitioning.current = true;
  };

  const handleNext = () => {
    if (isTransitioning.current) return;
    setOffset((prev) => (prev + 1) % gameData.length);
    isTransitioning.current = true;
  };

  const handleShuffle = (index: number) => {
    if (isTransitioning.current) return;
    if (isNaN(index)) return;
    if (index === offset) return;
    setOffset(index);
    isTransitioning.current = true;
  };

  const carouselIndicators: ReactElement[] = [];
  for (let i = 0; i < gameData.length; i++) {
    carouselIndicators.push(
      <Carouselndicator
        key={`carousel_indicator_hero_${i}`}
        handleClick={() => handleShuffle(i)}
        index={i}
        selectedIndex={offset}
      />
    );
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <button
          onClick={handlePrev}
          className="z-10 grid place-content-center rounded-full h-10 w-10 absolute left-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
        >
          <MdChevronLeft size={40} />
        </button>
        <button
          onClick={handleNext}
          className="z-10 grid place-content-center rounded-full h-10 w-10 absolute right-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark"
        >
          <MdChevronRight size={40} />
        </button>
        <ul className={`hero-carousel relative isolate`}>
          {gameData.map((game, index) => {
            const position =
              (index - offset + gameData.length) % gameData.length;

            let className =
              "absolute top-0 left-2/4 cursor-pointer hero-card transiton-carousel-item ";

            if (position === gameData.length - 1) {
              className +=
                "[transform:translateX(-50%)_scale(0.85)] sm:hover:[transform:translateX(-78%)_scale(0.88)] sm:[transform:translateX(-75%)_scale(0.85)] blur-sm hover:blur-0 brightness-[85%] hover:brightness-100 z-20"; //hover:opacity-95 opactity-85
            } else if (position === gameData.length - 2) {
              className +=
                "[transform:translateX(-50%)_scale(0.7)] lg:hover:[transform:translateX(-97%)_scale(0.72)] lg:[transform:translateX(-95%)_scale(0.7)] blur-sm hover:blur-0 brightness-[70%] hover:brightness-100 z-10"; //hover:opacity-80 opactity-70
            } else if (position === 2) {
              className +=
                "[transform:translateX(-50%)_scale(0.7)] lg:hover:[transform:translateX(-3%)_scale(0.72)] lg:[transform:translateX(-5%)_scale(0.7)] blur-sm hover:blur-0 brightness-[70%] hover:brightness-100 z-10"; //hover:opacity-80 opactity-70
            } else if (position === 1) {
              className +=
                "[transform:translateX(-50%)_scale(0.85)] sm:hover:[transform:translateX(-22%)_scale(0.88)] sm:[transform:translateX(-25%)_scale(0.85)] blur-sm hover:blur-0 brightness-[85%] hover:brightness-100 z-20"; //hover:opacity-95 opactity-85
            } else if (position === 0) {
              className += "[transform:translateX(-50%)_scale(1)] z-30";
            } else {
              className +=
                "opacity-0 pointer-events-none [transform:translateX(-50%)_scale(1)]";
            }
            return (
              <li
                onTransitionEnd={() => (isTransitioning.current = false)}
                onClick={(e) =>
                  handleShuffle(Number(e.currentTarget.dataset.index!))
                }
                className={className}
                data-index={`${index}`}
                key={`hero_carousel_item_${game.id}}`}
              >
                <HeroCard>
                  <HeroImageB
                    gameName={game.name}
                    imgId={game.cover?.image_id}
                  />
                  <HeroCardDetailsB game={game} />
                </HeroCard>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 mb-32">
        {carouselIndicators}
      </div>
    </>
  );
};

export default HeroCarouselC;
