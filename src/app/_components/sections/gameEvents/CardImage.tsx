import { imagesMap } from "@/data/constants/gamePageEnums";
import React from "react";

const CardImage = ({
  imgId,
  maxWidth,
  type = "regular",
}: {
  imgId: string;
  maxWidth?: string;
  type?: "large" | "regular";
}) => {
  if (!imgId)
    return (
      <div className="max-w-[308px] aspect-video rounded bg-surface-container-normal"></div>
    );

  return (
    <img
      className={`${maxWidth} rounded object-cover w-full aspect-video`}
      width="308px"
      height="547px"
      loading="lazy"
      src={`${imagesMap.baseUrl}${imagesMap.horizontalCardLarge}${
        type == "large" ? "_2x" : ""
      }/${imgId}.jpg`}
      alt={`Event cover`}
    />
  );
};

export default CardImage;
