import { MdClose, MdSearch } from "react-icons/md";

type SearchBarProps = {
  responsive?: boolean;
};

const SearchBar = ({ responsive = false }: SearchBarProps) => {
  const conditionalStyles = responsive ? "sm:flex hidden" : "flex";
  return (
    <div
      className={`${conditionalStyles} mx-8 rounded-lg focus-within:outline-1 focus-within:outline focus-within:outline-primary h-10 bg-surface-container-high items-center px-3`}
    >
      <div className="flex items-center gap-2 flex-1">
        <MdSearch size={24} />
        <input
          type="search"
          placeholder="Search game..."
          className="w-0 flex-1 outline-none bg-transparent font-body-s"
        />
      </div>
      <MdClose size={24} />
    </div>
  );
};

export default SearchBar;
