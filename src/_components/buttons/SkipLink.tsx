"use client";
import Link from "next/link";
import React, { ReactNode, useEffect, useRef } from "react";

type SkipLinkProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  sectionId: string;
};

const SkipLink = ({
  trailingIcon,
  leadingIcon,
  label,
  sectionId,
}: SkipLinkProps) => {
  const linkPadding =
    trailingIcon && leadingIcon
      ? "px-2"
      : trailingIcon
      ? "pl-4 pr-2"
      : leadingIcon
      ? "pl-2 pr-2"
      : "px-4";

  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sectionRef = document.getElementById(sectionId.replace("#", ""))!;
    const linkRefCurrent = linkRef.current!;
    const skipLinkParent = linkRef.current!.parentElement!;
    const skipLinkParentBottom =
      skipLinkParent.offsetTop + skipLinkParent.offsetHeight;
    const sectionOffsetBottom = sectionRef.offsetTop + sectionRef.offsetHeight;
    const handleScroll = () => {
      const rangeStart =
        sectionRef.offsetTop - document.documentElement.scrollTop;
      const rangeEnd =
        sectionOffsetBottom -
        document.documentElement.scrollTop -
        skipLinkParentBottom;
      console.log(rangeStart, rangeEnd);
      if (
        sectionRef.offsetTop - document.documentElement.scrollTop <=
          skipLinkParentBottom &&
        sectionOffsetBottom -
          document.documentElement.scrollTop -
          skipLinkParentBottom >=
          0
      ) {
        linkRefCurrent.classList.add("bg-secondary");
        linkRefCurrent.classList.add("text-on-secondary");
      } else {
        linkRefCurrent.classList.remove("bg-secondary");
        linkRefCurrent.classList.remove("text-on-secondary");
      }
    };
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link
      ref={linkRef}
      href={sectionId}
      className={`${linkPadding} flex items-center justify-center gap-2 font-medium font-body-s h-8 rounded-full`}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </Link>
  );
};

export default SkipLink;
