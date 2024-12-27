import React from "react";

const HorizontalRay = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <hr
      style={style}
      className="h-[1px] border-[0.5px] border-outline-varient-lowest bg-outline-varient-lowest text-outline-varient-lowest"
    ></hr>
  );
};

export default HorizontalRay;
