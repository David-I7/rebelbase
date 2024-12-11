import {
  sortBy,
  uiFriendlySortByKeys,
  SortDetailsFactory,
} from "@/data/constants/queryFields";
import SortDropDown from "./SortDropDown";
import Link from "next/link";

const SortGames = ({
  selectedSortBy,
  qs,
}: {
  selectedSortBy: (typeof sortBy)[number];
  qs: string;
}) => {
  const dropdownItems = sortBy.map((key) => {
    const sortDetails = SortDetailsFactory.create(key);
    let href = qs.replace(/(?<=sortBy=).+&/, `${key}&`);
    href = href.replace(/(?<=sortDir=)(.+(?=&)|.+$)/, sortDetails.sortDir);
    return (
      <li key={`sort_by_${key}`}>
        <Link
          prefetch={false}
          className={`${
            selectedSortBy === key ? "bg-surface-container-high" : ""
          } flex items-center px-2 min-w-max h-10 rounded-lg hover:bg-surface-container-high justify-between transition-colors`}
          href={href}
        >
          {uiFriendlySortByKeys[key]}
        </Link>
      </li>
    );
  });

  return (
    <div className="relative inline-block">
      <SortDropDown
        selectedSortBy={uiFriendlySortByKeys[selectedSortBy]}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};

export default SortGames;
