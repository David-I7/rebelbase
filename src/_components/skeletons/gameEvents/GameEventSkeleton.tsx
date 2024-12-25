import Dot from "@/_components/Dot";
import React from "react";

const GameEventSkeleton = () => {
  return (
    <li className="min-h-full">
      <div className="grid grid-cols-[200px] md:grid-cols-[254px] lg:grid-cols-[308px] gap-3">
        <div className="max-w-[308px] w-full aspect-video rounded bg-surface-container-normal"></div>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="h-[14px] rounded bg-surface-container-normal w-14"></div>
            <Dot
              style={{
                background: "var(--color-on-surface-body-varient-lowest)",
              }}
            />
            <div className="h-[14px] rounded bg-surface-container-normal w-14"></div>
          </div>
          <div className="h-[20px] rounded bg-surface-container-normal w-full mb-3"></div>
          <div className="h-[16px] rounded bg-surface-container-normal w-2/3"></div>
        </div>
      </div>
    </li>
  );
};

export default GameEventSkeleton;
