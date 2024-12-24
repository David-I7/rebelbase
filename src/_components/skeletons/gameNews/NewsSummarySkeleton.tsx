import React from "react";

const NewsSummarySkeleton = ({
  orientation,
}: {
  orientation: "landscape" | "portrait";
}) => {
  const bodyLineCount = orientation === "landscape" ? 4 : 2;
  const headingLineCount = 2;

  const bodySkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < bodyLineCount; i++) {
    bodySkeletons.push(
      <div
        key={`body_skeleton_${i}`}
        className="h-[17px] rounded bg-surface-container-normal w-full"
      ></div>
    );
  }
  const headingSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < headingLineCount; i++) {
    headingSkeletons.push(
      <div
        key={`heading_skeleton_${i}`}
        className={`${
          orientation === "landscape" ? "h-5" : "h-6"
        } rounded bg-surface-container-normal w-full`}
      ></div>
    );
  }

  return (
    <div className="flex-1">
      <div className={"flex flex-col gap-1"}>{headingSkeletons}</div>
      <div className="flex flex-col gap-1">{bodySkeletons}</div>
    </div>
  );
};

export default NewsSummarySkeleton;
