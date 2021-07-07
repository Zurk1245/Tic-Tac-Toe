(function() {
    const gameBoard = {
        gameBoard: ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'],
        container: document.querySelector('.container'),
        playArea: document.querySelectorAll('.playArea'),
        displayBoard: () => {
            for (let i = 0; i < gameBoard.playArea.length; i++) {
                if (gameBoard.gameBoard[i] == undefined) {
                    return;
                }
                gameBoard.playArea[i].innerHTML = gameBoard.gameBoard[i];
            }
        },
        
        
    }

    gameBoard.displayBoard();
})()

const Player = () => {
    let human = Boolean;
    return {};
}

let human1 = Player();
