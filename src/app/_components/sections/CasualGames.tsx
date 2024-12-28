import React from "react";
import VerticalList from "../gameRepresentation/list/VerticalList";
import { CardData } from "@/interfaces/igdb";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "@/app/games/[slug]/_components/gameSections/about/CloseGameDialog";

const CasualGames = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="flex flex-col flex-1">
      <SectionDialog
        sectionHasDialog={true}
        label={
          <h2 className=" text-on-surface-heading text-2xl">Casual Games</h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading text-center mr-12 font-semibold">
            Casual Games
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
      <VerticalList sectionName="casual_games" gameData={gameData} />
    </section>
  );
};

export default CasualGames;
