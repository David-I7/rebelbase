import { extractFields } from "@/data/constants/queryFields";
import PlatformSection from "./_components/platforms/PlatformSection";
import { getBrowseQueryData } from "@/services/igdb";
import GameGrid from "./_components/gameGrid/GameGrid";
import SortGames from "./_components/gameGrid/SortGames";
import MutateQueryString from "../../_components/MutateQueryString";
import FilterGames from "./_components/gameGrid/FilterGames";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Browse({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const extractedBrowseFields = extractFields(awaitedSearchParams, "/browse");

  const { data, error } = await getBrowseQueryData(
    extractedBrowseFields.queryParams
  );

  if (error) throw error;

  console.log(extractedBrowseFields);

  return (
    <main>
      <MutateQueryString qs={extractedBrowseFields.queryString} />
      <PlatformSection />
      <FilterGames />
      <SortGames
        qs={extractedBrowseFields.queryString}
        selectedSortBy={extractedBrowseFields.queryParams.sortBy}
      />
      <GameGrid
        sortBy={extractedBrowseFields.queryParams.sortBy}
        gameData={data!}
      />
    </main>
  );
}
