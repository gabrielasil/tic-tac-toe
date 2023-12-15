document.addEventListener("DOMContentLoaded", () => {
  let currentPlayer;
  let cells;
  let gameMode;

  const board = document.getElementById("board");
  const resultContainer = document.getElementById("resultContainer");
  const gameForm = document.getElementById("gameForm");

  // Function to start the game based on the selected game mode
  window.startGame = function () {
    const selectedMode = document.querySelector(
      'input[name="gameMode"]:checked'
    );

    if (selectedMode) {
      gameMode = selectedMode.value;
      cleanupBoard(); // Clean up the board before changing the game mode
      hideGameForm(); // Hide the radio buttons
      initializeGame(); // Reload the board with the new game mode after a slight delay
    } else {
      alert("Please choose a game mode.");
    }
  };

  // Function to hide the radio buttons
  function hideGameForm() {
    gameForm.style.display = "none";
  }

  // Function to show the radio buttons
  function showGameForm() {
    gameForm.style.display = "block";
  }

  // Function to initialize the game based on the selected game mode
  function initializeGame() {
    currentPlayer = "X";
    cells = new Array(9).fill(null);

    // Initialize the board
    renderBoard();

    // First move if computer starts
    if (gameMode === "human-vs-computer" && currentPlayer === "O") {
      makeComputerMove();
    }
  }

  // Function to reset the game state
  function cleanupBoard() {
    currentPlayer = null;
    cells = [];
    board.innerHTML = "";
    resultContainer.innerHTML = "";
    showGameForm(); // Show the radio buttons when the board is cleared
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

    // Show the radio buttons
    showGameForm();
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

  function resetGame() {
    currentPlayer = "X";
    cells = new Array(9).fill(null);
    renderBoard(); // Render the board immediately
  }
});
