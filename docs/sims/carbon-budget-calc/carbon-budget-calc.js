// Ecosystem Carbon Budget Calculator
let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let ecosystemSel;
let gppSlider, raSlider, rhSlider;
let fireBtn, droughtBtn, warmingBtn, resetBtn;

let ecosystems = {
  'Tropical Forest': { gpp: 3000, ra: 1500, rh: 1200 },
  'Temperate Forest': { gpp: 1800, ra: 900, rh: 700 },
  'Grassland': { gpp: 1000, ra: 500, rh: 400 },
  'Ocean': { gpp: 600, ra: 300, rh: 250 },
  'Tundra': { gpp: 250, ra: 120, rh: 100 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Carbon budget calculator showing GPP, NPP, and NEP for ecosystems', LABEL);

  ecosystemSel = createSelect();
  ecosystemSel.parent(document.querySelector('main'));
  for (let name in ecosystems) {
    ecosystemSel.option(name);
  }
  ecosystemSel.changed(loadEcosystem);

  gppSlider = createSlider(100, 4000, 3000, 50);
  gppSlider.parent(document.querySelector('main'));
  gppSlider.style('width', '120px');

  raSlider = createSlider(50, 3000, 1500, 50);
  raSlider.parent(document.querySelector('main'));
  raSlider.style('width', '120px');

  rhSlider = createSlider(50, 2000, 1200, 50);
  rhSlider.parent(document.querySelector('main'));
  rhSlider.style('width', '120px');

  fireBtn = createButton('Fire');
  fireBtn.parent(document.querySelector('main'));
  fireBtn.mousePressed(() => {
    gppSlider.value(gppSlider.value() * 0.4);
    rhSlider.value(rhSlider.value() * 2.0);
  });

  droughtBtn = createButton('Drought');
  droughtBtn.parent(document.querySelector('main'));
  droughtBtn.mousePressed(() => {
    gppSlider.value(gppSlider.value() * 0.6);
    raSlider.value(raSlider.value() * 1.1);
  });

  warmingBtn = createButton('Warming');
  warmingBtn.parent(document.querySelector('main'));
  warmingBtn.mousePressed(() => {
    raSlider.value(raSlider.value() * 1.3);
    rhSlider.value(rhSlider.value() * 1.4);
  });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(loadEcosystem);

  loadEcosystem();
}

function loadEcosystem() {
  let eco = ecosystems[ecosystemSel.value()];
  gppSlider.value(eco.gpp);
  raSlider.value(eco.ra);
  rhSlider.value(eco.rh);
}

function draw() {
  updateCanvasSize();
  background(240);

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let gpp = gppSlider.value();
  let ra = raSlider.value();
  let rh = rhSlider.value();
  let npp = gpp - ra;
  let nep = npp - rh;

  // Title
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Ecosystem Carbon Budget: ' + ecosystemSel.value(), canvasWidth / 2, 8);

  // Three panel layout
  let panelW = canvasWidth / 3;

  // LEFT PANEL: Sliders info
  let lx = 10;
  let ly = 40;
  noStroke();
  fill(50);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Parameters', lx, ly);
  textSize(11);
  text('GPP: ' + gpp + ' g C/m\u00b2/yr', lx, ly + 22);
  text('Ra (autotroph resp): ' + ra, lx, ly + 40);
  text('Rh (heterotroph resp): ' + rh, lx, ly + 58);

  // Disturbance buttons info
  textSize(10);
  fill(100);
  text('Disturbances:', lx, ly + 82);
  text('Fire: \u2193GPP, \u2191Rh', lx, ly + 96);
  text('Drought: \u2193GPP, \u2191Ra', lx, ly + 110);
  text('Warming: \u2191Ra, \u2191Rh', lx, ly + 124);

  // CENTER PANEL: Calculation display
  let cx = panelW + 10;
  let cy = 40;
  noStroke();
  fill(50);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Calculations', cx, cy);

  textSize(12);
  fill(30);
  text('GPP = ' + gpp, cx, cy + 25);
  text('NPP = GPP - Ra', cx, cy + 45);
  text('NPP = ' + gpp + ' - ' + ra + ' = ' + npp, cx, cy + 62);
  text('NEP = NPP - Rh', cx, cy + 85);
  text('NEP = ' + npp + ' - ' + rh + ' = ' + nep, cx, cy + 102);

  // Status indicator
  let statusY = cy + 130;
  let statusColor, statusText;
  if (nep > 50) {
    statusColor = '#4CAF50';
    statusText = 'CARBON SINK';
  } else if (nep < -50) {
    statusColor = '#F44336';
    statusText = 'CARBON SOURCE';
  } else {
    statusColor = '#FFC107';
    statusText = 'NEAR BALANCE';
  }

  fill(statusColor);
  noStroke();
  rect(cx, statusY, panelW - 20, 30, 5);
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(statusText, cx + (panelW - 20) / 2, statusY + 15);

  noStroke();
  fill(30);
  textSize(11);
  textAlign(LEFT, TOP);
  text('NEP = ' + nep + ' g C/m\u00b2/yr', cx, statusY + 38);

  // RIGHT PANEL: Bar chart
  let rx = panelW * 2 + 10;
  let ry = 40;
  noStroke();
  fill(50);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Budget Bars', rx, ry);

  let chartX = rx + 5;
  let chartY = ry + 25;
  let chartW = panelW - 30;
  let chartH = 200;
  let maxBar = max(gpp, ra, rh, abs(nep));
  if (maxBar === 0) maxBar = 1;

  let bars = [
    { label: 'GPP', val: gpp, clr: '#4CAF50' },
    { label: 'Ra', val: ra, clr: '#FF9800' },
    { label: 'Rh', val: rh, clr: '#795548' },
    { label: 'NEP', val: nep, clr: nep >= 0 ? '#2196F3' : '#F44336' }
  ];

  let barW = chartW / bars.length;
  for (let i = 0; i < bars.length; i++) {
    let b = bars[i];
    let barH = abs(b.val) / maxBar * (chartH - 30);
    let bx = chartX + i * barW;
    let by;
    if (b.val >= 0) {
      by = chartY + chartH - 30 - barH;
    } else {
      by = chartY + chartH - 30;
    }

    fill(b.clr);
    noStroke();
    rect(bx + 3, by, barW - 6, barH, 2);

    fill(30);
    textSize(10);
    textAlign(CENTER, TOP);
    text(b.label, bx + barW / 2, chartY + chartH - 25);
    textAlign(CENTER, BOTTOM);
    text(b.val, bx + barW / 2, by - 2);
  }

  // Controls label
  noStroke();
  fill(30);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Adjust sliders and disturbances above', 10, drawHeight + controlHeight / 2);
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
