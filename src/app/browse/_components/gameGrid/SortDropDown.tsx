"use client";
import Menu from "@/_components/primitives/dropdown/Menu";
import Toggle from "@/_components/primitives/dropdown/Toggle";
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
      customClass="hover:brightness-115"
      style={{ fontSize: "16px", gap: "0" }}
      leadingIcon={<MdSort className="flex-shrink-0" size={20} />}
      ariaControlsId={ariaControlsId}
      toggle={toggle}
      isOpen={isOpen}
      label={
        <div className="[@media(min-width:395px)]:block hidden [@media(min-width:395px)]:px-2">
          {selectedSortBy}
        </div>
      }
    >
      <Menu toggle={toggle} id={ariaControlsId} isOpen={isOpen}>
        {dropdownItems}
      </Menu>
    </Toggle>
  );
};

export default SortDropDown;
