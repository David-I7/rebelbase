import React from "react";

type CardImageProps = {
  imgSrc?: string;
};

const CardImage = ({ imgSrc }: CardImageProps) => {
  if (!imgSrc)
    return (
      <div className="aspect-square rounded-full w-[146px] h-[146px] bg-surface-container-normal"></div>
    );

  return (
    <img
      src={imgSrc}
      loading="lazy"
      alt="profile picture"
      className="aspect-square rounded-full"
      width={146}
      height={146}
    />
  );
};

export default CardImage;
