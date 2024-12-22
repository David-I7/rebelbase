"use client";
import Dialog from "@/_components/primitives/dialog/Dialog";

import React, { ReactNode, useRef } from "react";
import { MdChevronRight } from "react-icons/md";

const AboutGameDialog = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        onClick={() => {
          dialogRef.current!.showModal();
        }}
        className="grid grid-cols-[repeat(2,auto)] text-nowrap gap-2 [@media(min-width:880px)]:hidden hover:gap-4 transition-[gap]"
      >
        <h2 className="flex items-center gap-2 mb-4 text-2xl ">
          About this game
        </h2>
        <MdChevronRight
          className="flex-shrink-0 text-on-surface-heading"
          size={32}
        />
      </button>

      <h2 className="items-center gap-2 mb-4 text-2xl hidden [@media(min-width:880px)]:flex">
        About this game
      </h2>
      <Dialog
        customClass="[@media(max-width:737px)]:mx-6 scroll-hidden"
        style={{ maxWidth: "689px" }}
        ref={dialogRef}
      >
        {children}
      </Dialog>
    </>
  );
};

export default AboutGameDialog;
