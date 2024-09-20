// Variables for the game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create the game canvas
ctx.fillStyle = '#8550eb';
ctx.strokeStyle = '#000000';
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

function main() {
	setTimeout(function onTick() {
		clearCanvas();
		advanceSnake();
		drawSnake();
		main();
	}, 100);
}
main();
