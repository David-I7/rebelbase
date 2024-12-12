import { extractFields } from "@/data/constants/queryFields";
import PlatformSection from "./_components/platforms/PlatformSection";
import { getBrowseQueryData } from "@/services/igdb";
import GameGrid from "./_components/gameGrid/GameGrid";
import SortGames from "./_components/gameGrid/SortGames";
import MutateQueryString from "../../_components/MutateQueryString";
import FilterGames from "./_components/gameGrid/FilterGames";
import { FilterContextProvider } from "./context/FilterContext";

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
  console.log(data);

  return (
    <main>
      <MutateQueryString qs={extractedBrowseFields.queryString} />
      <PlatformSection />
      <FilterContextProvider searchParams={extractedBrowseFields.queryParams}>
        <FilterGames
          pathName="/browse"
          qs={extractedBrowseFields.queryString}
          sort={{
            field: extractedBrowseFields.queryParams.sortBy,
            order: extractedBrowseFields.queryParams.sortDir,
          }}
        />
      </FilterContextProvider>

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
