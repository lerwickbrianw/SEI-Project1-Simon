let gameSequence = []; // array for the random sequence
let playerSequence = []; // array for the player sequence
let gameActive = false; //varible to track if game is active
let levelCounter = 0; //variable to track levels'
let computerTurn; //variable to track who is playing
let match = false; //variable to track if player selection matches for the round
let sequenceNumber = 0; //variable to iterate through the sequence each round
let eventTimer; // variable for setInterval
let easy = true; //variable for initial difficulty level
let highScore = 0; //variable to track high score
// let lowTime = 0; //variable to track lowest time achieved;
let retry = 1; //variable to track retries for easy mode;

//HTML Selectors
const startGameBtn = document.querySelector("#startGameBtn");
const endGameBtn = document.querySelector("#endGameBtn");
const redBtn = document.querySelector(".cell-red");
const blueBtn = document.querySelector(".cell-blue");
const yellowBtn = document.querySelector(".cell-yellow");
const greenBtn = document.querySelector(".cell-green");
const count = document.querySelector(".value");
const difficulty = document.querySelector("#myonoffswitch");
//Console lots for selector tests
// console.log(startGameBtn);
// console.log(endGameBtn);
// console.log(redBtn);
// console.log(blueBtn);
// console.log(yellowBtn);
// console.log(greenBtn);

//event listener for the difficulty level switch
difficulty.addEventListener("click", (event) => {
  if (difficulty.checked == true) {
    easy = true;
  } else {
    easy = false;
  }
  console.log(easy);
});

//display beginning level
count.innerHTML = levelCounter;

//Event listener for Start Game button - executes playGame function
startGameBtn.addEventListener("click", (event) => {
  //   console.log("startGameBtn");
  playGame();
});

//Event listener for End Game button - executes endGame function
endGameBtn.addEventListener("click", (event) => {
  endGame();
});

// Event Listener for red button
redBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // console.log("red clicked");
    // push 1 into player sequence array
    playerSequence.push(1);
    // console.log(playerSequence);
    //call red button function to flash color
    red();
    checkMatch();
  }
});
// Event Listener for blue button
blueBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // console.log("blue clicked");
    // push 2 into player sequence array
    playerSequence.push(2);
    // console.log(playerSequence);
    //call blue button function to flash color
    blue();
    checkMatch();
  }
});
// Event Listener for yellow button
yellowBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // console.log("yellow clicked");
    // push 3 into player sequence array
    playerSequence.push(3);
    // console.log(playerSequence);
    //call yellow button function to flash color
    yellow();
    checkMatch();
  }
});
// Event Listener for green button
greenBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // console.log("green clicked");
    // push 4 into player sequence array
    playerSequence.push(4);
    // console.log(playerSequence);
    //call green button function to flash color
    green();
    checkMatch();
  }
});

//function for events when red button is pressed
function red() {
  //   console.log("red function");
  redBtn.style.backgroundColor = "rgb(248,1,1)";
  let audio = document.getElementById("redBtnSound");
  audio.play();
  //return red button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 500);
}

//function for events when blue button is pressed
function blue() {
  //   console.log("bluefunction");
  blueBtn.style.backgroundColor = "rgb(1,1,250)";
  let audio = document.getElementById("blueBtnSound");
  audio.play();
  //return blue button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 500);
}

//function for events when yellow button is pressed
function yellow() {
  //   console.log("yellow function");
  yellowBtn.style.backgroundColor = "rgb(255,255,1)";
  let audio = document.getElementById("yellowBtnSound");
  audio.play();
  //return yellow button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 500);
}

//function for events when green button is pressed
function green() {
  //   console.log("green function");
  greenBtn.style.backgroundColor = "rgb(1,255,1)";
  let audio = document.getElementById("greenBtnSound");
  audio.play();
  //return green button to unlit color
  setTimeout(() => {
    restoreColor();
  }, 500);
}

// playGame function - set up game to start
function playGame() {
  clearInterval(eventTimer);
  gameSequence = [];
  playerSequence = [];
  //   console.log("playGame function");
  generateSequence();
  console.log(gameSequence);
  gameActive = true;
  computerTurn = true;
  levelCounter = 0;
  count.innerHTML = levelCounter;
  //   console.log(`gameActive ${gameActive}`);
  console.log("i'm done here now. the game is ready to play");
  //   gameRound();
  eventTimer = setInterval(gameRound, 800);
}

// gameRound function - controls events for each round
function gameRound() {
  console.log("function gameRound");
  document.querySelector(".errormsg").innerHTML = "";
  if (highScore <= levelCounter) {
    highScore = levelCounter;
    document.querySelector(".highScoreValue").innerHTML = highScore;
  }
  if (levelCounter < 20) {
    clearInterval(eventTimer);
    //   console.log(gameSequence);
    if (highScore <= levelCounter) {
      highScore = levelCounter;
      document.querySelector(".highScoreValue").innerHTML = highScore;
    }

    levelCounter++;
    // console.log(`level is ${levelCounter}`);
    count.innerHTML = levelCounter;
    sequenceNumber = levelCounter;
    //   console.log(`sequencenumber is ${sequenceNumber}`);
    for (let i = 0; i < sequenceNumber; i++) {
      // if (computerTurn) {
      // console.log(computerTurn);
      // console.log(`i=${i}`);
      setTimeout(() => {
        if (gameSequence[i] == 1) {
          // console.log("calling red");
          red();
        } else if (gameSequence[i] == 2) {
          // console.log("calling blue");
          blue();
        } else if (gameSequence[i] == 3) {
          // console.log("calling yellow");
          yellow();
        } else if (gameSequence[i] == 4) {
          // console.log("calling green");
          green();
        }
      }, 1000 * i);
      // console.log(`computer sequence number is ${i}`);
      // }
      console.log("computer is done, players turn");
      computerTurn = false;
      playerSequence = [];
    }
    sequenceNumber = 1;
  } else {
    document.querySelector(".errormsg").innerHTML =
      "Congrats!  You won the game!";
    let audio = document.getElementById("gameWinSound");
    audio.play();
    gameActive = false;
    console.log(gameActive);
  }
}

// check match function
function checkMatch() {
  //   console.log("checkMatch function");
  //   console.log(`seq no = ${sequenceNumber}`);
  //   console.log(`player sequenceNumber is ${i}`);
  if (gameSequence[sequenceNumber - 1] === playerSequence[sequenceNumber - 1]) {
    // console.log(
    //   ` computer ${gameSequence[sequenceNumber - 1]} player ${
    //     playerSequence[sequenceNumber - 1]
    //   }`
    // );
    match = true;
    retry = 1;
    // console.log(`player sequence no ${sequenceNumber}`);

    if (sequenceNumber === levelCounter) {
      //   console.log("sequence matches end of players turn and end of round");
      computerTurn = true;
      sequenceNumber = 0;
      //   gameRound();
      eventTimer = setInterval(gameRound, 800);
    } else {
      sequenceNumber++;
      //   console.log(`player sequence is ${sequenceNumber}`);
    }
  } else {
    let audio = document.getElementById("wrongSound");
    audio.play();
    console.log("incorrect pick time to start over");
    if (easy == true && retry <= 3) {
      document.querySelector(".errormsg").innerHTML = "Sorry, try again!";
      console.log(retry);
      retry++;
      levelCounter--;
      sequenceNumber = 0;
      eventTimer = setInterval(gameRound, 2000);
    } else {
      document.querySelector(".errormsg").innerHTML = "Sorry, game over";
      eventTimer = setInterval(endGame, 2000);
    }
  }
}
// endGame function - handles Quit button function when player wants to quit
function endGame() {
  console.log("game ended");

  gameActive = false;
}

//restore color function - returns button to original color afer flash or player click
function restoreColor() {
  //   console.log("restoreColor function");
  redBtn.style.backgroundColor = "darkred";
  blueBtn.style.backgroundColor = "darkblue";
  yellowBtn.style.backgroundColor = "#ffd11c";
  greenBtn.style.backgroundColor = "darkgreen";
}

// Random sequence generation function - Array size should be 20
function generateSequence() {
  //   console.log("generateSequence function");
  for (let i = 0; i < 20; i++) {
    gameSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  return;
}
