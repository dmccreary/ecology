// Criteria Air Pollutants Source-to-Impact Tracker - vis-network
// Three-column network: Sources -> Six criteria pollutants + VOCs -> Health and environmental impacts

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('div');
  title.style.cssText = 'text-align:center;padding:8px;font-size:18px;font-weight:bold;color:#3e2723;font-family:Arial,Helvetica,sans-serif;';
  title.textContent = 'Criteria Air Pollutants: Source to Impact';
  main.appendChild(title);

  // Layout container
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = '100%';
  container.style.height = '550px';
  container.style.fontFamily = 'Arial, Helvetica, sans-serif';
  main.appendChild(container);

  // Network container
  const networkDiv = document.createElement('div');
  networkDiv.id = 'network';
  networkDiv.style.flex = '2';
  networkDiv.style.height = '100%';
  networkDiv.style.border = '1px solid #ccc';
  networkDiv.style.borderRadius = '8px';
  networkDiv.style.background = '#f9f9f6';
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
  infoPanel.innerHTML = '<h3 style="color:#3e2723;margin-top:0;">Pollutant Tracker</h3>' +
    '<p style="color:#5d4037;font-size:13px;">Click any node to highlight all connected paths from source to impact.</p>' +
    '<p style="color:#9e9e9e;font-size:12px;">Six criteria pollutants regulated by the Clean Air Act, plus VOCs as a precursor.</p>';
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
    // Sources (gray) - LEFT column
    1:  { label: 'Vehicles', group: 'source', def: 'Cars, trucks, and buses emit CO, NOx, PM2.5, and VOCs from fuel combustion.' },
    2:  { label: 'Power\nPlants', group: 'source', def: 'Coal and gas-fired plants are major sources of SO2, NOx, and particulate matter.' },
    3:  { label: 'Industry', group: 'source', def: 'Factories, refineries, and smelters emit SO2, PM, VOCs, and lead.' },
    4:  { label: 'Natural\nSources', group: 'source', def: 'Volcanoes emit SO2, wildfires produce PM and CO, lightning creates NOx, trees release VOCs.' },
    // Pollutants (orange/red) - CENTER column
    5:  { label: 'CO', group: 'primary', def: 'Carbon monoxide -- colorless, odorless gas from incomplete combustion. Binds to hemoglobin, reducing oxygen transport in blood.' },
    6:  { label: 'SO\u2082', group: 'primary', def: 'Sulfur dioxide -- from burning sulfur-containing fuels. Irritates airways and forms acid rain.' },
    7:  { label: 'NOx', group: 'primary', def: 'Nitrogen oxides (NO + NO2) -- from high-temperature combustion. Key precursor to ozone and acid rain.' },
    8:  { label: 'O\u2083\n(Ground)', group: 'secondary', def: 'Ground-level ozone -- NOT emitted directly. Formed when NOx + VOCs react in sunlight. Major component of smog.' },
    9:  { label: 'PM\u2082.\u2085 /\nPM\u2081\u2080', group: 'primary', def: 'Particulate matter -- tiny solid or liquid particles. PM2.5 penetrates deep into lungs and enters bloodstream.' },
    10: { label: 'Pb\n(Lead)', group: 'primary', def: 'Lead -- toxic heavy metal. Previously from leaded gasoline, now primarily from smelters and battery recycling.' },
    11: { label: 'VOCs', group: 'precursor', def: 'Volatile organic compounds -- precursors to ozone. From vehicles, solvents, and vegetation. Not criteria pollutants but critical for O3 formation.' },
    // Health impacts (purple) - RIGHT column top
    12: { label: 'Respiratory\nDisease', group: 'health', def: 'Asthma, bronchitis, COPD, and reduced lung function from inhaling pollutants that irritate and inflame airways.' },
    13: { label: 'Cardiovascular\nDisease', group: 'health', def: 'Heart attacks, stroke, and arterial damage. PM2.5 and CO enter the bloodstream affecting the heart and vessels.' },
    14: { label: 'Neurological\nDamage', group: 'health', def: 'Lead exposure causes irreversible brain damage, especially in children. CO reduces oxygen to the brain.' },
    // Environmental impacts (brown) - RIGHT column bottom
    15: { label: 'Acid Rain', group: 'environ', def: 'SO2 and NOx form sulfuric and nitric acids that damage forests, acidify lakes, and corrode buildings.' },
    16: { label: 'Smog', group: 'environ', def: 'Photochemical smog -- brown haze from O3, NOx, and PM. Reduces visibility and triggers health advisories.' },
    17: { label: 'Ecosystem\nDamage', group: 'environ', def: 'Nitrogen deposition causes eutrophication. Ozone damages plant leaves and reduces crop yields. Lead bioaccumulates.' }
  };

  const groupColors = {
    'source':    { bg: '#bdbdbd', border: '#616161', font: '#212121' },
    'primary':   { bg: '#ffcc80', border: '#e65100', font: '#bf360c' },
    'secondary': { bg: '#ef9a9a', border: '#c62828', font: '#b71c1c' },
    'precursor': { bg: '#fff9c4', border: '#f9a825', font: '#e65100' },
    'health':    { bg: '#ce93d8', border: '#7b1fa2', font: '#4a148c' },
    'environ':   { bg: '#bcaaa4', border: '#5d4037', font: '#3e2723' }
  };

  // Three-column layout with y-offsets to avoid horizontal edges
  const positions = {
    // Sources (x = -350)
    1:  { x: -350, y: -160 },
    2:  { x: -350, y: -50 },
    3:  { x: -350, y: 60 },
    4:  { x: -350, y: 170 },
    // Pollutants (x = -50 to 0)
    5:  { x: -60, y: -200 },   // CO
    6:  { x: -60, y: -120 },   // SO2
    7:  { x: -60, y: -40 },    // NOx
    8:  { x: -60, y: 40 },     // O3
    9:  { x: -60, y: 120 },    // PM
    10: { x: -60, y: 200 },    // Pb
    11: { x: 40, y: -10 },     // VOCs (offset right as precursor)
    // Health impacts (x = 280)
    12: { x: 280, y: -150 },
    13: { x: 280, y: -60 },
    14: { x: 280, y: 30 },
    // Environmental impacts (x = 280)
    15: { x: 280, y: 110 },
    16: { x: 280, y: 180 },
    17: { x: 280, y: 250 }
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
      font: { color: gc.font, size: 12, face: 'Arial' },
      shape: 'box',
      borderWidth: 2,
      margin: 8,
      fixed: true,
      title: d.def
    });
  }

  // Edges
  let edgesArray = [
    // Sources to pollutants
    { from: 1, to: 5,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 1, to: 7,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 1, to: 9,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 1, to: 11, label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 2, to: 6,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 2, to: 7,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 2, to: 9,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 3, to: 6,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 3, to: 9,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 3, to: 10, label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 3, to: 11, label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1.5 },
    { from: 4, to: 6,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1, dashes: [4, 4] },
    { from: 4, to: 7,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1, dashes: [4, 4] },
    { from: 4, to: 9,  label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1, dashes: [4, 4] },
    { from: 4, to: 11, label: '', arrows: 'to', color: { color: '#9e9e9e' }, width: 1, dashes: [4, 4] },

    // Secondary formation (dashed red)
    { from: 7, to: 8,  label: 'NOx + VOCs\n\u2192 O\u2083', arrows: 'to', color: { color: '#c62828' }, width: 2, dashes: [6, 3] },
    { from: 11, to: 8, label: '+ sunlight', arrows: 'to', color: { color: '#c62828' }, width: 2, dashes: [6, 3] },
    { from: 6, to: 15, label: 'H\u2082SO\u2084', arrows: 'to', color: { color: '#c62828' }, width: 2, dashes: [6, 3] },
    { from: 7, to: 15, label: 'HNO\u2083', arrows: 'to', color: { color: '#c62828' }, width: 2, dashes: [6, 3] },

    // Pollutants to health impacts
    { from: 5, to: 13,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 1.5 },
    { from: 5, to: 14,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 1.5 },
    { from: 6, to: 12,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 1.5 },
    { from: 7, to: 12,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 1.5 },
    { from: 8, to: 12,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 2 },
    { from: 9, to: 12,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 2 },
    { from: 9, to: 13,  label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 2 },
    { from: 10, to: 14, label: '', arrows: 'to', color: { color: '#7b1fa2' }, width: 2 },

    // Pollutants to environmental impacts
    { from: 8, to: 16,  label: '', arrows: 'to', color: { color: '#5d4037' }, width: 1.5 },
    { from: 8, to: 17,  label: '', arrows: 'to', color: { color: '#5d4037' }, width: 1.5 },
    { from: 9, to: 16,  label: '', arrows: 'to', color: { color: '#5d4037' }, width: 1.5 },
    { from: 7, to: 17,  label: '', arrows: 'to', color: { color: '#5d4037' }, width: 1.5 },
    { from: 10, to: 17, label: '', arrows: 'to', color: { color: '#5d4037' }, width: 1.5 }
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
      font: { size: 9, color: '#757575', strokeWidth: 2, strokeColor: '#f9f9f6' },
      smooth: { type: 'curvedCW', roundness: 0.1 }
    }
  };

  let network = new vis.Network(networkDiv, { nodes, edges }, options);

  network.once('afterDrawing', function () {
    let pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x + 20, y: pos.y + 15 }, animation: false });
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
        nodes.update({ id: n.id, opacity: highlightedNodes.has(n.id) ? 1.0 : 0.12 });
      });
      edgesArray.forEach(function (e, idx) {
        let edgeId = edges.getIds()[idx];
        edges.update({ id: edgeId, hidden: !highlightedEdges.has(edgeId) });
      });

      let groupNames = {
        'source': 'Emission Source', 'primary': 'Primary Pollutant',
        'secondary': 'Secondary Pollutant', 'precursor': 'Precursor',
        'health': 'Health Impact', 'environ': 'Environmental Impact'
      };
      let connLabels = connNodes.map(function (n) { return defs[n].label.replace(/\n/g, ' '); }).join(', ');
      infoPanel.innerHTML =
        '<h3 style="color:' + groupColors[d.group].font + ';margin-top:0;">' + d.label.replace(/\n/g, ' ') + '</h3>' +
        '<p style="color:#9e9e9e;font-size:11px;margin:2px 0;">Type: ' + groupNames[d.group] + '</p>' +
        '<p style="color:#3e2723;font-size:13px;">' + d.def + '</p>' +
        '<hr style="border:none;border-top:1px solid #e0e0e0;">' +
        '<p style="color:#5d4037;font-size:12px;"><strong>Connected to:</strong> ' + connLabels + '</p>' +
        '<p style="color:#9e9e9e;font-size:11px;">' + connNodes.length + ' connections</p>';
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
    infoPanel.innerHTML = '<h3 style="color:#3e2723;margin-top:0;">Pollutant Tracker</h3>' +
      '<p style="color:#5d4037;font-size:13px;">Click any node to highlight all connected paths from source to impact.</p>' +
      '<p style="color:#9e9e9e;font-size:12px;">Six criteria pollutants regulated by the Clean Air Act, plus VOCs as a precursor.</p>';
    network.fit({ animation: true });
  });

  // Legend
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;gap:12px;padding:8px;font-size:11px;flex-wrap:wrap;';
  legend.innerHTML =
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#bdbdbd;border:2px solid #616161;display:inline-block;border-radius:3px;"></span> Sources</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ffcc80;border:2px solid #e65100;display:inline-block;border-radius:3px;"></span> Primary</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ef9a9a;border:2px solid #c62828;display:inline-block;border-radius:3px;"></span> Secondary</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#fff9c4;border:2px solid #f9a825;display:inline-block;border-radius:3px;"></span> Precursor</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ce93d8;border:2px solid #7b1fa2;display:inline-block;border-radius:3px;"></span> Health</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#bcaaa4;border:2px solid #5d4037;display:inline-block;border-radius:3px;"></span> Environment</span>';
  main.appendChild(legend);
});
