// Global Energy Mix Scenario Explorer - p5.js
// CANVAS_HEIGHT: 740
// Students design an energy portfolio and see real-time sustainability metrics

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 220;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// Energy sources
let sources = ['Coal', 'Oil', 'Nat Gas', 'Nuclear', 'Solar', 'Wind', 'Hydro', 'Biomass'];
let colors;
let sliders = [];
let presetButtons = [];

// Data per unit of energy (relative values)
// [CO2 (g/kWh), Land (m2/MWh), Water (L/MWh), EROI, Cost (cents/kWh)]
let sourceData = {
  'Coal':    { co2: 820, land: 1.0, water: 2.2, eroi: 6,  cost: 6.5,  color: null },
  'Oil':     { co2: 720, land: 0.5, water: 1.8, eroi: 8,  cost: 8.0,  color: null },
  'Nat Gas': { co2: 490, land: 0.4, water: 0.7, eroi: 10, cost: 5.5,  color: null },
  'Nuclear': { co2: 12,  land: 0.3, water: 2.5, eroi: 14, cost: 9.5,  color: null },
  'Solar':   { co2: 45,  land: 5.0, water: 0.1, eroi: 10, cost: 4.5,  color: null },
  'Wind':    { co2: 11,  land: 1.2, water: 0.0, eroi: 18, cost: 4.0,  color: null },
  'Hydro':   { co2: 24,  land: 3.5, water: 0.0, eroi: 40, cost: 3.5,  color: null },
  'Biomass': { co2: 230, land: 6.0, water: 1.5, eroi: 5,  cost: 7.0,  color: null }
};

// Presets [coal, oil, gas, nuclear, solar, wind, hydro, biomass]
let presets = {
  'Current Mix':    [27, 31, 24, 4, 4, 3, 6, 1],
  'All Fossil':     [40, 35, 25, 0, 0, 0, 0, 0],
  'All Renewable':  [0, 0, 0, 0, 30, 30, 25, 15],
  'Balanced':       [10, 5, 15, 15, 18, 18, 14, 5]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  colors = [
    color(60, 60, 60),      // Coal - dark gray
    color(139, 69, 19),     // Oil - brown
    color(100, 149, 237),   // Natural Gas - cornflower
    color(255, 165, 0),     // Nuclear - orange
    color(255, 215, 0),     // Solar - gold
    color(0, 191, 255),     // Wind - sky blue
    color(0, 128, 128),     // Hydro - teal
    color(34, 139, 34)      // Biomass - forest green
  ];

  // Assign colors to sourceData
  for (let i = 0; i < sources.length; i++) {
    sourceData[sources[i]].color = colors[i];
  }

  // Create sliders
  let sy = drawHeight + 8;
  for (let i = 0; i < sources.length; i++) {
    let row = Math.floor(i / 2);
    let col = i % 2;
    let sx = col === 0 ? 80 : canvasWidth / 2 + 80;
    let s = createSlider(0, 100, presets['Current Mix'][i], 1);
    s.position(sx, sy + row * 26);
    s.style('width', (canvasWidth / 2 - 100) + 'px');
    s.parent(document.querySelector('main'));
    sliders.push(s);
  }

  // Preset buttons
  let btnY = drawHeight + 120;
  let btnNames = Object.keys(presets);
  for (let i = 0; i < btnNames.length; i++) {
    let b = createButton(btnNames[i]);
    b.position(10 + i * (canvasWidth / 4 - 2), btnY);
    b.style('font-size', '11px');
    b.style('padding', '4px 6px');
    b.parent(document.querySelector('main'));
    let pName = btnNames[i];
    b.mousePressed(() => applyPreset(pName));
    presetButtons.push(b);
  }

  describe('Energy mix scenario explorer with sliders for 8 energy sources and sustainability metrics', LABEL);
}

function applyPreset(name) {
  let vals = presets[name];
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].value(vals[i]);
  }
}

function getNormalizedValues() {
  let raw = [];
  let total = 0;
  for (let i = 0; i < sliders.length; i++) {
    raw.push(sliders[i].value());
    total += sliders[i].value();
  }
  if (total === 0) return raw.map(() => 0);
  return raw.map(v => (v / total) * 100);
}

function computeMetrics(vals) {
  let co2 = 0, landUse = 0, waterUse = 0, eroi = 0, costVal = 0;
  for (let i = 0; i < sources.length; i++) {
    let frac = vals[i] / 100;
    let d = sourceData[sources[i]];
    co2 += d.co2 * frac;
    landUse += d.land * frac;
    waterUse += d.water * frac;
    eroi += d.eroi * frac;
    costVal += d.cost * frac;
  }
  // Sustainability score: lower CO2 + higher EROI + lower cost
  let co2Score = map(co2, 0, 820, 100, 0, true);
  let eroiScore = map(eroi, 0, 40, 0, 100, true);
  let costScore = map(costVal, 3.5, 10, 100, 0, true);
  let sustainability = Math.round(co2Score * 0.5 + eroiScore * 0.25 + costScore * 0.25);

  return { co2, landUse, waterUse, eroi, cost: costVal, sustainability };
}

function draw() {
  updateCanvasSize();

  // Reposition sliders on resize
  for (let i = 0; i < sliders.length; i++) {
    let row = Math.floor(i / 2);
    let col = i % 2;
    let sx = col === 0 ? 80 : canvasWidth / 2 + 80;
    sliders[i].style('width', (canvasWidth / 2 - 100) + 'px');
    sliders[i].position(sx, drawHeight + 8 + row * 26);
  }

  // Reposition preset buttons
  let btnNames = Object.keys(presets);
  let btnY = drawHeight + 120;
  let btnW = Math.floor(canvasWidth / 4) - 5;
  for (let i = 0; i < presetButtons.length; i++) {
    presetButtons[i].position(10 + i * (btnW + 4), btnY);
  }

  let vals = getNormalizedValues();
  let metrics = computeMetrics(vals);

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(30);
  textAlign(CENTER, TOP);
  textSize(18);
  text('Global Energy Mix Scenario Explorer', canvasWidth / 2, 8);

  // Bar chart
  let barAreaX = 20;
  let barAreaY = 40;
  let barAreaW = canvasWidth * 0.55 - 30;
  let barAreaH = drawHeight - 60;
  let barW = barAreaW / sources.length - 4;

  // Y-axis
  noStroke();
  fill(80);
  textSize(11);
  textAlign(RIGHT, CENTER);
  for (let p = 0; p <= 100; p += 20) {
    let y = barAreaY + barAreaH - (p / 100) * barAreaH;
    text(p + '%', barAreaX - 3, y);
    stroke(220);
    strokeWeight(0.5);
    line(barAreaX, y, barAreaX + barAreaW, y);
    noStroke();
  }

  // Bars
  for (let i = 0; i < sources.length; i++) {
    let x = barAreaX + i * (barW + 4) + 2;
    let h = (vals[i] / 100) * barAreaH;
    let y = barAreaY + barAreaH - h;
    fill(colors[i]);
    noStroke();
    rect(x, y, barW, h, 2);
    // Label
    push();
    fill(60);
    textSize(9);
    textAlign(CENTER, TOP);
    text(sources[i], x + barW / 2, barAreaY + barAreaH + 3);
    textSize(10);
    text(nf(vals[i], 0, 1) + '%', x + barW / 2, barAreaY + barAreaH + 15);
    pop();
  }

  // Metrics panel (right side)
  let mx = canvasWidth * 0.57;
  let mw = canvasWidth * 0.42;
  let my = 40;

  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(14);
  text('Metrics', mx, my);

  textSize(12);
  let lineH = 28;
  let startY = my + 25;

  // CO2
  fill(60);
  text('CO\u2082 Emissions:', mx, startY);
  fill(metrics.co2 > 400 ? color(200, 0, 0) : metrics.co2 > 200 ? color(200, 140, 0) : color(0, 128, 0));
  textAlign(RIGHT, TOP);
  text(nf(metrics.co2, 0, 0) + ' g/kWh', mx + mw - 10, startY);

  // Land use
  textAlign(LEFT, TOP);
  fill(60);
  text('Land Use:', mx, startY + lineH);
  fill(30);
  textAlign(RIGHT, TOP);
  text(nf(metrics.landUse, 0, 1) + ' m\u00B2/MWh', mx + mw - 10, startY + lineH);

  // Water use
  textAlign(LEFT, TOP);
  fill(60);
  text('Water Use:', mx, startY + lineH * 2);
  fill(30);
  textAlign(RIGHT, TOP);
  text(nf(metrics.waterUse, 0, 1) + ' L/MWh', mx + mw - 10, startY + lineH * 2);

  // EROI
  textAlign(LEFT, TOP);
  fill(60);
  text('Avg EROI:', mx, startY + lineH * 3);
  fill(30);
  textAlign(RIGHT, TOP);
  text(nf(metrics.eroi, 0, 1) + ':1', mx + mw - 10, startY + lineH * 3);

  // Cost
  textAlign(LEFT, TOP);
  fill(60);
  text('Cost:', mx, startY + lineH * 4);
  fill(metrics.cost > 12 ? color(200, 0, 0) : color(30));
  textAlign(RIGHT, TOP);
  text(nf(metrics.cost, 0, 1) + ' \u00A2/kWh', mx + mw - 10, startY + lineH * 4);

  // Sustainability score
  let scoreY = startY + lineH * 5 + 10;
  textAlign(LEFT, TOP);
  fill(60);
  textSize(14);
  text('Sustainability Score', mx, scoreY);

  // Score bar
  let barX = mx;
  let barYs = scoreY + 22;
  let barWs = mw - 10;
  let barHs = 24;
  // Background
  fill(220);
  noStroke();
  rect(barX, barYs, barWs, barHs, 4);
  // Fill
  let sc = metrics.sustainability;
  let scoreColor;
  if (sc >= 80) scoreColor = color(0, 180, 0);
  else if (sc >= 60) scoreColor = color(100, 180, 0);
  else if (sc >= 40) scoreColor = color(200, 180, 0);
  else scoreColor = color(200, 60, 0);
  fill(scoreColor);
  rect(barX, barYs, (sc / 100) * barWs, barHs, 4);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(sc, barX + barWs / 2, barYs + barHs / 2);

  // Challenge
  let chalY = barYs + barHs + 20;
  textAlign(LEFT, TOP);
  textSize(11);
  fill(80);
  text('Challenge: Reach sustainability 80+', mx, chalY);
  text('while keeping cost under 12\u00A2/kWh', mx, chalY + 15);

  let passed = sc >= 80 && metrics.cost < 12;
  if (passed) {
    fill(0, 160, 0);
    textSize(14);
    text('\u2713 Challenge Complete!', mx, chalY + 35);
  }

  // Pie chart
  let pieX = mx + mw / 2;
  let pieY = chalY + 75;
  let pieR = Math.min(60, mw / 4);
  let startAngle = -HALF_PI;
  for (let i = 0; i < sources.length; i++) {
    if (vals[i] > 0.5) {
      let angle = (vals[i] / 100) * TWO_PI;
      fill(colors[i]);
      noStroke();
      arc(pieX, pieY, pieR * 2, pieR * 2, startAngle, startAngle + angle, PIE);
      startAngle += angle;
    }
  }

  // Control area background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Slider labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(11);
  for (let i = 0; i < sources.length; i++) {
    let row = Math.floor(i / 2);
    let col = i % 2;
    let lx = col === 0 ? 5 : canvasWidth / 2 + 5;
    let ly = drawHeight + 18 + row * 26;
    fill(colors[i]);
    rect(lx, ly - 5, 10, 10, 2);
    fill(60);
    noStroke();
    text(sources[i], lx + 14, ly);
  }

  // Presets label
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  text('Presets:', 10, drawHeight + 108);
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
