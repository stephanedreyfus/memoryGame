window.onload = function(){
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let highScore = 0;
let reset = document.getElementById('reset');
let winMessage = document.getElementById('win-message');

// Extranneous parenthesis?
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 24);
        card.style.order = randomPos;
    });
})()

function flipCard(){
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


function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function ifWin(){
    if (document.querySelectorAll('.flip').length === 24){
        if (highScore === 0 || moveCounter < highScore){
            winMessage.innerHTML = (`Congratulations! With ${moveCounter.toString()} moves, you got the new high score!`);
            highScore = moveCounter;
            document.getElementById('high-score').innerHTML = highScore;
        } else {
            winMessage.innerHTML = (`Congratulations! You won in ${moveCounter.toString()} clicks.`);
        }
    }
}

reset.addEventListener('click', function(){
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

// module.exports = memory;
