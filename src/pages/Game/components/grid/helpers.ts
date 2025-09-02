import { cloneDeep } from "../../../../utils/helpers";
import { ECatColor, EDirections, ETiles, INCREASE_SWIPE } from "../../../../utils/constants";
import type {
  Cat,
  coordinate,
  Level,
  TCatColor,
  Tiles,
} from "../../../../interfaces";

/**
 * Para saber si una coordenada está dentro dle board del juego
 * @param position
 * @param width
 * @param height
 * @returns
 */
const insideBoard = (position: coordinate, width = 0, height = 0) => {
  const { x, y } = position;
  return x >= 0 && x < width && y >= 0 && y < height;
};

/**
 * Dada la posisción, devuleve el tipo de tile que exista, pueden ser máximo dos
 * por ejemplo spikes y encima una caja
 * @param tiles
 * @param position
 * @returns
 */
const getTilePosition = (tiles: Tiles[], position: coordinate) => {
  const { x, y } = position;
  return tiles.filter((v) => v.position.x === x && v.position.y === y);
};

/**
 * Valida si en la posición dada existe un gato
 * @param cats
 * @param position
 * @returns
 */
const getCatPosition = (cats: Cat[], position: coordinate) => {
  const { x, y } = position;
  return cats.find((v) => v.position.x === x && v.position.y === y);
};

/**
 * devuelve la posición final que se mostrará en elemento en el board...
 * @param position
 * @param size
 * @returns
 */
export const calculatePosition = (position: coordinate, size = 0) => ({
  x: `${position.x * size}px`,
  y: `${position.y * size}px`,
});

export const validateMoveCat = (
  level: Level,
  catColor: TCatColor,
  dir: EDirections,
) => {
  const copyLevel = cloneDeep(level);
  const { width, height, cats, tiles } = copyLevel;
  const increase = INCREASE_SWIPE[dir];
  let catMove = 0;


  console.log("en validateMoveCat")
  console.log({level, catColor, dir});

  console.log("increase: ", increase)
  console.log("VALOR DE LA CONSTANTE ES: ", INCREASE_SWIPE)

  /**
   * El gato que se va a mover...
   */
  const indexCat = cats.findIndex((v) => v.color === catColor);
  /**
   * El gato opuesto
   */
  // const oppositeCat = cats.find(
  //   (v) =>
  //     v.color ===
  //     (catColor === ECatColor.BLACK ? ECatColor.YELLOW : ECatColor.BLACK)
  // );

  console.log("indexCat: ", { indexCat });

  if (indexCat >= 0) {
    // const { position } = cat;
    // const newPosition = cloneDeep(cat.position);

    // // DO
    // newPosition.x += increase.x;
    // newPosition.y += increase.y;

    do {
      // debugger;
      const newPosition = {
        x: copyLevel.cats[indexCat].position.x + increase.x,
        y: copyLevel.cats[indexCat].position.y + increase.y,
      };

      const isCatDestroy = copyLevel.cats[indexCat]?.destroy ?? false;

      console.log({isCatDestroy})

      console.log("newPosition: ", newPosition);

      if (!isCatDestroy && insideBoard(newPosition, width, height)) {
        const tilePosition = getTilePosition(tiles, newPosition);
        const catPosition = getCatPosition(cats, newPosition);

        console.log({ tilePosition, catPosition });


        if(catPosition) {
          console.log("hay un gato en esa posición");
          break;
        }

        // Hay un title en esa posición...
        if (tilePosition.length !== 0) {
          // Se extrae el valor del tile
          const typeTile = tilePosition[0].type;
          const isBox = typeTile === ETiles.BOXES;
          const isHide = tilePosition[0]?.hide ?? false;
          console.log({ typeTile });

          if (tilePosition.length === 2) {
            // const typeTileTwo = tilePosition[1].type;
            const tileBox = isBox ? tilePosition[0] : tilePosition[1];
            const otherTile = isBox ? tilePosition[1] : tilePosition[0];

            if (!tileBox.hide && catMove === 0) {
              console.log("HAY UNA CAJA Y NO SE HA MOVIDO LO SUFICENTE");
              break;
            } else if (!tileBox.hide) {
              // tileBox.hide = true;
              tileBox.hide = true;
              // tileBox.delay = catMove;
              console.log("MUESTRA LA CAJA CUANDO HAY DOS");
              break;
            } else if (otherTile.type === ETiles.SPIKE) {
              console.log("EL TILE ESTÁ LIBRE 03, pero es un spike");
              copyLevel.cats[indexCat].position = newPosition;
              copyLevel.cats[indexCat].destroy = true;
              catMove++;
            }
          } else {
            /**
             * Como hay un ladrillo, se detiene y no se mueve más...
             */
            if (typeTile === ETiles.BRICK) {
              console.log("hay un ladrillo");
              break;
            } else {
              if (
                !isHide &&
                typeTile === ETiles.COIN &&
                catColor === ECatColor.YELLOW
              ) {
                tilePosition[0].hide = true;
                // tilePosition[0].delay = catMove;
              }

              if (!isHide && typeTile === ETiles.BOXES) {
                if (catMove >= 1) {
                  console.log("HAY UNA CAJA Y NO SE HA MOVIDO LO SUFICENTE 01");
                  // tilePosition[0].hide = true;
                  tilePosition[0].hide = true;
                  // tilePosition[0].delay = catMove;
                }
                break;
              }

              if (!isHide && typeTile === ETiles.SPIKE) {
                copyLevel.cats[indexCat].destroy = true;
              }

              // if(typeTile === ETiles.KEYS && catColor === ECatColor.BLACK) {
              //   tilePosition[0].hide = true;
              //   tilePosition[0].delay = 3
              // }

              console.log("EL TILE ESTÁ LIBRE 02");
              copyLevel.cats[indexCat].position = newPosition;
              catMove++;
            }
          }
        } else {
          console.log("EL TILE ESTÁ LIBRE");
          copyLevel.cats[indexCat].position = newPosition;
          catMove++;
          // if (catPosition) {
          //   console.log("hay un gato en esa posición");
          //   break;
          // } else {
          //   console.log("EL TILE ESTÁ LIBRE");
          //   copyLevel.cats[indexCat].position = newPosition;
          //   catMove++;

          //   // if (catMove >= 10) {
          //   //   console.log("EVIATA CICLOC INFINITO");
          //   //   break;
          //   // }
          //   // copyLevel.cats[indexCat].position.x = newPosition.x;
          //   // copyLevel.cats[indexCat].position.x = newPosition.y;
          //   // copyLevel.cats[indexCat].position.x = newPosition.y;
          // }
        }
      } else {
        console.log("SE SALIÓ DLE BOARD o el gato está destruído");
        break;
      }
    } while (1);

    console.log("TOTAL MOVE: ", catMove);
    console.log("level: ", copyLevel);


    // move

    // else {
    //   break
    // }

    // do {

    // } while(1)
  }

  copyLevel.cats[indexCat].move = catMove >= 1;

  return copyLevel;
};
