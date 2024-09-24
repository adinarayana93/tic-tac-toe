const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // If the cell is already taken or the game is not active, return
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game state and display the player's symbol
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer; // Show the player's symbol

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showResult(`Player ${currentPlayer} wins!`);
        return;
    }

    if (!gameState.includes('')) {
        showResult('It\'s a draw!');
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function showResult(message) {
    gameActive = false;
    resultMessage.textContent = message;
    resultScreen.classList.remove('hidden');
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the displayed symbols
    });
    resultScreen.classList.add('hidden');
}

function startNewGame() {
    resetGame();
    resultScreen.classList.add('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
