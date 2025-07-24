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
        boardArr.fill("");
    }

    return {
        checkWinner,
        playTurn,
        resetBoard
    };

})();

const displayController = (() => {
    const boxes = Array.from(document.querySelector(".grid").children);
    const form = document.querySelector("form");
    const dialog = document.querySelector("dialog");
    const resetBtn = document.querySelector(".reset");
    let player1, player2;

    if (dialog) {
      dialog.showModal();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;

        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");

        dialog.close(); 

        let currentPlayer = player1;

        boxes.forEach((box, index) => {
            box.addEventListener("click", () => {
                if (playGame.playTurn(currentPlayer, index)) {
                    box.textContent = currentPlayer.getMarkType();        
                    if (playGame.checkWinner(currentPlayer)) {
                        setTimeout(() => {
                            alert(`${currentPlayer.getName()} has won`)
                            playGame.resetBoard();
                            boxes.forEach(box => {
                                box.textContent = "";
                            });
                        }, 10)
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                    }
                }
            });
        });

        resetBtn.addEventListener("click", () => {
            playGame.resetBoard();
            boxes.forEach(box => {
                box.textContent = "";
            });
        });
    });
})();

