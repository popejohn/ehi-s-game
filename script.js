let score = 0;
let level = 1;
let lives = 3;
let timeLeft = 45;
let correctStreak = 0;
let timer;
let isPaused = false;
let currentAnswer;

function startGame() {
  resetGame();
  nextQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  if (!isPaused) {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
    } else {
      handleIncorrect();
    }
  }
}

function togglePausePlay() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timer);
    document.getElementById("pausePlayButton").innerText = "Play";
  } else {
    startTimer();
    document.getElementById("pausePlayButton").innerText = "Pause";
  }
}

function nextQuestion() {
  let num1 = Math.floor(Math.random() * 100) + 1;
  let num2 = Math.floor(Math.random() * 20) + 1;
  let isMultiply = Math.random() > 0.5;

  currentAnswer = isMultiply ? num1 * num2 : Math.floor(num1 / num2);
  document.getElementById("question").innerText = isMultiply
    ? `${num1} × ${num2} = ?`
    : `${num1} ÷ ${num2} = ?`;

  let options = [
    currentAnswer,
    currentAnswer + 2,
    currentAnswer - 3,
    currentAnswer + 5,
  ];
  options.sort(() => Math.random() - 0.5);

  document.getElementById("options").innerHTML = options
    .map(
      (option) => `<button onclick="checkAnswer(${option})">${option}</button>`
    )
    .join("");
}

function checkAnswer(answer) {
  if (answer === currentAnswer) {
    score += 5;
    correctStreak++;
    if (correctStreak % 10 === 0) level++;
    document.getElementById("feedback").innerText = "✅ Correct!";
  } else {
    handleIncorrect();
  }
  updateUI();
  nextQuestion();
}

function handleIncorrect() {
  lives--;
  score -= 5;
  if (lives <= 0) resetGame();
}

function updateUI() {
  document.getElementById("score").innerText = score;
  document.getElementById("lives").innerText = lives;
  document.getElementById("level").innerText = level;
}

function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  timeLeft = 45;
  updateUI();
  nextQuestion();
}

function endGame() {
  alert(`Game Over! Final Score: ${score}`);
  resetGame();
}
