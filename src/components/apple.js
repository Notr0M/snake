import React from "react";

export default React.memo(({ position }) => {
  console.log("apple");
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "16px",
        width: "30px",
        height: "30px",
        left: `${position.x * 30}px`,
        top: `${position.y * -30}px`,
        backgroundColor: "green",
      }}
    ></div>
  );
});
