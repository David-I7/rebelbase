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
        className="h-[15px] rounded bg-surface-container-normal w-full last:w-2/4"
      ></div>
    );
  }
  const headingSkeletons: React.JSX.Element[] = [];

  for (let i = 0; i < headingLineCount; i++) {
    headingSkeletons.push(
      <div
        key={`heading_skeleton_${i}`}
        className={`${
          orientation === "landscape" ? "h-5" : "h-7"
        } rounded bg-surface-container-normal w-full last:w-2/4`}
      ></div>
    );
  }

  return (
    <div
      className={`${
        orientation === "landscape" ? "gap-5" : "gap-4"
      } flex-1 flex-col flex`}
    >
      <div className={"flex flex-col gap-1"}>{headingSkeletons}</div>
      <div className="flex flex-col gap-1">{bodySkeletons}</div>
    </div>
  );
};

export default NewsSummarySkeleton;
