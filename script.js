'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number 🌟!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 5; // trzeba stworzyć zmienną żeby mieć punkt wyjścia i nie polegać na DOM
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const lost = function () {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // oscillator.type = 'sine';
  // oscillator.frequency.value = 440;

  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0.5, now);
  gainNode.gain.exponentialRampToValueAtTime(9, now);

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(490, audioContext.currentTime + 0.2);
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.3);
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.4);
  oscillator.frequency.setValueAtTime(360, audioContext.currentTime + 0.5);
  oscillator.frequency.setValueAtTime(340, audioContext.currentTime + 0.6);
  oscillator.frequency.setValueAtTime(320, audioContext.currentTime + 0.7);
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.8);
  oscillator.frequency.setValueAtTime(280, audioContext.currentTime + 0.9);
  oscillator.frequency.setValueAtTime(260, audioContext.currentTime + 1);
  oscillator.start(now);
  oscillator.stop(now + 1.3);
};
const win = function () {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.value = 440;

  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0.5, now);
  gainNode.gain.exponentialRampToValueAtTime(0.11, now + 5);

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(640, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(700, audioContext.currentTime + 0.4);
  // oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 1.2);
  // oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 1.4);
  oscillator.start(now);
  oscillator.stop(now + 0.9);
};
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    //    document.querySelector('.message').textContent = '⛔ No number!';
    displayMessage('⛔ No number!');
    // When player wins
  } else if (guess === secretNumber) {
    //document.querySelector('.message').textContent = 'Correct Number 🌟!';
    displayMessage('Correct Number 🌟!');
    document.querySelector('.number').textContent = secretNumber;

    win();

    document.querySelector('body').style.backgroundColor = '#28f821';
    document.querySelector('.number').style.width = '50rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      //document.querySelector('.message').textContent =
      //guess > secretNumber ? '⬆ Too high!' : '⬆ Too low!';
      displayMessage(guess > secretNumber ? '⬆ Too high!' : '⬆ Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //document.querySelector('.message').textContent = '☠ You lost the game!';
      displayMessage('☠ You lost the game!');
      document.querySelector('.score').textContent = 0;
      lost();
    }
  }
  // When guess is too high
  //   else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '⬆ Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '☠ You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //     //lost();
  //   }
  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '⬆ Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '☠ You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //     //lost();
  //   }
  // }
});

// const mojNumer = Math.trunc(Math.random() * 15555);
// console.log(mojNumer);
//document.querySelector('.testowy')

document.querySelector('.again').addEventListener('click', function () {
  //window.location.reload(); nie można użyć przeładowania strony, aby nie skasować danych o highscore,

  score = 5;
  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  //document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
