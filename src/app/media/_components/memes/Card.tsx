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
      className="flex w-[164px] md:w-[204px] lg:w-[244px] flex-col gap-3"
    >
      {children}
    </div>
  );
};

export default Card;
