// Solar Energy Budget - Sankey-style flow diagram
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let cloudSlider;
let hoverBranch = -1;

// Energy flow data (percentages of 100 units incoming)
let baseFlows = [
  { label: 'Reflected by Atmosphere', pct: 6, color: '#8899AA' },
  { label: 'Reflected by Clouds', pct: 20, color: '#AABBCC' },
  { label: 'Absorbed by Atmosphere', pct: 16, color: '#CC8844' },
  { label: 'Reflected by Surface', pct: 4, color: '#BBAA88' },
  { label: 'Absorbed by Surface (heat)', pct: 53, color: '#DD6644' },
  { label: 'Captured by Photosynthesis', pct: 1, color: '#44AA44' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Sankey diagram showing solar energy budget from sun to producers', LABEL);

  cloudSlider = createSlider(10, 40, 20, 1);
  cloudSlider.parent(document.querySelector('main'));
  cloudSlider.style('width', '180px');
}

function draw() {
  updateCanvasSize();
  background(240);

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Recalculate flows based on cloud cover
  let cloudPct = cloudSlider.value();
  let flows = recalcFlows(cloudPct);

  // Title
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Solar Energy Budget (100 units incoming)', canvasWidth / 2, 8);

  // Draw Sankey ribbons
  let startX = 60;
  let endX = canvasWidth - 80;
  let flowWidth = endX - startX;
  let totalY = 45;
  let totalHeight = drawHeight - 80;
  let ribbonStartY = totalY;

  // Incoming flow full width
  let unitScale = totalHeight / 100;

  // Sun label
  textSize(13);
  textAlign(RIGHT, CENTER);
  fill('#FF8800');
  noStroke();
  text('Sun', startX - 10, totalY + totalHeight / 2);
  text('100 units', startX - 10, totalY + totalHeight / 2 + 18);

  // Draw each branch ribbon
  let currentY = ribbonStartY;
  hoverBranch = -1;

  for (let i = 0; i < flows.length; i++) {
    let f = flows[i];
    let h = f.pct * unitScale;
    if (h < 2) h = 2;

    // Ribbon from left to split point, then branch right
    let splitX = startX + flowWidth * (0.15 + i * 0.14);
    if (splitX > endX - 40) splitX = endX - 40;

    let branchEndX = endX;
    let branchEndY;
    if (i < flows.length - 1) {
      // Loss branches go to the side
      branchEndY = currentY + h / 2;
    } else {
      // Photosynthesis goes to producers box
      branchEndY = currentY + h / 2;
    }

    // Check hover
    if (mouseX > startX && mouseX < endX && mouseY > currentY && mouseY < currentY + h) {
      hoverBranch = i;
    }

    // Draw ribbon
    noStroke();
    let c = color(f.color);
    if (hoverBranch === i) {
      c = lerpColor(c, color(255), 0.3);
    }
    fill(c);

    // Simple horizontal ribbon
    beginShape();
    vertex(startX, currentY);
    vertex(branchEndX, currentY);
    vertex(branchEndX, currentY + h);
    vertex(startX, currentY + h);
    endShape(CLOSE);

    // Label on the right
    noStroke();
    fill(30);
    textSize(11);
    textAlign(LEFT, CENTER);
    let labelX = endX + 5;
    if (labelX + 100 > canvasWidth) {
      textAlign(RIGHT, CENTER);
      labelX = endX - 5;
    }

    // Abbreviated labels for small ribbons
    if (h > 8) {
      textAlign(LEFT, CENTER);
      fill(30);
      text(f.label + ' (' + nf(f.pct, 0, 1) + '%)', min(endX + 5, canvasWidth - 180), currentY + h / 2);
    }

    // Special: glow for photosynthesis
    if (i === flows.length - 1) {
      stroke(0, 200, 0, 100);
      strokeWeight(3);
      noFill();
      rect(endX - 5, currentY - 2, 10, h + 4, 3);
    }

    currentY += h;
  }

  // Hover tooltip
  if (hoverBranch >= 0 && hoverBranch < flows.length) {
    let f = flows[hoverBranch];
    let tooltipW = 260;
    let tooltipH = 50;
    let tx = constrain(mouseX + 10, 0, canvasWidth - tooltipW);
    let ty = constrain(mouseY - 50, 0, drawHeight - tooltipH);
    fill(255, 255, 220, 240);
    stroke(100);
    strokeWeight(1);
    rect(tx, ty, tooltipW, tooltipH, 5);
    noStroke();
    fill(30);
    textSize(12);
    textAlign(LEFT, TOP);
    text(f.label, tx + 8, ty + 6);
    text(nf(f.pct, 0, 1) + '% of incoming solar energy', tx + 8, ty + 24);
  }

  // Producers box
  let prodY = drawHeight - 35;
  fill(0, 180, 0, 40 + 60 * sin(frameCount * 0.05));
  stroke(0, 150, 0);
  strokeWeight(2);
  rect(endX - 60, prodY - 12, 55, 24, 5);
  noStroke();
  fill(0, 100, 0);
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Producers', endX - 33, prodY);

  // Arrow to producers
  stroke(0, 150, 0);
  strokeWeight(2);
  let arrowX = endX - 33;
  line(arrowX, currentY, arrowX, prodY - 14);
  line(arrowX - 5, prodY - 20, arrowX, prodY - 14);
  line(arrowX + 5, prodY - 20, arrowX, prodY - 14);

  // Control label
  noStroke();
  fill(30);
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Cloud Cover: ' + cloudSlider.value() + '%', 10, drawHeight + controlHeight / 2);
  cloudSlider.position(cloudSlider.elt.offsetLeft, drawHeight + controlHeight / 2 - 8);
}

function recalcFlows(cloudPct) {
  // Adjust flows based on cloud cover
  let reflected_atm = 6;
  let reflected_cloud = cloudPct; // slider value directly
  let absorbed_atm = 16;
  let reflected_surf = 4;
  let remaining = 100 - reflected_atm - reflected_cloud - absorbed_atm - reflected_surf;
  let photosynthesis = max(0.2, remaining * 0.018); // ~1-1.5%
  let absorbed_surf = remaining - photosynthesis;

  return [
    { label: 'Reflected by Atmosphere', pct: reflected_atm, color: '#8899AA' },
    { label: 'Reflected by Clouds', pct: reflected_cloud, color: '#AABBCC' },
    { label: 'Absorbed by Atmosphere', pct: absorbed_atm, color: '#CC8844' },
    { label: 'Reflected by Surface', pct: reflected_surf, color: '#BBAA88' },
    { label: 'Absorbed by Surface (heat)', pct: absorbed_surf, color: '#DD6644' },
    { label: 'Captured by Photosynthesis', pct: photosynthesis, color: '#44AA44' }
  ];
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
