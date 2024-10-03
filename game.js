// Variables for the game canvas
let foodX, foodY;
let speed = 100;
let totalScore = 0;
let count = 0.5;
let bonus = 300;
let cBonus = 300;
let scoreBoard = document.getElementById('scoreNum');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create the game canvas
ctx.fillStyle = '#8550eb';
ctx.strokeStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);
canvas.style.border = '5px solid #000';
canvas.style.backgroundColor = '#8550eb';

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
	ctx.fillStyle = 'lightgreen';
	ctx.strokeStyle = 'darkgreen';
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//  Function to go through array of Snakes Body
function drawSnake() {
	snake.forEach(drawSnakePart);
}

// Clear canvas function
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
	foodX = Math.round((Math.random() * (canvas.width - 30)) / 10) * 10;
	foodY = Math.round((Math.random() * (canvas.height - 30)) / 10) * 10;
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
	while (cBonus > 0) {
		cBonus--;
	}
	console.log('Total score: ' + cBonus);
}
function update() {
	cBonus = bonus;
	speed -= 10;
	count += 0.5;
	totalScore = totalScore + 100 * count + cBonus;
	console.log(speed);
}

function scoring() {
	scoreBoard.textContent = totalScore;
}

// Main game function
function main() {
	setTimeout(function onTick() {
		clearCanvas();
		drawSnake();
		drawFood();
		advanceSnake();
		updateBonus();
		scoring();
		main();
		console.log(cBonus);
	}, speed); // Calls the main function every x milliseconds
}
main();
createFood();
scoring();
