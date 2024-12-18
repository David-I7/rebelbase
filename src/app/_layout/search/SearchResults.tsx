import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CardData } from "@/interfaces/igdb";
import { searchApi } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";
import SearchItems from "./SearchItems";

const STALE_TIME = 1000 * 60 * 60; // 60 mins

const SearchResults = React.memo(
  ({ deferredSearchValue }: { deferredSearchValue: string }) => {
    const { data, isFetching } = useQuery({
      queryKey: [deferredSearchValue],
      queryFn: () => search({ query: deferredSearchValue }),
      placeholderData: (prev) => prev,
      staleTime: STALE_TIME,
    });

    return <SearchItems gameData={data!} isLoading={isFetching} />;
  }
);

export default SearchResults;

type Props = {
  query: string;
};

async function search(props: Props): Promise<CardData[]> {
  if (props.query === "") return [];

  return fetch(`${searchApi}?q=${props.query.trim()}`).then(async (res) => {
    if (res.status >= 400)
      throw ErrorFactory.createFetchError(
        res.status,
        res.statusText,
        await res.json()
      );
    return (await res.json()) as CardData[];
  });
}
