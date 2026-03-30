// Ecosystem Services Web - vis-network graph
// CANVAS_HEIGHT: 620
// Interactive network showing four categories of ecosystem services

document.addEventListener('DOMContentLoaded', function() {
  const main = document.querySelector('main');

  // Create container elements
  const title = document.createElement('h3');
  title.textContent = 'Ecosystem Services Web';
  title.style.textAlign = 'center';
  title.style.fontFamily = 'Arial, sans-serif';
  title.style.margin = '10px 0 5px 0';
  main.appendChild(title);

  const controls = document.createElement('div');
  controls.style.textAlign = 'center';
  controls.style.padding = '5px';
  controls.style.fontFamily = 'Arial, sans-serif';
  main.appendChild(controls);

  const modeLabel = document.createElement('span');
  modeLabel.textContent = 'Mode: ';
  controls.appendChild(modeLabel);

  const modeSelect = document.createElement('select');
  modeSelect.innerHTML = '<option value="explore">Explore</option><option value="remove">Remove Service</option>';
  controls.appendChild(modeSelect);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.style.marginLeft = '10px';
  controls.appendChild(resetButton);

  const info = document.createElement('div');
  info.style.textAlign = 'center';
  info.style.padding = '5px';
  info.style.fontSize = '13px';
  info.style.fontFamily = 'Arial, sans-serif';
  info.style.color = '#555';
  info.textContent = 'Click a node to highlight connections. In Remove mode, click to simulate losing a service.';
  main.appendChild(info);

  const container = document.createElement('div');
  container.id = 'network-container';
  container.style.width = '100%';
  container.style.height = '520px';
  container.style.border = '1px solid #ccc';
  container.style.background = '#fafafa';
  main.appendChild(container);

  // Define hub nodes with vertical offset to avoid horizontal edge label bug
  const hubNodes = [
    { id: 'supporting',   label: 'Supporting\nServices',    x: 0,    y: -180, color: { background: '#8B6914', border: '#6B4F10' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'regulating',   label: 'Regulating\nServices',    x: -200, y: 10,   color: { background: '#2E86C1', border: '#1B6699' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'provisioning', label: 'Provisioning\nServices',  x: 200,  y: 20,   color: { background: '#27AE60', border: '#1E8449' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'cultural',     label: 'Cultural\nServices',      x: 0,    y: 200,  color: { background: '#8E44AD', border: '#6C3483' }, font: { color: '#fff', size: 14, bold: true } }
  ];

  // Define service nodes
  const serviceNodes = [
    // Supporting
    { id: 'nutrient_cycling', label: 'Nutrient\nCycling',    x: -120, y: -300, group: 'supporting' },
    { id: 'soil_formation',   label: 'Soil\nFormation',      x: 120,  y: -300, group: 'supporting' },
    { id: 'photosynthesis',   label: 'Primary\nProduction',  x: 0,    y: -320, group: 'supporting' },
    // Regulating
    { id: 'pollination',      label: 'Pollination',          x: -350, y: -80,  group: 'regulating' },
    { id: 'climate_reg',      label: 'Climate\nRegulation',  x: -350, y: 10,   group: 'regulating' },
    { id: 'water_purify',     label: 'Water\nPurification',  x: -350, y: 100,  group: 'regulating' },
    { id: 'flood_control',    label: 'Flood\nControl',       x: -280, y: 140,  group: 'regulating' },
    // Provisioning
    { id: 'food',             label: 'Food',                 x: 350,  y: -80,  group: 'provisioning' },
    { id: 'fresh_water',      label: 'Fresh\nWater',         x: 350,  y: 20,   group: 'provisioning' },
    { id: 'timber',           label: 'Timber &\nFiber',      x: 350,  y: 110,  group: 'provisioning' },
    { id: 'medicine',         label: 'Medicine',             x: 280,  y: 150,  group: 'provisioning' },
    // Cultural
    { id: 'recreation',       label: 'Recreation\n& Tourism', x: -120, y: 320, group: 'cultural' },
    { id: 'spiritual',        label: 'Spiritual\nValues',     x: 0,    y: 340, group: 'cultural' },
    { id: 'education',        label: 'Education\n& Science',  x: 120,  y: 320, group: 'cultural' }
  ];

  const groupColors = {
    supporting:   { background: '#D4A017', border: '#8B6914' },
    regulating:   { background: '#5DADE2', border: '#2E86C1' },
    provisioning: { background: '#58D68D', border: '#27AE60' },
    cultural:     { background: '#BB8FCE', border: '#8E44AD' }
  };

  let allNodes = hubNodes.map(n => ({
    id: n.id, label: n.label, x: n.x, y: n.y,
    color: n.color, font: n.font || {},
    shape: 'box', size: 30, fixed: true,
    borderWidth: 3, margin: 10
  }));

  serviceNodes.forEach(n => {
    allNodes.push({
      id: n.id, label: n.label, x: n.x, y: n.y,
      color: groupColors[n.group],
      shape: 'box', size: 20, fixed: true,
      borderWidth: 2, margin: 8,
      font: { size: 12 }
    });
  });

  // Define edges
  const edgeData = [
    // Supporting -> hubs
    { from: 'supporting', to: 'regulating',   label: 'enables' },
    { from: 'supporting', to: 'provisioning', label: 'enables' },
    { from: 'supporting', to: 'cultural',     label: 'enables' },
    // Supporting services
    { from: 'supporting', to: 'nutrient_cycling', label: '' },
    { from: 'supporting', to: 'soil_formation',   label: '' },
    { from: 'supporting', to: 'photosynthesis',   label: '' },
    // Regulating services
    { from: 'regulating', to: 'pollination',    label: '' },
    { from: 'regulating', to: 'climate_reg',    label: '' },
    { from: 'regulating', to: 'water_purify',   label: '' },
    { from: 'regulating', to: 'flood_control',  label: '' },
    // Provisioning services
    { from: 'provisioning', to: 'food',        label: '' },
    { from: 'provisioning', to: 'fresh_water', label: '' },
    { from: 'provisioning', to: 'timber',      label: '' },
    { from: 'provisioning', to: 'medicine',    label: '' },
    // Cultural services
    { from: 'cultural', to: 'recreation', label: '' },
    { from: 'cultural', to: 'spiritual',  label: '' },
    { from: 'cultural', to: 'education',  label: '' },
    // Cross-category dependencies
    { from: 'regulating',  to: 'provisioning', label: 'regulates' },
    { from: 'pollination', to: 'food',         label: 'pollinates crops' },
    { from: 'water_purify', to: 'fresh_water', label: 'purifies' },
    { from: 'soil_formation', to: 'food',      label: 'supports growth' },
    { from: 'climate_reg', to: 'timber',       label: 'stable climate' },
    { from: 'nutrient_cycling', to: 'soil_formation', label: 'feeds' },
    { from: 'photosynthesis', to: 'food',      label: 'energy source' },
    { from: 'flood_control', to: 'recreation', label: 'safe areas' }
  ];

  const nodes = new vis.DataSet(allNodes);
  const edges = new vis.DataSet(edgeData.map((e, i) => ({
    id: i, from: e.from, to: e.to, label: e.label,
    color: { color: '#aaa', highlight: '#333' },
    font: { size: 10, color: '#666', strokeWidth: 2, strokeColor: '#fff' },
    arrows: e.label ? 'to' : '',
    width: e.label ? 1.5 : 1,
    smooth: { type: 'curvedCW', roundness: 0.15 }
  })));

  const network = new vis.Network(container, { nodes, edges }, {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      navigationButtons: true,
      hover: true
    },
    layout: { randomSeed: 42 }
  });

  // Store original colors
  const originalNodeColors = {};
  allNodes.forEach(n => { originalNodeColors[n.id] = { ...n.color }; });

  const originalEdgeColors = {};
  edges.forEach(e => { originalEdgeColors[e.id] = { color: '#aaa', highlight: '#333' }; });

  let removedNodes = new Set();

  function resetAll() {
    removedNodes.clear();
    allNodes.forEach(n => {
      nodes.update({ id: n.id, color: originalNodeColors[n.id], hidden: false });
    });
    edges.forEach(e => {
      edges.update({ id: e.id, color: originalEdgeColors[e.id], hidden: false });
    });
    info.textContent = 'Click a node to highlight connections. In Remove mode, click to simulate losing a service.';
  }

  resetButton.addEventListener('click', resetAll);

  network.on('click', function(params) {
    if (params.nodes.length === 0) {
      // Clicked empty space - reset highlights
      resetAll();
      return;
    }

    let clickedId = params.nodes[0];
    let mode = modeSelect.value;

    if (mode === 'explore') {
      // Highlight connected nodes, dim others
      let connectedNodes = new Set([clickedId]);
      let connectedEdges = new Set();
      edges.forEach(e => {
        if (e.from === clickedId || e.to === clickedId) {
          connectedNodes.add(e.from);
          connectedNodes.add(e.to);
          connectedEdges.add(e.id);
        }
      });

      allNodes.forEach(n => {
        if (connectedNodes.has(n.id)) {
          nodes.update({ id: n.id, color: originalNodeColors[n.id] });
        } else {
          nodes.update({ id: n.id, color: { background: '#ddd', border: '#ccc' } });
        }
      });

      edges.forEach(e => {
        if (connectedEdges.has(e.id)) {
          edges.update({ id: e.id, color: { color: '#333' }, width: 2.5 });
        } else {
          edges.update({ id: e.id, color: { color: '#eee' }, width: 0.5 });
        }
      });

      let nodeData = nodes.get(clickedId);
      info.textContent = 'Selected: ' + nodeData.label.replace('\n', ' ') + ' — ' + connectedNodes.size + ' connections';

    } else if (mode === 'remove') {
      // Remove service and show cascade
      removedNodes.add(clickedId);
      nodes.update({ id: clickedId, color: { background: '#e74c3c', border: '#c0392b' } });

      // Find directly connected
      let stressed = new Set();
      let critical = new Set();
      edges.forEach(e => {
        if (e.from === clickedId) stressed.add(e.to);
        if (e.to === clickedId) stressed.add(e.from);
      });

      // Check for multiple losses
      stressed.forEach(sId => {
        if (removedNodes.has(sId)) return;
        let lostConnections = 0;
        let totalConnections = 0;
        edges.forEach(e => {
          if (e.from === sId || e.to === sId) {
            totalConnections++;
            let other = e.from === sId ? e.to : e.from;
            if (removedNodes.has(other)) lostConnections++;
          }
        });
        if (lostConnections > 1) critical.add(sId);
      });

      stressed.forEach(sId => {
        if (!removedNodes.has(sId)) {
          if (critical.has(sId)) {
            nodes.update({ id: sId, color: { background: '#e67e22', border: '#d35400' } });
          } else {
            nodes.update({ id: sId, color: { background: '#f1c40f', border: '#d4ac0f' } });
          }
        }
      });

      info.textContent = 'Removed: ' + clickedId.replace(/_/g, ' ') + ' — ' + stressed.size + ' services stressed, ' + critical.size + ' critically impaired';
    }
  });
});
