const gameBoard = (function() {
    const gameBoardPositions = ['', '', '', '', '', '', '', '', ''];   
    const checkGameBoard = () => {
        let isThereAWinner = false;
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
            //gameFlow.displayWinner();
            return true;
        } 
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
            if (gameOver) {
                gameFlow.displayWinner();
            } else {
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
       human1.removeEvent();
       human2.removeEvent();
       console.log('removido!')
   }
    
    human1.addEvent();

    return { changeTurn, displayWinner }
})();