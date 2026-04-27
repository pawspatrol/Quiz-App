// 1. GLOBAL STATE
let questions = [];
let userAnswers = {};
let currentIndex = 0;
let timer;
let timeLeft = 1800; // 30 Minutes

// Hide screens on initial load to prevent "stacking"
window.onload = () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
};

// 2. THEME TOGGLE (Click the Book Logo)
document.querySelector('.logo').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

// 3. START EXAM
document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value;
    if (!name.trim()) return alert("Please enter your name!");

    document.getElementById('candidate-name-display').innerText = `Candidate: ${name}`;

    // Load and Shuffle Questions
    if (typeof bibleQuestions === 'undefined') {
        alert("Error: questions.js not found!");
        return;
    }
    
    questions = [...bibleQuestions].sort(() => 0.5 - Math.random());
    if(questions.length > 100) questions = questions.slice(0, 100);

    // Transition to Quiz
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');

    buildNavigator();
    showQuestion(0);
    startTimer();
};

// 4. GRID NAVIGATOR
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

// 5. SHOW QUESTION
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
            showQuestion(index);
        };
        container.appendChild(btn);
    });

    // Update Nav Selection UI
    document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
    document.getElementById(`nav-${index}`).classList.add('active');
}

// 6. CONTROLS
document.getElementById('next-btn').onclick = () => {
    if (currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
};

document.getElementById('prev-btn').onclick = () => {
    if (currentIndex > 0) showQuestion(currentIndex - 1);
};

document.getElementById('submit-btn').onclick = () => {
    if (confirm("Confirm Submission?")) submitExam();
};

// 7. TIMER ENGINE
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

// 8. FINAL RESULTS & ANALYTICS
function submitExam() {
    clearInterval(timer);
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');

    let scoreOT = 0, scoreNT = 0, totalCorrect = 0;
    let countOT = 0, countNT = 0;
    const review = document.getElementById('review-container');
    review.innerHTML = '';

    questions.forEach((q, i) => {
        if (q.category === "OT") countOT++; else countNT++;
        
        const isCorrect = userAnswers[i] === q.answer;
        if (isCorrect) {
            totalCorrect++;
            if (q.category === "OT") scoreOT++; else scoreNT++;
        }

        // Add to Review List
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <p><strong>Q${i+1}: ${q.question}</strong></p>
            <p style="color: ${isCorrect ? '#10b981' : '#ef4444'}">
                ${isCorrect ? '✅ ' : '❌ '}${userAnswers[i] || 'No Answer'}
                ${!isCorrect ? `<br><span style="color: #10b981">Correct: ${q.answer}</span>` : ''}
            </p>
        `;
        review.appendChild(item);
    });

    // Score Display
    document.getElementById('final-score').innerText = `${totalCorrect} / ${questions.length}`;
    document.getElementById('percentage-label').innerText = Math.round((totalCorrect/questions.length)*100) + "% Proficiency";

    // STUDY TIP LOGIC
    const otPercent = countOT > 0 ? (scoreOT / countOT) : 0;
    const ntPercent = countNT > 0 ? (scoreNT / countNT) : 0;
    let tip = "";

    if (otPercent < ntPercent) {
        tip = "📖 Focus: Your New Testament score is higher. Dedicate more time to the Law and Prophets (OT).";
    } else if (ntPercent < otPercent) {
        tip = "📖 Focus: You've mastered the Old Testament! Dive deeper into the Gospels and Epistles (NT).";
    } else {
        tip = "🌟 Excellent: You have a very balanced knowledge of both Testaments!";
    }

    const tipDiv = document.createElement('div');
    tipDiv.className = "study-tip";
    tipDiv.innerText = tip;
    document.querySelector('.score-box').appendChild(tipDiv);

    // ANALYTICS BAR CHART
    new Chart(document.getElementById('scoreChart'), {
        type: 'bar',
        data: {
            labels: ['Old Testament', 'New Testament'],
            datasets: [{
                data: [scoreOT, scoreNT],
                backgroundColor: ['#f59e0b', '#1e293b'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true, max: Math.max(countOT, countNT) } },
            plugins: { legend: { display: false } }
        }
    });
          }
          
