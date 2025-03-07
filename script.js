let score = localStorage.getItem('ehiScore') ? parseInt(localStorage.getItem('ehiScore')) : 0;
let lives = 3;
let level = 1;
let correctStreak = 0;
let timer;
let timeLeft = 45;
let currentAnswer;

document.getElementById('score').innerText = score;
document.getElementById('lives').innerText = lives;

function startGame() {
    nextQuestion();
    startTimer();
}

function nextQuestion() {
    const num1 = getRandomNumber(level);
    const num2 = getRandomNumber(level);
    const isMultiplication = Math.random() > 0.5;

    const questionText = isMultiplication
        ? `${num1} × ${num2}`
        : `${num1 * num2} ÷ ${num1}`;
    currentAnswer = isMultiplication ? num1 * num2 : num2;

    document.getElementById('question').innerText = `Question: ${questionText}`;
    generateOptions(currentAnswer);
    resetTimer();
}

function getRandomNumber(level) {
    const max = level <= 1 ? 20 : level * 50;
    return Math.floor(Math.random() * max) + 1;
}

function generateOptions(correct) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    const correctIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
        const btn = document.createElement('button');
        btn.onclick = () => checkAnswer(parseInt(btn.innerText));
        btn.innerText = i === correctIndex ? correct : correct + (Math.floor(Math.random() * 20) - 10);
        optionsDiv.appendChild(btn);
    }
}

function checkAnswer(selected) {
    if (selected === currentAnswer) {
        updateScore(5);
        correctStreak++;
        if (correctStreak % 10 === 0) levelUp();
        if (lives < 3) lives++;
        showFeedback('✅ Correct!', 'green');
        triggerConfetti();
    } else {
        updateScore(-5);
        lives--;
        correctStreak = 0;
        showFeedback(`❌ Wrong! Correct: ${currentAnswer}`, 'red');
        triggerShake();
    }
    updateUI();
    if (lives <= 0) {
        alert("Game Over! Resetting...");
        resetGame();
    } else {
        setTimeout(nextQuestion, 1000);
    }
}

function updateScore(amount) {
    score += amount;
    localStorage.setItem('ehiScore', score);
}

function levelUp() {
    level++;
    alert(`🎉 Level Up! Welcome to Level ${level}`);
    updateUI();
}

function showFeedback(message, color) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = message;
    feedback.style.color = color;
}

function updateUI() {
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = lives;
    document.getElementById('level').innerText = level;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 45;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(countdown, 1000);
}

function countdown() {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;

    if (timeLeft <= 0) {
        lives--;
        updateScore(-5);
        showFeedback(`⏰ Time's Up! Correct: ${currentAnswer}`, 'red');
        updateUI();
        if (lives <= 0) resetGame();
        else setTimeout(nextQuestion, 2000);
    }
}

function resetGame() {
    level = 1; lives = 3; score = 0; correctStreak = 0;
    localStorage.setItem('ehiScore', score);
    updateUI();
    showFeedback('', '');
    document.getElementById('question').innerText = 'Click "Start Game" to begin!';
    document.getElementById('options').innerHTML = '';
}

function endGame() {
    clearInterval(timer);
    alert(`Final Score: ${score}`);
}

// ===== Animations =====

// Confetti for correct answer
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = randomColor();
        confetti.style.left = `${Math.random() * 100}%`;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function randomColor() {
    const colors = ['#ff6347', '#ffd700', '#4caf50', '#2196f3', '#ff69b4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Shake effect for wrong answer
function triggerShake() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 500);
}
