"use client";
import React, { useCallback, useContext, useState } from "react";
import FilterGamesDialog from "./FilterGamesDialog";
import FilterGamesAccordions from "./FilterGamesAccordions";
import { FilterContext } from "../../context/FilterContext";
import FilledButton from "@/_components/buttons/FilledButton";
import OutlineButton from "@/_components/buttons/OutlineButton";
import { buildQueryString } from "../../context/FilterContext";
import { useRouter } from "next/navigation";
import { DialogToggleClose } from "@/_components/dialog/DialogToggle";
import SearchBar from "@/_components/search/SearchBar";
import KeywordSearch from "./KeywordSearch";

const FilterGames = ({
  pathName,
  qs,
  sort,
}: {
  pathName: string;
  qs: string;
  sort: { field: string; order: "asc" | "desc" };
}) => {
  const [state, dispatch] = useContext(FilterContext);
  const router = useRouter();

  const handleFilter = () => {
    const targetqs = buildQueryString(pathName, sort, state);
    if (targetqs === qs) return;
    router.push(targetqs);
  };
  console.log(state);

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const toggleDialog = useCallback(() => {
    setDialogIsOpen(!dialogIsOpen);
  }, [dialogIsOpen]);
  return (
    <FilterGamesDialog isOpen={dialogIsOpen} toggle={toggleDialog}>
      <div className="pb-20 overflow-y-auto h-full scroll-hidden">
        <header className="sticky z-10 bg-surface-container-lowest top-0 pl-6 pr-3 flex text-xl font-semibold text-on-surface-heading-varient items-center border-b border-outline-varient-lowest h-12 justify-between">
          {state.filterCount > 0 ? `Filters (${state.filterCount})` : "Filters"}
          <DialogToggleClose toggle={toggleDialog} />
        </header>
        <div className="px-6">
          <KeywordSearch
            dispatch={dispatch}
            keyword={state.keyword}
            handleFilter={handleFilter}
          />
          <FilterGamesAccordions />
          <div className="absolute right-6 left-0 bottom-0 bg-surface-container-lowest py-4 flex gap-3 justify-end">
            <OutlineButton
              handleClick={() => {
                dispatch({ type: "reset" });
              }}
              label="Reset"
            />
            <FilledButton
              handleClick={() => {
                handleFilter();
                toggleDialog();
              }}
              label="Apply"
            />
          </div>
        </div>
      </div>
    </FilterGamesDialog>
  );
};

export default FilterGames;
