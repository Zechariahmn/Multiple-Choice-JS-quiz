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

