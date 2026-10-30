console.log("JAVASCRIPT LOADED");
// ==========================================
// SELECT HTML ELEMENTS
// ==========================================

const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart-button");

const player1ScoreElement =
    document.getElementById("player1-score");

const player2ScoreElement =
    document.getElementById("player2-score");


// ==========================================
// GAME VARIABLES
// ==========================================

// X = Player 1
// O = Player 2

let currentPlayer = "X";

let gameActive = true;


// Board ke 9 boxes

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


// Score

let player1Score = 0;

let player2Score = 0;


// ==========================================
// WINNING COMBINATIONS
// ==========================================

const winningCombinations = [

    // Rows

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],


    // Columns

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],


    // Diagonal

    [0, 4, 8],

    [2, 4, 6]

];


// ==========================================
// CELL CLICK
// ==========================================

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        // Agar game khatam ho gaya
        if (!gameActive) {
            return;
        }


        // Cell ka index

        const index = Number(
            cell.getAttribute("data-index")
        );


        // Agar cell pehle se filled hai

        if (board[index] !== "") {
            return;
        }


        // Board mein current player save karo

        board[index] = currentPlayer;


        // Cell mein X ya O dikhao

        cell.textContent = currentPlayer;


        // CSS classes lagao

        cell.classList.add("filled");

        cell.classList.add(
            currentPlayer === "X"
                ? "x"
                : "o"
        );


        // Winner check karo

        checkWinner();

    });

});


// ==========================================
// CHECK WINNER
// ==========================================

function checkWinner() {

    let winningCombination = null;


    // Har combination check karo

    for (
        const combination of winningCombinations
    ) {

        const first = combination[0];

        const second = combination[1];

        const third = combination[2];


        if (

            board[first] !== "" &&

            board[first] === board[second] &&

            board[first] === board[third]

        ) {

            winningCombination = combination;

            break;

        }

    }


    // ======================================
    // WINNER FOUND
    // ======================================

    if (winningCombination) {

        gameActive = false;


        // Winning boxes highlight karo

        winningCombination.forEach((index) => {

            cells[index].classList.add("winner");

        });


        // Player 1 winner

        if (currentPlayer === "X") {

            player1Score++;

            player1ScoreElement.textContent =
                player1Score;


            statusText.textContent =
                "🏆 Rhythem is winner";

        }


        // Player 2 winner

        else {

            player2Score++;

            player2ScoreElement.textContent =
                player2Score;


            statusText.textContent =
                "🏆 Vansh is Winner!";

        }


        return;

    }


    // ======================================
    // DRAW
    // ======================================

    if (!board.includes("")) {

        gameActive = false;

        statusText.textContent =
            "🤝 It's a Draw!";

        return;

    }


    // ======================================
    // CHANGE PLAYER
    // ======================================

    if (currentPlayer === "X") {

        currentPlayer = "O";

        statusText.textContent =
            "Player 2's Turn";

    }

    else {

        currentPlayer = "X";

        statusText.textContent =
            "Player 1's Turn";

    }

}


// ==========================================
// NEW GAME BUTTON
// ==========================================

restartButton.addEventListener(
    "click",
    restartGame
);


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    // Board empty karo

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    // X se game start

    currentPlayer = "X";


    // Game active

    gameActive = true;


    // Saare cells reset

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove("filled");

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winner");

    });


    // Status reset

    statusText.textContent =
        "Player 1's Turn";

}
