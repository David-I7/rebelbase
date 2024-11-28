import React, { ReactNode } from "react";

const HeroCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[400px] relative flex flex-col isolate">
      {children}
    </div>
  );
};

export default HeroCard;
