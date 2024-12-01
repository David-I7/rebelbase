import { UIEvent } from "react";

export function handleCarouselScroll(
  e: UIEvent,
  nextRef: React.RefObject<HTMLButtonElement>,
  prevRef: React.RefObject<HTMLButtonElement>
): void {
  const carouselContainer = e.currentTarget as HTMLDivElement;

  if (!nextRef.current || !prevRef.current) return;
  if (carouselContainer.scrollLeft > 0) {
    prevRef.current!.classList.add("prev-button");
  } else {
    prevRef.current!.classList.remove("prev-button");
  }
  if (
    carouselContainer.scrollLeft >=
    carouselContainer.scrollWidth - carouselContainer.offsetWidth - 1
  ) {
    nextRef.current!.classList.remove("next-button");
  } else {
    nextRef.current!.classList.add("next-button");
  }
}
