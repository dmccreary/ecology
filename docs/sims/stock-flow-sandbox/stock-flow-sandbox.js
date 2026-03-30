// Interactive Stock and Flow Sandbox MicroSim
// CANVAS_HEIGHT: 530
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let inflowSlider, outflowSlider;
let presetSelect;
let stockLevel = 50;
let stockHistory = [];
let maxHistory = 200;
let time = 0;
let tankX, tankY, tankW, tankH;

let presets = {
  'Custom': { inLabel: 'Inflow', outLabel: 'Outflow', stockLabel: 'Stock', inVal: 5, outVal: 5 },
  'Lake Water Budget': { inLabel: 'Rainfall', outLabel: 'Evaporation', stockLabel: 'Lake Volume', inVal: 6, outVal: 4 },
  'Deer Population': { inLabel: 'Births', outLabel: 'Deaths', stockLabel: 'Deer Pop.', inVal: 7, outVal: 5 },
  'Carbon in Atmosphere': { inLabel: 'Emissions', outLabel: 'Absorption', stockLabel: 'Atmospheric CO\u2082', inVal: 8, outVal: 4 }
};

let currentLabels;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Stock and flow sandbox simulation with inflow and outflow controls', LABEL);

  presetSelect = createSelect();
  presetSelect.parent(document.querySelector('main'));
  for (let p in presets) presetSelect.option(p);
  presetSelect.changed(applyPreset);

  inflowSlider = createSlider(0, 10, 5, 0.5);
  inflowSlider.parent(document.querySelector('main'));
  inflowSlider.style('width', '120px');

  outflowSlider = createSlider(0, 10, 5, 0.5);
  outflowSlider.parent(document.querySelector('main'));
  outflowSlider.style('width', '120px');

  currentLabels = presets['Custom'];
}

function applyPreset() {
  let p = presets[presetSelect.value()];
  currentLabels = p;
  inflowSlider.value(p.inVal);
  outflowSlider.value(p.outVal);
  stockLevel = 50;
  stockHistory = [];
  time = 0;
}

function draw() {
  updateCanvasSize();
  time++;

  let inflow = inflowSlider.value();
  let outflow = outflowSlider.value();

  // Update stock
  let dt = 0.05;
  stockLevel += (inflow - outflow) * dt;
  stockLevel = constrain(stockLevel, 0, 100);

  // Record history
  if (time % 3 === 0) {
    stockHistory.push(stockLevel);
    if (stockHistory.length > maxHistory) stockHistory.shift();
  }

  let isEquilibrium = abs(inflow - outflow) < 0.5;

  // --- Draw area ---
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('Stock & Flow: ' + currentLabels.stockLabel, canvasWidth / 2, 6);

  // Tank
  tankW = canvasWidth * 0.3;
  tankH = 180;
  tankX = canvasWidth / 2 - tankW / 2;
  tankY = 55;

  // Tank outline
  stroke(100);
  strokeWeight(2);
  noFill();
  rect(tankX, tankY, tankW, tankH, 3);

  // Water level
  let waterH = (stockLevel / 100) * tankH;
  let waterY = tankY + tankH - waterH;
  noStroke();
  fill(70, 150, 230, 200);
  rect(tankX + 1, waterY, tankW - 2, waterH - 1, 0, 0, 2, 2);

  // Water ripple
  stroke(100, 180, 255, 100);
  strokeWeight(1);
  for (let i = 0; i < 3; i++) {
    let ry = waterY + 5 + i * 8;
    if (ry < tankY + tankH - 5) {
      let offset = sin(time * 0.05 + i) * 5;
      line(tankX + 10 + offset, ry, tankX + tankW - 10 + offset, ry);
    }
  }

  // Stock level text
  noStroke();
  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(nf(stockLevel, 1, 1), tankX + tankW / 2, tankY + tankH / 2);

  // Inflow arrow (left)
  let arrowY = tankY + 30;
  let arrowStartX = tankX - 80;
  drawArrow(arrowStartX, arrowY, tankX - 5, arrowY, inflow, color(50, 180, 50));

  // Inflow label
  noStroke();
  fill(50, 150, 50);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(currentLabels.inLabel, arrowStartX + 30, arrowY - 8);
  text(nf(inflow, 1, 1) + '/s', arrowStartX + 30, arrowY + 20);

  // Animated inflow drops
  if (inflow > 0) {
    fill(50, 180, 50, 180);
    noStroke();
    for (let i = 0; i < ceil(inflow / 2); i++) {
      let dx = (time * 2 + i * 30) % 80;
      ellipse(arrowStartX + dx, arrowY - 3 + sin(time * 0.1 + i) * 3, 5, 5);
    }
  }

  // Outflow arrow (right)
  let outArrowStartX = tankX + tankW + 5;
  let outArrowEndX = outArrowStartX + 80;
  drawArrow(outArrowStartX, arrowY, outArrowEndX, arrowY, outflow, color(220, 60, 60));

  // Outflow label
  noStroke();
  fill(200, 50, 50);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(currentLabels.outLabel, outArrowStartX + 40, arrowY - 8);
  text(nf(outflow, 1, 1) + '/s', outArrowStartX + 40, arrowY + 20);

  // Animated outflow drops
  if (outflow > 0) {
    fill(220, 60, 60, 180);
    noStroke();
    for (let i = 0; i < ceil(outflow / 2); i++) {
      let dx = (time * 2 + i * 30) % 80;
      ellipse(outArrowStartX + dx, arrowY - 3 + sin(time * 0.1 + i) * 3, 5, 5);
    }
  }

  // Equilibrium indicator
  let eqX = canvasWidth / 2;
  let eqY = tankY + tankH + 15;
  if (isEquilibrium) {
    fill(255, 240, 100);
    stroke(200, 180, 0);
    strokeWeight(2);
    rect(eqX - 90, eqY, 180, 24, 12);
    noStroke();
    fill(80, 70, 0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('\u2605 Dynamic Equilibrium \u2605', eqX, eqY + 12);
  } else {
    let trend = inflow > outflow ? '\u25B2 Accumulating' : '\u25BC Depleting';
    let tColor = inflow > outflow ? color(50, 150, 50) : color(220, 60, 60);
    fill(tColor);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(trend, eqX, eqY + 12);
  }

  // --- Line chart ---
  let chartX = margin + 10;
  let chartY = tankY + tankH + 48;
  let chartW = canvasWidth - 2 * margin - 20;
  let chartH = drawHeight - chartY - 15;

  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(chartX, chartY, chartW, chartH, 4);

  // Chart title
  noStroke();
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Stock Level Over Time', chartX + 5, chartY + 3);

  // Grid
  stroke(230);
  strokeWeight(0.5);
  for (let i = 0; i <= 4; i++) {
    let gy = chartY + chartH - (i / 4) * chartH;
    line(chartX, gy, chartX + chartW, gy);
  }

  // Y-axis labels
  noStroke();
  fill(150);
  textSize(9);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let gy = chartY + chartH - (i / 4) * chartH;
    text((i * 25), chartX - 3, gy);
  }

  // Plot line
  noFill();
  stroke(70, 150, 230);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < stockHistory.length; i++) {
    let px = chartX + (i / maxHistory) * chartW;
    let py = chartY + chartH - (stockHistory[i] / 100) * chartH;
    vertex(px, py);
  }
  endShape();

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);

  text('Scenario:', 10, drawHeight + 18);
  presetSelect.position(85, drawHeight + 8);

  text(currentLabels.inLabel + ': ' + nf(inflow, 1, 1), 10, drawHeight + 48);
  inflowSlider.position(sliderLeftMargin, drawHeight + 40);

  text(currentLabels.outLabel + ': ' + nf(outflow, 1, 1), 10, drawHeight + 74);
  outflowSlider.position(sliderLeftMargin, drawHeight + 66);
}

function drawArrow(x1, y1, x2, y2, val, col) {
  let thickness = map(val, 0, 10, 2, 12);
  stroke(col);
  strokeWeight(thickness);
  line(x1, y1, x2, y1);
  // Arrowhead
  fill(col);
  noStroke();
  let dir = x2 > x1 ? 1 : -1;
  triangle(x2, y1 - thickness, x2, y1 + thickness, x2 + dir * 12, y1);
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
