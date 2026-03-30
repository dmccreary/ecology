// Soil Horizons and Texture Explorer
// CANVAS_HEIGHT: 580
// Left panel: soil profile, Right panel: texture triangle

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 16;

let sandSlider, siltSlider, claySlider;
let hoveredHorizon = -1;

const horizons = [
  { label: 'O', name: 'Organic', color: [60, 40, 20], depth: '0-5 cm',
    desc: 'Decomposing leaves, twigs, and organic matter. Home to fungi and insects.' },
  { label: 'A', name: 'Topsoil', color: [90, 70, 40], depth: '5-25 cm',
    desc: 'Dark, rich in humus and minerals. Most roots and earthworms live here.' },
  { label: 'B', name: 'Subsoil', color: [160, 110, 60], depth: '25-80 cm',
    desc: 'Accumulation zone for clay, iron oxides, and minerals leached from above.' },
  { label: 'C', name: 'Parent Material', color: [190, 170, 130], depth: '80-150 cm',
    desc: 'Weathered rock fragments. Little biological activity.' },
  { label: 'R', name: 'Bedrock', color: [150, 150, 150], depth: '150+ cm',
    desc: 'Solid, unweathered rock. The foundation beneath all soil.' }
];

// Soil texture classifications (simplified regions)
function classifySoil(sand, silt, clay) {
  if (clay >= 40) {
    if (sand >= 45) return 'Sandy Clay';
    if (silt >= 40) return 'Silty Clay';
    return 'Clay';
  }
  if (clay >= 27) {
    if (sand >= 20 && sand < 45) return 'Clay Loam';
    if (sand >= 45) return 'Sandy Clay Loam';
    return 'Silty Clay Loam';
  }
  if (silt >= 80) return 'Silt';
  if (silt >= 50) {
    if (clay < 12) return 'Silt Loam';
    return 'Silt Loam';
  }
  if (sand >= 85) return 'Sand';
  if (sand >= 70) return 'Loamy Sand';
  if (clay < 20 && sand >= 52) return 'Sandy Loam';
  return 'Loam';
}

const soilInfo = {
  'Clay': { drainage: 'Very poor', nutrients: 'High retention', use: 'Rice paddies, ceramics' },
  'Sandy Clay': { drainage: 'Poor', nutrients: 'Moderate', use: 'Orchards with amendments' },
  'Silty Clay': { drainage: 'Poor', nutrients: 'High', use: 'Wetland crops' },
  'Clay Loam': { drainage: 'Moderate', nutrients: 'Good', use: 'Wheat, vegetables' },
  'Sandy Clay Loam': { drainage: 'Moderate', nutrients: 'Moderate', use: 'Mixed farming' },
  'Silty Clay Loam': { drainage: 'Moderate', nutrients: 'Good', use: 'General agriculture' },
  'Loam': { drainage: 'Good', nutrients: 'Good', use: 'Ideal for most crops' },
  'Sandy Loam': { drainage: 'Good', nutrients: 'Low-moderate', use: 'Root vegetables, berries' },
  'Silt Loam': { drainage: 'Moderate', nutrients: 'Good', use: 'Corn, soybeans' },
  'Silt': { drainage: 'Moderate', nutrients: 'Moderate', use: 'Pasture, hay' },
  'Loamy Sand': { drainage: 'Excellent', nutrients: 'Low', use: 'Drought-tolerant crops' },
  'Sand': { drainage: 'Excessive', nutrients: 'Very low', use: 'Cacti, specialized crops' }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Soil horizons profile and texture triangle explorer', LABEL);

  let yPos = drawHeight + 8;
  let el;

  el = createSpan('Sand %:');
  el.parent(document.querySelector('main'));
  el.position(10, yPos + 4);
  el.style('font-size', '13px');
  sandSlider = createSlider(0, 100, 40, 1);
  sandSlider.parent(document.querySelector('main'));
  sandSlider.position(65, yPos);
  sandSlider.size(80);
  sandSlider.input(constrainSliders);

  el = createSpan('Silt %:');
  el.parent(document.querySelector('main'));
  el.position(155, yPos + 4);
  el.style('font-size', '13px');
  siltSlider = createSlider(0, 100, 40, 1);
  siltSlider.parent(document.querySelector('main'));
  siltSlider.position(200, yPos);
  siltSlider.size(80);
  siltSlider.input(constrainSliders);

  el = createSpan('Clay %:');
  el.parent(document.querySelector('main'));
  el.position(290, yPos + 4);
  el.style('font-size', '13px');
  claySlider = createSlider(0, 100, 20, 1);
  claySlider.parent(document.querySelector('main'));
  claySlider.position(340, yPos);
  claySlider.size(80);

  yPos += 28;
}

let lastChanged = 'sand';
function constrainSliders() {
  // Keep sum at 100 by adjusting clay
  let sand = sandSlider.value();
  let silt = siltSlider.value();
  let remaining = 100 - sand - silt;
  if (remaining < 0) {
    silt = 100 - sand;
    siltSlider.value(max(0, silt));
    remaining = 100 - sand - max(0, silt);
  }
  claySlider.value(max(0, remaining));
}

function draw() {
  updateCanvasSize();

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
  text('Soil Horizons & Texture Explorer', canvasWidth / 2, 4);

  let halfW = canvasWidth / 2;

  // === LEFT PANEL: Soil Profile ===
  let profLeft = margin;
  let profRight = halfW - 10;
  let profTop = 28;
  let profBottom = drawHeight - 10;
  let profW = profRight - profLeft;
  let profH = profBottom - profTop;
  let layerH = profH / horizons.length;

  hoveredHorizon = -1;

  for (let i = 0; i < horizons.length; i++) {
    let h = horizons[i];
    let y = profTop + i * layerH;

    // Check hover
    let isHovered = mouseX > profLeft && mouseX < profRight && mouseY > y && mouseY < y + layerH;
    if (isHovered) hoveredHorizon = i;

    // Draw layer
    noStroke();
    let c = h.color;
    if (isHovered) {
      fill(c[0] + 30, c[1] + 30, c[2] + 30);
      stroke(255, 200, 0);
      strokeWeight(2);
    } else {
      fill(c[0], c[1], c[2]);
    }
    rect(profLeft, y, profW, layerH);

    // Add texture dots for realism
    noStroke();
    for (let d = 0; d < 15; d++) {
      let dx = profLeft + 20 + (d * 11) % (profW - 40);
      let dy = y + 5 + (d * 7) % (layerH - 10);
      fill(c[0] - 15, c[1] - 15, c[2] - 15, 80);
      ellipse(dx, dy, 3, 3);
    }

    // Horizon label
    noStroke();
    fill(255);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(h.label + ' - ' + h.name, profLeft + 8, y + layerH / 2);
    textSize(10);
    textAlign(RIGHT, CENTER);
    fill(255, 230);
    text(h.depth, profRight - 5, y + layerH / 2);
  }

  // Earthworms in A horizon
  let aY = profTop + layerH;
  stroke(180, 120, 100);
  strokeWeight(2);
  noFill();
  let wormX = profLeft + 60 + sin(frameCount * 0.03) * 5;
  beginShape();
  vertex(wormX, aY + 15);
  bezierVertex(wormX + 10, aY + 10, wormX + 15, aY + 25, wormX + 25, aY + 20);
  endShape();

  // Roots in A and B
  stroke(100, 60, 30);
  strokeWeight(1);
  let rootBase = profLeft + profW / 2;
  line(rootBase, profTop, rootBase, profTop + layerH * 2);
  line(rootBase, profTop + layerH * 0.5, rootBase - 15, profTop + layerH);
  line(rootBase, profTop + layerH * 1.2, rootBase + 12, profTop + layerH * 1.6);

  // Hover tooltip
  if (hoveredHorizon >= 0) {
    let h = horizons[hoveredHorizon];
    let ttW = halfW - 30;
    let ttH = 48;
    let ttX = profLeft + 5;
    let ttY = profBottom - ttH - 5;
    fill(255, 255, 240, 240);
    stroke(0);
    strokeWeight(0.5);
    rect(ttX, ttY, ttW, ttH, 4);
    noStroke();
    fill(0);
    textSize(10);
    textAlign(LEFT, TOP);
    // Word wrap the description
    text(h.desc, ttX + 5, ttY + 5, ttW - 10, ttH - 10);
  }

  // === RIGHT PANEL: Texture Triangle (simplified as bar display) ===
  let sand = sandSlider.value();
  let silt = siltSlider.value();
  let clay = max(0, 100 - sand - silt);

  let rtLeft = halfW + 10;
  let rtRight = canvasWidth - margin;
  let rtW = rtRight - rtLeft;

  // Draw simplified texture triangle
  let triTop = 50;
  let triH = 200;
  let triCenterX = rtLeft + rtW / 2;

  // Triangle vertices: top=clay100, bottom-left=sand100, bottom-right=silt100
  let ax = triCenterX, ay = triTop;           // clay 100%
  let bx = rtLeft + 10, by = triTop + triH;   // sand 100%
  let cx = rtRight - 10, cy = triTop + triH;  // silt 100%

  // Draw triangle
  stroke(100);
  strokeWeight(1);
  fill(210, 195, 170);
  triangle(ax, ay, bx, by, cx, cy);

  // Axis labels
  noStroke();
  fill(0);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('Clay 100%', ax, ay - 3);
  textAlign(RIGHT, TOP);
  text('Sand 100%', bx - 3, by + 3);
  textAlign(LEFT, TOP);
  text('Silt 100%', cx + 3, cy + 3);

  // Plot current point in triangle using barycentric coordinates
  let px = bx + (ax - bx) * (clay / 100) + (cx - bx) * (silt / 100);
  let py = by + (ay - by) * (clay / 100) + (cy - by) * (silt / 100);

  fill(255, 50, 50);
  stroke(0);
  strokeWeight(1.5);
  ellipse(px, py, 10, 10);

  // Classification
  let soilType = classifySoil(sand, silt, clay);
  let info = soilInfo[soilType] || { drainage: '?', nutrients: '?', use: '?' };

  noStroke();
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text(soilType, triCenterX, triTop + triH + 25);

  // Composition bars
  let barY = triTop + triH + 50;
  let barH = 16;
  let barW = rtW - 10;
  let barX = rtLeft + 5;

  // Sand bar
  fill(194, 178, 128);
  noStroke();
  rect(barX, barY, barW * sand / 100, barH);
  // Silt bar
  fill(160, 140, 100);
  rect(barX + barW * sand / 100, barY, barW * silt / 100, barH);
  // Clay bar
  fill(120, 80, 50);
  rect(barX + barW * (sand + silt) / 100, barY, barW * clay / 100, barH);

  stroke(0);
  strokeWeight(0.5);
  noFill();
  rect(barX, barY, barW, barH);

  noStroke();
  fill(0);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Sand: ' + sand + '%   Silt: ' + silt + '%   Clay: ' + clay + '%', barX, barY + barH + 4);

  // Soil properties
  let propY = barY + barH + 22;
  textSize(11);
  textAlign(LEFT, TOP);
  fill(0);
  text('Drainage: ' + info.drainage, barX, propY);
  text('Nutrients: ' + info.nutrients, barX, propY + 16);
  text('Best Use: ' + info.use, barX, propY + 32);
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
