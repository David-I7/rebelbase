"use client";
import React, { ReactNode } from "react";

const CardLink = ({
  href,
  children,
  className,
  type,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  type: "dialog" | "regular";
}) => {
  return (
    <a
      onClickCapture={(e) => {
        e.stopPropagation();
        if (type === "dialog") {
          const gameDialog = e.currentTarget.parentElement!.parentElement!
            .parentElement!.parentElement as HTMLDialogElement;
          gameDialog.close();
        }
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
