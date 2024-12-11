"use client";
import Menu from "@/_components/dropdown/Menu";
import Toggle from "@/_components/dropdown/Toggle";
import { useState } from "react";
import { MdSort } from "react-icons/md";

const SortDropDown = ({
  dropdownItems,
  selectedSortBy,
}: {
  dropdownItems: React.JSX.Element[];
  selectedSortBy: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const ariaControlsId = "sort_dropdown";
  return (
    <Toggle
      leadingIcon={<MdSort size={24} />}
      ariaControlsId={ariaControlsId}
      toggle={toggle}
      isOpen={isOpen}
      label={selectedSortBy}
    >
      <Menu id={ariaControlsId} isOpen={isOpen}>
        {dropdownItems}
      </Menu>
    </Toggle>
  );
};

export default SortDropDown;
