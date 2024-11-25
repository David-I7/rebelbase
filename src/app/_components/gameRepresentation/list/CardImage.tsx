import { imagesMap } from "@/data/constants/igdbEnums";

type CardImageProps = {
  imgId?: string;
  gameName: string;
};

const CardImage = ({ imgId, gameName }: CardImageProps) => {
  return (
    <div
      className={`${
        imgId ? "" : "bg-surface-container-low"
      } max-w-[48px] lg:max-w-[64px] aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0`}
    >
      {imgId && (
        <img
          src={`${imagesMap.baseUrl}${imagesMap.verticalCardSmall}/${imgId}.jpg`}
          alt={`${gameName} game cover`}
        />
      )}
    </div>
  );
};

export default CardImage;
