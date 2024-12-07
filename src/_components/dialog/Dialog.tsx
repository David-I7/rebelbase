"use client";
import React, { ReactNode } from "react";

const Dialog = React.forwardRef(
  (
    { children, style }: { children: ReactNode; style?: React.CSSProperties },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <dialog
        style={style}
        onClick={(e) => {
          const dialogPosition = e.currentTarget.getBoundingClientRect();

          if (
            e.clientX < dialogPosition.left ||
            e.clientX > dialogPosition.right ||
            e.clientY > dialogPosition.bottom ||
            e.clientY < dialogPosition.top
          ) {
            e.currentTarget.close();
          }
        }}
        ref={ref}
        className="rounded-3xl p-6 bg-surface-container-lowest backdrop:bg-[rgba(0,0,0,0.3)] text-inherit scroll-hidden"
      >
        {children}
      </dialog>
    );
  }
);

export default Dialog;
