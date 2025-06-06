"use client";
import React, { ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  customClass?: string;
  onClose?: () => void;
  rest?: Record<string, any>;
};

const Dialog = React.forwardRef(
  (
    { children, style, onClose, customClass, rest }: DialogProps,
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <dialog
        style={style}
        {...rest}
        onClick={(e) => {
          const dialogPosition = e.currentTarget.getBoundingClientRect();

          if (
            e.clientX < dialogPosition.left ||
            e.clientX > dialogPosition.right ||
            e.clientY > dialogPosition.bottom ||
            e.clientY < dialogPosition.top
          ) {
            e.currentTarget.close();
            onClose?.();
          }
        }}
        ref={ref}
        className={`${customClass} bg-surface-container-lowest rounded-3xl backdrop:bg-[rgba(0,0,0,0.68)] backdrop:backdrop-blur-sm text-inherit`}
      >
        {children}
      </dialog>
    );
  }
);

Dialog.displayName = "Dialog";

export default Dialog;
