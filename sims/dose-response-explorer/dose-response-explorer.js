// Interactive Dose-Response Curve Explorer MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let substanceSelect;
let steepnessSlider, thresholdSlider;
let modeCheckbox;
let doseMarkerX = 0.5; // fraction across the graph
let dragging = false;

let substances = {
  'DDT': { ld50: 87, steep: 2.5 },
  'Caffeine': { ld50: 192, steep: 3.0 },
  'Nicotine': { ld50: 50, steep: 2.8 },
  'Aspirin': { ld50: 200, steep: 2.0 },
  'Table Salt': { ld50: 3000, steep: 1.5 },
  'Ethanol': { ld50: 7060, steep: 1.8 }
};

let graphLeft, graphTop, graphWidth, graphHeight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Interactive dose-response curve explorer showing LD50 values for various substances', LABEL);

  substanceSelect = createSelect();
  substanceSelect.parent(document.querySelector('main'));
  for (let s in substances) {
    substanceSelect.option(s);
  }
  substanceSelect.selected('DDT');

  modeCheckbox = createCheckbox('Threshold Mode', false);
  modeCheckbox.parent(document.querySelector('main'));
  modeCheckbox.style('font-size', '13px');

  steepnessSlider = createSlider(0.5, 5, 2.5, 0.1);
  steepnessSlider.parent(document.querySelector('main'));
  steepnessSlider.style('width', '110px');

  thresholdSlider = createSlider(1, 4, 2.5, 0.1);
  thresholdSlider.parent(document.querySelector('main'));
  thresholdSlider.style('width', '110px');
}

function draw() {
  updateCanvasSize();

  graphLeft = margin + 45;
  graphTop = 40;
  graphWidth = canvasWidth - graphLeft - margin;
  graphHeight = drawHeight - graphTop - 50;

  let substance = substanceSelect.value();
  let subData = substances[substance];
  let thresholdMode = modeCheckbox.checked();
  let steepness = steepnessSlider.value();
  let thresholdPos = thresholdSlider.value(); // log10 scale position

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('Dose-Response Curve: ' + substance, canvasWidth / 2, 8);

  // Graph background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Grid lines
  stroke(230);
  strokeWeight(0.5);
  for (let i = 0; i <= 10; i++) {
    let y = graphTop + (i / 10) * graphHeight;
    line(graphLeft, y, graphLeft + graphWidth, y);
  }
  for (let i = 0; i <= 5; i++) {
    let x = graphLeft + (i / 5) * graphWidth;
    line(x, graphTop, x, graphTop + graphHeight);
  }

  // Axis labels
  noStroke();
  fill(80);
  textSize(11);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 10; i += 2) {
    let y = graphTop + graphHeight - (i / 10) * graphHeight;
    text(i * 10 + '%', graphLeft - 5, y);
  }

  // X-axis: log scale from 0.1 to 10000
  textAlign(CENTER, TOP);
  let logMin = -1;
  let logMax = 4;
  for (let p = logMin; p <= logMax; p++) {
    let x = graphLeft + ((p - logMin) / (logMax - logMin)) * graphWidth;
    text(pow(10, p).toFixed(p < 0 ? 1 : 0), x, graphTop + graphHeight + 5);
  }

  textSize(12);
  textAlign(CENTER, TOP);
  text('Dose (mg/kg)', canvasWidth / 2, graphTop + graphHeight + 22);

  push();
  translate(15, graphTop + graphHeight / 2);
  rotate(-PI / 2);
  textAlign(CENTER, BOTTOM);
  textSize(12);
  fill(80);
  text('% Response', 0, 0);
  pop();

  // LD50 horizontal dashed line at 50%
  let ld50Y = graphTop + graphHeight / 2;
  stroke(255, 0, 0, 150);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(graphLeft, ld50Y, graphLeft + graphWidth, ld50Y);
  drawingContext.setLineDash([]);
  noStroke();
  fill(255, 0, 0, 180);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text('LD50 (50%)', graphLeft + 5, ld50Y - 2);

  // Draw the curve
  noFill();
  stroke(30, 60, 160);
  strokeWeight(2.5);
  beginShape();
  for (let px = 0; px <= graphWidth; px++) {
    let frac = px / graphWidth;
    let logDose = logMin + frac * (logMax - logMin);
    let response;

    if (thresholdMode) {
      // Threshold curve: flat then sharp rise
      let diff = logDose - thresholdPos;
      if (diff < 0) {
        response = 0;
      } else {
        response = 1 - exp(-steepness * diff * 2);
      }
    } else {
      // Sigmoid (logistic) curve
      let logLD50 = log(subData.ld50) / log(10);
      response = 1 / (1 + pow(10, -steepness * (logDose - logLD50)));
    }

    let y = graphTop + graphHeight - response * graphHeight;
    vertex(graphLeft + px, y);
  }
  endShape();

  // LD50 vertical marker (only in normal mode)
  if (!thresholdMode) {
    let logLD50 = log(subData.ld50) / log(10);
    let ld50X = graphLeft + ((logLD50 - logMin) / (logMax - logMin)) * graphWidth;
    if (ld50X > graphLeft && ld50X < graphLeft + graphWidth) {
      stroke(255, 0, 0, 120);
      strokeWeight(1);
      drawingContext.setLineDash([3, 3]);
      line(ld50X, graphTop, ld50X, graphTop + graphHeight);
      drawingContext.setLineDash([]);
      noStroke();
      fill(255, 0, 0);
      textSize(10);
      textAlign(CENTER, TOP);
      text('LD50=' + subData.ld50, ld50X, graphTop + graphHeight + 5);
    }
  }

  // Threshold region shading
  if (thresholdMode) {
    let threshX = graphLeft + ((thresholdPos - logMin) / (logMax - logMin)) * graphWidth;
    fill(255, 255, 200, 80);
    noStroke();
    rect(graphLeft, graphTop, threshX - graphLeft, graphHeight);
    stroke(200, 180, 0);
    strokeWeight(1.5);
    line(threshX, graphTop, threshX, graphTop + graphHeight);
    noStroke();
    fill(180, 150, 0);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Threshold', threshX, graphTop - 2);
  }

  // Draggable dose marker
  let markerLogDose = logMin + doseMarkerX * (logMax - logMin);
  let markerPx = graphLeft + doseMarkerX * graphWidth;
  let markerResponse;

  if (thresholdMode) {
    let diff = markerLogDose - thresholdPos;
    markerResponse = diff < 0 ? 0 : 1 - exp(-steepness * diff * 2);
  } else {
    let logLD50 = log(subData.ld50) / log(10);
    markerResponse = 1 / (1 + pow(10, -steepness * (markerLogDose - logLD50)));
  }

  let markerY = graphTop + graphHeight - markerResponse * graphHeight;
  stroke(0, 180, 0, 180);
  strokeWeight(1.5);
  line(markerPx, graphTop, markerPx, graphTop + graphHeight);
  fill(0, 180, 0);
  noStroke();
  ellipse(markerPx, markerY, 10, 10);

  // Readout
  let doseVal = pow(10, markerLogDose);
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  let readoutX = markerPx + 12;
  if (readoutX + 120 > canvasWidth) readoutX = markerPx - 130;
  text('Dose: ' + nf(doseVal, 1, 1) + ' mg/kg', readoutX, markerY - 20);
  text('Response: ' + nf(markerResponse * 100, 1, 1) + '%', readoutX, markerY - 5);

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Substance:', 10, drawHeight + 18);
  substanceSelect.position(90, drawHeight + 8);

  modeCheckbox.position(250, drawHeight + 8);

  text('Steepness: ' + nf(steepness, 1, 1), 10, drawHeight + 50);
  steepnessSlider.position(sliderLeftMargin, drawHeight + 42);

  let threshLabel = 'Threshold: 10^' + nf(thresholdSlider.value(), 1, 1);
  text(threshLabel, canvasWidth / 2, drawHeight + 50);
  thresholdSlider.position(canvasWidth / 2 + sliderLeftMargin - 100, drawHeight + 42);
}

function mousePressed() {
  if (mouseX > graphLeft && mouseX < graphLeft + graphWidth &&
      mouseY > graphTop && mouseY < graphTop + graphHeight) {
    dragging = true;
    doseMarkerX = constrain((mouseX - graphLeft) / graphWidth, 0, 1);
  }
}

function mouseDragged() {
  if (dragging) {
    doseMarkerX = constrain((mouseX - graphLeft) / graphWidth, 0, 1);
  }
}

function mouseReleased() {
  dragging = false;
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
