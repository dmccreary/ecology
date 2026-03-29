// Solar Radiation and Albedo Simulator
// Interactive surface type selector with energy budget display

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let surfaceSelect;
let feedbackCheckbox;
let arrows = [];
let lastSurface = '';

const surfaces = {
  'Fresh Snow':   { albedo: 0.85, color: [240, 245, 255], temp: -15, groundColor: [230, 240, 250] },
  'Sea Ice':      { albedo: 0.60, color: [180, 210, 235], temp: -8,  groundColor: [190, 220, 240] },
  'Ocean':        { albedo: 0.06, color: [30, 80, 140],   temp: 22,  groundColor: [40, 90, 160] },
  'Forest':       { albedo: 0.15, color: [30, 100, 40],   temp: 20,  groundColor: [40, 120, 50] },
  'Desert':       { albedo: 0.40, color: [210, 185, 130],  temp: 38, groundColor: [220, 195, 140] },
  'City':         { albedo: 0.15, color: [130, 130, 130],  temp: 32, groundColor: [150, 150, 150] }
};

const surfaceNames = Object.keys(surfaces);
let currentAlbedo = 0.85;
let targetAlbedo = 0.85;
let currentTemp = -15;
let targetTemp = -15;
let animFrame = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Solar radiation and albedo simulator showing energy absorbed and reflected by different surfaces', LABEL);

  surfaceSelect = createSelect();
  surfaceSelect.parent(document.querySelector('main'));
  surfaceSelect.position(10, drawHeight + 12);
  for (let name of surfaceNames) {
    surfaceSelect.option(name);
  }

  feedbackCheckbox = createCheckbox('Show Climate Feedback', false);
  feedbackCheckbox.parent(document.querySelector('main'));
  feedbackCheckbox.position(200, drawHeight + 14);
  feedbackCheckbox.style('font-size', '13px');
}

function draw() {
  updateCanvasSize();
  animFrame++;

  let selName = surfaceSelect.value();
  let surf = surfaces[selName];
  targetAlbedo = surf.albedo;
  targetTemp = surf.temp;
  currentAlbedo = lerp(currentAlbedo, targetAlbedo, 0.08);
  currentTemp = lerp(currentTemp, targetTemp, 0.08);

  // Sky
  let skyTop = color(50, 100, 200);
  let skyBot = color(140, 180, 230);
  for (let y = 0; y < drawHeight * 0.55; y++) {
    let inter = map(y, 0, drawHeight * 0.55, 0, 1);
    let c = lerpColor(skyTop, skyBot, inter);
    stroke(c);
    line(0, y, canvasWidth, y);
  }

  // Ground
  let groundY = drawHeight * 0.55;
  noStroke();
  fill(surf.groundColor);
  rect(0, groundY, canvasWidth, drawHeight - groundY);

  // Surface details
  drawSurfaceDetails(selName, groundY);

  // Sun
  let sunX = canvasWidth * 0.85;
  let sunY = 50;
  noStroke();
  fill(255, 220, 50, 60);
  ellipse(sunX, sunY, 80, 80);
  fill(255, 230, 50);
  ellipse(sunX, sunY, 50, 50);

  // Incoming solar arrows (yellow)
  let incomingW = 340;
  let numArrows = 8;
  let reflected = round(numArrows * currentAlbedo);
  let absorbed = numArrows - reflected;

  for (let i = 0; i < numArrows; i++) {
    let startX = margin + 30 + i * (incomingW / numArrows);
    let startY = 30 + i * 5;
    let hitX = startX + 20;
    let hitY = groundY - 5;

    // Incoming arrow (yellow)
    stroke(255, 220, 50);
    strokeWeight(2);
    let offsetY = sin(animFrame * 0.05 + i) * 3;
    line(startX, startY + offsetY, hitX, hitY);
    // Arrowhead
    let angle = atan2(hitY - startY, hitX - startX);
    fill(255, 220, 50);
    push();
    translate(hitX, hitY);
    rotate(angle);
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    // Reflected arrows (white, going up)
    if (i < reflected) {
      stroke(255, 255, 255, 200);
      strokeWeight(2);
      let refEndX = hitX + 30;
      let refEndY = 20 + i * 3;
      line(hitX, hitY, refEndX, refEndY);
      fill(255, 255, 255, 200);
      let refAngle = atan2(refEndY - hitY, refEndX - hitX);
      push();
      translate(refEndX, refEndY);
      rotate(refAngle);
      triangle(0, 0, -8, -4, -8, 4);
      pop();
    }
  }

  // Absorbed glow
  let glowAlpha = map(1 - currentAlbedo, 0, 1, 0, 150);
  noStroke();
  fill(255, 50, 0, glowAlpha * (0.7 + 0.3 * sin(animFrame * 0.05)));
  rect(0, groundY - 3, canvasWidth, 6);

  // Temperature gauge on right
  let gaugeX = canvasWidth - 50;
  let gaugeTop = 80;
  let gaugeBottom = groundY - 30;
  let gaugeH = gaugeBottom - gaugeTop;

  // Gauge background
  stroke(100);
  strokeWeight(1);
  fill(240);
  rect(gaugeX - 10, gaugeTop, 20, gaugeH, 5);

  // Temperature fill
  let tempFrac = map(currentTemp, -20, 50, 0, 1);
  tempFrac = constrain(tempFrac, 0, 1);
  let fillH = gaugeH * tempFrac;
  noStroke();
  let tempColor = lerpColor(color(50, 100, 255), color(255, 50, 0), tempFrac);
  fill(tempColor);
  rect(gaugeX - 8, gaugeBottom - fillH, 16, fillH, 3);

  // Gauge labels
  noStroke();
  fill(0);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('50°C', gaugeX + 15, gaugeTop);
  text('-20°C', gaugeX + 15, gaugeBottom);

  // Current temp
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text(nf(currentTemp, 0, 1) + '°C', gaugeX, gaugeBottom + 8);

  // Numerical display
  let incoming = 1000; // W/m²
  let reflectedW = incoming * currentAlbedo;
  let absorbedW = incoming - reflectedW;

  noStroke();
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  let infoX = margin;
  let infoY = groundY + 15;
  text('Incoming: ' + incoming + ' W/m²', infoX, infoY);
  fill(255, 255, 255);
  stroke(0);
  strokeWeight(0.5);
  noStroke();
  fill(0);
  text('Reflected: ' + nf(reflectedW, 0, 0) + ' W/m²', infoX, infoY + 18);
  fill(180, 30, 0);
  text('Absorbed: ' + nf(absorbedW, 0, 0) + ' W/m²', infoX, infoY + 36);
  fill(0);
  text('Albedo: ' + nf(currentAlbedo, 0, 2), infoX, infoY + 54);

  // Title
  noStroke();
  fill(255);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Solar Radiation & Albedo', canvasWidth / 2, 5);

  // Climate feedback diagram
  if (feedbackCheckbox.checked()) {
    drawFeedbackDiagram(groundY);
  }

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawSurfaceDetails(name, groundY) {
  let h = drawHeight - groundY;
  noStroke();
  if (name === 'Forest') {
    // Trees
    fill(30, 100, 40);
    for (let i = 0; i < 12; i++) {
      let x = margin + i * ((canvasWidth - 2 * margin) / 12);
      let treeH = 30 + (i % 3) * 10;
      triangle(x, groundY - treeH, x - 12, groundY, x + 12, groundY);
      fill(60, 40, 20);
      rect(x - 2, groundY - 5, 4, 5);
      fill(30, 100, 40);
    }
  } else if (name === 'City') {
    fill(120, 120, 120);
    for (let i = 0; i < 8; i++) {
      let x = margin + i * ((canvasWidth - 2 * margin) / 8);
      let bH = 20 + (i * 17) % 40;
      rect(x - 8, groundY - bH, 16, bH);
    }
  } else if (name === 'Desert') {
    // Sand dunes
    fill(200, 175, 120);
    for (let i = 0; i < 5; i++) {
      let x = i * (canvasWidth / 5) + 40;
      arc(x, groundY, 100, 30, PI, TWO_PI);
    }
  } else if (name === 'Ocean') {
    // Waves
    stroke(50, 110, 180);
    strokeWeight(1.5);
    noFill();
    for (let w = 0; w < 5; w++) {
      beginShape();
      for (let x = 0; x < canvasWidth; x += 5) {
        let y = groundY + 10 + w * 12 + sin(x * 0.03 + animFrame * 0.03 + w) * 4;
        vertex(x, y);
      }
      endShape();
    }
  }
}

function drawFeedbackDiagram(groundY) {
  let cx = canvasWidth / 2;
  let cy = groundY + 40;
  let r = 35;

  fill(255, 255, 240, 220);
  stroke(0);
  strokeWeight(1);
  rect(cx - 100, cy - 45, 200, 90, 6);

  noStroke();
  fill(0);
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Ice melts', cx - 60, cy - 30);
  text('Albedo drops', cx + 50, cy - 30);
  text('More absorption', cx + 50, cy + 10);
  text('Warming', cx - 60, cy + 10);

  // Circular arrows
  stroke(200, 50, 50);
  strokeWeight(1.5);
  noFill();
  arc(cx, cy - 10, 80, 50, -PI * 0.7, -PI * 0.1);
  arc(cx, cy - 10, 80, 50, PI * 0.3, PI * 0.9);

  // Arrow tips
  fill(200, 50, 50);
  let tipAngle = -PI * 0.1;
  push();
  translate(cx + 40 * cos(tipAngle), cy - 10 + 25 * sin(tipAngle));
  rotate(tipAngle + HALF_PI);
  triangle(0, 0, -4, -6, 4, -6);
  pop();

  noStroke();
  fill(200, 50, 50);
  textSize(8);
  textAlign(CENTER, CENTER);
  text('+ Positive Feedback', cx, cy + 35);
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
