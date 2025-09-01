import "./styles.css";
import { ETiles } from "../../../../utils/constants";
import { inlineStyles, setHtml } from "../../../../utils/helpers";
import type { Tiles } from "../../../../interfaces";

class CellTile extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    // console.log(this.type);
    // console.log(this.tile);
    // console.log(this.size);
    // setHtml(
    //   this,
    //   /*html*/ `<div class="ti" ${inlineStyles({
    //     width: `${this.size}px`,
    //     height: `${this.size}px`,
    //     border: "1px solid orange",
    //   })}>`
    // );
  }
}

customElements.define("cell-tile", CellTile);
