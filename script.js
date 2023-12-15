document.addEventListener("DOMContentLoaded", () => {
  let currentPlayer;
  let cells;
  let gameMode;

  const board = document.getElementById("board");

  // Function to start the game based on the selected game mode
  window.startGame = function () {
    const selectedMode = document.querySelector(
      'input[name="gameMode"]:checked'
    );

    if (selectedMode) {
      gameMode = selectedMode.value;
      initializeGame();
    } else {
      alert("Please choose a game mode.");
    }
  };

  // Function to initialize the game based on the selected game mode
  function initializeGame() {
    currentPlayer = "X";
    cells = new Array(9).fill(null);

    // Clear the board
    board.innerHTML = "";

    // Initialize the board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => makeMove(i));
      board.appendChild(cell);
    }

    // First move if computer starts
    if (gameMode === "human-vs-computer" && currentPlayer === "O") {
      makeComputerMove();
    }
  }

  // Function to handle player moves
  function makeMove(index) {
    if (cells[index] || checkWinner() || isBoardFull()) {
      return;
    }

    cells[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
      return;
    } else if (isBoardFull()) {
      alert("It's a tie!");
      resetGame();
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Computer's move
    if (gameMode === "human-vs-computer" && currentPlayer === "O") {
      makeComputerMove();
    }
  }

  // Function to handle computer's move
  function makeComputerMove() {
    const emptyCells = cells.reduce((acc, cell, index) => {
      if (cell === null) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];

    cells[computerMove] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
      return;
    } else if (isBoardFull()) {
      alert("It's a tie!");
      resetGame();
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  // Function to check for a winner
  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) =>
      condition.every((index) => cells[index] === currentPlayer)
    );
  }

  // Function to check if the board is full
  function isBoardFull() {
    return cells.every((cell) => cell !== null);
  }

  // Function to reset the game
  function resetGame() {
    initializeGame();
  }

  // Function to render the board
  function renderBoard() {
    cells.forEach((value, index) => {
      const cell = document.getElementsByClassName("cell")[index];
      cell.textContent = value || "";
    });
  }
});
