import React, { ReactNode } from "react";

type HorizontalCardProps = {
  children: ReactNode;
};

const HorizontalCard = ({ children }: HorizontalCardProps) => {
  return <div className="min-w-[308px] flex flex-col">{children}</div>;
};

export default HorizontalCard;
