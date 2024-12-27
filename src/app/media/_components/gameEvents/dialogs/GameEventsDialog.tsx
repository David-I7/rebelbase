import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import React, { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";

type DialogProps = {
  label: ReactNode;
  children: ReactNode;
  toggle: () => void;
};

const GameEventsDialog = React.forwardRef(
  (
    { label, children, toggle }: DialogProps,
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
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
          ref={ref}
        >
          {children}
        </Dialog>
      </DialogToggleOpen>
    );
  }
);

export default GameEventsDialog;
