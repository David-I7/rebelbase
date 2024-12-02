import React from "react";

const GameIdentifier = ({
  gameName,
  developerCompanyName,
  style,
  responsiveClassName,
}: {
  gameName: string;
  developerCompanyName?: string;
  style?: React.CSSProperties;
  responsiveClassName?: string;
}) => {
  return (
    <div
      style={style}
      className={`${responsiveClassName} flex flex-col max-w-[400px] w-full px-4`}
    >
      <h1 className="text-center sm:text-start text-4xl line-clamp-2 text-ellipsis">
        {gameName}
      </h1>
      {developerCompanyName && (
        <div className="font-medium text-primary text-center sm:text-start whitespace-nowrap overflow-hidden text-ellipsis">
          {developerCompanyName}
        </div>
      )}
    </div>
  );
};

export default GameIdentifier;
