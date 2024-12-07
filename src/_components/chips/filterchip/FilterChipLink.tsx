import Link from "next/link";
import React, { ReactNode } from "react";

type FilterChipLinkProps = {
  pathName: string;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: ReactNode;
  style?: React.CSSProperties;
  query?: { [key: string]: string };
};

const FilterChipLink = ({
  pathName,
  trailingIcon,
  leadingIcon,
  label,
  style,
  query,
}: FilterChipLinkProps) => {
  const linkPadding =
    trailingIcon && leadingIcon
      ? "px-2"
      : trailingIcon
      ? "pl-4 pr-2"
      : leadingIcon
      ? "pl-2 pr-2"
      : "px-4";

  return (
    <Link
      style={style}
      className={`${linkPadding} bg-surface-container-lowest transition-colors hover:bg-surface-container-normal rounded-full border border-outline-varient flex items-center h-8 font-medium font-body-s`}
      prefetch={false}
      href={{ pathname: pathName, query: query }}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </Link>
  );
};

export default FilterChipLink;
