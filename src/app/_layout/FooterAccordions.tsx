"use client";
import Accordion from "@/_components/primitives/accordion/Accordion";
import { uiFriendlyPlatformsMap } from "@/data/constants/filterEnums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { MouseEvent } from "react";

const FooterAccordions = () => {
  const pathName = usePathname();

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
    <div className="sm:hidden bg-ou">
      <Accordion
        style={{
          borderBottom: "1px solid var(--color-outline-varient-low)",
        }}
        summary="Links"
      >
        <ul>
          <AccordionListItem
            label={"Home"}
            isSelected={pathName === "/"}
            onClickCapture={handleClickCapture}
            href="/"
          />
          <AccordionListItem
            label={"Browse"}
            isSelected={pathName === "/browse"}
            onClickCapture={handleClickCapture}
            href="/browse"
          />
          <AccordionListItem
            label={"Media"}
            isSelected={pathName === "/media"}
            onClickCapture={handleClickCapture}
            href="/media"
          />
        </ul>
      </Accordion>
      <Accordion summary="Platforms">
        <ul>
          {Object.entries(uiFriendlyPlatformsMap).map(([key, val]) => {
            return (
              <AccordionListItem
                key={`footer_nav_platform_link_${key}`}
                href={`/platforms/${key}`}
                isSelected={pathName === `/platforms/${key}`}
                onClickCapture={handleClickCapture}
                label={val}
              />
            );
          })}
        </ul>
      </Accordion>
    </div>
  );
};

export default FooterAccordions;

type AccordionListItemProps = {
  label: String;
  isSelected: boolean;
  onClickCapture: (e: MouseEvent, targetPathName: string) => void;
  href: string;
};

function AccordionListItem({
  label,
  href,
  isSelected,
  onClickCapture,
}: AccordionListItemProps) {
  const selectedStyle = isSelected
    ? "bg-surface-container-normal font-medium text-on-surface-heading-varient"
    : "";
  return (
    <li>
      <Link
        className={`${selectedStyle} px-2 font-body-s h-10 rounded-sm hover:bg-surface-container-normal cursor-pointer transition-colors flex items-center gap-2 justify-between`}
        onClickCapture={(e) => onClickCapture(e, href)}
        href={href}
      >
        {label}
      </Link>
    </li>
  );
}
