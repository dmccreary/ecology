// Peer Review Pipeline - vis-network diagram
// CANVAS_HEIGHT: 510
// Science's Quality Control Pipeline
document.addEventListener('DOMContentLoaded', function() {
  const mainEl = document.querySelector('main');

  // Create container layout
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:900px;margin:0 auto;font-family:Arial,sans-serif;';

  const title = document.createElement('h2');
  title.textContent = "Science's Quality Control Pipeline";
  title.style.cssText = 'text-align:center;color:#264653;margin:10px 0;';
  wrapper.appendChild(title);

  // Confidence tracker bar
  const trackerDiv = document.createElement('div');
  trackerDiv.id = 'confidence-tracker';
  trackerDiv.style.cssText = 'display:flex;align-items:center;margin:5px 10px 10px;padding:8px;background:#f0f4f8;border-radius:8px;';
  trackerDiv.innerHTML = '<span style="font-weight:bold;margin-right:10px;font-size:14px;">Confidence:</span>' +
    '<div id="conf-bar" style="flex:1;height:20px;background:#ddd;border-radius:10px;overflow:hidden;">' +
    '<div id="conf-fill" style="width:5%;height:100%;background:linear-gradient(90deg,#90be6d,#2a9d8f);border-radius:10px;transition:width 0.5s;"></div></div>' +
    '<span id="conf-label" style="margin-left:10px;font-size:14px;font-weight:bold;">Low</span>';
  wrapper.appendChild(trackerDiv);

  // Network container
  const networkDiv = document.createElement('div');
  networkDiv.id = 'network';
  networkDiv.style.cssText = 'width:100%;height:350px;border:1px solid #ccc;border-radius:8px;';
  wrapper.appendChild(networkDiv);

  // Description panel
  const descPanel = document.createElement('div');
  descPanel.id = 'desc-panel';
  descPanel.style.cssText = 'margin:10px;padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #2a9d8f;min-height:60px;font-size:14px;line-height:1.5;';
  descPanel.innerHTML = '<em>Click on any stage to learn what happens there.</em>';
  wrapper.appendChild(descPanel);

  mainEl.appendChild(wrapper);

  // Node data with descriptions
  const stageData = {
    1:  { label:'Research\nQuestion', color:'#a8dadc', conf:5, confLabel:'Very Low',
          desc:'A scientist identifies a gap in knowledge and forms a testable question. This can take weeks to months of literature review. Pitfall: asking questions that are too broad or untestable.'},
    2:  { label:'Study\nDesign', color:'#a8dadc', conf:8, confLabel:'Very Low',
          desc:'The researcher plans methodology, sample size, controls, and statistical approach. Takes 1-6 months. Pitfall: inadequate controls or too-small sample sizes.'},
    3:  { label:'Data\nCollection', color:'#a8dadc', conf:12, confLabel:'Low',
          desc:'Fieldwork, experiments, or surveys are conducted. Can take months to years. Pitfall: measurement error, sampling bias, or changing conditions.'},
    4:  { label:'Analysis', color:'#a8dadc', conf:20, confLabel:'Low',
          desc:'Data is processed and statistically analyzed. Takes weeks to months. Pitfall: p-hacking, cherry-picking results, or inappropriate statistical tests.'},
    5:  { label:'Manuscript', color:'#bde0fe', conf:25, confLabel:'Low-Medium',
          desc:'Results are written up with introduction, methods, results, and discussion. Takes 1-3 months. Pitfall: overstating conclusions or omitting negative results.'},
    6:  { label:'Journal\nSubmission', color:'#bde0fe', conf:28, confLabel:'Medium',
          desc:'The paper is submitted to a scientific journal. The editor makes an initial assessment. Takes days to weeks. ~50% of papers are desk-rejected at top journals.'},
    7:  { label:'Peer\nReview', color:'#ffd166', conf:35, confLabel:'Medium',
          desc:'2-4 independent experts evaluate the work for rigor, validity, and significance. Takes 2-6 months. This is the critical quality control step.'},
    8:  { label:'Accept', color:'#90be6d', conf:50, confLabel:'Medium-High',
          desc:'The paper passes peer review (often after revisions). Only ~20-30% of submitted papers are ultimately accepted at good journals.'},
    9:  { label:'Revise &\nResubmit', color:'#ffd166', conf:30, confLabel:'Medium',
          desc:'Reviewers request changes. The author must address all concerns and resubmit. This cycle may repeat 1-3 times over months.'},
    10: { label:'Reject', color:'#e63946', conf:10, confLabel:'Low',
          desc:'The paper fails review. The author may revise and try a different journal. ~70% of papers are rejected from their first-choice journal.'},
    11: { label:'Publication', color:'#90be6d', conf:55, confLabel:'Medium-High',
          desc:'The paper is published and enters the scientific record. Now other scientists can read, cite, and attempt to replicate it.'},
    12: { label:'Replication\nAttempts', color:'#90be6d', conf:70, confLabel:'High',
          desc:'Other labs independently try to reproduce the findings. This is the gold standard test. Takes months to years. Many published findings fail replication.'},
    13: { label:'Scientific\nConsensus', color:'#2a9d8f', conf:95, confLabel:'Very High',
          desc:'After multiple successful replications and meta-analyses, the finding becomes accepted scientific knowledge. This can take years to decades.'},
    14: { label:'Failed\nReplication', color:'#e63946', conf:15, confLabel:'Low',
          desc:'Other labs cannot reproduce the finding. This triggers reassessment and may lead to retraction. About 50-70% of findings in some fields fail replication.'},
    15: { label:'Reassessment', color:'#e76f51', conf:10, confLabel:'Very Low',
          desc:'The original study is re-examined for errors, fraud, or methodological problems. May result in correction or retraction.'}
  };

  var nodes = new vis.DataSet(Object.keys(stageData).map(function(id) {
    var d = stageData[id];
    return {
      id: Number(id), label: d.label,
      color: { background: d.color, border: '#264653', highlight: { background: '#ffd166', border: '#264653' }},
      font: { size: 12, face: 'Arial', multi: true },
      shape: 'box', borderWidth: 2, margin: 10,
      x: getX(Number(id)), y: getY(Number(id))
    };
  }));

  function getX(id) {
    var positions = {1:-380,2:-280,3:-180,4:-80,5:20,6:120,7:220,8:320,9:220,10:220,11:420,12:520,13:620,14:520,15:620};
    return positions[id] || 0;
  }
  function getY(id) {
    var positions = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:-60,9:70,10:140,11:-60,12:-60,13:-60,14:70,15:70};
    return positions[id] || 0;
  }

  var edges = new vis.DataSet([
    {from:1, to:2, arrows:'to'},
    {from:2, to:3, arrows:'to'},
    {from:3, to:4, arrows:'to'},
    {from:4, to:5, arrows:'to'},
    {from:5, to:6, arrows:'to'},
    {from:6, to:7, arrows:'to'},
    {from:7, to:8, arrows:'to', label:'Accept', font:{size:10}},
    {from:7, to:9, arrows:'to', label:'Revise', font:{size:10}},
    {from:7, to:10, arrows:'to', label:'Reject', font:{size:10}, color:{color:'#e63946'}},
    {from:9, to:7, arrows:'to', dashes:true},
    {from:8, to:11, arrows:'to'},
    {from:11, to:12, arrows:'to'},
    {from:12, to:13, arrows:'to', label:'Success', font:{size:10}, color:{color:'#2a9d8f'}},
    {from:12, to:14, arrows:'to', label:'Failure', font:{size:10}, color:{color:'#e63946'}},
    {from:14, to:15, arrows:'to', color:{color:'#e63946'}}
  ]);

  var options = {
    physics: false,
    interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true },
    edges: { smooth: { type: 'cubicBezier', roundness: 0.3 }, color: { color: '#264653' }, width: 2 }
  };

  var network = new vis.Network(networkDiv, { nodes: nodes, edges: edges }, options);

  network.on('click', function(params) {
    if (params.nodes.length > 0) {
      var nodeId = params.nodes[0];
      var d = stageData[nodeId];
      descPanel.innerHTML = '<strong>' + d.label.replace('\n',' ') + '</strong><br/>' + d.desc;
      document.getElementById('conf-fill').style.width = d.conf + '%';
      document.getElementById('conf-label').textContent = d.confLabel;
    }
  });

  // Fit the view
  network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' }});
});
