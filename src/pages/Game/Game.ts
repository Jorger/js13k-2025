// import "./styles.css";
import { setHtml } from "../../utils/helpers";
import { getLevel } from "../../levels";
import { Level } from "../../interfaces";
// import template from "./template.html?raw";

class Game extends HTMLElement {
  static get observedAttributes() {
    return ["level"];
  }

  private level: number = 0;
  private gameSate: Level | null = null;

  // attributeChangedCallback(name: string, _: string, newValue: string) {
  //   if (name === "level") {
  //     this.level = parseInt(newValue, 10) || 0;
  //     this.render();
  //   }
  // }

  connectedCallback() {
    const attrLevel = this.getAttribute("level");
    this.level = attrLevel ? parseInt(attrLevel, 10) : 0;
    this.render();
  }

  private render() {
    // console.log(this.level);
    // this.gameSate = getLevel(this.level);
    this.gameSate = getLevel(6);

    console.log(this.gameSate);

    // size="20"
    setHtml(
      this,
      /*html*/ `<div class="df jc ai wi he"><grid-game></grid-game></div>`
    );

    const grid = this.querySelector("grid-game") as any;

    if (grid) {
      grid.levelData = this.gameSate;
    }

    // const backBtn = this.querySelector<HTMLButtonElement>("#back");
    // backBtn?.addEventListener("click", () => {
    //   window.dispatchEvent(
    //     new CustomEvent("navigate", {
    //       detail: { page: "level-select" },
    //     })
    //   );
    // });
  }
}

customElements.define("app-game", Game);

/*

*/

// const nextBtn = document.createElement("button");
// nextBtn.textContent = "Siguiente nivel";
// nextBtn.addEventListener("click", () => {
//   this.level++;
//   this.gameSate = getLevel(this.level);

//   const grid = this.querySelector("grid-game") as any;
//   if (grid) {
//     grid.levelData = this.gameSate; // 👈 se vuelve a disparar render() en GridGame
//   }
// });

// this.appendChild(nextBtn);
