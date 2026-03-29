// Ecological Succession Timeline
// Animated timeline showing primary and secondary succession stages

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let timeSlider;
let modeBtn, disturbBtn, resetBtn;
let isPrimary = true;
let currentYear = 0;
let maxYearPrimary = 1000;
let maxYearSecondary = 300;

const stagesPrimary = [
  { name: 'Bare Rock', startYear: 0, dominant: 'None', richness: 0, soilDepth: 0 },
  { name: 'Lichens & Mosses', startYear: 0, dominant: 'Lichens, Mosses', richness: 5, soilDepth: 0.05 },
  { name: 'Grasses & Herbs', startYear: 50, dominant: 'Grasses, Ferns', richness: 15, soilDepth: 0.15 },
  { name: 'Shrubs', startYear: 150, dominant: 'Shrubs, Wildflowers', richness: 30, soilDepth: 0.3 },
  { name: 'Pioneer Trees', startYear: 300, dominant: 'Birch, Aspen, Pine', richness: 50, soilDepth: 0.5 },
  { name: 'Climax Forest', startYear: 600, dominant: 'Oak, Maple, Beech', richness: 80, soilDepth: 0.8 }
];

const stagesSecondary = [
  { name: 'Disturbed Soil', startYear: 0, dominant: 'Soil present', richness: 5, soilDepth: 0.4 },
  { name: 'Annual Weeds', startYear: 1, dominant: 'Ragweed, Crabgrass', richness: 15, soilDepth: 0.42 },
  { name: 'Perennial Grasses', startYear: 5, dominant: 'Goldenrod, Asters', richness: 25, soilDepth: 0.48 },
  { name: 'Shrubs & Saplings', startYear: 20, dominant: 'Blackberry, Pine', richness: 45, soilDepth: 0.55 },
  { name: 'Young Forest', startYear: 60, dominant: 'Pine, Birch', richness: 60, soilDepth: 0.65 },
  { name: 'Climax Forest', startYear: 150, dominant: 'Oak, Hickory', richness: 80, soilDepth: 0.8 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Ecological succession timeline showing community changes over time', LABEL);

  timeSlider = createSlider(0, maxYearPrimary, 0, 1);
  timeSlider.parent(document.querySelector('main'));
  timeSlider.style('width', '200px');

  modeBtn = createButton('Switch to Secondary');
  modeBtn.parent(document.querySelector('main'));
  modeBtn.mousePressed(() => {
    isPrimary = !isPrimary;
    modeBtn.html(isPrimary ? 'Switch to Secondary' : 'Switch to Primary');
    timeSlider.attribute('max', isPrimary ? maxYearPrimary : maxYearSecondary);
    timeSlider.value(0);
  });

  disturbBtn = createButton('Disturbance!');
  disturbBtn.parent(document.querySelector('main'));
  disturbBtn.mousePressed(() => {
    // Reset to early stage
    let stages = isPrimary ? stagesPrimary : stagesSecondary;
    let earlyYear = stages[1].startYear + 10;
    timeSlider.value(earlyYear);
  });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => { timeSlider.value(0); });
}

function draw() {
  updateCanvasSize();

  currentYear = timeSlider.value();
  let stages = isPrimary ? stagesPrimary : stagesSecondary;
  let maxYear = isPrimary ? maxYearPrimary : maxYearSecondary;

  // Find current stage
  let stageIdx = 0;
  for (let i = stages.length - 1; i >= 0; i--) {
    if (currentYear >= stages[i].startYear) { stageIdx = i; break; }
  }
  let stage = stages[stageIdx];

  // Interpolate values
  let nextStage = stageIdx < stages.length - 1 ? stages[stageIdx + 1] : stage;
  let stageProgress = 0;
  if (nextStage !== stage) {
    stageProgress = (currentYear - stage.startYear) / (nextStage.startYear - stage.startYear);
    stageProgress = constrain(stageProgress, 0, 1);
  } else {
    stageProgress = 1;
  }
  let richness = lerp(stage.richness, nextStage.richness, stageProgress);
  let soilD = lerp(stage.soilDepth, nextStage.soilDepth, stageProgress);

  // Sky gradient
  let skyTop = color(135, 190, 240);
  let skyBot = color(200, 220, 240);
  for (let y = 0; y < drawHeight * 0.6; y++) {
    stroke(lerpColor(skyTop, skyBot, y / (drawHeight * 0.6)));
    line(0, y, canvasWidth, y);
  }

  // Ground level
  let groundY = drawHeight * 0.6;

  // Draw landscape
  drawLandscape(stageIdx, groundY, soilD, stageProgress);

  // Soil layer
  let soilH = soilD * drawHeight * 0.25;
  fill(120, 80, 40);
  noStroke();
  rect(0, groundY, canvasWidth, soilH);
  // Rock below
  fill(140, 140, 140);
  rect(0, groundY + soilH, canvasWidth, drawHeight - groundY - soilH - 80);

  // Stage label
  noStroke();
  fill(255, 255, 255, 200);
  rect(10, 10, 200, 55, 8);
  fill(40);
  textSize(14);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(stage.name, 18, 16);
  textStyle(NORMAL);
  textSize(11);
  text('Dominant: ' + stage.dominant, 18, 34);
  text('Soil depth: ' + nf(soilD * 100, 1, 0) + ' cm', 18, 48);

  // Mode label
  noStroke();
  fill(40);
  textSize(15);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  let title = isPrimary ? 'Primary Succession' : 'Secondary Succession';
  text(title, canvasWidth / 2, drawHeight * 0.6 + drawHeight * 0.25 + 5);
  textStyle(NORMAL);

  // Timeline bar
  let tlY = drawHeight - 40;
  let tlX = 40;
  let tlW = canvasWidth - 80;
  stroke(150);
  strokeWeight(2);
  line(tlX, tlY, tlX + tlW, tlY);

  // Stage markers
  for (let i = 0; i < stages.length; i++) {
    let px = tlX + (stages[i].startYear / maxYear) * tlW;
    stroke(100);
    strokeWeight(1);
    line(px, tlY - 5, px, tlY + 5);
    noStroke();
    fill(i === stageIdx ? color(40, 120, 40) : color(120));
    textSize(8);
    textAlign(CENTER, TOP);
    text(stages[i].name, px, tlY + 8);
  }

  // Playhead
  let playX = tlX + (currentYear / maxYear) * tlW;
  fill(200, 60, 60);
  noStroke();
  triangle(playX - 6, tlY - 8, playX + 6, tlY - 8, playX, tlY);
  textSize(10);
  fill(40);
  textAlign(CENTER, BOTTOM);
  text('Year ' + currentYear, playX, tlY - 10);

  // Biodiversity mini-graph
  let bgX = canvasWidth - 120;
  let bgY = 10;
  let bgW = 100;
  let bgH = 60;
  fill(255, 255, 255, 200);
  stroke(180);
  strokeWeight(1);
  rect(bgX, bgY, bgW, bgH, 5);
  noStroke();
  fill(60);
  textSize(9);
  textAlign(CENTER, TOP);
  text('Species Richness', bgX + bgW / 2, bgY + 2);

  // Draw richness curve
  stroke(50, 140, 50);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let yr = 0; yr <= maxYear; yr += maxYear / 50) {
    let si = 0;
    for (let j = stages.length - 1; j >= 0; j--) {
      if (yr >= stages[j].startYear) { si = j; break; }
    }
    let ns = si < stages.length - 1 ? stages[si + 1] : stages[si];
    let sp = 0;
    if (ns !== stages[si]) {
      sp = constrain((yr - stages[si].startYear) / (ns.startYear - stages[si].startYear), 0, 1);
    } else { sp = 1; }
    let r = lerp(stages[si].richness, ns.richness, sp);
    let px = bgX + 5 + (yr / maxYear) * (bgW - 10);
    let py = bgY + bgH - 8 - (r / 100) * (bgH - 20);
    vertex(px, py);
  }
  endShape();

  // Current point
  let cpx = bgX + 5 + (currentYear / maxYear) * (bgW - 10);
  let cpy = bgY + bgH - 8 - (richness / 100) * (bgH - 20);
  fill(200, 60, 60);
  noStroke();
  ellipse(cpx, cpy, 6, 6);
  textSize(9);
  fill(40);
  textAlign(LEFT, CENTER);
  text(round(richness), cpx + 5, cpy);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Year: ' + currentYear + ' / ' + maxYear, 10, drawHeight + 15);

  positionControls();
}

function drawLandscape(stageIdx, groundY, soilD, progress) {
  noStroke();
  let cx = canvasWidth / 2;

  if (stageIdx === 0) {
    // Bare rock
    fill(160, 155, 150);
    rect(0, groundY - 5, canvasWidth, 10);
  }

  if (stageIdx >= 1) {
    // Lichens and mosses
    for (let x = 0; x < canvasWidth; x += 15) {
      fill(140 + random(-10, 10), 160 + random(-10, 10), 80);
      ellipse(x + random(-5, 5), groundY - 2, random(6, 12), random(3, 6));
    }
  }

  if (stageIdx >= 2) {
    // Grasses
    for (let x = 0; x < canvasWidth; x += 8) {
      stroke(50 + random(30), 140 + random(40), 30);
      strokeWeight(1);
      let h = random(10, 25) * min(progress + 0.3, 1);
      line(x, groundY, x + random(-3, 3), groundY - h);
    }
    noStroke();
  }

  if (stageIdx >= 3) {
    // Shrubs
    for (let x = 30; x < canvasWidth; x += random(50, 80)) {
      let sw = random(20, 35);
      let sh = random(15, 30);
      fill(60 + random(20), 120 + random(30), 40 + random(20));
      ellipse(x, groundY - sh / 2 - 2, sw, sh);
      fill(80, 60, 40);
      rect(x - 2, groundY - 5, 4, 8);
    }
  }

  if (stageIdx >= 4) {
    // Pioneer trees (small)
    for (let x = 50; x < canvasWidth; x += random(60, 100)) {
      drawSimpleTree(x, groundY, random(30, 50), [70, 140, 50]);
    }
  }

  if (stageIdx >= 5) {
    // Climax forest (tall trees)
    for (let x = 40; x < canvasWidth; x += random(50, 80)) {
      drawSimpleTree(x, groundY, random(50, 90), [40 + random(20), 110 + random(30), 30 + random(20)]);
    }
  }
}

function drawSimpleTree(x, groundY, h, col) {
  // Trunk
  fill(100, 70, 40);
  noStroke();
  rect(x - 4, groundY - h * 0.4, 8, h * 0.4);
  // Canopy
  fill(col[0], col[1], col[2]);
  ellipse(x, groundY - h * 0.6, h * 0.5, h * 0.5);
  triangle(x, groundY - h, x - h * 0.3, groundY - h * 0.35, x + h * 0.3, groundY - h * 0.35);
}

function positionControls() {
  let ox = canvasOffsetX();
  let oy = canvasOffsetY();
  // Row 1: time slider
  timeSlider.position(ox + 80, oy + drawHeight + 5);
  timeSlider.size(canvasWidth - 110);
  // Row 2: buttons
  modeBtn.position(ox + 10, oy + drawHeight + 40);
  disturbBtn.position(ox + 180, oy + drawHeight + 40);
  resetBtn.position(ox + 290, oy + drawHeight + 40);
}

function canvasOffsetX() {
  return document.querySelector('main canvas').getBoundingClientRect().left;
}
function canvasOffsetY() {
  return document.querySelector('main canvas').getBoundingClientRect().top;
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
