import { imagesMap } from "@/data/constants/gamePageEnums";
import React from "react";

const CardImage = ({
  imgId,
  style,
  type = "regular",
}: {
  imgId: string;
  style?: React.CSSProperties;
  type?: "large" | "regular";
}) => {
  if (!imgId)
    return (
      <div className="max-w-[308px] aspect-video rounded bg-surface-container-normal"></div>
    );

  return (
    <img
      style={style}
      className={`rounded object-cover max-w-[308px] w-full aspect-video`}
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
