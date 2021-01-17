import React from "react";
import { Button, Icon } from "semantic-ui-react";

import Snake from "./snake.js";
import Apple from "./apple.js";

export default ({ snakes, position, setIsRunning, isRunning, setReset }) => {
  const [timer, setTimer] = React.useState(4);
  const [func, setFunc] = React.useState(null);
  const action = (type) => {
    setFunc(type);
    const temp = setInterval(() => {
      setTimer((state) => {
        if (state === 1) {
          clearInterval(temp);
          return 0;
        }
        return state - 1;
      });
    }, 1000);
  };
  React.useEffect(() => {
    if (timer === 0) {
      func(true);
      setTimer(5);
    }
  }, [timer]);
  let toggle = timer > 3 || timer === 0;
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
      <div
        hidden={isRunning}
        style={{ marginTop: "20%", left: "46%", position: "absolute" }}
      >
        {snakes.length > 1 ? (
          <Button
            disabled={!toggle}
            icon
            size="huge"
            onClick={() => action(() => setReset)}
          >
            {toggle ? <Icon name="redo" /> : timer}
          </Button>
        ) : (
          <Button
            disabled={!toggle}
            icon
            size="huge"
            onClick={() => action(() => setIsRunning)}
          >
            {toggle ? <Icon name="play" /> : timer}
          </Button>
        )}
      </div>
    </div>
  );
};
