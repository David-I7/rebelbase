import PageTransition from "@/_components/primitives/loading/PageTransition";
import FilterGameGridSkeleton from "@/_components/skeletons/FilterGameGridSkeleton";
import FilterGames from "@/app/browse/_components/gameGrid/FilterGames";
import GameGridServer from "@/app/browse/_components/gameGrid/GameGridServer";
import SortGames from "@/app/browse/_components/gameGrid/SortGames";
import { FilterContextProvider } from "@/app/browse/context/FilterContext";
import { GameDataContextProvider } from "@/app/browse/context/GameDataContext";
import {
  convertedPlatformsKeys,
  platforms,
  uiFriendlyPlatformsMap,
} from "@/data/constants/filterEnums";
import { extractFields } from "@/lib/validation/queryFieldsValidation";
import { getQueryData } from "@/services/igdb";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Windows({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;
  const extractedBrowseFields = extractFields(
    awaitedSearchParams,
    "/platforms/ps4"
  );

  extractedBrowseFields.queryParams.where.push(
    `release_dates.platform = ${convertedPlatformsKeys[platforms[7]]}`
  );

  const browseDataPromise = getQueryData(extractedBrowseFields.queryParams);

  return (
    <main className="max-w-[1344px] [@media(min-width:1344px)]:mx-auto [@media(min-width:1344px)]:max-w-[1280px] mt-8">
      <div className="mx-4 md:mx-8 [@media(min-width:1344px)]:mx-0">
        <h1 className="mb-4">{uiFriendlyPlatformsMap[platforms[7]]} Games</h1>
        <p className="max-w-[70ch] text-pretty">
          Find your next favorite game in our extensive collection of PS4 games.
          Start browsing today and enjoy countless hours of fun and excitement
          right on your PS4.
        </p>
      </div>
      <GameDataContextProvider URL={extractedBrowseFields.queryString}>
        <section className="filter-grid mx-4 md:mx-8 [@media(min-width:1344px)]:mx-0">
          <FilterContextProvider
            searchParams={extractedBrowseFields.queryParams}
          >
            <FilterGames
              pathName="/platforms/ps4"
              sort={{
                field: extractedBrowseFields.queryParams.sortBy,
                order: extractedBrowseFields.queryParams.sort.order,
              }}
            />
          </FilterContextProvider>
          <SortGames />
          <Suspense
            key={extractedBrowseFields.queryString}
            fallback={
              <FilterGameGridSkeleton
                type={
                  extractedBrowseFields.queryParams.sortBy ===
                  "upcomingReleases"
                    ? "FIRST_RELEASE_DATE"
                    : "RATING"
                }
              />
            }
          >
            <GameGridServer gameData={browseDataPromise} />
          </Suspense>
        </section>
      </GameDataContextProvider>
      <PageTransition />
    </main>
  );
}
