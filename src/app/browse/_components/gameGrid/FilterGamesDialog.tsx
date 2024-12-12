"use client";
import Dialog from "@/_components/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/dialog/DialogToggle";
import React, { ReactNode, useRef } from "react";
import { MdFilterAlt } from "react-icons/md";

const FilterGamesDialog = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleOpen = () => {
    dialogRef.current!.showModal();
  };
  return (
    <DialogToggleOpen
      style={{ fontSize: "18px", color: "var(--color-primary)" }}
      toggle={toggleOpen}
      label="Filter"
      leadingIcon={<MdFilterAlt size={18} />}
    >
      <Dialog
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
        ref={dialogRef}
      >
        {children}
      </Dialog>
    </DialogToggleOpen>
  );
};

export default FilterGamesDialog;
