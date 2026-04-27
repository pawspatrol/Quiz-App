let currentQuestions = [];
let currentIndex = 0;
let scoreOT = 0;
let scoreNT = 0;
let timer;
let timeLeft = 1800;

function startExam() {
    const nameInput = document.getElementById('user-name').value;
    if (nameInput.trim() === "") { alert("Please enter your name!"); return; }
    
    document.getElementById('candidate-display').innerText = nameInput;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    // Mix and Pick 100
    currentQuestions = [...bibleQuestions].sort(() => 0.5 - Math.random()).slice(0, 100);
    startTimer();
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('question-text').innerText = q.question;
    document.getElementById('current-num').innerText = currentIndex + 1;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => handleSelection(btn, opt, q.answer, q.category);
        container.appendChild(btn);
    });
}

function handleSelection(selectedBtn, selectedText, correctText, category) {
    // Disable all buttons so they can't click twice
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.style.pointerEvents = 'none');

    if (selectedText === correctText) {
        selectedBtn.classList.add('correct');
        if (category === "OT") scoreOT++; else scoreNT++;
    } else {
        selectedBtn.classList.add('wrong');
        // Show the user which one was actually correct
        buttons.forEach(b => { if(b.innerText === correctText) b.classList.add('correct'); });
    }

    // Wait 1.5 seconds so they can see the answer, then move on
    setTimeout(() => {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            showQuestion();
        } else {
            endExam();
        }
    }, 1500);
}

function endExam() {
    clearInterval(timer);
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    
    const total = scoreOT + scoreNT;
    document.getElementById('final-score').innerText = `${total} / ${currentQuestions.length}`;

    // Initialize Chart
    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Old Testament', 'New Testament'],
            datasets: [{
                data: [scoreOT, scoreNT],
                backgroundColor: ['#6c5ce7', '#00b894'],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) endExam();
        else {
            timeLeft--;
            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;
            document.getElementById('timer').innerText = `Time Left: ${m}:${s < 10 ? '0' : ''} ${s}`;
        }
    }, 1000);
            }
              
