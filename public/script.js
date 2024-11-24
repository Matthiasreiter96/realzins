let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// Fragen laden
fetch('/api/questions')
    .then(res => res.json())
    .then(data => {
        questions = data.sort(() => Math.random() - 0.5); // Fragen mischen
        loadQuestion();
    });

// Ergebnisse laden und anzeigen
function loadResults() {
    fetch('/api/results')
        .then(res => res.json())
        .then(data => {
            const resultsContainer = document.querySelector('.results-container');
            const resultsTable = resultsContainer.querySelector('tbody');
            resultsTable.innerHTML = data
                .map(result => `
                    <tr>
                        <td>${result.name}</td>
                        <td>${result.score}/${result.total}</td>
                        <td>${new Date(result.date).toLocaleString()}</td>
                    </tr>
                `)
                .join('');
        });
}

// Aktuelle Frage laden
function loadQuestion() {
    const container = document.getElementById('quiz-container');
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        container.innerHTML = `
            <h2>${q.question}</h2>
            <ul>
                ${q.answers.map((answer, index) => `
                    <li>
                        <input type="radio" name="answer" id="answer-${index}" value="${index}">
                        <label for="answer-${index}">${answer}</label>
                    </li>
                `).join('')}
            </ul>
            <div>
                ${currentQuestionIndex > 0 ? '<button class="back" onclick="prevQuestion()">Zurück</button>' : ''}
                <button class="forward" onclick="nextQuestion()">Weiter</button>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        `;
        updateProgressBar();
    } else {
        showResults();
    }
}

// Nächste Frage
function nextQuestion() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Bitte wähle eine Antwort aus!');
        return;
    }

    userAnswers[currentQuestionIndex] = parseInt(selected.value);
    if (userAnswers[currentQuestionIndex] === questions[currentQuestionIndex].correct) {
        score++;
        triggerMoneyRain(); // Animation
    }

    currentQuestionIndex++;
    loadQuestion();
}

// Vorherige Frage
function prevQuestion() {
    currentQuestionIndex--;
    loadQuestion();
}

// Fortschrittsbalken aktualisieren
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(0);
    progressBar.style.width = `${progress}%`;
}

// Geldregen animieren
function triggerMoneyRain() {
    const container = document.getElementById('quiz-container');
    for (let i = 0; i < 10; i++) {
        const money = document.createElement('div');
        money.className = 'money';
        money.style.left = Math.random() * 100 + '%';
        money.style.animationDuration = Math.random() * 2 + 1 + 's';
        container.appendChild(money);
        setTimeout(() => container.removeChild(money), 2000);
    }
}

// Ergebnisse anzeigen
function showResults() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <h2>Quiz abgeschlossen!</h2>
        <p>Du hast ${score} von ${questions.length} Fragen richtig beantwortet.</p>
        <p>Gib deinen Namen ein, um dein Ergebnis zu speichern:</p>
        <input type="text" id="username" placeholder="Dein Name">
        <button onclick="saveResult()">Ergebnis speichern</button>
    `;
}

// Ergebnis speichern
function saveResult() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Bitte gib einen Namen ein!');
        return;
    }

    fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: username,
            score: score,
            total: questions.length,
            date: new Date().toISOString()
        })
    }).then(() => {
        alert('Ergebnis gespeichert!');
        restartQuiz();
    });
}

// Quiz neu starten
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    loadQuestion();
}

// Ergebnisse laden
document.addEventListener('DOMContentLoaded', () => {
    loadResults();
});
