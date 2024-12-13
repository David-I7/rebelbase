"use client";
import Dialog from "@/_components/dialog/Dialog";

import React, { ReactNode, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";

const AboutGameDialog = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        onClick={() => {
          dialogRef.current!.showModal();
        }}
        className="grid grid-cols-[repeat(2,auto)] text-nowrap gap-2 [@media(min-width:880px)]:hidden"
      >
        About this game
        <MdChevronRight className="flex-shrink-0" size={32} />
      </button>
      <span className="hidden [@media(min-width:880px)]:inline">
        About this game
      </span>
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
