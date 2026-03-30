// Sample Size Effect on Reliability - p5.js
// CANVAS_HEIGHT: 485
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let trueRate = 0.6;
let sampleSizeSlider;
let sampleBtn, resetBtn, autoBtn;
let estimates = [];
let maxEstimates = 200;
let headline = '';
let headlineColor = '#264653';
let autoSampling = false;
let autoInterval = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Sample size effect on reliability of ecological sampling', LABEL);

  sampleSizeSlider = createSlider(5, 500, 30, 5);
  sampleSizeSlider.parent(document.querySelector('main'));
  sampleSizeSlider.position(135, drawHeight + 5);
  sampleSizeSlider.size(140);

  sampleBtn = createButton('Draw Sample');
  sampleBtn.parent(document.querySelector('main'));
  sampleBtn.position(290, drawHeight + 5);
  sampleBtn.mousePressed(drawOneSample);
  sampleBtn.style('font-size','13px');

  autoBtn = createButton('Auto (x20)');
  autoBtn.parent(document.querySelector('main'));
  autoBtn.position(290, drawHeight + 28);
  autoBtn.mousePressed(function() { for(let i=0;i<20;i++) drawOneSample(); });
  autoBtn.style('font-size','13px');

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.position(380, drawHeight + 5);
  resetBtn.mousePressed(function() { estimates = []; headline = ''; });
  resetBtn.style('font-size','13px');
}

function draw() {
  updateCanvasSize();
  background(255);

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('#264653'); textSize(14); textAlign(CENTER, TOP);
  text('Sample Size Effect on Reliability', canvasWidth/2, 5);
  textSize(11); fill('#6c757d');
  text('True survival rate = ' + nf(trueRate*100,1,0) + '% | Population = 10,000 organisms', canvasWidth/2, 22);

  // Number line plot area
  let nlL = 60, nlR = canvasWidth - 30;
  let nlY = 65, nlH = 140;
  let nlW = nlR - nlL;

  // Number line 0-100%
  stroke('#ccc'); strokeWeight(1);
  line(nlL, nlY + nlH, nlR, nlY + nlH);
  for (let p = 0; p <= 100; p += 10) {
    let x = nlL + (p/100)*nlW;
    line(x, nlY+nlH-3, x, nlY+nlH+3);
    noStroke(); fill('#264653'); textSize(9); textAlign(CENTER, TOP);
    text(p+'%', x, nlY+nlH+5);
    stroke('#ccc'); strokeWeight(0.5);
  }

  // True value line
  stroke('#264653'); strokeWeight(2);
  let trueX = nlL + trueRate*nlW;
  line(trueX, nlY, trueX, nlY+nlH);
  noStroke(); fill('#264653'); textSize(10); textAlign(CENTER, BOTTOM);
  text('True: '+nf(trueRate*100,1,0)+'%', trueX, nlY-2);

  // Plot dots
  for (let i = 0; i < estimates.length; i++) {
    let e = estimates[i];
    let x = nlL + e.rate * nlW;
    let distFromTrue = abs(e.rate - trueRate);
    let g = map(distFromTrue, 0, 0.3, 200, 0, true);
    let r = map(distFromTrue, 0, 0.3, 0, 230, true);
    fill(r, g, 80, 150);
    noStroke();
    // Jitter vertically
    let y = nlY + nlH - 8 - (i % 20) * 6;
    ellipse(x, y, 7, 7);
  }

  // Histogram area
  let histL = 60, histR = canvasWidth - 30, histT = 230, histB = 350;
  let histW = histR - histL, histH = histB - histT;

  stroke('#ccc'); strokeWeight(0.5); noFill();
  rect(histL, histT, histW, histH);

  if (estimates.length > 2) {
    // Build histogram bins
    let nBins = 20;
    let bins = new Array(nBins).fill(0);
    for (let e of estimates) {
      let bi = constrain(floor(e.rate * nBins), 0, nBins-1);
      bins[bi]++;
    }
    let maxBin = max(bins);
    let binW = histW / nBins;

    for (let i=0; i<nBins; i++) {
      let bh = maxBin > 0 ? (bins[i]/maxBin) * histH : 0;
      let cx = (i+0.5)/nBins;
      let dist = abs(cx - trueRate);
      let g2 = map(dist, 0, 0.3, 200, 0, true);
      let r2 = map(dist, 0, 0.3, 0, 230, true);
      fill(r2, g2, 80, 180);
      noStroke();
      rect(histL + i*binW, histB - bh, binW-1, bh);
    }

    // True value line on histogram
    stroke('#264653'); strokeWeight(2);
    let htx = histL + trueRate * histW;
    line(htx, histT, htx, histB);
  }

  noStroke(); fill('#264653'); textSize(10); textAlign(CENTER, TOP);
  text('Distribution of Sample Estimates', histL + histW/2, histT - 14);

  // Statistics
  let statsY = 360;
  noStroke(); fill('#264653'); textSize(12); textAlign(LEFT, TOP);
  if (estimates.length > 0) {
    let rates = estimates.map(e => e.rate);
    let rMin = min(rates), rMax = max(rates);
    let rMean = rates.reduce((a,b)=>a+b,0)/rates.length;
    let variance = rates.reduce((a,b)=>a+(b-rMean)**2,0)/rates.length;
    let sd = Math.sqrt(variance);
    let within5 = rates.filter(r => abs(r-trueRate) < 0.05).length;
    let pct5 = nf(100*within5/rates.length, 1, 1);

    text('Range: '+nf(rMin*100,1,1)+'% – '+nf(rMax*100,1,1)+'%', 15, statsY);
    text('Std Dev: '+nf(sd*100,1,2)+'%', 15, statsY+16);
    text('Within 5% of true: '+within5+'/'+estimates.length+' ('+pct5+'%)', 15, statsY+32);
    text('N = '+sampleSizeSlider.value(), canvasWidth-100, statsY);
  } else {
    text('Draw samples to see statistics', 15, statsY);
  }

  // Headline panel
  if (headline !== '') {
    fill('#f8f9fa'); stroke('#e76f51'); strokeWeight(2);
    rect(10, 400, canvasWidth-20, 35, 6);
    noStroke(); fill(headlineColor); textSize(12); textAlign(CENTER, CENTER);
    text(headline, canvasWidth/2, 417);
  }

  // Control labels
  noStroke(); fill('#264653'); textSize(12); textAlign(LEFT, CENTER);
  text('Sample size (N): ' + sampleSizeSlider.value(), 10, drawHeight + 16);
}

function drawOneSample() {
  let n = sampleSizeSlider.value();
  let successes = 0;
  for (let i = 0; i < n; i++) {
    if (random() < trueRate) successes++;
  }
  let rate = successes / n;
  if (estimates.length >= maxEstimates) estimates.shift();
  estimates.push({ rate: rate, n: n });

  // Generate headline for extreme results
  let pct = nf(rate*100, 1, 0);
  if (rate > 0.85 && n < 20) {
    headline = '📰 "SPECIES THRIVING! ' + pct + '% survival!" (n=' + n + ')';
    headlineColor = '#2a9d8f';
  } else if (rate < 0.35 && n < 20) {
    headline = '📰 "EXTINCTION CRISIS! Only ' + pct + '% survival!" (n=' + n + ')';
    headlineColor = '#e63946';
  } else if (n >= 100 && abs(rate - trueRate) < 0.05) {
    headline = '📰 "Study finds ' + pct + '% survival rate" (n=' + n + ') — Boring but accurate!';
    headlineColor = '#264653';
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
