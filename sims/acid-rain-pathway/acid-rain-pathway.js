// Acid Rain Formation and Impact Pathway - vis-network
// CANVAS_HEIGHT: 625
// Traces SO2 and NOx from emission sources through atmospheric chemistry to ecological damage

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('div');
  title.style.cssText = 'text-align:center;padding:8px;font-size:18px;font-weight:bold;color:#3e2723;font-family:Arial,Helvetica,sans-serif;';
  title.textContent = 'Acid Rain Formation and Impact Pathway';
  main.appendChild(title);

  // Layout container
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = '100%';
  container.style.height = '520px';
  container.style.fontFamily = 'Arial, Helvetica, sans-serif';
  main.appendChild(container);

  // Network container
  const networkDiv = document.createElement('div');
  networkDiv.id = 'network';
  networkDiv.style.flex = '2';
  networkDiv.style.height = '100%';
  networkDiv.style.border = '1px solid #ccc';
  networkDiv.style.borderRadius = '8px';
  networkDiv.style.background = '#f5f5f0';
  container.appendChild(networkDiv);

  // Info panel
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
  infoPanel.style.flex = '1';
  infoPanel.style.padding = '15px';
  infoPanel.style.overflowY = 'auto';
  infoPanel.style.borderLeft = '2px solid #8d6e63';
  infoPanel.style.background = '#fff';
  infoPanel.style.maxWidth = '280px';
  infoPanel.innerHTML = '<h3 style="color:#3e2723;margin-top:0;">Acid Rain Pathway</h3>' +
    '<p style="color:#5d4037;font-size:13px;">Click any node to trace its connections and learn how acid rain forms and causes damage.</p>' +
    '<p style="color:#9e9e9e;font-size:12px;">Follow pollutants from source to impact.</p>';
  container.appendChild(infoPanel);

  // Controls
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap;align-items:center;';
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset View';
  resetBtn.style.cssText = 'font-size:13px;padding:6px 14px;cursor:pointer;background:#795548;color:white;border:none;border-radius:4px;';
  controls.appendChild(resetBtn);
  main.appendChild(controls);

  // Node definitions
  const defs = {
    // Sources (gray)
    1:  { label: 'Coal Power\nPlant', group: 'source', def: 'Burns coal releasing SO2 and NOx into the atmosphere. Largest single source of SO2 emissions.' },
    2:  { label: 'Vehicles', group: 'source', def: 'Internal combustion engines produce NOx through high-temperature combustion of fuel.' },
    3:  { label: 'Industrial\nFurnaces', group: 'source', def: 'Smelters and refineries release SO2 from sulfur-containing ores and fuels.' },
    // Primary pollutants (orange)
    4:  { label: 'SO\u2082', group: 'pollutant', def: 'Sulfur dioxide -- a colorless gas released by burning sulfur-containing fossil fuels.' },
    5:  { label: 'NOx', group: 'pollutant', def: 'Nitrogen oxides (NO and NO2) -- produced when nitrogen and oxygen react at high temperatures.' },
    // Atmospheric chemistry (red)
    6:  { label: 'SO\u2082 + H\u2082O\n\u2192 H\u2082SO\u2084', group: 'chemistry', def: 'Sulfur dioxide reacts with water vapor to form sulfuric acid (H2SO4), a strong acid.' },
    7:  { label: 'NOx + H\u2082O\n\u2192 HNO\u2083', group: 'chemistry', def: 'Nitrogen oxides react with water vapor to form nitric acid (HNO3).' },
    8:  { label: 'Wind\nTransport', group: 'transport', def: 'Prevailing winds can carry pollutants hundreds of miles from their source before deposition.' },
    9:  { label: 'Acid Rain\n(pH < 5.6)', group: 'chemistry', def: 'Precipitation with pH below 5.6. Normal rain is ~5.6 due to dissolved CO2. Acid rain can reach pH 4.2.' },
    // Impacts (brown/red)
    10: { label: 'Lake\nAcidification', group: 'impact-water', def: 'Lakes drop below pH 5, killing fish eggs, invertebrates, and disrupting aquatic food webs.' },
    11: { label: 'Forest\nDamage', group: 'impact-land', def: 'Acid leaches calcium and magnesium from soil, damages leaf cuticles, and weakens trees against disease.' },
    12: { label: 'Building\nCorrosion', group: 'impact-infra', def: 'Acid dissolves calcium carbonate in marble and limestone, damaging monuments and buildings.' },
    13: { label: 'Soil Nutrient\nLeaching', group: 'impact-land', def: 'Acid rain dissolves essential nutrients (Ca, Mg, K) from topsoil, reducing fertility.' },
    14: { label: 'Aquatic\nSpecies Loss', group: 'impact-water', def: 'Fish, amphibians, and invertebrates decline as pH drops. Aluminum mobilized from soil is toxic to gills.' },
    15: { label: 'pH Scale\nReference', group: 'reference', def: 'Battery acid: 1.0 | Vinegar: 2.8 | Acid rain: 4.2 | Normal rain: 5.6 | Pure water: 7.0 | Baking soda: 8.3' }
  };

  const groupColors = {
    'source':       { bg: '#bdbdbd', border: '#616161', font: '#212121' },
    'pollutant':    { bg: '#ffcc80', border: '#e65100', font: '#bf360c' },
    'chemistry':    { bg: '#ef9a9a', border: '#c62828', font: '#b71c1c' },
    'transport':    { bg: '#b3e5fc', border: '#0277bd', font: '#01579b' },
    'impact-water': { bg: '#90caf9', border: '#1565c0', font: '#0d47a1' },
    'impact-land':  { bg: '#a5d6a7', border: '#2e7d32', font: '#1b5e20' },
    'impact-infra': { bg: '#d7ccc8', border: '#5d4037', font: '#3e2723' },
    'reference':    { bg: '#e1bee7', border: '#7b1fa2', font: '#4a148c' }
  };

  // Fixed positions -- landscape flow left to right
  const positions = {
    1:  { x: -400, y: -120 },  // Coal plant
    2:  { x: -400, y: 10 },    // Vehicles
    3:  { x: -400, y: 140 },   // Industrial
    4:  { x: -200, y: -80 },   // SO2
    5:  { x: -200, y: 70 },    // NOx
    6:  { x: -20, y: -120 },   // SO2 reaction
    7:  { x: -20, y: 110 },    // NOx reaction
    8:  { x: -20, y: -10 },    // Wind transport
    9:  { x: 160, y: -10 },    // Acid rain
    10: { x: 340, y: -140 },   // Lake acidification
    11: { x: 340, y: -50 },    // Forest damage
    12: { x: 340, y: 40 },     // Building corrosion
    13: { x: 340, y: 130 },    // Soil leaching
    14: { x: 490, y: -140 },   // Aquatic species loss
    15: { x: 160, y: 170 }     // pH reference
  };

  // Build nodes
  let nodesArray = [];
  for (let id in defs) {
    let d = defs[id];
    let gc = groupColors[d.group];
    nodesArray.push({
      id: parseInt(id),
      label: d.label,
      x: positions[id].x,
      y: positions[id].y,
      color: { background: gc.bg, border: gc.border, highlight: { background: '#fff', border: gc.border } },
      font: { color: gc.font, size: 12, face: 'Arial', multi: 'html' },
      shape: 'box',
      borderWidth: 2,
      margin: 10,
      fixed: true,
      title: d.def
    });
  }

  // Build edges
  let edgesArray = [
    // Sources to pollutants
    { from: 1, to: 4, label: 'emits', arrows: 'to', color: { color: '#757575' }, width: 2 },
    { from: 1, to: 5, label: 'emits', arrows: 'to', color: { color: '#757575' }, width: 2 },
    { from: 2, to: 5, label: 'emits', arrows: 'to', color: { color: '#757575' }, width: 2 },
    { from: 3, to: 4, label: 'emits', arrows: 'to', color: { color: '#757575' }, width: 2 },
    // Pollutants to chemistry
    { from: 4, to: 6, label: 'reacts', arrows: 'to', color: { color: '#e65100' }, width: 2 },
    { from: 5, to: 7, label: 'reacts', arrows: 'to', color: { color: '#e65100' }, width: 2 },
    // Chemistry to transport
    { from: 6, to: 8, label: 'carried by', arrows: 'to', color: { color: '#0277bd' }, width: 2, dashes: [5, 5] },
    { from: 7, to: 8, label: 'carried by', arrows: 'to', color: { color: '#0277bd' }, width: 2, dashes: [5, 5] },
    // Transport to acid rain
    { from: 8, to: 9, label: 'deposits as', arrows: 'to', color: { color: '#c62828' }, width: 3 },
    // Acid rain to impacts
    { from: 9, to: 10, label: 'acidifies', arrows: 'to', color: { color: '#1565c0' }, width: 2 },
    { from: 9, to: 11, label: 'damages', arrows: 'to', color: { color: '#2e7d32' }, width: 2 },
    { from: 9, to: 12, label: 'corrodes', arrows: 'to', color: { color: '#5d4037' }, width: 2 },
    { from: 9, to: 13, label: 'leaches', arrows: 'to', color: { color: '#2e7d32' }, width: 2 },
    // Secondary impacts
    { from: 10, to: 14, label: 'causes', arrows: 'to', color: { color: '#1565c0' }, width: 2 },
    { from: 13, to: 11, label: 'weakens', arrows: 'to', color: { color: '#2e7d32' }, width: 1.5, dashes: [3, 3] },
    // Reference
    { from: 9, to: 15, label: '', color: { color: '#ce93d8' }, width: 1, dashes: [2, 4] }
  ];

  let nodes = new vis.DataSet(nodesArray);
  let edges = new vis.DataSet(edgesArray);

  let options = {
    physics: false,
    interaction: {
      dragNodes: false,
      dragView: false,
      zoomView: false,
      hover: true,
      navigationButtons: true,
      selectConnectedEdges: false
    },
    edges: {
      font: { size: 10, color: '#616161', strokeWidth: 2, strokeColor: '#f5f5f0' },
      smooth: { type: 'curvedCW', roundness: 0.12 }
    }
  };

  let network = new vis.Network(networkDiv, { nodes, edges }, options);

  // Offset to center the left-to-right layout
  network.once('afterDrawing', function () {
    let pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x + 40, y: pos.y + 10 }, animation: false });
  });

  // Click handler
  let highlightedNodes = new Set();
  let highlightedEdges = new Set();

  network.on('click', function (params) {
    resetHighlights();
    if (params.nodes.length > 0) {
      let nodeId = params.nodes[0];
      let d = defs[nodeId];
      let connEdges = network.getConnectedEdges(nodeId);
      let connNodes = network.getConnectedNodes(nodeId);

      highlightedNodes.add(nodeId);
      connNodes.forEach(function (n) { highlightedNodes.add(n); });
      connEdges.forEach(function (e) { highlightedEdges.add(e); });

      nodesArray.forEach(function (n) {
        nodes.update({ id: n.id, opacity: highlightedNodes.has(n.id) ? 1.0 : 0.15 });
      });
      edgesArray.forEach(function (e, idx) {
        let edgeId = edges.getIds()[idx];
        edges.update({ id: edgeId, hidden: !highlightedEdges.has(edgeId) });
      });

      let groupNames = {
        'source': 'Emission Source', 'pollutant': 'Primary Pollutant',
        'chemistry': 'Atmospheric Chemistry', 'transport': 'Transport',
        'impact-water': 'Aquatic Impact', 'impact-land': 'Terrestrial Impact',
        'impact-infra': 'Infrastructure Impact', 'reference': 'Reference'
      };
      let connLabels = connNodes.map(function (n) { return defs[n].label.replace(/\n/g, ' '); }).join(', ');
      infoPanel.innerHTML =
        '<h3 style="color:' + groupColors[d.group].font + ';margin-top:0;">' + d.label.replace(/\n/g, ' ') + '</h3>' +
        '<p style="color:#9e9e9e;font-size:11px;margin:2px 0;">Stage: ' + groupNames[d.group] + '</p>' +
        '<p style="color:#3e2723;font-size:13px;">' + d.def + '</p>' +
        '<hr style="border:none;border-top:1px solid #e0e0e0;">' +
        '<p style="color:#5d4037;font-size:12px;"><strong>Connected to:</strong> ' + connLabels + '</p>';
    }
  });

  function resetHighlights() {
    highlightedNodes.clear();
    highlightedEdges.clear();
    nodesArray.forEach(function (n) { nodes.update({ id: n.id, opacity: 1.0 }); });
    edgesArray.forEach(function (e, idx) {
      let edgeId = edges.getIds()[idx];
      edges.update({ id: edgeId, hidden: false });
    });
  }

  resetBtn.addEventListener('click', function () {
    resetHighlights();
    infoPanel.innerHTML = '<h3 style="color:#3e2723;margin-top:0;">Acid Rain Pathway</h3>' +
      '<p style="color:#5d4037;font-size:13px;">Click any node to trace its connections and learn how acid rain forms and causes damage.</p>' +
      '<p style="color:#9e9e9e;font-size:12px;">Follow pollutants from source to impact.</p>';
    network.fit({ animation: true });
  });

  // Legend
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;gap:12px;padding:8px;font-size:11px;flex-wrap:wrap;';
  legend.innerHTML =
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#bdbdbd;border:2px solid #616161;display:inline-block;border-radius:3px;"></span> Sources</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ffcc80;border:2px solid #e65100;display:inline-block;border-radius:3px;"></span> Pollutants</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ef9a9a;border:2px solid #c62828;display:inline-block;border-radius:3px;"></span> Chemistry</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#b3e5fc;border:2px solid #0277bd;display:inline-block;border-radius:3px;"></span> Transport</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#90caf9;border:2px solid #1565c0;display:inline-block;border-radius:3px;"></span> Aquatic Impact</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#a5d6a7;border:2px solid #2e7d32;display:inline-block;border-radius:3px;"></span> Terrestrial Impact</span>';
  main.appendChild(legend);
});
