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

let x = 0;
let x2 = 2400;

// Animation loop
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	// Draw the current frame of the sprite onto the canvas
	ctx.drawImage(backgroundLayer4, x, 0);
	ctx.drawImage(backgroundLayer4, x2, 0);

	x = (x < -2400) ? 2400 + x2 - gameSpeed : x -= gameSpeed;
	x2 = (x2 < -2400) ? 2400 + x - gameSpeed : x2 -= gameSpeed;

	// Recursively call the animate function to keep the animation running
	requestAnimationFrame(animate);
}

// Start the animation loop
animate();