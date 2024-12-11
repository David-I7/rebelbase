import {
  sortBy,
  convertedSortByKeys,
  SortDetailsFactory,
} from "@/data/constants/queryFields";
import SortDropDown from "./SortDropDown";
import Link from "next/link";
import { MdCheck } from "react-icons/md";

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
          <div className="pr-8">{convertedSortByKeys[key]}</div>
          {selectedSortBy === key && <MdCheck size={18} />}
        </Link>
      </li>
    );
  });

  return (
    <div className="relative inline-block">
      <SortDropDown
        selectedSortBy={convertedSortByKeys[selectedSortBy]}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};

export default SortGames;
