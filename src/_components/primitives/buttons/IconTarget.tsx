"use client";
import React, { MouseEvent, ReactElement } from "react";

type IconTargetProps = {
  handleClick?: (e?: MouseEvent) => void;
  children: ReactElement;
  customClass?: string;
  type?: "button" | "reset" | "submit";
};

const IconTarget = ({
  handleClick,
  children,
  customClass,
  type = "button",
}: IconTargetProps) => {
  return (
    <button
      type={type}
      className={`${customClass}  cursor-pointer grid place-content-center min-h-10 min-w-10`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default IconTarget;
