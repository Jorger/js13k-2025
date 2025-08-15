class GamePage extends HTMLElement {
  template: HTMLTemplateElement;
  level: string | null = null;
  value: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement("template");
    this.value = 0;
    this.render()
    this.shadowRoot!.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    this.template.innerHTML = /*html*/ `
    <style>
      @import "./styles.css";
    </style>
    <h1 id="title">Game</h1>
    <button id="back">Volver al Lobby</button>
    <button id="restart">Reiniciar</button>
    <button id="counter">0</button>`;
  }

  static get observedAttributes() {
    return ['level'];
  }

  attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
    if (name === 'level') {
      this.level = newVal;
      this.updateTitle();
    }
  }

  async connectedCallback() {
    this.shadowRoot!.querySelector('#back')!.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'lobby' } }));
    });

    this.shadowRoot!.querySelector('#restart')!.addEventListener('click', () => {
      // Reinicia la misma página con el mismo nivel
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'game', props: { level: this.level } } }));
    });


    const counterButton = this.shadowRoot!.querySelector('#counter');

    counterButton!.addEventListener('click', () => {
      this.value++;
      counterButton!.textContent = `${this.value}`;
    });


    this.updateTitle();
  }

  updateTitle() {
    if (this.level) {
      this.shadowRoot!.querySelector('#title')!.textContent = `Game - Nivel ${this.level}`;
    }
  }
}

customElements.define('page-game', GamePage);
