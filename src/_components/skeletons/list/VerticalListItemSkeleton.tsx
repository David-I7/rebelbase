import CardImage from "@/app/_components/gameRepresentation/verticalCard/CardImage";
import CardDetailsSkeleton from "../cards/CardDetailsSkeleton";

const VerticalList = ({
  gameData,
  sectionName,
  gameId,
  listItemCount = LIST_ITEM_QUANTITY,
}: VerticalListCarouselProps) => {
  const listItems: ReactElement[] = [];
  let itemCount = 0;
  for (let i = 0; i < gameData.length; i++) {
    if (itemCount === listItemCount) break;
    if (gameData[i].id === gameId) continue;
    listItems.push(
      <li
        key={`${sectionName}_vertical_card_list_item_${gameData[i].id}`}
        className=""
      >
        <CardListItem>
          <CardImage
            gameName={gameData[i].name}
            imgId={gameData[i].cover?.image_id}
          />
          <CardDetailsSkeleton lastRow="" />
        </CardListItem>
      </li>
    );
    itemCount++;
  }

  return (
    <ul className="grid grid-cols-[minmax(256px,1fr)] w-full">{listItems}</ul>
  );
};

export default VerticalList;
