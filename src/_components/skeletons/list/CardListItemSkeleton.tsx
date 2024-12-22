import React, { ReactNode } from "react";

const CardListItemSkeleton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer gap-2 lg:gap-3 grid lg:grid-cols-[64px_minmax(0px,1fr)] grid-cols-[48px_minmax(0px,1fr)] items-center">
      {children}
    </div>
  );
};

export default CardListItemSkeleton;
