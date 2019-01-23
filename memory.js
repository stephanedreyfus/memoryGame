// console.log("What is document?", document)
window.onload = function(){
const cards = document.querySelectorAll('.memory-card');
// console.log("JS started");

// console.log("What is cards", cards);
// console.log("Trying to pull thing.", document.querySelectorAll('section'));

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){
    console.log("flipcard activated")
    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

// cards.forEach(function(card){
//     card.addEventListener('click', flipCard);
// })
// Can't seem to get either of these to work.
}

