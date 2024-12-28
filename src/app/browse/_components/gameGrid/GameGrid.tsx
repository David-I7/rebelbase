"use client";

import useFilterInfiniteQuery from "@/hooks/useFilterInfiniteQuery";
import useScrollEnd from "@/hooks/useScrollEnd";
import { CardData } from "@/interfaces/igdb";
import { useContext } from "react";
import FilterData from "./FilterData";
import { GameDataContext } from "../../context/GameDataContext";

const GameGrid = ({ gameData }: { gameData: CardData[] }) => {
  const { cacheKey, selectedSortBy } = useContext(GameDataContext);
  const endReached = useScrollEnd(1024);
  const { isFetching, data, fetchNextPage, hasNextPage } =
    useFilterInfiniteQuery(
      [cacheKey],
      cacheKey,
      gameData.length === 40 ? 2 : undefined,
      {
        pages: [gameData],
        pageParams: [1],
      },
      gameData
    );

  if (gameData.length === 40 && hasNextPage && !isFetching && endReached) {
    fetchNextPage();
  }

  if (gameData.length <= 0)
    return (
      <div className="text-center">
        <h2 className="mt-8">No results found</h2>
        <p>Unfortunately no result match your search.</p>
      </div>
    );

  return (
    <section>
      <ul
        className={`${
          isFetching && "animate-pulse"
        } opacity-100 filter-game-grid [@media(max-width:622px)]:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6`}
      >
        <FilterData sortBy={selectedSortBy} filterData={data} />
      </ul>
    </section>
  );
};

export default GameGrid;
