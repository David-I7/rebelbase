import { sortBy, convertedSortByKeys } from "@/data/constants/queryFields";

import SortDropDown from "./SortDropDown";
import Link from "next/link";
import { MdCheck } from "react-icons/md";

const SortGames = ({
  selectedSortBy,
  pathName,
}: {
  selectedSortBy: (typeof sortBy)[number];
  pathName: string;
}) => {
  const dropdownItems = sortBy.map((key) => (
    <li key={`sort_by_${key}`}>
      <Link
        className={`${
          selectedSortBy === key ? "bg-surface-container-high" : ""
        } flex items-center px-2 min-w-max h-10 rounded-lg hover:bg-surface-container-high justify-between transition-colors`}
        href={`${pathName}?`}
      >
        <div className="pr-8">{convertedSortByKeys[key]}</div>
        {selectedSortBy === key && <MdCheck size={18} />}
      </Link>
    </li>
  ));

  return (
    <div className="relative inline-block">
      <SortDropDown dropdownItems={dropdownItems} />
    </div>
  );
};

export default SortGames;
