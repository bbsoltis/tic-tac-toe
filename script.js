window.onload = function () {

    var squareOne = document.getElementById('one'),
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
        ],
        playerOneToken = "",
        computerToken = "",
        gameStarted = false,
        // Non-standard object formatting used to mimic structure of game grid
        gameBoard = {
            0: 0, 1: 0, 2: 0,
            3: 0, 4: 0, 5: 0,
            6: 0, 7: 0, 8: 0
        },
        winningCombos = [];

    resetGame();

    document.getElementById('x-btn').onclick = function () {
        resetGame();
        playerOneToken = "X";
        computerToken = "O";
        whoGoFirst();
    }

    document.getElementById('o-btn').onclick = function () {
        resetGame();
        playerOneToken = "O";
        computerToken = "X";
        whoGoFirst();
    }

    document.getElementById('reset-btn').onclick = resetGame;

    function whoGoFirst() {
        if (Math.floor(Math.random() * 2) == 0) {
            alert("Computer goes first!");
            firstComputerMove();
        } else {
            alert("You go first!");
        }
        gameStarted = true;
    }

    function firstComputerMove() {
        var firstMoveSet = [squareOne, squareThree, squareSeven, squareNine],
            firstMove = Math.floor(Math.random() * firstMoveSet.length - 1);
        firstMoveSet[firstMove].innerHTML = computerToken;
        if (firstMove == 0) {
            gameBoard[0] = computerToken;
        } else if (firstMove == 1) {
            gameBoard[2] = computerToken;
        } else if (firstMove == 2) {
            gameBoard[6] = computerToken;
        } else if (firstMove == 3) {
            gameBoard[8] = computerToken;
        }
    }

    function regularComputerMove() {
        setTimeout(function () {
            checkForWinner();
            var num = Math.floor(Math.random() * 9);
            if (arrayOfSquareVar[num].innerHTML == "") {
                arrayOfSquareVar[num].innerHTML = computerToken;
                gameBoard[num] = computerToken;
                playerOneReady();
            } else {
                regularComputerMove();
            }
        }, 300);
    }

    function playerOneReady() {
        setTimeout(function () {
            checkForWinner();
        }, 0);
    }

    for (var i = 0; i < arrayOfSquareVar.length; i++) {
        arrayOfSquareVar[i].onclick = function playerOneMove() {
            if (this.innerHTML != "") {
                return;
            }
            for (var i = 0; i < arrayOfSquareVar.length; i++) {
                if (gameStarted == true) {
                    if (this == arrayOfSquareVar[i]) {
                        gameBoard[i] = playerOneToken;
                        this.innerHTML = playerOneToken;
                    }
                }
            }
            regularComputerMove();
        }
    }



    // Function to check if there is a winner
    function checkForWinner() {
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
        for (var i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i][0] === playerOneToken && winningCombos[i][1] === playerOneToken
                && winningCombos[i][2] === playerOneToken) {
                resetGame();
                return alert("You Won!");
            } else if (winningCombos[i][0] === computerToken && winningCombos[i][1] === computerToken && winningCombos[i][2] === computerToken) {
                resetGame();
                return alert("You Lost!");
            }
        }
        return;
    }

    function resetGame() {
        for (var i = 0; i < 9; i++) {
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
        //checkForWinner();
    }

}