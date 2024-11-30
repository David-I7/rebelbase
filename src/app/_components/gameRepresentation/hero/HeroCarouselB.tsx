"use client";
import { CardData } from "@/interfaces/igdb";
import React, { ReactElement, useRef, useState } from "react";
import HeroCard from "./HeroCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Carouselndicator from "@/_components/buttons/carousel/Carouselndicator";
import HeroImageB from "./HeroImageB";
import HeroCardDetailsB from "./HeroCardDetailsB";

const ITEMS_IN_CAROUSEL = 5;

const HeroCarouselB = ({ gameData }: { gameData: CardData[] }) => {
  let carouselItems: React.ReactElement[] = [];

  for (let i = 0; i < ITEMS_IN_CAROUSEL; i++) {
    carouselItems.push(
      <li
        className="flex justify-center h-full"
        key={`hero_carousel_item_${gameData[i].id}}`}
      >
        <HeroCard>
          <HeroImageB
            gameName={gameData[i].name}
            imgId={gameData[i].cover?.image_id}
          />
          <HeroCardDetailsB game={gameData[i]} />
        </HeroCard>
      </li>
    );
  }

  const cloneStart = React.cloneElement(
    carouselItems[carouselItems.length - 1],
    { key: "cloned_item_start" }
  );
  const cloneEnd = React.cloneElement(carouselItems[0], {
    key: "cloned_item_end",
  });

  carouselItems = [cloneStart, ...carouselItems, cloneEnd];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselIndicators: ReactElement[] = [];

  const handleIndicatorClick = (index: number) => {
    if (index === selectedIndex) return;

    if (selectedIndex === 1 && index === carouselItems.length - 2) {
      setSelectedIndex(0);
    } else if (selectedIndex === carouselItems.length - 2 && index === 1) {
      setSelectedIndex(carouselItems.length - 1);
    } else {
      setSelectedIndex(index);
    }
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(carouselItems.length - 2);
    } else if (selectedIndex === carouselItems.length - 1) {
      setSelectedIndex(1);
    }
    setIsTransitioning(false);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prevIndex) => prevIndex + 1);
  };

  for (let i = 0; i < ITEMS_IN_CAROUSEL; i++) {
    carouselIndicators.push(
      <Carouselndicator
        key={`carousel_indicator_hero_${i}`}
        handleClick={handleIndicatorClick}
        index={i + 1}
        selectedIndex={selectedIndex}
      />
    );
  }

  return (
    <>
      <div className="relative overflow-hidden" ref={carouselRef}>
        <button
          className="z-10 grid place-content-center rounded-full h-14 w-14 absolute left-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
          onClick={handlePrev}
        >
          <MdChevronLeft size={56} />
        </button>
        <button
          className="z-10 grid place-content-center rounded-full h-14 w-14 absolute right-0 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
          onClick={handleNext}
        >
          <MdChevronRight size={56} />
        </button>
        <ul
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${selectedIndex * 100}%)`,
          }}
          className={`flex ${
            isTransitioning ? "transition-transform duration-300" : ""
          }`}
        >
          {carouselItems}
        </ul>
      </div>
      <div className="flex items-center justify-center space-x-2">
        {carouselIndicators}
      </div>
    </>
  );
};

export default HeroCarouselB;
