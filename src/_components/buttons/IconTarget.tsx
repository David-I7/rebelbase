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
      className={`${customClass} hover:brightness-115 transition-brightness outline-none outline-1 outline focus:outline-primary cursor-pointer grid place-content-center h-10 w-10`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default IconTarget;
