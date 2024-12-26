"use client";
import React, { ReactNode } from "react";

const CardLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <a
      onClickCapture={(e) => {
        e.stopPropagation();
      }}
      className={className}
      target="_blank"
      href={href}
    >
      {children}
    </a>
  );
};

export default CardLink;
