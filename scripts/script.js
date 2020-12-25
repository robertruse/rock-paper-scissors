let userScore = 0;
let compScore = 0;
let round = 0;
const sliderUserElement = document.querySelector("#slider-user");
const sliderCompElement = document.querySelector("#slider-comp");
const roundElement = document.querySelector("#round");
const rezultElement = document.querySelector("#rezult");
const dialUserElement = document.querySelector("#dial-user > div");
const dialCompElement = document.querySelector("#dial-comp > div");
const choiceElements = document.querySelectorAll(".choice");
const resetElement = document.querySelector("#reset");
const dialIconUserElements = document.querySelectorAll(
  ".container-icons-user .dial-icon"
);
const dialIconCompElements = document.querySelectorAll(
  ".container-icons-comp .dial-icon"
);

/* Generate computer choice */
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

function setGameState(userChoice, compChoice) {
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
}

/* Rotate Dial */
function addRotateDial(dialElement, choice) {
  removeRotateDial(dialElement);
  dialElement.classList.add(`dial-rotate-${choice}`);
}

function removeRotateDial(dialElement) {
  dialElement.classList.remove(
    "dial-rotate-rock",
    "dial-rotate-paper",
    "dial-rotate-scissors"
  );
}

/* Change dial icon color */
function addDialIconColor(dialIconElements, choice) {
  removeIconColor(dialIconElements);
  dialIconElements.forEach((item) => {
    if (item.id !== `icon-${choice}`) return;
    item.classList.add("icon-color");
  });
}

function removeIconColor(dialIconElements) {
  dialIconElements.forEach((item) => {
    item.classList.remove("icon-color");
  });
}

/* Move Slider */
function addMoveSlider(sliderElement, score) {
  switch (score) {
    case 1:
      sliderElement.classList.add("slider-1");
      break;
    case 2:
      sliderElement.classList.add("slider-2");
      break;
    case 3:
      sliderElement.classList.add("slider-3");
  }
}

function removeMoveSlider(sliderElement) {
  sliderElement.classList.remove("slider-1", "slider-2", "slider-3");
}

/* Game over */
function gameOver() {
  roundElement.innerText =
    userScore > compScore ? "Game over - You win!" : "Game over - You lose!";
}

/* Game round */
function game(e) {
  if (userScore >= 3 || compScore >= 3) return;
  const userChoice = e.currentTarget.id;
  const compChoice = getCompChoice();
  setGameState(userChoice, compChoice);
  addDialIconColor(dialIconUserElements, userChoice);
  addDialIconColor(dialIconCompElements, compChoice);
  addRotateDial(dialUserElement, userChoice);
  addRotateDial(dialCompElement, compChoice);
  addMoveSlider(sliderUserElement, userScore);
  addMoveSlider(sliderCompElement, compScore);
  if (userScore == 3 || compScore == 3) {
    gameOver();
  }
}

/* Reset game */
function reset() {
  round = 0;
  userScore = 0;
  compScore = 0;
  removeIconColor(dialIconUserElements);
  removeIconColor(dialIconCompElements);
  removeRotateDial(dialUserElement);
  removeRotateDial(dialCompElement);
  removeMoveSlider(sliderUserElement);
  removeMoveSlider(sliderCompElement);
  roundElement.innerText = "Rock, Paper, Scissors...";
  rezultElement.innerText = "Shoot!";
}

/* Main */
function main() {
  choiceElements.forEach((item) => {
    item.addEventListener("click", game);
  });
  resetElement.addEventListener("click", reset);
}

main();
