import React, { ReactNode } from "react";

const HeroArticleSkeleton = ({ children }: { children: ReactNode }) => {
  return <div className="flex-1 grid gap-4">{children}</div>;
};

export default HeroArticleSkeleton;
