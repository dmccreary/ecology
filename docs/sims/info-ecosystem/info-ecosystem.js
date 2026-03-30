// Information Ecosystem Flow - vis-network
// CANVAS_HEIGHT: 625
// Traces how environmental claims flow from sources through media to audience understanding

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('div');
  title.style.cssText = 'text-align:center;padding:8px;font-size:18px;font-weight:bold;color:#264653;font-family:Arial,Helvetica,sans-serif;';
  title.textContent = 'Information Ecosystem Flow';
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
  networkDiv.style.background = '#f7f9fa';
  container.appendChild(networkDiv);

  // Info panel
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
  infoPanel.style.flex = '1';
  infoPanel.style.padding = '15px';
  infoPanel.style.overflowY = 'auto';
  infoPanel.style.borderLeft = '2px solid #457b9d';
  infoPanel.style.background = '#fff';
  infoPanel.style.maxWidth = '280px';
  infoPanel.innerHTML = '<h3 style="color:#264653;margin-top:0;">Info Ecosystem</h3>' +
    '<p style="color:#5d4037;font-size:13px;">Click any node to see how information flows and where distortion can occur at each stage.</p>' +
    '<p style="color:#9e9e9e;font-size:12px;">Trace environmental claims from source to your understanding.</p>';
  container.appendChild(infoPanel);

  // Controls
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap;align-items:center;';
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset View';
  resetBtn.style.cssText = 'font-size:13px;padding:6px 14px;cursor:pointer;background:#457b9d;color:white;border:none;border-radius:4px;';
  controls.appendChild(resetBtn);

  // Pathway selector
  const pathLabel = document.createElement('span');
  pathLabel.textContent = 'Trace pathway: ';
  pathLabel.style.cssText = 'font-size:13px;color:#5d4037;margin-left:12px;';
  controls.appendChild(pathLabel);

  const pathSelect = document.createElement('select');
  pathSelect.style.cssText = 'font-size:13px;padding:4px 8px;border:1px solid #ccc;border-radius:4px;';
  pathSelect.innerHTML = '<option value="">-- select --</option>' +
    '<option value="journal">Peer-reviewed journal path</option>' +
    '<option value="press">Press release path</option>' +
    '<option value="social">Social media path</option>' +
    '<option value="political">Political speech path</option>';
  controls.appendChild(pathSelect);
  main.appendChild(controls);

  // Node definitions
  const defs = {
    // Sources (left)
    1:  { label: 'Peer-Reviewed\nJournal', group: 'source-high', def: 'Original research published after expert peer review. Highest initial accuracy but dense technical language that may be misinterpreted.' },
    2:  { label: 'Press\nRelease', group: 'source-mid', def: 'University or organization summary of research. Often simplifies findings and may overstate significance for media appeal.' },
    3:  { label: 'Social Media\nPost', group: 'source-low', def: 'Individual shares claim without editorial oversight. May strip context, add opinion, or cherry-pick data.' },
    4:  { label: 'Political\nSpeech', group: 'source-low', def: 'Elected official cites environmental data. Often selectively framed to support policy position.' },
    // Intermediaries (center-left)
    5:  { label: 'Science\nJournalist', group: 'media', def: 'Trained reporter who translates research for public audiences. May simplify too much or add sensational framing for clicks.' },
    6:  { label: 'Content\nCreator', group: 'media', def: 'YouTuber, podcaster, or blogger. Incentivized by engagement metrics, not accuracy. Variable expertise.' },
    7:  { label: 'News\nOutlet', group: 'media', def: 'Traditional media with editorial standards but deadline pressure. Headlines often more extreme than article content.' },
    // Platform layer (center)
    8:  { label: 'Platform\nAlgorithm', group: 'algorithm', def: 'Social media algorithms prioritize engagement over accuracy. Outrage and fear generate clicks, amplifying extreme claims.' },
    9:  { label: 'Search\nEngine', group: 'algorithm', def: 'Search ranking influenced by popularity and SEO, not necessarily accuracy. First-page results may not be most reliable.' },
    // Audience (center-right)
    10: { label: 'Your\nFeed', group: 'audience', def: 'Curated by algorithms based on your past behavior. Creates filter bubbles that reinforce existing beliefs.' },
    11: { label: 'Your\nUnderstanding', group: 'audience', def: 'How you interpret the claim. Shaped by prior knowledge, cognitive biases, and emotional state.' },
    12: { label: 'Your\nActions', group: 'audience', def: 'Behavioral response: sharing, voting, purchasing, advocating. Distorted understanding leads to misinformed actions.' },
    // Distortion points (below, as warning nodes)
    13: { label: '\u26a0 Simplification\nBias', group: 'distortion', def: 'Complex findings reduced to catchy headlines. Nuance, uncertainty, and caveats are stripped away.' },
    14: { label: '\u26a0 Engagement\nOptimization', group: 'distortion', def: 'Algorithms amplify content that triggers emotional reactions. Accurate but boring content is suppressed.' },
    15: { label: '\u26a0 Confirmation\nBias', group: 'distortion', def: 'People seek and accept information that confirms existing beliefs while dismissing contradictory evidence.' }
  };

  const groupColors = {
    'source-high': { bg: '#c8e6c9', border: '#2e7d32', font: '#1b5e20' },
    'source-mid':  { bg: '#fff9c4', border: '#f9a825', font: '#e65100' },
    'source-low':  { bg: '#ffcdd2', border: '#c62828', font: '#b71c1c' },
    'media':       { bg: '#bbdefb', border: '#1565c0', font: '#0d47a1' },
    'algorithm':   { bg: '#e1bee7', border: '#7b2cbf', font: '#4a148c' },
    'audience':    { bg: '#b2dfdb', border: '#00796b', font: '#004d40' },
    'distortion':  { bg: '#fff3e0', border: '#e65100', font: '#bf360c' }
  };

  // Positions -- left-to-right flow with y-offsets to avoid horizontal edges
  const positions = {
    1:  { x: -380, y: -140 },  // Journal
    2:  { x: -380, y: -40 },   // Press release
    3:  { x: -380, y: 60 },    // Social media
    4:  { x: -380, y: 160 },   // Political speech
    5:  { x: -180, y: -110 },  // Science journalist
    6:  { x: -180, y: 30 },    // Content creator
    7:  { x: -180, y: 140 },   // News outlet
    8:  { x: 10, y: -30 },     // Algorithm
    9:  { x: 10, y: 90 },      // Search engine
    10: { x: 180, y: -50 },    // Your feed
    11: { x: 340, y: -40 },    // Understanding
    12: { x: 480, y: -30 },    // Actions
    13: { x: -180, y: -210 },  // Simplification
    14: { x: 10, y: -150 },    // Engagement opt
    15: { x: 260, y: -160 }    // Confirmation bias
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
      shape: d.group === 'distortion' ? 'diamond' : 'box',
      borderWidth: d.group === 'distortion' ? 2 : 2,
      margin: 8,
      fixed: true,
      title: d.def,
      size: d.group === 'distortion' ? 22 : undefined
    });
  }

  // Edges
  let edgesArray = [
    // Journal pathway (high accuracy)
    { from: 1, to: 5, label: 'reports on', arrows: 'to', color: { color: '#2e7d32' }, width: 2.5 },
    { from: 1, to: 7, label: 'cited by', arrows: 'to', color: { color: '#2e7d32' }, width: 2 },
    // Press release pathway
    { from: 2, to: 5, label: 'simplifies', arrows: 'to', color: { color: '#f9a825' }, width: 2 },
    { from: 2, to: 7, label: 'picked up', arrows: 'to', color: { color: '#f9a825' }, width: 2 },
    { from: 2, to: 6, label: 'reposted', arrows: 'to', color: { color: '#f9a825' }, width: 1.5 },
    // Social media pathway
    { from: 3, to: 6, label: 'shared by', arrows: 'to', color: { color: '#c62828' }, width: 2 },
    { from: 3, to: 8, label: 'boosted', arrows: 'to', color: { color: '#c62828' }, width: 2 },
    // Political pathway
    { from: 4, to: 7, label: 'covered by', arrows: 'to', color: { color: '#c62828' }, width: 2 },
    { from: 4, to: 6, label: 'clipped by', arrows: 'to', color: { color: '#c62828' }, width: 1.5 },
    // Media to platform
    { from: 5, to: 8, label: 'posted to', arrows: 'to', color: { color: '#1565c0' }, width: 2 },
    { from: 5, to: 9, label: 'indexed by', arrows: 'to', color: { color: '#1565c0' }, width: 1.5 },
    { from: 6, to: 8, label: 'amplified', arrows: 'to', color: { color: '#7b2cbf' }, width: 2.5 },
    { from: 7, to: 8, label: 'distributed', arrows: 'to', color: { color: '#1565c0' }, width: 2 },
    { from: 7, to: 9, label: 'indexed', arrows: 'to', color: { color: '#1565c0' }, width: 1.5 },
    // Platform to audience
    { from: 8, to: 10, label: 'curates', arrows: 'to', color: { color: '#7b2cbf' }, width: 3 },
    { from: 9, to: 10, label: 'surfaces', arrows: 'to', color: { color: '#7b2cbf' }, width: 2 },
    // Audience flow
    { from: 10, to: 11, label: 'interprets', arrows: 'to', color: { color: '#00796b' }, width: 2.5 },
    { from: 11, to: 12, label: 'drives', arrows: 'to', color: { color: '#00796b' }, width: 2.5 },
    // Distortion links (dashed)
    { from: 13, to: 5, label: '', arrows: 'to', color: { color: '#e65100' }, width: 1.5, dashes: [4, 4] },
    { from: 13, to: 7, label: '', arrows: 'to', color: { color: '#e65100' }, width: 1.5, dashes: [4, 4] },
    { from: 14, to: 8, label: '', arrows: 'to', color: { color: '#e65100' }, width: 1.5, dashes: [4, 4] },
    { from: 15, to: 11, label: '', arrows: 'to', color: { color: '#e65100' }, width: 1.5, dashes: [4, 4] },
    // Feedback: actions share back
    { from: 12, to: 3, label: 'reshares', arrows: 'to', color: { color: '#9e9e9e' }, width: 1, dashes: [3, 5] }
  ];

  // Pathway definitions for the dropdown
  const pathways = {
    journal:   { nodes: [1, 5, 8, 10, 11, 12, 13, 14, 15], edges: [0, 9, 14, 16, 17, 18, 21] },
    press:     { nodes: [2, 5, 7, 8, 10, 11, 12, 13, 14, 15], edges: [2, 3, 9, 12, 14, 16, 17, 18, 19, 21] },
    social:    { nodes: [3, 6, 8, 10, 11, 12, 14, 15], edges: [5, 6, 11, 14, 16, 17, 20, 21] },
    political: { nodes: [4, 7, 6, 8, 10, 11, 12, 13, 14, 15], edges: [7, 8, 11, 12, 14, 16, 17, 19, 20, 21] }
  };

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
      font: { size: 9, color: '#757575', strokeWidth: 2, strokeColor: '#f7f9fa' },
      smooth: { type: 'curvedCW', roundness: 0.12 }
    }
  };

  let network = new vis.Network(networkDiv, { nodes, edges }, options);

  network.once('afterDrawing', function () {
    let pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x + 40, y: pos.y + 15 }, animation: false });
  });

  // Click handler
  let highlightedNodes = new Set();
  let highlightedEdges = new Set();

  network.on('click', function (params) {
    resetHighlights();
    pathSelect.value = '';
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
        'source-high': 'High-Accuracy Source', 'source-mid': 'Medium-Accuracy Source',
        'source-low': 'Low-Accuracy Source', 'media': 'Media Intermediary',
        'algorithm': 'Platform Algorithm', 'audience': 'Audience',
        'distortion': 'Distortion Point'
      };
      let connLabels = connNodes.map(function (n) { return defs[n].label.replace(/\n/g, ' '); }).join(', ');
      infoPanel.innerHTML =
        '<h3 style="color:' + groupColors[d.group].font + ';margin-top:0;">' + d.label.replace(/\n/g, ' ') + '</h3>' +
        '<p style="color:#9e9e9e;font-size:11px;margin:2px 0;">Role: ' + groupNames[d.group] + '</p>' +
        '<p style="color:#3e2723;font-size:13px;">' + d.def + '</p>' +
        '<hr style="border:none;border-top:1px solid #e0e0e0;">' +
        '<p style="color:#5d4037;font-size:12px;"><strong>Connected to:</strong> ' + connLabels + '</p>';
    }
  });

  // Pathway selector handler
  pathSelect.addEventListener('change', function () {
    resetHighlights();
    let val = pathSelect.value;
    if (!val || !pathways[val]) return;

    let pw = pathways[val];
    let pwNodeSet = new Set(pw.nodes);
    let pwEdgeSet = new Set(pw.edges);

    nodesArray.forEach(function (n) {
      nodes.update({ id: n.id, opacity: pwNodeSet.has(n.id) ? 1.0 : 0.12 });
    });
    let edgeIds = edges.getIds();
    edgeIds.forEach(function (edgeId, idx) {
      edges.update({ id: edgeId, hidden: !pwEdgeSet.has(idx) });
    });

    let names = { journal: 'Peer-Reviewed Journal', press: 'Press Release', social: 'Social Media', political: 'Political Speech' };
    infoPanel.innerHTML =
      '<h3 style="color:#264653;margin-top:0;">' + names[val] + ' Pathway</h3>' +
      '<p style="color:#5d4037;font-size:13px;">This pathway shows how a claim originating from a ' + names[val].toLowerCase() + ' travels through the information ecosystem.</p>' +
      '<p style="color:#9e9e9e;font-size:12px;">Click individual nodes for details about each stage.</p>';
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
    pathSelect.value = '';
    infoPanel.innerHTML = '<h3 style="color:#264653;margin-top:0;">Info Ecosystem</h3>' +
      '<p style="color:#5d4037;font-size:13px;">Click any node to see how information flows and where distortion can occur at each stage.</p>' +
      '<p style="color:#9e9e9e;font-size:12px;">Trace environmental claims from source to your understanding.</p>';
    network.fit({ animation: true });
  });

  // Legend
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;gap:12px;padding:8px;font-size:11px;flex-wrap:wrap;';
  legend.innerHTML =
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#c8e6c9;border:2px solid #2e7d32;display:inline-block;border-radius:3px;"></span> High Accuracy</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#fff9c4;border:2px solid #f9a825;display:inline-block;border-radius:3px;"></span> Medium</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#ffcdd2;border:2px solid #c62828;display:inline-block;border-radius:3px;"></span> Low Accuracy</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#bbdefb;border:2px solid #1565c0;display:inline-block;border-radius:3px;"></span> Media</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#e1bee7;border:2px solid #7b2cbf;display:inline-block;border-radius:3px;"></span> Algorithm</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#b2dfdb;border:2px solid #00796b;display:inline-block;border-radius:3px;"></span> Audience</span>' +
    '<span style="display:flex;align-items:center;gap:4px;"><span style="width:12px;height:12px;background:#fff3e0;border:2px solid #e65100;display:inline-block;border-radius:3px;transform:rotate(45deg);"></span> Distortion</span>';
  main.appendChild(legend);
});
