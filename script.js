let bibleQuestions = []; 
let currentIdx = 0;
let score = 0;
let userSelections = [];
let timeLeft = 30 * 60;
let userName = "";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  const nameInput = document.getElementById('username');
  userName = nameInput.value.trim();
  
  if (!userName) {
    alert("Please enter your name to start the exam!");
    return;
  }

  // 1. Pick 100 random questions from the pool in questions.js
  let tempPool = [...questionPool];
  shuffleArray(tempPool);
  
  // Make sure we don't try to take more than we have
  const totalToTake = Math.min(tempPool.length, 100);
  bibleQuestions = tempPool.slice(0, totalToTake); 

  // 2. Shuffle OPTIONS for each question so 'A' isn't always the answer
  bibleQuestions.forEach(q => shuffleArray(q.options));

  userSelections = new Array(bibleQuestions.length).fill(null);
  score = 0;
  currentIdx = 0;

  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  
  buildNav();
  renderQuestion();
  startTimer();
}

function buildNav() {
  const nav = document.getElementById('question-nav');
  nav.innerHTML = '';
  bibleQuestions.forEach((_, i) => {
    const item = document.createElement('div');
    item.className = 'nav-item';
    item.innerText = i + 1;
    item.id = `nav-${i}`;
    item.onclick = () => { currentIdx = i; renderQuestion(); };
    nav.appendChild(item);
  });
}

function renderQuestion() {
  const q = bibleQuestions[currentIdx];
  document.getElementById('progress').innerText = `QUESTION ${currentIdx + 1} OF ${bibleQuestions.length}`;
  document.getElementById('question-body').innerText = q.question;
  
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    
    // Highlight selected (STRICT MODE - No Green/Red yet)
    if (userSelections[currentIdx] === opt) {
      div.style.borderColor = "#1e293b";
      div.style.background = "#f1f5f9";
    }

    div.innerHTML = `<div class="option-letter">${String.fromCharCode(65+i)}</div><span>${opt}</span>`;
    div.onclick = () => {
      userSelections[currentIdx] = opt;
      document.getElementById(`nav-${currentIdx}`).classList.add('answered');
      renderQuestion(); 
    };
    container.appendChild(div);
  });

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`nav-${currentIdx}`).classList.add('active');
}

function changeQuestion(step) {
  const newIdx = currentIdx + step;
  if (newIdx >= 0 && newIdx < bibleQuestions.length) {
    currentIdx = newIdx;
    renderQuestion();
  }
}

function startTimer() {
  const display = document.getElementById('timer');
  const timerInterval = setInterval(() => {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
    timeLeft--;
  }, 1000);
}

function showResults() {
  // Calculate Score
  score = 0;
  bibleQuestions.forEach((q, i) => {
    if (userSelections[i] === q.answer) score++;
  });

  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('user-display-name').innerText = `Candidate: ${userName}`;
  document.getElementById('final-score').innerText = `${score}/${bibleQuestions.length}`;
  
  const percent = (score / bibleQuestions.length) * 100;
  document.getElementById('feedback-text').innerText = percent >= 70 ? 
    "Excellent! You have a deep understanding of the Scriptures." : 
    "Keep studying! The Word of God is a lamp unto your feet.";
      }
