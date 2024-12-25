"use client";
import NextButton from "@/_components/primitives/buttons/carousel/NextButton";
import PrevButton from "@/_components/primitives/buttons/carousel/PrevButton";
import { handleCarouselScroll } from "@/utils/eventHandlers";
import React, { ReactNode, useEffect, useRef } from "react";

const YoutubeChannelCarousel = ({ children }: { children: ReactNode }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const isScrolling = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const container = prevRef.current!.parentElement!;

      if (container.scrollWidth === container.offsetWidth) {
        container.classList.remove("carousel");
      } else {
        container.classList.add("carousel");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

export default YoutubeChannelCarousel;
