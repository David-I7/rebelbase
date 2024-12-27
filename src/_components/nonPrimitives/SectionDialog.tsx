"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!sectionHasDialog) return;

    // This observer takes care of closing the dialog
    // This kepes the browser and app state in sync

    const observer = new MutationObserver(
      (mutationRecord: MutationRecord[]) => {
        if (mutationRecord[0].attributeName === "open") {
          const target = mutationRecord[0].target as HTMLDialogElement;
          if (!target.open) {
            toggle();
          }
        }
      }
    );

    observer.observe(dialogRef.current!, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!sectionHasDialog) return;

    if (isOpen) {
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);

  if (!sectionHasDialog) return;

  return (
    <DialogToggleOpen
      style={{
        padding: 0,
        height: "auto",
        position: "relative",
        alignSelf: "start",
        borderRadius: "0.25rem",
      }}
      extendedClass="text-start mb-4 group mr-8"
      toggle={toggle}
      label={label}
      trailingIcon={
        <MdChevronRight
          size={32}
          className="absolute right-0 top-2/4 -translate-y-2/4 group-hover:translate-x-[calc(100%_+_0.25rem)] translate-x-full  transition-transform flex-shrink-0 text-on-surface-heading"
        />
      }
    >
      <Dialog
        customClass="mx-0 w-full [@media(min-width:380px)]:w-[calc(100%_-_48px)] [@media(min-width:380px)_and_(max-width:737px)]:mx-6 [@media(min-width:737px)]:mx-auto scroll-hidden"
        style={{ maxWidth: "689px" }}
        ref={dialogRef}
      >
        {isOpen && dialogChildren}
      </Dialog>
    </DialogToggleOpen>
  );
};

export default SectionDialog;
