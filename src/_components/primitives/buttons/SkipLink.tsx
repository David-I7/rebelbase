"use client";
import Link from "next/link";
import React, { ReactNode, useRef } from "react";

type SkipLinkProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  sectionId: string;
  isActive: boolean;
};

const SkipLink = ({
  trailingIcon,
  leadingIcon,
  label,
  sectionId,
  isActive,
}: SkipLinkProps) => {
  const linkPadding =
    trailingIcon && leadingIcon
      ? "px-2"
      : trailingIcon
      ? "pl-4 pr-2"
      : leadingIcon
      ? "pl-2 pr-2"
      : "px-4";

  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={linkRef}
      href={`#${sectionId}`}
      className={`${linkPadding} ${
        isActive ? "bg-secondary text-on-secondary" : ""
      } flex items-center justify-center gap-2 font-medium font-body-s h-8 rounded-full`}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </Link>
  );
};

export default SkipLink;
