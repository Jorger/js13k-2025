// import { IIncreaseValue } from "../interfaces";

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 732;
export const PADDING_SIZE = 50;
export const BASE_WIDTH_TILE = BASE_WIDTH - PADDING_SIZE;
export const ROUTER_NAME = "a-r";
export const CAT_SPEED = 50;

export enum ECatColor {
  BLACK = "BLACK",
  YELLOW = "YELLOW",
}

export enum ETiles {
  BRICK,
  COIN,
  SPIKE,
  KEYS,
  GATES,
  BOXES,
}

export enum EDirections {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export const INCREASE_SWIPE = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

// export const ROUTER = {
//   LOBBY: "lobby",
//   LEVEL_SELECT: "level-select",
//   GAME: "game",
// };
