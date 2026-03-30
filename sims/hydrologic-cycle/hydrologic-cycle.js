// The Hydrologic Cycle - Animated landscape
// CANVAS_HEIGHT: 465
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let solarSlider, vegSlider;
let particles = [];
let paused = false;
let hoverLabel = '';
let hoverX = 0, hoverY = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Animated hydrologic cycle showing evaporation, precipitation, runoff, and groundwater', LABEL);

  solarSlider = createSlider(1, 10, 5, 1);
  solarSlider.parent(document.querySelector('main'));
  solarSlider.position(100, drawHeight + 5);
  solarSlider.size(canvasWidth / 2 - 120);

  vegSlider = createSlider(0, 100, 50, 5);
  vegSlider.parent(document.querySelector('main'));
  vegSlider.position(canvasWidth / 2 + 100, drawHeight + 5);
  vegSlider.size(canvasWidth / 2 - 120);
}

function draw() {
  updateCanvasSize();
  background(135, 200, 250); // sky

  // Draw area border
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth, drawHeight);

  let solarEnergy = solarSlider.value();
  let vegCover = vegSlider.value() / 100;

  hoverLabel = '';

  // Sun
  noStroke();
  fill(255, 220, 50, 200);
  ellipse(70, 45, 50, 50);
  fill(255, 240, 100);
  ellipse(70, 45, 40, 40);

  // Landscape layers
  let groundY = drawHeight * 0.6;
  let waterTableY = drawHeight * 0.82;

  // Ocean (left)
  let oceanW = canvasWidth * 0.28;
  fill(30, 100, 180);
  noStroke();
  rect(0, groundY, oceanW, drawHeight - groundY);

  // Ocean surface waves
  fill(50, 130, 200);
  for (let x = 0; x < oceanW; x += 20) {
    let wy = groundY + sin((x + frameCount * 2) * 0.1) * 3;
    ellipse(x, wy, 25, 6);
  }

  // Check hover on ocean
  if (mouseX < oceanW && mouseY > groundY && mouseY < drawHeight) {
    hoverLabel = 'Evaporation: Water changes from liquid to gas using solar energy';
    hoverX = mouseX; hoverY = mouseY;
  }

  // Mountains (center)
  let mtLeft = canvasWidth * 0.35;
  let mtPeak = groundY - 100;
  fill(110, 90, 70);
  noStroke();
  triangle(mtLeft, groundY, mtLeft + canvasWidth * 0.15, mtPeak, mtLeft + canvasWidth * 0.3, groundY);
  // Snow cap
  fill(240);
  triangle(mtLeft + canvasWidth * 0.12, mtPeak + 20, mtLeft + canvasWidth * 0.15, mtPeak, mtLeft + canvasWidth * 0.18, mtPeak + 20);

  if (mouseX > mtLeft && mouseX < mtLeft + canvasWidth * 0.3 && mouseY > mtPeak && mouseY < groundY) {
    hoverLabel = 'Orographic precipitation: Air rises over mountains and cools, causing rain/snow';
    hoverX = mouseX; hoverY = mouseY;
  }

  // Plains / soil (right)
  fill(139, 119, 80);
  noStroke();
  rect(oceanW, groundY, canvasWidth - oceanW, drawHeight - groundY);

  // Groundwater layer
  fill(80, 140, 180, 120);
  rect(oceanW, waterTableY, canvasWidth - oceanW, drawHeight - waterTableY);

  if (mouseX > oceanW && mouseY > waterTableY && mouseY < drawHeight) {
    hoverLabel = 'Groundwater: Water seeps through soil and rock, stored in aquifers';
    hoverX = mouseX; hoverY = mouseY;
  }

  // Soil layer
  fill(100, 80, 50);
  rect(oceanW, groundY, canvasWidth - oceanW, 15);

  // Forest section
  let forestX = canvasWidth * 0.6;
  let forestW = canvasWidth * 0.25;
  let treeCount = floor(vegCover * 6) + 1;
  for (let i = 0; i < treeCount; i++) {
    let tx = forestX + (i / treeCount) * forestW;
    let treeH = 30 + vegCover * 20;
    // Trunk
    fill(100, 70, 30);
    noStroke();
    rect(tx - 3, groundY - treeH + 15, 6, treeH - 15);
    // Canopy
    fill(30, 130, 30);
    ellipse(tx, groundY - treeH + 10, 25, 25);

    // Transpiration arrows
    if (!paused && random() < 0.05 * solarEnergy * vegCover) {
      particles.push({
        x: tx + random(-5, 5),
        y: groundY - treeH,
        vx: random(-0.3, 0.3),
        vy: -1.2,
        type: 'transpiration',
        life: 80,
        alpha: 200
      });
    }
  }

  if (mouseX > forestX && mouseX < forestX + forestW && mouseY > groundY - 60 && mouseY < groundY) {
    hoverLabel = 'Transpiration: Plants release water vapor through their leaves';
    hoverX = mouseX; hoverY = mouseY;
  }

  // River flowing from mountains to ocean
  stroke(50, 120, 200);
  strokeWeight(4);
  noFill();
  beginShape();
  vertex(mtLeft + canvasWidth * 0.15, mtPeak + 30);
  curveVertex(mtLeft + canvasWidth * 0.15, mtPeak + 30);
  curveVertex(mtLeft + canvasWidth * 0.05, groundY - 10);
  curveVertex(oceanW + 10, groundY + 5);
  curveVertex(oceanW, groundY + 5);
  endShape();

  // Generate particles
  if (!paused) {
    // Evaporation from ocean
    if (random() < 0.08 * solarEnergy) {
      particles.push({
        x: random(10, oceanW - 10),
        y: groundY,
        vx: random(0.5, 1.5),
        vy: random(-1.5, -0.8),
        type: 'evaporation',
        life: 120,
        alpha: 180
      });
    }

    // Precipitation
    if (random() < 0.04 * solarEnergy) {
      let px = random(mtLeft, canvasWidth * 0.85);
      particles.push({
        x: px,
        y: random(30, 60),
        vx: random(-0.2, 0.2),
        vy: random(2, 3.5),
        type: 'precipitation',
        life: 100,
        alpha: 220
      });
    }

    // Surface runoff
    if (random() < 0.03 * (1 - vegCover) * solarEnergy) {
      particles.push({
        x: mtLeft + canvasWidth * 0.15 + random(-20, 20),
        y: groundY - 5,
        vx: -1.5,
        vy: 0.2,
        type: 'runoff',
        life: 80,
        alpha: 200
      });
    }

    // Infiltration
    if (random() < 0.02 * solarEnergy) {
      particles.push({
        x: random(oceanW + 20, canvasWidth - 20),
        y: groundY + 5,
        vx: 0,
        vy: 0.5,
        type: 'infiltration',
        life: 60,
        alpha: 150
      });
    }
  }

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (!paused) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.alpha -= 2;
    }

    noStroke();
    if (p.type === 'evaporation') {
      fill(100, 180, 255, p.alpha);
      ellipse(p.x, p.y, 6, 6);
    } else if (p.type === 'precipitation') {
      fill(30, 80, 200, p.alpha);
      ellipse(p.x, p.y, 4, 8);
    } else if (p.type === 'transpiration') {
      fill(100, 220, 100, p.alpha);
      ellipse(p.x, p.y, 5, 5);
    } else if (p.type === 'runoff') {
      fill(60, 140, 220, p.alpha);
      ellipse(p.x, p.y, 5, 5);
    } else if (p.type === 'infiltration') {
      fill(80, 130, 180, p.alpha);
      ellipse(p.x, p.y, 4, 4);
    }

    if (p.life <= 0 || p.alpha <= 0 || p.x < -10 || p.x > canvasWidth + 10 || p.y > drawHeight + 10) {
      particles.splice(i, 1);
    }
  }

  // Clouds
  let cloudY = 35;
  fill(240, 240, 245, 200);
  noStroke();
  let cloudOffset = (frameCount * 0.3) % canvasWidth;
  for (let c = 0; c < 3; c++) {
    let cx2 = (canvasWidth * 0.3 + c * canvasWidth * 0.25 + cloudOffset) % (canvasWidth + 100) - 50;
    ellipse(cx2, cloudY, 60, 25);
    ellipse(cx2 + 20, cloudY - 8, 40, 20);
    ellipse(cx2 - 15, cloudY + 3, 35, 18);
  }

  // Process labels
  noStroke();
  fill(30);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('OCEAN', oceanW / 2, groundY + 30);
  text('GROUNDWATER', canvasWidth * 0.65, waterTableY + 15);

  fill(255, 220, 50);
  textSize(9);
  text('Evaporation \u2191', oceanW / 2, groundY - 15);
  fill(30, 80, 200);
  text('Precipitation \u2193', canvasWidth * 0.55, 65);
  fill(100, 200, 100);
  text('Transpiration \u2191', forestX + forestW / 2, groundY - 65);

  // Hover tooltip
  if (hoverLabel && mouseY < drawHeight) {
    let tw = min(250, canvasWidth - 20);
    let th = 40;
    let tx = constrain(hoverX + 10, 5, canvasWidth - tw - 5);
    let ty = constrain(hoverY - th - 5, 5, drawHeight - th);
    fill(255, 255, 230, 230);
    stroke(100);
    strokeWeight(1);
    rect(tx, ty, tw, th, 4);
    noStroke();
    fill(30);
    textSize(10);
    textAlign(LEFT, TOP);
    text(hoverLabel, tx + 5, ty + 5, tw - 10, th - 10);
  }

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(30);
  textSize(12);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Solar: ' + solarSlider.value(), 10, drawHeight + 16);
  text('Vegetation: ' + vegSlider.value() + '%', canvasWidth / 2 + 10, drawHeight + 16);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  solarSlider.size(canvasWidth / 2 - 120);
  vegSlider.position(canvasWidth / 2 + 100, drawHeight + 5);
  vegSlider.size(canvasWidth / 2 - 120);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
