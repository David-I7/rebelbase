"use client";
import CardDetails from "@/app/_components/gameRepresentation/CardDetails";
import CardImage from "@/app/_components/gameRepresentation/verticalCard/CardImage";
import VerticalCard from "@/app/_components/gameRepresentation/verticalCard/VerticalCard";
import { CardData } from "@/interfaces/igdb";
import Link from "next/link";
import React, { useState } from "react";

const GameGrid = ({
  gameData,
  sortBy,
}: {
  gameData: CardData[];
  sortBy: "newReleases" | "upcomingReleases" | "topRated";
}) => {
  if (gameData.length <= 0)
    return (
      <div className="text-center">
        <h2 className="mt-8">No results found</h2>
        <p>Unfortunately no result match your search.</p>
      </div>
    );

  return (
    <section>
      <ul className="grid group [@media(max-width:622px)]:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6">
        {gameData.map((game) => (
          <li
            className="[@media(min-width:500px)_and_(max-width:622px)]:odd:justify-self-end  max-w-[244px]"
            key={`top_rated_vertical_card_${game.id}`}
          >
            <Link prefetch={false} href={`/games/${game.id}`}>
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
        ))}
      </ul>
    </section>
  );
};

export default GameGrid;
