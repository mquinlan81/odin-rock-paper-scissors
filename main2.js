// Create game with best of so many (make user choose how many wins)
let round = 0;
let computerCount = 0;
let playerCount = 0;

let playerName = prompt("Let's play rock, paper, scissors! What is your name?");

playGame();

//---------------------------------------------------
function playGame() {
  while (playerCount !== 3 && computerCount !== 3) {
    if (round === 0) {
      let playerNumber = prompt(`
        Hello, ${playerName}! 
        You will be playing against the computer.
        Rock beats scissors, scissors beats paper, and paper beats rock.
        Please enter 1 for Rock, 2 for Paper, or 3 for Scissors.
        Good luck!
        Enter your choice:`);
      let playerChoice = getChoice(playerNumber - 1);
      playRound(playerChoice);
    } else {
      let playerNumber = prompt(`
        Enter your choice:
        Rock - 1, Paper - 2, Scissors - 3`);
      let playerChoice = getChoice(playerNumber - 1);
      playRound(playerChoice);
    }
  }
  if (playerCount === 3) {
    console.log(`Player Wins!
      Scoreboard: Player - ${playerCount} | Computer - ${computerCount}`);
  } else {
    console.log(`
      Computer Wins!
      Scoreboard: ${playerName} - ${playerCount} | Computer - ${computerCount}`);
  }
  return;
}

// ---------------------------------------------------
function playRound(playerChoice) {
  let computerChoice = getComputerChoice();
  let winner = getWinner(playerChoice, computerChoice);

  console.log(`
    Round: ${round} 
    You chose ${playerChoice}.
    Computer chose ${computerChoice}.
    ${winner}
    Scoreboard: ${playerName} - ${playerCount} | Computer - ${computerCount}`);
}

// ---------------------------------------------------
function getComputerChoice() {
  let random = Math.round(Math.random() * 2);
  let computerChoice = getChoice(random);
  return computerChoice;
}

// ----------------------------------------------------
function getWinner(player, computer) {
  if (player === computer) {
    round++;
    return "It's a tie";
  } else if (
    (player == 'rock' && computer == 'paper') ||
    (player == 'paper' && computer == 'scissors') ||
    (player == 'scissors' && computer == 'rock')
  ) {
    round++;
    computerCount++;
    return 'Computer Wins!';
  } else if (
    (player == 'rock' && computer == 'scissors') ||
    (player == 'paper' && computer == 'rock') ||
    (player == 'scissors' && computer == 'paper')
  ) {
    round++;
    playerCount++;
    return `${playerName} Wins!`;
  }
}

// ------------------------------------------------
function getChoice(x) {
  switch (x) {
    case 0:
      return 'rock';
      break;
    case 1:
      return 'paper';
      break;
    case 2:
      return 'scissors';
      break;
  }
}

// ______UI Code___________________

const resultContainer = document.querySelector('#result-container');
const resultText = document.querySelector('#result-text');
const playerNameTxt = document.querySelector('#player-name');
const playerSelectionImg = document.querySelector('#player-selection-img');
const computerSelectionImg = document.querySelector('#computer-selection-img');
const selectBtns = Array.from(document.querySelectorAll('.select-btn'));
const playerSelectionDisplay = document.querySelector(
  '#player-selection-display'
);
const computerSelectionDisplay = document.querySelector(
  '#computer-selection-display'
);
let playerScoreTxt = document.querySelector('#player-score');
let computerScoreTxt = document.querySelector('#computer-score');
let playerScoreTitle = document.querySelector('#player-score-title');

let choices = ['Rock', 'Paper', 'Scissors'];
let choiceImg = ['🪨', '🧻', '✂️'];

// let playerName = prompt('What is your name?');
// playerScoreTitle.textContent = playerName;
// playerNameTxt.textContent = playerName;

let round = 0;
let playerChoice;

playerScore = 0;
computerScore = 0;

selectBtns.forEach((element) => {
  element.addEventListener('click', (e) => {
    playerChoice = element.innerText;
    let choiceIndex = choices.indexOf(playerChoice);
    playerSelectionImg.innerText = choiceImg[choiceIndex];
    resultContainer.appendChild(resultText);
    let computerChoice = getComputerChoice();
    getWinner(playerChoice, computerChoice);
    console.log(round);
  });
});

function getComputerChoice() {
  let random = Math.round(Math.random() * 2);
  let computerChoice = choices[random];
  let compChoiceIndex = choices.indexOf(computerChoice);
  computerSelectionImg.innerText = choiceImg[compChoiceIndex];
  return computerChoice;
}

function getWinner(player, computer) {
  if (player === computer) {
    round++;
    resultText.textContent = "It's a tie";
  } else if (
    (player == 'Rock' && computer == 'Paper') ||
    (player == 'Paper' && computer == 'Scissors') ||
    (player == 'Scissors' && computer == 'Rock')
  ) {
    round++;
    computerScore++;
    console.log(
      `Round ${round} | player ${playerScore} | Computer ${computerScore}`
    );
    updateScoreboard();
    resultText.textContent = 'Computer Wins!';
  } else if (
    (player == 'Rock' && computer == 'Scissors') ||
    (player == 'Paper' && computer == 'Rock') ||
    (player == 'Scissors' && computer == 'Paper')
  ) {
    round++;
    playerScore++;
    console.log(`player ${playerScore} | Computer ${computerScore}`);
    updateScoreboard();
    resultText.textContent = `${playerName} Wins!`;
  }
}

function updateScoreboard() {
  playerScoreTxt.textContent = playerScore;
  computerScoreTxt.textContent = computerScore;
}
