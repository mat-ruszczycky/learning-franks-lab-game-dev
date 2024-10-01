/** @type {HTMLCanvasElement} **/
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

class Enemy {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.width = 100;
		this.height = 100;
		this.speed = Math.random() * 4 - 2;
	}

	update() {
		this.x += this.speed;
		this.y += this.speed;
	}

	draw() {
		// ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}

for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy());
}

window.addEventListener('load', () => {
	// Animation loop
	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		enemiesArray.forEach((enemy) => {
			enemy.update();
			enemy.draw();
		});
		requestAnimationFrame(animate);
	}

	// Start the animation loop
	animate();
})