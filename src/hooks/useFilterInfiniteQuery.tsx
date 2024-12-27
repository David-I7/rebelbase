import { filterApi } from "@/data/baseUrls";
import { CardData } from "@/interfaces/igdb";
import ErrorFactory from "@/lib/errors/errorFactory";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const STALE_TIME = 1000 * 60 * 60; //60 mins
type FilterData = CardData[];

const useFilterInfiniteQuery = (
  queryKey: string[],
  qs: string,
  initialPageParam: number | undefined,
  initialData: {
    pageParams: number[];
    pages: [FilterData];
  },
  gameData: FilterData
) => {
  const queryClient = useQueryClient();

  useMemo(() => {
    //set initialdata manually

    if (queryClient.getQueryData([qs])) {
      return;
    }
    queryClient.setQueryData([qs], initialData);
  }, [gameData]);

  return useInfiniteQuery<FilterData>({
    queryKey,
    queryFn: ({ pageParam = 2 }) => getFilterQuery(pageParam as number, qs),
    initialPageParam: initialPageParam,
    initialData: () => initialData,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length === 40) {
        return allPages.length + 2;
      } else return undefined;
    },
    staleTime: STALE_TIME,
    enabled: false,
  });
};

export default useFilterInfiniteQuery;

async function getFilterQuery(
  pageParam: number,
  qs: string
): Promise<FilterData> {
  let filterQs = qs.replace(/.*\/.*\?/, "");
  const platform = qs.match(/(?<=platforms\/)(.*)\?/);
  if (platform) {
    filterQs += `&platform=${platform[1]}`;
  }

  return fetch(`${filterApi}?${filterQs}&page=${pageParam}`).then(
    async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          await res.json()
        );
      }
      return res.json() as Promise<FilterData>;
    }
  );
}
