import React from "react";

const NewsSummary = ({
  orientation,
  summary,
  details,
}: {
  orientation: "portrait" | "landscape";
  summary: string;
  details: string;
}) => {
  return (
    <div className="flex-1 basis-0 min-w-0">
      <h2
        className={`${
          orientation === "landscape" ? "text-base mb-2" : "text-xl mb-3"
        } text-ellipsis line-clamp-2`}
      >
        {summary}
      </h2>
      <div
        className={`${
          orientation === "landscape" ? "line-clamp-4" : "line-clamp-2"
        } text-ellipsis font-body-s`}
      >
        {details}
      </div>
    </div>
  );
};

export default NewsSummary;
