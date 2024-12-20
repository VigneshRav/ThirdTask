const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Create pairs of values
let flippedCards = [];
let matchedPairs = 0;
let isGameOver = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(value, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-content', 'card-front');
    cardFront.innerText = ''; // No value on front side

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-content', 'card-back');
    cardBack.innerText = value; // Value on back side

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', () => flipCard(card, value));

    return card;
}

function flipCard(card, value) {
    if (isGameOver || flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch(value);
    }
}

function checkForMatch(value) {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.card-back').innerText;
    const value2 = card2.querySelector('.card-back').innerText;

    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === cardValues.length) {
            isGameOver = true;
            setTimeout(() => alert('You Win!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function setupGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards = cards.sort(() => Math.random() - 0.5); // Shuffle the cards

    cards.forEach((value, index) => {
        const card = createCard(value, index);
        gameBoard.appendChild(card);
    });

    matchedPairs = 0;
    isGameOver = false;
    flippedCards = [];
}

setupGame();
