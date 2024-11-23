import React from "react";

type LogoTypeProps = {
  responsive?: boolean;
  style?: React.CSSProperties;
};

const LogoType = ({ responsive = false, style }: LogoTypeProps) => {
  const conditionalStyles = responsive ? "lg:hidden" : "";

  return (
    <div
      style={style}
      className={`${conditionalStyles} font-logo text-primary selection:bg-on-primary-container`}
    >
      REBELBASE
    </div>
  );
};

export default LogoType;
