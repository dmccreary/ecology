// Coevolution Arms Race Simulator
// Shows trait escalation between predator and prey populations

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Populations - arrays of trait values
let predPop = [];
let preyPop = [];
let popSize = 100;
let generation = 0;
let maxGenerations = 100;

// History
let predAvgHistory = [];
let preyAvgHistory = [];

// Controls
let mutationSlider, selectionSlider;
let resetBtn, stepBtn, runBtn, switchBtn;
let running = false;
let traitMode = 'speed'; // 'speed' or 'toxicity'

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Coevolution arms race showing trait escalation over generations', LABEL);

  mutationSlider = createSlider(0.01, 0.2, 0.05, 0.01);
  mutationSlider.parent(document.querySelector('main'));
  mutationSlider.style('width', '110px');

  selectionSlider = createSlider(0.1, 1.0, 0.5, 0.05);
  selectionSlider.parent(document.querySelector('main'));
  selectionSlider.style('width', '110px');

  runBtn = createButton('Start');
  runBtn.parent(document.querySelector('main'));
  runBtn.mousePressed(() => { running = !running; runBtn.html(running ? 'Pause' : 'Start'); });

  stepBtn = createButton('Step');
  stepBtn.parent(document.querySelector('main'));
  stepBtn.mousePressed(() => { if (!running) runGeneration(); });

  switchBtn = createButton('Switch to Toxicity');
  switchBtn.parent(document.querySelector('main'));
  switchBtn.mousePressed(() => {
    traitMode = traitMode === 'speed' ? 'toxicity' : 'speed';
    switchBtn.html(traitMode === 'speed' ? 'Switch to Toxicity' : 'Switch to Speed');
    resetSim();
  });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);

  resetSim();
}

function resetSim() {
  predPop = [];
  preyPop = [];
  for (let i = 0; i < popSize; i++) {
    predPop.push(50 + randomGaussian() * 5);
    preyPop.push(50 + randomGaussian() * 5);
  }
  generation = 0;
  predAvgHistory = [avg(predPop)];
  preyAvgHistory = [avg(preyPop)];
  running = false;
  if (runBtn) runBtn.html('Start');
}

function avg(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function runGeneration() {
  if (generation >= maxGenerations) return;
  let mutRate = mutationSlider.value();
  let selStr = selectionSlider.value();

  // Pair up and determine outcomes
  let preyFitness = new Array(popSize).fill(0);
  let predFitness = new Array(popSize).fill(0);

  for (let i = 0; i < popSize; i++) {
    let pi = floor(random(popSize));
    let diff = predPop[i] - preyPop[pi];
    let catchProb = 1 / (1 + exp(-diff * selStr * 0.1));
    if (random() < catchProb) {
      predFitness[i] += 1;
    } else {
      preyFitness[pi] += 1;
    }
  }

  // Reproduce with selection
  let newPred = reproduce(predPop, predFitness, mutRate);
  let newPrey = reproduce(preyPop, preyFitness, mutRate);

  predPop = newPred;
  preyPop = newPrey;
  generation++;

  predAvgHistory.push(avg(predPop));
  preyAvgHistory.push(avg(preyPop));
}

function reproduce(pop, fitness, mutRate) {
  let totalFit = fitness.reduce((a, b) => a + b, 0) + popSize * 0.1; // baseline fitness
  let newPop = [];
  for (let i = 0; i < popSize; i++) {
    // Fitness-proportional selection
    let r = random(totalFit);
    let cumulative = 0;
    let parent = 0;
    for (let j = 0; j < popSize; j++) {
      cumulative += fitness[j] + 0.1;
      if (cumulative >= r) { parent = j; break; }
    }
    let offspring = pop[parent] + randomGaussian() * mutRate * 10;
    offspring = max(0, offspring);
    newPop.push(offspring);
  }
  return newPop;
}

function draw() {
  updateCanvasSize();

  fill('#fff8f0');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (running && frameCount % 8 === 0) {
    runGeneration();
  }

  let halfW = canvasWidth / 2;
  let histH = 100;

  // Title
  noStroke();
  fill(40);
  textSize(15);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  let traitLabel = traitMode === 'speed' ? 'Speed' : 'Toxicity/Resistance';
  text('Coevolution Arms Race: ' + traitLabel, canvasWidth / 2, 5);
  textStyle(NORMAL);

  // Generation counter
  textSize(13);
  text('Generation: ' + generation, canvasWidth / 2, 25);

  // Draw histograms
  drawHistogram(predPop, 10, 50, halfW - 20, histH, [200, 60, 60], 'Predator ' + (traitMode === 'speed' ? 'Speed' : 'Resistance'));
  drawHistogram(preyPop, halfW + 10, 50, halfW - 20, histH, [50, 150, 50], 'Prey ' + (traitMode === 'speed' ? 'Speed' : 'Toxin Strength'));

  // Draw organisms
  drawOrganisms(predPop, 10, 160, halfW - 20, 80, [200, 60, 60]);
  drawOrganisms(preyPop, halfW + 10, 160, halfW - 20, 80, [50, 150, 50]);

  // Averages
  noStroke();
  fill(200, 60, 60);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Avg: ' + nf(avg(predPop), 1, 1), halfW / 2, 250);
  fill(50, 150, 50);
  text('Avg: ' + nf(avg(preyPop), 1, 1), halfW + halfW / 2, 250);

  // Trait history graph
  drawTraitGraph(10, 270, canvasWidth - 20, drawHeight - 280);

  // Controls labels
  noStroke();
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Mutation: ' + nf(mutationSlider.value(), 1, 2), 5, drawHeight + 15);
  text('Selection: ' + nf(selectionSlider.value(), 1, 2), canvasWidth * 0.3, drawHeight + 15);

  // Summary at gen 50
  if (generation >= 50 && generation <= 55) {
    fill(255, 255, 200, 220);
    stroke(180, 150, 50);
    strokeWeight(1);
    let sx = canvasWidth * 0.15;
    rect(sx, 100, canvasWidth * 0.7, 50, 8);
    noStroke();
    fill(80, 60, 0);
    textSize(12);
    textAlign(CENTER, CENTER);
    let predEsc = nf(avg(predPop) - predAvgHistory[0], 1, 1);
    let preyEsc = nf(avg(preyPop) - preyAvgHistory[0], 1, 1);
    text('After 50 gens: Predator trait +' + predEsc + ', Prey trait +' + preyEsc, canvasWidth / 2, 125);
  }
}

function drawHistogram(pop, x, y, w, h, col, label) {
  let bins = 20;
  let minVal = 0;
  let maxVal = 150;
  let counts = new Array(bins).fill(0);
  for (let v of pop) {
    let b = constrain(floor(map(v, minVal, maxVal, 0, bins)), 0, bins - 1);
    counts[b]++;
  }
  let maxCount = max(counts);
  if (maxCount === 0) maxCount = 1;

  let barW = w / bins;
  for (let i = 0; i < bins; i++) {
    let barH = (counts[i] / maxCount) * h * 0.8;
    fill(col[0], col[1], col[2], 180);
    noStroke();
    rect(x + i * barW, y + h - barH, barW - 1, barH);
  }

  noStroke();
  fill(col[0], col[1], col[2]);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(label, x + w / 2, y - 2);
}

function drawOrganisms(pop, x, y, w, h, col) {
  noStroke();
  for (let i = 0; i < min(pop.length, 50); i++) {
    let px = x + random(w);
    let py = y + random(h);
    let sz = map(pop[i], 20, 120, 4, 10);
    fill(col[0], col[1], col[2], 150);
    ellipse(px, py, sz, sz);
  }
}

function drawTraitGraph(x, y, w, h) {
  // Background
  fill(250, 250, 255);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h);

  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Trait Value Over Generations', x + w / 2, y + 2);

  if (predAvgHistory.length < 2) return;

  let maxGen = maxGenerations;
  let maxTrait = 150;

  // Predator line
  stroke(200, 60, 60);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < predAvgHistory.length; i++) {
    vertex(x + (i / maxGen) * w, y + h - (predAvgHistory[i] / maxTrait) * h);
  }
  endShape();

  // Prey line
  stroke(50, 150, 50);
  beginShape();
  for (let i = 0; i < preyAvgHistory.length; i++) {
    vertex(x + (i / maxGen) * w, y + h - (preyAvgHistory[i] / maxTrait) * h);
  }
  endShape();
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
