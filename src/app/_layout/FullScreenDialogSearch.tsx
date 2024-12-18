"use client";
import IconTarget from "@/_components/buttons/IconTarget";
import FullScreenDialog from "@/_components/dialog/FullScreenDialog";
import React, { ChangeEvent, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchBar from "./search/SearchBar";
import SearchResults from "./search/SearchResults";

const FullScreenDialogSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ariaControlsId = "search_fullscreen_dialog";
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        aria-controls={ariaControlsId}
        aria-expanded={isOpen}
        onClick={toggle}
        className="text-on-surface-heading-varient rounded-full bg-surface hover:bg-surface-container-normal transition-colors place-content-center grid h-10 w-10"
      >
        <MdSearch size={24} />
      </button>
      <FullScreenDialog
        style={{ paddingInline: "2rem" }}
        id={ariaControlsId}
        isOpen={isOpen}
      >
        <div className="flex justify-end">
          <IconTarget
            customClass="hover:bg-surface-container-normal rounded-full text-on-surface-heading-varient my-6"
            handleClick={toggle}
          >
            <MdClose size={24} />
          </IconTarget>
        </div>
        <SearchBar />
        <SearchResults />
      </FullScreenDialog>
    </div>
  );
};

export default FullScreenDialogSearch;
