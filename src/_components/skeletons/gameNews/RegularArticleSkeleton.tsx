import React, { ReactNode } from "react";

const RegularArticleSkeleton = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-2 items-start min-w-0">{children}</div>;
};

export default RegularArticleSkeleton;
