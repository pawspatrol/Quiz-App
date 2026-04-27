let currentQuestions = [];
let currentIndex = 0;
let userAnswers = {};
let timer;
let timeLeft = 1800;

// 🔀 Shuffle Helper
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 🎯 Prepare Questions (500 → 100 + shuffle options)
function prepareQuestions() {
    const shuffledPool = shuffleArray([...bibleQuestions]);

    return shuffledPool.slice(0, 100).map(q => {
        const shuffledOptions = shuffleArray([...q.options]);

        return {
            ...q,
            options: shuffledOptions
        };
    });
}

// 🚀 START EXAM
function startExam() {
    const name = document.getElementById('user-name').value.trim();
    if (!name) {
        alert("Enter your name");
        return;
    }

    document.getElementById('candidate-display').innerText = name;

    currentQuestions = prepareQuestions();

    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');

    renderNavigator();
    showQuestion();
    startTimer();
}

// 📖 SHOW QUESTION
function showQuestion() {
    const q = currentQuestions[currentIndex];

    document.getElementById('question-text').innerText = q.question;
    document.getElementById('current-num').innerText = currentIndex + 1;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;

        if (userAnswers[currentIndex] === opt) {
            btn.classList.add('selected');
        }

        btn.onclick = () => {
            userAnswers[currentIndex] = opt;
            showQuestion();
            renderNavigator();
        };

        container.appendChild(btn);
    });
}

// 🔢 NAVIGATION GRID
function renderNavigator() {
    const nav = document.getElementById('navigator');

    nav.innerHTML = currentQuestions.map((_, i) => {
        let className = "";

        if (userAnswers[i]) className += "answered ";
        if (i === currentIndex) className += "active";

        return `
            <button class="${className}" onclick="goToQuestion(${i})">
                ${i + 1}
            </button>
        `;
    }).join("");
}

// 🔁 NAVIGATION
function goToQuestion(i) {
    currentIndex = i;
    showQuestion();
    renderNavigator();
}

// ⏭ NEXT / PREV
document.getElementById('next-btn').onclick = () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
        renderNavigator();
    }
};

document.getElementById('prev-btn').onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion();
        renderNavigator();
    }
};

// 🧠 SUBMIT
document.getElementById('submit-btn').onclick = endExam;

function endExam() {
    clearInterval(timer);

    let scoreOT = 0;
    let scoreNT = 0;

    currentQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            if (q.category === "OT") scoreOT++;
            else scoreNT++;
        }
    });

    const total = scoreOT + scoreNT;
    const percentage = ((total / currentQuestions.length) * 100).toFixed(2);

    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');

    document.getElementById('final-score').innerText =
        `${total} / ${currentQuestions.length}`;

    document.getElementById('percentage').innerText =
        `${percentage}%`;

    // 📖 REVIEW SYSTEM
    const review = document.getElementById('review-container');

    review.innerHTML = currentQuestions.map((q, i) => {
        const user = userAnswers[i] || "Not Answered";
        const correct = q.answer;

        return `
            <div class="review-item ${user === correct ? 'correct' : 'wrong'}">
                <b>Q${i + 1}:</b> ${q.question}<br>
                Your Answer: ${user}<br>
                Correct Answer: ${correct}
            </div>
        `;
    }).join("");

    // 📊 CHART
    const ctx = document.getElementById('scoreChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Old Testament', 'New Testament'],
            datasets: [{
                data: [scoreOT, scoreNT],
                backgroundColor: ['#7c3aed', '#22c55e']
            }]
        }
    });
}

// ⏱ TIMER
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            endExam();
        } else {
            timeLeft--;

            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;

            document.getElementById('timer').innerText =
                `⏱ ${m}:${s < 10 ? '0' : ''}${s}`;
        }
    }, 1000);
    }
