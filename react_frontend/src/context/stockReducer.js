/**
 * Stock data reducer and actions
 */

export const initialStockState = {
  data: {}, // {symbol: {meta, price, trend, loading, error}}
};

// PUBLIC_INTERFACE
export function stockReducer(state, action) {
  switch (action.type) {
    case "FETCH_STOCK_REQUEST":
      return {
        ...state,
        data: {
          ...state.data,
          [action.symbol]: { ...(state.data[action.symbol] || {}), loading: true, error: null },
        },
      };
    case "FETCH_STOCK_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.symbol]: {
            ...(state.data[action.symbol] || {}),
            ...action.payload,
            loading: false,
            error: null,
          },
        },
      };
    case "FETCH_STOCK_FAILURE":
      return {
        ...state,
        data: {
          ...state.data,
          [action.symbol]: {
            ...(state.data[action.symbol] || {}),
            loading: false,
            error: action.payload,
          },
        },
      };
    default:
      return state;
  }
}
