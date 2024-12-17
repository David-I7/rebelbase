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
  QS: string;
  setQS: React.Dispatch<SetStateAction<string>>;
  selectedSortBy: (typeof sortBy)[number];
};

export const GameDataContext = createContext<InitContextType>({
  QS: "",
  setQS: () => {},
  selectedSortBy: "newReleases",
});

const useGameDataContext = (qs: string): InitContextType => {
  const [QS, setQS] = useState<string>(qs);
  const selectedSortBy = useMemo(
    () => QS.match(/(?<=sortBy=)(.+?)&/)![1] as (typeof sortBy)[number],
    [QS]
  );
  return { QS, setQS, selectedSortBy };
};

export const GameDataContextProvider = ({
  children,
  qs,
}: {
  children: ReactNode;
  qs: string;
}) => {
  return (
    <GameDataContext.Provider value={useGameDataContext(qs)}>
      {children}
    </GameDataContext.Provider>
  );
};
