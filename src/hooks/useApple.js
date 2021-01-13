import React from "react";

import { initialApple } from "./inititalState";

export default () => {
  const [positon, setPositon] = React.useState(initialApple);

  return [positon, setPositon];
};
