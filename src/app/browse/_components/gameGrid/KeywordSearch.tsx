import React, { ChangeEvent, FormEvent } from "react";
import { Action } from "../../context/FilterContext";
import SearchBar from "@/_components/primitives/search/SearchBar";

const KeywordSearch = React.memo(
  ({
    keyword,
    dispatch,
    handleFilter,
    toggleDialog,
  }: {
    keyword: string;
    dispatch: React.Dispatch<Action>;
    handleFilter: () => void;
    toggleDialog?: () => void;
  }) => {
    const handleChange = (e: ChangeEvent) => {
      dispatch({
        type: "search",
        payload: { value: (e.target as HTMLInputElement).value },
      });
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log("form submitted");
      toggleDialog?.();
      handleFilter();
    };

    const handleReset = () => {
      dispatch({
        type: "search",
        payload: { value: "" },
      });
    };

    return (
      <div className="my-4">
        <SearchBar
          handleReset={handleReset}
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
KeywordSearch.displayName = "KeywordSearch";

export default KeywordSearch;
