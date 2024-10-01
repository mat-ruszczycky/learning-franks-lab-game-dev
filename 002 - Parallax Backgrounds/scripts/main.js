// Setup canvas and 2D drawing context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

window.addEventListener('load', () => {
	// Game state
	const slider = document.querySelector('#slider');
	let gameSpeed = slider.value;
	let gameFrame = 0;

	const showGameSpeed = document.querySelector('#showGameSpeed');
	showGameSpeed.innerHTML = slider.value;

	slider.addEventListener('change', (e) => {
		gameSpeed = showGameSpeed.innerHTML = e.target.value;
	})

	// Background image sources
	const basePath = './assets/backgroundLayers/';
	const backgroundLayers = [
		`${basePath}/layer-1.png`,
		`${basePath}/layer-2.png`,
		`${basePath}/layer-3.png`,
		`${basePath}/layer-4.png`,
		`${basePath}/layer-5.png`
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
			this.image = image;
			this.speedModifier = speedModifier;
			this.speed = gameSpeed * this.speedModifier;
		}

		update() {
			if (this.speed !== gameSpeed * this.speedModifier) {
				this.speed = gameSpeed * this.speedModifier; // only recalculate if needed
			}

			this.x = Math.floor(this.x - this.speed) % this.width;
		}

		draw() {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
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
		gameFrame--;
		requestAnimationFrame(animate);
	}

	// Start the animation loop
	animate();
})