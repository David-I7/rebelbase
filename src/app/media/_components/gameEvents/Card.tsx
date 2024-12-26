import React, { ReactNode } from "react";

const Card = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      className="flex flex-col w-[200px] md:w-[254px] lg:w-[308px] gap-3"
    >
      {children}
    </div>
  );
};

export default Card;
