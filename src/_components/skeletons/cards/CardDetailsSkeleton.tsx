import Dot from "@/_components/Dot";
import React from "react";

const CardDetailsSkeleton = ({
  type,
}: {
  type: "RATING" | "FIRST_RELEASE_DATE";
}) => {
  return (
    <div>
      <div className="flex items-center gap-x-2 mb-[6px]">
        <div className="h-[12px] flex-1 rounded-sm bg-surface-container-normal"></div>
        <Dot
          style={{ backgroundColor: "var(--color-surface-container-high)" }}
        />
        <div className="h-[12px] flex-1 rounded-sm bg-surface-container-normal"></div>
      </div>
      <div className="h-6 rounded-sm bg-surface-container-normal mb-2"></div>
      <div className="flex items-center gap-[2px] mt-[3px]">
        {type === "RATING" && (
          <>
            <div className="h-[18px] w-8 rounded-sm bg-surface-container-normal"></div>
            <div className="h-[18px] w-[18px]  rounded-lg bg-surface-container-normal"></div>
          </>
        )}
        {type === "FIRST_RELEASE_DATE" && (
          <>
            <div className="h-[18px] w-4/5 rounded-sm bg-surface-container-normal"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetailsSkeleton;
