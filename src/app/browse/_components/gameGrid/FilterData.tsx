import CardDetails from "@/app/_components/gameRepresentation/CardDetails";
import CardImage from "@/app/_components/gameRepresentation/verticalCard/CardImage";
import VerticalCard from "@/app/_components/gameRepresentation/verticalCard/VerticalCard";
import { CardData } from "@/interfaces/igdb";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const FilterData = React.memo(
  ({
    filterData,
    sortBy,
  }: {
    filterData: InfiniteData<CardData[], unknown> | undefined;
    sortBy: "upcomingReleases" | "newReleases" | "topRated";
  }) => {
    if (!filterData) return;

    return filterData.pages
      .flatMap((page) => page)
      .map((game) => {
        return (
          <li className="max-w-[244px]" key={`filter_vertical_card_${game.id}`}>
            <Link prefetch={false} href={`/games/${game.slug}`}>
              <VerticalCard>
                <CardImage gameName={game.name} imgId={game.cover?.image_id} />
                <CardDetails
                  game={game}
                  lastRow={
                    sortBy === "upcomingReleases"
                      ? "FIRST_RELEASE_DATE"
                      : "RATING"
                  }
                />
              </VerticalCard>
            </Link>
          </li>
        );
      });
  }
);

export default FilterData;
