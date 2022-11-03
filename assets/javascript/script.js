let viewHighScores = document.getElementById('scores');
let timer = document.getElementById('time');
let seconds = document.getElementById('seconds');
let startPage = document.getElementById('begin');
let startBtn = document.getElementById('START');

let questions = document.querySelectorAll('.question');
let optionsOne = document.getElementById('one');
let optionsTwo = document.getElementById('two');
let optionsThree = document.getElementById('three');
let optionsFour = document.getElementById('four');
let optionsFive = document.getElementById('five');
let optionsix = document.getElementById('six');
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


