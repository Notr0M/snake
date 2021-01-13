import React, { useState } from "react";
import { useQuery } from "react-query";
import { setToken, checkStatus } from "./login";

export default function Bootstrap() {
  const { isFetching, data, ...rest } = useQuery("user", fetch, {
    refetchOnWindowFocus: false,
  });
  if (!isFetching) {
    try {
      console.log(data);
      setToken(checkStatus(data));
    } catch (err) {
      console.log("err");
    }
  }
  //React.useLayoutEffect(() => {}, []);
  return { isFetching };
}
