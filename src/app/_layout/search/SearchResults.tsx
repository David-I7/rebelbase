import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { CardData } from "@/interfaces/igdb";
import { debounce } from "@/utils/performance";
import { searchApi } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";

const SearchResults = () => {
  const { searchValue } = useContext(SearchContext);
  console.log(searchValue);
  // const {} = useQuery({
  //   queryKey: [searchValue],
  //   queryFn: () => search(searchValue),
  //   staleTime: 1000 * 60 * 60,
  //   initialData: () => []
  // })

  return <div></div>;
};

export default SearchResults;

async function search(query: string): Promise<CardData[]> {
  if (query === "") return [];

  return fetch(`${searchApi}?q=${query.trim()}`).then(async (res) => {
    if (res.status >= 400)
      throw ErrorFactory.createFetchError(
        res.status,
        res.statusText,
        await res.json()
      );
    return (await res.json()) as CardData[];
  });
}
