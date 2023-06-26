const snakeGame = document.getElementById("snake-game");
const leaderboardSnake = document.getElementById("users_snake");
const scoreElements = document.querySelectorAll(".progress");

// Game
const gameOverElement = document.getElementById("game-over");
const gameOverScore = document.getElementById("score-game-over");
const select = document.getElementById("select");
const canvas = document.getElementById("snake-canvas");
const context = canvas.getContext("2d");
const snakeHead = new Image();
const snakeBody = new Image();
const snakeTail = new Image();
const apple = new Image();
const star = new Image();
const currentScore = document.getElementById("current-score");
const canvasWidth = 360;
const canvasHeight = 360;
const gridSize = canvasWidth / 15;
const gridCount = canvasWidth / gridSize;

let snake = [
  { x: 8 * gridSize, y: 8 * gridSize },
  { x: 7 * gridSize, y: 8 * gridSize },
  { x: 6 * gridSize, y: 8 * gridSize },
];
let direction = "right";
let food = { x: 10 * gridSize, y: 10 * gridSize };
let starPos = { x: 8 * gridSize, y: 8 * gridSize };
let score = 0;
let foodCount = 0;
let isShow = false;
let isOver = false;

star.src = "/images/game-assets/snake/star.png";
snakeHead.src = "/images/game-assets/snake/body.png";
snakeBody.src = "/images/game-assets/snake/body-2.png";
apple.src = "/images/game-assets/snake/apple.png";

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(snakeHead, snake[0].x, snake[0].y, gridSize, gridSize);

  for (let i = 1; i < snake.length - 1; i++) {
    context.drawImage(snakeBody, snake[i].x, snake[i].y, gridSize, gridSize);
  }

  context.drawImage(
    snakeBody,
    snake[snake.length - 1].x,
    snake[snake.length - 1].y,
    gridSize,
    gridSize
  );

  context.drawImage(apple, food.x, food.y, gridSize, gridSize);

  if (foodCount === 10) {
    isShow = true;
    context.drawImage(star, starPos.x, starPos.y, gridSize, gridSize);
  }

  context.fillStyle = "white";
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 30);

  currentScore.innerText = score;
}

function update() {
  if (isOver) return;

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") head.x += gridSize;
  if (direction === "left") head.x -= gridSize;
  if (direction === "up") head.y -= gridSize;
  if (direction === "down") head.y += gridSize;

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight
  ) {
    gameOver();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    foodCount++;
    food = {
      x: Math.floor(Math.random() * gridCount) * gridSize,
      y: Math.floor(Math.random() * gridCount) * gridSize,
    };
  } else {
    snake.pop();
  }

  if (head.x === starPos.x && starPos.y === head.y && isShow) {
    score *= 2;
    foodCount = 0;
    isShow = false;
  }

  snake.unshift(head);

  draw();
}

function move(dir) {
  if (dir === "right" && direction !== "left") direction = "right";
  if (dir === "left" && direction !== "right") direction = "left";
  if (dir === "up" && direction !== "down") direction = "up";
  if (dir === "down" && direction !== "up") direction = "down";
}

function gameOver() {
  const data = {
    score: score,
  };
  gameOverScore.innerText = score;
  gameOverElement.style.display = "flex";

  sendScore(data);
  isOver = true;
  console.log("Test");
}

let difficulty = 400;

function runGame() {
  setInterval(update, difficulty);
}

function difficultySelect() {
  const difficultyValue = document.getElementById("difficulty-select");
  if (difficultyValue.value === "easy") difficulty = 400;
  if (difficultyValue.value === "medium") difficulty = 300;
  if (difficultyValue.value === "hard") difficulty = 100;

  console.log(difficultyValue.value);
}

function start() {
  runGame();
  select.style.display = "none";
}

function reset() {
  window.location.href = "/game/snake";
}

function main() {
  window.location.href = "/game";
}

function sendScore(data) {
  fetch("/game/snake/add/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("Error:", error);
  });
}
