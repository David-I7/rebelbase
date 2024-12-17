"use client";
import { sortBy } from "@/data/constants/filterEnums";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type InitContextType = {
  url: string;
  setUrl: React.Dispatch<SetStateAction<string>>;
  selectedSortBy: (typeof sortBy)[number];
};

export const GameDataContext = createContext<InitContextType>({
  url: "",
  setUrl: () => {},
  selectedSortBy: "newReleases",
});

const useGameDataContext = (URL: string): InitContextType => {
  console.log(URL);
  const [url, setUrl] = useState<string>(URL);
  console.log(url);
  const selectedSortBy = useMemo(
    () => url.match(/(?<=sortBy=)(.+?)&/)![1] as (typeof sortBy)[number],
    [url]
  );
  return { url, setUrl, selectedSortBy };
};

export const GameDataContextProvider = ({
  children,
  URL,
}: {
  children: ReactNode;
  URL: string;
}) => {
  return (
    <GameDataContext.Provider value={useGameDataContext(URL)}>
      {children}
    </GameDataContext.Provider>
  );
};
