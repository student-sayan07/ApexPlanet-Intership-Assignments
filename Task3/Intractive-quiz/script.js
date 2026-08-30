const questions = [

{
    question: "What does HTML stand for?",

    answers: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Tool Markup Language",
        "Home Text Language"
    ],

    correct: 0
},


{
    question: "Which language is used for styling?",

    answers: [
        "HTML",
        "CSS",
        "Java",
        "Python"
    ],

    correct: 1
},


{
    question: "Which language makes a website interactive?",

    answers: [
        "HTML",
        "CSS",
        "JavaScript",
        "SQL"
    ],

    correct: 2
}

];

let currentQuestion = 0;

let score = 0;

const questionElement =
document.getElementById("question");

const answerButtons =
document.querySelectorAll(".answer-btn");

const nextButton =
document.getElementById("next-btn");

function showQuestion() {

let question =
    questions[currentQuestion];


questionElement.innerHTML =
    question.question;


answerButtons.forEach(
    (button, index) => {

        button.innerHTML =
            question.answers[index];

        button.disabled = false;

        button.style.backgroundColor = "";
    }
);

}

answerButtons.forEach(
(button, index) => {

    button.addEventListener(
        "click",

        function () {

            let correctAnswer =
                questions[currentQuestion].correct;


            if (index === correctAnswer) {

                button.style.backgroundColor =
                    "green";

                score++;

            }

            else {

                button.style.backgroundColor =
                    "red";
            }


            answerButtons[
                correctAnswer
            ].style.backgroundColor =
                "green";


            answerButtons.forEach(
                btn => btn.disabled = true
            );

        }
    );

}

);

nextButton.addEventListener(
"click",

function () {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    }

    else {

        document.querySelector(
            ".quiz-container"
        ).innerHTML =

        "<h2>Quiz Finished!</h2>" +

        "<p>Your Score: " +

        score +

        " / " +

        questions.length +

        "</p>";

    }

}

);

showQuestion();