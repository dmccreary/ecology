// Eutrophication Cascade MicroSim
// CANVAS_HEIGHT: 490
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let nitrogenSlider, phosphorusSlider;
let algaeParticles = [];
let fishArray = [];
let bacteriaArray = [];
let oxygenHistory = [];
let time = 0;
let maxHistory = 200;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Eutrophication cascade simulation showing nutrient input effects on a lake ecosystem', LABEL);

  nitrogenSlider = createSlider(0, 100, 30, 1);
  nitrogenSlider.parent(document.querySelector('main'));
  nitrogenSlider.style('width', '120px');

  phosphorusSlider = createSlider(0, 100, 20, 1);
  phosphorusSlider.parent(document.querySelector('main'));
  phosphorusSlider.style('width', '120px');

  // Initialize fish
  for (let i = 0; i < 8; i++) {
    fishArray.push({
      x: random(canvasWidth * 0.05, canvasWidth * 0.95),
      y: random(drawHeight * 0.3, drawHeight * 0.75),
      vx: random(-1, 1),
      vy: random(-0.3, 0.3),
      alive: true,
      size: random(12, 20)
    });
  }

  // Initialize bacteria
  for (let i = 0; i < 30; i++) {
    bacteriaArray.push({
      x: random(canvasWidth * 0.05, canvasWidth * 0.95),
      y: random(drawHeight * 0.85, drawHeight * 0.98),
      vx: random(-0.3, 0.3),
      vy: random(-0.2, 0.2)
    });
  }
}

function draw() {
  updateCanvasSize();
  time++;

  let nitrogen = nitrogenSlider.value();
  let phosphorus = phosphorusSlider.value();
  let nutrientLevel = (nitrogen + phosphorus) / 200; // 0 to 1
  let algaeDensity = nutrientLevel * nutrientLevel; // nonlinear response
  let dissolvedOxygen = max(0, 1 - algaeDensity * 1.3);

  // Store oxygen history
  if (time % 3 === 0) {
    oxygenHistory.push(dissolvedOxygen);
    if (oxygenHistory.length > maxHistory) oxygenHistory.shift();
  }

  // --- Lake cross-section ---
  // Sky
  fill(180, 220, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight * 0.12);

  // Water gradient based on oxygen
  let waterTop = drawHeight * 0.12;
  let waterHeight = drawHeight * 0.88;
  for (let y = 0; y < waterHeight; y++) {
    let t = y / waterHeight;
    let r = lerp(50, 120 * (1 - dissolvedOxygen) + 50, t);
    let g = lerp(130, 80 * (1 - dissolvedOxygen) + 50, t);
    let b = lerp(220, 100 * dissolvedOxygen + 80, t);
    stroke(r, g, b);
    line(0, waterTop + y, canvasWidth, waterTop + y);
  }
  noStroke();

  // Sediment
  fill(120, 90, 60);
  rect(0, drawHeight * 0.92, canvasWidth, drawHeight * 0.08);

  // Algae on surface
  let numAlgae = floor(algaeDensity * 150);
  fill(30, 180, 30, 180);
  for (let i = 0; i < numAlgae; i++) {
    let ax = (noise(i * 0.3, time * 0.005) * canvasWidth);
    let ay = waterTop + noise(i * 0.7, time * 0.003) * drawHeight * 0.12;
    let sz = random(3, 7);
    ellipse(ax, ay, sz, sz);
  }

  // Dead algae sinking
  if (algaeDensity > 0.3) {
    fill(80, 120, 40, 100);
    let deadCount = floor((algaeDensity - 0.3) * 60);
    for (let i = 0; i < deadCount; i++) {
      let dx = noise(i * 1.1, time * 0.002) * canvasWidth;
      let dy = waterTop + drawHeight * 0.3 + noise(i * 0.5, time * 0.004) * drawHeight * 0.55;
      ellipse(dx, dy, 3, 3);
    }
  }

  // Fish
  for (let f of fishArray) {
    if (dissolvedOxygen < 0.3) {
      f.alive = false;
    } else if (dissolvedOxygen < 0.5 && random() < 0.001) {
      f.alive = false;
    }

    if (f.alive) {
      // Flee upward when oxygen is low
      if (dissolvedOxygen < 0.5) {
        f.vy -= 0.05;
        f.vx += random(-0.2, 0.2);
      }
      f.x += f.vx;
      f.y += f.vy;
      f.y = constrain(f.y, waterTop + 20, drawHeight * 0.85);
      if (f.x < 10 || f.x > canvasWidth - 10) f.vx *= -1;
      if (f.y < waterTop + 20 || f.y > drawHeight * 0.85) f.vy *= -1;
      f.vx = constrain(f.vx, -1.5, 1.5);
      f.vy = constrain(f.vy, -0.8, 0.8);

      // Draw living fish
      push();
      translate(f.x, f.y);
      if (f.vx < 0) scale(-1, 1);
      fill(255, 180, 50);
      stroke(200, 140, 30);
      strokeWeight(1);
      ellipse(0, 0, f.size, f.size * 0.6);
      triangle(-f.size * 0.4, 0, -f.size * 0.7, -f.size * 0.3, -f.size * 0.7, f.size * 0.3);
      fill(0);
      noStroke();
      ellipse(f.size * 0.2, -1, 3, 3);
      pop();
    } else {
      // Dead fish float up slowly
      f.y -= 0.1;
      f.y = max(f.y, waterTop + 5);
      push();
      translate(f.x, f.y);
      rotate(PI);
      fill(180, 180, 180, 180);
      stroke(150);
      strokeWeight(1);
      ellipse(0, 0, f.size, f.size * 0.6);
      triangle(-f.size * 0.4, 0, -f.size * 0.7, -f.size * 0.3, -f.size * 0.7, f.size * 0.3);
      pop();
    }
  }

  // Bacteria on bottom
  noStroke();
  let bacteriaActivity = algaeDensity > 0.2 ? min(1, (algaeDensity - 0.2) * 2) : 0;
  for (let b of bacteriaArray) {
    b.x += b.vx * (1 + bacteriaActivity * 2);
    b.y += b.vy;
    if (b.x < 5 || b.x > canvasWidth - 5) b.vx *= -1;
    b.y = constrain(b.y, drawHeight * 0.82, drawHeight * 0.96);
    if (b.y <= drawHeight * 0.82 || b.y >= drawHeight * 0.96) b.vy *= -1;

    fill(200, 200, 150, 100 + bacteriaActivity * 155);
    ellipse(b.x, b.y, 3, 3);
  }

  // Oxygen chart at bottom of draw area
  let chartX = margin;
  let chartY = drawHeight * 0.02;
  let chartW = canvasWidth * 0.35;
  let chartH = 60;

  fill(255, 255, 255, 200);
  stroke(150);
  strokeWeight(1);
  rect(chartX, chartY, chartW, chartH, 4);

  noStroke();
  fill(0);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Dissolved O\u2082', chartX + 4, chartY + 2);

  // Dead zone threshold line
  stroke(255, 0, 0, 120);
  strokeWeight(1);
  let threshY = chartY + chartH - (0.3 * chartH);
  line(chartX, threshY, chartX + chartW, threshY);
  noStroke();
  fill(255, 0, 0, 120);
  textSize(8);
  text('Dead Zone', chartX + chartW - 48, threshY - 10);

  // Plot oxygen history
  noFill();
  stroke(0, 100, 255);
  strokeWeight(1.5);
  beginShape();
  for (let i = 0; i < oxygenHistory.length; i++) {
    let px = chartX + (i / maxHistory) * chartW;
    let py = chartY + chartH - oxygenHistory[i] * chartH;
    vertex(px, py);
  }
  endShape();

  // Dissolved oxygen indicator
  noStroke();
  let oxyColor = dissolvedOxygen > 0.5 ? color(0, 150, 255) : dissolvedOxygen > 0.3 ? color(255, 180, 0) : color(255, 50, 50);
  fill(oxyColor);
  textSize(12);
  textAlign(RIGHT, TOP);
  text('O\u2082: ' + nf(dissolvedOxygen * 100, 1, 0) + '%', canvasWidth - margin, 5);

  // Status label
  textAlign(CENTER, TOP);
  fill(255, 255, 255, 220);
  if (dissolvedOxygen < 0.3) {
    fill(255, 50, 50);
    textSize(14);
    text('\u26A0 DEAD ZONE', canvasWidth / 2, 5);
  }

  // --- Controls area ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Nitrogen: ' + nitrogen + '%', 10, drawHeight + 20);
  nitrogenSlider.position(sliderLeftMargin, drawHeight + 12);

  text('Phosphorus: ' + phosphorus + '%', 10, drawHeight + 50);
  phosphorusSlider.position(sliderLeftMargin, drawHeight + 42);

  // Nutrient level bar
  let barX = sliderLeftMargin + 140;
  let barW = canvasWidth - barX - 20;
  if (barW > 40) {
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Nutrient Load', barX, drawHeight + 20);
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(barX, drawHeight + 32, barW, 16, 4);
    noStroke();
    let barColor = lerpColor(color(100, 200, 100), color(255, 50, 50), nutrientLevel);
    fill(barColor);
    rect(barX, drawHeight + 32, barW * nutrientLevel, 16, 4);
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
