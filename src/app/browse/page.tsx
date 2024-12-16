import { extractFields } from "@/data/constants/queryFields";
import PlatformSection from "./_components/platforms/PlatformSection";
import { getQueryData } from "@/services/igdb";
import SortGames from "./_components/gameGrid/SortGames";
import MutateQueryString from "../../_components/MutateQueryString";
import FilterGames from "./_components/gameGrid/FilterGames";
import { FilterContextProvider } from "./context/FilterContext";
import { Suspense } from "react";
import FilterGameGridSkeleton from "@/_components/skeletons/FilterGameGridSkeleton";
import GameGridServer from "./_components/gameGrid/GameGridServer";
import QueryProviderWrapper from "@/lib/tanstack/components/QueryProviderWrapper";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Browse({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const extractedBrowseFields = extractFields(awaitedSearchParams, "/browse");

  const browseDataPromise = getQueryData(extractedBrowseFields.queryParams);

  console.log(extractedBrowseFields);

  return (
    <main className="max-w-[1344px] [@media(min-width:1344px)]:mx-auto [@media(min-width:1344px)]:max-w-[1280px] mt-8">
      <MutateQueryString qs={extractedBrowseFields.queryString} />
      <PlatformSection />
      <section className="filter-grid mx-4 md:mx-8 [@media(min-width:1344px)]:mx-0">
        <FilterContextProvider searchParams={extractedBrowseFields.queryParams}>
          <FilterGames
            pathName="/browse"
            qs={extractedBrowseFields.queryString}
            sort={{
              field: extractedBrowseFields.queryParams.sortBy,
              order: extractedBrowseFields.queryParams.sort.order,
            }}
          />
        </FilterContextProvider>

        <SortGames
          qs={extractedBrowseFields.queryString}
          selectedSortBy={extractedBrowseFields.queryParams.sortBy}
        />
        <Suspense
          key={extractedBrowseFields.queryString}
          fallback={
            <FilterGameGridSkeleton
              type={
                extractedBrowseFields.queryParams.sortBy === "upcomingReleases"
                  ? "FIRST_RELEASE_DATE"
                  : "RATING"
              }
            />
          }
        >
          <QueryProviderWrapper includeDevtools={true}>
            <GameGridServer
              qs={extractedBrowseFields.queryString}
              sortBy={extractedBrowseFields.queryParams.sortBy}
              gameData={browseDataPromise}
            />
          </QueryProviderWrapper>
        </Suspense>
      </section>
    </main>
  );
}
