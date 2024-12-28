import React, { ReactNode } from "react";

const VerticalCardSkeleton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[244px] animate-pulse">
      <div className="flex flex-col max-w-[244px]">
        <div className="w-full max-w-[244px] aspect-[3/4] rounded-xl  bg-surface-container-normal mb-3"></div>
        {children}
      </div>
    </div>
  );
};

export default VerticalCardSkeleton;
