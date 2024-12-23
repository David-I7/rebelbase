import IconTarget from "@/_components/primitives/buttons/IconTarget";
import React, { useContext, useEffect, useRef } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { SearchContext } from "../context/SearchContext";

const SearchBar = () => {
  const { handleChange, searchValue, handleReset } = useContext(SearchContext);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={searchContainerRef}
      onClick={(e) => {
        if (!e?.clientX && !e?.clientY) {
          searchContainerRef.current!.classList.add("focus-within:outline");
        } else {
          e.currentTarget.classList.remove("focus-within:outline");
        }
        (e.currentTarget.children[1] as HTMLInputElement).focus();
      }}
      className="cursor-text outline-primary outline-2 pl-2 pr-1 h-14 rounded-lg gap-2 flex items-center text-on-surface-body-varient-low"
    >
      <MdSearch size={24} />
      <input
        ref={searchRef}
        className="flex-1 outline-none bg-transparent text-2xl font-semibold w-0 placeholder:text-on-surface-body-varient-low text-on-surface-body"
        type="search"
        aria-label="Search game"
        placeholder="Search game..."
        value={searchValue}
        onChange={handleChange}
        onFocus={(e) => {
          if (e.relatedTarget) {
            searchContainerRef.current!.classList.add("focus-within:outline");
          }
        }}
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
