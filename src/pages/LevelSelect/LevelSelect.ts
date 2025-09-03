import "./styles.css";
import { getTotalLevels } from "../../levels";
import { $on, qs, qsa, setHtml } from "../../utils/helpers";
import template from "./template.html?raw";

const TOTAL_LEVELS = getTotalLevels();
// const TOTAL_LEVELS = 40

class LevelSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;

    const container = qs(this, ".pag-c") as HTMLElement;
    // console.log(container)
    setHtml(container, this.renderLevels());

    qsa(this, ".button").forEach((button) => {
      const numLevel = +button.textContent;
      $on(button as HTMLElement, "click", () => {
        console.log(numLevel);
        window.dispatchEvent(
          new CustomEvent("navigate", {
            detail: { page: "game", params: { level: numLevel - 1 } },
          })
        );
      });
    });
  }

  renderLevels() {
    return new Array(TOTAL_LEVELS)
      .fill(null)
      .map(
        (_, index) =>
          /*html*/ `<button class="button df jc ai">${index + 1}</button>`
      )
      .join("");
  }
}

customElements.define("app-level-select", LevelSelect);
