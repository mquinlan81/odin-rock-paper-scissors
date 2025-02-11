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

let playerName = prompt('What is your name?');
playerScoreTitle.textContent = playerName;
playerNameTxt.textContent = playerName;

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
    console.log(computerChoice);
    console.log(playerChoice, computerChoice);
    playRound(playerChoice, computerChoice);
  });
});

function getComputerChoice() {
  let random = Math.round(Math.random() * 2);
  let computerChoice = choices[random];
  let compChoiceIndex = choices.indexOf(computerChoice);
  computerSelectionImg.innerText = choiceImg[compChoiceIndex];
  return computerChoice;
}

function playRound(player, computer) {
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
