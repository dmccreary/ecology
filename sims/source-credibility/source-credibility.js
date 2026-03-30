// Source Credibility Evaluator - p5.js
// CANVAS_HEIGHT: 545
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let scenarios = [];
let currentScenario = 0;
let score = 0;
let totalAttempts = 0;
let submitted = false;

let expertiseSlider, evidenceSlider, transparencySlider, consistencySlider;
let submitBtn, nextBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Source credibility evaluator for environmental claims', LABEL);

  scenarios = [
    { claim: '"New superfood reverses climate change!"',
      source: 'Health & Wellness Blog (no author credentials listed)',
      type: 'Blog Post',
      expert: [1, 'No scientific expertise evident. Blog has no editorial review.'],
      evidence: [1, 'Anecdotal evidence only. No data or studies cited.'],
      transparency: [1, 'No methods, no funding disclosure. Affiliate links to product.'],
      consistency: [1, 'Contradicts all established climate science. No food can "reverse" global warming.']
    },
    { claim: '"Global temperatures have risen 1.1°C since pre-industrial times"',
      source: 'IPCC Sixth Assessment Report (2021)',
      type: 'International Scientific Body',
      expert: [10, 'Hundreds of leading climate scientists worldwide contributed.'],
      evidence: [10, 'Based on thousands of peer-reviewed studies and multiple data sources.'],
      transparency: [9, 'Methods fully documented. Review process transparent. Government-funded.'],
      consistency: [10, 'Consistent with NASA, NOAA, and independent research globally.']
    },
    { claim: '"Our new pesticide is completely safe for pollinators"',
      source: 'Press release from AgroChem Industries',
      type: 'Industry Press Release',
      expert: [5, 'Company has scientists, but potential bias in self-reporting safety.'],
      evidence: [3, 'Cites internal studies only. No independent verification.'],
      transparency: [2, 'Methods not published. Clear financial interest in the product.'],
      consistency: [3, 'Independent studies on similar chemicals show pollinator harm.']
    },
    { claim: '"Local wetland shows 40% bird species decline over 10 years"',
      source: 'Published in Journal of Wildlife Management (peer-reviewed)',
      type: 'Peer-Reviewed Journal',
      expert: [8, 'Authors are university ecologists with relevant expertise.'],
      evidence: [8, 'Systematic surveys with statistical analysis over 10-year period.'],
      transparency: [8, 'Methods section details survey protocol. Funded by wildlife grant.'],
      consistency: [7, 'Consistent with broader trends in wetland bird decline.']
    },
    { claim: '"5G towers are killing all the birds!!!"',
      source: 'Viral Facebook post with 50K shares',
      type: 'Social Media Post',
      expert: [0, 'Anonymous poster. No scientific background indicated.'],
      evidence: [0, 'No data. One photo of dead birds near a cell tower.'],
      transparency: [0, 'No methods. No source. Inflammatory language and emojis.'],
      consistency: [0, 'No scientific evidence supports this. Bird deaths have documented causes.']
    },
    { claim: '"Coral reef coverage declined 14% between 2009-2018"',
      source: 'NOAA Coral Reef Watch Program Report',
      type: 'Government Scientific Agency',
      expert: [9, 'NOAA scientists specialize in marine monitoring.'],
      evidence: [9, 'Satellite data combined with field surveys across multiple sites.'],
      transparency: [9, 'Open data. Methods published. Taxpayer-funded with oversight.'],
      consistency: [9, 'Matches Global Coral Reef Monitoring Network findings.']
    },
    { claim: '"Wolves reintroduction has NO effect on Yellowstone ecosystem"',
      source: 'Ranchers Association Newsletter',
      type: 'Industry Newsletter',
      expert: [3, 'Written by advocacy group, not wildlife biologists.'],
      evidence: [2, 'Cherry-picks one study while ignoring dozens of others.'],
      transparency: [2, 'Organization has clear anti-wolf economic interest.'],
      consistency: [2, 'Contradicts extensive research showing trophic cascade effects.']
    },
    { claim: '"Amazon deforestation rate increased 22% this year"',
      source: 'INPE (Brazil\'s National Space Research Institute) satellite data',
      type: 'Government Research Institute',
      expert: [9, 'Leading space research agency with decades of monitoring.'],
      evidence: [9, 'Satellite imagery with ground-truthing. Continuous monitoring.'],
      transparency: [8, 'Data publicly available. Methods well-documented.'],
      consistency: [8, 'Cross-verified by independent satellite analyses (e.g., UMD).']
    }
  ];

  expertiseSlider = createSlider(0, 10, 5, 1);
  expertiseSlider.parent(document.querySelector('main'));
  expertiseSlider.style('width', '120px');

  evidenceSlider = createSlider(0, 10, 5, 1);
  evidenceSlider.parent(document.querySelector('main'));
  evidenceSlider.style('width', '120px');

  transparencySlider = createSlider(0, 10, 5, 1);
  transparencySlider.parent(document.querySelector('main'));
  transparencySlider.style('width', '120px');

  consistencySlider = createSlider(0, 10, 5, 1);
  consistencySlider.parent(document.querySelector('main'));
  consistencySlider.style('width', '120px');

  submitBtn = createButton('Submit Rating');
  submitBtn.parent(document.querySelector('main'));
  submitBtn.mousePressed(submitRating);
  submitBtn.style('font-size','13px');

  nextBtn = createButton('Next Scenario →');
  nextBtn.parent(document.querySelector('main'));
  nextBtn.mousePressed(nextScenario);
  nextBtn.style('font-size','13px');
  nextBtn.hide();
}

function draw() {
  updateCanvasSize();
  background(255);

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let sc = scenarios[currentScenario];

  // Header bar
  fill('#264653'); noStroke();
  rect(0, 0, canvasWidth, 32);
  fill(255); textSize(12); textAlign(LEFT, CENTER);
  text('Score: ' + score + '/' + totalAttempts, 10, 16);
  textAlign(CENTER, CENTER);
  text('Scenario ' + (currentScenario+1) + '/' + scenarios.length, canvasWidth/2, 16);
  textAlign(RIGHT, CENTER);
  text('Source Credibility', canvasWidth-10, 16);

  // Progress bar
  let progW = canvasWidth - 20;
  fill('#e0e0e0'); noStroke();
  rect(10, 36, progW, 6, 3);
  fill('#2a9d8f');
  rect(10, 36, progW * (currentScenario / scenarios.length), 6, 3);

  // Claim card
  fill('#fff'); stroke('#264653'); strokeWeight(1);
  rect(10, 50, canvasWidth-20, 70, 8);
  noStroke(); fill('#e63946'); textSize(10); textAlign(LEFT, TOP);
  text('CLAIM:', 20, 56);
  fill('#264653'); textSize(13); textAlign(LEFT, TOP);
  text(sc.claim, 20, 70, canvasWidth-40, 40);

  // Source card
  fill('#f0f4f8'); stroke('#457b9d'); strokeWeight(1);
  rect(10, 128, canvasWidth-20, 45, 8);
  noStroke(); fill('#457b9d'); textSize(10); textAlign(LEFT, TOP);
  text('SOURCE: [' + sc.type + ']', 20, 134);
  fill('#264653'); textSize(12);
  text(sc.source, 20, 148, canvasWidth-40, 20);

  // Rating sliders section
  let sy = 185;
  let labels = ['Expertise', 'Evidence Quality', 'Transparency', 'Consistency'];
  let sliders = [expertiseSlider, evidenceSlider, transparencySlider, consistencySlider];
  let ox = canvasOffsetX(), oy = canvasOffsetY();

  for (let i = 0; i < 4; i++) {
    let yy = sy + i * 28;
    noStroke(); fill('#264653'); textSize(11); textAlign(LEFT, CENTER);
    text(labels[i] + ':', 15, yy + 10);
    textAlign(RIGHT, CENTER);
    text(sliders[i].value() + '/10', canvasWidth - 15, yy + 10);
    sliders[i].position(ox + 120, oy + yy + 2);

    // Color indicator
    let val = sliders[i].value();
    fill(lerpColor(color('#e63946'), color('#2a9d8f'), val/10));
    noStroke();
    rect(canvasWidth - 50, yy + 4, 8, 12, 2);
  }

  // Credibility meter
  let userScore = (expertiseSlider.value() + evidenceSlider.value() + transparencySlider.value() + consistencySlider.value()) / 4;
  let meterY = sy + 120;

  noStroke(); fill('#264653'); textSize(12); textAlign(CENTER, TOP);
  text('Your Credibility Score: ' + nf(userScore, 1, 1) + ' / 10', canvasWidth/2, meterY);

  // Meter bar
  let meterL = 60, meterR = canvasWidth - 60, meterW = meterR - meterL;
  fill('#e0e0e0'); noStroke();
  rect(meterL, meterY + 18, meterW, 14, 7);

  // Color gradient fill
  let fillW = (userScore / 10) * meterW;
  let meterColor = userScore < 3.5 ? '#e63946' : (userScore < 6.5 ? '#e9c46a' : '#2a9d8f');
  fill(meterColor);
  rect(meterL, meterY + 18, fillW, 14, 7);

  // Labels under meter
  textSize(9); fill('#e63946'); textAlign(LEFT, TOP);
  text('Low', meterL, meterY + 35);
  fill('#e9c46a'); textAlign(CENTER, TOP);
  text('Medium', meterL + meterW/2, meterY + 35);
  fill('#2a9d8f'); textAlign(RIGHT, TOP);
  text('High', meterR, meterY + 35);

  // Submit / Next buttons
  submitBtn.position(ox + canvasWidth/2 - 55, oy + meterY + 50);
  nextBtn.position(ox + canvasWidth/2 - 55, oy + meterY + 50);

  // Feedback area
  if (submitted) {
    submitBtn.hide();
    nextBtn.show();

    let fbY = meterY + 78;
    let expertScore = (sc.expert[0] + sc.evidence[0] + sc.transparency[0] + sc.consistency[0]) / 4;
    let diff = abs(userScore - expertScore);

    fill('#f8f9fa'); stroke(diff < 2 ? '#2a9d8f' : '#e76f51'); strokeWeight(2);
    rect(10, fbY, canvasWidth-20, drawHeight - fbY - 5, 8);

    noStroke(); fill('#264653'); textSize(11); textAlign(LEFT, TOP);
    let feedbackY = fbY + 8;
    text('Expert Score: ' + nf(expertScore,1,1) + '/10 | Your Score: ' + nf(userScore,1,1) + '/10 | ' +
         (diff < 2 ? 'Good match!' : 'Needs calibration'), 20, feedbackY);
    feedbackY += 18;

    let cats = ['Expertise', 'Evidence', 'Transparency', 'Consistency'];
    let expertVals = [sc.expert, sc.evidence, sc.transparency, sc.consistency];
    let userVals = [expertiseSlider.value(), evidenceSlider.value(), transparencySlider.value(), consistencySlider.value()];

    for (let i = 0; i < 4; i++) {
      fill('#457b9d'); textSize(10);
      text(cats[i] + ': Expert=' + expertVals[i][0] + ', You=' + userVals[i], 20, feedbackY);
      feedbackY += 13;
      fill('#6c757d'); textSize(9);
      text(expertVals[i][1], 30, feedbackY, canvasWidth - 60, 26);
      feedbackY += 22;
    }
  }

  // Bottom bar
  noStroke(); fill('#264653'); textSize(11); textAlign(CENTER, CENTER);
  text('Rate each criterion from 0 (not credible) to 10 (highly credible)', canvasWidth/2, drawHeight + controlHeight/2);
}

function submitRating() {
  submitted = true;
  totalAttempts++;
  let sc = scenarios[currentScenario];
  let expertScore = (sc.expert[0] + sc.evidence[0] + sc.transparency[0] + sc.consistency[0]) / 4;
  let userScore = (expertiseSlider.value() + evidenceSlider.value() + transparencySlider.value() + consistencySlider.value()) / 4;
  if (abs(userScore - expertScore) < 2) score++;
}

function nextScenario() {
  currentScenario = (currentScenario + 1) % scenarios.length;
  if (currentScenario === 0) { score = 0; totalAttempts = 0; }
  submitted = false;
  expertiseSlider.value(5);
  evidenceSlider.value(5);
  transparencySlider.value(5);
  consistencySlider.value(5);
  submitBtn.show();
  nextBtn.hide();
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
