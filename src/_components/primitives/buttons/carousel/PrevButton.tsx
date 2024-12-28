"use client";
import React, { forwardRef, MouseEvent, useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";

const PrevButton = forwardRef(
  (
    { isScrolling }: { isScrolling: React.MutableRefObject<boolean> },
    prevRef: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const handlePrev = (e: MouseEvent) => {
      if (isScrolling.current) return;
      const carouselContainer = e.currentTarget.parentElement!;

      const scrollAmount = carouselContainer.offsetWidth;

      if (carouselContainer.scrollLeft === 0) return;
      else if (carouselContainer.scrollLeft - scrollAmount <= 0) {
        const deltaX = -carouselContainer.scrollLeft;

        carouselContainer.scrollBy({
          behavior: "smooth",
          left: deltaX,
        });
      } else {
        carouselContainer.scrollBy({
          behavior: "smooth",
          left: -scrollAmount,
        });
      }
      isScrolling.current = true;
      setTimeout(() => (isScrolling.current = false), 300);
    };

    return (
      <button
        ref={prevRef}
        onClick={handlePrev}
        className="z-10 grid invisible transition-[visibility] place-content-center rounded-full h-14 w-14 absolute left-0 ml-4 lg:ml-8 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
      >
        <MdChevronLeft size={40} />
      </button>
    );
  }
);

PrevButton.displayName = "PrevButton";

export default PrevButton;
