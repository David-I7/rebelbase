"use client";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

type SkipLinkProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  sectionId: string;
};

const SkipLink = ({
  trailingIcon,
  leadingIcon,
  label,
  sectionId,
}: SkipLinkProps) => {
  const linkPadding =
    trailingIcon && leadingIcon
      ? "px-2"
      : trailingIcon
      ? "pl-4 pr-2"
      : leadingIcon
      ? "pl-2 pr-2"
      : "px-4";

  useEffect(() => {
    const sectionRef = document.getElementById(sectionId.replace("#", ""))!;
    const handleScroll = () => {
      console.log(sectionId, sectionRef.offsetTop);
    };
    handleScroll();

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link
      href={sectionId}
      className={`${linkPadding} flex items-center justify-center gap-2 font-medium font-body-s h-8 rounded-full`}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </Link>
  );
};

export default SkipLink;
