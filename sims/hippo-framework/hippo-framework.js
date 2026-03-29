// HIPPO Threat Interaction Web - vis-network
// Analyze: Differentiate between the five HIPPO threats

document.addEventListener('DOMContentLoaded', function () {
  const mainEl = document.querySelector('main');

  // Controls container
  const controls = document.createElement('div');
  controls.style.cssText = 'padding:10px;font-family:Arial,sans-serif;display:flex;flex-wrap:wrap;gap:10px;align-items:center;';

  const speciesLabel = document.createElement('label');
  speciesLabel.textContent = 'Case Study: ';
  speciesLabel.style.fontWeight = 'bold';
  const speciesSelect = document.createElement('select');
  speciesSelect.style.cssText = 'padding:4px 8px;font-size:14px;';

  const species = [
    { name: '-- Select Species --', threats: [], desc: '' },
    { name: 'Polar Bear', threats: ['H', 'P1', 'P2'], desc: 'Arctic habitat loss from climate change, pollution from toxins, and human population pressure.' },
    { name: 'Monarch Butterfly', threats: ['H', 'I', 'P1'], desc: 'Habitat loss from deforestation, invasive milkweed species, and pesticide pollution.' },
    { name: 'Bluefin Tuna', threats: ['O', 'P1', 'P2'], desc: 'Massive overfishing, ocean pollution, and growing demand from population growth.' },
    { name: 'Orangutan', threats: ['H', 'O', 'P2'], desc: 'Palm oil deforestation, illegal pet trade, and expanding human settlements.' }
  ];

  species.forEach((sp, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = sp.name;
    speciesSelect.appendChild(opt);
  });

  const infoBox = document.createElement('div');
  infoBox.style.cssText = 'padding:8px 12px;background:#f0f4f8;border-radius:6px;font-size:13px;color:#264653;min-height:20px;flex-basis:100%;';
  infoBox.textContent = 'Select a species to see which HIPPO threats apply.';

  controls.appendChild(speciesLabel);
  controls.appendChild(speciesSelect);
  mainEl.appendChild(controls);
  mainEl.appendChild(infoBox);

  // Network container
  const networkDiv = document.createElement('div');
  networkDiv.style.cssText = 'width:100%;height:480px;border:1px solid silver;background:aliceblue;';
  mainEl.appendChild(networkDiv);

  // HIPPO nodes in pentagon arrangement with slight y-offsets to avoid horizontal edges
  const nodeData = [
    { id: 'H', label: 'Habitat\nLoss', x: 0, y: -180, color: { background: '#2d6a4f', border: '#1b4332' }, font: { color: '#fff', size: 14, multi: true } },
    { id: 'I', label: 'Invasive\nSpecies', x: 175, y: -60, color: { background: '#7b2cbf', border: '#5a189a' }, font: { color: '#fff', size: 14, multi: true } },
    { id: 'P1', label: 'Pollution', x: 110, y: 150, color: { background: '#ffd166', border: '#dba632' }, font: { color: '#264653', size: 14 } },
    { id: 'P2', label: 'Population\nGrowth', x: -110, y: 145, color: { background: '#f4a261', border: '#d4822e' }, font: { color: '#264653', size: 14, multi: true } },
    { id: 'O', label: 'Over-\nexploitation', x: -175, y: -55, color: { background: '#e63946', border: '#b71c2a' }, font: { color: '#fff', size: 14, multi: true } }
  ];

  const nodes = new vis.DataSet(nodeData.map(n => ({
    ...n,
    shape: 'circle',
    size: 45,
    borderWidth: 3,
    fixed: true,
    shadow: { enabled: true, size: 6 }
  })));

  const edgeData = [
    { from: 'H', to: 'I', label: 'Opens niches\nfor invaders', id: 'e1' },
    { from: 'H', to: 'O', label: 'Concentrates\nresources', id: 'e2' },
    { from: 'P2', to: 'H', label: 'Drives land\nconversion', id: 'e3' },
    { from: 'P2', to: 'O', label: 'Increases\ndemand', id: 'e4' },
    { from: 'P2', to: 'P1', label: 'More waste\n& emissions', id: 'e5' },
    { from: 'P1', to: 'H', label: 'Degrades\nhabitat quality', id: 'e6' },
    { from: 'I', to: 'O', label: 'Competes with\nnative prey', id: 'e7' },
    { from: 'O', to: 'H', label: 'Disrupts\necosystem', id: 'e8' }
  ];

  const edges = new vis.DataSet(edgeData.map(e => ({
    ...e,
    arrows: 'to',
    color: { color: '#6c757d', highlight: '#264653' },
    font: { size: 11, color: '#264653', strokeWidth: 2, strokeColor: '#fff', multi: true },
    width: 2,
    smooth: { type: 'curvedCW', roundness: 0.15 }
  })));

  const options = {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      navigationButtons: true,
      hover: true,
      tooltipDelay: 100
    },
    edges: {
      selectionWidth: 3
    }
  };

  const network = new vis.Network(networkDiv, { nodes, edges }, options);

  // Click node to highlight outgoing edges
  network.on('click', function (params) {
    // Reset all
    edgeData.forEach(e => {
      edges.update({ id: e.id, width: 2, color: { color: '#6c757d' } });
    });
    nodeData.forEach(n => {
      nodes.update({ id: n.id, borderWidth: 3, size: 45 });
    });

    if (params.nodes.length > 0) {
      const clickedId = params.nodes[0];
      nodes.update({ id: clickedId, borderWidth: 5, size: 55 });
      edgeData.forEach(e => {
        if (e.from === clickedId) {
          edges.update({ id: e.id, width: 4, color: { color: '#264653' } });
        }
      });
    }
  });

  // Species selector
  speciesSelect.addEventListener('change', function () {
    const idx = parseInt(this.value);
    const sp = species[idx];

    // Reset visuals
    nodeData.forEach(n => {
      nodes.update({ id: n.id, borderWidth: 3, size: 45, opacity: 1 });
    });
    edgeData.forEach(e => {
      edges.update({ id: e.id, width: 2, color: { color: '#6c757d' } });
    });

    if (idx === 0) {
      infoBox.textContent = 'Select a species to see which HIPPO threats apply.';
      return;
    }

    infoBox.innerHTML = '<strong>' + sp.name + ':</strong> ' + sp.desc;

    // Highlight relevant threats
    nodeData.forEach(n => {
      if (sp.threats.includes(n.id)) {
        nodes.update({ id: n.id, borderWidth: 5, size: 55 });
      } else {
        nodes.update({ id: n.id, size: 35, opacity: 0.4 });
      }
    });

    // Highlight edges between active threats
    edgeData.forEach(e => {
      if (sp.threats.includes(e.from) && sp.threats.includes(e.to)) {
        edges.update({ id: e.id, width: 4, color: { color: '#264653' } });
      } else {
        edges.update({ id: e.id, width: 1, color: { color: '#ccc' } });
      }
    });
  });
});
