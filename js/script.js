let gameSequence = []; // array for the random sequence
let playerSequence = []; // array for the player sequence
let gameActive = false; //varible to track if game is active
let levelCounter = 0; //variable to track levels'
let computerTurn; //variable to track who is playing
let match = false; //variable to track if player selection matches for the round
let sequenceNumber = 0; //variable to iterate through the sequence each round
let eventTimer; // variable for setInterval
let easy = true; //variable for initial difficulty level
let on = false; // variable for power switch status
let highScore; //variable to track high score
let retry = 1; //variable to track retries for easy mode;

//HTML Selectors
const startGameBtn = document.querySelector("#startGameBtn");
const endGameBtn = document.querySelector("#endGameBtn");
const redBtn = document.querySelector(".cell-red");
const blueBtn = document.querySelector(".cell-blue");
const yellowBtn = document.querySelector(".cell-yellow");
const greenBtn = document.querySelector(".cell-green");
const count = document.querySelector(".currentlevel");
const difficulty = document.querySelector("#mydiffswitch");
const powerOn = document.querySelector("#myonoffswitch");

//check for sessionStorage variable to be undefined and set to 0 if true
if (sessionStorage.getItem("highLevel", highScore) === undefined) {
  highScore = 0;
} else {
  highScore = sessionStorage.getItem("highLevel", highScore);
}

//event listener for the difficulty level switch
difficulty.addEventListener("click", (event) => {
  if (difficulty.checked == true) {
    easy = true;
  } else {
    easy = false;
  }
});

//event listener for the power switch
powerOn.addEventListener("click", (event) => {
  if (powerOn.checked == true) {
    on = true;
    //display beginning level
    document.querySelector("#countDisplay").style.backgroundColor = "red";
    document.querySelector("#levelDisplay").style.backgroundColor = "red";
    document.querySelector("#startGameBtn").style.backgroundColor = "red";
    red();
    setTimeout(() => {
      blue();
    }, 400);
    setTimeout(() => {
      green();
    }, 800);
    // green();
    setTimeout(() => {
      yellow();
    }, 1200);
    count.innerHTML = 0;
    document.querySelector(".highlevel").innerHTML = sessionStorage.getItem(
      "highLevel",
      highScore
    );
  } else {
    on = false;
    document.querySelector("#countDisplay").style.backgroundColor = "darkred";
    document.querySelector("#levelDisplay").style.backgroundColor = "darkred";
    document.querySelector("#startGameBtn").style.backgroundColor = "darkred";
    count.innerHTML = "--";
    startGameBtn.style.backgroundColor = "red";
    gameActive = false;
  }
});

//Event listener for Start Game button - executes playGame function
startGameBtn.addEventListener("click", (event) => {
  if (on && !gameActive) {
    startGameBtn.style.backgroundColor = "green";
    gameActive = true;
    playGame();
  }
});

// Event Listener for red button
redBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // push 1 into player sequence array
    playerSequence.push(1);
    //call red button function to flash color
    red();
    checkMatch();
  }
});
// Event Listener for blue button
blueBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // push 2 into player sequence array
    playerSequence.push(2);
    //call blue button function to flash color
    blue();
    checkMatch();
  }
});
// Event Listener for yellow button
yellowBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // push 3 into player sequence array
    playerSequence.push(3);
    //call yellow button function to flash color
    yellow();
    checkMatch();
  }
});
// Event Listener for green button
greenBtn.addEventListener("click", (event) => {
  if (gameActive && !computerTurn) {
    // push 4 into player sequence array
    playerSequence.push(4);
    //call green button function to flash color
    green();
    checkMatch();
  }
});

//function for events when red button is pressed
function red() {
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
  if (gameActive) {
    gameSequence = [];
    playerSequence = [];
    generateSequence();
    computerTurn = true;
    levelCounter = 0;
    count.innerHTML = levelCounter;
    eventTimer = setInterval(gameRound, 800);
  } else {
  }
}

// gameRound function - controls events for each round
function gameRound() {
  if (highScore <= levelCounter) {
    highScore = levelCounter;
    document.querySelector(".highlevel").innerHTML = highScore;
    sessionStorage.setItem("highLevel", highScore);
  }
  if (levelCounter < 20) {
    clearInterval(eventTimer);
    levelCounter++;
    count.innerHTML = levelCounter;
    sequenceNumber = levelCounter;
    for (let i = 0; i < sequenceNumber; i++) {
      setTimeout(() => {
        if (gameSequence[i] == 1) {
          red();
        } else if (gameSequence[i] == 2) {
          blue();
        } else if (gameSequence[i] == 3) {
          yellow();
        } else if (gameSequence[i] == 4) {
          green();
        }
      }, 1000 * i);
      computerTurn = false;
      playerSequence = [];
    }
    sequenceNumber = 1;
  } else {
    let audio = document.getElementById("gameWinSound");
    audio.play();
    startGameBtn.style.backgroundColor = "red";
    count.innerHTML = "--";
    gameActive = false;
    clearInterval(eventTimer);
  }
}

// check match function
function checkMatch() {
  if (gameSequence[sequenceNumber - 1] === playerSequence[sequenceNumber - 1]) {
    match = true;
    retry = 1;

    if (sequenceNumber === levelCounter) {
      computerTurn = true;
      sequenceNumber = 0;
      eventTimer = setInterval(gameRound, 1500);
    } else {
      sequenceNumber++;
    }
  } else {
    let audio = document.getElementById("wrongSound");
    audio.play();
    if (easy == true && retry <= 3) {
      retry++;
      levelCounter--;
      sequenceNumber = 0;
      eventTimer = setInterval(gameRound, 2000);
    } else {
      startGameBtn.style.backgroundColor = "red";
      count.innerHTML = "--";
      gameActive = false;
      eventTimer = setInterval(playGame, 2000);
    }
  }
}

//restore color function - returns button to original color afer flash or player click
function restoreColor() {
  redBtn.style.backgroundColor = "darkred";
  blueBtn.style.backgroundColor = "darkblue";
  yellowBtn.style.backgroundColor = "#ffd11c";
  greenBtn.style.backgroundColor = "darkgreen";
}

// Random sequence generation function - Array size should be 20
function generateSequence() {
  for (let i = 0; i < 20; i++) {
    gameSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  return;
}
