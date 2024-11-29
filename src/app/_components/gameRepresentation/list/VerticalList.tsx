import { CardData } from "@/interfaces/igdb";
import React, { ReactElement } from "react";
import CardListItem from "./CardListItem";
import CardImage from "./CardImage";
import CardDetails from "../CardDetails";

type VerticalListCarouselProps = {
  gameData?: CardData[];
};

const LIST_ITEM_QUANTITY = 5;

const VerticalList = ({ gameData }: VerticalListCarouselProps) => {
  if (!gameData) return;

  const listItems: ReactElement[] = [];
  for (let i = 0; i < LIST_ITEM_QUANTITY; i++) {
    listItems.push(
      <li key={`vertical_card_${gameData[i].id}`} className="">
        <CardListItem>
          <CardImage
            gameName={gameData[i].name}
            imgId={gameData[i].cover?.image_id}
          />
          <CardDetails game={gameData[i]} lastRow="" />
        </CardListItem>
      </li>
    );
  }

  return (
    <ul className="grid grid-cols-[minmax(256px,1fr)] w-full">{listItems}</ul>
  );
};

export default VerticalList;
