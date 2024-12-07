"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const NON_EXPANDED_ACCORDION_HEIGHT = 208;

const AboutLanguagesAccordion = ({ children }: { children: ReactNode }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => {
    const accordionRefScrollHeight = accordionRef.current!.scrollHeight;

    if (isOpen) {
      accordionRef.current!.style.height = `${NON_EXPANDED_ACCORDION_HEIGHT}px`;
      setIsOpen(false);
    } else {
      accordionRef.current!.style.height = `${accordionRefScrollHeight}px`;
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (accordionRef.current!.scrollHeight <= NON_EXPANDED_ACCORDION_HEIGHT) {
      accordionRef.current!.style.height = "auto";
      buttonRef.current!.style.display = "none";
    }
  }, []);

  return (
    <div className="">
      <div
        id="languages_table_container"
        ref={accordionRef}
        className="h-52 transition-[height] duration-300 overflow-hidden"
      >
        {children}
      </div>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="languages_table_container"
        className="flex h-10 px-4 rounded-full items-center font-medium text-primary bg-surface-container-lowest hover:bg-surface-container-normal font-body-s transition-colors"
      >
        {isOpen ? "See Less" : "See All"}
      </button>
    </div>
  );
};

export default AboutLanguagesAccordion;
