const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Pelin asetukset
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let height = 0;
let gameInterval;
let gravity = 0.5;
let jumpStrength = -12;
let isJumping = false;
let jumpSpeed = 0;
let player = { x: canvas.width / 2, y: canvas.height - 100, width: 50, height: 50, color: 'darkgray' };
let platforms = [];
let collectibles = [];
let enemies = [];
let gameStarted = false;

// Äänet
const jumpSound = document.getElementById('jumpSound');
const collectSound = document.getElementById('collectSound');
const bgMusic = document.getElementById('bgMusic');

// Käynnistetään peli
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('leftBtn').addEventListener('click', () => player.x -= 10);
document.getElementById('rightBtn').addEventListener('click', () => player.x += 10);

function startGame() {
    gameStarted = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';
    bgMusic.play();
    gameInterval = setInterval(gameLoop, 1000 / 60);  // 60 FPS
    createInitialPlatforms();
}

function restartGame() {
    score = 0;
    height = 0;
    player.y = canvas.height - 100;
    platforms = [];
    collectibles = [];
    enemies = [];
    gameStarted = false;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'none';
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    height += 1;
    player.y += jumpSpeed;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        if (isJumping) {
            jumpSpeed = 0;
            isJumping = false;
        }
    }

    jumpSpeed += gravity;
    updatePlatforms();
    updateCollectibles();
    updateEnemies();
    detectCollisions();
    drawPlayer();
    drawUI();
}

function updatePlatforms() {
    platforms.forEach(platform => {
        platform.y += 1;
        if (platform.y > canvas.height) {
            platform.y = -platform.height;
            platform.x = Math.random() * (canvas.width - platform.width);
        }
        drawPlatform(platform);
    });
}

function updateCollectibles() {
    collectibles.forEach(collectible => {
        collectible.y += 1;
        if (collectible.y > canvas.height) {
            collectible.y = -20;
            collectible.x = Math.random() * canvas.width;
        }
        drawCollectible(collectible);
    });
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.y += 2;
        if (enemy.y > canvas.height) {
            enemy.y = -20;
            enemy.x = Math.random() * canvas.width;
        }
        drawEnemy(enemy);
    });
}

function detectCollisions() {
    platforms.forEach(platform => {
        if (player.y + player.height <= platform.y && player.y + player.height + jumpSpeed >= platform.y && 
            player.x + player.width >= platform.x && player.x <= platform.x + platform.width) {
            if (!isJumping) {
                isJumping = true;
                jumpSpeed = jumpStrength;
                createCollectible(platform.x + Math.random() * platform.width);
                createEnemy(platform.x + Math.random() * platform.width);
            }
        }
    });

    collectibles.forEach((collectible, index) => {
        if (player.x + player.width > collectible.x && player.x < collectible.x + collectible.width &&
            player.y + player.height > collectible.y && player.y < collectible.y + collectible.height) {
            score += 10;
            collectibles.splice(index, 1);
            collectSound.play();
            createCollectible();
        }
    });

    enemies.forEach((enemy, index) => {
        if (player.x + player.width > enemy.x && player.x < enemy.x + enemy.width &&
            player.y + player.height > enemy.y && player.y < enemy.y + enemy.height) {
            endGame();
        }
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatform(platform) {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function drawCollectible(collectible) {
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2, 10, 0, 2 * Math.PI);
    ctx.fill();
}

function drawEnemy(enemy) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 10, 0, 2 * Math.PI);
    ctx.fill();
}

function drawUI() {
    document.getElementById('scoreDisplay').innerText = `Kolikot: ${score}`;
    document.getElementById('heightDisplay').innerText = `Korkeus: ${height}`;
}

function createInitialPlatforms() {
    for (let i = 0; i < 5; i++) {
        platforms.push({ x: Math.random() * (canvas.width - 100), y: i * 100, width: 100, height: 20 });
    }
}

function createCollectible(x = Math.random() * canvas.width) {
    collectibles.push({ x: x, y: -20, width: 20, height: 20 });
}

function createEnemy(x = Math.random() * canvas.width) {
    enemies.push({ x: x, y: -20, width: 20, height: 20 });
}

function endGame() {
    clearInterval(gameInterval);
    document.getElementById('restartBtn').style.display = 'block';
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !isJumping) {
        isJumping = true;
        jumpSpeed = jumpStrength;
        jumpSound.play();
    }
});
