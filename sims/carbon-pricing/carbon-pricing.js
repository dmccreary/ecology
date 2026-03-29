// Carbon Pricing Comparison MicroSim
// Evaluate: Compare carbon tax vs cap-and-trade
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let taxSlider, capSlider;
let runBtn, compareBtn, resetBtn;
let taxRate = 50;
let capLevel = 70; // percent of baseline
let simYear = 0;
let isRunning = false;
let taxEmissions = [];
let capEmissions = [];
let showCompare = false;

// Factory data: each has a cost curve (cost to reduce 1 unit)
let factories = [];
let numFactories = 5;
let baselineTotal = 100;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  initFactories();

  taxSlider = createSlider(0, 200, 50, 5);
  taxSlider.parent(document.querySelector('main'));
  taxSlider.style('width', '120px');
  taxSlider.input(() => { taxRate = taxSlider.value(); recalculate(); });

  capSlider = createSlider(20, 100, 70, 5);
  capSlider.parent(document.querySelector('main'));
  capSlider.style('width', '120px');
  capSlider.input(() => { capLevel = capSlider.value(); recalculate(); });

  runBtn = createButton('Run 10 Years');
  runBtn.parent(document.querySelector('main'));
  runBtn.mousePressed(runSimulation);

  compareBtn = createButton('Compare');
  compareBtn.parent(document.querySelector('main'));
  compareBtn.mousePressed(() => { showCompare = !showCompare; });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);

  recalculate();
  describe('Carbon Pricing Comparison: adjust tax rate and emission cap to compare policies', LABEL);
}

function initFactories() {
  factories = [];
  for (let i = 0; i < numFactories; i++) {
    factories.push({
      baseline: baselineTotal / numFactories,
      abatementCost: 20 + i * 30, // cost per unit to reduce
      taxEmission: baselineTotal / numFactories,
      capEmission: baselineTotal / numFactories,
      permits: 0
    });
  }
}

function recalculate() {
  // Carbon tax: each factory reduces if cost < tax rate
  for (let f of factories) {
    if (taxRate >= f.abatementCost) {
      f.taxEmission = f.baseline * max(0.1, 1 - (taxRate / (f.abatementCost + 100)));
    } else {
      f.taxEmission = f.baseline;
    }
  }

  // Cap and trade: total cap distributed, market price emerges
  let totalCap = baselineTotal * (capLevel / 100);
  let permitsEach = totalCap / numFactories;
  // Factories with low abatement cost reduce more and sell permits
  let totalAbatement = baselineTotal - totalCap;
  let sorted = [...factories].sort((a, b) => a.abatementCost - b.abatementCost);
  let remaining = totalAbatement;
  for (let f of factories) {
    f.capEmission = permitsEach;
    f.permits = permitsEach;
  }
  // Cheapest reducers take on more reduction
  for (let f of sorted) {
    let canReduce = min(remaining, f.baseline * 0.7);
    f.capEmission = max(f.baseline * 0.1, permitsEach - canReduce / numFactories);
    remaining -= canReduce / numFactories;
    if (remaining <= 0) break;
  }
}

function runSimulation() {
  taxEmissions = [];
  capEmissions = [];
  for (let yr = 0; yr <= 10; yr++) {
    let tRate = taxRate + yr * 5; // increasing tax
    let cLevel = capLevel - yr * 2; // decreasing cap

    let taxTotal = 0;
    let capTotal = 0;
    for (let f of factories) {
      let tE = (tRate >= f.abatementCost) ?
        f.baseline * max(0.1, 1 - (tRate / (f.abatementCost + 100))) : f.baseline;
      taxTotal += tE;

      let cap = baselineTotal * (max(20, cLevel) / 100);
      capTotal += cap / numFactories;
    }
    taxEmissions.push(taxTotal);
    capEmissions.push(capTotal);
  }
  simYear = 10;
}

function resetSim() {
  taxEmissions = [];
  capEmissions = [];
  simYear = 0;
  showCompare = false;
  taxSlider.value(50);
  capSlider.value(70);
  taxRate = 50;
  capLevel = 70;
  initFactories();
  recalculate();
}

function draw() {
  updateCanvasSize();
  background(245);
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  let halfW = canvasWidth / 2;

  // Divider
  stroke('#264653');
  strokeWeight(1);
  line(halfW, 25, halfW, drawHeight - 10);

  // Headers
  noStroke();
  fill('#457b9d');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Carbon Tax', halfW / 2, 8);
  fill('#2a9d8f');
  text('Cap & Trade', halfW + halfW / 2, 8);

  // Tax rate / cap level display
  fill('#264653');
  textSize(11);
  text('$' + taxRate + '/ton', halfW / 2, 25);
  text('Cap: ' + capLevel + '% of baseline', halfW + halfW / 2, 25);

  // Draw factories for each side
  let factoryY = 45;
  let factoryH = 55;
  let fW = (halfW - 30) / numFactories;

  for (let i = 0; i < numFactories; i++) {
    let f = factories[i];

    // Tax side factory
    let tx = 10 + i * fW;
    drawFactory(tx, factoryY, fW - 4, factoryH, f.taxEmission, f.baseline, '#457b9d');

    // Cap side factory
    let cx = halfW + 10 + i * fW;
    drawFactory(cx, factoryY, fW - 4, factoryH, f.capEmission, f.baseline, '#2a9d8f');
  }

  // Total emissions bars
  let barY = factoryY + factoryH + 15;
  let taxTotal = factories.reduce((s, f) => s + f.taxEmission, 0);
  let capTotal = factories.reduce((s, f) => s + f.capEmission, 0);

  noStroke();
  fill('#264653');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Total Emissions', halfW / 2, barY);
  text('Total Emissions', halfW + halfW / 2, barY);

  let barMaxW = halfW - 40;
  let bY = barY + 16;

  // Tax bar
  fill('#ddd');
  rect(15, bY, barMaxW, 14, 3);
  fill('#457b9d');
  rect(15, bY, barMaxW * (taxTotal / baselineTotal), 14, 3);
  fill('#264653');
  textSize(10);
  textAlign(LEFT, CENTER);
  text(taxTotal.toFixed(1) + ' / ' + baselineTotal, 18, bY + 7);

  // Cap bar
  fill('#ddd');
  rect(halfW + 15, bY, barMaxW, 14, 3);
  fill('#2a9d8f');
  rect(halfW + 15, bY, barMaxW * (capTotal / baselineTotal), 14, 3);
  fill('#264653');
  text(capTotal.toFixed(1) + ' / ' + baselineTotal, halfW + 18, bY + 7);

  // 10-year graph area
  let graphY = bY + 35;
  let graphH = drawHeight - graphY - 15;
  let graphW = canvasWidth - 2 * margin;

  fill(255);
  stroke('silver');
  strokeWeight(1);
  rect(margin, graphY, graphW, graphH, 4);

  noStroke();
  fill('#264653');
  textSize(12);
  textAlign(CENTER, TOP);
  text('10-Year Emissions Projection', canvasWidth / 2, graphY + 3);

  // Axes
  stroke('#ccc');
  strokeWeight(0.5);
  line(margin + 30, graphY + 20, margin + 30, graphY + graphH - 15);
  line(margin + 30, graphY + graphH - 15, margin + graphW - 10, graphY + graphH - 15);

  if (taxEmissions.length > 0) {
    let gx1 = margin + 35;
    let gx2 = margin + graphW - 15;
    let gy1 = graphY + 25;
    let gy2 = graphY + graphH - 20;

    // Tax line
    stroke('#457b9d');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < taxEmissions.length; i++) {
      let x = map(i, 0, 10, gx1, gx2);
      let y = map(taxEmissions[i], 0, baselineTotal, gy2, gy1);
      vertex(x, y);
    }
    endShape();

    // Cap line
    stroke('#2a9d8f');
    beginShape();
    for (let i = 0; i < capEmissions.length; i++) {
      let x = map(i, 0, 10, gx1, gx2);
      let y = map(capEmissions[i], 0, baselineTotal, gy2, gy1);
      vertex(x, y);
    }
    endShape();

    // Legend
    noStroke();
    fill('#457b9d');
    textSize(10);
    textAlign(LEFT, TOP);
    rect(gx2 - 90, gy1, 8, 8);
    fill('#264653');
    text('Carbon Tax', gx2 - 78, gy1 - 1);
    fill('#2a9d8f');
    rect(gx2 - 90, gy1 + 14, 8, 8);
    fill('#264653');
    text('Cap & Trade', gx2 - 78, gy1 + 13);

    // Year labels
    fill('#6c757d');
    textSize(9);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 10; i += 2) {
      let x = map(i, 0, 10, gx1, gx2);
      text('Yr ' + i, x, gy2 + 3);
    }
  } else {
    noStroke();
    fill('#adb5bd');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Click "Run 10 Years" to see projection', canvasWidth / 2, graphY + graphH / 2 + 10);
  }

  // Control area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();
  fill('#264653');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Tax $/ton:', 10, drawHeight + 15);
  text('Cap %:', canvasWidth * 0.45, drawHeight + 15);

  positionControls();
}

function drawFactory(x, y, w, h, emission, baseline, col) {
  // Factory body
  noStroke();
  fill('#6c757d');
  rect(x, y + h * 0.3, w, h * 0.7, 2);

  // Smokestack
  fill('#888');
  rect(x + w * 0.35, y, w * 0.3, h * 0.35);

  // Emission cloud (size based on emission level)
  let emRatio = emission / baseline;
  fill(255, 100, 100, 80 + 120 * emRatio);
  let cloudSize = w * 0.3 * emRatio;
  ellipse(x + w * 0.5, y - cloudSize * 0.3, cloudSize * 1.5, cloudSize);

  // Emission number
  noStroke();
  fill(col);
  textSize(9);
  textAlign(CENTER, TOP);
  text(emission.toFixed(1), x + w / 2, y + h + 2);
}

function positionControls() {
  let ox = canvasOffsetX();
  let oy = canvasOffsetY();
  // Row 1: tax slider + cap slider
  taxSlider.position(ox + 80, oy + drawHeight + 5);
  taxSlider.size(canvasWidth * 0.3);
  capSlider.position(ox + canvasWidth * 0.52, oy + drawHeight + 5);
  capSlider.size(canvasWidth * 0.3);
  // Row 2: buttons
  runBtn.position(ox + 10, oy + drawHeight + 45);
  compareBtn.position(ox + 120, oy + drawHeight + 45);
  resetBtn.position(ox + 210, oy + drawHeight + 45);
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
