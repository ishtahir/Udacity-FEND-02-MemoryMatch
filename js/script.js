// declare all const variables
const emojis = ['🔥', '❤️', '🎃', '💩', '🐶', '🌝', '🍉', '🏈'];
const board = document.querySelector('.board');
const restartBtn = document.querySelector('.restart');
const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('button');
const starsPane = document.querySelectorAll('.star-emoji');
const timePane = document.querySelector('.time');
const movesPane = document.querySelector('.moves');
const stats = document.querySelector('.stats');
const congrats = document.querySelector('.congrats');

// declare all let variables
let stars = 3;
let moves = matches = time = 0;
let openCards = [];
let startTime;

// function to shuffle emojis
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
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
        starsPane[2].style.display = 'none';
    }
    if (moves > 16 && moves < 21) {
        stars = 1;
        starsPane[1].style.display = 'none';
    }
    if (moves > 20) {
        stars = 0;
        starsPane[0].style.display = 'none';
    }
}

function showModal() {
    modal.classList.add('show-modal');
}

// function to start or restart the game
function gameStart(array) {
    // make emoji pairs and shuffle the array
    array = shuffle(array.concat(array));

    // create the list item for each emoji and add it to the board
    let cardHTML = '';
    array.forEach(index => {
        cardHTML += `<li class="card">${index}</li>`;
    });
    board.innerHTML = cardHTML;

    // reset moves, stars, time, matches, openCards array
    moves = 0;
    movesPane.textContent = moves;

    stars = 3;
    starsPane.forEach(star => {
        star.style.color = '#ffd800';
    });

    time = 0;
    timePane.textContent = `0:00`;

    matches = 0;

    openCards = [];

    // hide modal on gameStart
    modal.classList.remove('show-modal');

    // if timer is still going stop it
    if (startTime) {
        clearInterval(startTime);
        startTime = undefined;
    }
}

// function to end the game
function gameEnd() {
    // determine star emojis
    if (stars === 3) {
        stars = '⭐️⭐️⭐️';
    } else if (stars === 2) {
        stars = '⭐️⭐️';
    } else if (stars === 1) {
        stars = '⭐️';
    } else {
        stars = 0;
    }
    // display congrats message
    congrats.innerHTML = `🎉Congratulations!🎉<br>You 🎊 win.`;
    stats.innerHTML = `Total Moves: ${moves}<br>Total Stars: ${stars}<br>Total Time: ${timer()}`;
    playAgainBtn.innerHTML = 'Play Again';

    // show modal on gameEnd
    showModal();

    // stop the timer
    clearInterval(startTime);
}

// start the game
gameStart(emojis);

board.addEventListener('click', evt => {
    const card = evt.target;
    // only flip a card and add to array if a card is clicked on and there is less than 2 cards open
    if (card.classList.contains('card') && openCards.length < 2) {
        // start the timer when a card is clicked for the first time
        if (!startTime) {
            startTime = setInterval(timer, 1000);
        }
        // if any of the cards are open or matched don't do anything else with that card
        if (!(card.classList.contains('open')) && !(card.classList.contains('show')) && !(card.classList.contains('match'))) {
            card.classList.add('open', 'show');
            openCards.push(card);
            // if there are 2 cards in the openCards array
            if (openCards.length === 2) {
                // and if both cards match
                if (openCards[0].textContent === openCards[1].textContent) {
                    openCards[0].classList.remove('open', 'show');
                    openCards[1].classList.remove('open', 'show');
                    openCards[0].classList.add('match', 'correct');
                    openCards[1].classList.add('match', 'correct');
                    moves++;
                    movesPane.textContent = moves;
                    starsUpdate();
                    setTimeout(() => {
                        openCards[0].classList.remove('correct');
                        openCards[1].classList.remove('correct');
                        openCards = [];
                    }, 300);
                    matches++;
                    // if all matches are made, run gameEnd function
                    if (matches === 8) {
                        gameEnd();
                    }
                } else {
                    //if both cards don't match
                    openCards[0].classList.add('incorrect');
                    openCards[1].classList.add('incorrect');
                    moves++;
                    movesPane.textContent = moves;
                    starsUpdate();
                    setTimeout(() => {
                        openCards[0].classList.remove('open', 'show', 'incorrect');
                        openCards[1].classList.remove('open', 'show', 'incorrect');
                        openCards = [];
                    }, 1000);
                }
            }
        }
    }
});

// restart the game on restart button click
restartBtn.addEventListener('click', () => {
    gameStart(emojis);
});

// restart the game on play again button click on modal
playAgainBtn.addEventListener('click', () => {
    gameStart(emojis);
})
