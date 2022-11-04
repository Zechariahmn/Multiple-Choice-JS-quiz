//Creation of elements going to be used in the javascript for the application
let viewHighScores = document.getElementById('scores');
let timer = document.getElementById('time');
let seconds = document.getElementById('seconds');
let startPage = document.getElementById('begin');
let startBtn = document.getElementById('start');

let questions = document.querySelectorAll('.question');
let optionsOne = document.getElementById('one');
let optionsTwo = document.getElementById('two');
let optionsThree = document.getElementById('three');
let optionsFour = document.getElementById('four');
let optionsFive = document.getElementById('five');
let optionsSix = document.getElementById('six');
let optionsSeven = document.getElementById('seven');

let answerResult = document.querySelectorAll('.result');

let resultsPage = document.getElementById('results')
let score = document.getElementById('score');
let initials = document.getElementById('initials');
let submitBtn = document.getElementById('submit');

let highScoresPage = document.getElementById('high-scores');
let highScoresList = document.getElementById('all-scores');
let againBtn = document.getElementById('play-again');
let clear = document.getElementById('Delete');

let timeLeft = 84;
let index = 0;
let stopTime
let initialsList = [];
let scores = [];

// Function that allows the timer to countdown correctly
function setTime() {
    let timerInterval = setInterval(function() {
        timeLeft--;
        seconds.textContent = timeLeft;
        stopTime = timerInterval;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            zeroTime()
        }
    }, 1000);
}

// no time left function
function zeroTime() {
    questions[index].setAttribute('data-state', 'hidden');
    resultsPage.setAttribute('data-state', 'visible');
    score.textContent = timeLeft;
}

// Function that allows users to guess the answers in the quiz
function guessAnswer(event) {
    let element = event.target;

    if (element.matches('button')) {
        let correct = element.getAttribute('data-answer');
        
        questions[index].setAttribute('data-state', 'hidden');
       
        if (correct === 'correct') {
            answerResult[index].textContent = 'You Rock!';
            index++;
        } else {
            answerResult[index].textContent = 'Oopsies!';
            index++;
            timeLeft = timeLeft - 10;
        }

        if (timeLeft < 0) {
            timeLeft = 0;
        } else if (timeLeft === 0) {
            answerResult[4].textContent = '';
        }
        
        if (index <= 4) {
            questions[index].setAttribute('data-state', 'visible');
        } else {
            questions[4].setAttribute('data-state', 'hidden');
            resultsPage.setAttribute('data-state', 'visible');
            seconds.textContent = timeLeft;
            score.textContent = timeLeft;
            clearInterval(stopTime);
        } 
    }
}

// Function that allows the initials and scores inputted to be placed into the highscores list
function renderHighScores() {
    resultsPage.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    highScoresList.innerHTML = '';
    for (let i = 0; i < initialsList.length; i++) {
        let newInitials = initialsList[i];
        let newScores = scores[i];

        let li = document.createElement('li');
        li.setAttribute('class', 'scoresList')
        li.textContent = newInitials + ' - ' + newScores;

        highScoresList.appendChild(li);
    }
}

// Function that allows the application to get the stored initials and scores
function getStoredScores() {
    let storedInitials = JSON.parse(localStorage.getItem('initialsList'));
    let storedScores = JSON.parse(localStorage.getItem('scores'));

    if (storedInitials !== null) {
        initialsList = storedInitials;
        scores = storedScores;
    }
}

// Function that stores initials and scores into the local storage
function storeScores() {
    localStorage.setItem('initialsList', JSON.stringify(initialsList));

    localStorage.setItem('scores', JSON.stringify(scores));
}

// Function that hides the other pages and displays the highscores page
viewHighScores.addEventListener('click', function() {
    startPage.setAttribute('data-state', 'hidden');
    timer.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    getStoredScores();
    renderHighScores();
})

// Function that takes the user to the quiz once the start button has been clicked
startBtn.addEventListener('click', function() {
    setTime();
    startPage.setAttribute('data-state', 'hidden');
    questions[0].setAttribute('data-state', 'visible');
}) 


// Allows the user to click and guess the answers to the question
optionsOne.addEventListener('click', guessAnswer)
optionsTwo.addEventListener('click', guessAnswer)
optionsThree.addEventListener('click', guessAnswer)
optionsFour.addEventListener('click', guessAnswer)
optionsFive.addEventListener('click', guessAnswer)
optionsSix.addEventListener('click', guessAnswer)
optionsSeven.addEventListener('click', guessAnswer)

// function that will send the inputted initials and scores to the highscores list to be displayed
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    timer.setAttribute('data-state', 'hidden');

    let initialsText = initials.value.trim().toUpperCase();

    if (initialsText === "") {
        return;
    }

    initialsList.push(initialsText);
    initials.value = "";
    scores.push(score.textContent);
    storeScores();
    getStoredScores();
    renderHighScores();
});

// Function that allows the user to restart the application and play the quiz again
againBtn.addEventListener('click', function() {
    highScoresPage.setAttribute('data-state', 'hidden');
    startPage.setAttribute('data-state', 'visible');
    timer.setAttribute('data-state', 'visible');
    timeLeft = 84;
    seconds.textContent = timeLeft;
    index = 0;
})

// Function that allows the user to clear the highscore list
clear.addEventListener('click', function() {
    localStorage.clear()
    highScoresList.textContent = "";
    initialsList = [];
    scores = [];
})

// retrieves the scores and initials and renders them to the page on load
getStoredScores()
