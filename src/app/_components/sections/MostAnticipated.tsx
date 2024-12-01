import React from "react";
import HorizontalCardCarousel from "../gameRepresentation/horizontalCard/HorizontalCardCarousel";
import { CardData } from "@/interfaces/igdb";
import { MdChevronRight } from "react-icons/md";
import HorizontalCard from "../gameRepresentation/horizontalCard/HorizontalCard";
import CardImage from "../gameRepresentation/horizontalCard/CardImage";
import CardDetails from "../gameRepresentation/CardDetails";
import Link from "next/link";

const MostAnticipated = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="mt-20 w-full">
      <h2 className="flex items-center gap-2 mb-6 text-2xl">
        Most Anticipated <MdChevronRight size={32} />
      </h2>
      <HorizontalCardCarousel>
        <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,200px)] md:grid-cols-[repeat(15,254px)] lg:grid-cols-[repeat(15,308px)] gap-4 pr-4 lg:pr-8 [@media(min-width:1280px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {gameData.map((game) => (
            <li key={`most_anticipated_horizontal_card_${game.id}`}>
              <Link href={`/games/${game.id}`} className="h-full">
                <HorizontalCard>
                  <CardImage
                    gameName={game.name}
                    imgId={game.cover?.image_id}
                  />
                  <CardDetails game={game} lastRow="FIRST_RELEASE_DATE" />
                </HorizontalCard>
              </Link>
            </li>
          ))}
        </ul>
      </HorizontalCardCarousel>
    </section>
  );
};

export default MostAnticipated;
