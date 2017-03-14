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
        realPlayer = "",
        computerPlayer = "",
        gameStarted = false,
        gameBoard = {},
        arrayOfSquareVar = [squareOne, squareTwo, squareThree, squareFour, squareFive,
            squareSix, squareSeven, squareEight, squareNine];

    resetGame();

    document.getElementById('x-btn').onclick = function () {
        realPlayer = "X";
        computerPlayer = "O";
        whoGoFirst();
    }

    document.getElementById('o-btn').onclick = function () {
        realPlayer = "O";
        computerPlayer = "X";
        whoGoFirst();
    }

    document.getElementById('reset-btn').onclick = resetGame;
    document.getElementById('one').onclick = realPlayerMove;
    document.getElementById('two').onclick = realPlayerMove;
    document.getElementById('three').onclick = realPlayerMove;
    document.getElementById('four').onclick = realPlayerMove;
    document.getElementById('five').onclick = realPlayerMove;
    document.getElementById('six').onclick = realPlayerMove;
    document.getElementById('seven').onclick = realPlayerMove;
    document.getElementById('eight').onclick = realPlayerMove;
    document.getElementById('nine').onclick = realPlayerMove;

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
        var firstMoveSet = [squareOne, squareThree, squareFive, squareSeven, squareNine],
            firstMove = Math.floor(Math.random() * firstMoveSet.length - 1);
        firstMoveSet[firstMove].innerHTML = computerPlayer;
        if (firstMove == 0) {
            gameBoard[0] = 2;
        } else if (firstMove == 1) {
            gameBoard[2] = 2;
        } else if (firstMove == 2) {
            gameBoard[4] = 2;
        } else if (firstMove == 3) {
            gameBoard[6] = 2;
        } else if (firstMove == 4) {
            gameBoard[8] = 2;
        }
    }

    function regularComputerMove() {
        setTimeout(function () {
            var num = Math.floor(Math.random() * 9);
            if (arrayOfSquareVar[num].innerHTML == "") {
                arrayOfSquareVar[num].innerHTML = computerPlayer;
                gameBoard[num] = 2;
            } else {
                regularComputerMove();
            }
        }, 300);
    }

    function realPlayerMove() {
        if (this.innerHTML != "") {
            return;
        }
        
        for (var i = 0; i < arrayOfSquareVar.length; i++) {
            if (gameStarted == true) {
                if (this == arrayOfSquareVar[i]) {
                    gameBoard[i] = 1;
                    this.innerHTML = realPlayer;
                }
            }
        }
        regularComputerMove();
    }


    // Function to check if there is a winner
    function checkForWinner() {
        var sumOfRowOne = gameBoard[0] + gameBoard[1] + gameBoard[2],
            sumOfRowTwo = gameBoard[3] + gameBoard[4] + gameBoard[5],
            sumOfRowOne = gameBoard[6] + gameBoard[7] + gameBoard[8],
            sumOfColOne = gameBoard[0] + gameBoard[3] + gameBoard[6],
            sumOfColTwo = gameBoard[1] + gameBoard[4] + gameBoard[7],
            sumOfColOne = gameBoard[2] + gameBoard[5] + gameBoard[8],
            sumOfDiaOne = gameBoard[0] + gameBoard[4] + gameBoard[8],
            sumOfDiaTwo = gameBoard[2] + gameBoard[4] + gameBoard[6];
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
        realPlayer = "";
        computerPlayer = "";
        gameStarted = false;
    }

}