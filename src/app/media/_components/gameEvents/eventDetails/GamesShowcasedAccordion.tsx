"use client";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { EventData } from "@/interfaces/igdb";
import React, { useEffect, useRef, useState } from "react";

const RENDER_COUNT = 10;

const GamesShowcasedAccordion = ({ event }: { event: EventData }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState<number>(
    event.games.length < RENDER_COUNT ? event.games.length : RENDER_COUNT
  );
  const handleToggle = () => {
    if (renderCount < RENDER_COUNT) return;

    if (renderCount === RENDER_COUNT) {
      setRenderCount(event.games.length);
      setIsOpen(true);
    } else {
      setRenderCount(RENDER_COUNT);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (renderCount < RENDER_COUNT) {
      accordionRef.current!.style.height = "auto";
      buttonRef.current!.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // The dialog is set to open only after react finishes rendering
    // The effect runs faster than the layout is calculated
    let mutationObserver: MutationObserver;

    const handleResize = () => {
      const accordionHeight = (
        accordionRef.current!.children[0] as HTMLUListElement
      ).offsetHeight;
      accordionRef.current!.style.height = `${accordionHeight}px`;
    };

    if (renderCount >= RENDER_COUNT) {
      mutationObserver = new MutationObserver((entries) => {
        const target = entries[0].target as HTMLDivElement;
        accordionRef.current!.style.height = `${target.offsetHeight}px`;
      });

      mutationObserver.observe(accordionRef.current!, {
        childList: true,
        subtree: true,
      });

      window.addEventListener("resize", handleResize);
    }

    return () => {
      mutationObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <div ref={accordionRef} className="transition-[height] duration-300">
        <VerticalList
          sectionName="games_showcased"
          gameData={event.games}
          listItemCount={renderCount}
        />
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

export default GamesShowcasedAccordion;
