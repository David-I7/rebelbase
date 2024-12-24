import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchResults from "./SearchResults";

const SearchResultsMemoized = ({
  toggleDialog,
}: {
  toggleDialog: () => void;
}) => {
  const { deferredSearchValue } = useContext(SearchContext);
  return (
    <SearchResults
      toggleDialog={toggleDialog}
      deferredSearchValue={deferredSearchValue}
    />
  );
};

export default SearchResultsMemoized;
