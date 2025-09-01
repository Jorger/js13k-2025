import "./global.css";
import "./pages/Game/Game";
import "./pages/LevelSelect/LevelSelect";
import "./pages/Lobby/Lobby";
import "./router";
import "./utils/cssVariables";
import "./pages/Game/components/grid";
// import "./pages/Game/components/title";
import { ROUTER_NAME } from "./utils/constants";

// Inicializa en Lobby
document.body.innerHTML = `<${ROUTER_NAME} class='df jc ai'></${ROUTER_NAME}>`;
