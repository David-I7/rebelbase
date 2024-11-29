import React, { ReactNode } from "react";

type HorizontalCardProps = {
  children: ReactNode;
};

const HorizontalCard = ({ children }: HorizontalCardProps) => {
  return <div className="max-w-[308px] h-full flex flex-col">{children}</div>;
};

export default HorizontalCard;
