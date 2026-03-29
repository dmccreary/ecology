// Climate Solutions Pathway MicroSim
// Evaluate: Assess relative impact of climate solutions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let solutions = [];
let categories = ['Energy', 'Transport', 'Land Use', 'Industry', 'Policy'];
let catColors, bauColor, moderateColor, strongColor;
let viewToggle;
let resetBtn;
let tempBaseline = 4.0; // degrees warming by 2100 under BAU
let graphData = [];
let showAdaptation = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  bauColor = color('#e63946');
  moderateColor = color('#f4a261');
  strongColor = color('#2a9d8f');

  catColors = {
    'Energy': color('#1d3557'),
    'Transport': color('#457b9d'),
    'Land Use': color('#2a9d8f'),
    'Industry': color('#a8dadc'),
    'Policy': color('#f4a261')
  };

  solutions = [
    { name: 'Solar/Wind Power', cat: 'Energy', gtCO2: 6.0, adoption: 0.25, active: false },
    { name: 'Electric Vehicles', cat: 'Transport', gtCO2: 3.5, adoption: 0.15, active: false },
    { name: 'Public Transit', cat: 'Transport', gtCO2: 2.0, adoption: 0.30, active: false },
    { name: 'Reforestation', cat: 'Land Use', gtCO2: 4.0, adoption: 0.10, active: false },
    { name: 'Regenerative Ag', cat: 'Land Use', gtCO2: 3.0, adoption: 0.08, active: false },
    { name: 'Green Buildings', cat: 'Industry', gtCO2: 2.5, adoption: 0.20, active: false },
    { name: 'Industrial CCS', cat: 'Industry', gtCO2: 3.5, adoption: 0.05, active: false },
    { name: 'Carbon Price', cat: 'Policy', gtCO2: 5.0, adoption: 0.12, active: false },
    { name: 'Methane Rules', cat: 'Policy', gtCO2: 2.5, adoption: 0.18, active: false },
    { name: 'Grid Storage', cat: 'Energy', gtCO2: 2.0, adoption: 0.08, active: false }
  ];

  viewToggle = createCheckbox(' Show Adaptation View', false);
  viewToggle.parent(document.querySelector('main'));
  viewToggle.changed(() => { showAdaptation = viewToggle.checked(); });

  resetBtn = createButton('Reset All');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    for (let s of solutions) s.active = false;
  });

  describe('Climate Solutions Pathway: click solutions to see temperature impact', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill('#264653');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Climate Solutions Pathway', canvasWidth / 2, 8);

  // Calculate total reduction
  let totalReduction = 0;
  let totalPossible = 0;
  for (let s of solutions) {
    totalPossible += s.gtCO2;
    if (s.active) totalReduction += s.gtCO2;
  }

  // Temperature pathway (top section)
  let pathY = 40;
  let pathH = 120;
  let projectedTemp = max(1.5, tempBaseline - (totalReduction / totalPossible) * (tempBaseline - 1.5));

  // Draw temperature scale
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  fill('#264653');
  text('Projected Warming by 2100', margin, pathY + 5);

  // BAU bar
  let barX = margin;
  let barW = canvasWidth - 2 * margin;
  let barY = pathY + 25;
  let barH = 25;

  // Background gradient bar
  for (let i = 0; i < barW; i++) {
    let t = i / barW;
    let c = lerpColor(strongColor, bauColor, t);
    stroke(c);
    line(barX + i, barY, barX + i, barY + barH);
  }

  // Temperature markers
  noStroke();
  fill('#264653');
  textSize(11);
  textAlign(CENTER, TOP);
  for (let temp = 1.5; temp <= 4.0; temp += 0.5) {
    let x = map(temp, 1.5, 4.0, barX, barX + barW);
    stroke('#264653');
    line(x, barY + barH, x, barY + barH + 5);
    noStroke();
    text(temp.toFixed(1) + '\u00B0C', x, barY + barH + 7);
  }

  // Current projection marker
  let projX = map(projectedTemp, 1.5, 4.0, barX, barX + barW);
  fill('#264653');
  noStroke();
  triangle(projX - 8, barY - 2, projX + 8, barY - 2, projX, barY + 5);
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text(projectedTemp.toFixed(1) + '\u00B0C', projX, barY - 4);

  // BAU label
  textSize(10);
  textAlign(RIGHT, CENTER);
  fill(bauColor);
  text('BAU: ' + tempBaseline.toFixed(1) + '\u00B0C', barX + barW, barY - 8);

  // Solution cards area
  let cardStartY = pathY + pathH;
  let cardW = (canvasWidth - 3 * margin) / 2;
  let cardH = 38;
  let gap = 4;

  if (showAdaptation) {
    // Adaptation view
    noStroke();
    fill('#264653');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Adaptation Strategies', canvasWidth / 2, cardStartY);

    let adaptations = [
      { name: 'Flood barriers & levees', desc: 'Protect coastal cities' },
      { name: 'Drought-resistant crops', desc: 'Food security' },
      { name: 'Urban heat management', desc: 'Green roofs, cool pavements' },
      { name: 'Ecosystem corridors', desc: 'Species migration paths' },
      { name: 'Early warning systems', desc: 'Extreme weather alerts' },
      { name: 'Water conservation', desc: 'Reclamation & efficiency' }
    ];

    for (let i = 0; i < adaptations.length; i++) {
      let col = i % 2;
      let row = floor(i / 2);
      let x = margin + col * (cardW + margin);
      let y = cardStartY + 25 + row * (cardH + gap);

      fill(230, 245, 240);
      stroke('#2a9d8f');
      strokeWeight(1);
      rect(x, y, cardW, cardH, 5);

      noStroke();
      fill('#264653');
      textSize(12);
      textAlign(LEFT, TOP);
      text(adaptations[i].name, x + 8, y + 5);
      fill('#6c757d');
      textSize(10);
      text(adaptations[i].desc, x + 8, y + 22);
    }
  } else {
    // Mitigation solutions view
    noStroke();
    fill('#264653');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Click solutions to activate (Total: ' + totalReduction.toFixed(1) + ' Gt CO\u2082/yr reduced)', canvasWidth / 2, cardStartY);

    for (let i = 0; i < solutions.length; i++) {
      let s = solutions[i];
      let col = i % 2;
      let row = floor(i / 2);
      let x = margin + col * (cardW + margin);
      let y = cardStartY + 25 + row * (cardH + gap);

      // Card background
      if (s.active) {
        fill(catColors[s.cat]);
        stroke(catColors[s.cat]);
      } else {
        fill(240);
        stroke(200);
      }
      strokeWeight(1);
      rect(x, y, cardW, cardH, 5);

      // Text
      noStroke();
      fill(s.active ? 255 : '#264653');
      textSize(11);
      textAlign(LEFT, TOP);
      text(s.name, x + 8, y + 4);
      fill(s.active ? color(255, 255, 255, 180) : '#6c757d');
      textSize(10);
      text(s.cat + ' | -' + s.gtCO2.toFixed(1) + ' Gt CO\u2082/yr', x + 8, y + 19);

      // Adoption progress bar
      let pbX = x + cardW - 55;
      let pbY = y + 8;
      let pbW = 45;
      let pbH = 6;
      fill(s.active ? color(255, 255, 255, 100) : color(200));
      rect(pbX, pbY, pbW, pbH, 3);
      fill(s.active ? color(255) : strongColor);
      rect(pbX, pbY, pbW * s.adoption, pbH, 3);
    }
  }

  // Summary stats at bottom of draw area
  let summY = drawHeight - 55;
  noStroke();
  fill('#264653');
  textSize(12);
  textAlign(LEFT, TOP);

  let activeCount = solutions.filter(s => s.active).length;
  text('Active solutions: ' + activeCount + '/10', margin, summY);
  text('CO\u2082 reduction: ' + totalReduction.toFixed(1) + ' Gt/yr', margin, summY + 18);

  let tempColor = projectedTemp > 3.0 ? bauColor : (projectedTemp > 2.0 ? moderateColor : strongColor);
  fill(tempColor);
  textSize(14);
  textAlign(RIGHT, TOP);
  text('Projected: ' + projectedTemp.toFixed(1) + '\u00B0C warming', canvasWidth - margin, summY);

  let status = projectedTemp <= 1.5 ? 'Paris Goal Met!' :
               projectedTemp <= 2.0 ? 'Below 2\u00B0C target' :
               projectedTemp <= 3.0 ? 'Moderate action' : 'Dangerous warming';
  fill(tempColor);
  textSize(12);
  text(status, canvasWidth - margin, summY + 20);

  // Control area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function mousePressed() {
  if (showAdaptation) return;
  let cardStartY = 160 + 25;
  let cardW = (canvasWidth - 3 * margin) / 2;
  let cardH = 38;
  let gap = 4;

  for (let i = 0; i < solutions.length; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let x = margin + col * (cardW + margin);
    let y = cardStartY + row * (cardH + gap);

    if (mouseX >= x && mouseX <= x + cardW && mouseY >= y && mouseY <= y + cardH) {
      solutions[i].active = !solutions[i].active;
      break;
    }
  }
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
