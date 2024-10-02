// Canvas setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

// Constants
const NUMBER_OF_ENEMIES = 200;
const enemiesArray = [];
let gameFrame = 0;

// Utility function to get random values within a range
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

// Enemy class definition
class Enemy {
	constructor(imageSrc, spriteWidth, spriteHeight, scale = 2.5) {
		this.image = new Image();
		this.image.src = imageSrc;
		this.x = getRandomInRange(0, CANVAS_WIDTH);
		this.y = getRandomInRange(0, CANVAS_HEIGHT);
		this.speedX = getRandomInRange(-2, 2);
		this.speedY = getRandomInRange(-2, 2);
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.width = this.spriteWidth / scale;
		this.height = this.spriteHeight / scale;
		this.frame = 0;
		this.flapSpeed = Math.floor(getRandomInRange(1, 4));
		this.direction = 1;
	}

	checkWrap(position, limit, size) {
		if (position < -size) {
			return limit;  // If the position is too far left/up, move it to the right/bottom
		}
		if (position > limit) {
			return -size;  // If the position is too far right/down, move it to the left/top
		}
		return position;  // If within bounds, keep it as is
	}

	update() {
		// Update object's position with wrapping logic
		this.x = this.checkWrap(this.x + this.speedX, CANVAS_WIDTH, this.width);
		this.y = this.checkWrap(this.y + this.speedY, CANVAS_HEIGHT, this.height);

		/*
			Loop sprite animation frames
			If flapSpeed = 3, the frame changes like this:
				gameFrame = 0: frame = 0
				gameFrame = 3: frame = 1
				gameFrame = 6: frame = 2
				gameFrame = 9: frame = 3
				gameFrame = 12: frame = 4
				gameFrame = 15: frame = 0 (loops back)
		*/
		if (gameFrame % this.flapSpeed === 0) {
			this.frame = (this.frame + 1) % 5;
		}
	}

	draw() {
		ctx.drawImage(
			this.image,
			this.frame * this.spriteWidth, 0,
			this.spriteWidth, this.spriteHeight,
			this.x, this.y, this.width, this.height
		);
	}
}

// Initialize enemies
function createEnemies() {
	for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
		enemiesArray.push(new Enemy('./assets/enemies/enemy1.png', 293, 155));
	}
}

// Animation loop
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	enemiesArray.forEach(enemy => {
		enemy.update();
		enemy.draw();
	});
	gameFrame++;
	requestAnimationFrame(animate);
}

// Start animation when the window loads
window.addEventListener('load', () => {
	createEnemies();
	animate();
});
