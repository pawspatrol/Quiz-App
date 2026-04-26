let currentQuestion = 0;
let userAnswers = {};
let timeLeft = 1200; // 20 minutes

// TIMER
function startTimer() {
  const timerDisplay = document.getElementById("timer");

  const timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.innerText = `⏱ Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

// RENDER NAVIGATION
function renderNavigator() {
  const nav = document.getElementById("navigator");

  nav.innerHTML = quizData.map((_, i) => {
    return `
      <div 
        class="nav-btn ${userAnswers[i] ? 'answered' : ''} ${i === currentQuestion ? 'current' : ''}" 
        onclick="goToQuestion(${i})">
        ${i + 1}
      </div>
    `;
  }).join("");
}

// GO TO QUESTION
function goToQuestion(index) {
  currentQuestion = index;
  renderQuestion();
  renderNavigator();
}

// RENDER QUESTION
function renderQuestion() {
  const q = quizData[currentQuestion];
  const container = document.getElementById("quiz-container");

  container.innerHTML = `
    <div class="question-box">
      <p><b>Q${currentQuestion + 1}:</b> ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input 
            type="radio" 
            name="q${currentQuestion}" 
            value="${opt}"
            ${userAnswers[currentQuestion] === opt ? "checked" : ""}
            onchange="selectAnswer(${currentQuestion}, '${opt}')"
          >
          ${opt}
        </label><br>
      `).join("")}
    </div>
  `;
}

// SAVE ANSWER
function selectAnswer(index, answer) {
  userAnswers[index] = answer;
  renderNavigator();
}

// SUBMIT QUIZ
function submitQuiz() {
  let score = 0;
  let results = [];

  quizData.forEach((q, i) => {
    const user = userAnswers[i];
    const correct = q.answer;

    const isCorrect = user === correct;

    if (isCorrect) score++;

    results.push({
      question: q.question,
      userAnswer: user || "Not Answered",
      correctAnswer: correct,
      isCorrect
    });
  });

  const percentage = (score / quizData.length) * 100;

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("navigator").style.display = "none";

  document.getElementById("results-container").style.display = "block";

  document.getElementById("score").innerText =
    `Score: ${score} / ${quizData.length}`;

  document.getElementById("percentage").innerText =
    `Percentage: ${percentage.toFixed(2)}%`;

  document.getElementById("review").innerHTML = results.map((r, i) => `
    <div style="margin-bottom:15px; padding:10px; border-bottom:1px solid #ccc;">
      <p><b>Q${i + 1}:</b> ${r.question}</p>
      <p class="${r.isCorrect ? 'correct' : 'wrong'}">
        Your Answer: ${r.userAnswer}
      </p>
      <p>Correct Answer: ${r.correctAnswer}</p>
    </div>
  `).join("");
}

// INIT
function init() {
  renderNavigator();
  renderQuestion();
  startTimer();
}

init();
