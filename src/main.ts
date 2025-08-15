// import "./components/GameRoot";

// if (import.meta.hot) {
//   import.meta.hot.accept(() => {
//     // HMR placeholder – Vite handles module updates live
//   });
// }

// import './styles/global.css';
// import './components/GameRoot';
// import './components/TicTacToe';
// import './components/CellTile';


import './router';
import './pages/Lobby/Lobby';
import './pages/LevelSelect/LevelSelect';
import './pages/Game/Game';

// Inicializa en Lobby
document.body.innerHTML = `<app-router></app-router>`;

