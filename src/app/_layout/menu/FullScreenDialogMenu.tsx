"use client";
import IconTarget from "@/_components/primitives/buttons/IconTarget";
import FullScreenDialog from "@/_components/primitives/dialog/FullScreenDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdChevronRight, MdClose, MdMenu } from "react-icons/md";

const FullScreenDialogMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const ariaControlsId = "menu_fullscreen_dialog";
  const selectedStyles = "text-primary";
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        aria-controls={ariaControlsId}
        aria-expanded={isOpen}
        onClick={toggle}
        className="sm:hidden text-on-surface-heading-varient rounded-full bg-surface hover:bg-surface-container-normal transition-colors place-content-center grid h-10 w-10"
      >
        <MdMenu size={24} />
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

        <ul>
          <li
            onMouseEnter={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "0";
            }}
            className={`${
              pathName === "/"
                ? selectedStyles
                : "text-on-surface-heading-varient"
            } text-2xl cursor-pointer justify-between font-semibold min-h-10 flex items-center`}
          >
            <Link onClick={toggle} href={`/`}>
              Home
            </Link>
            <MdChevronRight
              className="opacity-0 transition-opacity"
              size={32}
            />
          </li>
          <li
            onMouseEnter={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "0";
            }}
            className={`${
              pathName === "/browse"
                ? selectedStyles
                : "text-on-surface-heading-varient"
            } text-2xl cursor-pointer justify-between font-semibold min-h-10 flex items-center`}
          >
            <Link onClick={toggle} href={`/browse`}>
              Browse
            </Link>
            <MdChevronRight
              className="opacity-0 transition-opacity"
              size={32}
            />
          </li>
          <li
            onMouseEnter={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const chevronRightRef = e.currentTarget
                .children[1]! as HTMLElement;
              chevronRightRef.style.opacity = "0";
            }}
            className={`${
              pathName === "/media"
                ? selectedStyles
                : "text-on-surface-heading-varient"
            } text-2xl cursor-pointer justify-between font-semibold min-h-10 flex items-center`}
          >
            <Link onClick={toggle} href={`/media`}>
              Media
            </Link>
            <MdChevronRight
              className="opacity-0 transition-opacity"
              size={32}
            />
          </li>
        </ul>
      </FullScreenDialog>
    </div>
  );
};

export default FullScreenDialogMenu;
