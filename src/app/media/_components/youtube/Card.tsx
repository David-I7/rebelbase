import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="grid gap-2 grid-cols-[146px]">{children}</div>;
};

export default Card;
