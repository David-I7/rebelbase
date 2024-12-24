import React, { ReactNode } from "react";

const RegularArticle = ({ children }: { children: ReactNode }) => {
  return <article className="flex gap-2 items-start">{children}</article>;
};

export default RegularArticle;
