const gameBoard = (function() {
    const gameBoardPositions = ['', '', '', '', '', '', '', '', ''];   
    const checkGameBoard = () => {

    }
    return { gameBoardPositions }  
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
    const populateDisplay = (e, typeofmark) => {
        let position = e.target.position;
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
            gameFlow.changeTurn();
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
    
    return { addEvent };
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

   
    
    human1.addEvent();

    return { changeTurn }
})();