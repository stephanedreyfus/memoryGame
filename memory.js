// Small function sent to testing to ensure page load.
const add = (a, b) => a + b;

const faceArrays = require('./memory');

window.onload = function memoryGame() {
    
// Array of card face images
const faces = faceArrays.hilma;

function createCards() {
    const board = document.getElementById("board");
    for (face of faces) {
        // Create parts of card
        const c = document.createElement("div");
        const f = document.createElement("img");
        const b = document.createElement("img");

        c.classList.add("memory-card");
        c.dataset.framework = `${face.title}`;

        f.classList.add("front");
        f.src = `public/${face.file}`;
        f.alt = `${face.title}`;

        b.classList.add("back");
        b.src = "public/phenomenal_site.png";
        b.alt = alt="Memory Card";

        c.append(f);
        c.append(b);

        board.append(c);
    }
}

// Need two of each card!
createCards();
createCards();

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let highScore = 0;
let reset = document.getElementById('reset');
let winMessage = document.getElementById('win-message');

// Called immediately.
(function shuffle() {
    let nums = new Set();
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 100);
        while (nums.has(randomPos)) {
            randomPos = Math.floor(Math.random() * 100)
        }
        card.style.order = randomPos;
        nums.add(randomPos);
    });
})()


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    document.getElementById('move-count').innerHTML = (++moveCounter);
    this.classList.add('flip');
    if (this === firstCard) return;
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    let isMatch = (firstCard.dataset.framework === secondCard.dataset.framework);
    isMatch ? disableCards() : unflipCards();
    ifWin();
}

// Lock board and unflip all cards.
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

// Disables click on matched cards, 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Not a full reset, clears variables that manage state of play.
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Checks for win. If there is a win, an appropriate message is displayed.
function ifWin() {
    if (document.querySelectorAll('.flip').length === 24) {
        if (highScore === 0 || moveCounter < highScore){
            winMessage.innerHTML = (`Congratulations! With ${moveCounter.toString()} moves, you got the new high score!`);
            highScore = moveCounter;
            document.getElementById('high-score').innerHTML = highScore;
        } else {
            winMessage.innerHTML = (`Congratulations! You won in ${moveCounter.toString()} clicks.`);
        }
    }
}

// Assign funtionality to reset button.
reset.addEventListener('click', function() {
    resetBoard();
    moveCounter = 0;
    document.getElementById('move-count').innerHTML = 0;
    winMessage.innerHTML = "Playing...";
    console.log(document.getElementById('move-count').value)
    cards.forEach(function(card){
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
});

cards.forEach(card => card.addEventListener('click', flipCard));

}
// Last bracket end of wrapping onload function.

module.exports = add;
