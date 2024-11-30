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
  const selectedStyles = index === selectedIndex ? "w-2 h-2" : "w-1 h-1";
  return (
    <button
      onClick={() => handleClick(index)}
      className={`${selectedStyles} rounded-full bg-primary transition-background duration-300`}
    ></button>
  );
};

export default Carouselndicator;
