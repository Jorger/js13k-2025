import "./global.css";
import "./pages/Game/components/grid";
import "./pages/Game/Game";
import "./pages/LevelSelect/LevelSelect";
import "./pages/Lobby/Lobby";
import "./router";
import "./utils/cssVariables";
import { ROUTER_COMPONENT } from "./utils/constants";

document.body.innerHTML = `<${ROUTER_COMPONENT.ROUTER} class='df jc ai'></${ROUTER_COMPONENT.ROUTER}>`;
