import IconTarget from "@/_components/buttons/IconTarget";
import React, { ChangeEvent, useContext, useRef } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { SearchContext } from "../context/SearchContext";

const SearchBar = () => {
  const { handleChange, searchValue, handleReset } = useContext(SearchContext);

  return (
    <div
      onClick={(e) => {
        (e.currentTarget.children[1] as HTMLInputElement).focus();
      }}
      className="cursor-text outline-primary focus-within:outline outline-2 pl-2 pr-1 h-14 rounded-lg gap-2 flex items-center text-on-surface-body-varient-low"
    >
      <MdSearch size={24} />
      <input
        className="flex-1 outline-none bg-transparent text-2xl font-semibold w-0 placeholder:text-on-surface-body-varient-low text-on-surface-body"
        type="search"
        aria-label="Search game"
        placeholder="Search game..."
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue && (
        <IconTarget
          handleClick={(e) => {
            handleReset();
          }}
        >
          <div className="rounded-full bg-surface-container-normal grid place-content-center h-6 w-6">
            <MdClose size={18} />
          </div>
        </IconTarget>
      )}
    </div>
  );
};

export default SearchBar;
