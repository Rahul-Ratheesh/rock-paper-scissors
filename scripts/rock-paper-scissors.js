let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlayOn = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlayOn) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlayOn = true;
  } else {
    clearInterval(intervalId);
    isAutoPlayOn = false;
  }

}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === "rock") {
    if (computerMove === 'rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'paper') {
      result = 'You lose.';
    }
    else if (computerMove === 'scissors') {
      result = 'You won.';
    }
  } else if (playerMove === "paper") {
    if (computerMove === 'rock') {
      result = 'You won.';
    }
    else if (computerMove === 'paper') {
      result = 'Tie.';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === "scissors") {
    if (computerMove === 'rock') {
      result = 'You lose.';
    }
    else if (computerMove === 'paper') {
      result = 'You won.';
    }
    else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You won.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `${result}`;

  document.querySelector('.js-moves')
    .innerHTML = `<img class="hand-icon-player" src="images/${playerMove}.png" alt="${playerMove}">
      <img class="hand-icon-computer" src="images/computer_${computerMove}.png" alt="${computerMove}">`;

  updateScoreElement();

}

function updateScoreElement() {
  document.querySelector('.js-scores')
    .innerHTML = `Wins: ${score.wins}
                  Losses: ${score.losses}
                  Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}