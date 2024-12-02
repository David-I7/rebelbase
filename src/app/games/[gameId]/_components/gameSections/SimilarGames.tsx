import React from "react";
import { MdChevronRight } from "react-icons/md";
import VerticalList from "@/app/_components/gameRepresentation/list/VerticalList";
import { CardData } from "@/interfaces/igdb";

const SimilarGames = async ({
  similarGames,
}: {
  similarGames?: CardData[];
}) => {
  if (!similarGames || !similarGames.length) return;

  return (
    <section className="flex flex-col flex-1">
      <h2 className="flex items-center gap-2 mb-4 text-2xl">
        Similar Games <MdChevronRight size={32} />
      </h2>
      <VerticalList sectionName="similar_games" gameData={similarGames} />
    </section>
  );
};

export default SimilarGames;
