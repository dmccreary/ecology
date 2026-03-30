// Adaptive Management Cycle MicroSim
// CANVAS_HEIGHT: 530
let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let scenarioSelect;
let resetBtn;

let steps = [
  { name: 'Assess', short: 'Assess\nProblem', color: [220, 60, 60] },
  { name: 'Design', short: 'Design\nPlan', color: [230, 140, 40] },
  { name: 'Implement', short: 'Implement\nActions', color: [220, 200, 40] },
  { name: 'Monitor', short: 'Monitor\nResults', color: [60, 180, 80] },
  { name: 'Evaluate', short: 'Evaluate\nOutcomes', color: [50, 140, 200] },
  { name: 'Adjust', short: 'Adjust\nStrategy', color: [140, 80, 200] }
];

let scenarios = {
  'Wolf Reintroduction': {
    steps: [
      {
        text: 'Elk overpopulation is degrading riparian vegetation. Wolves have been absent for 70 years.',
        choices: ['Full pack reintroduction', 'Gradual release of pairs', 'No action (control)'],
        outcomes: ['Rapid elk behavior change but public backlash', 'Slower effect but better social acceptance', 'Continued degradation baseline data']
      },
      {
        text: 'Design a monitoring plan for wolf-elk-vegetation interactions.',
        choices: ['Satellite vegetation mapping + GPS collars', 'Ground surveys only', 'Camera traps + elk counts'],
        outcomes: ['Comprehensive data but expensive', 'Cheaper but limited spatial coverage', 'Good behavioral data, moderate cost']
      },
      {
        text: 'Deploy wolves and monitoring equipment in the field.',
        choices: ['Release in core habitat only', 'Release across multiple sites', 'Release with hazing near ranches'],
        outcomes: ['Strong local effect', 'Wider coverage but diluted impact', 'Reduced livestock conflict']
      },
      {
        text: 'First-year monitoring data: elk avoiding riparian areas, willow recovery beginning.',
        choices: ['Continue monitoring as planned', 'Add vegetation plots', 'Extend to adjacent areas'],
        outcomes: ['Standard data collection continues', 'Better measure of trophic cascade', 'Broader understanding but stretched resources']
      },
      {
        text: 'Year 2: Vegetation recovering in 60% of sites. Two livestock depredation events.',
        choices: ['Focus on conflict mitigation', 'Expand wolf range', 'Maintain current approach'],
        outcomes: ['Better coexistence, slower ecological gains', 'Faster ecological recovery, more conflict', 'Steady progress on both fronts']
      },
      {
        text: 'Adjust management based on 2 years of learning.',
        choices: ['Increase wolf numbers', 'Add compensation program', 'Create buffer zones'],
        outcomes: ['Accelerated recovery cycle', 'Social acceptance improves', 'Spatial management strategy']
      }
    ]
  },
  'Invasive Species': {
    steps: [
      {
        text: 'Purple loosestrife is spreading in a wetland, displacing native cattails and reducing habitat quality.',
        choices: ['Chemical herbicide treatment', 'Biological control (beetles)', 'Manual removal'],
        outcomes: ['Quick kill but collateral damage risk', 'Self-sustaining but slow establishment', 'Precise but labor-intensive']
      },
      {
        text: 'Design your control strategy and success metrics.',
        choices: ['Target dense patches first', 'Perimeter control to stop spread', 'Integrated approach'],
        outcomes: ['Reduces seed source quickly', 'Prevents expansion, slower density reduction', 'Best coverage but complex logistics']
      },
      {
        text: 'Begin field implementation of the control plan.',
        choices: ['Treat during flowering season', 'Treat in early spring', 'Year-round treatment'],
        outcomes: ['Maximum reproductive disruption', 'Catch plants before seeding', 'Consistent pressure but higher cost']
      },
      {
        text: 'Monitor treatment effectiveness and non-target impacts.',
        choices: ['Vegetation transects quarterly', 'Drone surveys monthly', 'Citizen science monitoring'],
        outcomes: ['Detailed but infrequent data', 'Frequent spatial data', 'Broad coverage, variable quality']
      },
      {
        text: 'Results: 40% reduction in loosestrife. Native plants recolonizing treated areas.',
        choices: ['Declare partial success, continue', 'Intensify treatment', 'Shift to maintenance mode'],
        outcomes: ['Steady progress', 'Faster results but higher cost', 'Sustainable long-term approach']
      },
      {
        text: 'Adapt strategy for the next management cycle.',
        choices: ['Add beetle release in remaining patches', 'Focus on native plant restoration', 'Combine both approaches'],
        outcomes: ['Biological control for persistence', 'Competitive exclusion strategy', 'Comprehensive ecosystem recovery']
      }
    ]
  },
  'Wetland Restoration': {
    steps: [
      {
        text: 'A drained agricultural field was once a productive wetland. Restoration is being considered.',
        choices: ['Full hydrological restoration', 'Partial restoration with buffers', 'Created wetland (new location)'],
        outcomes: ['Maximum ecological benefit, high cost', 'Moderate benefit, farmer cooperation', 'Flexibility but less natural']
      },
      {
        text: 'Design restoration targets and timeline.',
        choices: ['5-year native species targets', 'Hydrology-first approach', 'Phased multi-objective plan'],
        outcomes: ['Clear measurable goals', 'Let water drive succession naturally', 'Balanced but complex tracking']
      },
      {
        text: 'Begin earthwork and planting.',
        choices: ['Machine grading + seed bank activation', 'Minimal intervention (remove drain tiles)', 'Full planting of native species'],
        outcomes: ['Fast physical restoration', 'Natural recovery, unpredictable timeline', 'Designed plant community']
      },
      {
        text: 'Monitor water levels, species colonization, and water quality.',
        choices: ['Automated water level loggers', 'Seasonal bird and plant surveys', 'Water quality sampling'],
        outcomes: ['Continuous hydrology data', 'Biodiversity tracking', 'Ecosystem services documentation']
      },
      {
        text: 'Year 3: Wetland holds water 8 months/year. 45 bird species detected. Nutrient reduction of 60%.',
        choices: ['Compare to reference wetland', 'Assess ecosystem services value', 'Identify remaining gaps'],
        outcomes: ['Benchmarking progress', 'Economic justification', 'Targeted improvements']
      },
      {
        text: 'Adjust for the next cycle of adaptive management.',
        choices: ['Enhance habitat diversity', 'Address invasive species', 'Expand restoration area'],
        outcomes: ['More niches for wildlife', 'Protect investment', 'Scale up success']
      }
    ]
  }
};

let activeStep = -1;
let choicesMade = [];
let outcomeLog = [];
let cycleNum = 1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Adaptive management cycle with interactive decision-making for ecological scenarios', LABEL);

  scenarioSelect = createSelect();
  scenarioSelect.parent(document.querySelector('main'));
  for (let s in scenarios) scenarioSelect.option(s);
  scenarioSelect.changed(resetCycle);

  resetBtn = createButton('Reset Cycle');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetCycle);
}

function resetCycle() {
  activeStep = -1;
  choicesMade = [];
  outcomeLog = [];
  cycleNum = 1;
}

function draw() {
  updateCanvasSize();

  let scenario = scenarios[scenarioSelect.value()];

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Adaptive Management Cycle ' + cycleNum, canvasWidth / 2, 5);

  // Draw circular nodes
  let cx = canvasWidth * 0.32;
  let cy = 185;
  let radius = min(canvasWidth * 0.22, 110);
  let n = steps.length;

  // Connecting arrows
  for (let i = 0; i < n; i++) {
    let a1 = -PI / 2 + (TWO_PI * i) / n;
    let a2 = -PI / 2 + (TWO_PI * ((i + 1) % n)) / n;
    let x1 = cx + cos(a1) * radius;
    let y1 = cy + sin(a1) * radius;
    let x2 = cx + cos(a2) * radius;
    let y2 = cy + sin(a2) * radius;

    let completed = i < activeStep;
    let active = i === activeStep;
    stroke(completed ? color(100, 200, 100) : active ? color(50, 50, 50) : color(200));
    strokeWeight(completed ? 3 : 2);

    // Curved arrow
    let midAngle = (a1 + a2) / 2;
    let mx = cx + cos(midAngle) * (radius + 15);
    let my = cy + sin(midAngle) * (radius + 15);

    noFill();
    beginShape();
    vertex(x1, y1);
    quadraticVertex(mx, my, x2, y2);
    endShape();

    // Arrowhead
    let angle = atan2(y2 - my, x2 - mx);
    fill(completed ? color(100, 200, 100) : active ? color(50, 50, 50) : color(200));
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(-10, -5, -10, 5, 0, 0);
    pop();
  }

  // Draw step nodes
  for (let i = 0; i < n; i++) {
    let a = -PI / 2 + (TWO_PI * i) / n;
    let nx = cx + cos(a) * radius;
    let ny = cy + sin(a) * radius;
    let nodeSize = (i === activeStep) ? 55 : 42;

    let completed = i < activeStep;
    let active = i === activeStep;
    let sc = steps[i].color;

    if (active) {
      // Glow effect
      noStroke();
      fill(sc[0], sc[1], sc[2], 40);
      ellipse(nx, ny, nodeSize + 20, nodeSize + 20);
    }

    fill(completed ? color(sc[0], sc[1], sc[2]) : active ? color(sc[0], sc[1], sc[2]) : color(220));
    stroke(completed || active ? color(sc[0] * 0.7, sc[1] * 0.7, sc[2] * 0.7) : color(180));
    strokeWeight(active ? 3 : 1.5);
    ellipse(nx, ny, nodeSize, nodeSize);

    noStroke();
    fill(completed || active ? 255 : 100);
    textSize(8);
    textAlign(CENTER, CENTER);
    text(steps[i].short, nx, ny);

    // Step number
    fill(completed || active ? 255 : 150);
    textSize(7);
    text((i + 1), nx, ny - nodeSize / 2 + 6);
  }

  // Center panel - scenario content
  let panelX = canvasWidth * 0.58;
  let panelY = 30;
  let panelW = canvasWidth * 0.40;
  let panelH = 290;

  fill(255, 255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 6);

  noStroke();
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);

  if (activeStep === -1) {
    // Starting state
    fill(80);
    textSize(12);
    let msg = 'Click "Start Cycle" to begin managing:\n\n' + scenarioSelect.value();
    text(msg, panelX + 8, panelY + 8, panelW - 16, panelH - 16);

    // Draw Start button area
    fill(50, 150, 50);
    noStroke();
    rect(panelX + 10, panelY + panelH - 40, panelW - 20, 30, 5);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Start Cycle', panelX + panelW / 2, panelY + panelH - 25);
  } else if (activeStep < 6) {
    let stepData = scenario.steps[activeStep];

    // Step name
    fill(steps[activeStep].color[0], steps[activeStep].color[1], steps[activeStep].color[2]);
    textSize(13);
    textAlign(LEFT, TOP);
    text('Step ' + (activeStep + 1) + ': ' + steps[activeStep].name, panelX + 8, panelY + 8);

    // Situation text
    fill(0);
    textSize(10);
    text(stepData.text, panelX + 8, panelY + 28, panelW - 16, 60);

    // Choice buttons
    textSize(10);
    let btnY = panelY + 95;
    for (let c = 0; c < stepData.choices.length; c++) {
      let bx = panelX + 8;
      let by = btnY + c * 42;
      let bw = panelW - 16;
      let bh = 36;

      let chosen = choicesMade.length > activeStep && choicesMade[activeStep] === c;
      fill(chosen ? color(200, 230, 200) : color(240, 245, 255));
      stroke(chosen ? color(100, 180, 100) : color(180));
      strokeWeight(1);
      rect(bx, by, bw, bh, 4);

      noStroke();
      fill(0);
      textAlign(LEFT, CENTER);
      text((c + 1) + '. ' + stepData.choices[c], bx + 6, by + bh / 2, bw - 12, bh);
    }

    // Show outcome if choice was made
    if (choicesMade.length > activeStep) {
      let outcomeY = btnY + 3 * 42 + 5;
      fill(240, 248, 240);
      stroke(150, 200, 150);
      strokeWeight(1);
      rect(panelX + 8, outcomeY, panelW - 16, 40, 4);
      noStroke();
      fill(40, 100, 40);
      textSize(9);
      textAlign(LEFT, TOP);
      text('Outcome: ' + stepData.outcomes[choicesMade[activeStep]], panelX + 12, outcomeY + 4, panelW - 24, 36);

      // Next button
      fill(50, 120, 200);
      noStroke();
      rect(panelX + panelW - 80, outcomeY + 42, 70, 24, 5);
      fill(255);
      textSize(11);
      textAlign(CENTER, CENTER);
      text('Next \u2192', panelX + panelW - 45, outcomeY + 54);
    }
  } else {
    // Cycle complete
    fill(50, 130, 50);
    textSize(13);
    textAlign(CENTER, TOP);
    text('Cycle ' + cycleNum + ' Complete!', panelX + panelW / 2, panelY + 10);

    fill(0);
    textSize(9);
    textAlign(LEFT, TOP);
    let logY = panelY + 30;
    for (let i = 0; i < min(outcomeLog.length, 6); i++) {
      text((i + 1) + '. ' + outcomeLog[i], panelX + 8, logY + i * 20, panelW - 16, 20);
    }

    // New cycle button
    fill(50, 150, 50);
    noStroke();
    rect(panelX + 10, panelY + panelH - 40, panelW - 20, 30, 5);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Start Cycle ' + (cycleNum + 1), panelX + panelW / 2, panelY + panelH - 25);
  }

  // Decision log at bottom
  let logY = 330;
  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(5, logY, canvasWidth - 10, drawHeight - logY - 5, 4);

  noStroke();
  fill(0);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Decision Log:', 12, logY + 4);
  textSize(9);
  fill(80);
  let logText = '';
  for (let i = 0; i < outcomeLog.length; i++) {
    logText += (i + 1) + '. ' + outcomeLog[i] + '  ';
  }
  if (logText === '') logText = 'No decisions made yet.';
  text(logText, 12, logY + 18, canvasWidth - 24, drawHeight - logY - 25);

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Scenario:', 10, drawHeight + 25);
  scenarioSelect.position(90, drawHeight + 15);
  resetBtn.position(300, drawHeight + 15);
}

function mousePressed() {
  let scenario = scenarios[scenarioSelect.value()];
  let panelX = canvasWidth * 0.58;
  let panelY = 30;
  let panelW = canvasWidth * 0.40;
  let panelH = 290;

  // Start button
  if (activeStep === -1) {
    if (mouseX > panelX + 10 && mouseX < panelX + panelW - 10 &&
        mouseY > panelY + panelH - 40 && mouseY < panelY + panelH - 10) {
      activeStep = 0;
      return;
    }
  }

  // Choice buttons
  if (activeStep >= 0 && activeStep < 6 && choicesMade.length <= activeStep) {
    let btnY = panelY + 95;
    for (let c = 0; c < 3; c++) {
      let bx = panelX + 8;
      let by = btnY + c * 42;
      let bw = panelW - 16;
      let bh = 36;
      if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
        choicesMade.push(c);
        outcomeLog.push(scenario.steps[activeStep].outcomes[c]);
        return;
      }
    }
  }

  // Next button
  if (activeStep >= 0 && activeStep < 6 && choicesMade.length > activeStep) {
    let btnY = panelY + 95;
    let outcomeY = btnY + 3 * 42 + 5;
    if (mouseX > panelX + panelW - 80 && mouseX < panelX + panelW - 10 &&
        mouseY > outcomeY + 42 && mouseY < outcomeY + 66) {
      activeStep++;
      return;
    }
  }

  // New cycle button
  if (activeStep >= 6) {
    if (mouseX > panelX + 10 && mouseX < panelX + panelW - 10 &&
        mouseY > panelY + panelH - 40 && mouseY < panelY + panelH - 10) {
      cycleNum++;
      activeStep = 0;
      choicesMade = [];
      outcomeLog = [];
      return;
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
