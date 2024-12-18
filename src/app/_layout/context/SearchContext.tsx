"use client";
import { debounce } from "@/utils/performance";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type InitSearchType = {
  searchValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deferredSearchValue: string;
  handleReset: () => void;
};

const InitSearchState: InitSearchType = {
  searchValue: "",
  deferredSearchValue: "",
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {},
  handleReset: () => {},
};

export const SearchContext = createContext<InitSearchType>(InitSearchState);

const debouncedSearchValue = debounce(
  (props: {
    searchValue: string;
    setDeferredSearchValue: Dispatch<SetStateAction<string>>;
  }) => props.setDeferredSearchValue(props.searchValue),
  300
);

const useSearchContext = (): InitSearchType => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [deferredSearchValue, setDeferredSearchValue] = useState<string>("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);
  const handleReset = useCallback(() => {
    setSearchValue("");
  }, []);

  useEffect(() => {
    if (searchValue === "" && deferredSearchValue === "") return;
    debouncedSearchValue({ searchValue: searchValue, setDeferredSearchValue });
  }, [searchValue]);

  return { searchValue, handleChange, handleReset, deferredSearchValue };
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
