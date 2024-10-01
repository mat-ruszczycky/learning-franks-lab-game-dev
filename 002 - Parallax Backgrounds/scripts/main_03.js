// Setup canvas and 2D drawing context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Game state
const slider = document.querySelector('#slider');
let gameSpeed = slider.value;

const showGameSpeed = document.querySelector('#showGameSpeed');
showGameSpeed.innerHTML = slider.value;

slider.addEventListener('change', (e) => {
	gameSpeed = showGameSpeed.innerHTML = e.target.value;

})

// Background image sources
const backgroundLayers = [
	'./assets/backgroundLayers/layer-1.png',
	'./assets/backgroundLayers/layer-2.png',
	'./assets/backgroundLayers/layer-3.png',
	'./assets/backgroundLayers/layer-4.png',
	'./assets/backgroundLayers/layer-5.png'
].map(src => {
	const img = new Image();
	img.src = src;
	return img;
});

// Create a new Image objects for backgrounds
class Layer {
	constructor(image, speedModifier) {
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 700;
		this.x2 = this.width;
		this.image = image;
		this.speedModifier = speedModifier;
		this.speed = gameSpeed * this.speedModifier;
	}

	update() {
		this.speed = gameSpeed * this.speedModifier;

		if (this.x <= -this.width) {
			this.x = this.width + this.x2 - this.speed;
		}

		if (this.x2 <= -this.width) {
			this.x2 = this.width + this.x - this.speed;
		}

		this.x = Math.floor(this.x - this.speed);
		this.x2 = Math.floor(this.x2 - this.speed);
	}

	draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
	}
}

// Create Layer instances for each background
const gameLayers = backgroundLayers.map((img, index) => new Layer(img, (index + 1) * 0.2));

// Animation loop
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	gameLayers.forEach(layer => {
		layer.update();
		layer.draw();
	});

	requestAnimationFrame(animate);
}

// Start the animation loop
animate();