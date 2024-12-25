import React from "react";

const MemeCardSkeleton = () => {
  return (
    <li>
      <div className="flex w-[164px] md:w-[204px] lg:w-[244px] flex-col gap-3">
        <div className="aspect-[3/4] h-full w-full bg-surface-container-normal rounded"></div>
        <div>
          <div className="w-full bg-surface-container-normal rounded h-[22px] mb-1"></div>
          <div className="w-2/4 bg-surface-container-normal rounded h-[22px]"></div>
        </div>
      </div>
    </li>
  );
};

export default MemeCardSkeleton;
