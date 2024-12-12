"use client";

import React, { ReactNode } from "react";

type OutlineButtonProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  handleClick?: () => void;
};

const OutlineButton = ({
  trailingIcon,
  leadingIcon,
  label,
  handleClick,
}: OutlineButtonProps) => {
  const buttonPadding =
    trailingIcon && leadingIcon
      ? "px-4"
      : trailingIcon
      ? "pl-8 pr-4"
      : leadingIcon
      ? "pl-4 pr-8"
      : "px-8";

  return (
    <button
      className={`${buttonPadding} text-sm hover:bg-surface-container-normal transition-colors flex items-center gap-2 text-primary border border-outline font-medium font-headings rounded-full justify-center h-10`}
      onClick={handleClick}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
};

export default OutlineButton;
