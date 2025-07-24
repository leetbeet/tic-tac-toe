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
    const boardArr = Array(9).fill("");

    const ThreeInARow = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    const checkWinner = (player) => {
        for (const arr of ThreeInARow) {
            if (arr.every(index => boardArr[index] === player.getMarkType())) {
                return true;
            }
        }
        return false;
    };

    const playTurn = (player, index) => {
        if (boardArr[index] === "") {
            boardArr[index] = player.getMarkType();
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        boardArr.length = 0;
    }

    return {
        checkWinner,
        playTurn,
        resetBoard
    };

})();

const displayController = (() => {
    const board = document.querySelector(".grid");
    const boxes = board.children;
    const form = document.querySelector("form");
    const dialog = document.querySelector("dialog");
    let name1, name2;

    if (dialog) {
      dialog.showModal();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        name1 = document.getElementById("player1").value;
        name2 = document.getElementById("player2").value;

        dialog.close(); 
    });

    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");
})();

