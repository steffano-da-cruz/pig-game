"use strict";
// Selecting elements
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const btnNew = document.querySelector(".new-game");
const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");

let scores, currentScore, activePlayer, playing;

// Setting the starting point
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};

init();

const displayCurrentScore = function () {
  document.querySelector(`.current--${activePlayer}`).textContent =
    currentScore;
};

const togglePlayerActive = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

const switchPlayer = function () {
  currentScore = 0;
  displayCurrentScore();
  togglePlayerActive();
  activePlayer = activePlayer === 0 ? 1 : 0;
  togglePlayerActive();
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
      displayCurrentScore();
    } else {
      // Switch to next player
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

// Restart the game
btnNew.addEventListener("click", init);
