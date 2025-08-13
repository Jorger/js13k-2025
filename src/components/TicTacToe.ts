export class TicTacToe extends HTMLElement {
  board: string[];
  currentPlayer: string;

  constructor() {
    super();
    this.board = Array(9).fill("");
    this.currentPlayer = "X";

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*css*/`
      <style>
        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          gap: 5px;
        }
      </style>
      <div class="board"></div>
    `;
  }

  connectedCallback() {
    const boardEl = this.shadowRoot!.querySelector(".board")!;
    this.board.forEach((_, index) => {
      const cell = document.createElement("cell-tile");
      cell.setAttribute("data-index", index.toString());
      cell.addEventListener("click", () => this.makeMove(index, cell));
      boardEl.appendChild(cell);
    });
  }

  makeMove(index: number, cell: Element) {
    if (this.board[index]) return;
    this.board[index] = this.currentPlayer;
    (cell as any).setValue(this.currentPlayer);
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }
}

customElements.define("tic-tac-toe", TicTacToe);
