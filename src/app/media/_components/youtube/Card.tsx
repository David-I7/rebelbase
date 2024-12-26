import React, { ReactNode } from "react";

const Card = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={style} className="grid gap-2 grid-cols-[146px]">
      {children}
    </div>
  );
};

export default Card;
