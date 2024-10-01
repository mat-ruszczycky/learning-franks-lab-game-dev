// Select the canvas element from the DOM and set up 2D drawing context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Set initial states
let gameSpeed = 15;

// Create a new Image objects for backgrounds
const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/backgroundLayers/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/backgroundLayers/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/backgroundLayers/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/backgroundLayers/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/backgroundLayers/layer-5.png';

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

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1.0);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

// Animation loop
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	gameObjects.forEach((gameObject) => {
		gameObject.update();
		gameObject.draw();
	});

	// Recursively call the animate function to keep the animation running
	requestAnimationFrame(animate);
}

// Start the animation loop
animate();