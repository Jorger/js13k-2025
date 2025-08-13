export class GameRoot extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*css*/ `
      <style>
        :host {
          display: block;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
      </style>
      <tic-tac-toe></tic-tac-toe>
    `;
  }
}

customElements.define("game-root", GameRoot);
