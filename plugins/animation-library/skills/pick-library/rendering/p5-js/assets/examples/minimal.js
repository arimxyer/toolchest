// p5.js minimal example — bouncing ball (global mode)
// Runs in the p5.js Editor or any page with <script src="p5.min.js">

let x, y;       // ball position
let vx, vy;     // velocity
const RADIUS = 20;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  vx = 3;
  vy = 2;
}

function draw() {
  background(30);           // dark gray — clears previous frame

  // Move
  x += vx;
  y += vy;

  // Bounce off walls
  if (x - RADIUS < 0 || x + RADIUS > width)  vx *= -1;
  if (y - RADIUS < 0 || y + RADIUS > height) vy *= -1;

  // Draw ball
  noStroke();
  fill(100, 180, 255);
  ellipse(x, y, RADIUS * 2);
}
