"use client";
import React, { useEffect } from "react";

const handleScroll = (e: Event, direction: "x" | "y") => {
  const evCurrentTarget = e.currentTarget! as HTMLElement | Document;

  if (evCurrentTarget instanceof HTMLElement) {
    console.log(evCurrentTarget.scrollHeight, evCurrentTarget.offsetHeight);
  } else {
    console.log(
      evCurrentTarget.documentElement.scrollHeight,
      evCurrentTarget.documentElement.offsetHeight,
      window.scrollY
    );
  }
};

const useScrollEnd = (
  direction: "x" | "y" = "y",
  documentElement = true,
  elementId?: string
) => {
  useEffect(() => {
    const handleScrollWrapper = (e: Event) => handleScroll(e, direction);

    let elementRef = documentElement
      ? document
      : document.getElementById(elementId!)!;

    if (!elementRef) return;

    elementRef.addEventListener("scroll", handleScrollWrapper);

    return () => {
      elementRef.removeEventListener("scroll", handleScrollWrapper);
    };
  }, []);
};

export default useScrollEnd;
