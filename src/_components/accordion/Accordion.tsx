"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";

const NON_EXPANDED_ACCORDION_HEIGHT = 56;

const Accordion = ({
  summary,
  children,
  style,
}: {
  summary: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      accordionRef.current!.style.height = `${
        accordionRef.current!.scrollHeight
      }px`;
    } else {
      accordionRef.current!.style.height = `${NON_EXPANDED_ACCORDION_HEIGHT}px`;
    }
  }, [isOpen]);

  return (
    <div
      style={style}
      ref={accordionRef}
      className="overflow-hidden transition-[height]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 font-medium text-on-surface-heading-varient font-body-m flex min-w-full justify-between items-center`}
        aria-expanded={isOpen}
      >
        {summary}
        <MdChevronRight
          size={24}
          className={`${
            isOpen ? "-rotate-90" : "rotate-90"
          } transition-transform`}
        />
      </button>

      {children}
    </div>
  );
};

export default Accordion;
