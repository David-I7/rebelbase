import React from "react";

const Dot = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div
      style={style}
      className="min-h-1 min-w-1 bg-on-surface-body rounded-full inline-flex"
    ></div>
  );
};

export default Dot;
