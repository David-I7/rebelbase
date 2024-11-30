import { CardData } from "@/interfaces/igdb";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalList from "../gameRepresentation/list/VerticalList";

const OfflineGames = ({ gameData }: { gameData?: CardData[] }) => {
  if (!gameData) return;
  return (
    <section className="flex flex-col flex-1">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        Offline Games <MdChevronRight size={32} />
      </h2>
      <VerticalList sectionName="offline_games" gameData={gameData} />
    </section>
  );
};

export default OfflineGames;
