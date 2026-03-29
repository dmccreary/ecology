// Feedback Loop Explorer MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 120;
let defaultTextSize = 16;

let scenarioSelect;
let speedSlider;
let running = true;
let time = 0;

let reinforcingScenarios = {
  'Ice-Albedo': {
    nodes: ['Temperature\nRises', 'Ice\nMelts', 'Albedo\nDecreases', 'Absorption\nIncreases'],
    signs: ['+', '+', '+', '+']
  },
  'Erosion Cycle': {
    nodes: ['Soil\nErodes', 'Less\nVegetation', 'More Water\nRunoff', 'More\nErosion'],
    signs: ['+', '+', '+', '+']
  },
  'Invasive Species': {
    nodes: ['Invasive Pop.\nGrows', 'Native Species\nDecline', 'Less\nCompetition', 'More\nResources'],
    signs: ['+', '+', '+', '+']
  }
};

let balancingScenarios = {
  'Predator-Prey': {
    nodes: ['Prey\nIncreases', 'Predator\nIncreases', 'Prey\nDecreases', 'Predator\nDecreases'],
    signs: ['+', '+', '-', '-']
  },
  'Thermoregulation': {
    nodes: ['Body Temp\nRises', 'Sweating\nIncreases', 'Heat\nLost', 'Body Temp\nFalls'],
    signs: ['+', '+', '+', '-']
  },
  'Nutrient Cycling': {
    nodes: ['Nutrients\nIncrease', 'Plant Growth\nIncreases', 'Nutrient\nUptake Rises', 'Soil Nutrients\nDecrease'],
    signs: ['+', '+', '+', '-']
  }
};

let rKeys, bKeys;
let rIdx = 0, bIdx = 0;
let rStock = 10, bStock = 50;
let rHistory = [], bHistory = [];
let maxHistory = 150;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Feedback loop explorer comparing reinforcing and balancing feedback loops', LABEL);

  rKeys = Object.keys(reinforcingScenarios);
  bKeys = Object.keys(balancingScenarios);

  scenarioSelect = createSelect();
  scenarioSelect.parent(document.querySelector('main'));
  for (let r of rKeys) scenarioSelect.option(r);
  scenarioSelect.changed(() => {
    rIdx = rKeys.indexOf(scenarioSelect.value());
    bIdx = rIdx;
    resetSim();
  });

  speedSlider = createSlider(0.5, 5, 1.5, 0.5);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.style('width', '120px');

  let resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);
}

function resetSim() {
  time = 0;
  rStock = 10;
  bStock = 50;
  rHistory = [];
  bHistory = [];
}

function draw() {
  updateCanvasSize();

  let spd = speedSlider.value();
  time += spd * 0.02;

  let halfW = canvasWidth / 2 - 5;

  // Update stocks
  // Reinforcing: exponential growth
  rStock = 10 * exp(0.3 * time);
  rStock = min(rStock, 1000);

  // Balancing: damped oscillation toward setpoint (50)
  let setpoint = 50;
  bStock = setpoint + 40 * exp(-0.15 * time) * cos(1.2 * time);

  // Record history
  if (frameCount % 2 === 0) {
    rHistory.push(min(rStock, 200));
    bHistory.push(bStock);
    if (rHistory.length > maxHistory) rHistory.shift();
    if (bHistory.length > maxHistory) bHistory.shift();
  }

  let rScenario = reinforcingScenarios[rKeys[rIdx]];
  let bScenario = balancingScenarios[bKeys[min(bIdx, bKeys.length - 1)]];

  // --- Left panel: Reinforcing ---
  fill(255, 248, 240);
  stroke(200, 150, 100);
  strokeWeight(1);
  rect(0, 0, halfW, drawHeight);

  noStroke();
  fill(200, 80, 30);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Reinforcing Loop (R)', halfW / 2, 6);

  drawCausalLoop(halfW / 2, 130, min(halfW * 0.35, 90), rScenario, color(220, 100, 50), 'R');

  // Reinforcing chart
  let chartY = 250;
  let chartH = drawHeight - chartY - 15;
  let chartW = halfW - 30;
  let chartX = 15;
  drawChart(chartX, chartY, chartW, chartH, rHistory, color(220, 100, 50), 200, 'Exponential Growth');

  // --- Right panel: Balancing ---
  let rx = halfW + 10;
  fill(240, 248, 255);
  stroke(100, 150, 200);
  strokeWeight(1);
  rect(rx, 0, halfW, drawHeight);

  noStroke();
  fill(30, 100, 180);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Balancing Loop (B)', rx + halfW / 2, 6);

  drawCausalLoop(rx + halfW / 2, 130, min(halfW * 0.35, 90), bScenario, color(50, 130, 200), 'B');

  // Balancing chart
  drawChart(rx + 15, chartY, chartW, chartH, bHistory, color(50, 130, 200), 100, 'Damped Oscillation');

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Scenario:', 10, drawHeight + 18);
  scenarioSelect.position(85, drawHeight + 8);

  text('Speed: ' + nf(spd, 1, 1), 10, drawHeight + 42);
  speedSlider.position(sliderLeftMargin, drawHeight + 34);
}

function drawCausalLoop(cx, cy, radius, scenario, col, label) {
  let nodes = scenario.nodes;
  let signs = scenario.signs;
  let n = nodes.length;

  // Draw arrows in circle
  for (let i = 0; i < n; i++) {
    let a1 = -PI / 2 + (TWO_PI * i) / n;
    let a2 = -PI / 2 + (TWO_PI * ((i + 1) % n)) / n;
    let x1 = cx + cos(a1) * radius;
    let y1 = cy + sin(a1) * radius;
    let x2 = cx + cos(a2) * radius;
    let y2 = cy + sin(a2) * radius;

    // Arrow line
    stroke(col);
    strokeWeight(2);
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    fill(col);
    push();
    translate(x2 - cos(angle) * 15, y2 - sin(angle) * 15);
    rotate(angle);
    triangle(0, -4, 0, 4, 10, 0);
    pop();

    // Animated flow dot
    let t = (time * 0.5 + i * 0.25) % 1;
    let fx = lerp(x1, x2, t);
    let fy = lerp(y1, y2, t);
    fill(col);
    noStroke();
    ellipse(fx, fy, 8, 8);

    // Sign label
    fill(col);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    let signX = (x1 + x2) / 2 + cos(a1 + (a2 - a1) / 2 + PI / 2) * 12;
    let signY = (y1 + y2) / 2 + sin(a1 + (a2 - a1) / 2 + PI / 2) * 12;
    text(signs[i], signX, signY);
  }

  // Draw node labels
  for (let i = 0; i < n; i++) {
    let a = -PI / 2 + (TWO_PI * i) / n;
    let nx = cx + cos(a) * (radius + 30);
    let ny = cy + sin(a) * (radius + 30);

    fill(255, 255, 255, 220);
    stroke(col);
    strokeWeight(1);
    rectMode(CENTER);
    rect(nx, ny, 75, 32, 5);
    rectMode(CORNER);

    noStroke();
    fill(0);
    textSize(9);
    textAlign(CENTER, CENTER);
    text(nodes[i], nx, ny);
  }

  // Center label
  fill(col);
  noStroke();
  textSize(22);
  textAlign(CENTER, CENTER);
  text(label, cx, cy);
}

function drawChart(x, y, w, h, history, col, maxVal, label) {
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  noStroke();
  fill(100);
  textSize(10);
  textAlign(LEFT, TOP);
  text(label, x + 5, y + 3);

  // Grid
  stroke(230);
  strokeWeight(0.5);
  for (let i = 0; i <= 4; i++) {
    let gy = y + h - (i / 4) * h;
    line(x, gy, x + w, gy);
  }

  // Plot
  if (history.length > 1) {
    noFill();
    stroke(col);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < history.length; i++) {
      let px = x + (i / maxHistory) * w;
      let py = y + h - (history[i] / maxVal) * h;
      py = constrain(py, y, y + h);
      vertex(px, py);
    }
    endShape();
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
