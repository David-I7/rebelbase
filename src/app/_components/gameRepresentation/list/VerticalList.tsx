import { CardData } from "@/interfaces/igdb";
import React, { ReactElement } from "react";
import CardListItem from "./CardListItem";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import Link from "next/link";

type VerticalListCarouselProps = {
  gameData: CardData[];
  sectionName: string;
  gameId?: number;
  listItemCount?: number;
};

const LIST_ITEM_QUANTITY = 5;

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
        <Link
          prefetch={false}
          href={`/games/${
            gameData[i].slug ? gameData[i].slug : gameData[i].id
          }`}
        >
          <CardListItem>
            <CardImage
              gameName={gameData[i].name}
              imgId={gameData[i].cover?.image_id}
            />
            <CardDetails game={gameData[i]} lastRow="" />
          </CardListItem>
        </Link>
      </li>
    );
    itemCount++;
  }

  return (
    <ul className="grid grid-cols-[minmax(256px,1fr)] w-full">{listItems}</ul>
  );
};

export default VerticalList;
