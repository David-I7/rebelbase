import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchResults from "./SearchResults";

const SearchResultsMemoized = () => {
  const { deferredSearchValue } = useContext(SearchContext);
  return <SearchResults deferredSearchValue={deferredSearchValue} />;
};

export default SearchResultsMemoized;
