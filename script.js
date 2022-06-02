const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;  //clique
let firstCard, secondCard;
let lockBoard = false; //trancar o tabuleiro

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) { //clica na carta
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false; //cada rodada zera 
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) { //se forem iguais desabilita a carta com a função disableCards 
        disableCards();
        return;
    }

    unflipCards(); //se for diferentes irá desvirar a carta
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard); //ele remove o evento de click
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard) //ativa a função de virar a carta quando clico na mesma
});

