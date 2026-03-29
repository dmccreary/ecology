// Urban Heat Island Profile MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let timeSlider;
let paused = true;
let pauseBtn;

// City zones: rural, suburban, urban core, suburban, rural
let zones = [];
let numCols = 40;
let gridData = []; // land cover types: 'veg', 'imp', 'water', 'roof'

function initZones() {
  gridData = [];
  for (let i = 0; i < numCols; i++) {
    let frac = i / (numCols - 1); // 0 to 1
    let distFromCenter = abs(frac - 0.5) * 2; // 0 at center, 1 at edges
    let r = random();
    if (distFromCenter > 0.7) {
      // Rural
      gridData.push({ type: r < 0.8 ? 'veg' : 'imp', trees: floor(random(2, 5)), buildingH: 0, greenRoof: false, reflective: false });
    } else if (distFromCenter > 0.35) {
      // Suburban
      gridData.push({ type: r < 0.4 ? 'veg' : 'imp', trees: floor(random(0, 3)), buildingH: random(15, 35), greenRoof: false, reflective: false });
    } else {
      // Urban core
      gridData.push({ type: 'imp', trees: 0, buildingH: random(40, 90), greenRoof: false, reflective: false });
    }
  }
}

function getTemperature(i, timeOfDay) {
  let base = 28; // base temp Celsius
  let d = gridData[i];
  let temp = base;

  // Impervious surfaces increase temp
  if (d.type === 'imp') temp += 3;
  if (d.type === 'water') temp -= 2;

  // Building height adds heat (waste heat, trapped radiation)
  temp += d.buildingH * 0.04;

  // Trees cool
  temp -= d.trees * 0.8;

  // Green roof effect
  if (d.greenRoof) temp -= 2;
  if (d.reflective) temp -= 1.5;

  // Time of day effect: heat island stronger at night
  let hourFactor;
  if (timeOfDay >= 10 && timeOfDay <= 16) {
    hourFactor = 1.0; // Peak daytime
  } else if (timeOfDay >= 20 || timeOfDay <= 4) {
    hourFactor = 1.4; // Nighttime - heat island stronger
  } else {
    hourFactor = 1.1;
  }

  // Boost urban-rural difference at night
  let frac = i / (numCols - 1);
  let urbanness = 1 - abs(frac - 0.5) * 2;
  temp += urbanness * (hourFactor - 1) * 8;

  return temp;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Urban heat island cross-section showing temperature differences between rural and urban areas with interactive features.', LABEL);

  timeSlider = createSlider(0, 23, 14, 1);
  timeSlider.parent(document.querySelector('main'));

  pauseBtn = createButton('Click map to add/remove trees');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.style('font-size', '11px');
  pauseBtn.style('background', '#eee');

  initZones();
}

function draw() {
  updateCanvasSize();

  let timeOfDay = timeSlider.value();
  let skyBrightness = timeOfDay >= 6 && timeOfDay <= 18 ?
    map(min(timeOfDay - 6, 18 - timeOfDay), 0, 6, 100, 230) : 50;

  // Sky
  background(skyBrightness * 0.6, skyBrightness * 0.75, skyBrightness);

  let groundY = drawHeight * 0.65;
  let colW = canvasWidth / numCols;
  let graphY = drawHeight * 0.1;
  let graphH = drawHeight * 0.2;

  // Draw ground and buildings
  for (let i = 0; i < numCols; i++) {
    let x = i * colW;
    let d = gridData[i];

    // Ground color
    noStroke();
    if (d.type === 'veg') fill(80, 160, 60);
    else if (d.type === 'water') fill(60, 130, 200);
    else fill(150, 150, 150);
    rect(x, groundY, colW + 1, drawHeight - groundY);

    // Buildings
    if (d.buildingH > 0) {
      if (d.reflective) fill(220, 220, 230);
      else fill(130, 120, 115);
      noStroke();
      rect(x + 2, groundY - d.buildingH, colW - 4, d.buildingH);
      // Green roof
      if (d.greenRoof) {
        fill(50, 160, 50);
        rect(x + 1, groundY - d.buildingH - 3, colW - 2, 5);
      }
      // Windows
      fill(255, 240, 180, timeOfDay >= 18 || timeOfDay <= 6 ? 200 : 40);
      for (let wy = groundY - d.buildingH + 5; wy < groundY - 5; wy += 12) {
        rect(x + 4, wy, 3, 5);
        rect(x + colW - 7, wy, 3, 5);
      }
    }

    // Trees
    for (let t = 0; t < d.trees; t++) {
      let tx = x + (t + 0.5) * colW / max(d.trees, 1);
      fill(60, 40, 20);
      noStroke();
      rect(tx - 1, groundY - 18, 3, 18);
      fill(30, 130 + random(-10, 10), 40);
      ellipse(tx, groundY - 22, 14, 14);
    }
  }

  // Temperature curve
  noFill();
  stroke(220, 50, 50);
  strokeWeight(2.5);
  beginShape();
  let temps = [];
  for (let i = 0; i < numCols; i++) {
    let t = getTemperature(i, timeOfDay);
    temps.push(t);
    let x = i * colW + colW / 2;
    let y = map(t, 22, 42, graphY + graphH, graphY);
    vertex(x, y);
  }
  endShape();
  strokeWeight(1);

  // Temperature axis
  stroke(0, 0, 0, 100);
  strokeWeight(1);
  line(5, graphY, 5, graphY + graphH);
  noStroke();
  fill(0);
  textSize(9);
  textAlign(RIGHT, CENTER);
  for (let t = 24; t <= 40; t += 4) {
    let y = map(t, 22, 42, graphY + graphH, graphY);
    text(t + '°C', 30, y);
    stroke(0, 0, 0, 30);
    line(32, y, canvasWidth, y);
    noStroke();
  }

  // Zone labels
  noStroke();
  fill(0, 0, 0, 150);
  textSize(10);
  textAlign(CENTER, TOP);
  text('Rural', canvasWidth * 0.08, groundY + 5);
  text('Suburban', canvasWidth * 0.25, groundY + 5);
  text('Urban Core', canvasWidth * 0.5, groundY + 5);
  text('Suburban', canvasWidth * 0.75, groundY + 5);
  text('Rural', canvasWidth * 0.92, groundY + 5);

  // Legend
  let legX = canvasWidth - 160;
  let legY = 8;
  noStroke();
  fill(255, 255, 255, 180);
  rect(legX, legY, 155, 55, 4);
  textSize(9);
  textAlign(LEFT, CENTER);
  fill(80, 160, 60);
  rect(legX + 5, legY + 6, 10, 10);
  fill(0); noStroke();
  text('Vegetation', legX + 20, legY + 12);
  fill(150, 150, 150);
  rect(legX + 80, legY + 6, 10, 10);
  fill(0); noStroke();
  text('Impervious', legX + 95, legY + 12);
  fill(220, 50, 50);
  rect(legX + 5, legY + 22, 10, 3);
  fill(0); noStroke();
  text('Temperature', legX + 20, legY + 24);
  fill(0); noStroke();
  textSize(9);
  text('Click: add tree | Shift+Click: green roof', legX + 3, legY + 42);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Time: ' + nf(timeOfDay, 2) + ':00', sliderLeftMargin + 110, drawHeight + controlHeight / 2);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;
  let colW = canvasWidth / numCols;
  let i = floor(mouseX / colW);
  if (i < 0 || i >= numCols) return;
  let d = gridData[i];

  if (keyIsDown(SHIFT)) {
    // Toggle green roof
    if (d.buildingH > 0) {
      d.greenRoof = !d.greenRoof;
    }
  } else if (keyIsDown(ALT)) {
    // Toggle reflective surface
    if (d.buildingH > 0) {
      d.reflective = !d.reflective;
    }
  } else {
    // Add or remove tree
    if (d.trees < 5) {
      d.trees++;
    } else {
      d.trees = 0;
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
