// Environmental Justice Mapping Tool MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let showPollution = true;
let showIncome = true;
let showHealth = false;
let showGreen = false;
let pollutionCb, incomeCb, healthCb, greenCb;
let perspectiveSelect;
let selectedDistrict = -1;
let proposalMode = false;
let proposalBtn;

// Fictional city districts
let districts = [
  { name: 'Riverside', x: 0.12, y: 0.25, w: 0.22, h: 0.2, income: 28000, asthma: 18, cancer: 5.2, greenPct: 8, pollutionSources: 3, pop: 15000, pctMinority: 72, color: [231, 111, 81] },
  { name: 'Milltown', x: 0.12, y: 0.48, w: 0.22, h: 0.22, income: 32000, asthma: 15, cancer: 4.8, greenPct: 12, pollutionSources: 2, pop: 12000, pctMinority: 65, color: [231, 111, 81] },
  { name: 'Downtown', x: 0.36, y: 0.2, w: 0.28, h: 0.25, income: 55000, asthma: 9, cancer: 3.1, greenPct: 15, pollutionSources: 1, pop: 25000, pctMinority: 35, color: [168, 218, 220] },
  { name: 'Oakwood', x: 0.36, y: 0.48, w: 0.28, h: 0.22, income: 75000, asthma: 6, cancer: 2.5, greenPct: 32, pollutionSources: 0, pop: 18000, pctMinority: 20, color: [168, 218, 220] },
  { name: 'Eastside', x: 0.66, y: 0.2, w: 0.22, h: 0.25, income: 25000, asthma: 22, cancer: 6.1, greenPct: 5, pollutionSources: 4, pop: 20000, pctMinority: 78, color: [231, 111, 81] },
  { name: 'Lakeview', x: 0.66, y: 0.48, w: 0.22, h: 0.22, income: 90000, asthma: 4, cancer: 2.0, greenPct: 40, pollutionSources: 0, pop: 10000, pctMinority: 15, color: [168, 218, 220] },
  { name: 'Industrial Park', x: 0.12, y: 0.72, w: 0.35, h: 0.18, income: 30000, asthma: 20, cancer: 5.5, greenPct: 3, pollutionSources: 5, pop: 8000, pctMinority: 70, color: [231, 111, 81] },
  { name: 'Hilltop', x: 0.5, y: 0.72, w: 0.38, h: 0.18, income: 65000, asthma: 7, cancer: 2.8, greenPct: 28, pollutionSources: 0, pop: 14000, pctMinority: 25, color: [168, 218, 220] }
];

// Pollution source locations
let pollutionMarkers = [
  { x: 0.15, y: 0.3, type: 'factory' },
  { x: 0.25, y: 0.35, type: 'waste' },
  { x: 0.2, y: 0.55, type: 'factory' },
  { x: 0.7, y: 0.25, type: 'highway' },
  { x: 0.8, y: 0.3, type: 'factory' },
  { x: 0.75, y: 0.38, type: 'waste' },
  { x: 0.72, y: 0.28, type: 'factory' },
  { x: 0.18, y: 0.78, type: 'factory' },
  { x: 0.3, y: 0.8, type: 'waste' },
  { x: 0.35, y: 0.76, type: 'factory' },
  { x: 0.22, y: 0.82, type: 'factory' },
  { x: 0.4, y: 0.83, type: 'waste' }
];

let proposals = []; // User-placed facilities

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Environmental justice mapping tool showing correlations between pollution, income, health, and green space across city districts.', LABEL);

  pollutionCb = createCheckbox('Pollution', true);
  pollutionCb.parent(document.querySelector('main'));
  pollutionCb.changed(() => showPollution = pollutionCb.checked());

  incomeCb = createCheckbox('Income', true);
  incomeCb.parent(document.querySelector('main'));
  incomeCb.changed(() => showIncome = incomeCb.checked());

  healthCb = createCheckbox('Health', false);
  healthCb.parent(document.querySelector('main'));
  healthCb.changed(() => showHealth = healthCb.checked());

  greenCb = createCheckbox('Green Space', false);
  greenCb.parent(document.querySelector('main'));
  greenCb.changed(() => showGreen = greenCb.checked());

  perspectiveSelect = createSelect();
  perspectiveSelect.parent(document.querySelector('main'));
  perspectiveSelect.option('Default View');
  perspectiveSelect.option('Resident');
  perspectiveSelect.option('City Planner');
  perspectiveSelect.option('Developer');
  perspectiveSelect.option('Advocate');

  proposalBtn = createButton('Propose Green Space');
  proposalBtn.parent(document.querySelector('main'));
  proposalBtn.mousePressed(() => { proposalMode = !proposalMode; proposalBtn.html(proposalMode ? 'Cancel Proposal' : 'Propose Green Space'); });
}

function draw() {
  updateCanvasSize();

  let mapX = 5;
  let mapY = 5;
  let mapW = canvasWidth - 10;
  let mapH = drawHeight * 0.65;

  // Background
  fill(240, 240, 235);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Map area
  fill(220, 225, 215);
  noStroke();
  rect(mapX, mapY, mapW, mapH, 4);

  // Draw districts
  for (let i = 0; i < districts.length; i++) {
    let d = districts[i];
    let dx = mapX + d.x * mapW;
    let dy = mapY + d.y * mapH;
    let dw = d.w * mapW;
    let dh = d.h * mapH;

    // Income overlay
    if (showIncome) {
      let incomeAlpha = map(d.income, 25000, 90000, 200, 40);
      fill(231, 111, 81, incomeAlpha);
      noStroke();
      rect(dx, dy, dw, dh);
    } else {
      fill(200, 210, 195);
      noStroke();
      rect(dx, dy, dw, dh);
    }

    // Green space overlay
    if (showGreen) {
      let greenAlpha = map(d.greenPct, 0, 40, 0, 150);
      fill(42, 157, 143, greenAlpha);
      noStroke();
      rect(dx, dy, dw, dh);
    }

    // Health overlay (proportional circles)
    if (showHealth) {
      let r = map(d.asthma, 4, 22, 8, 35);
      fill(123, 44, 191, 120);
      noStroke();
      ellipse(dx + dw / 2, dy + dh / 2, r * 2, r * 2);
    }

    // District border
    stroke(100);
    strokeWeight(1);
    noFill();
    rect(dx, dy, dw, dh);

    // District name
    noStroke();
    fill(0, 0, 0, 180);
    textSize(9);
    textAlign(CENTER, CENTER);
    text(d.name, dx + dw / 2, dy + dh / 2 + (showHealth ? 20 : 0));

    // Highlight selected
    if (i === selectedDistrict) {
      noFill();
      stroke(255, 209, 102);
      strokeWeight(3);
      rect(dx - 1, dy - 1, dw + 2, dh + 2, 2);
      strokeWeight(1);
    }
  }

  // Pollution markers
  if (showPollution) {
    for (let m of pollutionMarkers) {
      let mx = mapX + m.x * mapW;
      let my = mapY + m.y * mapH;
      fill(230, 57, 70, 200);
      noStroke();
      if (m.type === 'factory') {
        // Factory icon
        rect(mx - 5, my - 8, 10, 12);
        rect(mx - 2, my - 12, 4, 4);
      } else if (m.type === 'waste') {
        // Waste icon
        triangle(mx, my - 8, mx - 6, my + 4, mx + 6, my + 4);
      } else {
        // Highway
        rect(mx - 8, my - 2, 16, 4, 2);
      }
    }
  }

  // Proposed green spaces
  for (let p of proposals) {
    let px = mapX + p.x * mapW;
    let py = mapY + p.y * mapH;
    fill(42, 157, 143, 180);
    noStroke();
    ellipse(px, py, 20, 20);
    fill(255);
    textSize(10);
    noStroke();
    textAlign(CENTER, CENTER);
    text('🌳', px, py);
  }

  // Proposal mode indicator
  if (proposalMode) {
    fill(42, 157, 143, 40);
    noStroke();
    rect(mapX, mapY, mapW, mapH);
    fill(42, 157, 143);
    noStroke();
    textSize(12);
    textAlign(CENTER);
    text('Click on map to place green space', canvasWidth / 2, mapY + 15);
  }

  // Data panel
  let panelY = mapY + mapH + 8;
  let panelH = drawHeight - panelY - 5;
  fill(255, 255, 255, 230);
  noStroke();
  rect(5, panelY, canvasWidth - 10, panelH, 6);

  if (selectedDistrict >= 0) {
    let d = districts[selectedDistrict];
    noStroke();
    fill(38, 70, 83);
    textSize(14);
    textAlign(LEFT, TOP);
    text(d.name + ' District', 15, panelY + 8);

    textSize(11);
    fill(80);
    let col1 = 15;
    let col2 = canvasWidth / 2 + 10;
    let ly = panelY + 28;
    let lh = 16;

    noStroke();
    text('Population: ' + d.pop.toLocaleString(), col1, ly);
    text('Minority: ' + d.pctMinority + '%', col2, ly);
    ly += lh;
    text('Median Income: $' + d.income.toLocaleString(), col1, ly);
    text('Green Space: ' + d.greenPct + '%', col2, ly);
    ly += lh;
    text('Asthma Rate: ' + d.asthma + '%', col1, ly);
    text('Cancer Rate: ' + d.cancer + '/1000', col2, ly);
    ly += lh;
    text('Pollution Sources: ' + d.pollutionSources, col1, ly);

    // Perspective commentary
    let perspective = perspectiveSelect.value();
    ly += lh + 5;
    fill(38, 70, 83);
    textSize(10);
    if (perspective === 'Resident') {
      text('Resident: "' + (d.pollutionSources > 2 ? 'We breathe this air every day. Our kids have asthma.' : 'Our neighborhood feels safe and clean.') + '"', col1, ly, canvasWidth - 30, 30);
    } else if (perspective === 'City Planner') {
      text('Planner: "' + (d.greenPct < 10 ? 'This district needs green infrastructure investment.' : 'Green space targets are being met here.') + '"', col1, ly, canvasWidth - 30, 30);
    } else if (perspective === 'Developer') {
      text('Developer: "' + (d.income > 60000 ? 'Prime location for new construction.' : 'Land costs are low — opportunity for development.') + '"', col1, ly, canvasWidth - 30, 30);
    } else if (perspective === 'Advocate') {
      text('Advocate: "' + (d.pctMinority > 60 && d.pollutionSources > 2 ? 'This is environmental racism — pollution is concentrated in minority communities.' : 'We must ensure equity across all districts.') + '"', col1, ly, canvasWidth - 30, 30);
    }
  } else {
    noStroke();
    fill(100);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click a district to see detailed data', canvasWidth / 2, panelY + panelH / 2);
  }

  // Legend
  let legX = canvasWidth - 150;
  let legY = mapY + mapH - 70;
  fill(255, 255, 255, 210);
  noStroke();
  rect(legX, legY, 145, 65, 4);
  textSize(8);
  textAlign(LEFT, CENTER);
  fill(230, 57, 70);
  noStroke();
  rect(legX + 5, legY + 8, 8, 8);
  fill(0); noStroke();
  text('Pollution Source', legX + 18, legY + 12);
  fill(231, 111, 81);
  rect(legX + 5, legY + 22, 8, 8);
  fill(0); noStroke();
  text('Lower Income (darker)', legX + 18, legY + 26);
  fill(123, 44, 191);
  ellipse(legX + 9, legY + 40, 8, 8);
  fill(0); noStroke();
  text('Health Risk (size=rate)', legX + 18, legY + 40);
  fill(42, 157, 143);
  rect(legX + 5, legY + 50, 8, 8);
  fill(0); noStroke();
  text('Green Space', legX + 18, legY + 54);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function mousePressed() {
  let mapX = 5;
  let mapY = 5;
  let mapW = canvasWidth - 10;
  let mapH = drawHeight * 0.65;

  if (mouseX < mapX || mouseX > mapX + mapW || mouseY < mapY || mouseY > mapY + mapH) return;

  if (proposalMode) {
    let nx = (mouseX - mapX) / mapW;
    let ny = (mouseY - mapY) / mapH;
    proposals.push({ x: nx, y: ny });
    // Update nearby district green space
    for (let d of districts) {
      if (nx >= d.x && nx <= d.x + d.w && ny >= d.y && ny <= d.y + d.h) {
        d.greenPct = min(50, d.greenPct + 5);
        d.asthma = max(2, d.asthma - 0.5);
      }
    }
    return;
  }

  // Check district click
  selectedDistrict = -1;
  for (let i = 0; i < districts.length; i++) {
    let d = districts[i];
    let dx = mapX + d.x * mapW;
    let dy = mapY + d.y * mapH;
    let dw = d.w * mapW;
    let dh = d.h * mapH;
    if (mouseX >= dx && mouseX <= dx + dw && mouseY >= dy && mouseY <= dy + dh) {
      selectedDistrict = i;
      break;
    }
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
