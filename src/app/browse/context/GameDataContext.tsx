"use client";
import { sortBy } from "@/data/constants/filterEnums";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

type InitContextType = {
  cacheKey: string;
  setCacheKey: React.Dispatch<SetStateAction<string>>;
  selectedSortBy: (typeof sortBy)[number];
};

export const GameDataContext = createContext<InitContextType>({
  cacheKey: "",
  setCacheKey: () => {},
  selectedSortBy: "newReleases",
});

const useGameDataContext = (URL: string): InitContextType => {
  const [cacheKey, setCacheKey] = useState<string>(URL);
  useEffect(() => {
    if (URL !== cacheKey) setCacheKey(URL);
  }, [URL]);
  useEffect(() => {
    window.history.replaceState(null, "", cacheKey);
  }, [cacheKey]);

  const selectedSortBy = useMemo(
    () => cacheKey.match(/(?<=sortBy=)(.+?)&/)![1] as (typeof sortBy)[number],
    [cacheKey]
  );
  return { cacheKey, setCacheKey, selectedSortBy };
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
