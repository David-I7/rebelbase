"use client";
import { uiFriendlyPlatformsMap } from "@/data/constants/filterEnums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { MouseEvent } from "react";

const FooterNav = () => {
  const pathName = usePathname();
  const selectedStyles =
    "text-primary hover:brightness-115 transition-brightness";

  const handleClickCapture = (e: MouseEvent, targetPathName: string) => {
    if (targetPathName === pathName) {
      e.preventDefault();
      e.stopPropagation();
      document.documentElement.scrollTo({
        top: -document.documentElement.scrollTop,
        behavior: "auto",
      });
    }
  };

  return (
    <nav className="hidden sm:flex font-body-s gap-20 items-start [@media(min-width:945px)]:flex-1 justify-center">
      <div className="grid gap-3">
        Links
        <ul className="grid gap-2 text-on-surface-heading-varient">
          <li>
            <Link
              prefetch={false}
              onClickCapture={(e) => handleClickCapture(e, "/")}
              href={"/"}
              className={`${
                pathName === "/"
                  ? selectedStyles
                  : "hover:text-on-primary-container transition-colors"
              } font-medium`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              prefetch={false}
              onClickCapture={(e) => handleClickCapture(e, "/browse")}
              href={"/browse"}
              className={`${
                pathName === "/browse"
                  ? selectedStyles
                  : "hover:text-on-primary-container transition-colors"
              } font-medium`}
            >
              Browse
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid gap-3 min-w-max">
        Platforms
        <ul className="grid gap-2 text-on-surface-heading-varient">
          {Object.entries(uiFriendlyPlatformsMap).map(([key, val]) => {
            return (
              <li key={`footer_nav_platform_link_${key}`}>
                <Link
                  prefetch={false}
                  onClickCapture={(e) =>
                    handleClickCapture(e, `/platforms/${key}`)
                  }
                  href={`/platforms/${key}`}
                  className={`${
                    pathName === `/platforms/${key}`
                      ? selectedStyles
                      : "hover:text-on-primary-container transition-colors"
                  } font-medium`}
                >
                  {val}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default FooterNav;
