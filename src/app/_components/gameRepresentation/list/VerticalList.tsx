import { CardData } from "@/interfaces/igdb";
import React, { ReactElement } from "react";
import CardListItem from "./CardListItem";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";
import Link from "next/link";

type VerticalListCarouselProps = {
  gameData: CardData[];
  sectionName: string;
};

const LIST_ITEM_QUANTITY = 5;

const VerticalList = ({ gameData, sectionName }: VerticalListCarouselProps) => {
  const listItems: ReactElement[] = [];
  for (let i = 0; i < LIST_ITEM_QUANTITY; i++) {
    listItems.push(
      <li
        key={`${sectionName}_vertical_card_list_item_${gameData[i].id}`}
        className=""
      >
        <Link href={`/games/${gameData[i].id}`}>
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
  }

  return (
    <ul className="grid grid-cols-[minmax(256px,1fr)] w-full">{listItems}</ul>
  );
};

export default VerticalList;
