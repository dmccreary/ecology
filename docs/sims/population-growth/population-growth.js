// Population Growth Simulator
// Exponential vs Logistic growth with interactive controls

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// Model parameters
let n0Slider, rSlider, kSlider, speedSlider;
let playBtn, resetBtn;
let expCheckbox, logCheckbox;

// Simulation state
let timeData = [];
let expData = [];
let logData = [];
let running = false;
let currentTime = 0;
let maxTime = 300;
let timeStep = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Population growth simulator comparing exponential and logistic models', LABEL);

  let yPos = drawHeight + 8;

  // Row 1: N0 and r sliders
  let labelW = 90;

  // N0 slider
  let el;
  el = createSpan('N₀:');
  el.parent(document.querySelector('main'));
  el.position(10, yPos + 4);
  el.style('font-size', '14px');
  n0Slider = createSlider(1, 100, 10, 1);
  n0Slider.parent(document.querySelector('main'));
  n0Slider.position(35, yPos);
  n0Slider.size(100);

  el = createSpan('r:');
  el.parent(document.querySelector('main'));
  el.position(150, yPos + 4);
  el.style('font-size', '14px');
  rSlider = createSlider(0.01, 1.0, 0.1, 0.01);
  rSlider.parent(document.querySelector('main'));
  rSlider.position(165, yPos);
  rSlider.size(100);

  el = createSpan('K:');
  el.parent(document.querySelector('main'));
  el.position(280, yPos + 4);
  el.style('font-size', '14px');
  kSlider = createSlider(100, 10000, 1000, 100);
  kSlider.parent(document.querySelector('main'));
  kSlider.position(298, yPos);
  kSlider.size(100);

  yPos += 30;

  // Row 2: checkboxes and buttons
  expCheckbox = createCheckbox('Exponential', true);
  expCheckbox.parent(document.querySelector('main'));
  expCheckbox.position(10, yPos);
  expCheckbox.style('font-size', '14px');
  expCheckbox.style('color', 'red');

  logCheckbox = createCheckbox('Logistic', true);
  logCheckbox.parent(document.querySelector('main'));
  logCheckbox.position(130, yPos);
  logCheckbox.style('font-size', '14px');
  logCheckbox.style('color', 'green');

  playBtn = createButton('Play');
  playBtn.parent(document.querySelector('main'));
  playBtn.position(240, yPos);
  playBtn.mousePressed(togglePlay);

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.position(300, yPos);
  resetBtn.mousePressed(resetSim);

  yPos += 30;

  el = createSpan('Speed:');
  el.parent(document.querySelector('main'));
  el.position(10, yPos + 4);
  el.style('font-size', '14px');
  speedSlider = createSlider(1, 10, 3, 1);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.position(60, yPos);
  speedSlider.size(100);

  resetSim();
}

function togglePlay() {
  running = !running;
  playBtn.html(running ? 'Pause' : 'Play');
}

function resetSim() {
  running = false;
  playBtn.html('Play');
  currentTime = 0;
  timeData = [0];
  let n0 = n0Slider.value();
  expData = [n0];
  logData = [n0];
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update simulation
  if (running) {
    let speed = speedSlider.value();
    for (let s = 0; s < speed; s++) {
      if (currentTime < maxTime) {
        currentTime++;
        let r = rSlider.value();
        let K = kSlider.value();
        let prevExp = expData[expData.length - 1];
        let prevLog = logData[logData.length - 1];

        // Exponential: N(t+1) = N(t) + r * N(t)
        let newExp = prevExp + r * prevExp;
        newExp = min(newExp, K * 5); // cap for display

        // Logistic: N(t+1) = N(t) + r * N(t) * (1 - N(t)/K)
        let newLog = prevLog + r * prevLog * (1 - prevLog / K);
        newLog = max(0, newLog);

        timeData.push(currentTime);
        expData.push(newExp);
        logData.push(newLog);
      }
    }
  }

  // Graph parameters
  let gLeft = margin + 40;
  let gRight = canvasWidth - margin;
  let gTop = margin + 10;
  let gBottom = drawHeight - margin;
  let gWidth = gRight - gLeft;
  let gHeight = gBottom - gTop;

  let K = kSlider.value();

  // Determine y-axis max
  let yMax = K * 1.2;
  if (expCheckbox.checked()) {
    let maxExp = max(expData);
    yMax = max(yMax, maxExp * 1.1);
  }
  yMax = max(yMax, 100);

  // Draw axes
  stroke(0);
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Y-axis labels
  noStroke();
  fill(0);
  textSize(11);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let val = (yMax / 4) * i;
    let y = map(val, 0, yMax, gBottom, gTop);
    text(nf(val, 0, 0), gLeft - 5, y);
    stroke(220);
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
    noStroke();
  }

  // X-axis labels
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 5; i++) {
    let t = (maxTime / 5) * i;
    let x = map(t, 0, maxTime, gLeft, gRight);
    text(nf(t, 0, 0), x, gBottom + 5);
  }

  // Axis titles
  textSize(13);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Time', (gLeft + gRight) / 2, gBottom + 22);

  push();
  translate(15, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  text('Population (N)', 0, 0);
  pop();

  // Draw K line (dashed)
  if (logCheckbox.checked()) {
    stroke(0, 150, 0, 120);
    strokeWeight(1);
    let kY = map(K, 0, yMax, gBottom, gTop);
    if (kY >= gTop) {
      drawingContext.setLineDash([5, 5]);
      line(gLeft, kY, gRight, kY);
      drawingContext.setLineDash([]);
      noStroke();
      fill(0, 150, 0);
      textSize(11);
      textAlign(LEFT, BOTTOM);
      text('K=' + K, gRight - 60, kY - 3);
    }
  }

  // Draw curves
  noFill();
  let dataLen = timeData.length;

  if (expCheckbox.checked() && dataLen > 1) {
    stroke(220, 50, 50);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < dataLen; i++) {
      let x = map(timeData[i], 0, maxTime, gLeft, gRight);
      let y = map(expData[i], 0, yMax, gBottom, gTop);
      y = max(gTop, y);
      vertex(x, y);
    }
    endShape();
  }

  if (logCheckbox.checked() && dataLen > 1) {
    stroke(50, 180, 50);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < dataLen; i++) {
      let x = map(timeData[i], 0, maxTime, gLeft, gRight);
      let y = map(logData[i], 0, yMax, gBottom, gTop);
      y = max(gTop, y);
      vertex(x, y);
    }
    endShape();

    // Inflection point at K/2
    let kHalf = K / 2;
    // Find the time step closest to K/2
    for (let i = 1; i < dataLen; i++) {
      if (logData[i - 1] < kHalf && logData[i] >= kHalf) {
        let x = map(timeData[i], 0, maxTime, gLeft, gRight);
        let y = map(kHalf, 0, yMax, gBottom, gTop);
        if (y >= gTop && y <= gBottom) {
          fill(50, 180, 50);
          noStroke();
          ellipse(x, y, 8, 8);
          textSize(10);
          textAlign(LEFT, BOTTOM);
          text('K/2', x + 5, y - 3);
        }
        break;
      }
    }
  }

  // Title
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Population Growth Simulator', canvasWidth / 2, 5);

  // Current values display
  if (dataLen > 0) {
    let curExp = expData[dataLen - 1];
    let curLog = logData[dataLen - 1];
    textSize(12);
    textAlign(LEFT, TOP);
    let infoY = gTop;
    let infoX = gLeft + 10;

    fill(0);
    text('t = ' + currentTime, infoX, infoY);
    if (expCheckbox.checked()) {
      fill(220, 50, 50);
      noStroke();
      text('N(exp) = ' + nf(curExp, 0, 1), infoX, infoY + 15);
    }
    if (logCheckbox.checked()) {
      fill(50, 180, 50);
      noStroke();
      let r = rSlider.value();
      let dndt = r * curLog * (1 - curLog / K);
      text('N(log) = ' + nf(curLog, 0, 1) + '  dN/dt = ' + nf(dndt, 0, 2), infoX, infoY + 30);
    }
  }

  // Slider value labels in draw area top-right
  noStroke();
  fill(80);
  textSize(11);
  textAlign(RIGHT, TOP);
  text('N₀=' + n0Slider.value() + '  r=' + nf(rSlider.value(), 0, 2) + '  K=' + kSlider.value(), gRight, gTop);
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
