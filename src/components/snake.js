import React from "react";

export default ({ snakes }) => {
  return (
    <>
      {snakes.map((snake, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            borderRadius: "16px",
            width: "30px",
            height: "30px",
            left: `${snake.x * 30}px`,
            top: `${snake.y * -30}px`,
            backgroundColor: "black",
          }}
        />
      ))}
    </>
  );
};
