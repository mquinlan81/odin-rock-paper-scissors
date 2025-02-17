const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close-btn');
const startGameBtn = document.querySelector('#start-game-btn');
const modalContent = document.querySelector('#modal-content');
const roundBtns = document.querySelectorAll('#round-btn');
const playerNameInput = document.querySelector('#player-name-input');
const resultContainer = document.querySelector('#result-container');
const resultText = document.querySelector('#result-text');
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

let choices = ['Rock', 'Paper', 'Scissors'];
let choiceImg = ['🪨', '🧻', '✂️'];

let round = 0;
// let playerChoice;

playerScore = 0;
computerScore = 0;

roundBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    roundBtns.forEach((btn) => {
      btn.classList.remove('selected');
    });
    btn.classList.add('selected');
  });
});

startGameBtn.addEventListener('click', () => {
  let playerName = playerNameInput.value;

  roundBtns.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      let roundsToPlay = btn.textContent;
      playGame(playerName, roundsToPlay);
    }
  });
  modal.style.display = 'none';
});

function playGame(playerName, rounds) {
  console.log(playerName);
  console.log(rounds);
  setPlayerName(playerName);
  playRound(playerName);
}

function playRound(playerName) {
  selectBtns.forEach((element) => {
    element.addEventListener('click', (e) => {
      let playerChoice = element.innerText;
      let choiceIndex = choices.indexOf(playerChoice);
      playerSelectionImg.innerText = choiceImg[choiceIndex];
      resultContainer.appendChild(resultText);
      let computerChoice = getComputerChoice();
      getWinner(playerName, playerChoice, computerChoice);
    });
  });
}

function getComputerChoice() {
  let random = Math.round(Math.random() * 2);
  let computerChoice = choices[random];
  let compChoiceIndex = choices.indexOf(computerChoice);
  computerSelectionImg.innerText = choiceImg[compChoiceIndex];
  return computerChoice;
}

function getWinner(name, player, computer) {
  if (player === computer) {
    // round++;
    resultText.textContent = "It's a tie";
  } else if (
    (player == 'Rock' && computer == 'Paper') ||
    (player == 'Paper' && computer == 'Scissors') ||
    (player == 'Scissors' && computer == 'Rock')
  ) {
    round++;
    computerScore++;
    console.log(
      `Round ${round} | Player ${playerScore} | Computer ${computerScore}`
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
    console.log(
      `Round ${round} | Player ${playerScore} | Computer ${computerScore}`
    );
    updateScoreboard();
    resultText.textContent = `${name} Wins!`;
  }
}

function updateScoreboard() {
  playerScoreTxt.textContent = playerScore;
  computerScoreTxt.textContent = computerScore;
}

function setPlayerName(playerName) {
  document.querySelector('#player-name-txt').textContent = playerName;
  document.querySelector(
    '#player-score-title'
  ).textContent = `${playerName}'s Score`;
}
