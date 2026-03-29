// Renewable vs. Nonrenewable Energy Flow - vis-network diagram
// Two clusters showing energy pathways from source to end use

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('main');

  // Create network container div
  const networkDiv = document.createElement('div');
  networkDiv.id = 'network';
  networkDiv.style.width = '100%';
  networkDiv.style.height = '580px';
  networkDiv.style.border = '1px solid silver';
  networkDiv.style.background = '#f0f8ff';
  container.appendChild(networkDiv);

  const w = networkDiv.offsetWidth || 700;
  const centerX = w / 2;

  // Node definitions
  const nodes = new vis.DataSet([
    // Renewable sources (left cluster)
    { id: 'sun', label: '☀️ Sun', x: -280, y: -220, fixed: true,
      color: { background: '#FFD700', border: '#DAA520' }, font: { size: 16, bold: true },
      shape: 'ellipse', size: 30 },
    { id: 'earth-int', label: '🌋 Earth\nInterior', x: -400, y: 20, fixed: true,
      color: { background: '#FF6347', border: '#CC4030' }, font: { size: 14, bold: true },
      shape: 'ellipse', size: 25 },
    { id: 'solar', label: 'Solar', x: -350, y: -100, fixed: true,
      color: { background: '#90EE90', border: '#228B22' }, font: { size: 13 },
      shape: 'box' },
    { id: 'wind', label: 'Wind', x: -240, y: -100, fixed: true,
      color: { background: '#90EE90', border: '#228B22' }, font: { size: 13 },
      shape: 'box' },
    { id: 'hydro', label: 'Hydroelectric', x: -130, y: -100, fixed: true,
      color: { background: '#90EE90', border: '#228B22' }, font: { size: 13 },
      shape: 'box' },
    { id: 'biomass', label: 'Biomass', x: -200, y: -20, fixed: true,
      color: { background: '#90EE90', border: '#228B22' }, font: { size: 13 },
      shape: 'box' },
    { id: 'geothermal', label: 'Geothermal', x: -350, y: 110, fixed: true,
      color: { background: '#90EE90', border: '#228B22' }, font: { size: 13 },
      shape: 'box' },
    { id: 'renew-label', label: 'RENEWABLE\nReplenished\nContinuously', x: -280, y: -160, fixed: true,
      color: { background: '#E8F5E9', border: '#4CAF50' }, font: { size: 11, color: '#2E7D32' },
      shape: 'box', borderWidth: 2 },

    // Nonrenewable sources (right cluster)
    { id: 'ancient-sun', label: '☀️ Ancient\nSunlight', x: 250, y: -220, fixed: true,
      color: { background: '#FFE0B2', border: '#E65100' }, font: { size: 14, bold: true },
      shape: 'ellipse', size: 25 },
    { id: 'uranium', label: '⚛️ Uranium\nDeposits', x: 380, y: -100, fixed: true,
      color: { background: '#CE93D8', border: '#6A1B9A' }, font: { size: 14, bold: true },
      shape: 'ellipse', size: 22 },
    { id: 'fossil', label: 'Fossil Fuels', x: 200, y: -100, fixed: true,
      color: { background: '#D7CCC8', border: '#5D4037' }, font: { size: 14, bold: true },
      shape: 'box' },
    { id: 'coal', label: 'Coal', x: 120, y: 0, fixed: true,
      color: { background: '#BCAAA4', border: '#5D4037' }, font: { size: 13 },
      shape: 'box' },
    { id: 'oil', label: 'Oil', x: 220, y: 0, fixed: true,
      color: { background: '#BCAAA4', border: '#5D4037' }, font: { size: 13 },
      shape: 'box' },
    { id: 'natgas', label: 'Natural Gas', x: 320, y: 0, fixed: true,
      color: { background: '#BCAAA4', border: '#5D4037' }, font: { size: 13 },
      shape: 'box' },
    { id: 'nuclear', label: 'Nuclear', x: 380, y: 30, fixed: true,
      color: { background: '#E1BEE7', border: '#6A1B9A' }, font: { size: 13 },
      shape: 'box' },
    { id: 'nonrenew-label', label: 'NONRENEWABLE\nFinite Stocks', x: 250, y: -160, fixed: true,
      color: { background: '#FFF3E0', border: '#E65100' }, font: { size: 11, color: '#BF360C' },
      shape: 'box', borderWidth: 2 },

    // Central end-use node
    { id: 'human-use', label: '🏠 Human\nEnergy Use', x: 0, y: 190, fixed: true,
      color: { background: '#42A5F5', border: '#1565C0' }, font: { size: 16, bold: true, color: '#fff' },
      shape: 'ellipse', size: 35 }
  ]);

  // Edge definitions
  const edges = new vis.DataSet([
    // Sun to renewables
    { from: 'sun', to: 'solar', label: 'Photovoltaic', font: { size: 10 }, color: '#DAA520' },
    { from: 'sun', to: 'wind', label: 'Differential\nheating', font: { size: 9 }, color: '#DAA520' },
    { from: 'sun', to: 'hydro', label: 'Water\ncycle', font: { size: 9 }, color: '#DAA520' },
    { from: 'sun', to: 'biomass', label: 'Photosynthesis', font: { size: 9 }, color: '#DAA520' },

    // Earth interior to geothermal
    { from: 'earth-int', to: 'geothermal', label: 'Radioactive\ndecay heat', font: { size: 9 }, color: '#CC4030' },

    // Ancient sun to fossil fuels
    { from: 'ancient-sun', to: 'fossil', label: 'Millions of\nyears ago', font: { size: 9 }, color: '#E65100' },

    // Fossil fuels breakdown
    { from: 'fossil', to: 'coal', label: 'Compression', font: { size: 9 }, color: '#5D4037' },
    { from: 'fossil', to: 'oil', label: 'Heat &\npressure', font: { size: 9 }, color: '#5D4037' },
    { from: 'fossil', to: 'natgas', label: 'Heat &\npressure', font: { size: 9 }, color: '#5D4037' },

    // Uranium to nuclear
    { from: 'uranium', to: 'nuclear', label: 'Fission', font: { size: 10 }, color: '#6A1B9A' },

    // All to human use
    { from: 'solar', to: 'human-use', color: { color: '#4CAF50', opacity: 0.6 }, dashes: true },
    { from: 'wind', to: 'human-use', color: { color: '#4CAF50', opacity: 0.6 }, dashes: true },
    { from: 'hydro', to: 'human-use', color: { color: '#4CAF50', opacity: 0.6 }, dashes: true },
    { from: 'biomass', to: 'human-use', color: { color: '#4CAF50', opacity: 0.6 }, dashes: true },
    { from: 'geothermal', to: 'human-use', color: { color: '#4CAF50', opacity: 0.6 }, dashes: true },
    { from: 'coal', to: 'human-use', color: { color: '#795548', opacity: 0.6 }, dashes: true },
    { from: 'oil', to: 'human-use', color: { color: '#795548', opacity: 0.6 }, dashes: true },
    { from: 'natgas', to: 'human-use', color: { color: '#795548', opacity: 0.6 }, dashes: true },
    { from: 'nuclear', to: 'human-use', color: { color: '#9C27B0', opacity: 0.6 }, dashes: true }
  ]);

  const options = {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      dragNodes: false,
      navigationButtons: true
    },
    edges: {
      arrows: { to: { enabled: true, scaleFactor: 0.8 } },
      smooth: { type: 'cubicBezier', roundness: 0.3 },
      width: 2
    },
    nodes: {
      borderWidth: 2,
      shadow: true,
      font: { multi: true }
    }
  };

  const network = new vis.Network(networkDiv, { nodes: nodes, edges: edges }, options);

  // Fit after render
  network.once('afterDrawing', function() {
    network.fit({ animation: false });
  });
});
