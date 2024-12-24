import { createContext, ReactNode, useEffect, useReducer } from "react";

type InitContextState = {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
};

export const GameNewsContext = createContext<InitContextState>({
  isLarge: true,
  isMedium: false,
  isSmall: false,
});

type Action = {
  type: "isSmall" | "isMedium" | "isLarge";
};

function reducer(state: InitContextState, action: Action): InitContextState {
  switch (action.type) {
    case "isSmall": {
      if (state.isSmall) return state;
      return getState("isSmall");
    }
    case "isMedium": {
      if (state.isMedium) return state;
      return getState("isMedium");
    }
    case "isLarge": {
      if (state.isLarge) return state;
      return getState("isLarge");
    }
  }
}

const useContext = () => {
  const [state, dispatch] = useReducer(reducer, getState(getActionType()));

  useEffect(() => {
    const handleResize = () => {
      const ActionType = getActionType();

      if (state.isSmall) {
        if (ActionType !== "isSmall") dispatch({ type: ActionType });
      } else if (state.isMedium) {
        if (ActionType !== "isMedium") dispatch({ type: ActionType });
      } else {
        if (ActionType !== "isLarge") dispatch({ type: ActionType });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  return state;
};

const smallWidthEnd = 640;
const mediumWidthEnd = 922;

function getActionType(): Action["type"] {
  const clientWidth = window.innerWidth;
  if (clientWidth > 0 && clientWidth < smallWidthEnd) {
    return "isSmall";
  } else if (clientWidth >= smallWidthEnd && clientWidth < mediumWidthEnd) {
    return "isMedium";
  } else {
    return "isLarge";
  }
}

function getState(type: Action["type"]): InitContextState {
  if (type === "isSmall") {
    return {
      isSmall: true,
      isMedium: false,
      isLarge: false,
    };
  } else if (type === "isMedium") {
    return {
      isSmall: false,
      isMedium: true,
      isLarge: false,
    };
  } else {
    return {
      isSmall: false,
      isMedium: false,
      isLarge: true,
    };
  }
}

export const GameNewsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  console.log("initializing state");
  return (
    <GameNewsContext.Provider value={useContext()}>
      {children}
    </GameNewsContext.Provider>
  );
};
