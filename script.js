let questions = [];
let userAnswers = new Array(100).fill(null);
let currentIndex = 0;
let timer;
let timeLeft = 1800;

// 1. DOM Elements
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const navContainer = document.getElementById('navigator');

// 2. Start Exam
document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value;
    if (!name.trim()) return alert("Please enter your name!");
    
    document.getElementById('candidate-name').innerText = `Candidate: ${name}`;
    
    // Select 100 Random Questions
    questions = [...bibleQuestions].sort(() => 0.5 - Math.random()).slice(0, 100);
    
    homePage.classList.remove('active');
    quizPage.classList.add('active');
    
    buildNavigator();
    showQuestion(0);
    startTimer();
};

// 3. Build the Grid Navigator
function buildNavigator() {
    navContainer.innerHTML = '';
    questions.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.innerText = i + 1;
        dot.id = `nav-${i}`;
        dot.onclick = () => showQuestion(i);
        navContainer.appendChild(dot);
    });
}

// 4. Show Question
function showQuestion(index) {
    currentIndex = index;
    const q = questions[index];
    
    document.getElementById('question-text').innerText = q.question;
    document.getElementById('current-num').innerText = index + 1;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = `option-btn ${userAnswers[index] === opt ? 'selected' : ''}`;
        btn.innerText = opt;
        btn.onclick = () => {
            userAnswers[index] = opt;
            document.getElementById(`nav-${index}`).classList.add('answered');
            showQuestion(index); // Refresh to show selection
        };
        container.appendChild(btn);
    });

    // Update Nav Highlight
    document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
    document.getElementById(`nav-${index}`).classList.add('active');
}

// 5. Navigation Controls
document.getElementById('next-btn').onclick = () => {
    if (currentIndex < 99) showQuestion(currentIndex + 1);
};

document.getElementById('prev-btn').onclick = () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1);
};

// 6. Timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) submitExam();
        else {
            timeLeft--;
            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;
            document.getElementById('timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        }
    }, 1000);
}

// 7. Submit & Results
document.getElementById('submit-btn').onclick = () => {
    if (confirm("Are you sure you want to submit your examination?")) {
        submitExam();
    }
};

function submitExam() {
    clearInterval(timer);
    quizPage.classList.remove('active');
    resultPage.classList.add('active');

    let scoreOT = 0, scoreNT = 0, totalScore = 0;
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';

    questions.forEach((q, i) => {
        const isCorrect = userAnswers[i] === q.answer;
        if (isCorrect) {
            totalScore++;
            if (q.category === "OT") scoreOT++; else scoreNT++;
        }

        // Build Review Item
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <p><strong>${i+1}. ${q.question}</strong></p>
            <p>
                <span class="${isCorrect ? 'correct-text' : 'wrong-text'}">${userAnswers[i] || 'No Answer'}</span>
                ${!isCorrect ? `<span class="correct-text">${q.answer}</span>` : ''}
            </p>
        `;
        reviewContainer.appendChild(item);
    });

    // Update Scores
    document.getElementById('final-score').innerText = `${totalScore} / 100`;
    document.getElementById('percentage').innerText = `${(totalScore / 100) * 100}%`;

    // Draw Chart
    new Chart(document.getElementById('scoreChart'), {
        type: 'doughnut',
        data: {
            labels: ['OT Correct', 'NT Correct', 'Incorrect'],
            datasets: [{
                data: [scoreOT, scoreNT, 100 - totalScore],
                backgroundColor: ['#6c5ce7', '#00b894', '#dfe6e9']
            }]
        }
    });
                            }
  
