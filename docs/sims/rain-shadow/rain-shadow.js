// Rain Shadow Effect Visualizer
// Animated air flow over a mountain with temperature and humidity changes

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let heightSlider;
let exampleSelect;
let airParcels = [];
let raindrops = [];
let animFrame = 0;

const realExamples = {
  'Custom': { height: 2000 },
  'Cascades (WA)': { height: 3000 },
  'Sierra Nevada (CA)': { height: 4000 },
  'Himalayas': { height: 5000 },
  'Andes': { height: 4500 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Rain shadow effect visualizer showing how mountains create wet and dry climate zones', LABEL);

  let el;
  let yPos = drawHeight + 8;

  el = createSpan('Mountain Height:');
  el.parent(document.querySelector('main'));
  el.position(10, yPos + 4);
  el.style('font-size', '13px');
  heightSlider = createSlider(500, 5000, 2000, 100);
  heightSlider.parent(document.querySelector('main'));
  heightSlider.position(125, yPos);
  heightSlider.size(100);

  exampleSelect = createSelect();
  exampleSelect.parent(document.querySelector('main'));
  exampleSelect.position(245, yPos);
  for (let name of Object.keys(realExamples)) {
    exampleSelect.option(name);
  }
  exampleSelect.changed(() => {
    let ex = realExamples[exampleSelect.value()];
    if (ex && exampleSelect.value() !== 'Custom') {
      heightSlider.value(ex.height);
    }
  });

  yPos += 26;

  // Initialize air parcels
  for (let i = 0; i < 12; i++) {
    airParcels.push({
      x: random(-50, canvasWidth + 50),
      phase: random(TWO_PI),
      speed: random(0.8, 1.5)
    });
  }
}

function getMountainY(x, peakH, baseY) {
  // Mountain shape as a smooth curve
  let cx = canvasWidth * 0.5;
  let mtnW = canvasWidth * 0.35;
  let dist2 = (x - cx) * (x - cx);
  let sigma2 = mtnW * mtnW / 4;
  let elevation = peakH * exp(-dist2 / sigma2);
  return baseY - elevation;
}

function draw() {
  updateCanvasSize();
  animFrame++;

  let mtnHeight = heightSlider.value();
  let maxMtnPixels = drawHeight * 0.55;
  let peakH = map(mtnHeight, 500, 5000, maxMtnPixels * 0.3, maxMtnPixels * 0.9);
  let baseY = drawHeight * 0.78;
  let seaLevel = baseY;

  // Sky gradient
  for (let y = 0; y < drawHeight; y++) {
    let inter = map(y, 0, drawHeight, 0, 1);
    let c = lerpColor(color(50, 100, 200), color(160, 200, 240), inter);
    stroke(c);
    line(0, y, canvasWidth, y);
  }

  // Ocean on left
  noStroke();
  fill(40, 90, 160);
  rect(0, seaLevel, canvasWidth * 0.2, drawHeight - seaLevel);

  // Ground - windward (green/lush)
  let windwardEnd = canvasWidth * 0.35;
  fill(50, 140, 50);
  rect(canvasWidth * 0.2, seaLevel, windwardEnd - canvasWidth * 0.2, drawHeight - seaLevel);

  // Ground - leeward (brown/arid)
  let leewardStart = canvasWidth * 0.65;
  fill(180, 160, 110);
  rect(leewardStart, seaLevel, canvasWidth - leewardStart, drawHeight - seaLevel);

  // Mountain
  fill(120, 100, 80);
  stroke(90, 75, 60);
  strokeWeight(1);
  beginShape();
  for (let x = windwardEnd - 20; x <= leewardStart + 20; x += 2) {
    vertex(x, getMountainY(x, peakH, baseY));
  }
  vertex(leewardStart + 20, baseY);
  vertex(windwardEnd - 20, baseY);
  endShape(CLOSE);

  // Snow cap if tall enough
  if (mtnHeight > 2500) {
    fill(240, 245, 255);
    noStroke();
    beginShape();
    let snowLine = peakH * 0.3;
    for (let x = canvasWidth * 0.42; x <= canvasWidth * 0.58; x += 2) {
      let my = getMountainY(x, peakH, baseY);
      if (my < baseY - peakH + snowLine) {
        vertex(x, my);
      }
    }
    endShape(CLOSE);
  }

  // Windward vegetation (trees)
  noStroke();
  fill(30, 110, 30);
  for (let i = 0; i < 8; i++) {
    let tx = canvasWidth * 0.15 + i * 20;
    let th = 15 + (i % 3) * 5;
    triangle(tx, seaLevel - th, tx - 6, seaLevel, tx + 6, seaLevel);
  }

  // Leeward sparse scrub
  fill(150, 140, 90);
  for (let i = 0; i < 5; i++) {
    let tx = leewardStart + 20 + i * 30;
    ellipse(tx, seaLevel - 3, 10, 6);
    stroke(120, 100, 60);
    strokeWeight(1);
    line(tx, seaLevel - 3, tx, seaLevel);
    noStroke();
  }

  // Air parcels (clouds) moving left to right
  for (let p of airParcels) {
    p.x += p.speed;
    if (p.x > canvasWidth + 60) p.x = -60;

    let py = getMountainY(p.x, peakH, baseY) - 30 - sin(p.phase + animFrame * 0.02) * 5;
    py = min(py, seaLevel - 40);

    // Size and opacity based on humidity (more on windward side)
    let humidity;
    if (p.x < canvasWidth * 0.5) {
      humidity = map(p.x, 0, canvasWidth * 0.5, 0.9, 1.0);
    } else {
      humidity = map(p.x, canvasWidth * 0.5, canvasWidth, 0.6, 0.2);
    }

    // Cloud gets smaller/lighter on leeward
    let cloudSize = 20 + humidity * 25;
    let cloudAlpha = humidity * 220;

    noStroke();
    fill(255, 255, 255, cloudAlpha);
    ellipse(p.x, py, cloudSize, cloudSize * 0.6);
    ellipse(p.x - cloudSize * 0.3, py + 3, cloudSize * 0.7, cloudSize * 0.4);
    ellipse(p.x + cloudSize * 0.3, py + 3, cloudSize * 0.7, cloudSize * 0.4);
  }

  // Rain on windward side
  if (animFrame % 3 === 0) {
    let rx = random(canvasWidth * 0.25, canvasWidth * 0.5);
    let ry = getMountainY(rx, peakH, baseY) - 20;
    raindrops.push({ x: rx, y: ry, vy: 2 });
  }

  // Heavy rain near summit
  if (animFrame % 2 === 0) {
    let rx = random(canvasWidth * 0.42, canvasWidth * 0.52);
    let ry = getMountainY(rx, peakH, baseY) - 15;
    raindrops.push({ x: rx, y: ry, vy: 2.5 });
  }

  // Update and draw rain
  stroke(80, 130, 220);
  strokeWeight(1.5);
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let d = raindrops[i];
    d.y += d.vy;
    d.vy += 0.1;
    let groundY = getMountainY(d.x, peakH, baseY);
    if (d.y > groundY || d.y > seaLevel) {
      raindrops.splice(i, 1);
    } else {
      line(d.x, d.y, d.x, d.y + 4);
    }
  }

  // Temperature and humidity labels
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);

  // Windward side
  let windTemp = 20 - (mtnHeight / 5000) * 5;
  let windHumid = 85 + (mtnHeight / 5000) * 10;
  fill(255);
  text('Windward', canvasWidth * 0.2, 25);
  textSize(10);
  text('T: ' + nf(windTemp, 0, 0) + '°C', canvasWidth * 0.2, 40);
  text('RH: ' + nf(min(windHumid, 99), 0, 0) + '%', canvasWidth * 0.2, 53);

  // Summit
  let summitTemp = windTemp - (mtnHeight / 1000) * 6.5;
  fill(255);
  textSize(11);
  text('Summit', canvasWidth * 0.5, 15);
  textSize(10);
  text('T: ' + nf(summitTemp, 0, 0) + '°C', canvasWidth * 0.5, 30);
  text(nf(mtnHeight, 0, 0) + 'm', canvasWidth * 0.5, 43);

  // Leeward side
  let leeTemp = summitTemp + (mtnHeight / 1000) * 8; // warms faster descending (dry adiabatic)
  let leeHumid = max(15, 85 - (mtnHeight / 5000) * 60);
  fill(255);
  textSize(11);
  text('Leeward', canvasWidth * 0.8, 25);
  textSize(10);
  text('T: ' + nf(leeTemp, 0, 0) + '°C', canvasWidth * 0.8, 40);
  text('RH: ' + nf(leeHumid, 0, 0) + '%', canvasWidth * 0.8, 53);

  // Arrows showing air flow direction
  stroke(255, 255, 255, 150);
  strokeWeight(2);
  fill(255, 255, 255, 150);
  // Windward arrow (going up)
  let arrowY1 = seaLevel - peakH * 0.4;
  drawArrow(canvasWidth * 0.25, arrowY1 + 20, canvasWidth * 0.38, arrowY1 - 30);
  // Leeward arrow (going down)
  drawArrow(canvasWidth * 0.62, arrowY1 - 30, canvasWidth * 0.75, arrowY1 + 20);

  // Title
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Rain Shadow Effect', canvasWidth / 2, 3);

  // Labels
  noStroke();
  textSize(10);
  fill(0);
  textAlign(CENTER, TOP);
  text('Lush vegetation', canvasWidth * 0.25, seaLevel + 5);
  text('Arid scrubland', canvasWidth * 0.78, seaLevel + 5);

  // Height display
  fill(0);
  textAlign(RIGHT, TOP);
  textSize(11);
  text(mtnHeight + 'm', canvasWidth - 10, drawHeight - 25);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -8, -4, -8, 4);
  pop();
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
