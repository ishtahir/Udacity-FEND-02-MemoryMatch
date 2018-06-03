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
