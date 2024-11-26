import React from "react";

type CarouselndicatorProps = {
  selectedIndex: number;
  index: number;
  handleClick: (index: number) => void;
};

const Carouselndicator = ({
  index,
  selectedIndex,
  handleClick,
}: CarouselndicatorProps) => {
  const selectedStyles =
    index === selectedIndex
      ? "bg-primary"
      : "border border-outline-varient-lowes";
  return (
    <button
      onClick={() => handleClick(index)}
      className={`${selectedStyles} rounded-full w-2 h-2 t transition-background duration-300`}
    ></button>
  );
};

export default Carouselndicator;
