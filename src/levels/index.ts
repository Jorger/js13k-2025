import { Cat, Level, Tiles } from "../interfaces";
import { ECatColor, ETiles } from "../utils/constants";
import LEVELS from "./LEVELS";

export const getTotalLevels = () => LEVELS.length;

export const getLevel = (level = 0) => convertLevel(LEVELS[level]);

const convertLevel = (stringLevel = ""): Level => {
  const [dimensiones = "", cats = "", tiles = ""] = stringLevel.split("#");
  const [w, h] = dimensiones.split(",");
  const [black, yellow] = cats.split(";");
  const listTiles = tiles.split(";");
  const ETilesKeys = Object.keys(ETiles);
  const newCats: Cat[] = [];
  const blackPos = black.split(",");
  const yellowPos = yellow.split(",");

  newCats.push(
    {
      color: ECatColor.BLACK,
      position: { x: +blackPos[0], y: +blackPos[1] },
    },
    {
      color: ECatColor.YELLOW,
      position: { x: +yellowPos[0], y: +yellowPos[1] },
    }
  );

  const newTiles: Tiles[] = listTiles.map((value) => {
    const [t, x, y] = value.split(",");
    return {
      type: +ETilesKeys[+t] as ETiles,
      position: { x: +x, y: +y },
    };
  });

  return {
    width: +w,
    height: +h,
    cats: newCats,
    tiles: getTiles(+w, +h, newTiles),
  };
};

const getTiles = (width = 0, height = 0, tiles: Tiles[]) => {
  const newTiles: Tiles[] = [];

  for (let y = 0; y < height; y++) {
    // for (let x = 0; x < width; x++) {
    for (let x = width - 1; x >= 0; x--) {
      const existTile = tiles.find(
        (v) => v.position.x === x && v.position.y === y
      );

      if (
        y === 0 ||
        y === height - 1 ||
        x === 0 ||
        x === width - 1 ||
        existTile
      ) {
        newTiles.push({
          type: existTile?.type || ETiles.BRICK,
          position: { x, y },
        });
      }
    }
  }

  return newTiles;
};
