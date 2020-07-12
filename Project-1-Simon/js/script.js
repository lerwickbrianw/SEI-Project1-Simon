let gameSequence = []; // array for the random sequence
let playerSequence = []; // array for the player sequence
let gameActive = false; //varible to track if game is active
let levelCounter = 0; //variable to track levels

//HTML Selectors
const startGameBtn = document.querySelector("#startGameBtn");
const endGameBtn = document.querySelector("#endGameBtn");
const redBtn = document.querySelector(".cell-red");
const blueBtn = document.querySelector(".cell-blue");
const yellowBtn = document.querySelector(".cell-yellow");
const greenBtn = document.querySelector(".cell-green");
const count = document.querySelector(".value");
//Console lots for selector tests
// console.log(startGameBtn);
// console.log(endGameBtn);
// console.log(redBtn);
// console.log(blueBtn);
// console.log(yellowBtn);
// console.log(greenBtn);

count.innerHTML = levelCounter;

//Event listener for Start Game button - executes playGame function
startGameBtn.addEventListener("click", (event) => {
  playGame();
});

//Event listener for End Game button - executes endGame function
endGameBtn.addEventListener("click", (event) => {
  endGame();
});

// Event Listener for red button
redBtn.addEventListener("click", (event) => {
  if (gameActive) {
    console.log("red clicked");
    // push 1 into player sequence array
    playerSequence.push(1);
    console.log(playerSequence);
    //call red button function to flash color
    red();
    checkMatch();
  }
});
// Event Listener for blue button
blueBtn.addEventListener("click", (event) => {
  if (gameActive) {
    console.log("blue clicked");
    // push 2 into player sequence array
    playerSequence.push(2);
    console.log(playerSequence);
    //call blue button function to flash color
    blue();
    checkMatch();
  }
});
// Event Listener for yellow button
yellowBtn.addEventListener("click", (event) => {
  if (gameActive) {
    console.log("yellow clicked");
    // push 3 into player sequence array
    playerSequence.push(3);
    console.log(playerSequence);
    //call yellow button function to flash color
    yellow();
    checkMatch();
  }
});
// Event Listener for green button
greenBtn.addEventListener("click", (event) => {
  if (gameActive) {
    console.log("green clicked");
    // push 4 into player sequence array
    playerSequence.push(4);
    console.log(playerSequence);
    //call green button function to flash color
    green();
    checkMatch();
  }
});

//function for events when red button is pressed
function red() {
  redBtn.style.backgroundColor = "rgb(248,1,1)";
  //return red button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 300);
}

//function for events when blue button is pressed
function blue() {
  blueBtn.style.backgroundColor = "rgb(1,1,250)";
  //return blue button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 300);
}

//function for events when yellow button is pressed
function yellow() {
  yellowBtn.style.backgroundColor = "rgb(255,255,1)";
  //return yellow button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 300);
}

//function for events when green button is pressed
function green() {
  greenBtn.style.backgroundColor = "rgb(1,255,1)";
  //return green button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 300);
}

// playGame function - main function for game play
function playGame() {
  generateSequence();
  console.log(gameSequence);
  gameActive = true;
  levelCounter = 1;
  count.innerHTML = levelCounter;
  console.log(gameActive);

  //      Clear any stored sequences from previous game
  //  	Call random sequence generation
}

// check match function
function checkMatch() {
  if (gameSequence[levelCounter - 1] === playerSequence[levelCounter - 1]) {
    console.log(
      ` computer ${gameSequence[levelCounter - 1]} player ${
        playerSequence[levelCounter - 1]
      }`
    );
    levelCounter++;
    count.innerHTML = levelCounter;
    console.log("sequence matches");
  } else {
    console.log("incorrect pick");
  }
}
// endGame function - handles Quit button function when player wants to quit
function endGame() {
  console.log("game ended");
  gameActive = false;
  //      Set all colors back to original
}

//restore color function - returns button to original color afer flash or player click
function restoreColor() {
  redBtn.style.backgroundColor = "darkred";
  blueBtn.style.backgroundColor = "darkblue";
  yellowBtn.style.backgroundColor = "#ffd11c";
  greenBtn.style.backgroundColor = "darkgreen";
}

// Random sequence generation function
//      A win is defined as 20 matches
//      Array size should be 20

function generateSequence() {
  for (let i = 0; i < 20; i++) {
    gameSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  return;
}

// Function for capturing user selections
// function to evaluate user selection to determine match or error
// Function to highlight color sequence with time interval between colors
// Function to count and display number of correct matches
// Function to display error message for incorrect selection
