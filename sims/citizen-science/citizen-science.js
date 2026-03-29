// Citizen Science Project Finder MicroSim
let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let projects = [];
let filteredProjects = [];
let selectedProject = -1;
let scrollOffset = 0;
let topicFilter, diffFilter, settingFilter;
let matchBtn, resetBtn;
let quizActive = false;
let quizStep = 0;
let quizAnswers = [];
let quizQuestions = [
  { q: 'What interests you most?', opts: ['Birds & Wildlife', 'Water & Oceans', 'Air Quality', 'Plants & Trees', 'Climate & Weather'] },
  { q: 'How much time can you give per week?', opts: ['< 1 hour', '1-3 hours', '3+ hours'] },
  { q: 'Where would you prefer to work?', opts: ['Outdoors', 'Indoors', 'Either'] },
  { q: 'Your experience level?', opts: ['Beginner', 'Intermediate', 'Advanced'] },
  { q: 'Do you have a smartphone with camera?', opts: ['Yes', 'No'] }
];
let quizResults = [];
let quizBtns = [];

function initProjects() {
  projects = [
    { name: 'eBird', topic: 'Birds', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'Record bird sightings anywhere. The largest biodiversity citizen science project in the world. Your observations help track bird populations and migration patterns.',
      icon: '🐦', color: [42, 157, 143], url: 'ebird.org' },
    { name: 'iNaturalist', topic: 'Plants', diff: 'Beginner', time: '1-3 hrs/wk', setting: 'Outdoor',
      desc: 'Photograph and identify any living organism. AI helps with ID, and experts verify. Contributes to global biodiversity databases.',
      icon: '🌿', color: [42, 157, 143], url: 'inaturalist.org' },
    { name: 'Globe Observer', topic: 'Climate', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'NASA-sponsored project measuring clouds, land cover, and mosquito habitats. Data helps validate satellite observations.',
      icon: '🌍', color: [244, 162, 97], url: 'observer.globe.gov' },
    { name: 'CoCoRaHS', topic: 'Climate', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'Community Collaborative Rain, Hail & Snow Network. Measure precipitation daily with a simple rain gauge.',
      icon: '🌧', color: [244, 162, 97], url: 'cocorahs.org' },
    { name: 'Creek Watch', topic: 'Water', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'Monitor local waterways by reporting water level, flow rate, and amount of trash. Helps track watershed health.',
      icon: '💧', color: [69, 123, 157], url: 'creekwatch.org' },
    { name: 'Reef Check', topic: 'Water', diff: 'Advanced', time: '3+ hrs/wk', setting: 'Outdoor',
      desc: 'Trained volunteer divers survey coral reef health worldwide. Requires SCUBA certification and training workshop.',
      icon: '🐠', color: [69, 123, 157], url: 'reefcheck.org' },
    { name: 'AirVisual', topic: 'Air', diff: 'Intermediate', time: '1-3 hrs/wk', setting: 'Either',
      desc: 'Contribute air quality data using a low-cost sensor or smartphone. Helps create hyperlocal pollution maps.',
      icon: '💨', color: [123, 44, 191], url: 'iqair.com' },
    { name: 'Budburst', topic: 'Plants', diff: 'Beginner', time: '1-3 hrs/wk', setting: 'Outdoor',
      desc: 'Track when plants leaf out, flower, and fruit. Data reveals how climate change affects plant phenology.',
      icon: '🌸', color: [42, 157, 143], url: 'budburst.org' },
    { name: 'FoldIt', topic: 'Climate', diff: 'Intermediate', time: '1-3 hrs/wk', setting: 'Indoor',
      desc: 'Solve protein folding puzzles that help scientists design enzymes for breaking down pollutants and capturing carbon.',
      icon: '🧬', color: [244, 162, 97], url: 'fold.it' },
    { name: 'Zooniverse', topic: 'Birds', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Indoor',
      desc: 'Classify wildlife camera trap images from home. Help researchers identify animals and track population changes.',
      icon: '📷', color: [42, 157, 143], url: 'zooniverse.org' },
    { name: 'ISeeChange', topic: 'Climate', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'Document how weather and climate changes affect your community. Share observations and photos of local impacts.',
      icon: '🌡', color: [244, 162, 97], url: 'iseechange.org' },
    { name: 'Water Reporter', topic: 'Water', diff: 'Beginner', time: '< 1 hr/wk', setting: 'Outdoor',
      desc: 'Report water quality issues like algal blooms, pollution, or flooding in your local waterways.',
      icon: '🏞', color: [69, 123, 157], url: 'waterreporter.org' }
  ];
  filteredProjects = [...projects];
}

function filterProjects() {
  let topic = topicFilter.value();
  let diff = diffFilter.value();
  let setting = settingFilter.value();
  filteredProjects = projects.filter(p => {
    if (topic !== 'All' && p.topic !== topic) return false;
    if (diff !== 'All' && p.diff !== diff) return false;
    if (setting !== 'All' && p.setting !== setting) return false;
    return true;
  });
  selectedProject = -1;
  scrollOffset = 0;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Citizen science project finder with filtering and a personality quiz for personalized recommendations.', LABEL);

  topicFilter = createSelect();
  topicFilter.parent(document.querySelector('main'));
  topicFilter.option('All');
  topicFilter.option('Birds');
  topicFilter.option('Water');
  topicFilter.option('Air');
  topicFilter.option('Plants');
  topicFilter.option('Climate');
  topicFilter.changed(filterProjects);

  diffFilter = createSelect();
  diffFilter.parent(document.querySelector('main'));
  diffFilter.option('All');
  diffFilter.option('Beginner');
  diffFilter.option('Intermediate');
  diffFilter.option('Advanced');
  diffFilter.changed(filterProjects);

  settingFilter = createSelect();
  settingFilter.parent(document.querySelector('main'));
  settingFilter.option('All');
  settingFilter.option('Indoor');
  settingFilter.option('Outdoor');
  settingFilter.option('Either');
  settingFilter.changed(filterProjects);

  matchBtn = createButton('🎯 Match Me!');
  matchBtn.parent(document.querySelector('main'));
  matchBtn.mousePressed(() => {
    quizActive = true; quizStep = 0; quizAnswers = []; quizResults = [];
    clearQuizBtns();
    createQuizButtons();
  });

  resetBtn = createButton('Show All');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    quizActive = false;
    clearQuizBtns();
    topicFilter.selected('All');
    diffFilter.selected('All');
    settingFilter.selected('All');
    filterProjects();
  });

  initProjects();
}

function clearQuizBtns() {
  for (let b of quizBtns) b.remove();
  quizBtns = [];
}

function createQuizButtons() {
  clearQuizBtns();
  if (quizStep >= quizQuestions.length) {
    // Calculate results
    computeQuizResults();
    quizActive = false;
    return;
  }
  let q = quizQuestions[quizStep];
  for (let opt of q.opts) {
    let b = createButton(opt);
    b.parent(document.querySelector('main'));
    b.style('margin', '3px');
    b.style('font-size', '12px');
    let answer = opt;
    b.mousePressed(() => {
      quizAnswers.push(answer);
      quizStep++;
      createQuizButtons();
    });
    quizBtns.push(b);
  }
}

function computeQuizResults() {
  clearQuizBtns();
  // Score each project based on quiz answers
  let scores = projects.map((p, idx) => {
    let s = 0;
    // Interest match
    let interest = quizAnswers[0] || '';
    if (interest.includes('Bird') && p.topic === 'Birds') s += 3;
    if (interest.includes('Water') && p.topic === 'Water') s += 3;
    if (interest.includes('Air') && p.topic === 'Air') s += 3;
    if (interest.includes('Plant') && p.topic === 'Plants') s += 3;
    if (interest.includes('Climate') && p.topic === 'Climate') s += 3;
    // Time match
    let timeAns = quizAnswers[1] || '';
    if (timeAns === '< 1 hour' && p.time.includes('< 1')) s += 2;
    if (timeAns === '1-3 hours' && p.time.includes('1-3')) s += 2;
    if (timeAns === '3+ hours' && p.time.includes('3+')) s += 2;
    // Setting match
    let settingAns = quizAnswers[2] || '';
    if (settingAns === 'Outdoors' && p.setting === 'Outdoor') s += 2;
    if (settingAns === 'Indoors' && p.setting === 'Indoor') s += 2;
    if (settingAns === 'Either') s += 1;
    // Difficulty
    let expAns = quizAnswers[3] || '';
    if (expAns === p.diff) s += 2;
    return { idx, score: s };
  });
  scores.sort((a, b) => b.score - a.score);
  filteredProjects = scores.slice(0, 5).map(s => projects[s.idx]);
  selectedProject = -1;
  scrollOffset = 0;
}

function draw() {
  updateCanvasSize();

  // Background
  fill(38, 70, 83);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('🔬 Citizen Science Project Finder', canvasWidth / 2, 8);

  // Filter labels
  fill(168, 218, 220);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Topic        Difficulty        Setting', 10, 32);

  // Quiz overlay
  if (quizActive) {
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 50, canvasWidth, drawHeight - 50);
    fill(255);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    if (quizStep < quizQuestions.length) {
      text('Question ' + (quizStep + 1) + ' of ' + quizQuestions.length, canvasWidth / 2, 80);
      textSize(14);
      text(quizQuestions[quizStep].q, canvasWidth / 2, 110);
    }
    return;
  }

  // Project cards
  let cardStartY = 52;
  let cardH = 60;
  let cardSpacing = 5;
  let visibleCards = floor((drawHeight - cardStartY - 10) / (cardH + cardSpacing));

  if (selectedProject >= 0) {
    // Show expanded card
    let p = filteredProjects[selectedProject];
    let cy = cardStartY;
    let ch = drawHeight - cardStartY - 10;

    fill(255);
    noStroke();
    rect(10, cy, canvasWidth - 20, ch, 8);

    // Icon and name
    fill(p.color[0], p.color[1], p.color[2]);
    noStroke();
    textSize(28);
    textAlign(LEFT, TOP);
    text(p.icon, 20, cy + 10);
    fill(38, 70, 83);
    textSize(18);
    text(p.name, 60, cy + 14);

    // Badges
    textSize(10);
    let bx = 60;
    let by = cy + 40;
    fill(42, 157, 143);
    noStroke();
    rect(bx, by, 60, 18, 9);
    fill(255);
    textAlign(CENTER, CENTER);
    text(p.topic, bx + 30, by + 9);

    fill(69, 123, 157);
    rect(bx + 65, by, 70, 18, 9);
    fill(255);
    text(p.diff, bx + 100, by + 9);

    fill(244, 162, 97);
    rect(bx + 140, by, 70, 18, 9);
    fill(255);
    text(p.time, bx + 175, by + 9);

    // Description
    fill(60);
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    text(p.desc, 20, cy + 70, canvasWidth - 50, ch - 110);

    // Setting and URL
    fill(100);
    textSize(11);
    text('Setting: ' + p.setting + '  |  ' + p.url, 20, cy + ch - 35);

    // Back button area
    fill(38, 70, 83);
    noStroke();
    rect(20, cy + ch - 55, 80, 24, 4);
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('← Back', 60, cy + ch - 43);
  } else {
    // Card list
    for (let i = 0; i < min(filteredProjects.length, visibleCards); i++) {
      let idx = i + scrollOffset;
      if (idx >= filteredProjects.length) break;
      let p = filteredProjects[idx];
      let cy = cardStartY + i * (cardH + cardSpacing);

      // Card bg
      fill(255, 255, 255, 240);
      noStroke();
      rect(10, cy, canvasWidth - 20, cardH, 6);

      // Icon
      fill(p.color[0], p.color[1], p.color[2]);
      noStroke();
      textSize(24);
      textAlign(LEFT, CENTER);
      text(p.icon, 18, cy + cardH / 2);

      // Name
      fill(38, 70, 83);
      noStroke();
      textSize(14);
      textAlign(LEFT, TOP);
      text(p.name, 52, cy + 8);

      // Badges
      textSize(9);
      fill(p.color[0], p.color[1], p.color[2]);
      noStroke();
      rect(52, cy + 28, 45, 14, 7);
      fill(255);
      textAlign(CENTER, CENTER);
      text(p.topic, 74, cy + 35);

      fill(100);
      noStroke();
      rect(102, cy + 28, 55, 14, 7);
      fill(255);
      text(p.diff, 129, cy + 35);

      fill(80);
      rect(162, cy + 28, 55, 14, 7);
      fill(255);
      text(p.time, 189, cy + 35);

      // Setting
      fill(120);
      noStroke();
      textSize(9);
      textAlign(RIGHT, CENTER);
      text(p.setting, canvasWidth - 25, cy + cardH / 2);
    }

    if (filteredProjects.length === 0) {
      fill(168, 218, 220);
      noStroke();
      textSize(14);
      textAlign(CENTER, CENTER);
      text('No projects match your filters.\nTry different criteria or click "Show All".', canvasWidth / 2, drawHeight / 2);
    }

    // Scroll hint
    if (filteredProjects.length > visibleCards) {
      fill(168, 218, 220, 150);
      noStroke();
      textSize(10);
      textAlign(CENTER);
      text('Scroll: ' + (scrollOffset + 1) + '-' + min(scrollOffset + visibleCards, filteredProjects.length) + ' of ' + filteredProjects.length, canvasWidth / 2, drawHeight - 8);
    }
  }

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function mousePressed() {
  if (mouseY < 52 || mouseY > drawHeight) return;

  if (selectedProject >= 0) {
    // Check back button
    let cy = 52;
    let ch = drawHeight - 62;
    if (mouseX > 20 && mouseX < 100 && mouseY > cy + ch - 55 && mouseY < cy + ch - 31) {
      selectedProject = -1;
    }
    return;
  }

  let cardH = 60;
  let cardSpacing = 5;
  let cardStartY = 52;
  let clickedIdx = floor((mouseY - cardStartY) / (cardH + cardSpacing)) + scrollOffset;
  if (clickedIdx >= 0 && clickedIdx < filteredProjects.length) {
    selectedProject = clickedIdx;
  }
}

function mouseWheel(event) {
  let cardH = 60;
  let cardSpacing = 5;
  let visibleCards = floor((drawHeight - 52 - 10) / (cardH + cardSpacing));
  if (event.delta > 0) {
    scrollOffset = min(scrollOffset + 1, max(0, filteredProjects.length - visibleCards));
  } else {
    scrollOffset = max(0, scrollOffset - 1);
  }
  return false;
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
