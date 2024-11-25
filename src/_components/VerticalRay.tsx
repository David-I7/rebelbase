import React from "react";

const VerticalRay = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div
      style={style}
      className="min-w-[1px] min-h-full bg-outline-varient-lowest"
    ></div>
  );
};

export default VerticalRay;
