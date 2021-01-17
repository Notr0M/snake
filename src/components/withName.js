import React from "react";

export const withName = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};
