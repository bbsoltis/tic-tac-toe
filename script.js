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
        };

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

    // Randomizes which player goes first
    function whoGoFirst() {
        // if (Math.floor(Math.random() * 2) == 0) {
            // alert("Computer goes first!");
            // computerReady();
        // } else {
            alert("You go first!");
        // }
        gameStarted = true;
    }

    
    // Determines computer's next move
    function computerTurn() {
        let moveIndex;
        blockOrWin();
            // is their 2-in-a-row in winningCombos?
            // 3rd square isSquareEmpty()?
            // assigns a value to moveIndex if there is a move
            // does not assign a value if no move
            // returns a boolean
        // if (blockOrWin) {
            // returns without assigning 
            // } else {
                // determinesMove()
                // based on prioritized list
                // isSquareEmpty();
                // assigns a value to moveIndex
            // }
        //setsGameTokens(computerToken, moveIndex);
        playerReady();
        // }
        
    }

    // Checks for 2-in-a-row to either block or win the game; returns a boolean
    function blockOrWin() {
        let firstSquare,
            secondSquare,
            thirdSquare,
            arrayOfFirstSquares = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

        for (let i = 0; i < arrayOfFirstSquares.length; i++) {
            firstSquare = arrayOfFirstSquares[i][0];
            secondSquare = arrayOfFirstSquares[i][1];
            thirdSquare = arrayOfFirstSquares[i][2];

            if (gameBoard[firstSquare] !== 0 && gameBoard[thirdSquare] === gameBoard[firstSquare]) {
                if (gameBoard[secondSquare] === 0) {
                    setsGameTokens(computerToken, secondSquare);
                    return true;
                }
            } else if (gameBoard[firstSquare] !== 0 && gameBoard[secondSquare] === gameBoard[firstSquare]) {
                if (gameBoard[thirdSquare] === 0) {
                    setsGameTokens(computerToken, thirdSquare);
                    return true;
                }
            } else if (gameBoard[secondSquare] !== 0 && gameBoard[thirdSquare] === gameBoard[secondSquare]) {
                if (gameBoard[firstSquare] === 0) {
                    setsGameTokens(computerToken, firstSquare);
                    return true;
                }
            } 
        }
        return false;
    }


    // Determine if a square is empty
     function isSquareEmpty(index) {
        if (gameBoard[index] == 0) {
            return true;
        } else {
            return false;
        }
    }

    // Delays move for more realistic play and
    // prevents ending game before token appears in DOM
    function computerReady() {
        setTimeout(function () {
            checkForWinner();
            computerTurn();
        }, 300);
    }

    // prevents ending game before token appears in DOM
    function playerReady() {
        setTimeout(function () {
            checkForWinner();
        }, 0);
    }

    // onclick function to place player token on gameBoard
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
            computerReady();
        }
    }

    // Places tokens on gameBoard based on arguments when called
    function setsGameTokens(token, index) {
        gameBoard[index] = token;
        return arrayOfSquareVar[index].innerHTML = token;
    }

    // Ends game if anyone has a winning move
    function checkForWinner() {
        let emptySquares = 0,
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

    // Resets global variables back to defaults
    function resetGame() {
        // for (let i = 0; i < 9; i++) {
        //     gameBoard[i] = 0;
        // }
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