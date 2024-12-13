import React, { MouseEvent, ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";

const Toggle = ({
  isOpen,
  ariaControlsId,
  children,
  leadingIcon,
  label,
  toggle,
  style,
  customClass,
}: {
  toggle: (e: MouseEvent) => void;
  isOpen: boolean;
  ariaControlsId: string;
  label: ReactNode;
  leadingIcon?: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
  customClass?: string;
}) => {
  const buttonPadding = leadingIcon ? "px-2" : "pr-2 pl-4";

  return (
    <>
      <button
        className={`${buttonPadding} ${customClass} text-on-surface-heading-varient flex items-center gap-2 font-medium font-body-s`}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={ariaControlsId}
        style={style}
      >
        {leadingIcon}
        {label}
        <MdChevronRight
          size={24}
          className={`${
            isOpen ? "-rotate-90" : "rotate-90"
          } transition-transform flex-shrink-0`}
        />
      </button>
      {children}
    </>
  );
};

export default Toggle;
