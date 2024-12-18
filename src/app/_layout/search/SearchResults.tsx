import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { CardData } from "@/interfaces/igdb";
import { debounceAsync } from "@/utils/performance";
import { searchApi } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";
import SearchItems from "./SearchItems";

const STALE_TIME = 1000 * 60 * 60; // 60 mins

const SearchResults = () => {
  const { searchValue } = useContext(SearchContext);

  // const { data } = useQuery({
  //   queryKey: [searchValue],
  //   queryFn: () => debouncedSearch({ query: searchValue }),
  //   placeholderData: (prev) => prev,
  //   staleTime: STALE_TIME,
  //   initialData: () => [],
  // });

  return <SearchItems gameData={[]} />;
};

export default SearchResults;

type Props = {
  query: string;
};

const debouncedSearch = debounceAsync((props: Props) => search(props), 400);
const debouncedTest = debounceAsync((props: Props) => test(props), 300);

async function test(props: Props): Promise<string> {
  return props.query;
}

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
