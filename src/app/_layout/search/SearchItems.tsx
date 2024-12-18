import CardDetails from "@/app/_components/gameRepresentation/CardDetails";
import CardImage from "@/app/_components/gameRepresentation/list/CardImage";
import CardListItem from "@/app/_components/gameRepresentation/list/CardListItem";
import { CardData } from "@/interfaces/igdb";
import Link from "next/link";
import React from "react";

const SearchItems = React.memo(
  ({
    gameData,
    isLoading,
  }: {
    gameData: CardData[] | undefined;
    isLoading: boolean;
  }) => {
    if (!gameData || !gameData.length) return;
    return (
      <ul className={`${isLoading ? "opacity-50" : ""} mt-6`}>
        {gameData.map((game) => {
          return (
            <li key={`search_vertical_card_list_item_${game.id}`} className="">
              <Link prefetch={false} href={`/games/${game.id}`}>
                <CardListItem>
                  <CardImage
                    gameName={game.name}
                    imgId={game.cover?.image_id}
                  />
                  <CardDetails game={game} lastRow="RATING" />
                </CardListItem>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
);

export default SearchItems;
