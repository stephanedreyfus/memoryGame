window.onload = function(){
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let highScore = 0;
let reset = document.getElementById('reset');

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})()

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    console.log(++moveCounter);
    document.getElementById('move-count').value = moveCounter;
    console.log("Value of move-count",document.getElementById('move-count').value);
    // Do not yet know how to get this back to HTML
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
    console.log("Test for win.")
    if (document.querySelectorAll('.flip').length === 12){
        if (highScore === 0 || moveCounter < highScore){
            console.log("Congratulations! With", moveCounter, "moves, you got the new high score!");
            highScore = moveCounter;
        } else {
            console.log("Congratulations! You won in", moveCounter, "clicks.");
        }
    }
}

reset.addEventListener('click', function(){
    console.log("Did we get in the reset function?")
    resetBoard();
    moveCounter = 0;
    document.querySelectorAll('.flip').classList.remove('flip');
});

// cards.forEach(card => card.addEventListener('click', flipCard));

cards.forEach(function(card){
    card.addEventListener('click', flipCard);
})

}
// Last bracket end of wrapping onload function.

