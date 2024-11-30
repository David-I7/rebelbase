"use client";
import React, { ReactNode, UIEvent, useRef } from "react";
import HorizontalCard from "./HorizontalCard";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import { CardData } from "@/interfaces/igdb";
import PrevButton from "@/_components/buttons/carousel/PrevButton";
import NextButton from "@/_components/buttons/carousel/NextButton";
import { handleCarouselScroll } from "@/utils/eventHandlers";

export type HorizontalCardCarouselProps = {
  children: ReactNode;
};

const HorizontalCardCarousel = ({ children }: HorizontalCardCarouselProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const isScrolling = useRef<boolean>(false);

  return (
    <div className="relative">
      <div
        className="overflow-x-auto carousel"
        onScroll={(e) => handleCarouselScroll(e, nextRef, prevRef)}
      >
        {children}
        <PrevButton isScrolling={isScrolling} ref={prevRef} />
        <NextButton isScrolling={isScrolling} ref={nextRef} />
      </div>
    </div>
  );
};

export default HorizontalCardCarousel;
