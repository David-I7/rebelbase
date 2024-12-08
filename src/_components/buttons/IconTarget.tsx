"use client";
import React, { ReactElement } from "react";

type IconTargetProps = {
  handleClick?: () => void;
  children: ReactElement;
  customClass?: string;
};

const IconTarget = ({
  handleClick,
  children,
  customClass,
}: IconTargetProps) => {
  return (
    <button
      className={`${customClass} hover:brightness-115 transition-brightness  cursor-pointer grid place-content-center min-h-10 min-w-10`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default IconTarget;
