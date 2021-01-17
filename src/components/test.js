import React, { useEffect, useState } from "react";

export default function MyComponent({ random }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, random);
  }, [count]);

  return (
    <div>
      <p>random is {random}</p>
      <p>Count is {count}</p>
    </div>
  );
}
