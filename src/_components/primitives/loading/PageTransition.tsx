"use client";
import { findParentByTagname } from "@/utils/dom";
import React, { useEffect, useRef } from "react";

const PageTransition = () => {
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!e.target) return;
      const anchorTag = findParentByTagname(e.target as HTMLElement, "A");
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
