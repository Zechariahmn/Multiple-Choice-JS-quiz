let viewHighScores = document.getElementById('scores');
let timer = document.getElementById('time');
let seconds = document.getElementById('seconds');
let startPage = document.getElementById('begin');
let startBtn = document.getElementById('START');

let questions = document.querySelectorAll('.questions');
let optionsOne = document.getElementById('I');
let optionsTwo = document.getElementById('II');
let optionsThree = document.getElementById('III');
let optionsFour = document.getElementById('IV');
let optionsFive = document.getElementById('V');
let optionsix = document.getElementById('VI');
let optionsSeven = document.getElementById('VII');

let answerResult = document.querySelectorAll('.result');

let resultsPage = document.getElementById('results')
let score = document.getElementById('score');
let initials = document.getElementById('initials');
let submitBtn = document.getElementById('submit');

let highScoresPage = document.getElementById('high-scores');
let highScoresList = document.getElementById('all-scores');
let againBtn = document.getElementById('play-again');
let clear = document.getElementById('Delete');


startBtn.addEventListener('click', function() {
    setTime();
    startPage.setAttribute('data-state', 'hidden');
    questions[0].setAttribute('data-state', 'visible');
}) 


optionsOne.addEventListener('click', guessAnswer)
optionsTwo.addEventListener('click', guessAnswer)
optionsThree.addEventListener('click', guessAnswer)
optionsFour.addEventListener('click', guessAnswer)
optionsFive.addEventListener('click', guessAnswer)
optionsSix.addEventListener('click', guessAnswer)
optionsSeven.addEventListener('click', guessAnswer)


var timeLeft = 84;
var index = 0;
var stopTime
var initialsList = [];
var scores = [];

// countdown function
function setTime() {
    var timerInterval = setInterval(function() {
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


// guessing answer
function guessAnswer(event) {
    var element = event.target;

    if (element.matches('button')) {
        var correct = element.getAttribute('data-answer');
        
        questions[index].setAttribute('data-state', 'hidden');
       
        if (correct === 'correct') {
            answerResult[index].textContent = 'Awesome!';
            index++;
        } else {
            answerResult[index].textContent = 'NOPE!';
            index++;
            timeLeft = timeLeft - 12;
        }

        if (timeLeft < 0) {
            timeLeft = 0;
        } else if (timeLeft === 0) {
            answerResult[4].textContent = 'oops, better luck next time!';
        }
        
        if (index <= 6) {
            questions[index].setAttribute('data-state', 'visible');
        } else {
            questions[6].setAttribute('data-state', 'hidden');
            resultsPage.setAttribute('data-state', 'visible');
            seconds.textContent = timeLeft;
            score.textContent = timeLeft;
            clearInterval(stopTime);
        } 
    }
}


// renders initials and score into a li element
function renderHighScores() {
    resultsPage.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    highScoresList.innerHTML = '';
    for (var i = 0; i < initialsList.length; i++) {
        var newInitials = initialsList[i];
        var newScores = scores[i];

        var li = document.createElement('li');
        li.setAttribute('class', 'scoresList')
        li.textContent = newInitials + ' - ' + newScores;

        highScoresList.appendChild(li);
    }
}


// stores initials and score into local storage
function storeScores() {
    localStorage.setItem('initialsList', JSON.stringify(initialsList));

    localStorage.setItem('scores', JSON.stringify(scores));
}


// gets stored initials and scores from local storage
function getStoredScores() {
    var storedInitials = JSON.parse(localStorage.getItem('initialsList'));
    var storedScores = JSON.parse(localStorage.getItem('scores'));

    if (storedInitials !== null) {
        initialsList = storedInitials;
        scores = storedScores;
    }
}


viewHighScores.addEventListener('click', function() {
    startPage.setAttribute('data-state', 'hidden');
    timer.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    getStoredScores();
    renderHighScores();
})


