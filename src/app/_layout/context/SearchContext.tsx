"use client";
import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from "react";

type InitSearchType = {
  searchValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;

  handleReset: () => void;
};

const InitSearchState: InitSearchType = {
  searchValue: "",
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {},
  handleReset: () => {},
};

export const SearchContext = createContext<InitSearchType>(InitSearchState);

const useSearchContext = (): InitSearchType => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);
  const handleReset = useCallback(() => {
    setSearchValue("");
  }, []);

  return { searchValue, handleChange, handleReset };
};

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SearchContext.Provider value={useSearchContext()}>
      {children}
    </SearchContext.Provider>
  );
};
