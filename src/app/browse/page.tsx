import { extractFields } from "@/lib/validation/queryFieldsValidation";
import PlatformSection from "./_components/platforms/PlatformSection";
import { getQueryData } from "@/services/igdb";
import SortGames from "./_components/gameGrid/SortGames";
import FilterGames from "./_components/gameGrid/FilterGames";
import { FilterContextProvider } from "./context/FilterContext";
import { Suspense } from "react";
import FilterGameGridSkeleton from "@/_components/skeletons/FilterGameGridSkeleton";
import GameGridServer from "./_components/gameGrid/GameGridServer";
import { GameDataContextProvider } from "./context/GameDataContext";
import PageTransition from "@/_components/primitives/loading/PageTransition";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Browse({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const extractedBrowseFields = extractFields(awaitedSearchParams, "/browse");

  const browseDataPromise = getQueryData(extractedBrowseFields.queryParams);

  return (
    <main className="max-w-[1344px] [@media(min-width:1344px)]:mx-auto [@media(min-width:1344px)]:max-w-[1280px] mt-8">
      <PlatformSection />
      <GameDataContextProvider URL={extractedBrowseFields.queryString}>
        <section className="filter-grid mx-4 md:mx-8 [@media(min-width:1344px)]:mx-0">
          <FilterContextProvider
            searchParams={extractedBrowseFields.queryParams}
          >
            <FilterGames
              pathName="/browse"
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

export const metadata: Metadata = {
  title: "Browse - RebelBase",
  description:
    "RebelBase serves as a hub for gaming enthusiasts, offering personalized recommendations, trending titles, and curated lists across various genres and platforms.",
};
