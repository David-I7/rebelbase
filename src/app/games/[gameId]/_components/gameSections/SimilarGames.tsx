import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { CardData } from "@/interfaces/igdb";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "./about/CloseGameDialog";

const SimilarGames = async ({
  similarGames,
}: {
  similarGames?: CardData[];
}) => {
  if (!similarGames || !similarGames.length) return;

  return (
    <section className="flex flex-col flex-1">
      <SectionDialog
        sectionHasDialog={similarGames.length > 5}
        label={
          <h2 className="flex items-center gap-2 text-2xl text-on-surface-heading-varient">
            Similar Games
          </h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading-varient text-center mr-12 font-semibold">
            Similar Games
          </div>

          <CloseGameDialog style={{ top: "1.25rem" }} />
        </header>
        <div className="text-on-surface-body px-6 pb-6 max-w-full">
          <VerticalList
            sectionName="similar_games"
            gameData={similarGames}
            listItemCount={similarGames.length}
          />
        </div>
      </SectionDialog>
      {similarGames.length <= 5 && (
        <h2 className="flex items-center gap-2 mb-4 text-2xl">
          Similar Games <MdChevronRight size={32} />
        </h2>
      )}

      <VerticalList sectionName="similar_games" gameData={similarGames} />
    </section>
  );
};

export default SimilarGames;
