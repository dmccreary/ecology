// Cogeneration System Flow - vis-network diagram
// CANVAS_HEIGHT: 675
// Compares conventional separate generation vs CHP cogeneration

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('h2');
  title.textContent = 'Cogeneration System Flow';
  title.style.textAlign = 'center';
  title.style.fontFamily = 'Arial, sans-serif';
  title.style.margin = '10px 0 5px 0';
  main.appendChild(title);

  // Description
  const desc = document.createElement('p');
  desc.textContent = 'Compare conventional separate generation (56% efficient) vs. cogeneration/CHP (85% efficient). Click nodes for details.';
  desc.style.textAlign = 'center';
  desc.style.fontFamily = 'Arial, sans-serif';
  desc.style.fontSize = '14px';
  desc.style.margin = '0 10px 10px 10px';
  main.appendChild(desc);

  // Container
  const container = document.createElement('div');
  container.id = 'network';
  container.style.width = '100%';
  container.style.height = '550px';
  container.style.border = '1px solid silver';
  container.style.background = 'aliceblue';
  main.appendChild(container);

  // Info panel
  const info = document.createElement('div');
  info.id = 'info-panel';
  info.style.fontFamily = 'Arial, sans-serif';
  info.style.fontSize = '14px';
  info.style.padding = '8px 12px';
  info.style.margin = '8px auto';
  info.style.maxWidth = '700px';
  info.style.textAlign = 'center';
  info.style.color = '#333';
  info.innerHTML = '<em>Click any node to see details</em>';
  main.appendChild(info);

  // Layout constants
  const leftX = -320;
  const rightX = 320;
  const midLeftX = -120;
  const midRightX = 120;

  // Node definitions
  var nodes = new vis.DataSet([
    // CONVENTIONAL SYSTEM (left side)
    { id: 'conv-label', label: 'CONVENTIONAL\nSEPARATE GENERATION', x: leftX, y: -220, fixed: true,
      shape: 'box', color: { background: '#5B9BD5', border: '#2E75B6' }, font: { color: 'white', size: 14, bold: true }, margin: 10,
      title: 'Two separate facilities: power plant + boiler' },
    { id: 'conv-fuel1', label: 'Fuel Input\n100 units', x: leftX - 80, y: -130, fixed: true,
      shape: 'box', color: { background: '#FFC000', border: '#BF9000' }, font: { size: 13 }, margin: 8,
      title: 'Fossil fuel for electricity generation' },
    { id: 'conv-fuel2', label: 'Fuel Input\n100 units', x: leftX + 80, y: -130, fixed: true,
      shape: 'box', color: { background: '#FFC000', border: '#BF9000' }, font: { size: 13 }, margin: 8,
      title: 'Fossil fuel for heat/steam boiler' },
    { id: 'conv-plant', label: 'Power\nPlant', x: leftX - 80, y: -30, fixed: true,
      shape: 'box', color: { background: '#A9A9A9', border: '#696969' }, font: { size: 13 }, margin: 8,
      title: 'Conventional thermal power plant' },
    { id: 'conv-boiler', label: 'Boiler', x: leftX + 80, y: -30, fixed: true,
      shape: 'box', color: { background: '#A9A9A9', border: '#696969' }, font: { size: 13 }, margin: 8,
      title: 'Conventional heating boiler' },
    { id: 'conv-elec', label: 'Electricity\n33 units', x: leftX - 120, y: 70, fixed: true,
      shape: 'box', color: { background: '#70AD47', border: '#548235' }, font: { size: 13 }, margin: 8,
      title: 'Useful electrical output' },
    { id: 'conv-waste1', label: 'Waste Heat\n67 units', x: leftX - 30, y: 70, fixed: true,
      shape: 'box', color: { background: '#FF6B6B', border: '#CC4444' }, font: { color: 'white', size: 13 }, margin: 8,
      title: 'Wasted thermal energy from power plant' },
    { id: 'conv-heat', label: 'Useful Heat\n80 units', x: leftX + 50, y: 70, fixed: true,
      shape: 'box', color: { background: '#70AD47', border: '#548235' }, font: { size: 13 }, margin: 8,
      title: 'Useful thermal output from boiler' },
    { id: 'conv-waste2', label: 'Waste Heat\n20 units', x: leftX + 140, y: 70, fixed: true,
      shape: 'box', color: { background: '#FF6B6B', border: '#CC4444' }, font: { color: 'white', size: 13 }, margin: 8,
      title: 'Wasted thermal energy from boiler' },
    { id: 'conv-total', label: 'Total Useful: 113 / 200 units\n56.5% Efficient', x: leftX, y: 160, fixed: true,
      shape: 'box', color: { background: '#FFE0B2', border: '#FF9800' }, font: { size: 14, bold: true }, margin: 10,
      title: 'Combined efficiency of both separate systems' },

    // COGENERATION SYSTEM (right side)
    { id: 'chp-label', label: 'COGENERATION\n(CHP SYSTEM)', x: rightX, y: -220, fixed: true,
      shape: 'box', color: { background: '#70AD47', border: '#548235' }, font: { color: 'white', size: 14, bold: true }, margin: 10,
      title: 'Combined Heat and Power in one facility' },
    { id: 'chp-fuel', label: 'Fuel Input\n100 units', x: rightX, y: -130, fixed: true,
      shape: 'box', color: { background: '#FFC000', border: '#BF9000' }, font: { size: 13 }, margin: 8,
      title: 'Single fuel input for both electricity and heat' },
    { id: 'chp-system', label: 'CHP\nSystem', x: rightX, y: -30, fixed: true,
      shape: 'box', color: { background: '#5B9BD5', border: '#2E75B6' }, font: { color: 'white', size: 14, bold: true }, margin: 12,
      title: 'Combined Heat and Power system generates electricity and captures waste heat' },
    { id: 'chp-elec', label: 'Electricity\n35 units', x: rightX - 80, y: 70, fixed: true,
      shape: 'box', color: { background: '#70AD47', border: '#548235' }, font: { size: 13 }, margin: 8,
      title: 'Useful electrical output' },
    { id: 'chp-heat', label: 'Useful Heat\n50 units', x: rightX, y: 70, fixed: true,
      shape: 'box', color: { background: '#70AD47', border: '#548235' }, font: { size: 13 }, margin: 8,
      title: 'Captured thermal energy for heating' },
    { id: 'chp-waste', label: 'Waste Heat\n15 units', x: rightX + 80, y: 70, fixed: true,
      shape: 'box', color: { background: '#FF6B6B', border: '#CC4444' }, font: { color: 'white', size: 13 }, margin: 8,
      title: 'Minimal wasted energy' },
    { id: 'chp-total', label: 'Total Useful: 85 / 100 units\n85% Efficient', x: rightX, y: 160, fixed: true,
      shape: 'box', color: { background: '#C8E6C9', border: '#4CAF50' }, font: { size: 14, bold: true }, margin: 10,
      title: 'Much higher efficiency from capturing waste heat' }
  ]);

  // Edge definitions
  var edges = new vis.DataSet([
    // Conventional
    { from: 'conv-fuel1', to: 'conv-plant', arrows: 'to', color: { color: '#BF9000' }, width: 3 },
    { from: 'conv-fuel2', to: 'conv-boiler', arrows: 'to', color: { color: '#BF9000' }, width: 3 },
    { from: 'conv-plant', to: 'conv-elec', arrows: 'to', color: { color: '#548235' }, width: 2, label: '33%' },
    { from: 'conv-plant', to: 'conv-waste1', arrows: 'to', color: { color: '#CC4444' }, width: 3, label: '67%' },
    { from: 'conv-boiler', to: 'conv-heat', arrows: 'to', color: { color: '#548235' }, width: 3, label: '80%' },
    { from: 'conv-boiler', to: 'conv-waste2', arrows: 'to', color: { color: '#CC4444' }, width: 2, label: '20%' },
    { from: 'conv-elec', to: 'conv-total', arrows: 'to', color: { color: '#548235' }, width: 2, dashes: true },
    { from: 'conv-heat', to: 'conv-total', arrows: 'to', color: { color: '#548235' }, width: 2, dashes: true },

    // CHP
    { from: 'chp-fuel', to: 'chp-system', arrows: 'to', color: { color: '#BF9000' }, width: 4 },
    { from: 'chp-system', to: 'chp-elec', arrows: 'to', color: { color: '#548235' }, width: 2, label: '35%' },
    { from: 'chp-system', to: 'chp-heat', arrows: 'to', color: { color: '#548235' }, width: 3, label: '50%' },
    { from: 'chp-system', to: 'chp-waste', arrows: 'to', color: { color: '#CC4444' }, width: 1, label: '15%' },
    { from: 'chp-elec', to: 'chp-total', arrows: 'to', color: { color: '#548235' }, width: 2, dashes: true },
    { from: 'chp-heat', to: 'chp-total', arrows: 'to', color: { color: '#548235' }, width: 2, dashes: true }
  ]);

  var options = {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      navigationButtons: true,
      hover: true
    },
    edges: {
      smooth: { type: 'cubicBezier', roundness: 0.3 },
      font: { size: 11, align: 'top', color: '#555' }
    },
    nodes: {
      borderWidth: 2,
      shadow: true
    }
  };

  var network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

  // Node details
  var details = {
    'conv-label': 'In conventional generation, electricity and heat are produced in separate facilities, each burning its own fuel supply.',
    'conv-fuel1': 'The power plant requires 100 units of fuel (coal, gas, etc.) to generate electricity.',
    'conv-fuel2': 'The boiler requires an additional 100 units of fuel just for heating -- total system input is 200 units.',
    'conv-plant': 'A typical thermal power plant converts only ~33% of fuel energy to electricity. The rest becomes waste heat.',
    'conv-boiler': 'A conventional boiler converts ~80% of fuel to useful heat, losing 20% up the flue.',
    'conv-elec': 'Only 33 units of useful electricity from 100 units of fuel input.',
    'conv-waste1': '67 units of energy released as waste heat to the environment -- cooling towers, hot exhaust.',
    'conv-heat': '80 units of useful thermal energy for space heating, hot water, or industrial processes.',
    'conv-waste2': '20 units lost as waste heat from the boiler system.',
    'conv-total': 'Combined: 113 useful units from 200 fuel units = 56.5% overall efficiency.',
    'chp-label': 'Cogeneration (Combined Heat and Power) produces both electricity AND useful heat from a single fuel source.',
    'chp-fuel': 'Only 100 units of fuel needed -- half the input of the conventional approach!',
    'chp-system': 'The CHP system generates electricity and captures the "waste" heat for productive use.',
    'chp-elec': '35 units of electricity -- slightly more than conventional due to optimized design.',
    'chp-heat': '50 units of useful heat captured from what would otherwise be waste energy.',
    'chp-waste': 'Only 15 units wasted -- dramatically less than the 87 units wasted in conventional systems.',
    'chp-total': '85 useful units from 100 fuel units = 85% efficiency. Nearly 30 percentage points better!'
  };

  network.on('click', function (params) {
    if (params.nodes.length > 0) {
      var nodeId = params.nodes[0];
      if (details[nodeId]) {
        info.innerHTML = '<strong>' + nodes.get(nodeId).label.replace(/\n/g, ' ') + ':</strong> ' + details[nodeId];
      }
    }
  });
});
