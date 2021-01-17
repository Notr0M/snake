import React from "react";

import _ from "lodash";

import { useUser } from "../util/useUser";

function reducer(state, action) {
  console.log("here");

  console.log(action);
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { isAuth: true });
    default:
      return state;
  }
}

const AuthContext = React.createContext();

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("Context is not provided");
  }
  return ctx;
}

export function AuthProvider({ children, path, ...rest }) {
  console.log("provider");

  const [state, dispatch] = React.useReducer(reducer, {
    isAuth: false,
  });

  const { user, loading } = useUser(dispatch);

  if (loading) {
    return <>Loading</>;
  }
  return (
    <AuthContext.Provider value={{ ...state, setAuth: dispatch }}>
      {children(path)}
    </AuthContext.Provider>
  );
}
