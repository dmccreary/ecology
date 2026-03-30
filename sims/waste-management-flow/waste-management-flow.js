// Waste Management Decision Flowchart - vis-network
// CANVAS_HEIGHT: 645
document.addEventListener('DOMContentLoaded', function() {
  const mainEl = document.querySelector('main');

  // Create layout
  const container = document.createElement('div');
  container.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;';
  mainEl.appendChild(container);

  const title = document.createElement('h3');
  title.textContent = 'Waste Management Decision Flowchart';
  title.style.cssText = 'margin:8px 0;font-family:Arial,sans-serif;color:#333;text-align:center;';
  container.appendChild(title);

  const graphDiv = document.createElement('div');
  graphDiv.style.cssText = 'width:100%;height:520px;border:1px solid #ccc;background:#fafafa;';
  container.appendChild(graphDiv);

  const infoPanel = document.createElement('div');
  infoPanel.style.cssText = 'width:100%;padding:12px;font-family:Arial,sans-serif;font-size:14px;background:#f0f8ff;border:1px solid #ccc;border-top:none;min-height:80px;';
  infoPanel.innerHTML = '<b>Click a node</b> to see details about each waste management option.';
  container.appendChild(infoPanel);

  // Node definitions
  var nodes = new vis.DataSet([
    { id: 1,  label: 'You have\nwaste!', x: 0, y: -200, shape: 'box', color: '#4FC3F7', font: {size:16, bold:true} },
    { id: 2,  label: 'Can you avoid\ncreating it?', x: 0, y: -100, shape: 'diamond', color: '#81D4FA' },
    { id: 3,  label: 'REDUCE\n\u2605 Best', x: -250, y: -50, shape: 'box', color: '#43A047', font: {color:'#fff',size:14} },
    { id: 4,  label: 'Can you\nreuse it?', x: 0, y: 0, shape: 'diamond', color: '#B3E5FC' },
    { id: 5,  label: 'REUSE\n\u2605\u2605', x: -250, y: 50, shape: 'box', color: '#66BB6A', font: {color:'#fff',size:14} },
    { id: 6,  label: 'Is it recyclable\nin your area?', x: 0, y: 100, shape: 'diamond', color: '#B3E5FC' },
    { id: 7,  label: 'RECYCLE\n\u2605\u2605\u2605', x: -250, y: 150, shape: 'box', color: '#A5D6A7', font: {size:14} },
    { id: 8,  label: 'Is it\ncompostable?', x: 0, y: 200, shape: 'diamond', color: '#B3E5FC' },
    { id: 9,  label: 'COMPOST\n\u2605\u2605\u2605', x: -250, y: 250, shape: 'box', color: '#C8E6C9', font: {size:14} },
    { id: 10, label: 'Waste-to-energy\navailable?', x: 0, y: 300, shape: 'diamond', color: '#B3E5FC' },
    { id: 11, label: 'INCINERATION\n(Energy Recovery)', x: -250, y: 350, shape: 'box', color: '#FFB74D', font: {size:13} },
    { id: 12, label: 'LANDFILL\n\u2716 Worst', x: 0, y: 410, shape: 'box', color: '#E53935', font: {color:'#fff',size:14, bold:true} }
  ]);

  // Edge definitions
  var edges = new vis.DataSet([
    { from: 1,  to: 2,  label: '', arrows: 'to' },
    { from: 2,  to: 3,  label: 'Yes', arrows: 'to', color: '#43A047', font:{size:12,color:'#43A047'} },
    { from: 2,  to: 4,  label: 'No',  arrows: 'to', color: '#999' },
    { from: 4,  to: 5,  label: 'Yes', arrows: 'to', color: '#43A047', font:{size:12,color:'#43A047'} },
    { from: 4,  to: 6,  label: 'No',  arrows: 'to', color: '#999' },
    { from: 6,  to: 7,  label: 'Yes', arrows: 'to', color: '#43A047', font:{size:12,color:'#43A047'} },
    { from: 6,  to: 8,  label: 'No',  arrows: 'to', color: '#999' },
    { from: 8,  to: 9,  label: 'Yes', arrows: 'to', color: '#43A047', font:{size:12,color:'#43A047'} },
    { from: 8,  to: 10, label: 'No',  arrows: 'to', color: '#999' },
    { from: 10, to: 11, label: 'Yes', arrows: 'to', color: '#E68A00', font:{size:12,color:'#E68A00'} },
    { from: 10, to: 12, label: 'No',  arrows: 'to', color: '#C62828', font:{size:12,color:'#C62828'} }
  ]);

  var data = { nodes: nodes, edges: edges };

  var options = {
    physics: { enabled: false },
    interaction: {
      zoomView: false,
      dragView: false,
      navigationButtons: true
    },
    edges: {
      width: 2,
      smooth: { type: 'cubicBezier', roundness: 0.4 }
    },
    nodes: {
      borderWidth: 2,
      shadow: true,
      font: { face: 'Arial' }
    },
    layout: { randomSeed: 42 }
  };

  var network = new vis.Network(graphDiv, data, options);

  // Node info data
  var nodeInfo = {
    1: '<b>You have waste!</b><br>Follow the waste hierarchy to find the best disposal option. The hierarchy prioritizes prevention and moves toward least desirable options.',
    2: '<b>Source Reduction</b><br>Can you avoid creating this waste in the first place? Examples: buy in bulk, choose less packaging, use digital instead of paper.',
    3: '<b>\u2705 REDUCE (Best Option)</b><br><b>Impact Score: 1/10 (Lowest)</b><br>Waste prevention eliminates all downstream impacts. Energy saved: 100%. GHG reduction: maximum. No decomposition time needed.',
    4: '<b>Reuse Check</b><br>Can the item be used again in its current form? Examples: refillable containers, donate clothing, repurpose furniture.',
    5: '<b>\u2705 REUSE</b><br><b>Impact Score: 2/10</b><br>Extends product life, delaying disposal. Energy savings: 70-90% vs. new production. Examples: thrift stores, repair cafes, container reuse.',
    6: '<b>Recycling Check</b><br>Is this material accepted by your local recycling program? Check local guidelines -- recycling programs vary by municipality.',
    7: '<b>\u267B\uFE0F RECYCLE</b><br><b>Impact Score: 4/10</b><br>Aluminum recycling saves 95% energy vs. virgin. Paper saves 60%. Plastic saves 70%. Glass saves 30%. Reduces mining and raw material extraction.',
    8: '<b>Composting Check</b><br>Is this organic material that can decompose? Food scraps, yard waste, paper towels, and some packaging can be composted.',
    9: '<b>\uD83C\uDF31 COMPOST</b><br><b>Impact Score: 3/10</b><br>Decomposition time: 2-12 months. Produces useful soil amendment. Diverts 30% of household waste from landfill. Avoids methane from anaerobic decomposition.',
    10: '<b>Energy Recovery Check</b><br>Does your area have a waste-to-energy incineration facility? These burn waste to generate electricity.',
    11: '<b>\uD83D\uDD25 INCINERATION (Energy Recovery)</b><br><b>Impact Score: 7/10</b><br>Reduces volume by 90%. Generates electricity. But produces CO\u2082, fly ash, and requires pollution controls. Better than landfill but last resort before it.',
    12: '<b>\u274C LANDFILL (Worst Option)</b><br><b>Impact Score: 10/10 (Highest)</b><br>Decomposition times: plastic bag 20 yrs, aluminum can 200 yrs, glass bottle 1 million yrs. Produces methane (23x more potent than CO\u2082). Risk of groundwater contamination. Takes up land.'
  };

  network.on('click', function(params) {
    if (params.nodes.length > 0) {
      var nodeId = params.nodes[0];
      if (nodeInfo[nodeId]) {
        infoPanel.innerHTML = nodeInfo[nodeId];
      }
    }
  });

  // Fit to container
  network.once('afterDrawing', function() {
    network.fit({ animation: false });
  });
});
