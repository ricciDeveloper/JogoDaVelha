const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handleClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] !== "" || !gameActive) {
        return; // Ignora se já tiver algo ou jogo finalizado
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        showMessage(`Jogador ${currentPlayer} venceu!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        showMessage(`Empate!`);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


    function checkWinner() {
        return winConditions.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = "");
        const winnerMessage = document.querySelector('.winner');
        if (winnerMessage) {
            winnerMessage.remove();
        }
    }

    function showMessage(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
}

    function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}
