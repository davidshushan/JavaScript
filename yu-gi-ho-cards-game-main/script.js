class AudioController {
    constructor() {
        this.bgMusic = new Audio('Assets/Audio/Song.mp3'); //bg = background
        this.flipSound = new Audio('Assets/Audio/flip.wav');
        this.matchSound = new Audio('Assets/Audio/match.wav');
        this.victorySound = new Audio('Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('Assets/Audio/gameover.wav');
        this.bgMusic.volume = 0.5 // decrease volume by Half
        this.bgMusic.loop = true // loop the music
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; // reboot to begining of the song
    }

    flip() {
        this.flipSound.play();
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }

    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();

    }
}


class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemeining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();

    }
    startGame() {
        this.cardToCheck = null; // cardToCheck = the first card we click on and want to compare to the second card
        this.totalClicks = 0;
        this.timeRemeining = this.totalTime;
        this.matchedCards = [];
        this.busy = true; // busy mean that a animation is happenning and must wait until it done

        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemeining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck)
                this.checkForCardMatch(card)
            else
                this.cardToCheck = card;

        }
    }
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);

        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card1);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemeining--;
            this.timer.innerText = this.timeRemeining;
            if (this.timeRemeining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        setTimeout(() => {
            clearInterval(this.countDown);
            this.audioController.victory();
            document.getElementById('victory-text').classList.add('visible');
        }, 1000)
    }

    shuffleCards() { // Fisher-Yates Shuffle Algorithm.
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }

    }

    canFlipCard(card) {
        //only if all 3 condition are false will return true
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

    }
}
// wait until the html file is loaded
if (document.readyState === 'loading') {
    //when the html file is loaded start function ready
    document.addEventListener('DOMContentLoaded', ready());

} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text')); // array stores html overlay-text
    let cards = Array.from(document.getElementsByClassName('card')); // array store html cards
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible'); //remove click to start text
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card); // when clicking on each card start flip function
        });
    });
}



//new MixOrMatch(100, cardsArray)