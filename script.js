let questions = [];
let userAnswers = {};
let currentIndex = 0;
let timer;
let timeLeft = 1800;

document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value;
    if (!name.trim()) return alert("Enter your name!");

    document.getElementById('candidate-name-display').innerText = `Candidate: ${name}`;
    questions = [...bibleQuestions].sort(() => 0.5 - Math.random()).slice(0, 100);

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    buildNavigator();
    showQuestion(0);
    startTimer();
};

function buildNavigator() {
    const nav = document.getElementById('navigator');
    nav.innerHTML = '';
    questions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'nav-dot';
        btn.id = `nav-${i}`;
        btn.innerText = i + 1;
        btn.onclick = () => showQuestion(i);
        nav.appendChild(btn);
    });
}

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
}

document.getElementById('next-btn').onclick = () => { if(currentIndex < questions.length-1) showQuestion(currentIndex+1); };
document.getElementById('prev-btn').onclick = () => { if(currentIndex > 0) showQuestion(currentIndex-1); };
document.getElementById('submit-btn').onclick = () => { if(confirm("Submit?")) submitExam(); };

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft/60), s = timeLeft%60;
        document.getElementById('timer').innerText = `${m}:${s<10?'0':''}${s}`;
        if(timeLeft<=0) submitExam();
    }, 1000);
}

function submitExam() {
    clearInterval(timer);
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';

    let scoreOT = 0, scoreNT = 0, total = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            total++;
            if (q.category === "OT") scoreOT++; else scoreNT++;
        }
    });

    document.getElementById('final-score').innerText = `${total} / ${questions.length}`;
    
    new Chart(document.getElementById('scoreChart'), {
        type: 'bar',
        data: {
            labels: ['OT', 'NT'],
            datasets: [{ data: [scoreOT, scoreNT], backgroundColor: ['#f59e0b', '#4f46e5'] }]
        },
        options: { plugins: { legend: { display: false } } }
    });
                        }
