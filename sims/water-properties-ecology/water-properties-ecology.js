// Water Properties and Ecological Importance
// Interactive diagram with 5 water properties and their ecological connections

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

let selectedProperty = -1;
let lockedProperty = -1;
let quizMode = false;
let quizAnswers = [];
let quizScore = -1;
let quizBtn, resetBtn;

let properties = [
  {
    name: "Universal Solvent",
    definition: "Water dissolves more substances than any other natural liquid due to its polarity.",
    molecular: "The partial charges on water molecules attract and surround ions and polar molecules.",
    ecological: "Rivers carry dissolved nutrients to oceans; plant roots absorb dissolved minerals from soil.",
    angle: -90,
    color: "#0277bd"
  },
  {
    name: "High Heat Capacity",
    definition: "Water absorbs or releases large amounts of heat with small temperature changes.",
    molecular: "Hydrogen bonds between water molecules require significant energy to break.",
    ecological: "Oceans moderate coastal climates; lakes resist rapid temperature swings, protecting aquatic life.",
    angle: -18,
    color: "#00838f"
  },
  {
    name: "Cohesion & Adhesion",
    definition: "Water molecules stick to each other (cohesion) and to other surfaces (adhesion).",
    molecular: "Hydrogen bonds hold water molecules together and interact with polar surfaces.",
    ecological: "Water travels up tree trunks through xylem vessels, reaching leaves over 100 meters high.",
    angle: 54,
    color: "#2e7d32"
  },
  {
    name: "Density Anomaly",
    definition: "Solid water (ice) is less dense than liquid water -- unlike most substances.",
    molecular: "Hydrogen bonds form a rigid crystal lattice in ice, spacing molecules farther apart.",
    ecological: "Ice floats on lakes, insulating the water below and allowing fish to survive winter.",
    angle: 126,
    color: "#1565c0"
  },
  {
    name: "Surface Tension",
    definition: "Water's surface acts like an elastic membrane due to cohesive forces.",
    molecular: "Surface molecules have no water neighbors above them, so they bond more strongly sideways.",
    ecological: "Water striders walk on pond surfaces; small seeds and insects are supported by surface tension.",
    angle: 198,
    color: "#00695c"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  quizBtn = createButton('Quiz Me');
  quizBtn.parent(document.querySelector('main'));
  quizBtn.position(10, drawHeight + 5);
  quizBtn.mousePressed(toggleQuiz);
  styleButton(quizBtn, '#0277bd');

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.position(110, drawHeight + 5);
  resetBtn.mousePressed(resetAll);
  styleButton(resetBtn, '#795548');

  describe('Interactive diagram showing five key properties of water and their ecological importance', LABEL);
}

function styleButton(btn, bgColor) {
  btn.style('font-size', '14px');
  btn.style('padding', '6px 14px');
  btn.style('margin', '4px');
  btn.style('cursor', 'pointer');
  btn.style('background', bgColor);
  btn.style('color', 'white');
  btn.style('border', 'none');
  btn.style('border-radius', '4px');
}

function draw() {
  updateCanvasSize();

  // Background
  fill('#f0f7fa');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('#01579b');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Water Properties & Ecology', canvasWidth / 2, 8);
  textStyle(NORMAL);

  let cx = canvasWidth * 0.35;
  let cy = drawHeight * 0.42;
  let branchLen = min(canvasWidth * 0.22, 120);

  // Draw central water molecule
  drawWaterMolecule(cx, cy);

  // Draw branches
  for (let i = 0; i < properties.length; i++) {
    drawBranch(i, cx, cy, branchLen);
  }

  // Check hover
  if (!quizMode) {
    selectedProperty = -1;
    for (let i = 0; i < properties.length; i++) {
      let angle = radians(properties[i].angle);
      let ex = cx + cos(angle) * branchLen;
      let ey = cy + sin(angle) * branchLen;
      if (dist(mouseX, mouseY, ex, ey) < 30) {
        selectedProperty = i;
        break;
      }
    }
  }

  // Info panel
  let showIdx = lockedProperty >= 0 ? lockedProperty : selectedProperty;
  if (showIdx >= 0 && !quizMode) {
    drawInfoPanel(showIdx);
  }

  // Quiz mode
  if (quizMode) {
    drawQuizPanel();
  }

  // Control region
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawWaterMolecule(cx, cy) {
  // O atom
  fill('#e53935');
  noStroke();
  ellipse(cx, cy, 36, 36);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('O', cx, cy);

  // H atoms
  let h1x = cx - 20, h1y = cy - 22;
  let h2x = cx + 20, h2y = cy - 22;

  stroke('#90a4ae');
  strokeWeight(3);
  line(cx, cy, h1x, h1y);
  line(cx, cy, h2x, h2y);

  fill('#42a5f5');
  noStroke();
  ellipse(h1x, h1y, 24, 24);
  ellipse(h2x, h2y, 24, 24);

  fill('white');
  noStroke();
  textSize(13);
  text('H', h1x, h1y);
  text('H', h2x, h2y);

  // Polarity labels
  fill('#e53935');
  textSize(10);
  noStroke();
  text('δ-', cx, cy + 24);
  fill('#42a5f5');
  text('δ+', h1x, h1y - 16);
  text('δ+', h2x, h2y - 16);
  textStyle(NORMAL);
}

function drawBranch(i, cx, cy, len) {
  let p = properties[i];
  let angle = radians(p.angle);
  let ex = cx + cos(angle) * len;
  let ey = cy + sin(angle) * len;

  // Line
  stroke(p.color);
  strokeWeight(2);
  line(cx, cy, ex, ey);

  // Node circle
  let isHovered = (selectedProperty === i || lockedProperty === i);
  let nodeSize = isHovered ? 32 : 26;
  fill(isHovered ? p.color : p.color + '99');
  noStroke();
  ellipse(ex, ey, nodeSize, nodeSize);

  // Label
  fill(p.color);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);

  let labelX = ex + cos(angle) * 30;
  let labelY = ey + sin(angle) * 16;
  text(p.name, labelX, labelY);
  textStyle(NORMAL);
}

function drawInfoPanel(idx) {
  let p = properties[idx];
  let panelX = canvasWidth * 0.6;
  let panelW = canvasWidth * 0.38;
  let panelY = 40;
  let panelH = drawHeight - 60;

  fill('#ffffff');
  stroke(p.color);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  let tx = panelX + 10;
  let ty = panelY + 12;

  fill(p.color);
  textSize(15);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(p.name, tx, ty, panelW - 20, 40);
  textStyle(NORMAL);
  ty += 30;

  fill('#3e2723');
  textSize(12);
  textStyle(BOLD);
  text('Definition:', tx, ty);
  textStyle(NORMAL);
  ty += 16;
  textSize(11);
  text(p.definition, tx, ty, panelW - 20, 60);
  ty += 55;

  textSize(12);
  textStyle(BOLD);
  fill('#5d4037');
  text('Molecular Basis:', tx, ty);
  textStyle(NORMAL);
  ty += 16;
  textSize(11);
  fill('#3e2723');
  text(p.molecular, tx, ty, panelW - 20, 60);
  ty += 55;

  textSize(12);
  textStyle(BOLD);
  fill('#2e7d32');
  text('Ecological Importance:', tx, ty);
  textStyle(NORMAL);
  ty += 16;
  textSize(11);
  fill('#3e2723');
  text(p.ecological, tx, ty, panelW - 20, 80);
}

function drawQuizPanel() {
  let panelX = canvasWidth * 0.55;
  let panelW = canvasWidth * 0.43;
  let panelY = 40;
  let panelH = drawHeight - 60;

  fill('#fff8e1');
  stroke('#f57f17');
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  fill('#f57f17');
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Match the Property!', panelX + panelW / 2, panelY + 10);
  textStyle(NORMAL);

  textSize(11);
  fill('#3e2723');
  textAlign(LEFT, TOP);
  let ty = panelY + 35;

  let examples = [
    "Rivers carry dissolved minerals",
    "Oceans moderate coastal climate",
    "Water rises up tree trunks",
    "Ice floats, insulating lakes",
    "Insects walk on pond surfaces"
  ];

  for (let i = 0; i < examples.length; i++) {
    fill(quizScore >= 0 && quizAnswers[i] === i ? '#2e7d32' : '#3e2723');
    noStroke();
    text((i + 1) + '. ' + examples[i], panelX + 10, ty, panelW - 20, 30);
    text('→ ' + properties[i].name, panelX + 20, ty + 16, panelW - 30, 20);
    ty += 40;
  }

  if (quizScore >= 0) {
    fill('#2e7d32');
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('All matched correctly!', panelX + panelW / 2, ty + 10);
    textStyle(NORMAL);
  }
}

function mousePressed() {
  if (!quizMode) {
    // Click to lock/unlock property
    if (selectedProperty >= 0) {
      lockedProperty = (lockedProperty === selectedProperty) ? -1 : selectedProperty;
    }
  }
}

function toggleQuiz() {
  quizMode = !quizMode;
  if (quizMode) {
    quizBtn.html('Exit Quiz');
    quizScore = 0;
    quizAnswers = [0, 1, 2, 3, 4];
    lockedProperty = -1;
  } else {
    quizBtn.html('Quiz Me');
    quizScore = -1;
  }
}

function resetAll() {
  selectedProperty = -1;
  lockedProperty = -1;
  quizMode = false;
  quizScore = -1;
  quizBtn.html('Quiz Me');
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
