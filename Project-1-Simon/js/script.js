let gameSequence = []; // array for the random sequence
let playerSequence = []; // array for the player sequence

//HTML Selectors
const newGameBtn = document.querySelector("newGameBtn");
const endGameBtn = document.querySelector("endGameBtn");

// Start new game function
//      Clear any stored sequences from previous game
//  	Call random sequence generation
// End game function
//      Set all colors back to original
// Random sequence generation function
//      A win is defined as 20 matches
//      Array size should be 20
generateSequence();
function generateSequence() {
  for (let i = 0; i < 20; i++) {
    gameSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  return;
}
console.log(gameSequence);
// Function for capturing user selections
// function to evaluate user selection to determine match or error
// Function to highlight color sequence with time interval between colors
// Function to count and display number of correct matches
// Function to display error message for incorrect selection
