/**
 * Watchlist reducer and actions
 */

export const initialWatchlistState = {
  items: [],
  selectedSymbol: "",
  loading: false,
  error: null,
};

// PUBLIC_INTERFACE
export function watchlistReducer(state, action) {
  switch (action.type) {
    case "LOAD_WATCHLIST":
      return { ...state, items: action.payload, loading: false, error: null };
    case "ADD_STOCK":
      if (
        state.items.some(
          (item) => item.symbol.toUpperCase() === action.payload.symbol.toUpperCase()
        )
      )
        return { ...state };
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_STOCK":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.symbol.toUpperCase() !== action.payload.toUpperCase()
        ),
      };
    case "SELECT_STOCK":
      return { ...state, selectedSymbol: action.payload };
    case "WATCHLIST_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}
