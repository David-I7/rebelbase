import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[200px] md:grid-cols-[254px] lg:grid-cols-[308px] gap-3">
      {children}
    </div>
  );
};

export default Card;
