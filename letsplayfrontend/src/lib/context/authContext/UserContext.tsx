import { store as initialStore } from "./store";
import { createContext, useContext, useReducer, useEffect } from "react";
import {
  CREATE_USER,
  CREATE_USER_PROFILE,
  CREATE_USER_SESSION,
  DELETE_USER_SESSION,
  LOAD_ON_CREATE_USER,
  LOAD_ON_LOGIN_USER,
  LOAD_ON_PROFILE_UPDATE,
} from "./actions";

// Keys for localStorage
const STORAGE_KEY = "userContext";

const UserContextProvider = createContext(undefined);

export const useUserContext = () => useContext(UserContextProvider);

// Reducer function
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case CREATE_USER:
      newState = { ...state, user: action.payload };
      break;
    case CREATE_USER_SESSION:
      newState = { ...state, isAuthenticated: true, user: action.payload };
      break;
    case CREATE_USER_PROFILE:
      newState = { ...state, user_profile: action.payload };
      break;
    case LOAD_ON_CREATE_USER:
      newState = {
        ...state,
        isCreateAccountLoading: !state.isCreateAccountLoading,
      };
      break;
    case LOAD_ON_LOGIN_USER:
      newState = {
        ...state,
        isLoginLoading: !state.isLoginLoading,
      };
      break;
    case LOAD_ON_PROFILE_UPDATE:
      newState = {
        ...state,
        isUpdatingProfile: !state.isUpdatingProfile,
      };
      break;
    case DELETE_USER_SESSION:
      newState = {
        ...state,
        user: {},
        user_profile: {},
        isAuthenticated: false,
      };
      break;
    default:
      throw new Error("Unknown action specified!");
  }

  // Persist state to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

// Load state from localStorage or use initial state
const loadStateFromStorage = () => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : initialStore;
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromStorage());

  useEffect(() => {
    // Whenever state changes, save it to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <UserContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
