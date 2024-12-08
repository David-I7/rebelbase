"use client";
import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md";

type DialogToggleProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: ReactNode;
  style?: React.CSSProperties;
  toggle: () => void;
  children: React.ReactElement;
  extendedClass?: string;
};

export const DialogToggleOpen = ({
  trailingIcon,
  leadingIcon,
  label,
  style,
  toggle,
  children,
  extendedClass,
}: DialogToggleProps) => {
  const buttonPadding =
    trailingIcon && leadingIcon
      ? "px-4"
      : trailingIcon
      ? "pl-8 pr-4"
      : leadingIcon
      ? "pl-4 pr-8"
      : "px-8";

  return (
    <>
      <button
        className={`${buttonPadding} ${extendedClass} gap-2 font-body-s font-medium rounded-full h-10 flex items-center`}
        onClick={toggle}
        style={style}
      >
        {leadingIcon}
        {label}
        {trailingIcon}
      </button>
      {children}
    </>
  );
};

export const DialogToggleClose = ({
  icon = <MdClose size={24} />,
  style,
  toggle,
}: {
  style: React.CSSProperties;
  toggle: () => void;
  icon?: React.ReactElement;
}) => {
  return (
    <>
      <button
        className={`rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center hover:bg-surface-container-normal transition-colors`}
        onClick={toggle}
        style={style}
      >
        {icon}
      </button>
    </>
  );
};
