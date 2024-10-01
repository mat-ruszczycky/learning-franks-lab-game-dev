// Set initial player state
let playerState = 'idle';

const dropdown = document.querySelector('#animations');
dropdown.addEventListener('change', (e) => {
	playerState = e.target.value;
}, false);

// Select the canvas element from the DOM and set up 2D drawing context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Create a new Image object for the sprite sheet
const playerImage = new Image();
playerImage.src = './assets/shadow_dog.png'; // Path to the sprite sheet

// Sprite sheet dims
const spriteMaxRows = 10;
const spriteMaxCols = 12;

const spriteSheetWidth = 6900;
const spriteSheetHeight = 5230;

// Width of sprite sheet / max number of cols
const spriteWidth = spriteSheetWidth / spriteMaxCols;

// Height of sprite sheet / number of rows
const spriteHeight = spriteSheetHeight / spriteMaxRows;

// Game-related variables
let gameFrame = 0; // Tracks the number of frames since the animation started
let staggerFrame = 5; // Controls the speed of the animation

// Array to store animation data
const spriteAnimations = [];

// Define animation states and their respective number of frames
const animationState = [
	{ name: 'idle', frames: 7 },
	{ name: 'jump', frames: 7 },
	{ name: 'fall', frames: 7 },
	{ name: 'run', frames: 9 },
	{ name: 'dizzy', frames: 11 },
	{ name: 'sit', frames: 5 },
	{ name: 'roll', frames: 7 },
	{ name: 'bite', frames: 7 },
	{ name: 'ko', frames: 12 },
	{ name: 'getHit', frames: 4 }
];

// Create animation frames based on state
animationState.forEach((state, indx) => {
	let frames = { loc: [] }; // Array to store frame coordinates

	for (let j = 0; j < state.frames; j++) {
		// Calculate x and y positions for each frame in the sprite sheet
		let positionX = j * spriteWidth;
		let positionY = indx * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}

	// Store frames in the spriteAnimations array, indexed by animation name
	spriteAnimations[state.name] = frames;
});

console.dir(spriteAnimations);

// Animation loop
function animate() {
	// Clear the canvas for each new frame
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Calculate the current frame position based on the gameFrame count and staggerFrame
	let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;

	// Extract the x and y positions for the current frame
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState].loc[position].y;

	// Draw the current frame of the sprite onto the canvas
	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	// Increment the game frame for the next animation step
	gameFrame++;

	// Recursively call the animate function to keep the animation running
	requestAnimationFrame(animate);
}

// Start the animation loop
animate();
