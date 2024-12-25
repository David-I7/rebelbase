import React from "react";

const CardImage = ({
  imgSrc,
  memeDescription,
}: {
  imgSrc: string;
  memeDescription: string;
}) => {
  if (!imgSrc)
    return (
      <div className="aspect-[3/4] h-full w-full bg-surface-container-normal rounded"></div>
    );

  return (
    <div className="aspect-[3/4] h-full w-full bg-surface-container-normal rounded">
      <img
        width={244}
        height={340}
        className="object-fill rounded h-full"
        src={imgSrc}
        alt={memeDescription}
        loading="lazy"
      />
    </div>
  );
};

export default CardImage;
