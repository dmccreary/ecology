// Biomagnification Through a Food Web MicroSim
// CANVAS_HEIGHT: 530
let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 220;
let defaultTextSize = 16;

let concSlider;
let dangerThreshold = 5.0; // ppm

let levels = [
  { name: 'Tertiary Consumers', organisms: ['Eagle', 'Orca'], factor: 1000, emoji: '\uD83E\uDD85' },
  { name: 'Secondary Consumers', organisms: ['Bass', 'Fox'], factor: 100, emoji: '\uD83D\uDC1F' },
  { name: 'Primary Consumers', organisms: ['Zooplankton', 'Snail'], factor: 10, emoji: '\uD83D\uDC1B' },
  { name: 'Producers', organisms: ['Phytoplankton', 'Algae'], factor: 1, emoji: '\uD83C\uDF3F' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Biomagnification food web showing toxin concentration increasing at each trophic level', LABEL);

  concSlider = createSlider(0.001, 0.1, 0.01, 0.001);
  concSlider.parent(document.querySelector('main'));
  concSlider.style('width', '150px');
}

function draw() {
  updateCanvasSize();

  let baseConc = concSlider.value();

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Biomagnification Through a Food Web', canvasWidth / 2, 8);

  // Water base
  fill(200, 225, 255);
  noStroke();
  rect(0, drawHeight - 50, canvasWidth, 50);
  fill(100, 150, 200);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Water: ' + nf(baseConc, 1, 3) + ' ppm', canvasWidth / 2, drawHeight - 25);

  // Draw pyramid levels
  let levelHeight = 85;
  let startY = 40;
  let maxBarWidth = canvasWidth * 0.45;

  for (let i = 0; i < levels.length; i++) {
    let lv = levels[i];
    let conc = baseConc * lv.factor;
    let y = startY + i * levelHeight;

    // Pyramid block - wider at bottom
    let blockWidth = map(i, 0, levels.length - 1, canvasWidth * 0.4, canvasWidth * 0.85);
    let bx = (canvasWidth - blockWidth) / 2;

    // Background block
    let danger = conc >= dangerThreshold;
    if (danger && frameCount % 30 < 15) {
      fill(255, 200, 200, 80);
    } else {
      fill(240, 245, 255, 80);
    }
    stroke(180);
    strokeWeight(1);
    rect(bx, y, blockWidth, levelHeight - 10, 6);

    // Level name
    noStroke();
    fill(60);
    textSize(13);
    textAlign(LEFT, TOP);
    text(lv.name, bx + 10, y + 5);

    // Organisms
    textSize(20);
    let orgX = bx + 15;
    let orgY = y + 25;
    let numOrgs = levels.length - i + 1;
    for (let j = 0; j < numOrgs; j++) {
      text(lv.emoji, orgX + j * 28, orgY);
    }

    // Concentration bar
    let barX = canvasWidth / 2 + 20;
    let barY = y + 30;
    let barH = 22;
    let maxConc = 0.1 * 1000; // max possible concentration
    let barW = min(maxBarWidth, map(log(conc + 0.001) / log(10), -3, 2, 10, maxBarWidth));
    barW = max(barW, 5);

    // Bar color gradient from yellow to red
    let dangerFrac = constrain(conc / dangerThreshold, 0, 1);
    let barColor = lerpColor(color(255, 230, 50), color(255, 50, 30), dangerFrac);
    fill(barColor);
    noStroke();
    rect(barX, barY, barW, barH, 3);

    // Concentration text
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(nf(conc, 1, 3) + ' ppm', barX + barW + 8, barY + barH / 2);

    // Danger indicator
    if (danger) {
      fill(255, 0, 0);
      textSize(14);
      text('\u26A0 DANGER', barX + barW + 70, barY + barH / 2);
    }

    // Magnification label
    fill(100);
    textSize(10);
    textAlign(LEFT, TOP);
    text(lv.factor + 'x concentration', barX, barY + barH + 2);
  }

  // Arrows between levels
  stroke(150);
  strokeWeight(2);
  let arrowX = canvasWidth * 0.25;
  for (let i = 0; i < levels.length - 1; i++) {
    let y1 = startY + (i + 1) * levelHeight - 5;
    let y2 = startY + i * levelHeight + levelHeight - 15;
    line(arrowX, y1, arrowX, y2);
    // Arrowhead
    fill(150);
    noStroke();
    triangle(arrowX - 5, y2 + 5, arrowX + 5, y2 + 5, arrowX, y2);
    stroke(150);
    strokeWeight(2);
  }

  // 10x labels on arrows
  noStroke();
  fill(180, 50, 50);
  textSize(11);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < levels.length - 1; i++) {
    let yMid = startY + i * levelHeight + levelHeight + levelHeight / 2 - 8;
    text('\u00D710', arrowX + 8, yMid);
  }

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Water Pollutant (ppm): ' + nf(baseConc, 1, 3), 10, drawHeight + 25);
  concSlider.position(sliderLeftMargin, drawHeight + 16);
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
