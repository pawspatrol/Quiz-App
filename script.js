let currentQuestions = [];
let currentIndex = 0;
let scoreOT = 0; // Old Testament Correct
let scoreNT = 0; // New Testament Correct
let totalOT = 0; // Total OT questions shown
let totalNT = 0; // Total NT questions shown
let timer;
let timeLeft = 1800;

function startExam() {
    const nameInput = document.getElementById('user-name').value;
    if (nameInput.trim() === "") { alert("Please enter your name."); return; }
    
    document.getElementById('candidate-display').innerText = "Candidate: " + nameInput;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    currentQuestions = [...bibleQuestions].sort(() => 0.5 - Math.random()).slice(0, 100);
    
    // Count how many OT and NT questions are in this specific 100-set
    totalOT = currentQuestions.filter(q => q.category === "OT").length;
    totalNT = currentQuestions.filter(q => q.category === "NT").length;

    startTimer();
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('question-text').innerText = q.question;
    document.getElementById('current-num').innerText = currentIndex + 1;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => checkAnswer(opt, q.answer, q.category);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, category) {
    if (selected === correct) {
        if (category === "OT") scoreOT++;
        else scoreNT++;
    }
    
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        endExam();
    }
}

function endExam() {
    clearInterval(timer);
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    
    const totalScore = scoreOT + scoreNT;
    document.getElementById('final-score').innerText = `Total Score: ${totalScore} / 100`;

    // DRAW THE CHART
    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Old Testament', 'New Testament'],
            datasets: [{
                data: [scoreOT, scoreNT],
                backgroundColor: ['#764ba2', '#667eea'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) { clearInterval(timer); endExam(); }
        else {
            timeLeft--;
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }, 1000);
}
