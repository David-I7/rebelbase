"use client";
import { SearchParamsBrowse } from "@/lib/validation/queryFieldsValidation";
import { createContext, ReactNode, useReducer } from "react";

export type Action = {
  type: (typeof ActionType)[number];
  payload?: { key?: (typeof filterKeys)[number]; value: string };
};
const ActionType = ["remove", "add", "reset", "search"] as const;
export const filterKeys = [
  "genres",
  "themes",
  "gameModes",
  "categories",
] as const;

type InitFilterContext = [
  state: { [Key in (typeof filterKeys)[number]]: Set<string> } & {
    keyword: string;
    filterCount: number;
  },
  dispatch: React.Dispatch<Action>
];

export const initStateValue: InitFilterContext[0] = {
  categories: new Set(),
  gameModes: new Set(),
  themes: new Set(),
  genres: new Set(),
  keyword: "",
  filterCount: 0,
};

const initDispatchValue = () => {};

export const FilterContext = createContext<InitFilterContext>([
  initStateValue,
  initDispatchValue,
]);

function reducer(
  state: InitFilterContext["0"],
  action: Action
): InitFilterContext["0"] {
  switch (action.type) {
    case ActionType[0]: {
      const prevKeyState = state[action.payload!.key!];
      prevKeyState.delete(action.payload!.value);
      return {
        ...state,
        [action.payload!.key!]: new Set(prevKeyState),
        filterCount: state.filterCount - 1,
      };
    }
    case ActionType[1]: {
      const prevKeyState = state[action.payload!.key!];
      prevKeyState.add(action.payload!.value);

      return {
        ...state,
        [action.payload!.key!]: new Set(prevKeyState),
        filterCount: state.filterCount + 1,
      };
    }
    case ActionType[2]: {
      return {
        ...initStateValue,
      };
    }
    case ActionType[3]: {
      return {
        ...state,
        keyword: action.payload!.value,

        filterCount:
          action.payload!.value && state.keyword
            ? state.filterCount
            : action.payload!.value && !state.keyword
            ? state.filterCount + 1
            : state.filterCount - 1,
      };
    }
    default:
      return state;
  }
}

const useFilterContext = (
  searchParams: SearchParamsBrowse
): [state: InitFilterContext["0"], dispatch: InitFilterContext["1"]] => {
  const [state, dispatch] = useReducer(
    reducer,
    buildFilterQueryState(searchParams) as InitFilterContext["0"]
  );

  return [state, dispatch];
};

function buildFilterQueryState(
  searchParams: SearchParamsBrowse
): InitFilterContext["0"] {
  return {
    genres: createFilterSet(searchParams.genres),
    keyword: searchParams.keyword ? searchParams.keyword : "",
    themes: createFilterSet(searchParams.themes),
    categories: createFilterSet(searchParams.categories),
    gameModes: createFilterSet(searchParams.gameModes),
    filterCount: getFilterCount(searchParams),
  };
}

export function buildQueryString(
  pathname: string,
  sort: SearchParamsBrowse["sort"],
  state: InitFilterContext["0"]
): string {
  function getQueryStringSegment(
    segmentName: string,
    segmentValues: string | Set<string>
  ): string {
    if (segmentValues instanceof Set) {
      if (segmentValues.size <= 0) return "";
      let qs = `&${segmentName}=`;
      let count = 0;
      segmentValues.forEach((value) => {
        if (count === segmentValues.size - 1) {
          qs += `${value}`;
        } else {
          qs += `${value}&${segmentName}=`;
          count++;
        }
      });
      return qs;
    } else if (typeof segmentValues === "string") {
      if (segmentValues.length) return `&${segmentName}=${segmentValues}`;
      return "";
    } else return "";
  }

  const genres = getQueryStringSegment("genres", state.genres);
  const themes = getQueryStringSegment("themes", state.themes);
  const categories = getQueryStringSegment("categories", state.categories);
  const gameModes = getQueryStringSegment("gameModes", state.gameModes);
  const keyword = getQueryStringSegment("keyword", state.keyword);

  return `${pathname}?sortBy=${sort.field}&sortDir=${sort.order}${keyword}${categories}${gameModes}${themes}${genres}`;
}

function getFilterCount(searchParams: SearchParamsBrowse) {
  function getSegmentCount(segment: string | string[] | undefined): number {
    if (typeof segment === "string") {
      return segment.length > 0 ? 1 : 0;
    } else if (Array.isArray(segment)) {
      return segment.length;
    } else {
      return 0;
    }
  }

  const genresCount = getSegmentCount(searchParams.genres);
  const themesCount = getSegmentCount(searchParams.themes);
  const categoriesCount = getSegmentCount(searchParams.categories);
  const gameModesCount = getSegmentCount(searchParams.gameModes);
  const keywordCount = getSegmentCount(searchParams.keyword);

  return (
    genresCount + themesCount + categoriesCount + gameModesCount + keywordCount
  );
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
  return (
    <FilterContext.Provider value={useFilterContext(searchParams)}>
      {children}
    </FilterContext.Provider>
  );
};
