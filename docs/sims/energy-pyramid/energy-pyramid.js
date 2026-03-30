// Energy Pyramid Simulator
// CANVAS_HEIGHT: 530
// Interactive pyramid with adjustable energy input and transfer efficiency

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

let energySlider, efficiencySlider;
let viewMode = 'energy'; // 'energy', 'biomass', 'numbers'
let viewSelect;

let trophicLevels = [
  { name: 'Producers', example: 'Grasses, Trees', color: '#2e7d32', numberFactor: 10000 },
  { name: 'Primary Consumers', example: 'Rabbits, Deer', color: '#4caf50', numberFactor: 500 },
  { name: 'Secondary Consumers', example: 'Snakes, Foxes', color: '#ff9800', numberFactor: 50 },
  { name: 'Tertiary Consumers', example: 'Hawks, Wolves', color: '#f44336', numberFactor: 5 },
  { name: 'Quaternary Consumers', example: 'Apex predators', color: '#b71c1c', numberFactor: 1 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  let mainEl = document.querySelector('main');

  // Producer energy slider
  energySlider = createSlider(1000, 100000, 10000, 1000);
  energySlider.parent(mainEl);
  energySlider.position(160, drawHeight + 5);
  energySlider.size(canvasWidth - 160 - margin);

  // Efficiency slider
  efficiencySlider = createSlider(5, 20, 10, 1);
  efficiencySlider.parent(mainEl);
  efficiencySlider.position(160, drawHeight + 40);
  efficiencySlider.size(canvasWidth / 2 - 160 - 10);

  // View mode select
  viewSelect = createSelect();
  viewSelect.parent(mainEl);
  viewSelect.position(canvasWidth / 2 + 50, drawHeight + 40);
  viewSelect.option('Energy (kcal)');
  viewSelect.option('Biomass (kg)');
  viewSelect.option('Numbers');
  viewSelect.changed(() => {
    let v = viewSelect.value();
    if (v.startsWith('Energy')) viewMode = 'energy';
    else if (v.startsWith('Biomass')) viewMode = 'biomass';
    else viewMode = 'numbers';
  });
  viewSelect.style('font-size', '13px');
  viewSelect.style('padding', '3px');

  describe('Energy pyramid simulator showing energy transfer between trophic levels with adjustable efficiency', LABEL);
}

function draw() {
  updateCanvasSize();

  let baseEnergy = energySlider.value();
  let efficiency = efficiencySlider.value() / 100;

  // Calculate values for each level
  let values = [];
  for (let i = 0; i < trophicLevels.length; i++) {
    let energy = baseEnergy * Math.pow(efficiency, i);
    values.push(energy);
  }

  // Background
  fill('#f9f6f0');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('#3e2723');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  let titleMap = { energy: 'Energy Pyramid', biomass: 'Biomass Pyramid', numbers: 'Numbers Pyramid' };
  text(titleMap[viewMode], canvasWidth / 2, 6);
  textStyle(NORMAL);

  // Efficiency label
  textSize(13);
  fill('#5d4037');
  text('Transfer Efficiency: ' + Math.round(efficiency * 100) + '%', canvasWidth / 2, 28);

  // Pyramid area
  let pyrX = margin;
  let pyrY = 50;
  let pyrW = canvasWidth * 0.58;
  let pyrH = drawHeight - 70;
  let levelH = pyrH / trophicLevels.length;
  let maxBarW = pyrW - 20;

  for (let i = 0; i < trophicLevels.length; i++) {
    let lvl = trophicLevels[i];
    let levelIdx = trophicLevels.length - 1 - i; // Draw bottom to top
    let val = values[levelIdx];
    let displayVal;
    let barWidthRatio;

    if (viewMode === 'energy') {
      barWidthRatio = val / baseEnergy;
      displayVal = formatNumber(val) + ' kcal';
    } else if (viewMode === 'biomass') {
      let biomass = val * 0.001; // rough conversion
      barWidthRatio = val / baseEnergy;
      displayVal = formatNumber(biomass) + ' kg';
    } else {
      let nums = lvl.numberFactor * Math.pow(efficiency, levelIdx) * (baseEnergy / 10000);
      barWidthRatio = nums / (trophicLevels[0].numberFactor * baseEnergy / 10000);
      displayVal = formatNumber(nums);
    }

    let barW = max(40, maxBarW * barWidthRatio);
    let barX = pyrX + (pyrW - barW) / 2;
    let barY = pyrY + i * levelH;

    // Bar
    fill(trophicLevels[levelIdx].color);
    noStroke();
    rect(barX, barY + 2, barW, levelH - 4, 4);

    // Level name and value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(max(10, min(13, barW / 12)));
    textStyle(BOLD);
    text(trophicLevels[levelIdx].name, barX + barW / 2, barY + levelH * 0.35);
    textStyle(NORMAL);
    textSize(max(9, min(11, barW / 14)));
    text(displayVal, barX + barW / 2, barY + levelH * 0.65);

    // Percentage label to the right
    let pct = (val / baseEnergy * 100);
    if (viewMode !== 'numbers') {
      noStroke();
      fill('#5d4037');
      textAlign(LEFT, CENTER);
      textSize(11);
      text(pct.toFixed(pct < 1 ? 2 : 1) + '% of original', barX + barW + 8, barY + levelH / 2);
    }
  }

  // Side panel - calculations
  let sideX = canvasWidth * 0.62;
  let sideW = canvasWidth * 0.36;
  let sideY = 50;
  let sideH = pyrH;

  fill('#ffffff');
  stroke('#a1887f');
  strokeWeight(1);
  rect(sideX, sideY, sideW, sideH, 8);

  noStroke();
  fill('#3e2723');
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Calculations', sideX + 10, sideY + 8);
  textStyle(NORMAL);

  let ty = sideY + 30;
  textSize(11);

  for (let i = 0; i < trophicLevels.length; i++) {
    let lvl = trophicLevels[i];
    let val = values[i];

    fill(lvl.color);
    noStroke();
    rect(sideX + 10, ty, 10, 10, 2);

    fill('#3e2723');
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text(lvl.name, sideX + 24, ty);
    textStyle(NORMAL);
    ty += 14;

    textSize(10);
    fill('#5d4037');
    if (i === 0) {
      text(formatNumber(val) + ' kcal (input)', sideX + 24, ty);
    } else {
      text(formatNumber(values[i - 1]) + ' x ' + (efficiency * 100) + '% = ' + formatNumber(val) + ' kcal', sideX + 24, ty);
    }
    ty += 14;

    fill('#9e9e9e');
    textSize(9);
    text(lvl.example, sideX + 24, ty);
    ty += 18;
  }

  // Energy lost annotation
  ty += 8;
  fill('#e53935');
  textSize(11);
  textStyle(BOLD);
  text('Energy lost as heat:', sideX + 10, ty);
  textStyle(NORMAL);
  ty += 16;
  textSize(10);
  fill('#3e2723');
  let totalLost = baseEnergy - values[values.length - 1];
  text(formatNumber(totalLost) + ' kcal (' + (totalLost / baseEnergy * 100).toFixed(2) + '%)', sideX + 10, ty);
  ty += 14;
  text('of producer energy is lost', sideX + 10, ty);

  // Control region
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Control labels
  noStroke();
  fill('#3e2723');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Producer Energy: ' + energySlider.value(), 10, drawHeight + 16);
  text('Efficiency: ' + efficiencySlider.value() + '%', 10, drawHeight + 51);
  text('View:', canvasWidth / 2 + 10, drawHeight + 51);
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  if (n >= 1) return Math.round(n).toLocaleString();
  return n.toFixed(3);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  energySlider.size(canvasWidth - 160 - margin);
  efficiencySlider.size(canvasWidth / 2 - 160 - 10);
  viewSelect.position(canvasWidth / 2 + 50, drawHeight + 40);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
