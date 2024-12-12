"use client";
import React, { useContext } from "react";
import FilterGamesDialog from "./FilterGamesDialog";
import FilterGamesAccordions from "./FilterGamesAccordions";
import CloseFilterGamesDialog from "./CloseFilterGamesDialog";
import { FilterContext } from "../../context/FilterContext";
import FilledButton from "@/_components/buttons/FilledButton";
import OutlineButton from "@/_components/buttons/OutlineButton";
import { buildQueryString } from "../../context/FilterContext";
import { useRouter } from "next/navigation";

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
    console.log(targetqs, qs);
    if (targetqs === qs) return;
    router.push(targetqs);
  };
  console.log(state);
  return (
    <FilterGamesDialog>
      <div className=" pb-6">
        <header className="sticky z-10 bg-surface-container-lowest top-0 pl-6 pr-3 flex text-xl font-semibold text-on-surface-heading-varient items-center border-b border-outline-varient-lowest h-12 justify-between">
          {state.filterCount > 0 ? `Filters (${state.filterCount})` : "Filters"}
          <CloseFilterGamesDialog />
        </header>
        <div className="px-6">
          searchBarPlaceholder
          <FilterGamesAccordions />
          <div className=" mt-12 flex gap-3 justify-end">
            <OutlineButton
              handleClick={() => {
                dispatch({ type: "reset" });
              }}
              label="Reset"
            />
            <FilledButton handleClick={handleFilter} label="Apply" />
          </div>
        </div>
      </div>
    </FilterGamesDialog>
  );
};

export default FilterGames;
