import styles from "./cellTile.styles";

export class CellTile extends HTMLElement {
  value: string = "";

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      ${styles}
      <div class="cell"></div>
    `;
  }

  setValue(val: string) {
    this.value = val;
    const cellEl = this.shadowRoot!.querySelector(".cell")!;
    cellEl.textContent = val;
  }
}

customElements.define("cell-tile", CellTile);
