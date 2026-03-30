// Demographic Transition Model
// CANVAS_HEIGHT: 480
// Interactive visualization of birth rates, death rates, and population through 4 stages

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let stageSlider;

// Stage data points (birth rate, death rate per 1000, relative population index)
// We'll interpolate smoothly across 100 points
const stageLabels = ['Stage 1:\nPre-Industrial', 'Stage 2:\nEarly Transition', 'Stage 3:\nLate Transition', 'Stage 4:\nPost-Industrial'];

// Country positions on model (stage as fraction 0-1)
const countryDots = [
  { name: 'Niger', stage: 0.2, br: 45, dr: 10 },
  { name: 'Nigeria', stage: 0.3, br: 36, dr: 11 },
  { name: 'India', stage: 0.55, br: 17, dr: 7 },
  { name: 'USA', stage: 0.82, br: 11, dr: 9 },
  { name: 'Japan', stage: 0.95, br: 7, dr: 11 },
  { name: 'Germany', stage: 0.92, br: 9, dr: 12 }
];

function getBirthRate(t) {
  // t from 0 to 1 across all stages
  // High and flat in stage 1, drops in stage 2-3, low in stage 4
  if (t < 0.25) return 42;
  if (t < 0.75) return map(t, 0.25, 0.75, 42, 12);
  return map(t, 0.75, 1.0, 12, 9);
}

function getDeathRate(t) {
  // High in stage 1, drops sharply in stage 2, low and flat after
  if (t < 0.15) return 40;
  if (t < 0.45) return map(t, 0.15, 0.45, 40, 10);
  if (t < 0.8) return map(t, 0.45, 0.8, 10, 9);
  return map(t, 0.8, 1.0, 9, 11);
}

function getPopulation(t) {
  // Integrates growth: slow stage 1, rapid stage 2-3, leveling stage 4
  // Approximate with a logistic-like shape
  if (t < 0.15) return map(t, 0, 0.15, 10, 12);
  if (t < 0.7) return map(t, 0.15, 0.7, 12, 85);
  return map(t, 0.7, 1.0, 85, 95);
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Demographic transition model showing birth rates, death rates, and population through 4 stages', LABEL);

  let el = createSpan('Stage Position:');
  el.parent(document.querySelector('main'));
  el.position(10, drawHeight + 15);
  el.style('font-size', '14px');

  stageSlider = createSlider(0, 100, 0, 1);
  stageSlider.parent(document.querySelector('main'));
  stageSlider.position(120, drawHeight + 12);
  stageSlider.size(canvasWidth > 400 ? 280 : canvasWidth - 140);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let gLeft = margin + 40;
  let gRight = canvasWidth - margin - 10;
  let gTop = 35;
  let gBottom = drawHeight - 90;
  let gWidth = gRight - gLeft;
  let gHeight = gBottom - gTop;

  // Title
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Demographic Transition Model', canvasWidth / 2, 5);

  // Draw stage regions
  let stageColors = [
    [255, 230, 230, 60],
    [255, 245, 220, 60],
    [220, 245, 220, 60],
    [220, 230, 255, 60]
  ];
  for (let i = 0; i < 4; i++) {
    let x1 = map(i * 0.25, 0, 1, gLeft, gRight);
    let x2 = map((i + 1) * 0.25, 0, 1, gLeft, gRight);
    noStroke();
    fill(stageColors[i]);
    rect(x1, gTop, x2 - x1, gHeight);

    // Stage label at bottom
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    let lines = stageLabels[i].split('\n');
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], (x1 + x2) / 2, gBottom + 5 + j * 12);
    }

    // Vertical divider
    if (i > 0) {
      stroke(180);
      strokeWeight(0.5);
      drawingContext.setLineDash([3, 3]);
      line(x1, gTop, x1, gBottom);
      drawingContext.setLineDash([]);
    }
  }

  // Y-axes
  stroke(0);
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Rate axis labels (left)
  noStroke();
  fill(0);
  textSize(10);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let val = i * 12;
    let y = map(val, 0, 48, gBottom, gTop);
    text(val, gLeft - 5, y);
    stroke(220);
    strokeWeight(0.3);
    line(gLeft, y, gRight, y);
    noStroke();
  }

  push();
  translate(12, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textSize(11);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Rate per 1000', 0, 0);
  pop();

  // Draw curves
  noFill();
  let steps = 200;

  // Birth rate (red)
  stroke(220, 50, 50);
  strokeWeight(2.5);
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = map(t, 0, 1, gLeft, gRight);
    let y = map(getBirthRate(t), 0, 48, gBottom, gTop);
    vertex(x, y);
  }
  endShape();

  // Death rate (blue)
  stroke(50, 80, 220);
  strokeWeight(2.5);
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = map(t, 0, 1, gLeft, gRight);
    let y = map(getDeathRate(t), 0, 48, gBottom, gTop);
    vertex(x, y);
  }
  endShape();

  // Population (green, dashed)
  stroke(50, 180, 50);
  strokeWeight(2);
  drawingContext.setLineDash([6, 3]);
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = map(t, 0, 1, gLeft, gRight);
    let y = map(getPopulation(t), 0, 100, gBottom, gTop);
    vertex(x, y);
  }
  endShape();
  drawingContext.setLineDash([]);

  // Current position indicator
  let currentT = stageSlider.value() / 100;
  let curX = map(currentT, 0, 1, gLeft, gRight);
  stroke(0, 0, 0, 100);
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(curX, gTop, curX, gBottom);
  drawingContext.setLineDash([]);

  // Values at current position
  let curBR = getBirthRate(currentT);
  let curDR = getDeathRate(currentT);
  let growthRate = curBR - curDR;

  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  let infoX = gLeft + 5;
  let infoY = gTop + 5;
  fill(220, 50, 50);
  text('Birth Rate: ' + nf(curBR, 0, 1) + '/1000', infoX, infoY);
  fill(50, 80, 220);
  text('Death Rate: ' + nf(curDR, 0, 1) + '/1000', infoX, infoY + 14);
  fill(0);
  text('Growth: ' + nf(growthRate, 0, 1) + '/1000', infoX, infoY + 28);

  // Country dots
  for (let cd of countryDots) {
    let cx = map(cd.stage, 0, 1, gLeft, gRight);
    let cy = map(cd.br, 0, 48, gBottom, gTop);

    // Check hover
    let hovered = dist(mouseX, mouseY, cx, cy) < 12;

    fill(255, 165, 0);
    stroke(0);
    strokeWeight(1);
    ellipse(cx, cy, hovered ? 12 : 8);

    noStroke();
    fill(0);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text(cd.name, cx, cy - 7);

    if (hovered) {
      // Tooltip
      fill(255, 255, 240, 230);
      stroke(0);
      strokeWeight(0.5);
      let tw = 140;
      let th = 45;
      let tx = cx + 10;
      let ty = cy - 50;
      if (tx + tw > gRight) tx = cx - tw - 10;
      if (ty < gTop) ty = cy + 10;
      rect(tx, ty, tw, th, 4);
      noStroke();
      fill(0);
      textSize(10);
      textAlign(LEFT, TOP);
      text(cd.name, tx + 5, ty + 3);
      text('Birth Rate: ' + cd.br + '/1000', tx + 5, ty + 15);
      text('Death Rate: ' + cd.dr + '/1000', tx + 5, ty + 27);
    }
  }

  // Legend
  let legX = gRight - 130;
  let legY = gTop + 5;
  noStroke();
  fill(220, 50, 50);
  rect(legX, legY, 15, 3);
  fill(0);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Birth Rate', legX + 20, legY + 2);

  fill(50, 80, 220);
  noStroke();
  rect(legX, legY + 12, 15, 3);
  fill(0);
  text('Death Rate', legX + 20, legY + 14);

  stroke(50, 180, 50);
  strokeWeight(2);
  drawingContext.setLineDash([4, 2]);
  line(legX, legY + 26, legX + 15, legY + 26);
  drawingContext.setLineDash([]);
  noStroke();
  fill(0);
  text('Population', legX + 20, legY + 26);
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
