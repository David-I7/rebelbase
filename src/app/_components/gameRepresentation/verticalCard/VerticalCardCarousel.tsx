"use client";
import React, { ReactNode, useRef } from "react";
import { handleCarouselScroll } from "@/utils/eventHandlers";
import PrevButton from "@/_components/primitives/buttons/carousel/PrevButton";
import NextButton from "@/_components/primitives/buttons/carousel/NextButton";

type VerticalCardCarouselProps = {
  children: ReactNode;
};

const VerticalCardCarousel = ({ children }: VerticalCardCarouselProps) => {
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

export default VerticalCardCarousel;
