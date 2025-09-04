let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const board = document.getElementById("board");
const statusText = document.getElementById("status");

function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    if (cell) {
      div.classList.add("clicked");
    }
    div.innerHTML = `<span>${cell}</span>`;
    div.addEventListener("click", () => makeMove(index, div));
    board.appendChild(div);
  });
}

function makeMove(index, cellDiv) {
  if (!gameActive || gameBoard[index]) return;

  gameBoard[index] = currentPlayer;
  cellDiv.classList.add("clicked");
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      const cells = document.querySelectorAll(".cell");
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");
      statusText.textContent = `🎉 Player ${gameBoard[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  }
}

function restartGame() {
  gameBoard = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;
