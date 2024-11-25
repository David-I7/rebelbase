import React, { ReactNode } from "react";

const HeroCard = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[835px] flex flex-col">{children}</div>;
};

export default HeroCard;
