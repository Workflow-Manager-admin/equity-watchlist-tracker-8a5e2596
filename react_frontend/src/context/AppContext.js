import React, { createContext, useReducer } from "react";
import { initialAuthState, authReducer } from "./authReducer";
import { initialWatchlistState, watchlistReducer } from "./watchlistReducer";
import { initialStockState, stockReducer } from "./stockReducer";

// Color palette (light theme)
export const palette = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#ff9800",
  error: "#f44336",
  bg: "#ffffff",
  text: "#282c34",
};

const defaultTheme = "light";

// Main App Context
export const AppContext = createContext();

/**
 * Aggregates all reducers to provide application-wide context/state.
 * Wrap with AppProvider in App.js
 */
// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);
  const [watchlist, dispatchWatchlist] = useReducer(
    watchlistReducer,
    initialWatchlistState
  );
  const [stocks, dispatchStock] = useReducer(stockReducer, initialStockState);
  const [theme, setTheme] = React.useState(defaultTheme);

  return (
    <AppContext.Provider
      value={{
        auth,
        dispatchAuth,
        watchlist,
        dispatchWatchlist,
        stocks,
        dispatchStock,
        theme,
        setTheme,
        palette,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
