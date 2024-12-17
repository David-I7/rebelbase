"use client";
import { sortBy, uiFriendlySortByKeys } from "@/data/constants/filterEnums";
import SortDropDown from "./SortDropDown";
import { SortDetailsFactory } from "@/data/constants/queryFields";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { GameDataContext } from "../../context/GameDataContext";
import { useRouter } from "next/navigation";

const SortGames = () => {
  const { url, setUrl, selectedSortBy } = useContext(GameDataContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const dropdownItems = sortBy.map((key) => {
    const sortDetails = SortDetailsFactory.create(key);
    let href = url.replace(/(?<=sortBy=).+?&/, `${key}&`);
    href = href.replace(/(?<=sortDir=)(.+(?=&)|.+$)/, sortDetails.sortDir);
    return (
      <li key={`sort_by_${key}`}>
        <button
          onClick={() => {
            if (queryClient.getQueryData([href])) {
              //cache hit
              setUrl(href);
            } else {
              router.push(href);
              setUrl(href);
            }
          }}
          className={`${
            selectedSortBy === key
              ? "bg-surface-container-high font-medium text-on-surface-heading-varient"
              : ""
          } flex items-center px-2 font-body-s min-w-max w-full h-10 rounded-lg hover:bg-surface-container-high justify-between transition-colors`}
        >
          {uiFriendlySortByKeys[key]}
        </button>
      </li>
    );
  });

  return (
    <div className="relative">
      <SortDropDown
        selectedSortBy={uiFriendlySortByKeys[selectedSortBy]}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};

export default SortGames;
