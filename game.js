// Variables for the game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create the game canvas
ctx.fillStyle = '#8550eb';
ctx.strokeStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

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
function main() {
	setTimeout(function onTick() {
		clearCanvas();
		advanceSnake();
		drawSnake();
		main();
	}, 100); // Calls the main function every 100ms
}

main();
