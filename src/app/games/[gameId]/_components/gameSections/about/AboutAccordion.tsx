"use client";
import React, { useEffect, useRef } from "react";

const NON_EXPANDED_ACCORDION_HEIGHT = 240;

const AboutAccordion = ({ children }: { children: React.ReactNode }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (accordionRef.current!.scrollHeight <= NON_EXPANDED_ACCORDION_HEIGHT) {
      accordionRef.current!.style.height = "auto";
      accordionRef.current!.classList.remove("transition-section");
    }
  }, []);
  return (
    <div className="">
      <div
        ref={accordionRef}
        className="h-60 [@media(min-width:880px)]:h-auto [@media(min-width:880px)]:after:hidden relative overflow-hidden transition-section"
      >
        {children}
      </div>
    </div>
  );
};

export default AboutAccordion;
