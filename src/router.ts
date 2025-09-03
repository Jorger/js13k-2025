import { BASE_HEIGHT, BASE_WIDTH, ROUTER_NAME } from "./utils/constants";

type NavigateDetail = {
  page: string;
  params?: Record<string, any>;
};

class AppRouter extends HTMLElement {
  private currentPage: HTMLElement | null = null;

  connectedCallback() {
    this.navigate("lobby"); // Página por defecto

    window.addEventListener("navigate", (e: Event) => {
      const customEvent = e as CustomEvent<NavigateDetail>;
      this.navigate(customEvent.detail.page, customEvent.detail.params);
    });


    document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
    window.addEventListener("resize", () => this.applyZoom());
    this.applyZoom();
  }

  applyZoom() {
    const zoomX = window.innerWidth / BASE_WIDTH;
    const zoomY = window.innerHeight / BASE_HEIGHT;
    const zoom = Math.min(zoomX, zoomY);

    // Apply zoom directly
    this.style.zoom = `${zoom}`;
  }

  private navigate(page: string, params: Record<string, any> = {}) {
    if (this.currentPage) {
      this.removeChild(this.currentPage);
    }

    let element: HTMLElement;

    switch (page) {
      case "lobby":
        element = document.createElement("app-lobby");
        break;
      case "level-select":
        element = document.createElement("app-level-select");
        break;
      case "game":
        element = document.createElement("app-game");
        if (params.level) {
          element.setAttribute("level", String(params.level));
        }
        break;
      default:
        element = document.createElement("app-lobby");
    }

    this.appendChild(element);
    this.currentPage = element;
  }
}

customElements.define(ROUTER_NAME, AppRouter);
