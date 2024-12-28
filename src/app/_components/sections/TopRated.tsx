import React from "react";
import { CardData } from "@/interfaces/igdb";
import VerticalCard from "../gameRepresentation/verticalCard/VerticalCard";
import CardImage from "../gameRepresentation/verticalCard/CardImage";
import CardDetails from "../gameRepresentation/CardDetails";
import Link from "next/link";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import VerticalList from "../gameRepresentation/list/VerticalList";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";

const TopRated = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="mt-20 w-full">
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
            Top Rated
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Top Rated
          </div>

          <CloseGameDialog style={{ top: "1.25rem" }} />
        </header>
        <div className="text-on-surface-body px-6 pb-6 max-w-full">
          <VerticalList
            sectionName="similar_games"
            gameData={gameData}
            listItemCount={gameData.length}
          />
        </div>
      </SectionDialog>

      <FixedSizeCarousel>
        <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,minmax(164px,1fr))] md:grid-cols-[repeat(15,minmax(204px,1fr))] lg:grid-cols-[repeat(15,minmax(244px,1fr))] gap-4 overflow-x-auto carousel pr-4 lg:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {gameData.map((game) => (
            <li key={`top_rated_vertical_card_${game.id}`}>
              <Link
                prefetch={false}
                href={`/games/${game.slug ? game.slug : game.id}`}
              >
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
      </FixedSizeCarousel>
    </section>
  );
};

export default TopRated;
