import React from "react";
import _ from "lodash";

export default ({ snakes }) => {
  return (
    <>
      {snakes.map((snake, index) => (
        <span
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
