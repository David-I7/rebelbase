import { CardData } from "@/interfaces/igdb";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import HorizontalCardCarousel from "../gameRepresentation/horizontalCard/HorizontalCardCarousel";
import HorizontalCard from "../gameRepresentation/horizontalCard/HorizontalCard";
import CardImage from "../gameRepresentation/horizontalCard/CardImage";
import CardDetails from "../gameRepresentation/CardDetails";
import Link from "next/link";
import VerticalList from "../gameRepresentation/list/VerticalList";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import FixedSizeCarousel from "@/_components/nonPrimitives/carousel/FixedSizeCarousel";

const UpcomingReleases = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="mt-20 w-full">
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className="flex items-center text-on-surface-heading h-10 text-2xl">
            Upcoming Releases
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Upcoming Releases
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
        <ul className="inline-grid grid-rows-1 grid-cols-[repeat(15,200px)] md:grid-cols-[repeat(15,254px)] lg:grid-cols-[repeat(15,308px)] gap-4 pr-4 lg:pr-8 [@media(min-width:1344px)]:pr-[calc((100vw_-_1280px)_/_2)]">
          {gameData.map((game) => (
            <li key={`upcoming_releases_horizontal_card_${game.id}`}>
              <Link prefetch={false} href={`/games/${game.slug}`}>
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
      </FixedSizeCarousel>
    </section>
  );
};

export default UpcomingReleases;
