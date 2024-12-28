"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import PrevButton from "@/_components/primitives/buttons/carousel/PrevButton";
import NextButton from "@/_components/primitives/buttons/carousel/NextButton";
import { handleCarouselScroll } from "@/utils/eventHandlers";

type VerticalListSectionProps = {
  children: ReactNode;
};

const VerticalListSection = ({ children }: VerticalListSectionProps) => {
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
    <section className="mt-20 w-full">
      <div className="relative">
        <div
          className="flex gap-6 overflow-x-auto carousel pr-4 md:pr-8 [@media(min-width:1344px)]:pr-0"
          onScroll={(e) => handleCarouselScroll(e, nextRef, prevRef)}
        >
          {children}
          <PrevButton isScrolling={isScrolling} ref={prevRef} />
          <NextButton isScrolling={isScrolling} ref={nextRef} />
        </div>
      </div>
    </section>
  );
};

export default VerticalListSection;
