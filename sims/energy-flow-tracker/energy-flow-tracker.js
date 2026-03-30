// Energy Flow Tracker - Animated trophic level energy flow
// CANVAS_HEIGHT: 485
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let energySlider;
let pauseBtn;
let paused = true;
let particles = [];

// Trophic levels
let levels = [
  { name: 'Producers', efficiency: 0.01, color: '#4CAF50', icon: 'P' },
  { name: 'Primary\nConsumers', efficiency: 0.10, color: '#8BC34A', icon: 'H' },
  { name: 'Secondary\nConsumers', efficiency: 0.10, color: '#FF9800', icon: 'C' },
  { name: 'Tertiary\nConsumers', efficiency: 0.10, color: '#F44336', icon: 'T' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Animated energy flow through four trophic levels showing losses', LABEL);

  energySlider = createSlider(5000, 20000, 10000, 500);
  energySlider.parent(document.querySelector('main'));
  energySlider.position(sliderLeftMargin, drawHeight + 5);
  energySlider.size(canvasWidth - sliderLeftMargin - margin);

  pauseBtn = createButton('Play');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.position(10, drawHeight + 5);
  pauseBtn.mousePressed(() => {
    paused = !paused;
    pauseBtn.html(paused ? 'Play' : 'Pause');
  });
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

  let solarInput = energySlider.value();

  // Title
  noStroke();
  fill(30);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Energy Flow Through Trophic Levels', canvasWidth / 2, 6);

  // Calculate energy at each level
  let energies = [];
  let e = solarInput * levels[0].efficiency; // energy captured by producers
  energies.push({ incoming: solarInput, captured: e });
  for (let i = 1; i < levels.length; i++) {
    let nextE = e * levels[i].efficiency;
    energies.push({ incoming: e, captured: nextE });
    e = nextE;
  }

  // Layout
  let boxW = canvasWidth / (levels.length + 1);
  let boxH = 55;
  let baseY = 160;
  let arrowY = baseY + boxH / 2;

  // Draw flow arrows and boxes
  let cumulativeHeat = 0;
  for (let i = 0; i < levels.length; i++) {
    let lv = levels[i];
    let en = energies[i];
    let x = margin + i * boxW + boxW / 2;
    let y = baseY;

    // Incoming arrow
    if (i === 0) {
      // Solar arrow
      stroke('#FFD600');
      strokeWeight(3);
      drawArrow(x - boxW / 2, arrowY, x - boxW / 4, arrowY);
      noStroke();
      fill('#FFD600');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text('Solar: ' + solarInput, x - boxW / 3, arrowY - 5);
    }

    // Box
    fill(lv.color + '40');
    stroke(lv.color);
    strokeWeight(2);
    rect(x - boxW / 4, y, boxW / 2, boxH, 5);

    noStroke();
    fill(30);
    textSize(11);
    textAlign(CENTER, CENTER);
    text(lv.name, x, y + 15);
    textSize(10);
    text(nf(en.captured, 0, 1) + ' kcal', x, y + boxH - 15);

    // Efficiency label
    let effPct = (i === 0) ? (levels[0].efficiency * 100) : (levels[i].efficiency * 100);
    fill(80);
    textSize(9);
    text(effPct + '% efficiency', x, y + boxH + 10);

    // Respiration arrow (upward, red)
    let respiration = en.captured * 0.6;
    cumulativeHeat += respiration;
    stroke('#D32F2F');
    strokeWeight(2);
    let respArrowX = x - boxW / 8;
    drawArrow(respArrowX, y, respArrowX, y - 45);
    noStroke();
    fill('#D32F2F');
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('Resp: ' + nf(respiration, 0, 1), respArrowX, y - 48);

    // Waste arrow (downward, brown)
    let waste = en.captured * 0.3;
    cumulativeHeat += waste * 0.5;
    stroke('#795548');
    strokeWeight(2);
    let wasteArrowX = x + boxW / 8;
    drawArrow(wasteArrowX, y + boxH, wasteArrowX, y + boxH + 40);
    noStroke();
    fill('#795548');
    textSize(9);
    textAlign(CENTER, TOP);
    text('Waste: ' + nf(waste, 0, 1), wasteArrowX, y + boxH + 42);

    // Transfer arrow to next level
    if (i < levels.length - 1) {
      let transfer = en.captured * levels[i + 1].efficiency;
      stroke(levels[i + 1].color);
      strokeWeight(2);
      drawArrow(x + boxW / 4 + 2, arrowY, x + boxW * 3 / 4 - 2, arrowY);
      noStroke();
      fill(50);
      textSize(9);
      textAlign(CENTER, BOTTOM);
      text(nf(transfer, 0, 1), x + boxW / 2, arrowY - 4);
    }

    // Pie chart for this level
    let pieX = x;
    let pieY = y + boxH + 75;
    let pieR = 25;
    let respPct = 0.6;
    let wastePct = 0.3;
    let growthPct = 0.1;

    // Respiration slice
    fill('#D32F2F');
    noStroke();
    arc(pieX, pieY, pieR * 2, pieR * 2, 0, TWO_PI * respPct);
    // Waste slice
    fill('#795548');
    arc(pieX, pieY, pieR * 2, pieR * 2, TWO_PI * respPct, TWO_PI * (respPct + wastePct));
    // Growth slice
    fill(lv.color);
    arc(pieX, pieY, pieR * 2, pieR * 2, TWO_PI * (respPct + wastePct), TWO_PI);

    // Pie labels
    noStroke();
    fill(80);
    textSize(8);
    textAlign(CENTER, TOP);
    text('60% heat', pieX, pieY + pieR + 3);
  }

  // Cumulative heat loss counter
  noStroke();
  fill('#D32F2F');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Total Heat Loss: ' + nf(cumulativeHeat, 0, 1) + ' kcal', canvasWidth / 2, 30);

  // Animated particles
  if (!paused) {
    if (frameCount % 8 === 0) {
      particles.push({
        x: margin,
        y: arrowY,
        level: 0,
        vx: 2,
        life: 255
      });
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.x += p.vx;
      p.life -= 1;
      fill(255, 200, 0, p.life);
      noStroke();
      ellipse(p.x, p.y + random(-2, 2), 5, 5);
      if (p.life <= 0 || p.x > canvasWidth) {
        particles.splice(i, 1);
      }
    }
  }

  // Legend
  let legY = drawHeight - 25;
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  fill('#D32F2F'); rect(10, legY - 5, 10, 10); fill(30); text('Respiration', 24, legY);
  fill('#795548'); rect(100, legY - 5, 10, 10); fill(30); text('Waste', 114, legY);
  fill('#4CAF50'); rect(165, legY - 5, 10, 10); fill(30); text('Growth', 179, legY);

  // Control labels
  noStroke();
  fill(30);
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Solar Input: ' + energySlider.value() + ' kcal', 70, drawHeight + 16);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let sz = 6;
  line(x2, y2, x2 - sz * cos(angle - PI / 6), y2 - sz * sin(angle - PI / 6));
  line(x2, y2, x2 - sz * cos(angle + PI / 6), y2 - sz * sin(angle + PI / 6));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  energySlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
