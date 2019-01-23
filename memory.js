window.onload = function(){
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// let moveCounter = 0;

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})()

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    // counterUpdate(++moveCounter);
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

// function counterUpdate(num){
//     // Sends counter to display.
//     return moveCounter;
// }

// cards.forEach(card => card.addEventListener('click', flipCard));

cards.forEach(function(card){
    card.addEventListener('click', flipCard);
})

}
// Last bracket end of wrapping onload function.

