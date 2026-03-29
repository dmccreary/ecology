// Ocean Zones Interactive
// Vertical cross-section from surface to deep ocean with depth indicator

let containerWidth;
let canvasWidth = 400;
let drawHeight = 650;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

let depthSlider;
let currentDepth = 0;

let zones = [
  {
    name: 'Epipelagic (Sunlight Zone)',
    depthMin: 0, depthMax: 200,
    temp: '15-30°C',
    pressure: '1-20 atm',
    light: '100% to 1%',
    lightPct: 0.9,
    colorTop: [68, 138, 255],
    colorBot: [21, 101, 192],
    organisms: ['Dolphin 🐬', 'Sea Turtle 🐢', 'Tuna']
  },
  {
    name: 'Mesopelagic (Twilight Zone)',
    depthMin: 200, depthMax: 1000,
    temp: '5-15°C',
    pressure: '20-100 atm',
    light: '<1% (dim)',
    lightPct: 0.15,
    colorTop: [21, 101, 192],
    colorBot: [13, 71, 161],
    organisms: ['Lanternfish', 'Hatchetfish', 'Squid 🦑']
  },
  {
    name: 'Bathypelagic (Midnight Zone)',
    depthMin: 1000, depthMax: 4000,
    temp: '2-5°C',
    pressure: '100-400 atm',
    light: 'None (total darkness)',
    lightPct: 0.0,
    colorTop: [13, 71, 161],
    colorBot: [20, 20, 60],
    organisms: ['Anglerfish', 'Giant Squid', 'Viperfish']
  },
  {
    name: 'Abyssopelagic (Abyss)',
    depthMin: 4000, depthMax: 6000,
    temp: '1-4°C',
    pressure: '400-600 atm',
    light: 'None',
    lightPct: 0.0,
    colorTop: [20, 20, 60],
    colorBot: [5, 5, 20],
    organisms: ['Tube Worms', 'Sea Cucumber', 'Tripod Fish']
  }
];

let maxDepth = 6000;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  let mainEl = document.querySelector('main');
  let label = document.createElement('span');
  label.textContent = 'Drag depth: ';
  label.style.fontSize = '13px';
  mainEl.appendChild(label);

  depthSlider = createSlider(0, maxDepth, 0, 10);
  depthSlider.parent(mainEl);
  depthSlider.position(100, drawHeight + 5);
  depthSlider.size(canvasWidth - 100 - margin);

  describe('Vertical cross-section of the ocean showing zones from surface to 6000 meters deep', LABEL);
}

function draw() {
  updateCanvasSize();
  currentDepth = depthSlider.value();

  // Background
  fill('#e3f2fd');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('#01579b');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Ocean Zones', canvasWidth / 2, 6);
  textStyle(NORMAL);

  // Ocean cross-section area
  let oceanX = margin;
  let oceanY = 35;
  let oceanW = canvasWidth * 0.55;
  let oceanH = drawHeight - 55;

  // Draw gradient background for ocean
  for (let y = 0; y < oceanH; y++) {
    let depthAtY = (y / oceanH) * maxDepth;
    let zone = getZoneAtDepth(depthAtY);
    if (zone) {
      let t = (depthAtY - zone.depthMin) / (zone.depthMax - zone.depthMin);
      t = constrain(t, 0, 1);
      let r = lerp(zone.colorTop[0], zone.colorBot[0], t);
      let g = lerp(zone.colorTop[1], zone.colorBot[1], t);
      let b = lerp(zone.colorTop[2], zone.colorBot[2], t);
      stroke(r, g, b);
      line(oceanX, oceanY + y, oceanX + oceanW, oceanY + y);
    }
  }

  // Zone boundary lines and labels
  noStroke();
  for (let i = 0; i < zones.length; i++) {
    let z = zones[i];
    let yTop = oceanY + (z.depthMin / maxDepth) * oceanH;
    let yBot = oceanY + (z.depthMax / maxDepth) * oceanH;

    // Dashed boundary
    if (i > 0) {
      stroke(255, 255, 255, 150);
      strokeWeight(1);
      drawingContext.setLineDash([5, 5]);
      line(oceanX, yTop, oceanX + oceanW, yTop);
      drawingContext.setLineDash([]);
    }

    // Zone label (vertical along left)
    noStroke();
    fill(255, 255, 255, 200);
    textAlign(LEFT, CENTER);
    textSize(10);
    let labelY = (yTop + yBot) / 2;
    text(z.name, oceanX + 5, labelY);

    // Depth markers
    fill(255, 255, 255, 180);
    textAlign(RIGHT, TOP);
    textSize(9);
    text(z.depthMin + 'm', oceanX + oceanW - 4, yTop + 2);
  }
  // Bottom depth
  noStroke();
  fill(255, 255, 255, 150);
  textAlign(RIGHT, BOTTOM);
  textSize(9);
  text('6000m', oceanX + oceanW - 4, oceanY + oceanH - 2);

  // Current depth indicator
  let indicatorY = oceanY + (currentDepth / maxDepth) * oceanH;
  stroke('#ff5722');
  strokeWeight(2);
  drawingContext.setLineDash([]);
  line(oceanX, indicatorY, oceanX + oceanW + 10, indicatorY);

  // Depth label on indicator
  fill('#ff5722');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(currentDepth + 'm', oceanX + oceanW + 14, indicatorY);
  textStyle(NORMAL);

  // Triangle pointer
  fill('#ff5722');
  noStroke();
  triangle(oceanX - 8, indicatorY, oceanX, indicatorY - 5, oceanX, indicatorY + 5);

  // Light intensity meter
  let lightX = oceanX + oceanW + 12;
  let lightY = oceanY;
  let lightW = 18;
  let lightH = oceanH;

  // Light bar
  for (let y = 0; y < lightH; y++) {
    let depthAtY = (y / lightH) * maxDepth;
    let lightLevel = getLightAtDepth(depthAtY);
    let brightness = lightLevel * 255;
    fill(255, 235, 59, brightness);
    noStroke();
    rect(lightX, lightY + y, lightW, 1);
  }
  stroke('#bdbdbd');
  strokeWeight(1);
  noFill();
  rect(lightX, lightY, lightW, lightH);

  noStroke();
  fill('#f57f17');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  push();
  translate(lightX + lightW / 2, lightY - 3);
  text('Light', 0, 0);
  pop();

  // Info sidebar
  let sideX = canvasWidth * 0.6;
  let sideW = canvasWidth * 0.38;
  let sideY = 35;
  let sideH = drawHeight - 55;

  fill('#ffffff');
  stroke('#90a4ae');
  strokeWeight(1);
  rect(sideX, sideY, sideW, sideH, 8);

  let currentZone = getZoneAtDepth(currentDepth);
  if (currentZone) {
    noStroke();
    let tx = sideX + 10;
    let ty = sideY + 12;

    // Zone name
    fill('#01579b');
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(currentZone.name, tx, ty, sideW - 20, 40);
    textStyle(NORMAL);
    ty += 40;

    // Depth range
    fill('#3e2723');
    textSize(12);
    textStyle(BOLD);
    text('Depth Range:', tx, ty);
    textStyle(NORMAL);
    ty += 16;
    textSize(12);
    text(currentZone.depthMin + ' - ' + currentZone.depthMax + ' m', tx, ty);
    ty += 24;

    // Current depth
    fill('#ff5722');
    textStyle(BOLD);
    text('Current: ' + currentDepth + ' m', tx, ty);
    textStyle(NORMAL);
    ty += 24;

    // Temperature
    fill('#3e2723');
    textStyle(BOLD);
    text('Temperature:', tx, ty);
    textStyle(NORMAL);
    ty += 16;
    text(currentZone.temp, tx, ty);
    ty += 24;

    // Pressure
    textStyle(BOLD);
    text('Pressure:', tx, ty);
    textStyle(NORMAL);
    ty += 16;
    text(currentZone.pressure, tx, ty);
    ty += 24;

    // Light
    textStyle(BOLD);
    text('Light Level:', tx, ty);
    textStyle(NORMAL);
    ty += 16;
    text(currentZone.light, tx, ty);
    ty += 28;

    // Light meter bar
    let lightPctHere = getLightAtDepth(currentDepth);
    fill('#fff9c4');
    stroke('#f9a825');
    strokeWeight(1);
    rect(tx, ty, sideW - 20, 14, 3);
    fill('#f9a825');
    noStroke();
    rect(tx, ty, (sideW - 20) * lightPctHere, 14, 3);
    fill('#3e2723');
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(Math.round(lightPctHere * 100) + '%', tx + (sideW - 20) / 2, ty + 7);
    ty += 28;

    // Organisms
    textAlign(LEFT, TOP);
    textSize(12);
    fill('#3e2723');
    textStyle(BOLD);
    text('Representative Organisms:', tx, ty);
    textStyle(NORMAL);
    ty += 18;
    textSize(12);
    for (let org of currentZone.organisms) {
      text('  ' + org, tx, ty);
      ty += 18;
    }
  }

  // Control region
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function getZoneAtDepth(d) {
  for (let z of zones) {
    if (d >= z.depthMin && d < z.depthMax) return z;
  }
  return zones[zones.length - 1]; // deepest
}

function getLightAtDepth(d) {
  if (d <= 0) return 1.0;
  if (d >= 1000) return 0.0;
  if (d <= 200) {
    // Exponential decay in epipelagic
    return Math.exp(-d / 60) * 0.9 + 0.1 * (1 - d / 200);
  }
  // Rapid falloff in mesopelagic
  return Math.max(0, 0.01 * (1 - (d - 200) / 800));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  depthSlider.size(canvasWidth - 100 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
