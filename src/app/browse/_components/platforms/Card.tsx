import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-xl bg-surface-container-normal text-on-surface-heading-varient h-[146px] aspect-square p-2 flex flex-col items-center gap-2">
      {children}
    </div>
  );
};

export default Card;
