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

  return (
    <main className="max-w-[1344px] [@media(min-width:1344px)]:mx-auto [@media(min-width:1344px)]:max-w-[1280px] mt-8">
      <MutateQueryString qs={extractedBrowseFields.queryString} />
      <PlatformSection />
      <div className="filter-grid mx-4 md:mx-8 [@media(min-width:1344px)]:mx-0">
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
      </div>
    </main>
  );
}
