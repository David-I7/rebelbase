import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { CardData } from "@/interfaces/igdb";

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

  return (
    <section className="flex flex-col flex-1">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        More by {developerCompanyName} <MdChevronRight size={32} />
      </h2>
      <VerticalList
        gameId={gameId}
        sectionName="more_from_company"
        gameData={gameData!}
      />
    </section>
  );
};

export default MoreByCompany;
