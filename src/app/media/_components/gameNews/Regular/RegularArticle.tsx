import React, { ReactNode } from "react";

const RegularArticle = ({
  children,
  customClass,
}: {
  children: ReactNode;
  customClass?: string;
}) => {
  return (
    <article
      className={`${customClass} flex gap-2 sm:gap-4 items-start min-w-0 basis-0 relative`}
    >
      {children}
    </article>
  );
};

export default RegularArticle;
