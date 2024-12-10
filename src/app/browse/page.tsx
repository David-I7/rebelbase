import { extractFields } from "@/data/constants/queryFields";
import PlatformSection from "./_components/platforms/PlatformSection";
import { getBrowseQueryData } from "@/services/igdb";
import GameGrid from "./_components/gameGrid/GameGrid";
import SortGames from "./_components/gameGrid/SortGames";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Browse({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const extractedBrowseFields = extractFields(awaitedSearchParams);

  const { data, error } = await getBrowseQueryData(
    extractedBrowseFields.queryParams
  );

  if (error) throw error;

  console.log(data, extractedBrowseFields);

  return (
    <main>
      <PlatformSection />
      <SortGames
        pathName="/browse"
        selectedSortBy={extractedBrowseFields.queryParams.sortBy}
      />
      <GameGrid
        sortBy={extractedBrowseFields.queryParams.sortBy}
        gameData={data!}
      />
    </main>
  );
}
