import React from "react";

const ArticleImage = ({ imgSrc }: { imgSrc: string | undefined }) => {
  if (!imgSrc)
    return (
      <div className="min-w-[147px] max-w-[147px] sm:min-w-[205px] sm:max-w-[205px] rounded bg-surface-container-normal aspect-video"></div>
    );

  return (
    <div className="rounded aspect-video grid place-content-start overflow-hidden min-w-[147px] max-w-[147px] sm:min-w-[205px] sm:max-w-[205px]">
      <img
        className="w-full object-cover aspect-video"
        alt="Article thumbnail"
        src={imgSrc}
        loading="eager"
        width={205}
        height={128}
      />
    </div>
  );
};

export default ArticleImage;
