const gameBoard = (function() {
    const gameBoardPositions = ['', '', '', '', '', '', '', '', ''];   

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


const Player = (typeofmark) => {
    let position;
    const populateDisplay = (e, typeofmark) => {
        position = e.target.position;
        if (gameBoard.gameBoardPositions[position] != '') {
            //gameFlow.stopShiftChange();
            return false;
        } 
        gameBoard.gameBoardPositions[position] = typeofmark;
        displayController.displayBoard();
        return true;
    }

    const event = e => {
        gameFlow.addShiftChange();
        let result = populateDisplay(e, typeofmark);
        if (result) {
            //gameFlow.addShiftChange();
            removeEvent();
            //return;
        } /* else {
            //gameFlow.stopShiftChange();
            return;
        } */
        
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
    
    return { addEvent, position };
}

const gameFlow = (() => {
    let firstPlayerTurn = true;
    let human1 = Player('X');
    let human2 = Player('O');
    //human2.addEvent();

    

    const changeTurn = () => {
        //console.log(gameBoard.gameBoardPositions[position])
       /*  if (gameBoard.gameBoardPositions[position] != '') {
            console.log('oara')
            return;
        } else  */if (firstPlayerTurn) {
            human2.addEvent(); 
            firstPlayerTurn = false;  
        } else if (firstPlayerTurn === false) {
            human1.addEvent();
            firstPlayerTurn = true;
        }
    }
    
    const addShiftChange = () => {
            displayController.playArea.forEach(square => {
            square.addEventListener('click', changeTurn);
        })
    }

    const stopShiftChange = () => {
        displayController.playArea.forEach(square => {
            square.removeEventListener('click', changeTurn);
        })
    }

    human1.addEvent();
    addShiftChange()

    return { stopShiftChange, addShiftChange }
})();

