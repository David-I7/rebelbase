"use client";

import CardDetailsSkeleton from "@/_components/skeletons/cards/CardDetailsSkeleton";
import VerticalCardSkeleton from "@/_components/skeletons/cards/VerticalCardSkeleton";
import CardDetails from "@/app/_components/gameRepresentation/CardDetails";
import CardImage from "@/app/_components/gameRepresentation/verticalCard/CardImage";
import VerticalCard from "@/app/_components/gameRepresentation/verticalCard/VerticalCard";
import useFilterInfiniteQuery from "@/hooks/useFilterInfiniteQuery";
import useScrollEnd from "@/hooks/useScrollEnd";
import { CardData } from "@/interfaces/igdb";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FilterData from "./FilterData";

const GameGrid = ({
  gameData,
  sortBy,
  qs,
}: {
  gameData: CardData[];
  sortBy: "newReleases" | "upcomingReleases" | "topRated";
  qs: string;
}) => {
  const endReached = useScrollEnd(1024);
  const { isFetching, data, fetchNextPage, hasNextPage } =
    useFilterInfiniteQuery([qs], qs, gameData.length === 40 ? 2 : undefined, {
      pages: [gameData],
      pageParams: [1],
    });

  if (gameData.length === 40 && hasNextPage && !isFetching && endReached) {
    fetchNextPage();
  }

  console.log(hasNextPage, isFetching, endReached);

  const filterSkeletons = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => (
        <VerticalCardSkeleton key={`filter_game_grid_skeleton_${index}`}>
          <CardDetailsSkeleton type={"RATING"} />
        </VerticalCardSkeleton>
      )),
    [sortBy]
  );

  if (gameData.length <= 0)
    return (
      <div className="text-center">
        <h2 className="mt-8">No results found</h2>
        <p>Unfortunately no result match your search.</p>
      </div>
    );

  return (
    <section>
      <ul className="filter-game-grid [@media(max-width:622px)]:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6">
        <FilterData sortBy={sortBy} filterData={data} />
        {isFetching && filterSkeletons}
      </ul>
    </section>
  );
};

export default GameGrid;
