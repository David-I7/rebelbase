"use client";
import IconTarget from "@/_components/primitives/buttons/IconTarget";
import FullScreenDialog from "@/_components/primitives/dialog/FullScreenDialog";
import React, { useCallback, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchBar from "./search/SearchBar";
import SearchResultsMemoized from "./search/SearchResultsMemoized";

const FullScreenDialogSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ariaControlsId = "search_fullscreen_dialog";
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
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
        <SearchResultsMemoized toggleDialog={toggle} />
      </FullScreenDialog>
    </div>
  );
};

export default FullScreenDialogSearch;
