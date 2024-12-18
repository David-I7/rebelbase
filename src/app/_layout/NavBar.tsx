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
        <li>
          <Link
            className={`${
              currentPath === "/media"
                ? selectedStyles
                : "text-secondary hover:text-on-primary-container transition-colors"
            } relative   after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)] after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium font-body-m`}
            href={`/media`}
          >
            Media
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
