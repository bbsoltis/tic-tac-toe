window.onload = function () {
    const squareOne = document.getElementById('one'),
        squareTwo = document.getElementById('two'),
        squareThree = document.getElementById('three'),
        squareFour = document.getElementById('four'),
        squareFive = document.getElementById('five'),
        squareSix = document.getElementById('six'),
        squareSeven = document.getElementById('seven');
        squareEight = document.getElementById('eight'),
        squareNine = document.getElementById('nine'),
        arrayOfSquareVar = [squareOne, squareTwo, squareThree, squareFour, squareFive,
            squareSix, squareSeven, squareEight, squareNine
        ];
    let playerToken = "",
        computerToken = "",
        gameStarted = false,
        gameBoard = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0
        },
        winningCombos = [];

    resetGame();
    
    document.getElementById('x-btn').onclick = function () {
        resetGame();
        playerToken = "X";
        computerToken = "O";
        whoGoFirst();
    }

    document.getElementById('o-btn').onclick = function () {
        resetGame();
        playerToken = "O";
        computerToken = "X";
        whoGoFirst();
    }

    document.getElementById('reset-btn').onclick = resetGame;

    function whoGoFirst() {
        if (Math.floor(Math.random() * 2) == 0) {
            alert("Computer goes first!");
            computerTurn();
        } else {
            alert("You go first!");
        }
        gameStarted = true;
    }



// Look for block or win
// Determine move
// Determine if move square is empty
// If empty, place token
    // If not, move one to next highest priority square
// Check for winner (helper function)
    // If no winner, move on to player



    function playerReady() {
        setTimeout(function () {
            checkForWinner();
        }, 0);
    }

    for (let i = 0; i < arrayOfSquareVar.length; i++) {
        arrayOfSquareVar[i].onclick = function playerMove() {
            if (this.innerHTML != "") {
                return;
            }
            for (let i = 0; i < arrayOfSquareVar.length; i++) {
                if (gameStarted == true) {
                    if (this == arrayOfSquareVar[i]) {
                        gameBoard[i] = playerToken;
                        setsGameTokens(playerToken, i);
                    } 
                }
            }
            computerTurn();
        }
    }

    function setsGameTokens(token, index) {
        gameBoard[index] = token;
        return arrayOfSquareVar[index].innerHTML = token;
    }

    function checkForWinner() {
        let emptySquares = 0;
        winningCombos = [
            [gameBoard[0], gameBoard[1], gameBoard[2]],
            [gameBoard[3], gameBoard[4], gameBoard[5]],
            [gameBoard[6], gameBoard[7], gameBoard[8]],
            [gameBoard[0], gameBoard[3], gameBoard[6]],
            [gameBoard[1], gameBoard[4], gameBoard[7]],
            [gameBoard[2], gameBoard[5], gameBoard[8]],
            [gameBoard[0], gameBoard[4], gameBoard[8]],
            [gameBoard[2], gameBoard[4], gameBoard[6]]
        ];
        for (let j = 0; j < 9; j++) {
                if (gameBoard[j] !== 0) {
                    emptySquares++;
                }
            }   
        for (let i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i][0] === playerToken && winningCombos[i][1] === playerToken &&
                winningCombos[i][2] === playerToken) {
                resetGame();
                return alert("You Won!");
            } else if (winningCombos[i][0] === computerToken && winningCombos[i][1] === computerToken &&
                winningCombos[i][2] === computerToken) {
                resetGame();
                return alert("You Lost!");
            } else if (emptySquares === 0) {
                resetGame();
                return alert("Draw!");
            }
        }
        return;
    }

    function resetGame() {
        for (let i = 0; i < 9; i++) {
            gameBoard[i] = 0;
        }
        squareOne.innerHTML = "";
        squareTwo.innerHTML = "";
        squareThree.innerHTML = "";
        squareFour.innerHTML = "";
        squareFive.innerHTML = "";
        squareSix.innerHTML = "";
        squareSeven.innerHTML = "";
        squareEight.innerHTML = "";
        squareNine.innerHTML = "";
        playerOne = "";
        computerToken = "";
        gameStarted = false;
    }

}