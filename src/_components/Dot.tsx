import React from "react";

const Dot = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div
      style={style}
      className="flex-shrink-0 min-w-1 min-h-1 max-h-1 w-1 h-1 bg-on-surface-body rounded-full"
    ></div>
  );
};

export default Dot;
