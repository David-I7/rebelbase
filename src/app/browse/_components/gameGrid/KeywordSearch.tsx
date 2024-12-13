import React, { ChangeEvent, FormEvent } from "react";
import { Action } from "../../context/FilterContext";
import SearchBar from "@/_components/search/SearchBar";

const KeywordSearch = React.memo(
  ({
    keyword,
    dispatch,
    handleFilter,
  }: {
    keyword: string;
    dispatch: React.Dispatch<Action>;
    handleFilter: () => void;
  }) => {
    const handleChange = (e: ChangeEvent) => {
      dispatch({
        type: "search",
        payload: { value: (e.target as HTMLInputElement).value },
      });
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      handleFilter();
    };

    return (
      <div className="my-4">
        <SearchBar
          searchValue={keyword}
          onSubmit={handleSubmit}
          onChange={handleChange}
          placeholder="Keyword"
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.keyword === nextProps.keyword) return true;
    return false;
  }
);

export default KeywordSearch;
