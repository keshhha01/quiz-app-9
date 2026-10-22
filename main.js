const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyper Transfer Machine Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style web pages?",
        answers: ["Python", "CSS", "Java", "SQL"],
        correct: 1
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [".", "*", "#", "&"],
        correct: 2
    },
    {
        question: "Which language makes websites interactive?",
        answers: ["JavaScript", "HTML", "CSS", "XML"],
        correct: 0
    },
    {
        question: "Which method prints a message in the console?",
        answers: [
            "console.write()",
            "console.log()",
            "print.console()",
            "message.log()"
        ],
        correct: 1
    }
];

const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const currentText = document.getElementById("current");
const totalText = document.getElementById("total");
const progressFill = document.getElementById("progressFill");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next");
const resultContainer = document.getElementById("result");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart");

let currentIndex = 0;
let score = 0;
let answered = false;

totalText.textContent = questions.length;

function showQuestion() {
    answered = false;

    const currentQuestion = questions[currentIndex];

    currentText.textContent = currentIndex + 1;
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    feedbackText.textContent = "";
    nextButton.disabled = true;

    progressFill.style.width =
        `${((currentIndex + 1) / questions.length) * 100}%`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {7
            checkAnswer(index);
        });

        answersContainer.appendChild(button);
    });

    nextButton.textContent =
        currentIndex === questions.length - 1
            ? "See Results"
            : "Next Question";
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentIndex];
    const answerButtons = answersContainer.querySelectorAll(".answer");

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedbackText.textContent = "Correct! 🎉";
        feedbackText.style.color = "#249447";
    } else {
        answerButtons[selectedIndex].classList.add("wrong");
        feedbackText.textContent = "Not quite! Try the next one.";
        feedbackText.style.color = "#d94343";
    }

    nextButton.disabled = false;
}

function showResults() {
    questionText.hidden = true;
    answersContainer.hidden = true;
    nextButton.hidden = true;
    feedbackText.hidden = true;

    resultContainer.hidden = false;
    scoreText.textContent =
        `You scored ${score} out of ${questions.length}!`;

    progressFill.style.width = "100%";
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;

    questionText.hidden = false;
    answersContainer.hidden = false;
    nextButton.hidden = false;
    feedbackText.
    hidden = false;
    resultContainer.hidden = true;

    showQuestion();
});

showQuestion();