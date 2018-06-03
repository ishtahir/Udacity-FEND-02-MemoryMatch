// declare all const variables
const emojis = ['😍', '😡', '😱', '🤢', '🤡', '💩', '💙', '😂'];
const cards = document.querySelectorAll('.card');
const board = document.querySelector('.board');
const restartBtn = document.querySelector('.restart');
const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('button');
const starsPane = document.querySelectorAll('.fa-star');
const timePane = document.querySelector('.time');
const movesPane = document.querySelector('.moves');
const message = document.querySelector('.message');
const congrats = document.querySelector('.congrats');

// declare all let variables
let stars = 3;
let moves = 0;
let matches = 0;
let time = 0;
let openCards = [];
let startTime;

// function to shuffle emojis
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// function to update timer
function timer() {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timePane.textContent = minutes + ':' + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return `${minutes}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
}

// function to update the star count relative to the moves count
function starsUpdate() {
    if (moves > 12) {
        stars = 2;
        starsPane[2].style.color = '#fff';
    }
    if (moves > 16 && moves < 21) {
        stars = 1;
        starsPane[1].style.color = '#fff';
    }
    if (moves > 20) {
        stars = 0;
        starsPane[0].style.color = '#fff';
    }
}
