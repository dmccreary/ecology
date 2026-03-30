// Survivorship Curve Explorer
// CANVAS_HEIGHT: 495
// Compare Type I, II, and III survivorship curves with real species

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let speciesSelect;
let hoveredPoint = null;

const speciesData = [
  { name: 'Human',          type: 1, icon: 'H', maxLifespan: '80 years' },
  { name: 'Elephant',       type: 1, icon: 'E', maxLifespan: '70 years' },
  { name: 'Robin',          type: 2, icon: 'R', maxLifespan: '13 years' },
  { name: 'Songbird',       type: 2, icon: 'S', maxLifespan: '10 years' },
  { name: 'Sea Turtle',     type: 3, icon: 'T', maxLifespan: '80 years' },
  { name: 'Oyster',         type: 3, icon: 'O', maxLifespan: '20 years' },
  { name: 'Oak Tree',       type: 3, icon: 'K', maxLifespan: '500 years' }
];

let selectedSpecies = -1;

const curveColors = {
  1: [41, 98, 176],    // Blue - Type I
  2: [50, 160, 50],    // Green - Type II
  3: [200, 80, 40]     // Red-orange - Type III
};

const curveLabels = {
  1: 'Type I (Late loss)',
  2: 'Type II (Constant loss)',
  3: 'Type III (Early loss)'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Survivorship curves showing Type I, II, and III patterns with species examples', LABEL);

  speciesSelect = createSelect();
  speciesSelect.parent(document.querySelector('main'));
  speciesSelect.position(10, drawHeight + 5);
  speciesSelect.option('Select a species...', '-1');
  for (let i = 0; i < speciesData.length; i++) {
    speciesSelect.option(speciesData[i].name, String(i));
  }
  speciesSelect.changed(() => {
    selectedSpecies = int(speciesSelect.value());
  });
}

// Survivorship functions (log scale, returns survivors out of 1000)
function typeI(x) {
  // Stays high, drops sharply at end
  return 1000 * exp(-pow(x / 100, 4) * 3);
}

function typeII(x) {
  // Constant rate of mortality
  return 1000 * exp(-x * 0.046);
}

function typeIII(x) {
  // High early mortality, survivors live long
  return 1000 * exp(-pow((100 - x) / 100, 0.3) * 6.9 + 0.0 * x / 100);
}

function getSurvivors(type, x) {
  if (type === 1) return typeI(x);
  if (type === 2) return typeII(x);
  return typeIII(x);
}

// Better Type III: drops fast early
function typeIIIcurve(x) {
  // Most die young, few survivors persist
  if (x <= 0) return 1000;
  return 1000 * pow(0.01, pow(x / 100, 0.5));
}

function draw() {
  updateCanvasSize();

  fill('#fafaf5');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(40);
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Survivorship Curves', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Graph dimensions
  let gx = 70;
  let gy = 45;
  let gw = canvasWidth - 110;
  let gh = drawHeight - 130;

  // Axes
  stroke(80);
  strokeWeight(1);
  line(gx, gy, gx, gy + gh);
  line(gx, gy + gh, gx + gw, gy + gh);

  // Y-axis labels (log scale: 1, 10, 100, 1000)
  noStroke();
  fill(80);
  textSize(10);
  textAlign(RIGHT, CENTER);
  let logValues = [1, 10, 100, 1000];
  for (let v of logValues) {
    let py = gy + gh - (log10(v) / 3) * gh;
    text(v, gx - 5, py);
    stroke(220);
    strokeWeight(0.5);
    line(gx, py, gx + gw, py);
    noStroke();
  }

  // Y-axis label
  push();
  translate(15, gy + gh / 2);
  rotate(-HALF_PI);
  noStroke();
  fill(80);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Number of Survivors (log)', 0, 0);
  pop();

  // X-axis labels
  noStroke();
  fill(80);
  textSize(10);
  textAlign(CENTER, TOP);
  for (let v = 0; v <= 100; v += 20) {
    let px = gx + (v / 100) * gw;
    text(v + '%', px, gy + gh + 5);
    stroke(230);
    strokeWeight(0.5);
    line(px, gy, px, gy + gh);
    noStroke();
  }
  textSize(12);
  text('Percentage of Maximum Lifespan', gx + gw / 2, gy + gh + 22);

  // Draw the three curves
  drawSurvivorCurve(1, gx, gy, gw, gh);
  drawSurvivorCurve(2, gx, gy, gw, gh);
  drawSurvivorCurve(3, gx, gy, gw, gh);

  // Draw selected species overlay
  if (selectedSpecies >= 0) {
    let sp = speciesData[selectedSpecies];
    drawSpeciesOverlay(sp, gx, gy, gw, gh);
  }

  // Check hover
  hoveredPoint = null;
  if (mouseX > gx && mouseX < gx + gw && mouseY > gy && mouseY < gy + gh) {
    let pct = ((mouseX - gx) / gw) * 100;
    pct = constrain(pct, 0, 100);
    // Find nearest curve
    let bestDist = 999;
    let bestType = 1;
    for (let t = 1; t <= 3; t++) {
      let surv = getSurvivorsForCurve(t, pct);
      let logS = log10(max(surv, 0.5));
      let py = gy + gh - (logS / 3) * gh;
      let d = abs(mouseY - py);
      if (d < bestDist && d < 30) { bestDist = d; bestType = t; }
    }
    if (bestDist < 30) {
      let surv = getSurvivorsForCurve(bestType, pct);
      hoveredPoint = { pct: pct, surv: surv, type: bestType };
    }
  }

  // Hover tooltip
  if (hoveredPoint) {
    let col = curveColors[hoveredPoint.type];
    let tx = mouseX + 15;
    let ty = mouseY - 30;
    if (tx + 180 > canvasWidth) tx = mouseX - 190;
    fill(255, 255, 255, 230);
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    rect(tx, ty, 175, 40, 5);
    noStroke();
    fill(col[0], col[1], col[2]);
    textSize(11);
    textAlign(LEFT, TOP);
    text(curveLabels[hoveredPoint.type], tx + 8, ty + 5);
    fill(60);
    text('At ' + nf(hoveredPoint.pct, 1, 0) + '% lifespan: ' + nf(hoveredPoint.surv / 10, 1, 1) + '% survive', tx + 8, ty + 22);
  }

  // Legend
  let lx = gx + 10;
  let ly = gy + gh + 45;
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  for (let t = 1; t <= 3; t++) {
    let col = curveColors[t];
    fill(col[0], col[1], col[2]);
    rect(lx, ly + (t - 1) * 20 - 5, 20, 10, 3);
    noStroke();
    fill(60);
    text(curveLabels[t], lx + 28, ly + (t - 1) * 20);
  }

  // Species icons in legend area
  if (selectedSpecies >= 0) {
    let sp = speciesData[selectedSpecies];
    let col = curveColors[sp.type];
    noStroke();
    fill(col[0], col[1], col[2]);
    textSize(13);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Selected: ' + sp.name + ' (' + curveLabels[sp.type] + ')', lx + 200, ly + 10);
    textStyle(NORMAL);
    textSize(11);
    text('Max lifespan: ' + sp.maxLifespan, lx + 200, ly + 28);
  }

  // Control label
  noStroke();
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Species:', 150, drawHeight + 16);
}

function getSurvivorsForCurve(type, x) {
  if (type === 1) return typeI(x);
  if (type === 2) return typeII(x);
  // Type III
  if (x <= 0) return 1000;
  return max(1, 1000 * pow(0.005, pow(x / 100, 0.4)));
}

function drawSurvivorCurve(type, gx, gy, gw, gh) {
  let col = curveColors[type];
  stroke(col[0], col[1], col[2]);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let x = 0; x <= 100; x += 1) {
    let surv = getSurvivorsForCurve(type, x);
    let logS = log10(max(surv, 0.5));
    let px = gx + (x / 100) * gw;
    let py = gy + gh - (logS / 3) * gh;
    vertex(px, constrain(py, gy, gy + gh));
  }
  endShape();
}

function drawSpeciesOverlay(sp, gx, gy, gw, gh) {
  let col = curveColors[sp.type];
  // Draw data points along the species' curve
  fill(col[0], col[1], col[2]);
  noStroke();
  for (let x = 0; x <= 100; x += 10) {
    let surv = getSurvivorsForCurve(sp.type, x);
    // Add slight noise for realism
    let noisySurv = surv * (1 + (noise(x * 0.1 + sp.type) - 0.5) * 0.15);
    noisySurv = max(0.5, noisySurv);
    let logS = log10(noisySurv);
    let px = gx + (x / 100) * gw;
    let py = gy + gh - (logS / 3) * gh;
    py = constrain(py, gy, gy + gh);

    // Species icon
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    fill(255);
    ellipse(px, py, 14, 14);
    noStroke();
    fill(col[0], col[1], col[2]);
    textSize(8);
    textAlign(CENTER, CENTER);
    text(sp.icon, px, py);
  }
}

function log10(x) {
  return Math.log10(max(x, 0.001));
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
