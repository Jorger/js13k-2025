class LevelSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>Level Select</nav>
      <h1>Selecciona un nivel</h1>
      <div id="levels"></div>
    `;

    const container = this.querySelector<HTMLDivElement>("#levels");
    if (!container) return;

    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement("button");
      btn.textContent = `Nivel ${i}`;
      btn.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("navigate", {
            detail: { page: "game", params: { level: i } },
          })
        );
      });
      container.appendChild(btn);
    }
  }
}

customElements.define("app-level-select", LevelSelect);
