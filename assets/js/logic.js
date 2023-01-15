// Create a code quiz that contains the following requirements:
// A start button that when clicked a timer starts and the first question appears.
// Questions contain buttons for each answer.
// When answer is clicked, the next question appears
// If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.
// When the game ends, it should display their score and give the user the ability to save their initials and their score

// Prepare the questions in question.js file
// var questions = ...
// var questions = questions[i];
var score = 0;
var currentQuestion = 0;
var counter = 100;
var timer;

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

// ....

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


function populateQuestion(question) {
    var questionTitle = question.title;
    var choices = question.choices;
    var answer = question.answer;
    choicesContainer.innerHTML = '';
    questionTitle.textContent = questionTitle; // this should be questionTitle.textContent = question.title;
    var choicesList = document.createElement('ul');

    for (let i = 0; i < choices.length; i++) {
        var questionTitle = document.createElement("ul")
        var choice = document.createElement('li');
        choice.textContent = choices[i];
        choicesList.appendChild(choice);
        choice.addEventListener('click', function() {
            if (choice.textContent === answer.textContent) {
                audio.play();
                score++;
                nextQuestion();
            } else {
                wrongAnswerAudio.play();
                counter = counter - 10;
                if (counter <= 0) {
                    endGame();
                }
            }
        });
    }

    choicesContainer.appendChild(choicesList);
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        populateQuestion(questions[currentQuestion]);
    } else {
        endGame();
    }
}


function endGame() {
    // hide questions container
    questionsContainer.setAttribute('class', 'hide');
    // show endScreen container
    endScreen.setAttribute('class', 'visible');
    // assign score to finalScore container
    finalScore.textContent = score;
    // reset the timer 
    clearInterval(intervalId);
}


function saveHighscore(initial) {
    // get the current highscores value from localstorage
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // push initial + score to the array
    highscores.push({initials: initial, score: score});
    // order the array from highest score to lowest
    highscores.sort(function(a,b){return b.score - a.score});
    // json stringify then save back to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
}


// Another click event listener for choices
//    Check answer
//        if correct, add 1 to score, call nextQuestion()
//        if wrong, remove 10 seconds from the interval, call nextQuestion()

// Click event listener to submit button
//    var initial = initialInput.value.trim()
//    saveHighscore(initial)
//    redirect to highscore page