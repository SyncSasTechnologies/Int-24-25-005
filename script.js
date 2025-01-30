const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
    },
    {
        question: "Which programming language is used for web development?",
        answers: ["Python", "C++", "JavaScript", "Java"],
        correct: 2,
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const quizContainer = document.getElementById("quiz");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("time-left");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.dataset.index = index;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add("hidden");
    clearInterval(timer);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    startTimer();
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedIndex = selectedButton.dataset.index;
    const correctIndex = questions[currentQuestionIndex].correct;

    if (parseInt(selectedIndex) === correctIndex) {
        score++;
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
        button.style.backgroundColor =
            button.dataset.index == correctIndex ? "green" : "red";
    });

    nextButton.classList.remove("hidden");
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            selectAnswer({ target: { dataset: { index: -1 } } });
        }
    }, 2000);
}

function showScore() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreElement.textContent = `${score} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
