/**
 * Authentication reducer and actions
 */

export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// PUBLIC_INTERFACE
export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case "LOGOUT":
      return { ...initialAuthState };
    default:
      return state;
  }
}
