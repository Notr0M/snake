import React from "react";

export default ({ position: { x, y } }) => {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "16px",
        width: "30px",
        height: "30px",
        left: `${x * 30}px`,
        top: `${y * -30}px`,
        backgroundColor: "green",
      }}
    ></div>
  );
};
