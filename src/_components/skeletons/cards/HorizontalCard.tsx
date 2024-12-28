import React, { ReactNode } from "react";

const HorizontalCardSkeleton = ({ children }: { children: ReactNode }) => {
  return (
    <li className="h-full animate-pulse">
      <div className="max-w-[308px] h-full flex flex-col">
        <div className=" max-w-[308px] aspect-video bg-surface-container-normal rounded-xl overflow-hidden mb-3"></div>
        {children}
      </div>
    </li>
  );
};

export default HorizontalCardSkeleton;
