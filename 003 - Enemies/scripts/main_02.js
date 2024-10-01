/** @type {HTMLCanvasElement} **/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 300;
const enemiesArray = [];

let gameFrame = 0;

// Enemy class definition
class Enemy {
	constructor() {
		// Random initial position and speed
		this.image = new Image();
		this.image.src = './assets/enemies/enemy1.png';
		this.x = Math.random() * CANVAS_WIDTH;
		this.y = Math.random() * CANVAS_HEIGHT;
		this.speed = Math.random() * 4 - 2; // Random speed between -2 and 2 from [0, 4] to [-2, 2]
		this.spriteWidth = 293;
		this.spriteHeight = 155;
		this.width = this.spriteWidth / 2.5;
		this.height = this.spriteHeight / 2.5;
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
	}

	update() {
		// Move the enemy
		this.x += this.speed;
		this.y += this.speed;
		// Animate sprites
		if (gameFrame % this.flapSpeed === 0) {
			this.frame > 4 ? this.frame = 0 : this.frame++;
		}
	}

	draw() {
		// Draw the enemy as a stroked rectangle
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

// Create multiple enemies and push them into the array
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy());
}

// Start the animation loop once the window loads
window.addEventListener('load', () => {
	function animate() {
		// Clear the canvas for each frame
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// Update and draw each enemy
		enemiesArray.forEach((enemy) => {
			enemy.update();
			enemy.draw();
		});
		gameFrame++;
		// Request the next animation frame
		requestAnimationFrame(animate);
	}

	// Start the animation
	animate();
});
