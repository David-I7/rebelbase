import { SearchParamsBrowse } from "@/data/constants/queryFields";
import { createContext, ReactNode, useReducer, useState } from "react";

type ActionType = "remove" | "add";
const Actions = [
  "genres",
  "tags",
  "themes",
  "gameModes",
  "categories",
] as const;

type InitFilterContext = {
  [Key in (typeof Actions)[number]]: Set<string>;
};

export const FilterContext = createContext<InitFilterContext>({
  categories: new Set(),
  gameModes: new Set(),
  tags: new Set(),
  themes: new Set(),
  genres: new Set(),
});

function reducer(
  state: InitFilterContext,
  action: { name: (typeof Actions)[number]; payload: { value: string } }
): InitFilterContext {
  switch (action.name) {
    // case Actions[0] :{

    // }
    // case Actions[1] :{

    // }
    // case Actions[2] :{

    // }
    // case Actions[3] :{

    // }
    // case Actions[4] :{

    // }
    default:
      return state;
  }
}

const useFilterContext = (searchParams: SearchParamsBrowse) => {
  const [filterQueryState, setFilterQueryState] = useReducer(
    reducer,
    buildFilterQueryState(searchParams) as InitFilterContext
  );

  return filterQueryState;
};

function buildFilterQueryState(
  searchParams: SearchParamsBrowse
): InitFilterContext {
  return {
    genres: createFilterSet(searchParams.genres),
    tags: createFilterSet(searchParams.tags),
    themes: createFilterSet(searchParams.themes),
    categories: createFilterSet(searchParams.categories),
    gameModes: createFilterSet(searchParams.gameModes),
  };
}

function createFilterSet(category: string | string[] | undefined): Set<string> {
  if (typeof category === "string") {
    return new Set([category]);
  } else if (Array.isArray(category)) {
    return new Set(category);
  } else return new Set();
}

type FilterContextProviderProps = {
  children: ReactNode;
  searchParams: SearchParamsBrowse;
};

export const FilterContextProvider = ({
  children,
  searchParams,
}: FilterContextProviderProps) => {
  return <FilterContext.Provider value={useFilterContext(searchParams)} />;
};
