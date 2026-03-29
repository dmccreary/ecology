// Phosphorus Runoff and Eutrophication Simulator
let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let fertSlider;
let rainBtn, bufferBtn;
let phosphorusParticles = [];
let algaeLevel = 0;
let oxygenLevel = 100;
let fishAlive = 5;
let isRaining = false;
let rainTimer = 0;
let hasBuffer = false;
let simWeek = 0;
let frameCounter = 0;
let history = [];
let paused = true;
let pauseBtn;

// Layout zones
let farmW, lakeX, lakeW;
let groundY, waterSurfaceY, lakeBottom;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Phosphorus runoff simulator showing how fertilizer causes eutrophication in a lake.', LABEL);

  pauseBtn = createButton('▶ Play');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.mousePressed(() => { paused = !paused; pauseBtn.html(paused ? '▶ Play' : '❚❚ Pause'); });

  fertSlider = createSlider(0, 3, 1, 1);
  fertSlider.parent(document.querySelector('main'));

  rainBtn = createButton('🌧 Rain');
  rainBtn.parent(document.querySelector('main'));
  rainBtn.mousePressed(() => { if (!paused) { isRaining = true; rainTimer = 120; } });

  bufferBtn = createButton('Add Buffer Strip');
  bufferBtn.parent(document.querySelector('main'));
  bufferBtn.mousePressed(() => { hasBuffer = !hasBuffer; bufferBtn.html(hasBuffer ? 'Remove Buffer' : 'Add Buffer Strip'); });

  history.push({ week: 0, phos: 0, algae: 0, oxygen: 100 });
}

function draw() {
  updateCanvasSize();
  frameCounter++;

  farmW = canvasWidth * 0.45;
  lakeX = canvasWidth * 0.55;
  lakeW = canvasWidth * 0.45;
  groundY = drawHeight * 0.45;
  waterSurfaceY = drawHeight * 0.4;
  lakeBottom = drawHeight * 0.78;

  // Sky
  background(180, 215, 245);

  // Farmland
  noStroke();
  fill(120, 180, 60);
  rect(0, groundY, farmW, drawHeight - groundY);
  // Soil layer
  fill(139, 119, 80);
  rect(0, groundY + 20, farmW, drawHeight - groundY - 20);

  // Crops
  stroke(50, 130, 40);
  strokeWeight(2);
  for (let x = 20; x < farmW - 10; x += 25) {
    line(x, groundY, x, groundY - 25);
    noStroke();
    fill(50, 150, 40);
    ellipse(x, groundY - 28, 12, 10);
    stroke(50, 130, 40);
    strokeWeight(2);
  }

  // Fertilizer level label
  let fertLabels = ['None', 'Low', 'Medium', 'Excessive'];
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text('Fertilizer: ' + fertLabels[fertSlider.value()], 10, 10);

  // Stream connecting farm to lake
  noStroke();
  fill(100, 160, 220, 180);
  beginShape();
  vertex(farmW - 10, groundY);
  vertex(lakeX, waterSurfaceY);
  vertex(lakeX, waterSurfaceY + 15);
  vertex(farmW - 10, groundY + 15);
  endShape(CLOSE);

  // Buffer strip
  if (hasBuffer) {
    fill(30, 120, 40);
    noStroke();
    rect(farmW - 25, groundY - 10, 20, 30);
    for (let i = 0; i < 4; i++) {
      ellipse(farmW - 22 + i * 6, groundY - 12, 14, 14);
    }
  }

  // Lake
  noStroke();
  // Water body
  let waterAlpha = 200;
  fill(60, 130, 200, waterAlpha);
  rect(lakeX, waterSurfaceY, lakeW, lakeBottom - waterSurfaceY, 0, 0, 10, 10);

  // Algae on surface
  if (algaeLevel > 5) {
    let algaeAlpha = map(algaeLevel, 5, 100, 30, 220);
    fill(50, 180, 50, algaeAlpha);
    rect(lakeX, waterSurfaceY, lakeW, map(algaeLevel, 0, 100, 2, (lakeBottom - waterSurfaceY) * 0.3));
  }

  // Fish
  for (let i = 0; i < 5; i++) {
    let fx = lakeX + 20 + i * (lakeW - 40) / 5;
    let fy = lakeBottom - 30 + sin(frameCounter * 0.03 + i) * 10;
    if (i < fishAlive) {
      fill(255, 180, 50);
      noStroke();
      ellipse(fx, fy, 18, 10);
      triangle(fx + 9, fy, fx + 16, fy - 5, fx + 16, fy + 5);
      fill(0);
      ellipse(fx - 4, fy - 2, 3, 3);
    } else {
      // Dead fish (belly up)
      fill(200, 200, 200, 150);
      noStroke();
      ellipse(fx, waterSurfaceY + 15, 18, 10);
      fill(180, 180, 180, 150);
      triangle(fx + 9, waterSurfaceY + 15, fx + 16, waterSurfaceY + 10, fx + 16, waterSurfaceY + 20);
    }
  }

  // Oxygen meter
  let meterX = lakeX + lakeW - 35;
  let meterTop = waterSurfaceY + 10;
  let meterH = lakeBottom - waterSurfaceY - 25;
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(meterX, meterTop, 20, meterH);
  let oxyH = map(oxygenLevel, 0, 100, 0, meterH);
  let oxyColor = oxygenLevel > 60 ? color(60, 180, 60) : oxygenLevel > 30 ? color(220, 180, 40) : color(220, 50, 50);
  fill(oxyColor);
  noStroke();
  rect(meterX + 1, meterTop + meterH - oxyH, 18, oxyH);
  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER);
  text('O₂', meterX + 10, meterTop - 8);
  text(nf(oxygenLevel, 0, 0) + '%', meterX + 10, meterTop + meterH + 12);

  // Rain effect
  if (isRaining) {
    stroke(150, 180, 220, 150);
    strokeWeight(1);
    for (let i = 0; i < 40; i++) {
      let rx = random(0, canvasWidth);
      let ry = random(0, groundY);
      line(rx, ry, rx - 2, ry + 10);
    }
    rainTimer--;
    if (rainTimer <= 0) isRaining = false;
  }

  // Phosphorus particles
  noStroke();
  for (let i = phosphorusParticles.length - 1; i >= 0; i--) {
    let p = phosphorusParticles[i];
    if (!paused) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }
    fill(255, 140, 30, map(p.life, 0, 50, 0, 230));
    ellipse(p.x, p.y, 6, 6);

    // If particle reaches lake, add to algae
    if (p.x >= lakeX && p.y >= waterSurfaceY && !p.counted) {
      if (hasBuffer && p.x < lakeX + 15) {
        p.life = 0; // intercepted by buffer
      } else {
        algaeLevel = min(100, algaeLevel + 0.3);
        p.counted = true;
      }
    }
    if (p.life <= 0) phosphorusParticles.splice(i, 1);
  }

  // Simulation logic
  if (!paused) {
    // Generate phosphorus during rain
    if (isRaining && fertSlider.value() > 0) {
      let rate = fertSlider.value() * 2;
      for (let i = 0; i < rate; i++) {
        phosphorusParticles.push({
          x: random(10, farmW - 30),
          y: groundY + random(-5, 5),
          vx: random(1, 2.5),
          vy: random(-0.5, 0.5),
          life: 200,
          counted: false
        });
      }
    }

    // Algae decay and oxygen dynamics
    if (frameCounter % 10 === 0) {
      algaeLevel = max(0, algaeLevel - 0.1);
      if (algaeLevel > 20) {
        oxygenLevel = max(0, oxygenLevel - (algaeLevel - 20) * 0.03);
      } else {
        oxygenLevel = min(100, oxygenLevel + 0.3);
      }
      // Fish die if oxygen too low
      fishAlive = oxygenLevel > 15 ? 5 : oxygenLevel > 8 ? 3 : oxygenLevel > 3 ? 1 : 0;
    }

    // Record history every ~60 frames = ~1 second
    if (frameCounter % 60 === 0) {
      simWeek++;
      history.push({
        week: simWeek,
        phos: fertSlider.value() * 25,
        algae: algaeLevel,
        oxygen: oxygenLevel
      });
      if (history.length > 50) history.shift();
    }
  }

  // Timeline graph at bottom of draw area
  let graphY = lakeBottom + 5;
  let graphH = drawHeight - graphY - 5;
  if (graphH > 30) {
    fill(255, 255, 255, 200);
    noStroke();
    rect(10, graphY, canvasWidth - 20, graphH, 4);
    // Draw lines
    if (history.length > 1) {
      let gw = canvasWidth - 40;
      for (let i = 1; i < history.length; i++) {
        let x1 = 20 + (i - 1) * gw / (history.length - 1);
        let x2 = 20 + i * gw / (history.length - 1);
        // Algae
        stroke(50, 180, 50);
        strokeWeight(1.5);
        line(x1, graphY + graphH - history[i - 1].algae / 100 * graphH,
          x2, graphY + graphH - history[i].algae / 100 * graphH);
        // Oxygen
        stroke(60, 130, 200);
        line(x1, graphY + graphH - history[i - 1].oxygen / 100 * graphH,
          x2, graphY + graphH - history[i].oxygen / 100 * graphH);
      }
    }
    noStroke();
    fill(50, 180, 50);
    textSize(9);
    textAlign(LEFT);
    text('Algae', 22, graphY + 10);
    fill(60, 130, 200);
    text('O₂', 60, graphY + 10);
    fill(100);
    text('Week ' + simWeek, canvasWidth - 70, graphY + 10);
  }

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  fill(0);
  textSize(11);
  textAlign(LEFT, CENTER);
  noStroke();
  let fertLabels2 = ['None', 'Low', 'Med', 'High'];
  text('Fertilizer: ' + fertLabels2[fertSlider.value()], 10, drawHeight + controlHeight / 2);
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
