"use client";
import React, { ReactNode, useEffect, useRef } from "react";

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
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    initialRender.current = false;
    if (isOpen) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "auto";
  }, [isOpen]);

  return (
    <section
      style={style}
      id={id}
      className={`h-dvh w-dvw scale-0 fixed bg-surface-container-lowest overflow-y-auto z-20 top-0 left-0 ${
        initialRender.current
          ? ""
          : isOpen
          ? "fullScreenDialogOpen"
          : "fullScreenDialogClose"
      }`}
    >
      {children}
    </section>
  );
};

export default FullScreenDialog;
