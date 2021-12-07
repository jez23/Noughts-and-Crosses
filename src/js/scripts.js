// Selecting the dom elements
const playerButtons = document.querySelectorAll("#playSelectionCard button");
const playSelectionBackground = document.querySelector("#playSelectionBackground");
const gameBoard = document.querySelector("#gameBoard");
const gameTile = document.querySelectorAll("#gameBoard div");
const whosTurnIsIt = document.querySelector("#whosTurnIsIt");
const gameReset = document.querySelector("#gameReset");

// global variables
let gamesGrid = 3;
let playerWhosTurnItIs;

// Event listener modal - hidden after a button is pressed
playerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    playSelectionBackground.classList.add("displayNone");
  });
});

// MAIN FUNCTION RUNS EVERY TIME A GAME ENDS
function setupboard() {
  // Makes the first player number 1;
  playerWhosTurnItIs = 1;

  // setsUp the games array (grid) and fills the array with 0's
  let gamesArrayRows = new Array(gamesGrid).fill(new Array(gamesGrid).fill(0));

  // Changes the text at the top of the board
  whosTurnIsIt.innerHTML = playerWhosTurnItIs;

  // copy of the game board array that I use for checking
  let blankArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  //added the colums
  gamesArrayRows.forEach((colum, rowIndex) => {
    // adds the rows
    colum.forEach((cell, columnIndex) => {
      // creates DIV elements
      let gameTile = document.createElement("div");
      gameBoard.appendChild(gameTile);

      // handles all the on clicks
      gameTile.onclick = () => {
        let symbol;
        // if player one
        if (!gameTile.classList.contains("disabled")) {
          if (playerWhosTurnItIs === 1) {
            playerWhosTurnItIs++;
            gameTile.innerHTML = `<span>X</span>`;
            gameTile.classList.add("disabled");
            whosTurnIsIt.innerHTML = playerWhosTurnItIs;
            blankArr[rowIndex][columnIndex] = "X";
            symbol = "X";
            console.log(blankArr);
          } else {
            // if player two
            playerWhosTurnItIs--;
            gameTile.innerHTML = `<span>O</span>`;
            gameTile.classList.add("disabled");
            whosTurnIsIt.innerHTML = playerWhosTurnItIs;
            blankArr[rowIndex][columnIndex] = "O";
            symbol = "O";
          }
        }

        const winnerCheck = checkIfWinner(blankArr, symbol, playerWhosTurnItIs);

        if (winnerCheck) {
          alert(`Then winner is player: ${winnerCheck.player}, who was using the ${winnerCheck.symbol}'s'`);
          gameBoard.innerHTML = "";
          setupboard();
        }

        if (!blankArr.flat(2).includes(0)) {
          // checks if the game is over (if all the 0's have gone)
          setTimeout(() => {
            alert("Game over!");
            gameBoard.innerHTML = "";
            setupboard();
          }, 500);
        }
      };
    });
  });
}

//initiates the board
setupboard();

// Event listen to see if the reset button has been pressed.
gameReset.addEventListener("click", () => {
  gameBoard.innerHTML = "";
  setupboard();
});

// checks to see if there is a winner
const checkIfWinner = (gameArray, symbol, player) => {

    // checks if win on column
  let col1 = [gameArray[0][0], gameArray[1][0], gameArray[2][0]];
  let col2 = [gameArray[0][1], gameArray[1][1], gameArray[2][1]];
  let col3 = [gameArray[0][2], gameArray[1][2], gameArray[2][2]];

  // checks diagnoal rows
  let diagonalLR = [gameArray[0][0], gameArray[1][1], gameArray[2][2]];
  let diagonalRL = [gameArray[0][2], gameArray[1][1], gameArray[2][0]];

  const newArr1 = col1.every((value) => value === symbol);
  const newArr2 = col2.every((value) => value === symbol);
  const newArr3 = col3.every((value) => value === symbol);
  const newArr4 = diagonalLR.every((value) => value === symbol);
  const newArr5 = diagonalRL.every((value) => value === symbol);

  // check if win on row
  const newArr = gameArray.map((row) => row.every((value) => value === symbol));

  if (newArr.includes(true) || newArr4 || newArr5 || newArr1 || newArr2 || newArr3) {
    return { player, symbol };
  }
};