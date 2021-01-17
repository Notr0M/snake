import React, { useState } from "react";

export default (initApple) => {
  const [apple, setApple] = useState(initApple);

  return [apple, setApple];
};
