// Greenhouse Effect Energy Balance - p5.js
// CANVAS_HEIGHT: 490
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let co2Slider, methaneSlider;
let preIndBtn, currentBtn;
let animTime = 0;

// Photons for animation
let solarPhotons = [];
let irPhotons = [];
let reemitPhotons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Greenhouse effect energy balance showing radiation and temperature', LABEL);

  co2Slider = createSlider(280, 1000, 420, 10);
  co2Slider.parent(document.querySelector('main'));
  co2Slider.style('width', '140px');

  methaneSlider = createSlider(700, 5400, 1900, 100);
  methaneSlider.parent(document.querySelector('main'));
  methaneSlider.style('width', '140px');

  preIndBtn = createButton('Pre-Industrial');
  preIndBtn.parent(document.querySelector('main'));
  preIndBtn.mousePressed(function() { co2Slider.value(280); methaneSlider.value(700); });
  preIndBtn.style('font-size','12px');

  currentBtn = createButton('Current (2024)');
  currentBtn.parent(document.querySelector('main'));
  currentBtn.mousePressed(function() { co2Slider.value(420); methaneSlider.value(1900); });
  currentBtn.style('font-size','12px');

  // Initialize some photons
  for (let i = 0; i < 8; i++) {
    solarPhotons.push({ x: random(50, canvasWidth-50), y: random(-50, 0), speed: random(1.5, 3) });
  }
}

function draw() {
  updateCanvasSize();
  background(255);
  animTime += 0.03;

  let co2 = co2Slider.value();
  let ch4 = methaneSlider.value();

  // Calculate temperature (simplified model)
  // Pre-industrial baseline: 14°C at 280ppm CO2, 700ppb CH4
  let co2Forcing = 5.35 * Math.log(co2/280); // W/m²
  let ch4Forcing = 0.036 * (Math.sqrt(ch4) - Math.sqrt(700));
  let totalForcing = co2Forcing + ch4Forcing;
  let tempAnomaly = totalForcing * 0.8; // climate sensitivity ~0.8 °C per W/m²
  let surfaceTemp = 14 + tempAnomaly;

  // Absorption fraction (how much IR gets trapped)
  let absorptionFrac = constrain(0.3 + (co2-280)/2000 + (ch4-700)/15000, 0.3, 0.85);

  // Draw area
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Space (top)
  let spaceH = 50;
  fill('#0a0a2e');
  noStroke();
  rect(0, 0, canvasWidth, spaceH);

  // Sun
  fill('#FFD700'); noStroke();
  ellipse(60, 25, 35, 35);
  // Sun rays
  stroke('#FFD700'); strokeWeight(1.5);
  for (let a = 0; a < TWO_PI; a += PI/6) {
    let r1 = 20, r2 = 28;
    line(60+cos(a)*r1, 25+sin(a)*r1, 60+cos(a+animTime*0.5)*r2, 25+sin(a+animTime*0.5)*r2);
  }

  // Atmosphere layers
  let atmosTop = spaceH;
  let atmosBot = 250;
  for (let y = atmosTop; y < atmosBot; y++) {
    let t = (y - atmosTop) / (atmosBot - atmosTop);
    let alpha = map(absorptionFrac, 0.3, 0.85, 30, 80);
    let c = color(135, 206, 235, lerp(50, alpha, t));
    stroke(c); line(0, y, canvasWidth, y);
  }

  // GHG molecules in atmosphere
  let numMolecules = floor(map(co2 + ch4/3, 280+233, 1000+1800, 10, 60));
  randomSeed(42);
  for (let i = 0; i < numMolecules; i++) {
    let mx = random(10, canvasWidth-10);
    let my = random(atmosTop+20, atmosBot-20);
    let bob = sin(animTime*2 + i*0.5) * 2;

    if (i % 3 === 0) {
      // CH4 - blue-green
      fill(0, 150, 136, 150); noStroke();
      ellipse(mx, my+bob, 6, 6);
    } else {
      // CO2 - gray
      fill(120, 120, 120, 150); noStroke();
      ellipse(mx, my+bob, 5, 5);
      ellipse(mx-4, my+bob, 4, 4);
      ellipse(mx+4, my+bob, 4, 4);
    }
  }
  randomSeed(frameCount);

  // Ground
  let groundY = atmosBot;
  let groundH = drawHeight - atmosBot - 70;
  fill('#5a8a3c'); noStroke();
  rect(0, groundY, canvasWidth, groundH);

  // Some trees
  fill('#3d6b2e');
  for (let i = 0; i < 6; i++) {
    let tx = 40 + i * (canvasWidth-80)/5;
    triangle(tx, groundY-5, tx-12, groundY+15, tx+12, groundY+15);
    fill('#5a3a1e');
    rect(tx-2, groundY+15, 4, 8);
    fill('#3d6b2e');
  }

  // Solar photons (yellow, going down)
  fill('#FFD700'); noStroke();
  for (let p of solarPhotons) {
    p.y += p.speed;
    if (p.y > groundY) {
      // Reflect as IR
      irPhotons.push({ x: p.x + random(-20,20), y: groundY, speed: random(1, 2.5) });
      p.y = random(-30, -10);
      p.x = random(50, canvasWidth-50);
    }
    drawPhoton(p.x, p.y, '#FFD700', true);
  }

  // IR photons (red, going up)
  for (let i = irPhotons.length - 1; i >= 0; i--) {
    let p = irPhotons[i];
    p.y -= p.speed;

    // Check if absorbed by GHG
    if (p.y < atmosBot && p.y > atmosTop && random() < absorptionFrac * 0.03) {
      // Re-emit in random direction
      reemitPhotons.push({ x: p.x, y: p.y, vx: random(-1,1), vy: random(-1, 1.5), life: 80 });
      irPhotons.splice(i, 1);
      continue;
    }

    if (p.y < -10) { irPhotons.splice(i, 1); continue; }
    drawPhoton(p.x, p.y, '#FF4444', false);
  }

  // Re-emitted photons (orange)
  for (let i = reemitPhotons.length - 1; i >= 0; i--) {
    let p = reemitPhotons[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    if (p.life <= 0 || p.y > groundY + 20 || p.y < -10 || p.x < -10 || p.x > canvasWidth+10) {
      reemitPhotons.splice(i, 1);
      continue;
    }
    let alpha = map(p.life, 0, 80, 50, 255);
    drawPhoton(p.x, p.y, color(255, 140, 0, alpha), false);
  }

  // Temperature gauge
  let gaugeX = canvasWidth - 55;
  let gaugeT = groundY + 5;
  let gaugeH = groundH - 10;
  let gaugeW = 20;

  fill('#fff'); stroke('#264653'); strokeWeight(1);
  rect(gaugeX, gaugeT, gaugeW, gaugeH, 4);

  let tMin = 12, tMax = 22;
  let tFill = constrain(map(surfaceTemp, tMin, tMax, 0, 1), 0, 1);
  let tColor = lerpColor(color('#457b9d'), color('#e63946'), tFill);
  fill(tColor); noStroke();
  let fillH = tFill * (gaugeH - 4);
  rect(gaugeX + 2, gaugeT + gaugeH - 2 - fillH, gaugeW - 4, fillH, 2);

  // Temp label
  noStroke(); fill('#264653'); textSize(11); textAlign(CENTER, TOP);
  text(nf(surfaceTemp, 2, 1) + '°C', gaugeX + gaugeW/2, gaugeT + gaugeH + 3);
  textSize(9);
  text('Surface', gaugeX + gaugeW/2, gaugeT - 12);

  // Energy balance bar
  let ebY = drawHeight - 60;
  let incoming = 240; // W/m² (roughly)
  let outgoing = incoming * (1 - absorptionFrac * 0.3);
  let ebW = canvasWidth - 120;

  noStroke(); fill('#264653'); textSize(10); textAlign(CENTER, BOTTOM);
  text('Energy Balance (W/m²)', canvasWidth/2, ebY - 2);

  // Incoming bar
  fill('#FFD700'); noStroke();
  rect(60, ebY, ebW * (incoming/300), 12, 2);
  fill('#264653'); textSize(9); textAlign(LEFT, CENTER);
  text('In: ' + nf(incoming,1,0), 63, ebY + 6);

  // Outgoing bar
  fill('#FF4444');
  rect(60, ebY + 16, ebW * (outgoing/300), 12, 2);
  fill('#264653'); textSize(9); textAlign(LEFT, CENTER);
  text('Out: ' + nf(outgoing,1,0), 63, ebY + 22);

  if (incoming > outgoing + 1) {
    fill('#e63946'); textAlign(RIGHT, CENTER); textSize(9);
    text('Imbalance: +' + nf(incoming-outgoing,1,1) + ' W/m²', canvasWidth-30, ebY+12);
  }

  // Legend
  noStroke(); textSize(9); textAlign(LEFT, TOP);
  fill('#FFD700'); ellipse(15, ebY+5, 8, 8);
  fill('#264653'); text('Solar', 22, ebY);
  fill('#FF4444'); ellipse(15, ebY+17, 8, 8);
  fill('#264653'); text('IR out', 22, ebY+12);
  fill('#FF8C00'); ellipse(15, ebY+29, 8, 8);
  fill('#264653'); text('Re-emitted', 22, ebY+24);

  // Controls
  let ox = canvasOffsetX(), oy = canvasOffsetY();
  noStroke(); fill('#264653'); textSize(11); textAlign(LEFT, CENTER);
  text('CO₂: ' + co2 + ' ppm', 10, drawHeight + 15);
  text('CH₄: ' + ch4 + ' ppb', 10, drawHeight + 38);

  co2Slider.position(ox + 110, oy + drawHeight + 6);
  methaneSlider.position(ox + 110, oy + drawHeight + 29);
  preIndBtn.position(ox + 270, oy + drawHeight + 6);
  currentBtn.position(ox + 270, oy + drawHeight + 30);

  // Anomaly display
  textAlign(RIGHT, CENTER); fill(tempAnomaly > 0 ? '#e63946' : '#457b9d');
  text('Anomaly: ' + (tempAnomaly >= 0 ? '+' : '') + nf(tempAnomaly, 1, 2) + '°C', canvasWidth - 10, drawHeight + 55);
}

function drawPhoton(x, y, col, isSolar) {
  fill(col); noStroke();
  ellipse(x, y, 5, 5);
  if (isSolar) {
    stroke(col); strokeWeight(0.5);
    line(x, y+3, x, y+8);
  }
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
