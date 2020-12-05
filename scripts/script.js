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
const dialIconsUserElement = document.querySelectorAll(
  ".container-icons-user .dial-icon"
);
const dialIconsCompElement = document.querySelectorAll(
  ".container-icons-comp .dial-icon"
);

function getCompChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

/* Generate winnig message */

function generateMessage(winningChoice) {
  let message = "";
  switch (winningChoice) {
    case "rock":
      message = "Rock smashes scissors.";
      break;
    case "paper":
      message = "Paper covers rock.";
      break;
    case "scissors":
      message = "Scissors cuts papper.";
  }
  return message;
}

/* Game state */
function win(userChoice) {
  round++;
  userScore++;
  roundElement.innerText = `Round:0${round} - You Win!`;
  rezultElement.innerText = generateMessage(userChoice);
}

function lose(compChoice) {
  round++;
  compScore++;
  roundElement.innerText = `Round:0${round} - You Lose!`;
  rezultElement.innerText = generateMessage(compChoice);
}

function draw(userChoice, compChoice) {
  round++;
  roundElement.innerText = `Round:0${round} - Draw.`;
  rezultElement.innerText = `${userChoice} ties ${compChoice}.`;
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

/* Add dial icon color */
function addDialIconColorUser(userChoice) {
  removeIconColorUser();
  dialIconsUserElement.forEach((item) => {
    if (item.id === `icon-${userChoice}`) {
      item.classList.add("icon-color");
    }
  });
}

function removeIconColorUser() {
  dialIconsUserElement.forEach((item) => {
    item.classList.remove("icon-color");
  });
}

function addDialIconColorComp(compChoice) {
  removeIconColorComp();
  dialIconsCompElement.forEach((item) => {
    if (item.id === `icon-${compChoice}`) {
      item.classList.add("icon-color");
    }
  });
}

function removeIconColorComp() {
  dialIconsCompElement.forEach((item) => {
    item.classList.remove("icon-color");
  });
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

function gameOver() {
  if (userScore > compScore) {
    roundElement.innerText = "Game over - You win!";
  } else {
    roundElement.innerText = "Game over - You lose!";
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
        win(userChoice);
        break;
      case "rock-paper":
      case "paper-scissors":
      case "scissors-rock":
        lose(compChoice);
        break;
      default:
        draw(userChoice, compChoice);
    }

    addDialIconColorUser(userChoice);
    addDialIconColorComp(compChoice);
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
  removeIconColorUser();
  removeIconColorComp();
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
