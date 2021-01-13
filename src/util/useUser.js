import React from "react";
import jwt from "jsonwebtoken";

export function useUser(setAuth) {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useLayoutEffect(() => {
    verify(localStorage.getItem("_token_"), setLoading, setAuth);
  }, []);
  return { user, loading, error };
}

function verify(token, cb, setAuth) {
  if (!token) {
    cb(false);
    return;
  }
  try {
    const isVerify = jwt.verify(token, "it is secret");
    cb(false);
    setAuth({ type: "login" });
    return;
  } catch (err) {
    cb(false);
    return;
  }
}
