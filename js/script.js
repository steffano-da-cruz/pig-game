"use strict";
//Selecting elements
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");

//Setting the starting point
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const displayCurrentScore = function (result) {
  document.querySelector(`.current--${activePlayer}`).textContent = result;
};

const displayPlayerScore = function (result) {
  document.querySelector(`.score--${activePlayer}`).textContent = result;
};

const toggleActivePlayer = function (result) {
  document.querySelector(`.player--${activePlayer}`).classList.toggle(result);
};

//Rolling dice functitoggle
btnRoll.addEventListener("click", function () {
  //Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);

  //Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `./assets/images/dice-${dice}.png`;

  //Check for rolled
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    displayCurrentScore(currentScore);

    //Switch to next player
  } else {
    currentScore = 0;
    displayCurrentScore(currentScore);
    toggleActivePlayer("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    toggleActivePlayer("player--active");
  }
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  displayPlayerScore(scores[activePlayer]);
  toggleActivePlayer("player--active");
  currentScore = 0;
  displayCurrentScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  toggleActivePlayer("player--active");
  scores[activePlayer] += currentScore;
  displayPlayerScore(scores[activePlayer]);
});
