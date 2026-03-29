// Pollutant Pathways Map MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let pollutantSelect;
let showPointCb, showNonpointCb, showTreatmentCb, showWetlandCb;
let particles = [];
let maxParticles = 80;
let time = 0;

// Landscape zones (fractions of canvasWidth)
let zones;

let pollutantTypes = {
  'Fertilizer Runoff': { color: [50, 200, 50], paths: ['farm', 'river', 'lake', 'ocean'], source: 'nonpoint', info: 'Nitrogen & phosphorus from agriculture cause algal blooms' },
  'Industrial Discharge': { color: [180, 80, 180], paths: ['factory', 'river', 'lake', 'ocean'], source: 'point', info: 'Heavy metals and chemicals from factories (CWA permits required)' },
  'Sewage': { color: [140, 100, 60], paths: ['city', 'treatment', 'river', 'lake'], source: 'point', info: 'Organic waste and pathogens from urban areas' },
  'Thermal Pollution': { color: [255, 100, 50], paths: ['factory', 'river', 'lake'], source: 'point', info: 'Heated water discharge reduces dissolved oxygen capacity' },
  'Pesticide': { color: [255, 200, 0], paths: ['farm', 'river', 'lake', 'ocean'], source: 'nonpoint', info: 'Bioaccumulates through food chain; persists in sediments' }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Pollutant pathways map showing how pollutants move through a landscape', LABEL);

  pollutantSelect = createSelect();
  pollutantSelect.parent(document.querySelector('main'));
  for (let p in pollutantTypes) pollutantSelect.option(p);
  pollutantSelect.changed(() => { particles = []; });

  showPointCb = createCheckbox('Point Sources', true);
  showPointCb.parent(document.querySelector('main'));
  showPointCb.style('font-size', '12px');

  showNonpointCb = createCheckbox('Nonpoint Sources', true);
  showNonpointCb.parent(document.querySelector('main'));
  showNonpointCb.style('font-size', '12px');

  showTreatmentCb = createCheckbox('Treatment', true);
  showTreatmentCb.parent(document.querySelector('main'));
  showTreatmentCb.style('font-size', '12px');

  showWetlandCb = createCheckbox('Wetlands', true);
  showWetlandCb.parent(document.querySelector('main'));
  showWetlandCb.style('font-size', '12px');

  updateZones();
}

function updateZones() {
  zones = {
    factory:   { x: canvasWidth * 0.02, w: canvasWidth * 0.15, label: 'Factory' },
    farm:      { x: canvasWidth * 0.18, w: canvasWidth * 0.18, label: 'Farmland' },
    city:      { x: canvasWidth * 0.37, w: canvasWidth * 0.13, label: 'City' },
    treatment: { x: canvasWidth * 0.51, w: canvasWidth * 0.08, label: 'Treatment' },
    wetland:   { x: canvasWidth * 0.60, w: canvasWidth * 0.07, label: 'Wetland' },
    river:     { x: canvasWidth * 0.68, w: canvasWidth * 0.10, label: 'River' },
    lake:      { x: canvasWidth * 0.79, w: canvasWidth * 0.10, label: 'Lake' },
    ocean:     { x: canvasWidth * 0.90, w: canvasWidth * 0.10, label: 'Ocean' }
  };
}

function draw() {
  updateCanvasSize();
  updateZones();
  time++;

  let selected = pollutantSelect.value();
  let pType = pollutantTypes[selected];

  // --- Draw landscape ---
  // Sky
  fill(180, 215, 255);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight * 0.25);

  // Ground base
  let groundY = drawHeight * 0.25;
  let groundH = drawHeight * 0.5;
  let waterY = groundY + groundH;
  let waterH = drawHeight - waterY;

  // Underground
  fill(160, 130, 90);
  rect(0, waterY, canvasWidth, waterH);

  // Factory zone
  let fz = zones.factory;
  fill(180, 180, 180);
  rect(fz.x, groundY, fz.w, groundH);
  // Smokestack
  fill(140, 140, 140);
  rect(fz.x + fz.w * 0.3, groundY - 40, 15, 40);
  rect(fz.x + fz.w * 0.6, groundY - 30, 12, 30);
  // Building
  fill(160, 160, 160);
  rect(fz.x + 5, groundY + 10, fz.w - 10, groundH - 15);

  if (showPointCb.checked()) {
    fill(255, 0, 0, 60);
    noStroke();
    ellipse(fz.x + fz.w / 2, groundY + groundH * 0.7, 30, 30);
    fill(255, 0, 0);
    textSize(9);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Point', fz.x + fz.w / 2, groundY + groundH * 0.7);
  }

  // Farmland zone
  let fm = zones.farm;
  fill(120, 180, 60);
  rect(fm.x, groundY, fm.w, groundH);
  // Crop rows
  stroke(80, 140, 30);
  strokeWeight(2);
  for (let i = 0; i < 6; i++) {
    let cy = groundY + 15 + i * (groundH / 7);
    line(fm.x + 5, cy, fm.x + fm.w - 5, cy);
  }
  noStroke();

  if (showNonpointCb.checked()) {
    fill(255, 165, 0, 60);
    rect(fm.x, groundY, fm.w, groundH);
    fill(255, 140, 0);
    textSize(9);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Nonpoint', fm.x + fm.w / 2, groundY + 30);
  }

  // City zone
  let cz = zones.city;
  fill(200, 200, 200);
  rect(cz.x, groundY, cz.w, groundH);
  fill(160, 160, 180);
  // Buildings
  rect(cz.x + 5, groundY + 5, 18, groundH * 0.6);
  rect(cz.x + 28, groundY + 15, 15, groundH * 0.5);
  rect(cz.x + 48, groundY + 8, 20, groundH * 0.55);

  // Treatment plant
  let tz = zones.treatment;
  if (showTreatmentCb.checked()) {
    fill(200, 230, 255);
    rect(tz.x, groundY, tz.w, groundH);
    fill(100, 160, 220);
    ellipse(tz.x + tz.w / 2, groundY + groundH * 0.5, tz.w * 0.7, tz.w * 0.7);
    fill(255);
    textSize(8);
    textAlign(CENTER, CENTER);
    noStroke();
    text('WTP', tz.x + tz.w / 2, groundY + groundH * 0.5);
  } else {
    fill(180, 180, 180);
    rect(tz.x, groundY, tz.w, groundH);
  }

  // Wetland buffer
  let wz = zones.wetland;
  if (showWetlandCb.checked()) {
    fill(80, 160, 100);
    rect(wz.x, groundY, wz.w, groundH);
    // Reeds
    stroke(40, 120, 50);
    strokeWeight(2);
    for (let i = 0; i < 5; i++) {
      let rx = wz.x + 5 + i * (wz.w / 5);
      line(rx, groundY + groundH, rx, groundY + 10);
    }
    noStroke();
    fill(40, 120, 50);
    textSize(8);
    textAlign(CENTER, TOP);
    text('Wetland\nBuffer', wz.x + wz.w / 2, groundY + 5);
  } else {
    fill(150, 170, 130);
    rect(wz.x, groundY, wz.w, groundH);
  }

  // River
  let rv = zones.river;
  fill(70, 140, 220);
  rect(rv.x, groundY, rv.w, groundH);
  // Flow lines
  stroke(100, 170, 240);
  strokeWeight(1);
  for (let i = 0; i < 4; i++) {
    let fy = groundY + 20 + i * (groundH / 5);
    let offset = (time * 0.5 + i * 20) % rv.w;
    line(rv.x + offset, fy, rv.x + offset + 15, fy);
  }
  noStroke();

  // Lake
  let lk = zones.lake;
  fill(50, 120, 200);
  rect(lk.x, groundY, lk.w, groundH);

  // Ocean
  let oc = zones.ocean;
  fill(30, 80, 170);
  rect(oc.x, groundY, oc.w, groundH);

  // Zone labels
  noStroke();
  fill(255, 255, 255, 200);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  for (let key in zones) {
    let z = zones[key];
    text(z.label, z.x + z.w / 2, groundY - 2);
  }

  // --- Animated particles ---
  // Spawn particles
  if (time % 4 === 0 && particles.length < maxParticles) {
    let startZone = pType.paths[0];
    let sz = zones[startZone];
    particles.push({
      x: sz.x + random(sz.w),
      y: groundY + random(10, groundH - 10),
      pathIdx: 0,
      speed: random(0.8, 1.5),
      size: random(4, 7)
    });
  }

  // Update and draw particles
  let pColor = pType.color;
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    let targetZone = pType.paths[min(p.pathIdx + 1, pType.paths.length - 1)];
    let tz2 = zones[targetZone];
    let targetX = tz2.x + tz2.w / 2;
    let targetY = groundY + groundH * 0.5 + sin(time * 0.02 + i) * 20;

    let dx = targetX - p.x;
    let dy = targetY - p.y;
    let dist = sqrt(dx * dx + dy * dy);

    if (dist < 15) {
      p.pathIdx++;
      if (p.pathIdx >= pType.paths.length) {
        particles.splice(i, 1);
        continue;
      }
    }

    p.x += (dx / dist) * p.speed;
    p.y += (dy / dist) * p.speed * 0.5 + sin(time * 0.05 + i) * 0.3;

    // Wetland filtering effect
    if (showWetlandCb.checked() && p.x > wz.x && p.x < wz.x + wz.w) {
      p.speed *= 0.98;
      p.size *= 0.998;
    }

    // Treatment filtering effect
    if (showTreatmentCb.checked() && p.x > zones.treatment.x && p.x < zones.treatment.x + zones.treatment.w) {
      p.size *= 0.99;
    }

    fill(pColor[0], pColor[1], pColor[2], 200);
    noStroke();
    ellipse(p.x, p.y, p.size, p.size);
  }

  // Info box
  let infoY = waterY + 10;
  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(10, infoY, canvasWidth - 20, waterH - 15, 5);
  noStroke();
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text('Pollutant: ' + selected, 20, infoY + 5);
  textSize(11);
  fill(80);
  text(pType.info, 20, infoY + 22);
  text('Source Type: ' + (pType.source === 'point' ? 'Point Source (single location)' : 'Nonpoint Source (diffuse)'), 20, infoY + 40);

  // Affected zone highlight
  let pathZones = pType.paths;
  stroke(pColor[0], pColor[1], pColor[2], 80);
  strokeWeight(3);
  noFill();
  for (let pz of pathZones) {
    let z = zones[pz];
    rect(z.x, groundY, z.w, groundH);
  }

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Pollutant:', 10, drawHeight + 18);
  pollutantSelect.position(90, drawHeight + 8);

  showPointCb.position(10, drawHeight + 34);
  showNonpointCb.position(110, drawHeight + 34);
  showTreatmentCb.position(240, drawHeight + 34);
  showWetlandCb.position(340, drawHeight + 34);
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
