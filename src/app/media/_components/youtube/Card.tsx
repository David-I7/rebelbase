import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="grid gap-2">{children}</div>;
};

export default Card;
