import { imagesMap } from "@/data/constants/gamePageEnums";
import React from "react";

const CardImage = ({ imgId }: { imgId: string }) => {
  if (!imgId)
    return (
      <div className="max-w-[308px] aspect-video rounded bg-surface-container-normal"></div>
    );

  return (
    <img
      className="rounded object-cover max-w-[308px] w-full aspect-video"
      width="308px"
      height="547px"
      loading="lazy"
      src={`${imagesMap.baseUrl}${imagesMap.horizontalCardLarge}/${imgId}.jpg`}
      alt={`Event cover`}
    />
  );
};

export default CardImage;
