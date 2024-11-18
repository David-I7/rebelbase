"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavBarProps = {
  responsive?: boolean;
  customClass?: string;
};

const NavBar = ({ responsive = false, customClass }: NavBarProps) => {
  const currentPath = usePathname();
  const responsiveStyles = responsive ? "hidden md:block" : "block";
  const selectedStyles = "text-primary after:bg-primary";
  return (
    <nav className={responsiveStyles}>
      <ul className={customClass}>
        <li>
          <Link
            className={`${
              currentPath === "/" ? selectedStyles : "text-secondary"
            } relative after:content-['']  after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)]  after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium hover:brightness-115 transition-brightness font-body-m outline-none outline outline-1 focus:outline-primary`}
            href={`/`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${
              currentPath === "/browse" ? selectedStyles : "text-secondary"
            } relative after:content-[''] after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)]  after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium hover:brightness-115 transition-brightness font-body-m outline-none outline outline-1 focus:outline-primary`}
            href={`/browse`}
          >
            Browse
          </Link>
        </li>
        <li>
          <Link
            className={`${
              currentPath === "/media" ? selectedStyles : "text-secondary"
            } relative after:content-['']  after:absolute after:bottom-0 after:w-[calc(100%_-_2rem)] after:h-[2px] h-10 px-4 flex items-center cursor-pointer font-medium hover:brightness-115 transition-brightness font-body-m outline-none outline outline-1 focus:outline-primary`}
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
