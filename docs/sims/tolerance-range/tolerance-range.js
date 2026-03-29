// Tolerance Range Explorer
// Interactive bell curves for specialist vs generalist species

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Environmental condition line
let conditionX = 25; // as temperature value
let dragging = false;

// Variable selector
let varSelect;
let currentVar = 'temperature';

const envVars = {
  temperature: { label: 'Temperature (°C)', min: 0, max: 50, unit: '°C',
    specialist: { name: 'Brook Trout', mean: 14, sd: 4, color: [30, 100, 200] },
    generalist: { name: 'Largemouth Bass', mean: 24, sd: 10, color: [50, 160, 50] }
  },
  pH: { label: 'pH', min: 3, max: 11, unit: '',
    specialist: { name: 'Rainbow Trout', mean: 7.0, sd: 0.8, color: [30, 100, 200] },
    generalist: { name: 'Common Carp', mean: 7.5, sd: 2.5, color: [50, 160, 50] }
  },
  salinity: { label: 'Salinity (ppt)', min: 0, max: 40, unit: 'ppt',
    specialist: { name: 'Freshwater Mussel', mean: 2, sd: 2, color: [30, 100, 200] },
    generalist: { name: 'Bull Shark', mean: 18, sd: 12, color: [50, 160, 50] }
  },
  oxygen: { label: 'Dissolved Oxygen (mg/L)', min: 0, max: 14, unit: 'mg/L',
    specialist: { name: 'Mayfly Larva', mean: 9, sd: 1.5, color: [30, 100, 200] },
    generalist: { name: 'Channel Catfish', mean: 7, sd: 4, color: [50, 160, 50] }
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Tolerance range explorer comparing specialist and generalist species', LABEL);

  varSelect = createSelect();
  varSelect.parent(document.querySelector('main'));
  varSelect.position(10, drawHeight + 5);
  varSelect.option('Temperature', 'temperature');
  varSelect.option('pH', 'pH');
  varSelect.option('Salinity', 'salinity');
  varSelect.option('Dissolved Oxygen', 'oxygen');
  varSelect.changed(() => {
    currentVar = varSelect.value();
    let ev = envVars[currentVar];
    conditionX = ev.specialist.mean;
  });

  conditionX = 25;
}

function gaussian(x, mean, sd) {
  return exp(-0.5 * pow((x - mean) / sd, 2));
}

function getZone(x, mean, sd) {
  let dist = abs(x - mean);
  if (dist <= sd) return 'optimal';
  if (dist <= sd * 2) return 'stress';
  return 'intolerance';
}

function draw() {
  updateCanvasSize();

  fill('#f0f8f0');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let ev = envVars[currentVar];
  let gx = 60;
  let gy = 60;
  let gw = canvasWidth - 90;
  let gh = drawHeight - 140;

  // Title
  noStroke();
  fill(40);
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Tolerance Range Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(12);
  text(ev.label, canvasWidth / 2, 32);

  // Axes
  stroke(80);
  strokeWeight(1);
  line(gx, gy, gx, gy + gh);
  line(gx, gy + gh, gx + gw, gy + gh);

  // Axis labels
  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER, TOP);
  for (let v = ev.min; v <= ev.max; v += (ev.max - ev.min) / 5) {
    let px = gx + map(v, ev.min, ev.max, 0, gw);
    text(nf(v, 1, 0), px, gy + gh + 5);
    stroke(220);
    strokeWeight(0.5);
    line(px, gy, px, gy + gh);
    noStroke();
  }

  // Y-axis label
  push();
  translate(15, gy + gh / 2);
  rotate(-HALF_PI);
  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Performance', 0, 0);
  pop();

  // Draw zone colors behind curves
  drawZones(ev.specialist, gx, gy, gw, gh, ev, 40);
  drawZones(ev.generalist, gx, gy, gw, gh, ev, 25);

  // Draw curves
  drawCurve(ev.specialist, gx, gy, gw, gh, ev);
  drawCurve(ev.generalist, gx, gy, gw, gh, ev);

  // Condition line
  let lineX = gx + map(conditionX, ev.min, ev.max, 0, gw);
  lineX = constrain(lineX, gx, gx + gw);
  stroke(60);
  strokeWeight(2);
  line(lineX, gy - 10, lineX, gy + gh + 5);
  // Drag handle
  fill(60);
  noStroke();
  triangle(lineX - 8, gy - 10, lineX + 8, gy - 10, lineX, gy);

  // Show status for each species at current condition
  let specPerf = gaussian(conditionX, ev.specialist.mean, ev.specialist.sd);
  let genPerf = gaussian(conditionX, ev.generalist.mean, ev.generalist.sd);
  let specZone = getZone(conditionX, ev.specialist.mean, ev.specialist.sd);
  let genZone = getZone(conditionX, ev.generalist.mean, ev.generalist.sd);

  let infoY = gy + gh + 30;
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);

  // Specialist info
  fill(ev.specialist.color[0], ev.specialist.color[1], ev.specialist.color[2]);
  textStyle(BOLD);
  text(ev.specialist.name + ' (Specialist)', gx, infoY);
  textStyle(NORMAL);
  textSize(12);
  fill(getZoneColor(specZone));
  text('Zone: ' + specZone.toUpperCase() + '  |  Performance: ' + nf(specPerf * 100, 1, 0) + '%', gx, infoY + 18);

  // Generalist info
  fill(ev.generalist.color[0], ev.generalist.color[1], ev.generalist.color[2]);
  textSize(13);
  textStyle(BOLD);
  text(ev.generalist.name + ' (Generalist)', canvasWidth / 2, infoY);
  textStyle(NORMAL);
  textSize(12);
  fill(getZoneColor(genZone));
  text('Zone: ' + genZone.toUpperCase() + '  |  Performance: ' + nf(genPerf * 100, 1, 0) + '%', canvasWidth / 2, infoY + 18);

  // Current condition value
  noStroke();
  fill(40);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Current: ' + nf(conditionX, 1, 1) + ' ' + ev.unit, lineX, gy - 12);

  // Legend
  noStroke();
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Drag the line to change conditions', 180, drawHeight + 16);
}

function drawZones(species, gx, gy, gw, gh, ev, alpha) {
  // Optimal zone (green)
  let x1 = gx + map(species.mean - species.sd, ev.min, ev.max, 0, gw);
  let x2 = gx + map(species.mean + species.sd, ev.min, ev.max, 0, gw);
  fill(100, 200, 100, alpha);
  noStroke();
  rect(constrain(x1, gx, gx + gw), gy, constrain(x2 - x1, 0, gw), gh);

  // Stress zones (yellow)
  let sx1 = gx + map(species.mean - species.sd * 2, ev.min, ev.max, 0, gw);
  let sx2 = gx + map(species.mean + species.sd * 2, ev.min, ev.max, 0, gw);
  fill(240, 220, 80, alpha);
  rect(constrain(sx1, gx, gx + gw), gy, constrain(x1 - sx1, 0, gw), gh);
  rect(constrain(x2, gx, gx + gw), gy, constrain(sx2 - x2, 0, gw), gh);
}

function drawCurve(species, gx, gy, gw, gh, ev) {
  stroke(species.color[0], species.color[1], species.color[2]);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let px = 0; px <= gw; px += 2) {
    let val = map(px, 0, gw, ev.min, ev.max);
    let perf = gaussian(val, species.mean, species.sd);
    vertex(gx + px, gy + gh - perf * gh * 0.9);
  }
  endShape();
}

function getZoneColor(zone) {
  if (zone === 'optimal') return color(30, 140, 30);
  if (zone === 'stress') return color(200, 170, 30);
  return color(200, 50, 50);
}

function mousePressed() {
  let ev = envVars[currentVar];
  let gx = 60;
  let gw = canvasWidth - 90;
  let lineX = gx + map(conditionX, ev.min, ev.max, 0, gw);
  if (abs(mouseX - lineX) < 20 && mouseY > 40 && mouseY < drawHeight - 50) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    let ev = envVars[currentVar];
    let gx = 60;
    let gw = canvasWidth - 90;
    conditionX = map(mouseX, gx, gx + gw, ev.min, ev.max);
    conditionX = constrain(conditionX, ev.min, ev.max);
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
