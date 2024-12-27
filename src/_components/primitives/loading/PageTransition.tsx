"use client";
import React, { useEffect, useRef } from "react";

const PageTransition = () => {
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: Event) => {
      console.log(e.target);
      if (!e.target) return;
      const anchorTag = findParentByTagname(e.target as HTMLElement, "A");
      console.log(anchorTag);
      if (!anchorTag) return;
      pageTransitionRef.current!.classList.remove("hidden");
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div
      ref={pageTransitionRef}
      className="fixed page-transition z-50 inset-0 hidden"
    >
      <div className="loading-indicator left-0 right-0 pointer-events-none absolute top-0 h-1 w-full rounded-sm bg-primary"></div>
    </div>
  );
};

export default PageTransition;

function findParentByTagname(element: HTMLElement, tagName: string) {
  let parent: HTMLElement | null = element;

  while (parent) {
    if (parent.tagName === tagName) {
      break;
    }
    parent = parent.parentElement;
  }

  return parent;
}
