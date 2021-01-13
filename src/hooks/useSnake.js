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
      continue: true,
      apple: initialApple,
    };
  }
  const snakes = [...state.snakes];
  const apple = { ...state.apple };
  const header = snakes[0];
  let con = true;

  _.forEach(_.tail(Array.from(snakes)), (snake) => {
    if (header.x === snake.x && header.y === snake.y) {
      console.log("opps");
      con = false;
    }
  });
  if (con) {
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
  return { ...state, snakes: snakes, continue: con, apple: apple };
}

export default () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [state, dispath] = React.useReducer(reducer, {
    snakes: initialSnake,
    apple: initialApple,
    continue: isRunning,
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
      if (!state.continue) {
        clearInterval(run);
        setReset(false);
        setIsRunning(false);
        return;
      }
      if (prevDir.x === dir.x || prevDir.y === dir.y) {
        dispath(prevDir);
        return;
      }
      setPrevDir(dir);
      dispath(dir);
    }, 40); // 40 - 65 - 100

    return () => clearInterval(run);
  }, [state]);

  React.useEffect(() => {
    console.log("is running");
    if (isRunning) {
      window.addEventListener("keydown", keydownEvent);
      dispath(dir);
    }
    return () => window.removeEventListener("keydown", keydownEvent);
  }, [isRunning]);

  React.useEffect(() => {
    console.log("reset");
    if (reset) {
      window.addEventListener("keydown", keydownEvent);
      dispath("init");
      setDir(RIGHT);
    }
    return () => window.removeEventListener("keydown", keydownEvent);
  }, [reset]);

  // React.useEffect(() => {
  //   console.log("add event");
  //   console.log("isRunning, ", isRunning);
  //   window.addEventListener("keydown", keydownEvent);
  // }, []);

  return [state.snakes, state.apple, state.continue, setIsRunning, setReset];
};
