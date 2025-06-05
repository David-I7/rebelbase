"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavBarProps = {
  customClass?: string;
};

const NavBar = ({ customClass }: NavBarProps) => {
  const currentPath = usePathname();
  const selectedStyles = "text-primary after:bg-primary";

  return (
    <nav>
      <ul className={customClass}>
        <li>
          <Link
            prefetch={false}
            onClickCapture={(e) => {
              if (currentPath === "/") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={`${
              currentPath === "/"
                ? selectedStyles
                : "text-secondary hover:text-on-primary-container transition-colors"
            } relative   after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)]  after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium font-body-m`}
            href={`/`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            prefetch={false}
            onClickCapture={(e) => {
              if (currentPath === "/browse") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={`${
              currentPath === "/browse"
                ? selectedStyles
                : "text-secondary hover:text-on-primary-container transition-colors"
            } relative  after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)]  after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium font-body-m`}
            href={`/browse`}
          >
            Browse
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
