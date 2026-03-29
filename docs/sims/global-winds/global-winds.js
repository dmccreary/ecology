// Global Wind and Convection Cell Model
// Cross-section of Earth from pole to pole with atmospheric circulation

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let coriolisCheckbox;
let animFrame = 0;
let hoveredBand = -1;

// Latitude bands with wind info
const bands = [
  { lat: '90°N', latEnd: '60°N', name: 'Polar Easterlies', dir: 'NE→SW', weather: 'Cold, dry', biome: 'Tundra/Ice', wind: -1, precip: 'dry' },
  { lat: '60°N', latEnd: '30°N', name: 'Westerlies', dir: 'SW→NE', weather: 'Variable, storms', biome: 'Temperate Forest', wind: 1, precip: 'wet' },
  { lat: '30°N', latEnd: '0°', name: 'NE Trade Winds', dir: 'NE→SW', weather: 'Dry at 30°, wet at equator', biome: 'Desert→Rainforest', wind: -1, precip: 'dry-to-wet' },
  { lat: '0°', latEnd: '30°S', name: 'SE Trade Winds', dir: 'SE→NW', weather: 'Wet at equator, dry at 30°', biome: 'Rainforest→Desert', wind: 1, precip: 'wet-to-dry' },
  { lat: '30°S', latEnd: '60°S', name: 'Westerlies', dir: 'NW→SE', weather: 'Variable, storms', biome: 'Temperate Forest', wind: -1, precip: 'wet' },
  { lat: '60°S', latEnd: '90°S', name: 'Polar Easterlies', dir: 'SE→NW', weather: 'Cold, dry', biome: 'Tundra/Ice', wind: 1, precip: 'dry' }
];

// Convection cell names
const cellNames = ['Polar Cell', 'Ferrel Cell', 'Hadley Cell', 'Hadley Cell', 'Ferrel Cell', 'Polar Cell'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Global wind patterns and convection cells model showing atmospheric circulation', LABEL);

  coriolisCheckbox = createCheckbox('Coriolis Effect (Earth Rotation)', true);
  coriolisCheckbox.parent(document.querySelector('main'));
  coriolisCheckbox.position(10, drawHeight + 12);
  coriolisCheckbox.style('font-size', '13px');
}

function draw() {
  updateCanvasSize();
  animFrame++;

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Global Wind & Convection Cells', canvasWidth / 2, 4);

  let useCoriolis = coriolisCheckbox.checked();

  // Layout: Earth cross-section as rectangle
  let earthLeft = margin + 50;
  let earthRight = canvasWidth - margin - 10;
  let earthTop = 35;
  let earthBottom = drawHeight - 60;
  let earthW = earthRight - earthLeft;
  let earthH = earthBottom - earthTop;
  let bandH = earthH / 6;

  // Atmosphere layer
  let atmosH = 60;

  hoveredBand = -1;

  // Draw bands and atmosphere
  for (let i = 0; i < 6; i++) {
    let y = earthTop + i * bandH;
    let band = bands[i];

    // Check hover
    if (mouseX > earthLeft && mouseX < earthRight && mouseY > y && mouseY < y + bandH) {
      hoveredBand = i;
    }

    // Ground color based on biome
    let groundColor;
    if (i === 0 || i === 5) groundColor = color(220, 235, 245); // polar
    else if (i === 1 || i === 4) groundColor = color(80, 140, 60); // temperate
    else groundColor = color(60, 130, 40); // tropical

    noStroke();
    fill(groundColor);
    if (hoveredBand === i) {
      fill(red(groundColor) + 30, green(groundColor) + 30, blue(groundColor) + 30);
    }
    rect(earthLeft, y, earthW, bandH);

    // Desert band at ~30 degrees
    if (i === 2) {
      fill(210, 190, 130, 180);
      rect(earthLeft, y, earthW, bandH * 0.35);
    }
    if (i === 3) {
      fill(210, 190, 130, 180);
      rect(earthLeft, y + bandH * 0.65, earthW, bandH * 0.35);
    }

    // Equator rainforest
    if (i === 2) {
      fill(30, 110, 30, 150);
      rect(earthLeft, y + bandH * 0.7, earthW, bandH * 0.3);
    }
    if (i === 3) {
      fill(30, 110, 30, 150);
      rect(earthLeft, y, earthW, bandH * 0.3);
    }

    // Cell label
    noStroke();
    fill(0, 0, 0, 60);
    textSize(9);
    textAlign(CENTER, CENTER);
    text(cellNames[i], earthLeft + earthW / 2, y + bandH / 2);

    // Wind arrows
    let arrowY = y + bandH * 0.5;
    let arrowSpacing = earthW / 5;
    for (let a = 0; a < 4; a++) {
      let ax = earthLeft + 30 + a * arrowSpacing;
      let aLen = 25;
      let dir = band.wind;

      stroke(50, 80, 200);
      strokeWeight(2);

      if (useCoriolis) {
        // Curved arrows showing deflection
        let curveAmt = dir * 8;
        noFill();
        beginShape();
        vertex(ax, arrowY);
        quadraticVertex(ax + aLen / 2, arrowY + curveAmt, ax + aLen * dir, arrowY - curveAmt * 0.3);
        endShape();
        // Arrowhead
        fill(50, 80, 200);
        let endX = ax + aLen * dir;
        let endY = arrowY - curveAmt * 0.3;
        push();
        translate(endX, endY);
        rotate(atan2(-curveAmt * 0.3, aLen * dir));
        triangle(0, 0, -6 * sign(dir), -3, -6 * sign(dir), 3);
        pop();
      } else {
        // Straight horizontal arrows
        line(ax, arrowY, ax + aLen * dir, arrowY);
        fill(50, 80, 200);
        let endX = ax + aLen * dir;
        push();
        translate(endX, arrowY);
        if (dir > 0) triangle(0, 0, -6, -3, -6, 3);
        else triangle(0, 0, 6, -3, 6, 3);
        pop();
      }
    }

    // Precipitation/dry indicators
    noStroke();
    if (band.precip === 'wet' || band.precip === 'wet-to-dry') {
      // Rain drops at rising air zones
      fill(50, 100, 220, 150);
      let dropX = earthLeft + 15;
      for (let d = 0; d < 3; d++) {
        let dy = y + 5 + ((animFrame + d * 20) % int(bandH)) ;
        ellipse(dropX + d * 8, dy, 3, 5);
      }
    }
    if (band.precip === 'dry' || band.precip === 'dry-to-wet') {
      // Sun icon
      fill(255, 200, 50, 180);
      let sunX2 = earthLeft + 15;
      let sunY2 = y + 12;
      ellipse(sunX2, sunY2, 10, 10);
    }

    // Latitude labels on left
    noStroke();
    fill(0);
    textSize(9);
    textAlign(RIGHT, TOP);
    text(band.lat, earthLeft - 5, y);
  }
  // Bottom latitude label
  noStroke();
  fill(0);
  textSize(9);
  textAlign(RIGHT, TOP);
  text('90°S', earthLeft - 5, earthBottom - 2);

  // Convection cell circulation arrows (vertical)
  // Rising at equator and 60°, sinking at 30° and poles
  let riseLats = [3, 1.67, 4.33]; // band indices where air rises (0=equator between bands 2-3)
  let sinkLats = [0.5, 2.3, 3.7, 5.5]; // where air sinks

  stroke(200, 80, 80, 120);
  strokeWeight(1.5);
  // Rising arrows
  for (let rl of [earthTop + 3 * bandH, earthTop + 1 * bandH, earthTop + 5 * bandH]) {
    let ax2 = earthRight - 20;
    fill(200, 80, 80, 120);
    line(ax2, rl + 10, ax2, rl - 10);
    triangle(ax2, rl - 10, ax2 - 4, rl - 2, ax2 + 4, rl - 2);
  }
  // Sinking arrows
  for (let sl of [earthTop + 0.2 * bandH, earthTop + 2 * bandH, earthTop + 4 * bandH, earthTop + 5.8 * bandH]) {
    let ax2 = earthRight - 35;
    fill(80, 80, 200, 120);
    stroke(80, 80, 200, 120);
    line(ax2, sl - 10, ax2, sl + 10);
    triangle(ax2, sl + 10, ax2 - 4, sl + 2, ax2 + 4, sl + 2);
  }

  // Equator line
  stroke(255, 50, 50, 100);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  let eqY = earthTop + 3 * bandH;
  line(earthLeft, eqY, earthRight, eqY);
  drawingContext.setLineDash([]);
  noStroke();
  fill(255, 50, 50);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text('Equator', earthLeft + 3, eqY - 2);

  // Hover tooltip
  if (hoveredBand >= 0) {
    let b = bands[hoveredBand];
    let ttW = 200;
    let ttH = 65;
    let ttX = min(mouseX + 10, canvasWidth - ttW - 5);
    let ttY = max(mouseY - ttH - 5, 5);
    fill(255, 255, 240, 240);
    stroke(0);
    strokeWeight(0.5);
    rect(ttX, ttY, ttW, ttH, 4);
    noStroke();
    fill(0);
    textSize(10);
    textAlign(LEFT, TOP);
    text(b.name + ' (' + b.lat + ' to ' + b.latEnd + ')', ttX + 5, ttY + 4);
    text('Direction: ' + b.dir, ttX + 5, ttY + 18);
    text('Weather: ' + b.weather, ttX + 5, ttY + 32);
    text('Biome: ' + b.biome, ttX + 5, ttY + 46);
  }

  // Wind names on left
  noStroke();
  fill(0);
  textSize(9);
  textAlign(RIGHT, CENTER);
  let windNames = ['Polar\nEasterlies', 'Westerlies', 'Trade\nWinds', 'Trade\nWinds', 'Westerlies', 'Polar\nEasterlies'];
  for (let i = 0; i < 6; i++) {
    let y = earthTop + i * bandH + bandH / 2;
    let lines = windNames[i].split('\n');
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], earthLeft - 18, y + (j - (lines.length - 1) / 2) * 11);
    }
  }
}

function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
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
