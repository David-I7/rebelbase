"use client";
import { useState, useRef } from "react";

const InfiniteCarousel = ({ slides }: { slides: React.ReactElement[] }) => {
  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real slide
  const isTransitioning = useRef(false); // To prevent double transitions

  const handleNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (currentIndex === 0) {
      // Snap to the last real slide
      setCurrentIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      // Snap to the first real slide
      setCurrentIndex(1);
    }
  };

  const visibleSlides = [
    slides[slides.length - 1], // Last slide (clone for the beginning)
    ...slides, // Original slides
    slides[0], // First slide (clone for the end)
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {visibleSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ width: "100%" }}
          >
            {slide}
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        Next
      </button>
    </div>
  );
};

export default InfiniteCarousel;
