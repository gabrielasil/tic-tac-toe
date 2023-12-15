// JavaScript code
document.addEventListener("DOMContentLoaded", () => {
  let currentPlayer;
  let cells;
  let gameMode;

  const board = document.getElementById("board");
  const resultContainer = document.getElementById("resultContainer");

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

    // Hide the board and result container
    hideBoard();

    // First move if computer starts
    if (gameMode === "human-vs-computer" && currentPlayer === "O") {
      makeComputerMove();
    }

    // Initialize the board after a slight delay to ensure hiding is complete
    setTimeout(() => {
      renderBoard();
      showBoard();
    }, 100);
  }

  // Function to handle player moves
  function makeMove(index) {
    if (cells[index] || checkWinner() || isBoardFull()) {
      return;
    }

    cells[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
      displayResult(`Player ${currentPlayer} wins!`);
      return;
    } else if (isBoardFull()) {
      displayResult("It's a tie!");
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
      displayResult(`Player ${currentPlayer} wins!`);
      return;
    } else if (isBoardFull()) {
      displayResult("It's a tie!");
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

  // Function to render the board
  function renderBoard() {
    // Clear the board
    board.innerHTML = "";

    // Initialize the board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = cells[i] || ""; // Display X or O
      cell.addEventListener("click", () => makeMove(i));
      board.appendChild(cell);
    }
  }

  // Function to display the game result
  function displayResult(message) {
    // Display the result message
    resultContainer.innerHTML = `<p>${message}</p>`;

    // Hide the board and show the result container
    hideBoard();
  }

  // Function to hide the board
  function hideBoard() {
    board.style.display = "none";
    resultContainer.style.display = "block";
  }

  // Function to show the board
  function showBoard() {
    board.style.display = "grid";
    resultContainer.style.display = "none";
  }
});
