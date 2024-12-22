"use client";
import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import React, { ReactNode, useEffect, useRef } from "react";
import { MdFilterAlt } from "react-icons/md";

const FilterGamesDialog = ({
  children,
  isOpen,
  toggle,
}: {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);
  return (
    <DialogToggleOpen
      extendedClass="hover:brightness-115 transition-brightness [@media(min-width:880px)]:hidden"
      style={{ fontSize: "18px", color: "var(--color-primary)" }}
      toggle={toggle}
      label="Filter"
      leadingIcon={<MdFilterAlt size={18} />}
    >
      <Dialog
        customClass="[@media(min-width:880px)]:hidden"
        onClose={toggle}
        style={{
          maxWidth: "420px",
          height: "100%",
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
