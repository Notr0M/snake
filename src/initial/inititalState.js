const UP = { x: 0, y: 1 },
  DOWN = { x: 0, y: -1 },
  LEFT = { x: -1, y: 0 },
  RIGHT = { x: 1, y: 0 };

export { UP, DOWN, LEFT, RIGHT };

export const initialSnake = [{ x: 1, y: 0 }];

export const initialApple = {
  x: 3, // 0 -> 19
  y: -3, // 0 -> -9
};
