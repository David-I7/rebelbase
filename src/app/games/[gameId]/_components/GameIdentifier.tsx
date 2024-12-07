import React from "react";

const GameIdentifier = ({
  gameName,
  developerCompanyName,
}: {
  gameName: string;
  developerCompanyName?: string;
}) => {
  return (
    <div
      className={`md:flex flex-col max-w-[400px] lg:max-w-[540px] w-full hidden`}
    >
      <h1 className="text-center md:text-start text-4xl line-clamp-2 text-ellipsis">
        {gameName}
      </h1>
      {developerCompanyName && (
        <div className="font-medium text-primary text-center md:text-start whitespace-nowrap overflow-hidden text-ellipsis">
          {developerCompanyName}
        </div>
      )}
    </div>
  );
};

export default GameIdentifier;
