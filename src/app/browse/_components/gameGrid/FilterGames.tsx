import React from "react";
import FilterGamesDialog from "./FilterGamesDialog";
import { MdClose } from "react-icons/md";
import FilterGamesAccordions from "./FilterGamesAccordions";

const FilterGames = () => {
  return (
    <FilterGamesDialog>
      <div className="bg-surface-container-lowest rounded-3xl pb-4">
        <header className="px-6 flex text-xl font-semibold text-on-surface-heading-varient items-center border-b border-outline-varient-lowest h-12 justify-between">
          Filter
          <button>
            <MdClose size={24} />
          </button>
        </header>
        <div className="px-6">
          searchBarPlaceholder
          <FilterGamesAccordions />
        </div>
      </div>
    </FilterGamesDialog>
  );
};

export default FilterGames;
