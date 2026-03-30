// Tipping Points Explorer - p5.js
// CANVAS_HEIGHT: 510
let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let tempSlider;
let resetBtn;
let selectedElement = 0;

let tippingElements = [
  { name:'Greenland Ice Sheet', threshold:1.5, color:'#457b9d',
    before:'Massive ice sheet covering Greenland, reflecting sunlight',
    after:'Irreversible melting: 7m sea level rise over centuries',
    icon:'ice' },
  { name:'Amazon Rainforest', threshold:2.0, color:'#2a9d8f',
    before:'World\'s largest tropical rainforest, a major carbon sink',
    after:'Dieback to savanna: releases stored carbon, loses biodiversity',
    icon:'tree' },
  { name:'West Antarctic Ice', threshold:2.5, color:'#264653',
    before:'Massive ice sheet grounded below sea level',
    after:'Marine ice sheet instability: 3-5m sea level rise',
    icon:'ice' },
  { name:'Coral Reefs', threshold:1.5, color:'#f4a261',
    before:'Thriving coral ecosystems supporting 25% of marine species',
    after:'Mass bleaching and death: 70-90% of reefs lost',
    icon:'coral' },
  { name:'Arctic Summer Ice', threshold:2.0, color:'#a8dadc',
    before:'Seasonal ice cover reflecting solar radiation',
    after:'Ice-free summers: accelerated Arctic warming',
    icon:'ice' },
  { name:'Permafrost', threshold:3.0, color:'#8B6914',
    before:'Frozen ground storing 1,500 Gt of carbon',
    after:'Thawing releases methane and CO₂, accelerating warming',
    icon:'perm' }
];

let maxTemp = 0; // tracks highest temp reached (for hysteresis)
let tippedStates = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Tipping points explorer showing climate stability landscape', LABEL);

  tempSlider = createSlider(0, 50, 0, 1); // 0.0 to 5.0°C in 0.1 steps
  tempSlider.parent(document.querySelector('main'));
  tempSlider.style('width', '200px');

  resetBtn = createButton('Reset to Pre-Industrial');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(function() {
    tempSlider.value(0);
    maxTemp = 0;
    tippedStates = {};
  });
  resetBtn.style('font-size','12px');

  // Element selector buttons created as p5 buttons
  for (let i = 0; i < tippingElements.length; i++) {
    tippingElements[i].btn = createButton(tippingElements[i].name);
    tippingElements[i].btn.parent(document.querySelector('main'));
    tippingElements[i].btn.style('font-size','10px');
    tippingElements[i].btn.style('padding','2px 6px');
    tippingElements[i].btn.mousePressed(function() { selectedElement = i; });
  }
}

function draw() {
  updateCanvasSize();
  background(255);

  let temp = tempSlider.value() / 10; // 0.0 to 5.0

  // Track maximum temperature (for hysteresis)
  if (temp > maxTemp) maxTemp = temp;

  // Update tipped states
  for (let i = 0; i < tippingElements.length; i++) {
    if (maxTemp >= tippingElements[i].threshold) {
      tippedStates[i] = true;
    }
  }

  // Draw area
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('#264653'); textSize(14); textAlign(CENTER, TOP);
  text('Tipping Points Explorer', canvasWidth/2, 5);

  // Temperature thermometer (left side)
  let thermoX = 30, thermoY = 35, thermoH = 200, thermoW = 25;
  fill('#fff'); stroke('#264653'); strokeWeight(1);
  rect(thermoX, thermoY, thermoW, thermoH, 4);

  // Fill based on temp
  let fillFrac = temp / 5.0;
  let fillH = fillFrac * (thermoH - 4);
  let tColor = lerpColor(color('#2a9d8f'), color('#e63946'), fillFrac);
  noStroke(); fill(tColor);
  rect(thermoX + 2, thermoY + thermoH - 2 - fillH, thermoW - 4, fillH, 2);

  // Temp scale
  noStroke(); fill('#264653'); textSize(9); textAlign(RIGHT, CENTER);
  for (let t = 0; t <= 5; t++) {
    let y = thermoY + thermoH - (t/5) * thermoH;
    text(t + '°C', thermoX - 4, y);
    stroke('#ccc'); strokeWeight(0.5);
    line(thermoX, y, thermoX + thermoW, y);
    noStroke();
  }

  // Tipping point markers on thermometer
  for (let i = 0; i < tippingElements.length; i++) {
    let te = tippingElements[i];
    let y = thermoY + thermoH - (te.threshold/5) * thermoH;
    let tipped = tippedStates[i] || false;

    stroke(te.color); strokeWeight(2);
    line(thermoX + thermoW, y, thermoX + thermoW + 8, y);
    noStroke();
    fill(tipped ? '#e63946' : te.color);
    ellipse(thermoX + thermoW + 14, y, 8, 8);
  }

  // Current temp display
  noStroke(); fill('#264653'); textSize(16); textAlign(CENTER, TOP);
  text('+' + nf(temp, 1, 1) + '°C', thermoX + thermoW/2, thermoY + thermoH + 8);
  textSize(9); fill('#6c757d');
  text('above pre-industrial', thermoX + thermoW/2, thermoY + thermoH + 26);

  // Stability landscape (main visualization)
  let lsL = 80, lsR = canvasWidth - 20;
  let lsT = 35, lsB = 200;
  let lsW = lsR - lsL, lsH = lsB - lsT;

  let sel = tippingElements[selectedElement];
  let relTemp = temp / sel.threshold; // how close to tipping
  let hasTipped = tippedStates[selectedElement] || false;

  // Draw landscape curve
  stroke('#264653'); strokeWeight(2); noFill();
  beginShape();
  for (let x = 0; x <= lsW; x += 2) {
    let nx = x / lsW; // 0 to 1

    let y;
    if (!hasTipped) {
      // Valley gets shallower as temp approaches threshold
      let depth = lerp(0.8, 0.0, constrain(relTemp, 0, 1));
      y = depth * sin(nx * PI) * lsH * 0.4;
      y = lsB - 30 - y - (nx < 0.5 ? 0 : (nx-0.5)*lsH*0.3);
    } else {
      // Tipped: new deeper valley on right
      let v1 = sin(nx * PI * 0.5) * lsH * 0.1; // shallow old valley
      let v2 = sin((nx-0.6) * PI / 0.4) * lsH * 0.5; // deep new valley
      if (nx < 0.4) y = lsB - 30 - v1;
      else if (nx < 0.6) y = lsB - 30 - lerp(v1, 0, (nx-0.4)/0.2);
      else y = lsB - 30 - v2;
    }

    // Color gradient from green to red
    let gradColor = lerpColor(color('#2a9d8f'), color('#e63946'), constrain(relTemp, 0, 1));
    stroke(gradColor);
    vertex(lsL + x, y);
  }
  endShape();

  // Ball position
  let ballX, ballY;
  if (!hasTipped) {
    ballX = lsL + lsW * 0.25; // in the left valley
    let depth = lerp(0.8, 0.0, constrain(relTemp, 0, 1));
    ballY = lsB - 30 - depth * sin(0.25 * PI) * lsH * 0.4;
  } else {
    ballX = lsL + lsW * 0.8; // rolled to new state
    ballY = lsB - 30 - sin((0.8-0.6)*PI/0.4) * lsH * 0.5;
  }

  // Draw ball
  fill(hasTipped ? '#e63946' : '#2a9d8f');
  stroke('#264653'); strokeWeight(1.5);
  ellipse(ballX, ballY - 8, 18, 18);

  // Label
  noStroke(); fill('#264653'); textSize(11); textAlign(CENTER, TOP);
  text(sel.name + ' — Stability Landscape', lsL + lsW/2, lsT - 2);
  textSize(9); fill('#6c757d'); textAlign(LEFT, TOP);
  text('Threshold: ' + sel.threshold + '°C', lsL, lsB + 2);
  textAlign(RIGHT, TOP);
  text(hasTipped ? 'TIPPED — Hysteresis active' : 'Stable — ' + nf(constrain(relTemp*100,0,100),1,0) + '% to threshold', lsR, lsB + 2);

  // Before/After panels
  let panelY = 220;
  let panelW = (canvasWidth - 90) / 2;

  // Before
  fill(hasTipped ? '#f0f0f0' : '#e8f5e9'); stroke(hasTipped ? '#ccc' : '#2a9d8f'); strokeWeight(1);
  rect(70, panelY, panelW, 60, 6);
  noStroke(); fill(hasTipped ? '#999' : '#264653'); textSize(10); textAlign(CENTER, TOP);
  text('BEFORE', 70 + panelW/2, panelY + 4);
  textSize(9); textAlign(LEFT, TOP);
  text(sel.before, 78, panelY + 18, panelW - 16, 40);

  // After
  fill(hasTipped ? '#fde8e8' : '#f0f0f0'); stroke(hasTipped ? '#e63946' : '#ccc'); strokeWeight(1);
  rect(80 + panelW, panelY, panelW, 60, 6);
  noStroke(); fill(hasTipped ? '#e63946' : '#999'); textSize(10); textAlign(CENTER, TOP);
  text('AFTER', 80 + panelW + panelW/2, panelY + 4);
  textSize(9); textAlign(LEFT, TOP);
  text(sel.after, 88 + panelW, panelY + 18, panelW - 16, 40);

  // Timeline of tipping elements along bottom
  let tlY = 300;
  noStroke(); fill('#264653'); textSize(11); textAlign(CENTER, TOP);
  text('Tipping Elements Timeline', canvasWidth/2, tlY);

  let tlBarL = 70, tlBarR = canvasWidth - 20;
  let tlBarW = tlBarR - tlBarL;
  let tlBarY = tlY + 20;

  // Temperature scale bar
  for (let x = tlBarL; x < tlBarR; x++) {
    let t = (x - tlBarL) / tlBarW;
    let c = lerpColor(color('#2a9d8f'), color('#e63946'), t);
    stroke(c); line(x, tlBarY, x, tlBarY + 12);
  }

  // Scale labels
  noStroke(); fill('#264653'); textSize(8); textAlign(CENTER, TOP);
  for (let t = 0; t <= 5; t++) {
    let x = tlBarL + (t/5) * tlBarW;
    text(t + '°C', x, tlBarY + 15);
  }

  // Current temp marker
  let ctX = tlBarL + (temp/5) * tlBarW;
  stroke('#264653'); strokeWeight(2);
  line(ctX, tlBarY - 3, ctX, tlBarY + 12);
  fill('#264653'); noStroke();
  triangle(ctX-4, tlBarY-3, ctX+4, tlBarY-3, ctX, tlBarY-8);

  // Tipping element markers
  for (let i = 0; i < tippingElements.length; i++) {
    let te = tippingElements[i];
    let x = tlBarL + (te.threshold/5) * tlBarW;
    let tipped = tippedStates[i] || false;

    // Marker
    fill(tipped ? '#e63946' : te.color);
    stroke(i === selectedElement ? '#264653' : 'transparent');
    strokeWeight(i === selectedElement ? 2 : 0);
    ellipse(x, tlBarY + 35, 12, 12);

    // Label
    noStroke(); fill('#264653'); textSize(7);
    push();
    translate(x, tlBarY + 46);
    rotate(QUARTER_PI);
    textAlign(LEFT, CENTER);
    text(te.name, 0, 0);
    pop();
  }

  // Hysteresis indicator
  if (maxTemp > temp && Object.keys(tippedStates).length > 0) {
    fill('#e76f51'); noStroke(); textSize(10); textAlign(CENTER, TOP);
    text('Hysteresis: Some tipping points remain crossed even as temperature decreases', canvasWidth/2, 410);
  }

  // Count tipped
  let tippedCount = Object.keys(tippedStates).length;
  noStroke(); fill('#264653'); textSize(11); textAlign(CENTER, TOP);
  text('Tipped: ' + tippedCount + '/' + tippingElements.length, canvasWidth/2, drawHeight - 30);

  // Position controls
  let ox = canvasOffsetX(), oy = canvasOffsetY();
  noStroke(); fill('#264653'); textSize(12); textAlign(LEFT, CENTER);
  text('Temperature: +' + nf(temp,1,1) + '°C', 10, drawHeight + 15);
  tempSlider.position(ox + 140, oy + drawHeight + 6);
  resetBtn.position(ox + 360, oy + drawHeight + 6);

  // Position element selector buttons
  for (let i = 0; i < tippingElements.length; i++) {
    tippingElements[i].btn.position(ox + 10 + i * (canvasWidth/6), oy + drawHeight + 30);
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
