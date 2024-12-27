import React from "react";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { CardData } from "@/interfaces/igdb";
import SectionDialog from "@/_components/nonPrimitives/SectionDialog";
import CloseGameDialog from "./about/CloseGameDialog";

const MoreByCompany = async ({
  data,
  developerCompanyName,
  gameId,
}: {
  data?: Promise<DataOrError<CardData[], Error>>;
  developerCompanyName?: string;
  gameId: number;
}) => {
  if (!data) return;
  const { data: gameData, error: gameDataError } = await data;

  if (gameDataError) return;

  if (
    !gameData ||
    !gameData.length ||
    (gameData[0].id === gameId && gameData.length === 1)
  )
    return;

  return (
    <section className="flex flex-col flex-1">
      <SectionDialog
        sectionHasDialog={gameData.length > 5}
        label={
          <h2 className="gap-2 text-2xl">More by {developerCompanyName}</h2>
        }
      >
        <header className="sticky px-6 py-6 top-0 z-10 bg-surface-container-lowest ">
          <div className="text-2xl text-on-surface-heading  text-center mr-12 font-semibold">
            More by {developerCompanyName}
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
      {gameData.length <= 5 && (
        <h2 className="flex items-center gap-2 mb-4 text-2xl">
          More by {developerCompanyName}
        </h2>
      )}

      <VerticalList
        gameId={gameId}
        sectionName="more_from_company"
        gameData={gameData!}
      />
    </section>
  );
};

export default MoreByCompany;
