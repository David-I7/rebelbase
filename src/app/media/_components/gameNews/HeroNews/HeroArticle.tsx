import React, { ReactNode } from "react";

const HeroArticle = ({ children }: { children: ReactNode }) => {
  return <article className="flex-1 grid gap-4">{children}</article>;
};

export default HeroArticle;
