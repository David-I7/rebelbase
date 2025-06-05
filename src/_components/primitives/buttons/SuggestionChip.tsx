import Link from "next/link";
import React, { ReactNode } from "react";

type SuggestionChipProps = {
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  label: string;
  href: string;
};

const SuggestionChip = ({
  href,
  trailingIcon,
  leadingIcon,
  label,
}: SuggestionChipProps) => {
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
      prefetch={false}
      href={href}
      className={`${linkPadding} hover:brightness-115 transition-brightness font-body-s font-medium bg-surface-container h-8 inline-flex items-center gap-2  border-outline-varient border rounded-full`}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </Link>
  );
};

export default SuggestionChip;
