const configBtn = document.getElementById('config-btn');
const configMenu = document.getElementById('config-menu');
const configForm = document.getElementById('config-form');
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const scoreValue = document.getElementById('score-value');
const restartBtn = document.getElementById('restart-btn');

let beyonceSpeed = 0.5;
let score = 0;
let isPlaying = true;
let scoreInterval = null;

let playerPosition = { x: 0, y: 0 };
let beyoncePosition = { x: 300, y: 300 };

// Menú
configBtn.addEventListener('click', () => {
    configMenu.classList.toggle('hidden');
});

configForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const difficulty = parseFloat(document.getElementById('difficulty').value);
    const bgColor = document.getElementById('background-color').value;
    const playerColor = document.getElementById('player-color').value;
    const darkMode = document.getElementById('dark-mode').checked;

    beyonceSpeed = difficulty;
    gameArea.style.backgroundColor = bgColor;
    player.style.backgroundColor = playerColor;
    document.body.classList.toggle('dark-mode', darkMode);

    configMenu.classList.add('hidden');
});

// Reinicio
restartBtn.addEventListener('click', () => {
    score = 0;
    scoreValue.textContent = score;
    playerPosition = { x: 0, y: 0 };
    beyoncePosition = { x: 300, y: 300 };
    isPlaying = true;
    updatePosition();
    startGame();
});

// Movimiento Player
function movePlayer(event) {
    if (!isPlaying) return;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 5) playerPosition.y -= 35;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 55) playerPosition.y += 35;
            break;
        case 'ArrowLeft':
            if (playerPosition.x >= 5) playerPosition.x -= 35;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 55) playerPosition.x += 35;
            break;
    }

    updatePosition();
}

// Movimiento de Beyoncé
function moveBeyonce() {
    if (!isPlaying) return;

    if (beyoncePosition.x < playerPosition.x) beyoncePosition.x += beyonceSpeed;
    else if (beyoncePosition.x > playerPosition.x) beyoncePosition.x -= beyonceSpeed;

    if (beyoncePosition.y < playerPosition.y) beyoncePosition.y += beyonceSpeed;
    else if (beyoncePosition.y > playerPosition.y) beyoncePosition.y -= beyonceSpeed;

    detectCollision();
    updatePosition();
}

// Colisión
function detectCollision() {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x);
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y);

    if (deltaX <= 50 && deltaY <= 50) {
        isPlaying = false;
        stopScoreTimer();
        alert('¡Beyoncé te atrapó! Reinicia para volver a jugar.');
    }
}

// Incrementar puntaje
function startScoreTimer() {
    scoreInterval = setInterval(() => {
        if (isPlaying) {
            score += 5;
            scoreValue.textContent = score;
        }
    }, 5000);
}

function stopScoreTimer() {
    clearInterval(scoreInterval);
}

// Actualizar posiciones
function updatePosition() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

// Ciclo del juego
function gameLoop() {
    if (isPlaying) {
        moveBeyonce();
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar el juego
function startGame() {
    stopScoreTimer(); 
    startScoreTimer();
    gameLoop();
}

window.addEventListener('keydown', movePlayer);
window.addEventListener('load', startGame);
