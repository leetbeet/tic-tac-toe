const createPlayer = (name, markType) => {
    return {
        getName() {
            return name;
        },
        getMarkType() {
            return markType;
        }
    };
};

const playGame = (() => {
    const board = Array(9).fill("");
    const player1 = createPlayer("A", "X");
    const player2 = createPlayer("B", "O");

    const ThreeInARow = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    const checkWinner = (markType) => {
        for (const arr of ThreeInARow) {
            if (arr.every(index => board[index] === markType)) {
                return true;
            }
        }
        return false;
    };

    const playTurn = (player, index) => {
        if (board[index] === "") {
            board[index] = player.getMarkType();
            return true;
        }
        return false;
    };


})();
