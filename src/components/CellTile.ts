export class CellTile extends HTMLElement {
  value: string = "";

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/`
      <style>
        .cell {
          width: 100px;
          height: 100px;
          background: #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          cursor: pointer;
          user-select: none;
        }
      </style>
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
