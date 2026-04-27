let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 1800; // 30 minutes in seconds

function startExam() {
    const nameInput = document.getElementById('user-name').value;
    
    // 1. Check if name is entered
    if (nameInput.trim() === "") {
        alert("Please enter your name to proceed.");
        return;
    }

    // 2. Check if questions.js loaded correctly
    if (typeof bibleQuestions === 'undefined') {
        alert("CRITICAL ERROR: questions.js was not found or is empty. Check your file name!");
        return;
    }

    // 3. Setup UI
    document.getElementById('candidate-display').innerText = "Candidate: " + nameInput;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    // 4. Pick 100 random questions from the big list
    currentQuestions = [...bibleQuestions].sort(() => 0.5 - Math.random()).slice(0, 100);

    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endExam();
        } else {
            timeLeft--;
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }, 1000);
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    const optionsContainer = document.getElementById('options-container');
    
    document.getElementById('question-text').innerText = q.question;
    document.getElementById('current-num').innerText = currentIndex + 1;
    optionsContainer.innerHTML = '';

    // Shuffle the A, B, C, D options so they aren't always in the same spot
    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => checkAnswer(opt, q.answer);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
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
    document.getElementById('final-score').innerText = `Final Score: ${score} / ${currentQuestions.length}`;
}
