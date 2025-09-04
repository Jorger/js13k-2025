import { getLevel, getTotalLevels } from "../../levels";
import { GridActionEvent, Level } from "../../interfaces";
import { navigate } from "../../utils/navigate";
import { setHtml } from "../../utils/helpers";
import {
  GAME_LABEL_ATTRIBUTE,
  HANDLE_GRID_ACTION,
  ROUTER_COMPONENT,
} from "../../utils/constants";
import Alert from "../../components/alert";
import ButtonGame from "../../components/button";

// Total de niveles disponibles en el juego
const TOTAL_LEVELS = getTotalLevels();

class Game extends HTMLElement {
  static get observedAttributes() {
    return [GAME_LABEL_ATTRIBUTE];
  }

  private level: number = 0; // Nivel actual
  private gameSate: Level | null = null;

  connectedCallback() {
    // Obtener el atributo "level" definido en el HTML (ej. <app-game level="1">)
    const attrLevel = this.getAttribute(GAME_LABEL_ATTRIBUTE);
    this.level = attrLevel ? parseInt(attrLevel, 10) : 0;

    this.render();
  }

  /**
   * Renderiza el componente principal del juego
   * - Botón de volver
   * - Botón de reinicio
   * - Grid principal
   * - Alertas (UI de feedback)
   */
  private render() {
    // Cargar datos del nivel actual
    this.gameSate = getLevel(this.level);

    // Crear botones con sus callbacks
    const backButton = new ButtonGame("back", "Back", () => navigate());
    const restartButton = new ButtonGame("restart", "Restart", () => {
      grid.levelData = { level: this.gameSate, levelNumber: this.level };
    });

    // Renderizar estructura HTML del juego
    setHtml(
      this,
      /*html*/ `<div class="df jc ai wi he">${backButton.render()}${restartButton.render()}<${
        ROUTER_COMPONENT.GRID
      }></${ROUTER_COMPONENT.GRID}>${Alert.render()}</div>`
    );

    // Seleccionar el componente grid
    const grid = this.querySelector(ROUTER_COMPONENT.GRID) as any;

    // Inicializar eventos de botones y alertas
    Alert.events();
    backButton.event();
    restartButton.event();

    // Cargar el nivel en el grid
    if (grid) {
      grid.levelData = { level: this.gameSate, levelNumber: this.level };
    }

    /**
     * Evento principal que escucha acciones en el grid
     * HANDLE_GRID_ACTION se dispara cuando:
     * - Se completa un nivel
     * - El jugador pierde (spikes)
     * - Se reinicia por explosión
     */
    this.addEventListener(HANDLE_GRID_ACTION, (e: Event) => {
      const customEvent = e as GridActionEvent;
      const { success, isExplode } = customEvent.detail;

      if (!success) {
        // Si no tuvo éxito (ej. cayó en spikes) → volver al menú
        navigate();
      } else {
        if (isExplode) {
          // Si explotó → reiniciar nivel
          grid.levelData = { level: this.gameSate, levelNumber: this.level };
        } else {
          // Si completó el nivel → pasar al siguiente
          const nextLevel = this.level + 1;

          if (nextLevel >= 0 && nextLevel < TOTAL_LEVELS) {
            this.level = nextLevel;
            this.gameSate = getLevel(this.level);
            grid.levelData = { level: this.gameSate, levelNumber: this.level };
          } else {
            // Si no hay más niveles → volver al menú
            navigate();
          }
        }
      }
    });
  }
}

customElements.define(ROUTER_COMPONENT.GAME, Game);
