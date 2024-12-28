"use client";
import React, { ReactNode, useEffect } from "react";

type FullScreenDialogProps = {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
};

const FullScreenDialog = ({
  id,
  isOpen,
  children,
  style,
}: FullScreenDialogProps) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <section
      style={style}
      id={id}
      className={`${
        isOpen ? "h-dvh duration-[350ms]" : "h-0 duration-200"
      } transition-[height]  w-dvw fixed bg-surface-container-lowest overflow-y-auto z-30 top-0 left-0`}
    >
      {children}
    </section>
  );
};

export default FullScreenDialog;
