import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalCardCarousel from "../gameRepresentation/verticalCard/VerticalCardCarousel";
import { CardData } from "@/interfaces/igdb";
import VerticalCard from "../gameRepresentation/verticalCard/VerticalCard";
import CardImage from "../gameRepresentation/verticalCard/CardImage";
import CardDetails from "../gameRepresentation/CardDetails";
import Link from "next/link";

const TopRated = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="mt-20 w-full">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        Top Rated <MdChevronRight size={32} />
      </h2>
      <VerticalCardCarousel>
        <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,minmax(164px,1fr))] md:grid-cols-[repeat(15,minmax(204px,1fr))] lg:grid-cols-[repeat(15,minmax(244px,1fr))] gap-4 overflow-x-auto carousel pr-4 lg:pr-8 [@media(min-width:1280px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {gameData.map((game) => (
            <li key={`top_rated_vertical_card_${game.id}`}>
              <Link href={`/games/${game.id}`}>
                <VerticalCard>
                  <CardImage
                    gameName={game.name}
                    imgId={game.cover?.image_id}
                  />
                  <CardDetails game={game} lastRow="RATING" />
                </VerticalCard>
              </Link>
            </li>
          ))}
        </ul>
      </VerticalCardCarousel>
    </section>
  );
};

export default TopRated;
