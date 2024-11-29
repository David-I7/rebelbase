import React, { ReactNode } from "react";

type VerticalCardProps = {
  children: ReactNode;
};

const VerticalCard = ({ children }: VerticalCardProps) => {
  return <div className="flex flex-col max-w-[244px]">{children}</div>;
};

export default VerticalCard;
