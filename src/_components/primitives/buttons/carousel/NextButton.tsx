"use client";
import React, { forwardRef, MouseEvent } from "react";
import { MdChevronRight } from "react-icons/md";

const NextButton = forwardRef(
  (
    { isScrolling }: { isScrolling: React.MutableRefObject<boolean> },
    prevRef: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const handleNext = (e: MouseEvent) => {
      if (isScrolling.current) return;

      const carouselContainer = e.currentTarget.parentElement!;

      const scrollAmount = carouselContainer.offsetWidth;
      const scrollEnd =
        carouselContainer.scrollWidth - carouselContainer.offsetWidth + 1;

      if (carouselContainer.scrollLeft >= scrollEnd) return;
      if (carouselContainer.scrollLeft + scrollAmount >= scrollEnd) {
        const deltaX = scrollEnd - carouselContainer.scrollLeft;

        carouselContainer.scrollBy({
          behavior: "smooth",
          left: deltaX,
        });
      } else {
        carouselContainer.scrollBy({
          behavior: "smooth",
          left: scrollAmount,
        });
      }
      isScrolling.current = true;
      setTimeout(() => (isScrolling.current = false), 300);
    };

    return (
      <button
        ref={prevRef}
        onClick={handleNext}
        className="z-10 grid invisible next-button transition-[visibility] place-content-center rounded-full h-14 w-14 absolute right-0 mr-4 lg:ml-8 vertical-center text-white backdrop-blur-md bg-background-blur-dark "
      >
        <MdChevronRight size={40} />
      </button>
    );
  }
);

NextButton.displayName = "NextButton";

export default NextButton;
