import "./styles.css";
import { qs, setHtml } from "../../../../utils/helpers";
import { Cat, Level, Tiles } from "../../../../interfaces";
import { BASE_WIDTH_TILE } from "../../../../utils/constants";
import { detectSwipe } from "../../../../utils/detectSwipe";

class GridGame extends HTMLElement {
  private level: Level | null = null;

  set levelData(value: Level) {
    this.level = value;
    this.render();
  }

  get levelData(): Level | null {
    return this.level;
  }

  // static get observedAttributes() {
  //   return ["level"];
  // }

  // private level: Level | null = null;

  // attributeChangedCallback(name: string, _: string, newValue: string) {
  //   if (name === "level") {
  //     console.log("newValue: ", newValue);
  //     // this.level = JSON.parse(newValue) as Level;
  //     this.render();
  //   }
  // }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.level) return;
    // console.log("EL NIVEL ACÁ llega JORGE: ", this.level);
    const size = Math.round(BASE_WIDTH_TILE / this.level.width);
    // console.log({ size, BASE_WIDTH_TILE });
    const width = this.level.width * size;
    const height = this.level.height * size;

    setHtml(this, this.renderGrid(size, width, height));

    console.log("EL NIVEL ES: ", this.level);

    const blackCat = qs(this, ".cat-black") as HTMLElement;
    const yellowCat = qs(this, ".cat-yellow") as HTMLElement;

    console.log(blackCat);
    console.log(yellowCat);

    if (blackCat && yellowCat) {
      detectSwipe(blackCat, {
        onSwipe: (dir) => {
          console.log("Swipe detectado:", dir);
          // alert(dir);
        },
      });

      detectSwipe(yellowCat, {
        onSwipe: (dir) => {
          console.log("Swipe detectado:", dir);
          // alert(dir);
        },
      });
    }
  }

  renderGrid(size = 0, width = 0, height = 0) {
    if (!this.level) return "";

    return /*html*/ `<div class="gg bri" style="--si:${size}px;width:${width}px;height:${height}px">${this.renderTiles(
      this.level.tiles,
      size
    )}
    ${this.renderCats(this.level.cats, size)}
    </div>`;
  }

  renderTiles(tiles: Tiles[], size = 0) {
    return tiles
      .map(
        ({ type, position }) =>
          /*html*/ `<div class="tile tile-${type} ${
            type === 0 ? "bri" : ""
          }" style="--si:${size}px;left:${position.x * size}px;top:${
            position.y * size
          }px"></div>`
      )
      .join("");
  }

  renderCats(cats: Cat[], size = 0) {
    console.log("los gatos: ", cats);

    return cats
      .map(({ color, position }) => {
        return /*html*/ `<button class="cat cat-${color.toLowerCase()}" style="--si:${size}px;left:${
          position.x * size
        }px;top:${position.y * size}px"></button>`;
      })
      .join("");
  }
}

customElements.define("grid-game", GridGame);
