import { ECatColor, ETiles } from "../utils/constants";

export type TCatColor = keyof typeof ECatColor;
// export type SwipeDirection = keyof typeof EDirections;
// export type TETiles = keyof typeof ETiles;

export interface coordinate {
  x: number;
  y: number;
}

export interface Cat {
  color: TCatColor;
  position: coordinate;
  move?: boolean;
  destroy?: boolean;
}

export type CatElemet = Record<TCatColor, HTMLButtonElement | null>;

// export type IIncreaseValue = Record<SwipeDirection, coordinate>;

export interface Tiles {
  type: ETiles;
  position: coordinate;
  delay?: number;
  hide?: boolean;
  open?: boolean;
  destroy?: boolean;
}

export interface Level {
  width: number;
  height: number;
  cats: Cat[];
  tiles: Tiles[];
}

export interface IBoardKeys {
  total: number;
  collected: number;
}

// const tem: Level = {
//   size: 30,
//   cats: [
//     {
//       color: "YELLOW",
//       position: {
//         x: 4,
//         y: 2
//       }
//     },
//     {
//       color: "BLACK",
//       position: {
//         x: 2,
//         y: 2
//       }
//     }
//   ],
//   tiles: []
// }
