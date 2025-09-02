import "./styles.css";
import {
  BASE_WIDTH_TILE,
  ECatColor,
  EDirections,
  ETiles,
} from "../../../../utils/constants";
import { detectSwipe } from "../../../../utils/detectSwipe";
import {
  addClass,
  hasClass,
  qs,
  removeClass,
  setHtml,
} from "../../../../utils/helpers";
import {
  Cat,
  CatElemet,
  Level,
  TCatColor,
  Tiles,
} from "../../../../interfaces";
import { calculatePosition, validateMoveCat } from "./helpers";

class GridGame extends HTMLElement {
  private totalCoins = 0;
  private totalCoinCollection = 0;
  private _cats: CatElemet | null = null;
  private level: Level | null = null;
  private size: number = 0;

  set levelData(value: Level) {
    this.level = value;
    this.render();
  }

  // get levelData(): Level | null {
  //   return this.level;
  // }

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
    this.size = Math.round(BASE_WIDTH_TILE / this.level.width);
    this.totalCoins = this.level.tiles.filter(
      (v) => v.type === ETiles.COIN
    ).length;
    // console.log({ size, BASE_WIDTH_TILE });
    const width = this.level.width * this.size;
    const height = this.level.height * this.size;

    setHtml(this, this.renderGrid(width, height));

    console.log("EL NIVEL ES: ", this.level);
    console.log("TOTAL COINS: ", this.totalCoins);

    // alert(this.cats.BLACK)
    // alert(JSON.stringify((qs(this, ".cat-black") as HTMLButtonElement).classList))

    // console.log("valor de this es: ", JSON.stringify(this, null, 2))
    // debugger;

    this._cats = {
      [ECatColor.BLACK]: qs(this, ".cat-black") as HTMLButtonElement,
      [ECatColor.YELLOW]: qs(this, ".cat-yellow") as HTMLButtonElement,
    };

    console.log(qs(this, ".cat-black") as HTMLButtonElement);
    console.log("Los gatos son: ", this._cats);
    console.log("EL VLAOR DE TAMAÑO ES: ", this.size);

    // this._cats[ECatColor.BLACK] = qs(this, ".cat-black") as HTMLButtonElement;
    // this._cats[ECatColor.YELLOW] = qs(this, ".cat-yellow") as HTMLButtonElement;

    [ECatColor.BLACK, ECatColor.YELLOW].forEach((color) => {
      const cat = this._cats?.[color];
      if (cat) {
        detectSwipe(cat, {
          onSwipe: (dir) => this.moveCat(color, dir),
        });

        // $on(cat, "animationend", () => {
        //   console.log("termina la aninación para: ", cat);
        // });
      }
    });
    // detectSwipe(this.cats.BLACK, {
    //   onSwipe: (dir) => {
    //     this.moveCat(ECatColor.BLACK, dir);
    //   },
    // });

    // detectSwipe(this.cats.YELLOW, {
    //   onSwipe: (dir) => {
    //     this.moveCat(ECatColor.YELLOW, dir);
    //   },
    // });
  }

  moveCat(color: TCatColor, dir: EDirections) {
    if (!this.level) return;

    console.log({ color, dir });

    this.level = validateMoveCat(this.level, color, dir);
    this.updateCats();

    // this.updateTiles(this.level.tiles);
    console.log("COMO QUEDA EL NIVEL AHORA");
    console.log(this.level);
    // this.level = newLevel;
    // const cat = this.cats[color];
    // const increase = INCREASE_SWIPE[dir];
    // console.log({ color, dir, cat, increase });
  }


  updateCoins() {
    if(!this.level) return;

    this.level.tiles.filter(v => v.type === ETiles.COIN || v.type === ETiles.KEYS).forEach(tile => {
      const element = qs(this, `#t-${tile.position.x}-${tile.position.y}`) as HTMLElement;

      if (tile.hide && tile.type === ETiles.COIN && !hasClass(element, "coin")) {
        console.log("ANIMAR LA MONEDA")
        addClass(element, "coin");
        this.totalCoinCollection ++;
      }
      // TODO: validar las llaves
    })
  }

  updateBoxes() {
    if(!this.level) return;

    this.level.tiles.filter(v => v.type === ETiles.BOXES).forEach(tile => {
      const element = qs(this, `#t-${tile.position.x}-${tile.position.y}`) as HTMLElement;

      if (tile.hide && !hasClass(element, "explode")) {
        console.log("EXPLOTAR LA CAJA")
        addClass(element, "explode");
      }
    })
  }

  

  updateCats() {
    if(!this.level) return;

    this.level.cats.forEach(async (cat) => {
      const catElemet = this._cats?.[cat.color];

      if (catElemet && cat.move) {
        this.updateCoins();

        addClass(catElemet, "ani");
        const { x, y } = calculatePosition(cat.position, this.size);
        // catElemet.style.transform = `translate(${x}, ${y})`;
        catElemet.style.setProperty("--x", x)
        catElemet.style.setProperty("--y", y)
        catElemet.disabled = true;
        const animations = catElemet.getAnimations().map((a) => a.finished);
        await Promise.allSettled(animations);

        console.log("TERMINA DE HACER LA ANIMACIÓN: ");

        cat.move = false;
        removeClass(catElemet, "ani");
        // Indica que no se mueve el gato
        if(cat.destroy && !this.collectAllCoins()) {
          console.log("DESTRUIR AL GATO, ESTO SIGNIFICA QUE ES GAME OVER!!!");
          addClass(catElemet, 'explode');
        } else {
          catElemet.disabled = false;
        }
        this.valideGameOver()

        this.updateBoxes()
      }
    });
  }


  valideGameOver() {
    if(this.collectAllCoins()) {
      console.log("GAME OVER, LEVEL COMPLETE");
      // TODO: bloquedar a los gatos...
    }
  }

  collectAllCoins() {
    return this.totalCoinCollection === this.totalCoins;
  }

  

  renderGrid(width = 0, height = 0) {
    if (!this.level) return "";

    return /*html*/ `<div class="gg bri" style="--si:${
      this.size
    }px;width:${width}px;height:${height}px">${this.renderTiles(
      this.level.tiles
    )}
    ${this.renderCats(this.level.cats)}
    </div>`;
  }

  renderTiles(tiles: Tiles[]) {
    return tiles
      .map(({ type, position }) => {
        const { x, y } = calculatePosition(position, this.size);
        return /*html*/ `<div ${
          type !== ETiles.BRICK && type !== ETiles.SPIKE ? `id="t-${position.x}-${position.y}"` : ""
        } class="tile tile-${type} ${type === 0 ? "bri" : ""}" style="--si:${
          this.size
        }px;left:${x};top:${y}"></div>`;
      })
      .join("");
  }

  renderCats(cats: Cat[]) {
    return cats
      .map(({ color, position }) => {
        const { x, y } = calculatePosition(position, this.size);
        return /*html*/ `<button class="cat cat-${color.toLowerCase()}" style="--si:${
          this.size
        }px;--x:${x};--y:${y};"></button>`;
      })
      .join("");
  }
}

customElements.define("grid-game", GridGame);
