// Soil Health Comparison: Tillage Methods MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let advanceBtn, resetBtn, pauseBtn;
let year = 0;
let maxYears = 20;
let paused = true;
let frameCounter = 0;

// Metrics for conventional vs no-till
let metrics = {
  conv: { soc: 3.0, infiltration: 100, erosion: 5, worms: 20, yield: 100 },
  noTill: { soc: 3.0, infiltration: 100, erosion: 5, worms: 20, yield: 100 }
};

let historyConv = [];
let historyNoTill = [];

function resetSim() {
  year = 0;
  metrics.conv = { soc: 3.0, infiltration: 100, erosion: 5, worms: 20, yield: 100 };
  metrics.noTill = { soc: 3.0, infiltration: 100, erosion: 5, worms: 20, yield: 100 };
  historyConv = [{ ...metrics.conv, year: 0 }];
  historyNoTill = [{ ...metrics.noTill, year: 0 }];
}

function advanceYear() {
  if (year >= maxYears) return;
  year++;

  // Conventional tillage trends
  let c = metrics.conv;
  c.soc = max(0.8, c.soc - 0.08);
  c.infiltration = max(30, c.infiltration - 3);
  c.erosion = min(40, c.erosion + 1.5);
  c.worms = max(2, c.worms - 0.8);
  c.yield = year < 5 ? min(105, c.yield + 0.5) : max(75, c.yield - 1.2);

  // No-till trends
  let n = metrics.noTill;
  n.soc = min(5.5, n.soc + 0.1);
  n.infiltration = min(160, n.infiltration + 2.5);
  n.erosion = max(1, n.erosion - 0.2);
  n.worms = min(60, n.worms + 1.8);
  n.yield = year < 3 ? max(92, n.yield - 2) : min(115, n.yield + 0.8);

  historyConv.push({ ...c, year: year });
  historyNoTill.push({ ...n, year: year });
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Side-by-side comparison of conventional tillage vs no-till farming effects on soil health over 20 years.', LABEL);

  pauseBtn = createButton('▶ Play');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.mousePressed(() => { paused = !paused; pauseBtn.html(paused ? '▶ Play' : '❚❚ Pause'); });

  advanceBtn = createButton('Advance Year');
  advanceBtn.parent(document.querySelector('main'));
  advanceBtn.mousePressed(() => { if (paused) advanceYear(); });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);

  resetSim();
}

function draw() {
  updateCanvasSize();
  frameCounter++;

  // Auto-advance when playing
  if (!paused && frameCounter % 40 === 0) advanceYear();

  let panelW = (canvasWidth - 30) / 2;
  let soilViewH = drawHeight * 0.45;
  let graphH = drawHeight * 0.32;
  let metricsY = soilViewH + 10;
  let graphY = drawHeight - graphH - 5;
  let surfaceY = 60;
  let soilDepth = soilViewH - surfaceY;

  background(230, 235, 225);

  for (let side = 0; side < 2; side++) {
    let px = 10 + side * (panelW + 10);
    let m = side === 0 ? metrics.conv : metrics.noTill;
    let isConv = side === 0;

    // Panel background
    noStroke();
    fill(200, 220, 240);
    rect(px, 0, panelW, soilViewH, 4);

    // Sky
    fill(180, 215, 245);
    rect(px, 0, panelW, surfaceY, 4, 4, 0, 0);

    // Topsoil thickness varies
    let topsoilThick = isConv ? map(year, 0, 20, soilDepth * 0.3, soilDepth * 0.12) : map(year, 0, 20, soilDepth * 0.3, soilDepth * 0.4);
    // Topsoil color (darker = more organic matter)
    let socColor = map(m.soc, 0.8, 5.5, 170, 50);
    fill(socColor, socColor * 0.75, socColor * 0.45);
    noStroke();
    rect(px, surfaceY, panelW, topsoilThick);

    // Subsoil
    fill(160, 140, 100);
    rect(px, surfaceY + topsoilThick, panelW, soilDepth - topsoilThick);

    // Compaction layer for conventional
    if (isConv && year > 3) {
      fill(140, 120, 80, 150);
      let compY = surfaceY + topsoilThick;
      rect(px, compY, panelW, 8);
    }

    // Crop residue on surface for no-till
    if (!isConv && year > 1) {
      fill(180, 160, 80);
      noStroke();
      for (let i = 0; i < min(year, 8); i++) {
        let rx = px + random(5, panelW - 5);
        rect(rx, surfaceY - 2, random(8, 15), 3);
      }
    }

    // Crop plants
    stroke(50, 130, 40);
    strokeWeight(1.5);
    for (let x = px + 10; x < px + panelW - 5; x += 18) {
      line(x, surfaceY, x, surfaceY - 20);
      noStroke();
      fill(60, 150, 50);
      ellipse(x, surfaceY - 23, 10, 8);
      stroke(50, 130, 40);
      strokeWeight(1.5);
    }

    // Roots
    stroke(140, 110, 70);
    strokeWeight(1);
    let rootDepth = isConv ? map(year, 0, 20, soilDepth * 0.4, soilDepth * 0.2) : map(year, 0, 20, soilDepth * 0.4, soilDepth * 0.7);
    for (let x = px + 15; x < px + panelW - 5; x += 18) {
      let segments = floor(rootDepth / 10);
      let curX = x;
      let curY = surfaceY;
      for (let s = 0; s < segments; s++) {
        let nx = curX + random(-4, 4);
        let ny = curY + 10;
        line(curX, curY, nx, ny);
        curX = nx;
        curY = ny;
      }
    }

    // Earthworms
    noStroke();
    fill(180, 100, 100);
    let wormCount = floor(map(m.worms, 0, 60, 0, 8));
    for (let w = 0; w < wormCount; w++) {
      let wx = px + 15 + w * (panelW - 30) / max(wormCount, 1);
      let wy = surfaceY + topsoilThick * 0.5 + sin(frameCounter * 0.05 + w) * 5;
      ellipse(wx, wy, 12, 3);
    }

    // Fungal threads for no-till
    if (!isConv && year > 4) {
      stroke(200, 200, 180, 100);
      strokeWeight(0.5);
      for (let f = 0; f < min(year - 3, 10); f++) {
        let fx = px + random(5, panelW - 5);
        let fy = surfaceY + random(5, topsoilThick);
        line(fx, fy, fx + random(-15, 15), fy + random(-8, 8));
      }
    }

    // Rain / erosion particles when playing
    if (!paused && frameCounter % 3 === 0 && isConv) {
      // Erosion particles flying off conventional
      stroke(160, 140, 100, 100);
      strokeWeight(1);
      for (let e = 0; e < floor(m.erosion / 10); e++) {
        let ex = px + random(0, panelW);
        line(ex, surfaceY, ex + random(3, 8), surfaceY - random(2, 6));
      }
    }

    // Title
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, TOP);
    text(isConv ? 'Conventional Tillage' : 'No-Till', px + panelW / 2, 5);
  }

  // Year display
  noStroke();
  fill(0);
  textSize(14);
  textAlign(CENTER);
  text('Year: ' + year + ' / ' + maxYears, canvasWidth / 2, soilViewH + 5);

  // Metrics panel
  let metY = soilViewH + 22;
  let metH = 14;
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  let metricLabels = ['Soil Carbon %', 'Infiltration', 'Erosion Rate', 'Earthworms', 'Crop Yield'];
  let convVals = [metrics.conv.soc.toFixed(1), metrics.conv.infiltration.toFixed(0), metrics.conv.erosion.toFixed(1), metrics.conv.worms.toFixed(0), metrics.conv.yield.toFixed(0)];
  let noTillVals = [metrics.noTill.soc.toFixed(1), metrics.noTill.infiltration.toFixed(0), metrics.noTill.erosion.toFixed(1), metrics.noTill.worms.toFixed(0), metrics.noTill.yield.toFixed(0)];

  for (let i = 0; i < metricLabels.length; i++) {
    let y = metY + i * (metH + 3);
    fill(0);
    noStroke();
    text(metricLabels[i], 10, y);
    fill(200, 100, 80);
    text(convVals[i], canvasWidth * 0.35, y);
    fill(60, 150, 80);
    text(noTillVals[i], canvasWidth * 0.55, y);
  }
  fill(200, 100, 80);
  textAlign(LEFT);
  text('Conv', canvasWidth * 0.35, metY - 12);
  fill(60, 150, 80);
  text('No-Till', canvasWidth * 0.55, metY - 12);

  // Line graph area
  let gx = 10;
  let gy = graphY;
  let gw = canvasWidth - 20;
  let gh = graphH;
  noStroke();
  fill(255, 255, 255, 200);
  rect(gx, gy, gw, gh, 4);

  if (historyConv.length > 1) {
    // Draw SOC lines
    for (let side = 0; side < 2; side++) {
      let hist = side === 0 ? historyConv : historyNoTill;
      stroke(side === 0 ? color(200, 100, 80) : color(60, 150, 80));
      strokeWeight(2);
      noFill();
      beginShape();
      for (let i = 0; i < hist.length; i++) {
        let x = gx + 5 + i * (gw - 10) / maxYears;
        let y = map(hist[i].soc, 0, 6, gy + gh - 5, gy + 5);
        vertex(x, y);
      }
      endShape();
    }
  }

  // Graph labels
  noStroke();
  fill(0);
  textSize(9);
  textAlign(CENTER, TOP);
  text('Soil Organic Carbon Over Time', gx + gw / 2, gy + 2);
  textAlign(LEFT);
  text('0%', gx + 2, gy + gh - 12);
  text('6%', gx + 2, gy + 5);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
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
