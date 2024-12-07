"use client";
import React from "react";
import { MdClose } from "react-icons/md";

const CloseGameDialog = () => {
  return (
    <button
      onClick={(e) => {
        const gameDialog = e.currentTarget.parentElement!
          .parentElement as HTMLDialogElement;
        gameDialog.close();
      }}
      className="absolute right-0 top-4 rounded-full h-10 w-10 hover:bg-surface-container-normal transition-colors grid place-content-center"
    >
      <MdClose size={24} />
    </button>
  );
};

export default CloseGameDialog;
