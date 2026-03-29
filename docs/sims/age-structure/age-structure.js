// Age Structure Diagram Explorer
// Interactive population pyramids with compare mode for 10 diverse countries

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let countrySelect;
let compareSelect;
let compareBtn;
let compareMode = false;
let animProgress = 1;
let animProgress2 = 1;

// Age groups (5-year increments)
const ageGroups = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39',
                   '40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80+'];

// 10 countries chosen for maximum demographic variety:
// - Nigeria: extreme youth bulge (expansive pyramid)
// - Niger: highest TFR in the world (ultra-expansive)
// - India: transitioning from expansive to stationary
// - Brazil: mid-transition with narrowing base
// - USA: near-stationary with baby boom echo
// - China: constrictive base from one-child policy
// - Japan: extreme aging / inverted pyramid
// - Germany: aging European profile with immigration bulge
// - UAE: massive working-age male surplus from labor migration
// - Italy: lowest-low fertility, extreme aging
const countries = {
  'Nigeria': {
    pop: '223M', median: 18, tfr: 5.1, dep: 86, proj2050: '375M',
    shape: 'Expansive', note: 'Classic youth bulge — rapid growth',
    male:   [8.5,7.5,6.8,6.0,5.2,4.4,3.6,3.0,2.4,1.9,1.5,1.1,0.8,0.5,0.3,0.2,0.1],
    female: [8.2,7.3,6.6,5.8,5.1,4.3,3.6,3.0,2.5,2.0,1.6,1.2,0.9,0.6,0.4,0.3,0.2]
  },
  'Niger': {
    pop: '27M', median: 15, tfr: 6.7, dep: 110, proj2050: '66M',
    shape: 'Ultra-expansive', note: 'Highest TFR in the world',
    male:   [9.5,8.3,7.2,6.2,5.1,4.1,3.3,2.6,2.0,1.5,1.1,0.8,0.5,0.3,0.2,0.1,0.05],
    female: [9.2,8.1,7.0,6.1,5.0,4.1,3.4,2.7,2.1,1.6,1.2,0.9,0.6,0.4,0.2,0.1,0.08]
  },
  'India': {
    pop: '1.43B', median: 28, tfr: 2.0, dep: 47, proj2050: '1.67B',
    shape: 'Transitioning', note: 'Narrowing base — approaching replacement',
    male:   [4.2,4.3,4.5,4.7,4.6,4.4,4.1,3.7,3.2,2.7,2.2,1.8,1.4,1.0,0.7,0.4,0.3],
    female: [3.8,4.0,4.2,4.3,4.3,4.2,3.9,3.5,3.1,2.6,2.2,1.8,1.4,1.1,0.8,0.5,0.4]
  },
  'Brazil': {
    pop: '216M', median: 34, tfr: 1.6, dep: 44, proj2050: '229M',
    shape: 'Late transition', note: 'Below replacement — aging rapidly',
    male:   [3.2,3.4,3.6,3.8,4.0,4.2,4.1,3.9,3.6,3.3,3.0,2.6,2.2,1.7,1.2,0.7,0.4],
    female: [3.0,3.2,3.4,3.6,3.8,4.0,4.0,3.9,3.6,3.4,3.1,2.8,2.4,1.9,1.4,0.9,0.6]
  },
  'USA': {
    pop: '335M', median: 38, tfr: 1.7, dep: 54, proj2050: '370M',
    shape: 'Near-stationary', note: 'Baby boom echo visible at 55-69',
    male:   [2.9,3.0,3.1,3.2,3.3,3.4,3.3,3.2,3.0,3.1,3.3,3.2,2.8,2.3,1.7,1.1,0.8],
    female: [2.8,2.9,3.0,3.0,3.1,3.2,3.2,3.1,3.0,3.1,3.4,3.3,3.0,2.5,2.0,1.4,1.3]
  },
  'China': {
    pop: '1.41B', median: 39, tfr: 1.0, dep: 44, proj2050: '1.31B',
    shape: 'Constrictive', note: 'One-child policy created narrow base',
    male:   [2.4,2.6,2.8,2.7,3.0,3.7,3.9,3.6,4.0,4.2,3.8,3.2,3.5,2.4,1.5,0.9,0.5],
    female: [2.2,2.4,2.6,2.5,2.8,3.5,3.7,3.5,3.9,4.1,3.7,3.2,3.5,2.5,1.7,1.1,0.8]
  },
  'UAE': {
    pop: '10M', median: 33, tfr: 1.4, dep: 18, proj2050: '11M',
    shape: 'Labor migration bulge', note: 'Massive male surplus ages 25-49',
    male:   [2.5,2.4,2.3,2.8,5.8,8.2,8.5,7.8,6.5,5.0,3.2,1.8,1.0,0.5,0.3,0.1,0.05],
    female: [2.4,2.3,2.2,2.5,3.5,3.8,3.6,3.2,2.8,2.3,1.7,1.2,0.7,0.4,0.2,0.1,0.05]
  },
  'Germany': {
    pop: '84M', median: 46, tfr: 1.5, dep: 56, proj2050: '80M',
    shape: 'Aging with immigration', note: 'Immigration fills working-age gap',
    male:   [2.3,2.3,2.4,2.5,2.8,3.2,3.5,3.4,3.0,3.0,3.3,3.5,3.3,2.8,2.2,1.5,1.2],
    female: [2.2,2.2,2.3,2.4,2.6,2.9,3.2,3.1,2.9,2.9,3.2,3.4,3.3,3.0,2.5,1.9,1.8]
  },
  'Japan': {
    pop: '125M', median: 49, tfr: 1.2, dep: 70, proj2050: '104M',
    shape: 'Inverted / Aging', note: 'World\'s oldest population — shrinking',
    male:   [1.9,2.0,2.2,2.4,2.5,2.8,3.0,3.1,3.5,3.6,3.2,2.8,3.5,3.8,3.4,2.5,2.0],
    female: [1.8,1.9,2.1,2.3,2.4,2.7,2.9,3.0,3.4,3.5,3.2,2.9,3.6,4.0,3.8,3.1,3.2]
  },
  'Italy': {
    pop: '59M', median: 48, tfr: 1.2, dep: 57, proj2050: '50M',
    shape: 'Extreme aging', note: 'Lowest-low fertility — population decline',
    male:   [2.0,2.1,2.2,2.3,2.4,2.6,2.8,3.0,3.3,3.6,3.8,3.6,3.2,2.9,2.5,1.8,1.4],
    female: [1.9,2.0,2.1,2.2,2.3,2.5,2.7,2.9,3.2,3.5,3.7,3.6,3.3,3.1,2.8,2.2,2.1]
  }
};

const countryNames = Object.keys(countries);

// Display arrays for animated transitions
let displayMale, displayFemale;
let targetMale, targetFemale;
let displayMale2, displayFemale2;
let targetMale2, targetFemale2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Age structure population pyramid explorer comparing demographics of 10 countries', LABEL);

  // Country select (left)
  countrySelect = createSelect();
  countrySelect.position(10, drawHeight + 12);
  for (let name of countryNames) {
    countrySelect.option(name);
  }
  countrySelect.changed(onCountryChange);

  // Compare button
  compareBtn = createButton('Compare');
  compareBtn.position(160, drawHeight + 12);
  compareBtn.mousePressed(toggleCompare);

  // Second country select (hidden initially)
  compareSelect = createSelect();
  compareSelect.position(240, drawHeight + 12);
  for (let name of countryNames) {
    compareSelect.option(name);
  }
  compareSelect.selected('Japan');
  compareSelect.changed(onCompareChange);
  compareSelect.hide();

  // Initialize display data
  let c = countries[countryNames[0]];
  displayMale = [...c.male];
  displayFemale = [...c.female];
  targetMale = [...c.male];
  targetFemale = [...c.female];

  let c2 = countries['Japan'];
  displayMale2 = [...c2.male];
  displayFemale2 = [...c2.female];
  targetMale2 = [...c2.male];
  targetFemale2 = [...c2.female];
}

function toggleCompare() {
  compareMode = !compareMode;
  if (compareMode) {
    compareBtn.html('Single');
    compareSelect.show();
    onCompareChange();
  } else {
    compareBtn.html('Compare');
    compareSelect.hide();
  }
}

function onCountryChange() {
  let c = countries[countrySelect.value()];
  targetMale = [...c.male];
  targetFemale = [...c.female];
  animProgress = 0;
}

function onCompareChange() {
  let c = countries[compareSelect.value()];
  targetMale2 = [...c.male];
  targetFemale2 = [...c.female];
  animProgress2 = 0;
}

function draw() {
  updateCanvasSize();

  // Animate transitions
  if (animProgress < 1) {
    animProgress = min(animProgress + 0.05, 1);
    for (let i = 0; i < ageGroups.length; i++) {
      displayMale[i] = lerp(displayMale[i], targetMale[i], 0.12);
      displayFemale[i] = lerp(displayFemale[i], targetFemale[i], 0.12);
    }
  }
  if (animProgress2 < 1) {
    animProgress2 = min(animProgress2 + 0.05, 1);
    for (let i = 0; i < ageGroups.length; i++) {
      displayMale2[i] = lerp(displayMale2[i], targetMale2[i], 0.12);
      displayFemale2[i] = lerp(displayFemale2[i], targetFemale2[i], 0.12);
    }
  }

  // Draw regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (compareMode) {
    drawCompareMode();
  } else {
    drawSingleMode();
  }
}

function drawSingleMode() {
  let name = countrySelect.value();
  let c = countries[name];

  // Title
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('Age Structure: ' + name, canvasWidth / 2, 5);

  // Shape label
  textSize(11);
  fill(100);
  text(c.shape + ' — ' + c.note, canvasWidth / 2, 23);

  // Pyramid layout
  let pyrTop = 42;
  let pyrBottom = drawHeight - 100;
  let pyrHeight = pyrBottom - pyrTop;
  let centerX = canvasWidth / 2;
  let maxBarW = centerX - margin - 30;
  let barH = pyrHeight / ageGroups.length - 1;

  let maxVal = 0;
  for (let i = 0; i < ageGroups.length; i++) {
    maxVal = max(maxVal, displayMale[i], displayFemale[i]);
  }
  maxVal = max(maxVal, 1);

  // Draw bars
  for (let i = 0; i < ageGroups.length; i++) {
    let y = pyrBottom - (i + 1) * (barH + 1);
    let maleW = map(displayMale[i], 0, maxVal, 0, maxBarW);
    let femaleW = map(displayFemale[i], 0, maxVal, 0, maxBarW);
    let isRepro = (i >= 3 && i <= 9);

    // Male (left)
    noStroke();
    fill(isRepro ? color(50, 90, 190) : color(100, 140, 220));
    rect(centerX - maleW - 2, y, maleW, barH);

    // Female (right)
    fill(isRepro ? color(190, 60, 100) : color(220, 130, 160));
    rect(centerX + 2, y, femaleW, barH);

    // Age label
    fill(60);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(ageGroups[i], centerX, y + barH / 2);
  }

  // Axis labels
  noStroke();
  fill(50, 90, 190);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Male ◀', margin + 40, pyrBottom + 3);
  fill(190, 60, 100);
  text('▶ Female', canvasWidth - margin - 40, pyrBottom + 3);

  // Statistics panel
  drawStats(c, name, margin, pyrBottom + 22, canvasWidth / 2 + 10);
}

function drawCompareMode() {
  let name1 = countrySelect.value();
  let name2 = compareSelect.value();
  let c1 = countries[name1];
  let c2 = countries[name2];

  // Title
  noStroke();
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text(name1 + '  vs  ' + name2, canvasWidth / 2, 5);

  // Pyramid layout — side by side
  let pyrTop = 28;
  let pyrBottom = drawHeight - 100;
  let pyrHeight = pyrBottom - pyrTop;
  let halfW = canvasWidth / 2;
  let barH = pyrHeight / ageGroups.length - 1;

  // Find global max for consistent scale
  let maxVal = 0;
  for (let i = 0; i < ageGroups.length; i++) {
    maxVal = max(maxVal, displayMale[i], displayFemale[i], displayMale2[i], displayFemale2[i]);
  }
  maxVal = max(maxVal, 1);

  // Left pyramid (country 1)
  let center1 = halfW / 2;
  let maxBar1 = center1 - 25;
  drawPyramid(displayMale, displayFemale, center1, maxBar1, barH, pyrTop, pyrBottom, maxVal,
    color(50, 90, 190), color(100, 140, 220), color(190, 60, 100), color(220, 130, 160));

  // Country 1 label
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER, TOP);
  text(name1, center1, pyrTop - 14);
  textSize(9);
  fill(100);
  text(c1.shape, center1, pyrTop - 3);

  // Right pyramid (country 2)
  let center2 = halfW + halfW / 2;
  let maxBar2 = center2 - halfW - 25;
  if (maxBar2 < 30) maxBar2 = halfW / 2 - 25;
  drawPyramid(displayMale2, displayFemale2, center2, maxBar2, barH, pyrTop, pyrBottom, maxVal,
    color(30, 120, 70), color(80, 170, 110), color(160, 90, 30), color(200, 140, 70));

  // Country 2 label
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER, TOP);
  text(name2, center2, pyrTop - 14);
  textSize(9);
  fill(100);
  text(c2.shape, center2, pyrTop - 3);

  // Divider line
  stroke(200);
  strokeWeight(1);
  line(halfW, pyrTop - 14, halfW, pyrBottom);

  // Stats comparison
  let statY = pyrBottom + 8;
  noStroke();
  fill(0);
  textSize(10);

  // Left stats
  textAlign(LEFT, TOP);
  text('Pop: ' + c1.pop, 8, statY);
  text('Median: ' + c1.median, 8, statY + 14);
  text('TFR: ' + c1.tfr, 8, statY + 28);
  text('Dep: ' + c1.dep + '%', 8, statY + 42);

  textAlign(RIGHT, TOP);
  text('2050: ' + c1.proj2050, halfW - 8, statY);

  // Right stats
  textAlign(LEFT, TOP);
  text('Pop: ' + c2.pop, halfW + 8, statY);
  text('Median: ' + c2.median, halfW + 8, statY + 14);
  text('TFR: ' + c2.tfr, halfW + 8, statY + 28);
  text('Dep: ' + c2.dep + '%', halfW + 8, statY + 42);

  textAlign(RIGHT, TOP);
  text('2050: ' + c2.proj2050, canvasWidth - 8, statY);

  // Comparison insight
  let medianDiff = abs(c1.median - c2.median);
  let tfrDiff = abs(c1.tfr - c2.tfr).toFixed(1);
  noStroke();
  fill(80);
  textSize(10);
  textAlign(CENTER, TOP);
  text('Median age gap: ' + medianDiff + ' years  |  TFR gap: ' + tfrDiff, canvasWidth / 2, statY + 60);

  // Legend
  textSize(9);
  noStroke();
  fill(50, 90, 190);
  rect(8, statY + 75, 8, 8);
  fill(0);
  textAlign(LEFT, CENTER);
  text('Repro age (15-49)', 20, statY + 79);
}

function drawPyramid(maleData, femaleData, centerX, maxBarW, barH, pyrTop, pyrBottom, maxVal,
  maleRepro, maleNorm, femaleRepro, femaleNorm) {
  for (let i = 0; i < ageGroups.length; i++) {
    let y = pyrBottom - (i + 1) * (barH + 1);
    let maleW = map(maleData[i], 0, maxVal, 0, maxBarW);
    let femaleW = map(femaleData[i], 0, maxVal, 0, maxBarW);
    let isRepro = (i >= 3 && i <= 9);

    noStroke();
    fill(isRepro ? maleRepro : maleNorm);
    rect(centerX - maleW - 1, y, maleW, barH);

    fill(isRepro ? femaleRepro : femaleNorm);
    rect(centerX + 1, y, femaleW, barH);

    // Age label (only show every other in compare mode for readability)
    if (i % 2 === 0) {
      fill(60);
      noStroke();
      textSize(7);
      textAlign(CENTER, CENTER);
      text(ageGroups[i], centerX, y + barH / 2);
    }
  }
}

function drawStats(c, name, col1, statY, col2) {
  noStroke();
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text('Population: ' + c.pop, col1, statY);
  text('Median Age: ' + c.median, col2, statY);
  text('Dependency Ratio: ' + c.dep + '%', col1, statY + 16);
  text('TFR: ' + c.tfr, col2, statY + 16);
  text('Projected 2050: ' + c.proj2050, col1, statY + 32);

  // Legend
  textSize(10);
  noStroke();
  fill(50, 90, 190);
  rect(col2, statY + 32, 10, 10);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text('Reproductive age (15-49)', col2 + 14, statY + 37);

  // Shape description
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Shape: ' + c.shape, col1, statY + 50);
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
