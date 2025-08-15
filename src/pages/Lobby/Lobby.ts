class LobbyPage extends HTMLElement {
  template: HTMLTemplateElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.render()

    this.shadowRoot!.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    this.template.innerHTML = /*html*/ `
    <style>#toSelect {
      color: red;
    }</style>
    <h1>Lobby</h1>
    <button id="toSelect">Ir a selección de niveles</button>`;
  }

  connectedCallback() {
    this.shadowRoot!.querySelector("#toSelect")!.addEventListener(
      "click",
      () => {
        window.dispatchEvent(
          new CustomEvent("navigate", { detail: { page: "level-select" } })
        );
      }
    );
  }
}

customElements.define("page-lobby", LobbyPage);
