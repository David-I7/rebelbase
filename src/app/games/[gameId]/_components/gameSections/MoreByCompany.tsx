import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { MoreByCompanyResponse } from "@/services/igdb";

const MoreByCompany = ({ gameData }: { gameData?: MoreByCompanyResponse }) => {
  if (!gameData) return;
  return (
    <section className="flex flex-col flex-1">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        More by {gameData.company.developerCompanyName}{" "}
        <MdChevronRight size={32} />
      </h2>
      <VerticalList
        sectionName="more_from_company"
        gameData={gameData.result}
      />
    </section>
  );
};

export default MoreByCompany;
