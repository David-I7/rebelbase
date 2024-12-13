import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import IconTarget from "../buttons/IconTarget";

type SearchBarProps = {
  placeholder: string;
  onChange: (e: ChangeEvent) => void;
  searchValue: string;
  onSubmit: (e: FormEvent) => void;
  handleReset: () => void;
};

const SearchBar = ({
  searchValue,
  placeholder,
  onChange,
  onSubmit,
  handleReset,
}: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div
        onClick={(e) => {
          (e.currentTarget.children[1] as HTMLInputElement).focus();
        }}
        className="cursor-text focus-within:outline-primary focus-within:outline-2 focus-within:outline flex gap-1 items-center pl-4 pr-1 h-10 rounded-lg bg-surface-container-high"
      >
        <MdSearch size={18} />
        <input
          className="flex-1 outline-none bg-transparent placeholder:text-sm"
          type="search"
          aria-label="Search"
          placeholder={placeholder}
          value={searchValue}
          onChange={onChange}
        />
        {searchValue && (
          <IconTarget handleClick={handleReset}>
            <MdClose size={18} />
          </IconTarget>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
