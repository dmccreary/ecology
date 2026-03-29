// Age Structure Diagram Explorer
// Interactive population pyramids for different countries

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

let countrySelect;
let currentCountry = 0;
let animProgress = 1;

// Age groups (5-year increments)
const ageGroups = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39',
                   '40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80+'];

// Country data: [male%, female%] per age group (approximate real data, normalized to percentages)
const countries = {
  'Nigeria': {
    pop: '223M', median: 18, tfr: 5.1, dep: 86, proj2050: '375M',
    male: [8.5,7.5,6.8,6.0,5.2,4.4,3.6,3.0,2.4,1.9,1.5,1.1,0.8,0.5,0.3,0.2,0.1],
    female:[8.2,7.3,6.6,5.8,5.1,4.3,3.6,3.0,2.5,2.0,1.6,1.2,0.9,0.6,0.4,0.3,0.2]
  },
  'India': {
    pop: '1.43B', median: 28, tfr: 2.0, dep: 47, proj2050: '1.67B',
    male: [4.2,4.3,4.5,4.7,4.6,4.4,4.1,3.7,3.2,2.7,2.2,1.8,1.4,1.0,0.7,0.4,0.3],
    female:[3.8,4.0,4.2,4.3,4.3,4.2,3.9,3.5,3.1,2.6,2.2,1.8,1.4,1.1,0.8,0.5,0.4]
  },
  'USA': {
    pop: '335M', median: 38, tfr: 1.7, dep: 54, proj2050: '370M',
    male: [2.9,3.0,3.1,3.2,3.3,3.4,3.3,3.2,3.0,3.1,3.3,3.2,2.8,2.3,1.7,1.1,0.8],
    female:[2.8,2.9,3.0,3.0,3.1,3.2,3.2,3.1,3.0,3.1,3.4,3.3,3.0,2.5,2.0,1.4,1.3]
  },
  'Japan': {
    pop: '125M', median: 49, tfr: 1.2, dep: 70, proj2050: '104M',
    male: [1.9,2.0,2.2,2.4,2.5,2.8,3.0,3.1,3.5,3.6,3.2,2.8,3.5,3.8,3.4,2.5,2.0],
    female:[1.8,1.9,2.1,2.3,2.4,2.7,2.9,3.0,3.4,3.5,3.2,2.9,3.6,4.0,3.8,3.1,3.2]
  },
  'China': {
    pop: '1.41B', median: 39, tfr: 1.0, dep: 44, proj2050: '1.31B',
    male: [2.4,2.6,2.8,2.7,3.0,3.7,3.9,3.6,4.0,4.2,3.8,3.2,3.5,2.4,1.5,0.9,0.5],
    female:[2.2,2.4,2.6,2.5,2.8,3.5,3.7,3.5,3.9,4.1,3.7,3.2,3.5,2.5,1.7,1.1,0.8]
  },
  'Sweden': {
    pop: '10.5M', median: 41, tfr: 1.7, dep: 59, proj2050: '11.5M',
    male: [2.8,2.9,2.8,2.8,3.1,3.4,3.5,3.3,3.0,3.1,3.2,3.0,2.8,2.6,2.3,1.7,1.4],
    female:[2.7,2.8,2.7,2.7,3.0,3.3,3.3,3.2,2.9,3.0,3.1,2.9,2.8,2.7,2.5,2.0,1.8]
  }
};

const countryNames = Object.keys(countries);
let displayMale, displayFemale;
let targetMale, targetFemale;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Age structure population pyramid explorer for different countries', LABEL);

  countrySelect = createSelect();
  countrySelect.parent(document.querySelector('main'));
  countrySelect.position(10, drawHeight + 10);
  for (let name of countryNames) {
    countrySelect.option(name);
  }
  countrySelect.changed(onCountryChange);

  let c = countries[countryNames[0]];
  displayMale = [...c.male];
  displayFemale = [...c.female];
  targetMale = [...c.male];
  targetFemale = [...c.female];
}

function onCountryChange() {
  let name = countrySelect.value();
  let c = countries[name];
  targetMale = [...c.male];
  targetFemale = [...c.female];
  animProgress = 0;
}

function draw() {
  updateCanvasSize();

  // Animate transition
  if (animProgress < 1) {
    animProgress += 0.05;
    animProgress = min(animProgress, 1);
    for (let i = 0; i < ageGroups.length; i++) {
      displayMale[i] = lerp(displayMale[i], targetMale[i], 0.1);
      displayFemale[i] = lerp(displayFemale[i], targetFemale[i], 0.1);
    }
  }

  // Draw areas
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let name = countrySelect.value();
  let c = countries[name];

  // Title
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Age Structure: ' + name, canvasWidth / 2, 5);

  // Pyramid layout
  let pyrTop = 30;
  let pyrBottom = drawHeight - 110;
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

    // Highlight reproductive age (15-49)
    let isRepro = (i >= 3 && i <= 9);

    // Male (left)
    noStroke();
    if (isRepro) fill(70, 100, 200);
    else fill(100, 140, 220);
    rect(centerX - maleW - 2, y, maleW, barH);

    // Female (right)
    if (isRepro) fill(200, 80, 120);
    else fill(220, 130, 160);
    rect(centerX + 2, y, femaleW, barH);

    // Age label
    fill(0);
    textSize(9);
    textAlign(CENTER, CENTER);
    text(ageGroups[i], centerX, y + barH / 2);
  }

  // Axis labels
  noStroke();
  fill(70, 100, 200);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Male', margin + 30, pyrBottom + 3);
  fill(200, 80, 120);
  text('Female', canvasWidth - margin - 30, pyrBottom + 3);

  // Statistics panel
  let statY = pyrBottom + 20;
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  let col1 = margin;
  let col2 = canvasWidth / 2 + 10;
  text('Population: ' + c.pop, col1, statY);
  text('Median Age: ' + c.median, col2, statY);
  text('Dependency Ratio: ' + c.dep + '%', col1, statY + 18);
  text('TFR: ' + c.tfr, col2, statY + 18);
  text('Projected 2050: ' + c.proj2050, col1, statY + 36);

  // Legend
  textSize(10);
  fill(70, 100, 200);
  rect(col2, statY + 36, 10, 10);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text('Reproductive age (15-49)', col2 + 14, statY + 41);
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
