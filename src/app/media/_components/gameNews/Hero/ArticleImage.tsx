import React from "react";

const ArticleImage = ({ imgSrc }: { imgSrc: string | undefined }) => {
  if (!imgSrc)
    return (
      <div className="min-w-[275px] rounded bg-surface-container-normal aspect-video"></div>
    );

  return (
    <div className="rounded aspect-video grid place-content-center overflow-hidden ">
      <img
        className="w-full object-cover aspect-video"
        alt="Article thumbnail"
        src={imgSrc}
        loading="eager"
        width={410}
        height={256}
      />
    </div>
  );
};

export default ArticleImage;
