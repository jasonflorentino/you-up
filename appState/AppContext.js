import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { reducer, initialState } from "./reducer";

const AppContext = createContext();

/**
 * Inspired by
 * https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2
 */
export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export const TimezoneContext = createContext();