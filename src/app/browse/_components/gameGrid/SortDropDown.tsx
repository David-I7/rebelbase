"use client";
import Menu from "@/_components/dropdown/Menu";
import Toggle from "@/_components/dropdown/Toggle";
import { MouseEvent, useEffect, useState } from "react";
import { MdSort } from "react-icons/md";

const SortDropDown = ({
  dropdownItems,
  selectedSortBy,
}: {
  dropdownItems: React.JSX.Element[];
  selectedSortBy: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const ariaControlsId = "sort_dropdown";

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", () => setIsOpen(!isOpen), {
        once: true,
      });
    }
  }, [isOpen]);

  return (
    <Toggle
      style={{ fontSize: "16px" }}
      leadingIcon={<MdSort size={20} />}
      ariaControlsId={ariaControlsId}
      toggle={toggle}
      isOpen={isOpen}
      label={selectedSortBy}
    >
      <Menu toggle={toggle} id={ariaControlsId} isOpen={isOpen}>
        {dropdownItems}
      </Menu>
    </Toggle>
  );
};

export default SortDropDown;
