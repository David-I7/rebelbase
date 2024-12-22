"use client";

import React, { ReactNode } from "react";

type FilledButtonProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  handleClick?: () => void;
};

const FilledButton = ({
  trailingIcon,
  leadingIcon,
  label,
  handleClick,
}: FilledButtonProps) => {
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
      className={`${buttonPadding} text-sm hover:brightness-115 transition-brightness flex items-center gap-2 text-on-primary bg-primary font-medium font-headings rounded-full justify-center h-10`}
      onClick={handleClick}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
};

export default FilledButton;
