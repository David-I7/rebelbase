"use client";
import React, { ReactNode, useRef } from "react";
import { DialogToggleOpen } from "../primitives/dialog/DialogToggle";
import { MdChevronRight } from "react-icons/md";
import Dialog from "../primitives/dialog/Dialog";

type SectionProps = {
  label: ReactNode;
  sectionHasDialog: boolean;
  children: ReactNode;
};

const SectionDialog = ({
  label,
  sectionHasDialog,
  children: dialogChildren,
}: SectionProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggle = () => {
    dialogRef.current!.showModal();
  };

  if (!sectionHasDialog) return;

  return (
    <DialogToggleOpen
      style={{ padding: 0 }}
      extendedClass="text-nowrap mb-4 hover:gap-4 transition-[gap]"
      toggle={toggle}
      label={label}
      trailingIcon={
        <MdChevronRight
          size={32}
          className="flex-shrink-0 text-on-surface-heading-varient"
        />
      }
    >
      <Dialog
        customClass="mx-0 [@media(min-width:380px)]:w-[calc(100%_-_48px)] [@media(min-width:380px)_and_(max-width:737px)]:mx-6 [@media(min-width:737px)]:mx-auto scroll-hidden"
        style={{ maxWidth: "689px" }}
        ref={dialogRef}
      >
        {dialogChildren}
      </Dialog>
    </DialogToggleOpen>
  );
};

export default SectionDialog;
