import React from "react";

const ArticleImage = ({ imgSrc }: { imgSrc: string | undefined }) => {
  if (!imgSrc) return <div></div>;

  return (
    <div className="rounded aspect-video grid place-content-center overflow-hidden min-w-[288px]">
      <img
        className="w-full"
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
