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
  // console.log(playerName);
  // console.log(rounds);
  setPlayerName(playerName);
  playRound(playerName, rounds);
}

function playRound(playerName, rounds) {
  selectBtns.forEach((element) => {
    element.addEventListener('click', (e) => {
      let playerChoice = element.innerText;
      let choiceIndex = choices.indexOf(playerChoice);
      playerSelectionImg.innerText = choiceImg[choiceIndex];
      resultContainer.appendChild(resultText);
      let computerChoice = getComputerChoice();
      getWinner(playerName, playerChoice, computerChoice, rounds);
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

function getWinner(name, player, computer, rounds) {
  if (player === computer) {
    resultText.textContent = "It's a tie";
  } else if (
    (player == 'Rock' && computer == 'Paper') ||
    (player == 'Paper' && computer == 'Scissors') ||
    (player == 'Scissors' && computer == 'Rock')
  ) {
    round++;
    computerScore++;
    updateScoreboard();
    resultText.textContent = 'Computer Wins!';
    if (computerScore > rounds / 2) {
      endGame('computer', playerScore, computerScore);
    }
  } else if (
    (player == 'Rock' && computer == 'Scissors') ||
    (player == 'Paper' && computer == 'Rock') ||
    (player == 'Scissors' && computer == 'Paper')
  ) {
    round++;
    playerScore++;
    updateScoreboard();
    resultText.textContent = `${name} Wins!`;
    if (playerScore > rounds / 2) {
      endGame(name, playerScore, computerScore);
    }
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

function endGame(playerName, playerScore, computerScore) {
  if (playerName === 'computer') {
    document.querySelector('#modal-header-text').textContent = `
    Computer wins! | ${computerScore} - ${playerScore}
    `;
  } else {
    document.querySelector('#modal-header-text').textContent = `
    ${playerName} wins! | ${playerScore} - ${computerScore}
    `;
  }
  modal.style.display = 'flex';
  document.querySelector('#modal-content').innerHTML = `
  <button id='play-again' class='play again' onclick='playAgain'>Play Again</button>
  `;
}

function playAgain() {
  window.location.reload();
}
