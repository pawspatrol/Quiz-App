let currentIdx = 0;
let userAnswers = new Array(bibleQuestions.length).fill(null);
let timeLeft = 20 * 60; // 20 minutes

function initQuiz() {
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('navigator');
    
    bibleQuestions.forEach((q, i) => {
        // Create Question Box
        const box = document.createElement('div');
        box.className = `question-box ${i === 0 ? 'active' : ''}`;
        box.id = `qbox-${i}`;
        box.innerHTML = `<h3>Question ${i + 1}</h3><p>${q.question}</p>`;
        
        q.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'option';
            btn.innerText = opt;
            btn.onclick = () => selectOption(i, opt);
            box.appendChild(btn);
        });
        container.appendChild(box);

        // Create Nav Button
        const nBtn = document.createElement('div');
        nBtn.className = 'nav-btn';
        nBtn.id = `nav-${i}`;
        nBtn.innerText = i + 1;
        nBtn.onclick = () => jumpTo(i);
        nav.appendChild(nBtn);
    });
    updateNav();
    startTimer();
}

function selectOption(qIdx, val) {
    userAnswers[qIdx] = val;
    const options = document.querySelectorAll(`#qbox-${qIdx} .option`);
    options.forEach(o => {
        o.classList.remove('selected');
        if (o.innerText === val) o.classList.add('selected');
    });
    document.getElementById(`nav-${qIdx}`).classList.add('answered');
}

function jumpTo(i) {
    document.querySelector('.question-box.active').classList.remove('active');
    currentIdx = i;
    document.getElementById(`qbox-${i}`).classList.add('active');
    updateNav();
}

function changeQuestion(step) {
    let newIdx = currentIdx + step;
    if (newIdx >= 0 && newIdx < bibleQuestions.length) jumpTo(newIdx);
}

function updateNav() {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('current'));
    document.getElementById(`nav-${currentIdx}`).classList.add('current');
}

function startTimer() {
    const timerEl = document.getElementById('timer');
    const interval = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerEl.innerText = `⏱ Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            submitQuiz();
        }
        timeLeft--;
    }, 1000);
}

function submitQuiz() {
    let score = 0;
    let wrongOld = 0, wrongNew = 0;

    bibleQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            score++;
        } else {
            if (q.testament === "Old") wrongOld++;
            else wrongNew++;
        }
    });

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('navigator').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('timer').style.display = 'none';

    const results = document.getElementById('results-container');
    results.style.display = 'block';
    
    const percent = Math.round((score / bibleQuestions.length) * 100);
    document.getElementById('score-display').innerText = `Your Score: ${score} / ${bibleQuestions.length} (${percent}%)`;
    
    let msg = wrongOld > wrongNew ? "You need to study the Old Testament more! 📖" : "You need to study the New Testament more! ✝️";
    if (wrongOld === wrongNew) msg = "Great balance across both testaments! 👍";
    document.getElementById('feedback-msg').innerText = msg;
}

// Start everything
window.onload = initQuiz;
