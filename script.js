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
    timeLeft = 45; // Reset timer to 45 seconds for each question
    let isMultiply = Math.random() > 0.5;
    let num1, num2;
  
    if (isMultiply) {
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 15) + 1;
      currentAnswer = num1 * num2;
      document.getElementById("question").innerText = `${num1} × ${num2} = ?`;
    } else {
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      currentAnswer = num1 / num2;
      document.getElementById("question").innerText = `${num1} ÷ ${num2} = ?`;
    }
  
    let options = [
      currentAnswer,
      currentAnswer + Math.floor(Math.random() * 5) + 1,
      currentAnswer - Math.floor(Math.random() * 5) - 1,
      currentAnswer + Math.floor(Math.random() * 10) + 2
    ];
    options = [...new Set(options)];
    options.sort(() => Math.random() - 0.5);
  
    document.getElementById("options").innerHTML = options
      .map(option => `<button onclick="checkAnswer(${option})">${option}</button>`)
      .join('');
  }

  function checkAnswer(answer) {
    if (answer === currentAnswer) {
      score += 5;
      correctStreak++;
      correctSound.play(); // ✅ Play correct sound
      showFeedback("✅ Correct!", "green");
  
      if (correctStreak % 10 === 0) {
        level++;
        levelUpSound.play(); // ✅ Play level up sound
      }
    } else {
      handleIncorrect();
      wrongSound.play(); // ✅ Play wrong sound
      showFeedback("❌ Wrong!", "red");
    }
    updateUI();
    nextQuestion();
  }

function showFeedback(message, color) {
  const feedback = document.getElementById("feedback");
  feedback.innerText = message;
  feedback.style.color = color;
  setTimeout(() => (feedback.innerText = ""), 1000);
}

function handleIncorrect() {
  lives--;
  if (lives <= 0) endGame();
}

function updateUI() {
  document.getElementById("score").innerText = score;
  document.getElementById("level").innerText = level;
  document.getElementById("lives").innerText = lives;
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
