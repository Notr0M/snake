import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authProvider";

export default function PrivateRoute({ children, ...rest }) {
  console.log("private");
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return <Route>{children}</Route>;
}
