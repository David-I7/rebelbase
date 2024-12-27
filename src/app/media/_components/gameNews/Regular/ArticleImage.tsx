import { format } from "date-fns";
import React from "react";

const ArticleImage = ({
  imgSrc,
  publishDate,
}: {
  imgSrc: string | undefined;
  publishDate?: string;
}) => {
  if (!imgSrc)
    return (
      <div className="min-w-[147px] max-w-[147px] sm:min-w-[205px] sm:max-w-[205px] rounded bg-surface-container-normal aspect-video relative">
        {publishDate && (
          <div className="absolute bottom-0 left-0 right-0 h-7 bg-background-blur-dark px-2 flex items-center text-on-surface-heading-varient font-body-xs">
            {format(publishDate, "dd MMM")}
          </div>
        )}
      </div>
    );

  return (
    <div className="rounded aspect-video grid place-content-start overflow-hidden min-w-[147px] max-w-[147px] sm:min-w-[205px] sm:max-w-[205px] relative">
      <img
        className="w-full object-cover aspect-video"
        alt="Article thumbnail"
        src={imgSrc}
        loading="eager"
        width={205}
        height={128}
      />
      {publishDate && (
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-background-blur-dark px-2 flex items-center text-on-surface-heading-varient font-body-xs">
          {format(publishDate, "dd MMM")}
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
