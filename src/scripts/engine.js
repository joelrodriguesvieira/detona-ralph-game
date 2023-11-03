const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        viewLifes: document.querySelector("#life"),
        popUp: document.querySelector("#viewPopUp"),
        resultPopUp: document.querySelector("#result-popUp"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifes: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDonwTimeId: setInterval(countDonw,1000),
    },
};

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
};

function removeLife() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if (square.id !== state.values.hitPosition) {
                state.values.lifes--;
                state.view.viewLifes.textContent = `x${state.values.lifes}`;
                countLive();
                if (state.values.lifes !== 0) {
                    playSound("erro");
                }
            }
        })
    })
};

function countLive() {
    if (state.values.lifes <= 0) {
        clearInterval(state.actions.countDonwTimeId);
        clearInterval(state.actions.timerId);
        viewGameOver();
    }
}

function countDonw() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDonwTimeId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi " + state.values.result);
    }
};

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.5;
    audio.play();
};

function viewGameOver() {
    state.view.popUp.style.display = 'flex';
    state.view.resultPopUp.textContent = state.values.result;
}

function initialize() {
    removeLife();
    addListenerHitBox();
};

initialize();

