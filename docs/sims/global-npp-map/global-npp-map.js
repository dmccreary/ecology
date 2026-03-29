// Global NPP Heatmap
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let viewToggle;
let hoverRegion = -1;

// Biome data: name, NPP g C/m2/yr, area (million km2), limiting factors, map color
let biomes = [
  { name: 'Tropical Rainforest', npp: 2200, area: 17.0, limits: 'Light (understory), nutrients', clr: '#1B5E20' },
  { name: 'Temperate Forest', npp: 1200, area: 12.0, limits: 'Temperature, water seasonality', clr: '#388E3C' },
  { name: 'Boreal Forest', npp: 800, area: 12.0, limits: 'Temperature, short growing season', clr: '#558B2F' },
  { name: 'Tropical Savanna', npp: 900, area: 15.0, limits: 'Water, fire frequency', clr: '#8BC34A' },
  { name: 'Temperate Grassland', npp: 600, area: 9.0, limits: 'Water, temperature extremes', clr: '#CDDC39' },
  { name: 'Tundra', npp: 140, area: 8.0, limits: 'Temperature, permafrost, short season', clr: '#A1887F' },
  { name: 'Desert', npp: 90, area: 18.0, limits: 'Water, extreme temperatures', clr: '#D7CCC8' },
  { name: 'Open Ocean', npp: 125, area: 332.0, limits: 'Nutrients, light at depth', clr: '#90CAF9' },
  { name: 'Coastal/Estuary', npp: 1500, area: 3.4, limits: 'Turbidity, pollution', clr: '#0D47A1' },
  { name: 'Coral Reef', npp: 2500, area: 0.6, limits: 'Temperature, acidification', clr: '#E91E63' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Global NPP heatmap comparing biome productivity', LABEL);

  viewToggle = createCheckbox(' Show Total Contribution', false);
  viewToggle.parent(document.querySelector('main'));
  viewToggle.style('font-size', '14px');
}

function draw() {
  updateCanvasSize();
  background(240);

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let showTotal = viewToggle.checked();

  // Title
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Global Net Primary Productivity by Biome', canvasWidth / 2, 8);

  // Simplified world map region - draw colored rectangles as biome regions
  let mapH = 180;
  let mapY = 35;
  let mapW = canvasWidth - 60;
  let mapX = 30;

  // Draw simplified world map background
  fill('#B3E5FC');
  noStroke();
  rect(mapX, mapY, mapW, mapH, 5);

  // Place biome regions on map (simplified geographic positions)
  let regions = [
    { idx: 0, x: 0.22, y: 0.45, w: 0.12, h: 0.2 },  // Tropical Rainforest
    { idx: 1, x: 0.6, y: 0.2, w: 0.15, h: 0.15 },   // Temperate Forest
    { idx: 2, x: 0.3, y: 0.05, w: 0.2, h: 0.12 },   // Boreal Forest
    { idx: 3, x: 0.55, y: 0.45, w: 0.15, h: 0.15 },  // Tropical Savanna
    { idx: 4, x: 0.35, y: 0.22, w: 0.15, h: 0.1 },   // Temperate Grassland
    { idx: 5, x: 0.15, y: 0.02, w: 0.25, h: 0.06 },  // Tundra
    { idx: 6, x: 0.7, y: 0.35, w: 0.15, h: 0.2 },   // Desert
    { idx: 7, x: 0.05, y: 0.7, w: 0.4, h: 0.25 },   // Open Ocean
    { idx: 8, x: 0.8, y: 0.5, w: 0.08, h: 0.1 },    // Coastal/Estuary
    { idx: 9, x: 0.82, y: 0.65, w: 0.06, h: 0.06 }   // Coral Reef
  ];

  hoverRegion = -1;
  for (let r of regions) {
    let rx = mapX + r.x * mapW;
    let ry = mapY + r.y * mapH;
    let rw = r.w * mapW;
    let rh = r.h * mapH;

    fill(biomes[r.idx].clr);
    stroke(255, 200);
    strokeWeight(1);
    rect(rx, ry, rw, rh, 3);

    if (mouseX > rx && mouseX < rx + rw && mouseY > ry && mouseY < ry + rh) {
      hoverRegion = r.idx;
    }
  }

  // Map legend
  noStroke();
  fill(30);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Simplified biome map (hover for details)', mapX, mapY + mapH + 2);

  // Bar chart
  let chartY = mapY + mapH + 20;
  let chartH = drawHeight - chartY - 15;
  let barW = (mapW - 20) / biomes.length;

  // Find max for scaling
  let maxVal = 0;
  for (let b of biomes) {
    let val = showTotal ? b.npp * b.area : b.npp;
    if (val > maxVal) maxVal = val;
  }

  // Axis label
  noStroke();
  fill(80);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text(showTotal ? 'Total NPP (g C/m\u00b2/yr \u00d7 million km\u00b2)' : 'NPP per m\u00b2 (g C/m\u00b2/yr)', canvasWidth / 2, chartY - 2);

  for (let i = 0; i < biomes.length; i++) {
    let b = biomes[i];
    let val = showTotal ? b.npp * b.area : b.npp;
    let barH = (val / maxVal) * (chartH - 25);
    let bx = mapX + 10 + i * barW;
    let by = chartY + chartH - 25 - barH;

    fill(b.clr);
    if (hoverRegion === i) {
      stroke(255, 0, 0);
      strokeWeight(2);
    } else {
      stroke(255, 200);
      strokeWeight(1);
    }
    rect(bx + 2, by, barW - 4, barH, 2);

    // Bar label
    noStroke();
    fill(50);
    textSize(8);
    textAlign(CENTER, TOP);
    push();
    translate(bx + barW / 2, chartY + chartH - 22);
    rotate(-PI / 4);
    text(b.name, 0, 0);
    pop();
  }

  // Hover tooltip
  if (hoverRegion >= 0) {
    let b = biomes[hoverRegion];
    let tw = 240;
    let th = 70;
    let tx = constrain(mouseX + 12, 5, canvasWidth - tw - 5);
    let ty = constrain(mouseY - th - 5, 5, drawHeight - th - 5);
    fill(255, 255, 230, 240);
    stroke(100);
    strokeWeight(1);
    rect(tx, ty, tw, th, 5);
    noStroke();
    fill(30);
    textSize(12);
    textAlign(LEFT, TOP);
    text(b.name, tx + 8, ty + 5);
    textSize(11);
    text('NPP: ' + b.npp + ' g C/m\u00b2/yr', tx + 8, ty + 22);
    text('Area: ' + b.area + ' million km\u00b2', tx + 8, ty + 37);
    text('Limits: ' + b.limits, tx + 8, ty + 52);
  }

  // Control area label
  noStroke();
  fill(30);
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Toggle view mode with checkbox above', 10, drawHeight + controlHeight / 2);
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
