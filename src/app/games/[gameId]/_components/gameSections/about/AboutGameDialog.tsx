"use client";
import Dialog from "@/_components/dialog/Dialog";

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
        className="grid grid-cols-2 [@media(min-width:880px)]:hidden"
      >
        About this game
        <MdChevronRight className="flex-shrink-0" size={32} />
      </button>
      <span className="hidden [@media(min-width:880px)]:inline">
        About this game
      </span>
      <Dialog style={{ paddingTop: "0px", maxWidth: "689px" }} ref={dialogRef}>
        {children}
      </Dialog>
    </>
  );
};

export default AboutGameDialog;
