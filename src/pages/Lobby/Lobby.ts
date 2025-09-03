import "./styles.css";
import { $on, qs, setHtml } from "../../utils/helpers";
import { getTotalLevels } from "../../levels";
import template from "./template.html?raw";

const TOTAL_LEVELS = getTotalLevels();

class Lobby extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    const startBtn = qs(this, "button") as HTMLElement;
    const labelLevel = qs(this, '.lob-l span') as HTMLElement;
    // TODO: leer valor de localStorage
    const completedLevel = 1;
    setHtml(labelLevel, `${completedLevel}/${TOTAL_LEVELS}`);

    $on(startBtn, "click", () => 
      window.dispatchEvent(
        new CustomEvent("navigate", {
          detail: { page: "level-select" },
        })
      )
    );
  }
}

customElements.define("app-lobby", Lobby);
