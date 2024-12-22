import Dialog from "@/_components/primitives/dialog/Dialog";
import { DialogToggleOpen } from "@/_components/primitives/dialog/DialogToggle";
import React, { useEffect, useRef, useState } from "react";
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
    } else {
      dialogRef.current!.close();
    }
  }, [isOpen]);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

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
            <SearchResultsMemoized />
          </div>
        </CustomSearchDialog>
      </DialogToggleOpen>
    </div>
  );
};

export default DialogSearch;
