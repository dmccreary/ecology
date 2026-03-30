// Thermal Inversion Simulator
// CANVAS_HEIGHT: 505
let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let emissionSlider;
let modeBtn;
let inversionMode = false;
let paused = true;
let pauseBtn;
let particles = [];
let frameCounter = 0;
let hoursElapsed = 0;

// AQI thresholds
function getAQIColor(conc) {
  if (conc < 20) return color(0, 180, 0);     // Good - green
  if (conc < 40) return color(220, 200, 0);    // Moderate - yellow
  if (conc < 60) return color(255, 150, 0);    // Unhealthy sensitive - orange
  if (conc < 80) return color(220, 40, 40);    // Unhealthy - red
  return color(140, 50, 160);                    // Very unhealthy - purple
}

function getAQILabel(conc) {
  if (conc < 20) return 'Good';
  if (conc < 40) return 'Moderate';
  if (conc < 60) return 'Unhealthy (Sens.)';
  if (conc < 80) return 'Unhealthy';
  return 'Very Unhealthy';
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Thermal inversion simulator comparing normal atmospheric conditions to inversion layer trapping pollutants.', LABEL);

  pauseBtn = createButton('▶ Play');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.position(10, drawHeight + 5);
  pauseBtn.mousePressed(() => { paused = !paused; pauseBtn.html(paused ? '▶ Play' : '❚❚ Pause'); });

  modeBtn = createButton('Show Inversion');
  modeBtn.parent(document.querySelector('main'));
  modeBtn.position(90, drawHeight + 5);
  modeBtn.mousePressed(() => {
    inversionMode = !inversionMode;
    modeBtn.html(inversionMode ? 'Show Normal' : 'Show Inversion');
    particles = [];
    hoursElapsed = 0;
  });

  emissionSlider = createSlider(1, 5, 3, 1);
  emissionSlider.parent(document.querySelector('main'));
  emissionSlider.position(sliderLeftMargin + 120, drawHeight + 5);
  emissionSlider.size(canvasWidth - sliderLeftMargin - 120 - margin);
}

function draw() {
  updateCanvasSize();
  frameCounter++;

  let panelW = (canvasWidth - 30) / 2;
  let panelH = drawHeight - 10;
  let groundLevel = drawHeight - 60;
  let inversionLayerY = drawHeight * 0.35;

  // Background
  background(240);

  // Draw both panels
  for (let panel = 0; panel < 2; panel++) {
    let px = 10 + panel * (panelW + 10);
    let isInversion = panel === 1;

    // Sky gradient
    for (let y = 5; y < groundLevel; y++) {
      let inter = map(y, 5, groundLevel, 0, 1);
      let c;
      if (isInversion) {
        c = lerpColor(color(100, 150, 200), color(180, 175, 160), inter);
      } else {
        c = lerpColor(color(135, 200, 250), color(200, 230, 255), inter);
      }
      stroke(c);
      line(px, y, px + panelW, y);
    }

    // Inversion layer
    if (isInversion) {
      noStroke();
      fill(200, 160, 100, 60);
      rect(px, inversionLayerY - 10, panelW, 25);
      fill(0, 0, 0, 100);
      textSize(9);
      noStroke();
      textAlign(CENTER);
      text('— Warm Inversion Layer —', px + panelW / 2, inversionLayerY + 3);
    }

    // Ground
    noStroke();
    fill(100, 140, 80);
    rect(px, groundLevel, panelW, drawHeight - groundLevel);

    // Buildings and sources
    fill(120, 120, 130);
    noStroke();
    // Factory
    rect(px + panelW * 0.15, groundLevel - 40, 25, 40);
    rect(px + panelW * 0.15 + 5, groundLevel - 55, 8, 15);
    // Cars
    fill(80, 80, 90);
    rect(px + panelW * 0.5, groundLevel - 12, 20, 12);
    rect(px + panelW * 0.7, groundLevel - 12, 20, 12);

    // Temperature profile graph on the side
    let graphX = px + panelW - 40;
    stroke(0, 0, 0, 60);
    strokeWeight(1);
    line(graphX, 15, graphX, groundLevel - 5);
    // Temperature line
    stroke(220, 50, 50);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let y = 15; y < groundLevel; y += 5) {
      let t;
      if (isInversion) {
        // Inversion: temp increases then decreases at inversion layer
        if (y > inversionLayerY) {
          t = map(y, groundLevel, inversionLayerY, 30, 20);
        } else {
          t = map(y, inversionLayerY, 15, 25, 10);
        }
      } else {
        // Normal: temp decreases with altitude
        t = map(y, groundLevel, 15, 30, 5);
      }
      vertex(graphX + t * 0.8, y);
    }
    endShape();
    strokeWeight(1);

    // Labels
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, TOP);
    text(isInversion ? 'Inversion' : 'Normal', px + panelW / 2, 8);

    // Panel border
    noFill();
    stroke(150);
    strokeWeight(1);
    rect(px, 5, panelW, panelH - 10, 4);
  }

  // Emit particles
  if (!paused && frameCounter % max(2, 8 - emissionSlider.value()) === 0) {
    for (let panel = 0; panel < 2; panel++) {
      let px = 10 + panel * (panelW + 10);
      let isInversion = panel === 1;
      let rate = emissionSlider.value();
      for (let i = 0; i < rate; i++) {
        // From factory
        particles.push({
          x: px + panelW * 0.15 + 9 + random(-3, 3),
          y: groundLevel - 55,
          vx: random(-0.5, 0.5),
          vy: random(-1.5, -0.5),
          panel: panel,
          life: 500,
          isInv: isInversion
        });
        // From cars
        if (random() < 0.5) {
          particles.push({
            x: px + panelW * 0.6 + random(-10, 10),
            y: groundLevel - 14,
            vx: random(-0.3, 0.3),
            vy: random(-1.0, -0.3),
            panel: panel,
            life: 500,
            isInv: isInversion
          });
        }
      }
    }
  }

  // Update and draw particles
  let concNormal = 0;
  let concInversion = 0;
  noStroke();
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (!paused) {
      p.x += p.vx + random(-0.2, 0.2);
      p.y += p.vy;
      p.life--;

      if (p.isInv) {
        // Inversion: bounce off inversion layer
        if (p.y < inversionLayerY) {
          p.y = inversionLayerY + random(0, 5);
          p.vy = abs(p.vy) * 0.3;
          p.vx += random(-0.5, 0.5);
        }
      } else {
        // Normal: particles continue rising and dispersing
        p.vx += random(-0.1, 0.1);
      }

      // Bounce off ground
      if (p.y > groundLevel - 5) {
        p.y = groundLevel - 5;
        p.vy = -abs(p.vy) * 0.5;
      }
    }

    let alpha = map(p.life, 0, 100, 0, 160);
    fill(130, 110, 90, alpha);
    ellipse(p.x, p.y, 5, 5);

    // Count concentration near ground
    if (p.y > groundLevel - 80) {
      if (p.panel === 0) concNormal++;
      else concInversion++;
    }

    if (p.life <= 0 || p.y < -10) particles.splice(i, 1);
  }

  // Cap particles
  if (particles.length > 800) particles.splice(0, 100);

  // AQI meters below panels
  for (let panel = 0; panel < 2; panel++) {
    let px = 10 + panel * (panelW + 10);
    let conc = panel === 0 ? concNormal : concInversion;
    let aqiC = getAQIColor(conc);
    let meterY = drawHeight - 28;

    noStroke();
    fill(230);
    rect(px + 5, meterY, panelW - 10, 18, 4);
    fill(aqiC);
    let barW = map(min(conc, 100), 0, 100, 0, panelW - 12);
    rect(px + 6, meterY + 1, barW, 16, 3);
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(getAQILabel(conc), px + panelW / 2, meterY + 9);
  }

  // Hours counter
  if (!paused && frameCounter % 60 === 0) hoursElapsed++;
  noStroke();
  fill(0);
  textSize(11);
  textAlign(CENTER);
  text('Hours: ' + hoursElapsed, canvasWidth / 2, drawHeight - 42);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  fill(0);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Emissions: ' + emissionSlider.value(), 230, drawHeight + 16);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  emissionSlider.size(canvasWidth - sliderLeftMargin - 120 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
