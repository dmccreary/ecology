// Monoculture vs. Polyculture Ecosystem Comparison - p5.js
// Side-by-side simulation of pest spread, drought, and nutrient depletion

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

const GRID_ROWS = 8;
const GRID_COLS = 8;
let monoField = [];
let polyField = [];
let season = 0;
let monoYield = 0;
let polyYield = 0;
let monoYieldHistory = [];
let polyYieldHistory = [];
let monoSoilHealth = 100;
let polySoilHealth = 100;
let monoPesticide = 0;
let polyPesticide = 0;
let stressMessage = '';
let stressTimer = 0;
let running = false;
let autoTimer = 0;
let autoSeasons = 0;

let pestBtn, droughtBtn, run10Btn, resetBtn;

// Plant types for polyculture
const PLANT_TYPES = [
  { name: 'Corn', col: [34, 139, 34], shape: 'circle' },
  { name: 'Bean', col: [255, 165, 0], shape: 'triangle' },
  { name: 'Squash', col: [148, 0, 211], shape: 'square' },
  { name: 'Clover', col: [0, 128, 128], shape: 'diamond' }
];

function initFields() {
  monoField = [];
  polyField = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    monoField[r] = [];
    polyField[r] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      monoField[r][c] = { type: 0, health: 1.0, infected: false };
      polyField[r][c] = { type: Math.floor(random(PLANT_TYPES.length)), health: 1.0, infected: false };
    }
  }
  season = 0;
  monoYield = 0;
  polyYield = 0;
  monoYieldHistory = [];
  polyYieldHistory = [];
  monoSoilHealth = 100;
  polySoilHealth = 100;
  monoPesticide = 0;
  polyPesticide = 0;
  stressMessage = '';
  stressTimer = 0;
  autoSeasons = 0;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  pestBtn = createButton('Pest Outbreak');
  pestBtn.parent(document.querySelector('main'));
  pestBtn.mousePressed(triggerPest);

  droughtBtn = createButton('Drought');
  droughtBtn.parent(document.querySelector('main'));
  droughtBtn.mousePressed(triggerDrought);

  run10Btn = createButton('Run 10 Seasons');
  run10Btn.parent(document.querySelector('main'));
  run10Btn.mousePressed(() => { autoSeasons = 10; });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(initFields);

  initFields();
  describe('Monoculture vs polyculture side-by-side comparison with stress events', LABEL);
}

function advanceSeason() {
  season++;
  // Soil degradation for mono
  monoSoilHealth = max(30, monoSoilHealth - 2.5);
  polySoilHealth = min(100, polySoilHealth + 0.5);

  // Yield calculation
  let mYield = 0, pYield = 0;
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      monoField[r][c].health = min(1.0, monoField[r][c].health + 0.3);
      monoField[r][c].infected = false;
      polyField[r][c].health = min(1.0, polyField[r][c].health + 0.4);
      polyField[r][c].infected = false;
      mYield += monoField[r][c].health * (monoSoilHealth / 100);
      pYield += polyField[r][c].health * (polySoilHealth / 100);
    }
  }
  monoYield += mYield;
  polyYield += pYield;
  monoYieldHistory.push(mYield);
  polyYieldHistory.push(pYield);
}

function triggerPest() {
  stressMessage = 'PEST OUTBREAK!';
  stressTimer = 60;
  // Infect random starting point
  let sr = Math.floor(random(GRID_ROWS));
  let sc = Math.floor(random(GRID_COLS));

  // Mono: spreads aggressively (same host)
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      let dist = abs(r - sr) + abs(c - sc);
      if (dist < 6 && random() < 0.85 - dist * 0.05) {
        monoField[r][c].infected = true;
        monoField[r][c].health *= 0.3;
      }
    }
  }
  monoPesticide += 3;

  // Poly: spreads slowly (mixed hosts block transmission)
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      let dist = abs(r - sr) + abs(c - sc);
      if (dist < 3 && polyField[r][c].type === polyField[sr][sc].type && random() < 0.5) {
        polyField[r][c].infected = true;
        polyField[r][c].health *= 0.5;
      }
    }
  }
  polyPesticide += 1;
  advanceSeason();
}

function triggerDrought() {
  stressMessage = 'DROUGHT!';
  stressTimer = 60;
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      monoField[r][c].health *= 0.4;
      // Polyculture retains more moisture
      polyField[r][c].health *= 0.65;
    }
  }
  advanceSeason();
}

function drawField(field, ox, oy, fw, fh, label) {
  let cellW = fw / GRID_COLS;
  let cellH = fh / GRID_ROWS;

  // Label
  noStroke();
  fill(30);
  textAlign(CENTER, BOTTOM);
  textSize(13);
  text(label, ox + fw / 2, oy - 3);

  // Background
  fill(245, 235, 210);
  stroke(180);
  strokeWeight(1);
  rect(ox, oy, fw, fh, 4);

  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      let cell = field[r][c];
      let cx = ox + c * cellW + cellW / 2;
      let cy = oy + r * cellH + cellH / 2;
      let plantType = PLANT_TYPES[cell.type];
      let sz = cellW * 0.35 * cell.health;

      let pr = plantType.col[0];
      let pg = plantType.col[1];
      let pb = plantType.col[2];

      // Yellowing from damage
      if (cell.health < 0.6) {
        pr = lerp(pr, 200, 1 - cell.health);
        pg = lerp(pg, 200, 1 - cell.health);
        pb = lerp(pb, 100, 1 - cell.health);
      }

      fill(pr, pg, pb, 220);
      noStroke();

      if (plantType.shape === 'circle') {
        ellipse(cx, cy, sz * 2, sz * 2);
      } else if (plantType.shape === 'triangle') {
        triangle(cx, cy - sz, cx - sz, cy + sz, cx + sz, cy + sz);
      } else if (plantType.shape === 'square') {
        rectMode(CENTER);
        rect(cx, cy, sz * 1.8, sz * 1.8);
        rectMode(CORNER);
      } else {
        // diamond
        quad(cx, cy - sz, cx + sz, cy, cx, cy + sz, cx - sz, cy);
      }

      // Pest indicator
      if (cell.infected) {
        fill(255, 0, 0, 150);
        noStroke();
        ellipse(cx, cy, 6, 6);
      }
    }
  }
}

function draw() {
  updateCanvasSize();

  // Auto-run seasons
  if (autoSeasons > 0) {
    autoTimer++;
    if (autoTimer > 10) {
      autoTimer = 0;
      if (random() < 0.3) triggerPest();
      else if (random() < 0.2) triggerDrought();
      else advanceSeason();
      autoSeasons--;
    }
  }

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(30);
  textAlign(CENTER, TOP);
  textSize(16);
  text('Monoculture vs. Polyculture Comparison', canvasWidth / 2, 5);

  // Season counter
  textSize(12);
  fill(80);
  text('Season: ' + season, canvasWidth / 2, 24);

  // Stress message
  if (stressTimer > 0) {
    stressTimer--;
    fill(200, 0, 0);
    textSize(14);
    text(stressMessage, canvasWidth / 2, 38);
  }

  // Fields
  let fieldW = canvasWidth * 0.42;
  let fieldH = fieldW;
  let fieldY = 58;
  let gap = canvasWidth * 0.04;
  let leftX = gap;
  let rightX = canvasWidth / 2 + gap / 2;

  drawField(monoField, leftX, fieldY, fieldW, fieldH, 'Monoculture');
  drawField(polyField, rightX, fieldY, fieldW, fieldH, 'Polyculture');

  // Stats below fields
  let statsY = fieldY + fieldH + 12;
  textSize(11);
  textAlign(CENTER, TOP);

  noStroke();
  fill(60);
  text('Cumulative Yield: ' + nf(monoYield, 0, 1), leftX + fieldW / 2, statsY);
  text('Soil Health: ' + nf(monoSoilHealth, 0, 0) + '%', leftX + fieldW / 2, statsY + 14);
  text('Pesticide Uses: ' + monoPesticide, leftX + fieldW / 2, statsY + 28);

  text('Cumulative Yield: ' + nf(polyYield, 0, 1), rightX + fieldW / 2, statsY);
  text('Soil Health: ' + nf(polySoilHealth, 0, 0) + '%', rightX + fieldW / 2, statsY + 14);
  text('Pesticide Uses: ' + polyPesticide, rightX + fieldW / 2, statsY + 28);

  // Yield history chart
  let chartY = statsY + 50;
  let chartH = drawHeight - chartY - 10;
  let chartW = canvasWidth - 40;
  let chartX = 20;

  if (monoYieldHistory.length > 0) {
    // Chart background
    fill(255, 255, 255, 180);
    stroke(200);
    strokeWeight(1);
    rect(chartX, chartY, chartW, chartH, 4);

    noStroke();
    fill(60);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Yield per Season Over Time', chartX + chartW / 2, chartY - 1);

    let maxVal = GRID_ROWS * GRID_COLS * 1.1;
    let n = monoYieldHistory.length;
    let stepX = chartW / max(n, 1);

    // Mono line (red)
    stroke(200, 60, 60);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < n; i++) {
      let x = chartX + i * stepX + stepX / 2;
      let y = chartY + chartH - (monoYieldHistory[i] / maxVal) * chartH;
      vertex(x, y);
    }
    endShape();

    // Poly line (green)
    stroke(34, 139, 34);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < n; i++) {
      let x = chartX + i * stepX + stepX / 2;
      let y = chartY + chartH - (polyYieldHistory[i] / maxVal) * chartH;
      vertex(x, y);
    }
    endShape();

    // Legend
    noStroke();
    fill(200, 60, 60);
    textSize(9);
    textAlign(LEFT, TOP);
    rect(chartX + 5, chartY + 4, 12, 3);
    fill(60);
    text('Mono', chartX + 20, chartY + 1);

    fill(34, 139, 34);
    rect(chartX + 55, chartY + 4, 12, 3);
    fill(60);
    text('Poly', chartX + 70, chartY + 1);
  }

  // Control area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Position buttons
  let bw = canvasWidth / 4 - 10;
  pestBtn.position(8, drawHeight + 14);
  droughtBtn.position(8 + bw + 8, drawHeight + 14);
  run10Btn.position(8 + (bw + 8) * 2, drawHeight + 14);
  resetBtn.position(8 + (bw + 8) * 3, drawHeight + 14);
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
