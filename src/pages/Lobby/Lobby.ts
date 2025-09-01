class Lobby extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>Lobby</nav>
      <h1>Bienvenido al Lobby</h1>
      <button id="start">Ir a seleccionar nivel</button>
    `;

    const startBtn = this.querySelector<HTMLButtonElement>("#start");
    startBtn?.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", {
          detail: { page: "level-select" },
        })
      );
    });
  }
}

customElements.define("app-lobby", Lobby);
