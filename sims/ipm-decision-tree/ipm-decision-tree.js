// Integrated Pest Management Decision Flowchart - vis-network
// CANVAS_HEIGHT: 645
// Interactive decision tree for IPM strategies

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('h2');
  title.textContent = 'IPM Decision Flowchart';
  title.style.textAlign = 'center';
  title.style.fontFamily = 'Arial, sans-serif';
  title.style.margin = '10px 0 5px 0';
  main.appendChild(title);

  // Scenario selector
  const controlDiv = document.createElement('div');
  controlDiv.style.textAlign = 'center';
  controlDiv.style.margin = '5px 0 10px 0';
  controlDiv.style.fontFamily = 'Arial, sans-serif';
  controlDiv.style.fontSize = '14px';

  const scenLabel = document.createElement('span');
  scenLabel.textContent = 'Scenario: ';
  controlDiv.appendChild(scenLabel);

  const scenSelect = document.createElement('select');
  scenSelect.style.fontSize = '14px';
  scenSelect.style.padding = '4px 8px';
  const scenarios = ['Aphids on Vegetables', 'Corn Borers', 'Weeds in Wheat'];
  scenarios.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    scenSelect.appendChild(opt);
  });
  controlDiv.appendChild(scenSelect);
  main.appendChild(controlDiv);

  // Container
  const container = document.createElement('div');
  container.id = 'network';
  container.style.width = '100%';
  container.style.height = '520px';
  container.style.border = '1px solid silver';
  container.style.background = 'aliceblue';
  main.appendChild(container);

  // Info panel
  const info = document.createElement('div');
  info.id = 'info-panel';
  info.style.fontFamily = 'Arial, sans-serif';
  info.style.fontSize = '13px';
  info.style.padding = '8px 12px';
  info.style.margin = '8px auto';
  info.style.maxWidth = '700px';
  info.style.textAlign = 'center';
  info.style.color = '#333';
  info.style.minHeight = '40px';
  info.innerHTML = '<em>Click nodes to explore the IPM decision process. Select a pest scenario above.</em>';
  main.appendChild(info);

  // Scenario-specific data
  const scenarioData = {
    'Aphids on Vegetables': {
      cultural: 'Companion planting with marigolds, reflective mulch, proper spacing',
      biological: 'Release ladybugs and lacewings; apply neem oil spray',
      chemical: 'Targeted insecticidal soap or pyrethrin spray on affected plants only',
      threshold: '50+ aphids per plant or 20% of plants infested',
      culturalCost: '$50/acre', culturalEffect: '60%', culturalImpact: 'green',
      biologicalCost: '$120/acre', biologicalEffect: '75%', biologicalImpact: 'green',
      chemicalCost: '$80/acre', chemicalEffect: '95%', chemicalImpact: 'yellow'
    },
    'Corn Borers': {
      cultural: 'Crop rotation with soybeans, destroy crop residue, plant Bt varieties',
      biological: 'Release Trichogramma wasps; apply Bacillus thuringiensis (Bt)',
      chemical: 'Targeted chlorantraniliprole application at egg-hatch timing',
      threshold: '5+ egg masses per 100 plants',
      culturalCost: '$30/acre', culturalEffect: '55%', culturalImpact: 'green',
      biologicalCost: '$90/acre', biologicalEffect: '80%', biologicalImpact: 'green',
      chemicalCost: '$45/acre', chemicalEffect: '90%', chemicalImpact: 'yellow'
    },
    'Weeds in Wheat': {
      cultural: 'Increase seeding rate, narrow row spacing, cover crops, crop rotation',
      biological: 'Targeted grazing (sheep), bioherbicide fungi application',
      chemical: 'Selective post-emergence herbicide at 2-4 leaf weed stage',
      threshold: '15+ broadleaf weeds per m² or 5+ grass weeds per m²',
      culturalCost: '$25/acre', culturalEffect: '50%', culturalImpact: 'green',
      biologicalCost: '$70/acre', biologicalEffect: '65%', biologicalImpact: 'green',
      chemicalCost: '$35/acre', chemicalEffect: '92%', chemicalImpact: 'yellow'
    }
  };

  function getNodes() {
    return new vis.DataSet([
      // Start
      { id: 'start', label: '🔍 Pest\nDetected', x: 0, y: -220, fixed: true,
        shape: 'box', color: { background: '#5B9BD5', border: '#2E75B6' },
        font: { color: 'white', size: 14, bold: true }, margin: 10 },

      // Threshold decision
      { id: 'threshold', label: 'Above Economic\nThreshold?', x: 0, y: -130, fixed: true,
        shape: 'diamond', color: { background: '#FFC000', border: '#BF9000' },
        font: { size: 12 }, margin: 10, size: 25 },

      // Monitor
      { id: 'monitor', label: '📊 Continue\nMonitoring', x: -220, y: -130, fixed: true,
        shape: 'box', color: { background: '#70AD47', border: '#548235' },
        font: { color: 'white', size: 12 }, margin: 8 },

      // Cultural controls
      { id: 'cultural-q', label: 'Cultural Controls\nAvailable?', x: 0, y: -30, fixed: true,
        shape: 'diamond', color: { background: '#FFC000', border: '#BF9000' },
        font: { size: 12 }, margin: 10, size: 25 },

      { id: 'cultural', label: '🌱 Cultural\nControls', x: -220, y: 10, fixed: true,
        shape: 'box', color: { background: '#70AD47', border: '#548235' },
        font: { color: 'white', size: 12 }, margin: 8 },

      { id: 'cultural-d1', label: 'Crop Rotation', x: -340, y: 70, fixed: true,
        shape: 'box', color: { background: '#C8E6C9', border: '#66BB6A' },
        font: { size: 11 }, margin: 6 },
      { id: 'cultural-d2', label: 'Resistant\nVarieties', x: -220, y: 70, fixed: true,
        shape: 'box', color: { background: '#C8E6C9', border: '#66BB6A' },
        font: { size: 11 }, margin: 6 },
      { id: 'cultural-d3', label: 'Habitat\nModification', x: -100, y: 70, fixed: true,
        shape: 'box', color: { background: '#C8E6C9', border: '#66BB6A' },
        font: { size: 11 }, margin: 6 },

      // Biological controls
      { id: 'bio-q', label: 'Biological Controls\nAvailable?', x: 0, y: 80, fixed: true,
        shape: 'diamond', color: { background: '#FFC000', border: '#BF9000' },
        font: { size: 12 }, margin: 10, size: 25 },

      { id: 'biological', label: '🐞 Biological\nControls', x: -220, y: 130, fixed: true,
        shape: 'box', color: { background: '#4DB6AC', border: '#00897B' },
        font: { color: 'white', size: 12 }, margin: 8 },

      { id: 'bio-d1', label: 'Predator\nRelease', x: -340, y: 190, fixed: true,
        shape: 'box', color: { background: '#B2DFDB', border: '#4DB6AC' },
        font: { size: 11 }, margin: 6 },
      { id: 'bio-d2', label: 'Parasitoid\nIntroduction', x: -220, y: 190, fixed: true,
        shape: 'box', color: { background: '#B2DFDB', border: '#4DB6AC' },
        font: { size: 11 }, margin: 6 },
      { id: 'bio-d3', label: 'Microbial\nPesticide', x: -100, y: 190, fixed: true,
        shape: 'box', color: { background: '#B2DFDB', border: '#4DB6AC' },
        font: { size: 11 }, margin: 6 },

      // Chemical controls
      { id: 'chemical', label: '⚗️ Targeted Chemical\nControl (Last Resort)', x: 0, y: 190, fixed: true,
        shape: 'box', color: { background: '#EF5350', border: '#C62828' },
        font: { color: 'white', size: 12, bold: true }, margin: 10 },

      { id: 'chem-d1', label: 'Specific\nPesticide', x: 60, y: 260, fixed: true,
        shape: 'box', color: { background: '#FFCDD2', border: '#EF5350' },
        font: { size: 11 }, margin: 6 },
      { id: 'chem-d2', label: 'Optimal\nTiming', x: -60, y: 260, fixed: true,
        shape: 'box', color: { background: '#FFCDD2', border: '#EF5350' },
        font: { size: 11 }, margin: 6 },
      { id: 'chem-d3', label: 'Targeted\nApplication', x: -180, y: 260, fixed: true,
        shape: 'box', color: { background: '#FFCDD2', border: '#EF5350' },
        font: { size: 11 }, margin: 6 }
    ]);
  }

  function getEdges() {
    return new vis.DataSet([
      { from: 'start', to: 'threshold', arrows: 'to', width: 2, color: { color: '#555' } },
      { from: 'threshold', to: 'monitor', arrows: 'to', label: 'No', width: 2, color: { color: '#70AD47' },
        font: { size: 12 } },
      { from: 'threshold', to: 'cultural-q', arrows: 'to', label: 'Yes', width: 2, color: { color: '#E53935' },
        font: { size: 12 } },
      { from: 'cultural-q', to: 'cultural', arrows: 'to', label: 'Yes', width: 2, color: { color: '#70AD47' },
        font: { size: 12 } },
      { from: 'cultural', to: 'cultural-d1', arrows: 'to', width: 1.5, color: { color: '#66BB6A' } },
      { from: 'cultural', to: 'cultural-d2', arrows: 'to', width: 1.5, color: { color: '#66BB6A' } },
      { from: 'cultural', to: 'cultural-d3', arrows: 'to', width: 1.5, color: { color: '#66BB6A' } },
      { from: 'cultural-q', to: 'bio-q', arrows: 'to', label: 'Insufficient', width: 2, color: { color: '#FF9800' },
        font: { size: 11 } },
      { from: 'bio-q', to: 'biological', arrows: 'to', label: 'Yes', width: 2, color: { color: '#4DB6AC' },
        font: { size: 12 } },
      { from: 'biological', to: 'bio-d1', arrows: 'to', width: 1.5, color: { color: '#4DB6AC' } },
      { from: 'biological', to: 'bio-d2', arrows: 'to', width: 1.5, color: { color: '#4DB6AC' } },
      { from: 'biological', to: 'bio-d3', arrows: 'to', width: 1.5, color: { color: '#4DB6AC' } },
      { from: 'bio-q', to: 'chemical', arrows: 'to', label: 'Insufficient', width: 2, color: { color: '#E53935' },
        font: { size: 11 } },
      { from: 'chemical', to: 'chem-d1', arrows: 'to', width: 1.5, color: { color: '#EF5350' } },
      { from: 'chemical', to: 'chem-d2', arrows: 'to', width: 1.5, color: { color: '#EF5350' } },
      { from: 'chemical', to: 'chem-d3', arrows: 'to', width: 1.5, color: { color: '#EF5350' } }
    ]);
  }

  var options = {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      navigationButtons: true,
      hover: true
    },
    edges: {
      smooth: { type: 'cubicBezier', roundness: 0.4 },
      font: { align: 'top', color: '#555' }
    },
    nodes: {
      borderWidth: 2,
      shadow: true
    }
  };

  var nodes = getNodes();
  var edges = getEdges();
  var network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

  function getScenarioInfo(nodeId) {
    var scen = scenarioData[scenSelect.value];
    var impactColors = { green: '🟢 Low', yellow: '🟡 Moderate', red: '🔴 High' };

    switch (nodeId) {
      case 'start': return 'Pest detected! First step: identify the pest species and assess population levels.';
      case 'threshold': return '<strong>Economic Threshold for ' + scenSelect.value + ':</strong> ' + scen.threshold;
      case 'monitor': return 'Below threshold -- continue regular scouting. Check again in 3-7 days.';
      case 'cultural-q': return 'Can cultural practices reduce pest pressure before resorting to other controls?';
      case 'cultural': return '<strong>Cultural controls for ' + scenSelect.value + ':</strong> ' + scen.cultural +
        '<br/>Cost: ' + scen.culturalCost + ' | Effectiveness: ' + scen.culturalEffect + ' | Impact: ' + impactColors[scen.culturalImpact];
      case 'cultural-d1': return 'Crop rotation breaks pest life cycles by removing the host plant.';
      case 'cultural-d2': return 'Planting pest-resistant cultivars reduces vulnerability.';
      case 'cultural-d3': return 'Modify habitat to discourage pests (e.g., remove debris, adjust irrigation).';
      case 'bio-q': return 'If cultural controls are insufficient, are biological agents available?';
      case 'biological': return '<strong>Biological controls for ' + scenSelect.value + ':</strong> ' + scen.biological +
        '<br/>Cost: ' + scen.biologicalCost + ' | Effectiveness: ' + scen.biologicalEffect + ' | Impact: ' + impactColors[scen.biologicalImpact];
      case 'bio-d1': return 'Release natural predators (ladybugs, lacewings, parasitic wasps).';
      case 'bio-d2': return 'Introduce parasitoid species that target the specific pest.';
      case 'bio-d3': return 'Apply biological pesticides (Bt, neem, spinosad) with minimal non-target effects.';
      case 'chemical': return '<strong>Chemical control for ' + scenSelect.value + ':</strong> ' + scen.chemical +
        '<br/>Cost: ' + scen.chemicalCost + ' | Effectiveness: ' + scen.chemicalEffect + ' | Impact: ' + impactColors[scen.chemicalImpact];
      case 'chem-d1': return 'Use the most targeted pesticide available -- avoid broad-spectrum.';
      case 'chem-d2': return 'Time application to the most vulnerable pest life stage.';
      case 'chem-d3': return 'Apply only to affected areas, not entire field. Use precision equipment.';
      default: return '';
    }
  }

  network.on('click', function (params) {
    if (params.nodes.length > 0) {
      var nodeId = params.nodes[0];
      var msg = getScenarioInfo(nodeId);
      if (msg) info.innerHTML = msg;
    }
  });

  scenSelect.addEventListener('change', function () {
    info.innerHTML = '<em>Scenario changed to: <strong>' + scenSelect.value + '</strong>. Click nodes to explore.</em>';
  });
});
