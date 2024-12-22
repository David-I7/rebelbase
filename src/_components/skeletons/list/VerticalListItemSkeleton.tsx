import CardDetailsSkeleton from "../cards/CardDetailsSkeleton";
import CardListItemSkeleton from "./CardListItemSkeleton";
import { ReactElement } from "react";

type VerticalListSkeletonProps = {
  listItemCount?: number;
};

const LIST_ITEM_QUANTITY = 5;

const VerticalListSkeleton = ({
  listItemCount = LIST_ITEM_QUANTITY,
}: VerticalListSkeletonProps) => {
  const listItems: ReactElement[] = [];
  let itemCount = 0;
  for (let i = 0; i < listItemCount; i++) {
    listItems.push(
      <li key={`vertical_card_list_item_skeleton_${i}`} className="">
        <CardListItemSkeleton>
          <div className="w-12 lg:w-16 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-normal"></div>
          <div className="max-w-md">
            <CardDetailsSkeleton type="" />
          </div>
        </CardListItemSkeleton>
      </li>
    );
    itemCount++;
  }

  return (
    <div className="grid gap-4">
      <div className="max-w-80 w-full h-8 rounded bg-surface-container-normal"></div>
      <ul className="grid grid-cols-[minmax(256px,1fr)] w-full">{listItems}</ul>
    </div>
  );
};

export default VerticalListSkeleton;
