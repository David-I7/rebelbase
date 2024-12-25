import Dot from "@/_components/Dot";
import React from "react";

const YoutubeCardSkeleton = () => {
  return (
    <div className="grid gap-2 grid-cols-[146px]">
      <div className="aspect-square rounded-full w-[146px] h-[146px] bg-surface-container-normal"></div>
      <div className="">
        <div className="mb-3 h-[22px] w-2/4 bg-surface-container-normal rounded mx-auto"></div>
        <div className="flex-wrap flex font-body-s items-center gap-x-2 gap-y-1  justify-center">
          <div className="h-[16px] rounded bg-surface-container-normal w-2/3"></div>
          <Dot
            style={{
              background: "var(--color-on-surface-body-varient-lowest)",
            }}
          />
          <div className="h-[16px] rounded bg-surface-container-normal w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeCardSkeleton;
