import React, { ReactNode } from "react";

const CardListItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-normal cursor-pointer flex gap-2 lg:gap-3 items-center">
      {children}
    </div>
  );
};

export default CardListItem;
