let questions = [];
let userAnswers = {}; // Using an object to store answers by index
let currentIndex = 0;
let timer;
let timeLeft = 1800;

// 1. THEME TOGGLE LOGIC
// Clicking the logo icon toggles dark mode
document.querySelector('.logo').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

// 2. START EXAM
document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value;
    if (!name.trim()) return alert("Please enter your name to begin!");

    document.getElementById('candidate-name-display').innerText = `Candidate: ${name}`;

    // Use all questions for test, or slice(0, 100) for the final 500
    questions = [...bibleQuestions].sort(() => 0.5 - Math.random());
    if(questions.length > 100) questions = questions.slice(0, 100);

    document.getElementById('home-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');

    buildNavigator();
    showQuestion(0);
    startTimer();
};

// 3. BUILD NAVIGATOR GRID
function buildNavigator() {
    const nav = document.getElementById('navigator');
    nav.innerHTML = '';
    questions.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.innerText = i + 1;
        dot.id = `nav-${i}`;
        dot.onclick = () => showQuestion(i);
        nav.appendChild(dot);
    });
}

// 4. SHOW QUESTION
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
            showQuestion(index); // Refresh selection highlight
        };
        container.appendChild(btn);
    });

    // Highlight current dot in navigator
    document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
    document.getElementById(`nav-${index}`).classList.add('active');
}

// 5. BUTTON CONTROLS
document.getElementById('next-btn').onclick = () => {
    if (currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
};

document.getElementById('prev-btn').onclick = () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1);
};

document.getElementById('submit-btn').onclick = () => {
    if (confirm("Are you sure you want to submit your exam?")) submitExam();
};

// 6. TIMER
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            submitExam();
        } else {
            timeLeft--;
            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;
            document.getElementById('timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        }
    }, 1000);
}

// 7. SUBMIT & ANALYTICS
function submitExam() {
    clearInterval(timer);
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');

    let scoreOT = 0, scoreNT = 0, totalCorrect = 0;
    const review = document.getElementById('review-container');
    review.innerHTML = '';

    questions.forEach((q, i) => {
        const isCorrect = userAnswers[i] === q.answer;
        if (isCorrect) {
            totalCorrect++;
            if (q.category === "OT") scoreOT++; else scoreNT++;
        }

        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <p><strong>${i+1}. ${q.question}</strong></p>
            <p style="color: ${isCorrect ? '#10b981' : '#ef4444'}">
                Your Answer: ${userAnswers[i] || 'None'} 
                ${!isCorrect ? `<br><span style="color: #10b981">Correct: ${q.answer}</span>` : ''}
            </p>
        `;
        review.appendChild(item);
    });

    document.getElementById('final-score').innerText = `${totalCorrect} / ${questions.length}`;
    document.getElementById('percentage-label').innerText = Math.round((totalCorrect/questions.length)*100) + "% Score";

    // DRAW CHART
    new Chart(document.getElementById('scoreChart'), {
        type: 'doughnut',
        data: {
            labels: ['OT Correct', 'NT Correct', 'Incorrect'],
            datasets: [{
                data: [scoreOT, scoreNT, questions.length - totalCorrect],
                backgroundColor: ['#818cf8', '#10b981', '#cbd5e1'],
                borderWidth: 0
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
                                                  }
