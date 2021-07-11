const gameBoard = (function() {
    const gameBoardPositions = ['', '', '', '', '', '', '', '', ''];   
    const checkGameBoard = () => {
        let isThereAWinner = false;
        let tie = 0;

        switch (true) {
            case gameBoardPositions[0] == gameBoardPositions[1] &&
                 gameBoardPositions[0] == gameBoardPositions[2] &&
                 gameBoardPositions[0] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[3] == gameBoardPositions[4] &&
                 gameBoardPositions[3] == gameBoardPositions[5] &&
                 gameBoardPositions[3] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[6] == gameBoardPositions[7] &&
                 gameBoardPositions[6] == gameBoardPositions[8] &&
                 gameBoardPositions[6] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[0] == gameBoardPositions[3] &&
                 gameBoardPositions[0] == gameBoardPositions[6] &&
                 gameBoardPositions[0] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[1] == gameBoardPositions[4] &&
                 gameBoardPositions[1] == gameBoardPositions[7] &&
                 gameBoardPositions[1] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[2] == gameBoardPositions[5] &&
                 gameBoardPositions[2] == gameBoardPositions[8] &&
                 gameBoardPositions[2] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[0] == gameBoardPositions[4] &&
                 gameBoardPositions[0] == gameBoardPositions[8] &&
                 gameBoardPositions[0] != '': 
            isThereAWinner = true;
            break;

            case gameBoardPositions[2] == gameBoardPositions[4] &&
                 gameBoardPositions[2] == gameBoardPositions[6] &&
                 gameBoardPositions[2] != '': 
            isThereAWinner = true;
            break;
        }
        
        if (isThereAWinner) {
            return true;
        } 
        //CHECK FOR TIE
        for(let i = 0; i < gameBoard.gameBoardPositions.length; i++) {
            if (gameBoard.gameBoardPositions[i] != '') {
                tie++;
            }
        } 

        if (tie === 9) {
            return 'tie';
        }
        //CONTINUE GAME 
        return false;
    }
    
    return { gameBoardPositions, checkGameBoard }  
})();

const displayController = (() => {
    const playArea = document.querySelectorAll('.playArea');
    const displayBoard = () => {
        for (let i = 0; i < playArea.length; i++) {
            playArea[i].position = i;
            playArea[i].innerHTML = gameBoard.gameBoardPositions[i];
        }
    }
    
    
    return { playArea, displayBoard }        
})();

displayController.displayBoard();

let permissionToChangeTurn = false;

const Player = (typeofmark) => {
    let position;
    const populateDisplay = (e, typeofmark) => {
        position = e.target.position;
        if (gameBoard.gameBoardPositions[position] != '') {
            return false;
        } 
        gameBoard.gameBoardPositions[position] = typeofmark;
        displayController.displayBoard();
        return true;
    }

    const event = e => {
        let result = populateDisplay(e, typeofmark);
        if (result) {
            removeEvent();
            let gameOver = gameBoard.checkGameBoard();
            if (gameOver === true) {
                setTimeout(() => {
                    gameFlow.displayWinner();
                }, 500);
            } else if (gameOver === 'tie') {
                gameFlow.displayTie();
            } 
            else {
                gameFlow.changeTurn();
            }
        }
        return;
    }

    const addEvent = () => {
        displayController.playArea.forEach(square => {
            square.addEventListener('click', event);
        });
    }
    
    const removeEvent = () => {
        displayController.playArea.forEach(square => {
            square.removeEventListener('click', event)})
    }

    
    
    return { addEvent, position, removeEvent };
}

const gameFlow = (() => {
    let firstPlayerTurn = true;

    let human1 = Player('X');
    let human2 = Player('O');    

    const changeTurn = () => {
       if (firstPlayerTurn) {
            human2.addEvent(); 
            firstPlayerTurn = false;  
        } else if (firstPlayerTurn === false) {
            human1.addEvent();
            firstPlayerTurn = true;
        }
    }

   const displayWinner = () => {
        if (firstPlayerTurn) {
            console.log('Jugador 1 GANA!');
            const winnerModal = document.getElementById('winnerModal');
            winnerModal.style.display = 'flex';
            const restartGame = document.getElementById('restart-game');
            restartGame.addEventListener('click', () => {
                winnerModal.style.display = 'none';
                clearGameBoard();
                human1.addEvent();
            });
        } else if (!firstPlayerTurn) {
            console.log('Jugador 2 GANA!');
            const winnerModal = document.getElementById('winnerModal');
            winnerModal.style.display = 'flex';
            const restartGame = document.getElementById('restart-game');
            restartGame.addEventListener('click', () => {
                winnerModal.style.display = 'none';
                clearGameBoard();
                human1.addEvent();
            });
            
        }
    }
    
    const clearGameBoard = () => {
        for(let i = 0; i < gameBoard.gameBoardPositions.length; i++) {
            gameBoard.gameBoardPositions[i] = '';
            displayController.displayBoard();
        } 
    }

    const displayTie = () => {
        const winnerModal = document.getElementById('winnerModal');
        winnerModal.style.display = 'flex';
        winnerModal.style.justifyContent = 'space-around';
        const restartGame = document.getElementById('restart-game');
        const TIE_MESSAGE = document.createElement('h3');
        TIE_MESSAGE.textContent = "IT'S A TIE!";
        TIE_MESSAGE.className = 'tie-message';
        const celebrateIcon = document.querySelector('lord-icon');
        celebrateIcon.style.display = 'none';
        winnerModal.appendChild(TIE_MESSAGE);
        
        let events = () => {
            winnerModal.style.display = 'none';
            winnerModal.style.justifyContent = 'space-between';
            celebrateIcon.style.display = 'block';
            winnerModal.removeChild(TIE_MESSAGE);
            clearGameBoard();
            human1.addEvent();
            restartGame.removeEventListener('click', events);
        } 
        restartGame.addEventListener('click', events);        
    }

    human1.addEvent();

    return { changeTurn, displayWinner, displayTie }
})();