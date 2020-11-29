let userScore = 0;
let compScore = 0;
let round = 0;
const sliderUserElement = document.querySelector("#slider-user");
const sliderCompElement = document.querySelector("#slider-comp");
const roundElement = document.querySelector("#round");
const rezultElement = document.querySelector("#rezult");
const dialUserElement = document.querySelector("#dial-user > div");
const dialCompElement = document.querySelector("#dial-comp > div");
const choicesElement = document.querySelectorAll(".choice");
const resetElement = document.querySelector("#reset");

function getCompChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

/* Game state */
function win(userChoice, compChoice) {
  round++;
  userScore++;
  roundElement.innerText = `Round:0${round} - You Win!`;
  rezultElement.innerText = `${userChoice} beats ${compChoice}.`;
}

function lose(userChoice, compChoice) {
  round++;
  compScore++;
  roundElement.innerText = `Round:0${round} - You Lose!`;
  rezultElement.innerText = `${compChoice} beats ${userChoice}.`;
}

function draw(userChoice, compChoice) {
  round++;
  roundElement.innerText = `Round:0${round}`;
  rezultElement.innerText = "Draw.";
}

/* Rotate Dial */
function addRotateDialUser(userChoice) {
  removeRotateDialUser();
  dialUserElement.classList.add(`dial-rotate-${userChoice}`);
}

function removeRotateDialUser() {
  dialUserElement.classList.remove("dial-rotate-rock");
  dialUserElement.classList.remove("dial-rotate-paper");
  dialUserElement.classList.remove("dial-rotate-scissors");
}

function addRotateDialComp(compChoice) {
  removeRotateDialComp();
  dialCompElement.classList.add(`dial-rotate-${compChoice}`);
}

function removeRotateDialComp() {
  dialCompElement.classList.remove("dial-rotate-rock");
  dialCompElement.classList.remove("dial-rotate-paper");
  dialCompElement.classList.remove("dial-rotate-scissors");
}

/* Move Slider */
function addMoveSliderUser() {
  switch (userScore) {
    case 1:
      sliderUserElement.classList.add("slider-1");
      break;
    case 2:
      sliderUserElement.classList.add("slider-2");
      break;
    case 3:
      sliderUserElement.classList.add("slider-3");
  }
}

function removeMoveSliderUser() {
  sliderUserElement.classList.remove("slider-1");
  sliderUserElement.classList.remove("slider-2");
  sliderUserElement.classList.remove("slider-3");
}

function addMoveSliderComp() {
  switch (compScore) {
    case 1:
      sliderCompElement.classList.add("slider-1");
      break;
    case 2:
      sliderCompElement.classList.add("slider-2");
      break;
    case 3:
      sliderCompElement.classList.add("slider-3");
  }
}

function removeMoveSliderComp() {
  sliderCompElement.classList.remove("slider-1");
  sliderCompElement.classList.remove("slider-2");
  sliderCompElement.classList.remove("slider-3");
}

/* Game over */
function gameOver() {
  roundElement.innerText = "Game over";
  if (userScore > compScore) {
    rezultElement.innerText = "You win!";
  } else {
    rezultElement.innerText = "You lose!";
  }
}

/* Game round */
function game(e) {
  if (userScore < 3 && compScore < 3) {
    const userChoice = e.currentTarget.id;
    const compChoice = getCompChoice();

    switch (`${userChoice}-${compChoice}`) {
      case "rock-scissors":
      case "paper-rock":
      case "scissors-paper":
        win(userChoice, compChoice);
        break;
      case "rock-paper":
      case "paper-scissors":
      case "scissors-rock":
        lose(userChoice, compChoice);
        break;
      default:
        draw(userChoice, compChoice);
    }

    addRotateDialUser(userChoice);
    addRotateDialComp(compChoice);
    addMoveSliderUser();
    addMoveSliderComp();

    if (userScore == 3 || compScore == 3) {
      gameOver();
    }
  }
}

/* Reset game */
function reset() {
  round = 0;
  userScore = 0;
  compScore = 0;
  removeRotateDialUser();
  removeRotateDialComp();
  removeMoveSliderUser();
  removeMoveSliderComp();
  roundElement.innerText = "Rock, Paper, Scissors...";
  rezultElement.innerText = "Shoot!";
}

/* Main */
function main() {
  choicesElement.forEach((item) => {
    item.addEventListener("click", game);
  });

  resetElement.addEventListener("click", reset);
}

main();
