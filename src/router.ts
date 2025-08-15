class AppRouter extends HTMLElement {
  currentPage: HTMLElement | null = null;

  connectedCallback() {
    this.navigate("lobby");
    window.addEventListener("navigate", ((e: CustomEvent) => {
      this.navigate(e.detail.page, e.detail.props);
    }) as EventListener);
  }

  navigate(page: string, props: Record<string, any> = {}) {
    if (this.currentPage) {
      this.removeChild(this.currentPage);
    }

    let el: HTMLElement;
    switch (page) {
      case "lobby":
        el = document.createElement("page-lobby");
        break;
      case "level-select":
        el = document.createElement("page-level-select");
        break;
      case "game":
        el = document.createElement("page-game");
        Object.keys(props).forEach((key) => {
          el.setAttribute(key, props[key]);
        });
        break;
      default:
        el = document.createElement("page-lobby");
    }

    this.currentPage = el;
    this.appendChild(el);
  }
}

customElements.define("app-router", AppRouter);
