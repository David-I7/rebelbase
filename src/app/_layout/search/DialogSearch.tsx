import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import SearchBar from "./SearchBar";
import SearchResultsMemoized from "./SearchResultsMemoized";
import CustomSearchDialog from "./CustomSearchDialog";

const DialogSearch = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current!.showModal();
      document.documentElement.style.overflow = "hidden";
    } else {
      dialogRef.current!.close();
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleDialog = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="hidden lg:block">
      <DialogToggleOpen
        extendedClass="hover:bg-surface-container-normal transition-colors rounded-full text-on-surface-heading-varient"
        style={{ padding: "0.5rem" }}
        toggle={toggleDialog}
        label={<MdSearch size={24} />}
      >
        <CustomSearchDialog
          isOpen={isOpen}
          toggle={toggleDialog}
          ref={dialogRef}
        >
          <div className="max-w-screen-lg mx-auto my-6 px-6">
            <SearchBar />
            <SearchResultsMemoized toggleDialog={toggleDialog} />
          </div>
        </CustomSearchDialog>
      </DialogToggleOpen>
    </div>
  );
};

export default DialogSearch;
