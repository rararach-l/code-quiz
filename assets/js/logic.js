var score = 0;
var currentQuestion = question[0];
var counter = 100;

// Prepare all selector that we might need to point to the html element.
var startButton = document.querySelector('#start-button');
var startScreen = document.querySelector('#start-screen');
var timer = document.querySelector('.timer');
var questionsContainer = document.querySelector('#questionsContainer');
var questionTitle = document.querySelector('#question-title');
var choicesContainer = document.querySelector('#choices')
var audio = new Audio('assets/sfx/correct.wav')
var wrongAnswerAudio = new Audio('assets/sfx/incorrect.wav')
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var submitButton = document.querySelector('#submit-button');

// start the quiz using the start button, this is linked to the start of the timer and the first question being shown
startButton.addEventListener('click', function() {
    startScreen.setAttribute('class', 'hide');
    questionsContainer.setAttribute('class', 'visible');
    currentQuestion = 0;
    populateQuestion(question[currentQuestion]);
    var intervalId = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter <= 0) {
            clearInterval(intervalId);
            endGame();
        }
    }, 1000);
});

// using the array in question.js, the question is shown/populated
function populateQuestion(question) {
    let questionTitle = question.title;
    let choices = question.choices;
    let answer = question.answer;
    choicesContainer.innerHTML = '';
    let questionTitleEl = document.querySelector('#question-title');
    questionTitleEl.textContent = questionTitle; 
    let choicesList = document.createElement('ul');

    for (let i = 0; i < choices.length; i++) {
        let choice = document.createElement('li');
        choice.textContent = choices[i];
        choicesList.appendChild(choice);
        choice.addEventListener('click', function() {
            if (i === answer) {
                audio.play();
                score++;
                nextQuestion();
            } else {
                wrongAnswerAudio.play();
                counter = counter - 10;
                nextQuestion();
                if (counter <= 0) {
                    endGame();
                }
            }
        });
    } 

    choicesContainer.appendChild(choicesList); // appending the choicesList element to the choicesContainer element
}

// a function to show the next question, which can be used regardless of whether the question is right or wrong

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < question.length) {
        populateQuestion(question[currentQuestion]);
    } else {
        endGame();
    }
}

// When the game ends, it should display their score and give the user the ability to save their initials and their score

function endGame() {
    questionsContainer.setAttribute('class', 'hide');
    endScreen.setAttribute('class', 'visible');
    finalScore.textContent = score;
}