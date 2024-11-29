import { WheelEvent } from "react";

export function handleWheel<T extends HTMLElement>(e: WheelEvent<T>) {
  e.preventDefault();
  const carouselRef = e.currentTarget as unknown as HTMLUListElement;
  const carouselContainer = carouselRef.parentElement!;

  const parentWidth = carouselContainer.offsetWidth;
  const carouselWidth = carouselRef.offsetWidth;

  if (carouselWidth <= parentWidth) return;

  const currentPosition = Number(carouselRef.dataset.position);

  if (isNaN(currentPosition)) return;

  const maxPosition = parentWidth - carouselWidth;
  const minPosition = 0;

  if (
    currentPosition - e.deltaX > minPosition ||
    currentPosition - e.deltaX < maxPosition
  )
    return;

  const newPosition = currentPosition - e.deltaX;

  carouselRef.style.transform = `translateX(${newPosition}px)`;
  carouselRef.dataset.position = `${newPosition}`;
}
