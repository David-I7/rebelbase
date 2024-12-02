import React from "react";

const VerticalRay = ({
  style,
  responsiveClassName,
}: {
  style?: React.CSSProperties;
  responsiveClassName?: string;
}) => {
  return (
    <div
      style={style}
      className={`${responsiveClassName} min-w-[1px] min-h-full self-stretch bg-outline-varient-lowest`}
    ></div>
  );
};

export default VerticalRay;
