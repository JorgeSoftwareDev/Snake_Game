// ## VARIABLES ##
let foodX, foodY;
let speed = 100;
let totalScore = 0;
let level = 1;
let levelScore = 500 * level;
let bonus = 300;
let cBonus = bonus * level;
let scoreBoard = document.getElementById('scoreNum');
let levelBoard = document.getElementById('levelNum');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ## GAME CANVAS ##
// Create the game canvas
ctx.fillStyle = '#8550eb';
ctx.strokeStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);
canvas.style.border = '5px solid #000';
canvas.style.backgroundColor = '#8550eb';

// Clear canvas function
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ## THE SNAKE ##
// Array for the snake body
let snake = [
	{ x: 150, y: 150 },
	{ x: 140, y: 150 },
	{ x: 130, y: 150 },
	{ x: 120, y: 150 },
	{ x: 110, y: 150 },
];

// Functions to draw snake parts
function drawSnakePart(snakePart) {
	ctx.fillStyle = '#90EE90';
	ctx.strokeStyle = '#06402B';
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//  Function to go through array of Snakes Body
function drawSnake() {
	snake.forEach(drawSnakePart);
}

// moving the Snake
// Variables to move the snake
let dx = 10;
let dy = 0;

// function to move the snake
function advanceSnake() {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);
	snake.pop();
}

// ## CONTROLS ##
// creating the controls to move the snake
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
	const LEFT = 37,
		RIGHT = 39,
		UP = 38,
		DOWN = 40;
	const keyPressed = event.keyCode;
	const goingRight = dx === 10,
		goingLeft = dx === -10;
	if (keyPressed === LEFT && !goingRight) {
		dx = -10;
		dy = 0;
	}
	if (keyPressed === RIGHT && !goingLeft) {
		dx = 10;
		dy = 0;
	}
	if (keyPressed === UP) {
		dx = 0;
		dy = -10;
	}
	if (keyPressed === DOWN) {
		dx = 0;
		dy = 10;
	}
}

// creating food for snake to randomly grow

// creating the food's random position
function createFood() {
	foodX = Math.round((Math.random() * (canvas.width - 20)) / 10) * 10;
	foodY = Math.round((Math.random() * (canvas.height - 20)) / 10) * 10;
}

// Function to draw the actual food on the Canvas
function drawFood() {
	ctx.fillStyle = '#FF0000';
	ctx.strokeStyle = '#400000';
	ctx.fillRect(foodX, foodY, 10, 10);
	ctx.strokeRect(foodX, foodY, 10, 10);
}

function advanceSnake() {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);

	const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
	if (didEatFood) {
		createFood();
		update();
	} else {
		snake.pop();
	}
}
function updateBonus() {
	if (cBonus > 0) {
		cBonus--;
	}
}

function update() {
	rapid();
	console.log('cBonus: ' + cBonus);
	console.log('score: ' + totalScore);
	console.log('speed:' + speed);
	totalScore += levelScore;
	totalScore += cBonus;
	level += 1;
	cBonus = bonus * level;
	levelScore = 500 * level;
}

function scoring() {
	scoreBoard.textContent = totalScore.toLocaleString('en-US');
	levelBoard.textContent = level;
}

function rapid() {
	switch (true) {
		case speed > 80:
			speed -= 10;
			break;
		case speed > 50:
			speed -= 5;
			break;
		case speed > 25:
			speed -= 1;
			break;
		case speed > 3:
			speed -= 0.5;
			break;
		default:
			speed = 3;
	}
}

function didGameEnd() {
	for (let i = 4; i < snake.length; i++) {
		const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
		if (didCollide) return true;
	}
	const hitLeftWall = snake[0].x < 0;
}

// Main game function
function main() {
	setTimeout(function onTick() {
		clearCanvas();
		drawSnake();
		drawFood();
		scoring();
		advanceSnake();
		updateBonus();
		main();
	}, speed); // Calls the main function every x milliseconds
}

createFood();
scoring();
main();
