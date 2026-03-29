// Resilience Ball-in-Basin Model MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 75;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let resilienceSlider, disturbanceSlider;
let degradeBtn;
let ballX, ballVx;
let degrading = false;
let degradeAmount = 0;
let gravity = 0.15;
let friction = 0.985;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Resilience ball-in-basin model showing regime shifts when disturbance exceeds system resilience', LABEL);

  resilienceSlider = createSlider(10, 100, 70, 1);
  resilienceSlider.parent(document.querySelector('main'));
  resilienceSlider.style('width', '120px');

  disturbanceSlider = createSlider(0, 100, 0, 1);
  disturbanceSlider.parent(document.querySelector('main'));
  disturbanceSlider.style('width', '120px');

  degradeBtn = createButton('Slow Degradation');
  degradeBtn.parent(document.querySelector('main'));
  degradeBtn.mousePressed(() => {
    degrading = !degrading;
    if (!degrading) degradeAmount = 0;
  });

  let resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    ballX = 0.3;
    ballVx = 0;
    degrading = false;
    degradeAmount = 0;
    resilienceSlider.value(70);
    disturbanceSlider.value(0);
  });

  ballX = 0.3; // fraction across canvas (0-1)
  ballVx = 0;
}

function draw() {
  updateCanvasSize();

  let resilience = resilienceSlider.value() - degradeAmount;
  resilience = max(resilience, 5);
  let disturbance = disturbanceSlider.value();

  // Slow degradation
  if (degrading) {
    degradeAmount += 0.05;
    if (resilience <= 10) {
      degrading = false;
    }
  }

  // Basin landscape function
  // Two basins: healthy (left) and degraded (right) with a ridge between
  let ridgePos = 0.55;
  let healthyDepth = resilience / 100 * 0.8; // deeper = more resilient
  let degradedDepth = 0.5;
  let landscapeY = drawHeight * 0.6;

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Resilience: Ball-in-Basin Model', canvasWidth / 2, 6);

  // Draw landscape
  let basinPoints = [];
  noFill();
  stroke(100, 70, 40);
  strokeWeight(3);
  beginShape();
  for (let px = 0; px <= canvasWidth; px++) {
    let frac = px / canvasWidth;
    let y = getBasinY(frac, ridgePos, healthyDepth, degradedDepth);
    let screenY = landscapeY + y * 200;
    vertex(px, screenY);
    basinPoints.push({ x: px, y: screenY });
  }
  endShape();

  // Fill basins with color
  // Healthy basin (green gradient)
  noStroke();
  for (let px = 0; px < canvasWidth * ridgePos; px++) {
    let frac = px / canvasWidth;
    let y = getBasinY(frac, ridgePos, healthyDepth, degradedDepth);
    let screenY = landscapeY + y * 200;
    let alpha = map(y, 0, -healthyDepth, 0, 100);
    fill(80, 180, 80, max(0, alpha));
    rect(px, screenY, 1, drawHeight - screenY);
  }

  // Degraded basin (brown/orange)
  for (let px = floor(canvasWidth * ridgePos); px < canvasWidth; px++) {
    let frac = px / canvasWidth;
    let y = getBasinY(frac, ridgePos, healthyDepth, degradedDepth);
    let screenY = landscapeY + y * 200;
    let alpha = map(y, 0, -degradedDepth, 0, 100);
    fill(200, 140, 60, max(0, alpha));
    rect(px, screenY, 1, drawHeight - screenY);
  }

  // Ridge line (threshold) in red
  let ridgeX = ridgePos * canvasWidth;
  let ridgeY = landscapeY + getBasinY(ridgePos, ridgePos, healthyDepth, degradedDepth) * 200;
  stroke(220, 50, 50);
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(ridgeX, ridgeY - 60, ridgeX, ridgeY + 10);
  drawingContext.setLineDash([]);
  noStroke();
  fill(220, 50, 50);
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('Threshold', ridgeX, ridgeY - 62);

  // Basin labels
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  fill(30, 120, 30);
  text('Healthy Forest', canvasWidth * 0.28, landscapeY + 50);
  fill(150, 80, 20);
  text('Degraded Grassland', canvasWidth * 0.78, landscapeY + 50);

  // Physics: compute ball position
  let ballScreenX = ballX * canvasWidth;
  let slope = getBasinSlope(ballX, ridgePos, healthyDepth, degradedDepth);
  let force = slope * gravity;
  ballVx += force;
  ballVx *= friction;

  // Apply disturbance as impulse toward right
  if (disturbance > 0) {
    ballVx += disturbance * 0.0003;
    disturbanceSlider.value(max(0, disturbance - 0.3));
  }

  ballX += ballVx * 0.01;
  ballX = constrain(ballX, 0.02, 0.98);

  // Ball position on landscape
  let ballLandscapeY = landscapeY + getBasinY(ballX, ridgePos, healthyDepth, degradedDepth) * 200;

  // Draw ball shadow
  fill(0, 0, 0, 40);
  noStroke();
  ellipse(ballScreenX + 3, ballLandscapeY + 3, 26, 26);

  // Draw ball
  fill(60, 120, 220);
  stroke(40, 80, 180);
  strokeWeight(2);
  ellipse(ballScreenX, ballLandscapeY - 10, 24, 24);

  // Highlight
  fill(150, 200, 255, 150);
  noStroke();
  ellipse(ballScreenX - 4, ballLandscapeY - 14, 8, 8);

  // Status info
  let currentState = ballX < ridgePos ? 'Healthy Forest' : 'Degraded Grassland';
  let distToThreshold = abs(ballX - ridgePos) * canvasWidth;

  noStroke();
  fill(255, 255, 255, 220);
  rect(8, 28, 220, 62, 5);
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text('State: ' + currentState, 15, 33);
  text('Resilience: ' + nf(resilience, 1, 0) + '%', 15, 48);
  text('Distance to Threshold: ' + nf(distToThreshold, 1, 0) + 'px', 15, 63);

  if (degrading) {
    fill(255, 100, 50);
    textSize(11);
    text('\u26A0 Resilience degrading...', 15, 78);
  }

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);

  text('Resilience: ' + nf(resilience, 1, 0) + '%', 10, drawHeight + 16);
  resilienceSlider.position(sliderLeftMargin, drawHeight + 7);

  text('Disturbance: ' + disturbance, 10, drawHeight + 40);
  disturbanceSlider.position(sliderLeftMargin, drawHeight + 32);

  degradeBtn.position(sliderLeftMargin + 135, drawHeight + 7);
}

function getBasinY(frac, ridgePos, healthyDepth, degradedDepth) {
  // Two parabolic basins joined at ridge
  if (frac < ridgePos) {
    // Healthy basin: centered at ~0.28
    let center = ridgePos * 0.5;
    let t = (frac - center) / (ridgePos - center);
    return -healthyDepth * (1 - t * t);
  } else {
    // Degraded basin: centered at ~0.78
    let center = ridgePos + (1 - ridgePos) * 0.5;
    let t = (frac - center) / ((1 - ridgePos) * 0.5);
    t = constrain(t, -1, 1);
    return -degradedDepth * (1 - t * t);
  }
}

function getBasinSlope(frac, ridgePos, healthyDepth, degradedDepth) {
  let dx = 0.005;
  let y1 = getBasinY(frac - dx, ridgePos, healthyDepth, degradedDepth);
  let y2 = getBasinY(frac + dx, ridgePos, healthyDepth, degradedDepth);
  return (y2 - y1) / (2 * dx);
}

function mousePressed() {
  // Allow clicking to apply impulse to ball
  let ballScreenX = ballX * canvasWidth;
  let landscapeY = drawHeight * 0.6;
  let ballLandscapeY = landscapeY + getBasinY(ballX, 0.55, max(5, resilienceSlider.value() - degradeAmount) / 100 * 0.8, 0.5) * 200;

  if (dist(mouseX, mouseY, ballScreenX, ballLandscapeY - 10) < 30) {
    // Drag direction
    ballVx += (mouseX - ballScreenX) * 0.005;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
