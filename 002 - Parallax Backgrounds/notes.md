Let's break this down with a metaphor.

Imagine you're on a moving walkway at the airport, and you see a large mural on the wall next to you. The mural is so big that as you move forward, you never see the whole thing at once—it just keeps scrolling past you.

Now, think of each Layer as a part of the mural, but on its own separate walkway that moves at a different speed. Some sections of the mural move faster (closer to you) and others slower (farther away), which creates the illusion of depth.

Key parts:
image: This is the mural you are seeing, one slice of the entire landscape.
speedModifier: This is how fast the walkway (this specific layer) is moving compared to a base speed. A fast speed makes the image scroll quickly, while a slow speed makes it move gently, simulating distance.
gameSpeed: This is like the speed of the airport walkways. Some walk faster, and the speedModifier makes each mural section adjust its pace accordingly.
How the math works:
this.speed = gameSpeed * this.speedModifier;
This is like saying, "The walkway speed (how fast this part of the mural moves) is determined by the base walkway speed times how far away this mural slice is." If it’s closer to you, the speedModifier is higher; if farther, it’s lower.

update():
The mural scrolls left (moves across your vision).

this.x - this.speed means the starting position moves left at a rate of this.speed.
% this.width keeps the mural repeating. Imagine that once the left side of the mural disappears from view, it wraps back around seamlessly.
Example:
If you're on a walkway and looking at a mural moving at 5 mph, a layer might move slower (2 mph if it’s far away) or faster (8 mph if it’s closer). The formula inside the update() method calculates where each layer should be on your screen at any moment.

In the draw() method, it makes sure the mural is always drawn twice—one instance in front of you, and another just behind it, so when the first scrolls off, the next part is ready to appear. The math ensures a seamless cycle.

This creates that parallax scrolling effect, where different layers move at different speeds, creating depth and movement in a 2D space, like different scenes on those airport walkways!