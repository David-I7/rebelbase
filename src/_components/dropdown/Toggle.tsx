import React, { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";

const Toggle = ({
  isOpen,
  ariaControlsId,
  children,
  leadingIcon,
  label,
  toggle,
}: {
  toggle: () => void;
  isOpen: boolean;
  ariaControlsId: string;
  label: ReactNode;
  leadingIcon?: ReactNode;
  children: ReactNode;
}) => {
  const buttonPadding = leadingIcon ? "px-2" : "pr-2 pl-4";

  return (
    <>
      <button
        className={`${buttonPadding} text-on-surface-heading-varient flex items-center gap-2 font-medium font-body-xl`}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={ariaControlsId}
      >
        {leadingIcon}
        {label}
        <MdChevronRight
          size={24}
          className={`${
            isOpen ? "-rotate-90" : "rotate-90"
          } transition-transform`}
        />
      </button>
      {children}
    </>
  );
};

export default Toggle;
