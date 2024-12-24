import React, { ReactNode } from "react";

const RegularArticleSkeleton = ({
  children,
  customClass,
}: {
  children: ReactNode;
  customClass: string;
}) => {
  return (
    <div className={`${customClass} flex gap-2 items-start min-w-0`}>
      {children}
    </div>
  );
};

export default RegularArticleSkeleton;
