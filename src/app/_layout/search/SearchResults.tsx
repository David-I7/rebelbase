import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CardData } from "@/interfaces/igdb";
import { searchApi } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";
import SearchItems from "./SearchItems";

const STALE_TIME = 1000 * 60 * 60; // 60 mins

const SearchResults = React.memo(
  ({
    deferredSearchValue,
    toggleDialog,
  }: {
    deferredSearchValue: string;
    toggleDialog: () => void;
  }) => {
    const { data, isFetching, isError } = useQuery({
      queryKey: [deferredSearchValue],
      queryFn: () => search({ query: deferredSearchValue }),
      placeholderData: (prev) => prev,
      staleTime: STALE_TIME,
    });

    if (isError) return;

    return (
      <SearchItems
        toggleDialog={toggleDialog}
        deferredSearchValue={deferredSearchValue}
        gameData={data!}
        isLoading={isFetching}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.deferredSearchValue === nextProps.deferredSearchValue;
  }
);

export default SearchResults;

SearchResults.displayName = "SearchResults";

type Props = {
  query: string;
};

async function search(props: Props): Promise<CardData[]> {
  if (props.query === "") return [];

  if (props.query.match(/"/)) return [];

  return fetch(`${searchApi}?q=${props.query.trim()}`).then(async (res) => {
    if (res.status >= 400) {
      const error = ErrorFactory.createFetchError(
        res.status,
        res.statusText,
        await res.json()
      );

      throw error;
    }

    return (await res.json()) as CardData[];
  });
}
