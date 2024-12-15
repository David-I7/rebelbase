"use client";

import React, { ReactNode } from "react";

type TextButtonProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  handleClick?: () => void;
  style?: React.CSSProperties;
};

const TextButton = ({
  trailingIcon,
  leadingIcon,
  label,
  handleClick,
  style,
}: TextButtonProps) => {
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
      style={style}
      className={`${buttonPadding} text-sm hover:brightness-115 transition-brightness flex items-center gap-2 text-primary font-medium font-headings rounded-full justify-center h-10`}
      onClick={handleClick}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
};

export default TextButton;
