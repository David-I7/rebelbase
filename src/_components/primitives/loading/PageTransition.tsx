"use client";
import React, { useEffect, useRef } from "react";

const PageTransition = () => {
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!e.target) return;
      const anchorTag = findParentByTagname(e.target as HTMLElement, "A");
      if (!anchorTag) return;
      pageTransitionRef.current!.classList.add("page-transition");
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div
      ref={pageTransitionRef}
      className="fixed z-50 inset-0 pointer-events-none"
    ></div>
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
