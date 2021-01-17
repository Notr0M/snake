import React, { useState, useCallback } from "react";
import { Button, Icon } from "semantic-ui-react";

import useSnake from "hooks/useSnake.js";
import useApple from "hooks/useApple.js";

import Snake from "./snake.js";
import Apple from "./apple.js";

const initSnake = [{ x: 1, y: 0 }];
const initApple = { x: 5, y: 0 };

export default ({ setScore, status, speed, setStatus }) => {
  const [snakes, position] = useSnake(initSnake, status, setStatus, speed);
  React.useEffect(() => {
    if (snakes.length > 1)
      setScore((prev) => prev + Math.floor(Math.random() * (16 - 10) + 10));
  }, [snakes.length]);

  return (
    <div
      style={{
        margin: "auto",
        position: "relative",
        borderRadius: 6,
        border: "3px solid #808080",
        marginTop: "20px",
        backgroundColor: "#F5F5DC",
        textAlign: "center",
        width: "600px",
        height: "300px",
      }}
    >
      <Snake snakes={snakes} />
      <Apple position={position} />
    </div>
  );
};
