class LevelSelectPage extends HTMLElement {
  template: HTMLTemplateElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement("template");
    this.render()
    this.shadowRoot!.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    this.template.innerHTML = /*html*/ `
    <style>
      @import "./styles.css";
      </style>
      <h1>Selecciona un nivel</h1>
      <button data-level="1">Nivel 1</button>
      <button data-level="2">Nivel 2</button>`;
  }

  connectedCallback() {
    this.shadowRoot!.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level');
        window.dispatchEvent(new CustomEvent('navigate', {
          detail: { page: 'game', props: { level } }
        }));
      });
    });
  }
}

customElements.define('page-level-select', LevelSelectPage);
