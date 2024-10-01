// Canvas setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

// Constants
const NUMBER_OF_ENEMIES = 300;
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
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		// Loop sprite animation frames
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
