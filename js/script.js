"use strict";
// Selecting elements
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");

// Setting the starting point
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const displayCurrentScore = function (result) {
  document.querySelector(`.current--${activePlayer}`).textContent = result;
};

const switchPlayer = function () {
  currentScore = 0;
  displayCurrentScore(currentScore);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./assets/images/dice-${dice}.png`;

    // Check for rolled
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      displayCurrentScore(currentScore);

      // Switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Adding current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Checking if player's score is 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`.color--${activePlayer}`).style.color = "#c7365f";
      diceEl.classList.add("hidden");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
