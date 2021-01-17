import React from "react";
import _ from "lodash";

import {
  initialSnake,
  initialApple,
  UP,
  DOWN,
  LEFT,
  RIGHT,
} from "initial/inititalState";

function reducer(state, action) {
  if (action === "init") {
    return {
      ...state,
      snakes: [...initialSnake],
      status: "running",
      apple: initialApple,
    };
  }
  const snakes = [...state.snakes];
  const apple = { ...state.apple };
  const header = snakes[0];
  let status = "running";

  _.forEach(_.tail(Array.from(snakes)), (snake) => {
    if (header.x === snake.x && header.y === snake.y) {
      console.log("opps");
      status = "failed";
    }
  });
  if (status === "running") {
    for (let count = snakes.length - 1; count > -1; --count) {
      if (count === 0) {
        snakes[count].x += action.x;
        snakes[count].y += action.y;
      } else {
        snakes[count].x = snakes[count - 1].x;
        snakes[count].y = snakes[count - 1].y;
      }
    }

    if (snakes[0].x === 20) {
      snakes[0].x = 0;
    }
    if (snakes[0].x === -1) {
      snakes[0].x = 19;
    }
    if (snakes[0].y === -10) {
      snakes[0].y = 0;
    }
    if (snakes[0].y === 1) {
      snakes[0].y = -9;
    }

    if (_.first(snakes).x === apple.x && _.first(snakes).y === apple.y) {
      snakes.push(apple);

      apple.x = _.random(19);
      apple.y = _.random(-9);
    }
  }
  return { ...state, snakes: snakes, status: status, apple: apple };
}

export default (initSnake, status, setStatus, speed) => {
  const [state, dispath] = React.useReducer(reducer, {
    snakes: initSnake,
    apple: initialApple,
    status: status,
  });

  const [dir, setDir] = React.useState(RIGHT);

  const [prevDir, setPrevDir] = React.useState(""); // temp

  const keydownEvent = ({ key }) => {
    switch (key.toLowerCase()) {
      case "d":
        setDir(RIGHT);
        return;
      case "s":
        setDir(DOWN);
        return;
      case "w":
        setDir(UP);
        return;
      case "a":
        setDir(LEFT);
        return;
      default:
        return;
    }
  };

  // check performance here
  React.useEffect(() => {
    const run = setInterval(() => {
      if (state.status === "failed") {
        clearInterval(run);
        setStatus("failed");
        return;
      }
      if (status === "init") {
        setStatus("running");
        return;
      }
      if (state.status === "paused" || status === "paused") {
        clearInterval(run);
        setStatus("paused");
        return;
      }
      if (state.status === "idle" || status === "idle") {
        clearInterval(run);
        setStatus("idle");
        return;
      }
      if (prevDir.x === dir.x || prevDir.y === dir.y) {
        dispath(prevDir);
        return;
      }

      setPrevDir(dir);
      dispath(dir);
    }, speed); // 40 - 65 - 100

    return () => clearInterval(run);
  }, [state]);

  React.useEffect(() => {
    console.log(status);
    if (status === "running") {
      window.addEventListener("keydown", keydownEvent);
      dispath(dir);
    }
    if (status === "init") {
      window.addEventListener("keydown", keydownEvent);

      dispath("init");
      setDir(RIGHT);
    }

    return () => window.removeEventListener("keydown", keydownEvent);
  }, [status]);

  return [state.snakes, state.apple];
};
