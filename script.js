const createPlayer = (name, markType) => ({
	getName: () => name,
	getMarkType: () => markType,
});

const playGame = (() => {
	const board = Array(9).fill(""); // 3x3 game board

	const winCombos = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6]             // diagonals
	];

	const checkWinner = (player) =>
		winCombos.some(combo =>
			combo.every(i => board[i] === player.getMarkType())
		);

    const checkDraw = () => board.every(val => val !== "");   

	const playTurn = (player, index) => {
		if (board[index] !== "") return false;
		board[index] = player.getMarkType();
		return true;
	};

	const resetBoard = () => board.fill("");

	return { checkWinner, checkDraw, playTurn, resetBoard };
})();

const displayController = (() => {
	const boxes = Array.from(document.querySelector(".grid").children);
	const form = document.querySelector("form");
	const dialog = document.querySelector("dialog");
	const resetBtn = document.querySelector(".reset");

	let player1, player2, currentPlayer;

	if (dialog) dialog.showModal(); // Show player name input dialog on load

	form.addEventListener("submit", (e) => {
		e.preventDefault();

        // Initialise players with inputted names
		player1 = createPlayer(document.getElementById("player1").value, "X");
		player2 = createPlayer(document.getElementById("player2").value, "O");
		currentPlayer = player1;

		dialog.close();
		initBoardEvents();
	});

	const initBoardEvents = () => {
		boxes.forEach((box, index) => {
			box.addEventListener("click", () => {
				if (!playGame.playTurn(currentPlayer, index)) return;

				box.textContent = currentPlayer.getMarkType();

				if (playGame.checkWinner(currentPlayer)) {
                    // Delay alert so the mark shows before alert
					setTimeout(() => {
						alert(`${currentPlayer.getName()} has won!`);
						resetBoardUI();
					}, 10);
				} else if (playGame.checkDraw()) {
                    setTimeout(() => {
						alert("It's a draw!");
						resetBoardUI();
					}, 10);
				} else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
			});
		});
	};

	const resetBoardUI = () => {
		playGame.resetBoard();
		boxes.forEach(box => (box.textContent = ""));
	};

	resetBtn.addEventListener("click", resetBoardUI);
})();
