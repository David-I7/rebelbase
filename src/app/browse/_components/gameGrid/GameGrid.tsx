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
  const [data, setData] = useState(gameData);
  return (
    <section>
      <ul className="grid place-content-center grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-4 gap-y-6">
        {data.map((game) => (
          <li
            className="[@media(max-width:350px)]:justify-self-center"
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
