import { ECatColor, ETiles } from "../utils/constants";

export type TCatColor = keyof typeof ECatColor;
export type SwipeDirection = "up" | "down" | "left" | "right" | null;
// export type TETiles = keyof typeof ETiles;

export interface coordinate {
  x: number;
  y: number;
}

export interface Cat {
  color: TCatColor;
  position: coordinate;
}

export interface Tiles {
  type: ETiles;
  position: coordinate;
}

export interface Level {
  width: number;
  height: number;
  cats: Cat[];
  tiles: Tiles[];
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
