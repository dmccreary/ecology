// Energy Source Comparison Dashboard - Chart.js Radar Chart
// Multi-criteria comparison of 8 energy sources

document.addEventListener('DOMContentLoaded', function() {
  const mainEl = document.querySelector('main');

  // Create layout
  const wrapper = document.createElement('div');
  wrapper.style.fontFamily = 'Arial, Helvetica, sans-serif';
  wrapper.style.maxWidth = '800px';
  wrapper.style.margin = '0 auto';
  wrapper.style.padding = '10px';
  mainEl.appendChild(wrapper);

  // Title
  const title = document.createElement('h3');
  title.textContent = 'Energy Source Comparison Dashboard';
  title.style.textAlign = 'center';
  title.style.margin = '5px 0 10px 0';
  wrapper.appendChild(title);

  // Controls
  const controls = document.createElement('div');
  controls.style.marginBottom = '10px';
  controls.style.display = 'flex';
  controls.style.gap = '10px';
  controls.style.alignItems = 'center';
  controls.style.flexWrap = 'wrap';
  wrapper.appendChild(controls);

  const label1 = document.createElement('label');
  label1.textContent = 'Compare: ';
  label1.style.fontSize = '14px';
  controls.appendChild(label1);

  const sources = ['Coal', 'Natural Gas', 'Nuclear', 'Solar PV', 'Wind', 'Hydroelectric', 'Geothermal', 'Biomass'];
  const sourceColors = [
    'rgba(139, 90, 43, 0.7)',   // Coal - brown
    'rgba(210, 160, 60, 0.7)',  // Natural Gas - amber
    'rgba(128, 0, 128, 0.7)',   // Nuclear - purple
    'rgba(34, 139, 34, 0.7)',   // Solar - green
    'rgba(60, 179, 113, 0.7)',  // Wind - medium green
    'rgba(30, 144, 255, 0.7)',  // Hydro - blue
    'rgba(178, 34, 34, 0.7)',   // Geothermal - dark red
    'rgba(85, 107, 47, 0.7)'   // Biomass - olive
  ];
  const sourceBorders = sourceColors.map(c => c.replace('0.7', '1'));

  // Dimensions: EROI, CO2 (inverted), Land Use Efficiency, Reliability, Cost (inverted), Scalability
  // Scale 1-10 where 10 is best
  const dimensions = ['EROI', 'CO₂ Clean', 'Land Efficiency', 'Reliability', 'Affordability', 'Scalability'];

  // Data (normalized 1-10 scale, higher = better)
  const rawData = {
    'Coal':         { eroi: 30, co2: 820, land: 0.4, capacity: 85, cost: 65, scale: 6 },
    'Natural Gas':  { eroi: 20, co2: 490, land: 0.5, capacity: 87, cost: 50, scale: 7 },
    'Nuclear':      { eroi: 75, co2: 12,  land: 7.0, capacity: 92, cost: 70, scale: 7 },
    'Solar PV':     { eroi: 10, co2: 45,  land: 0.1, capacity: 25, cost: 35, scale: 9 },
    'Wind':         { eroi: 18, co2: 11,  land: 0.3, capacity: 35, cost: 30, scale: 8 },
    'Hydroelectric':{ eroi: 84, co2: 24,  land: 0.2, capacity: 44, cost: 40, scale: 5 },
    'Geothermal':   { eroi: 9,  co2: 38,  land: 5.0, capacity: 90, cost: 45, scale: 4 },
    'Biomass':      { eroi: 5,  co2: 230, land: 0.05,capacity: 83, cost: 80, scale: 5 }
  };

  // Normalize to 1-10 scale
  function normalize(data) {
    const result = [];
    // EROI: higher is better, max ~84
    result.push(Math.min(10, data.eroi / 10));
    // CO2: lower is better (inverted), max ~820
    result.push(10 - Math.min(10, data.co2 / 100));
    // Land efficiency: higher is better
    result.push(Math.min(10, data.land * 1.5));
    // Capacity factor: higher is better, scale 0-100 to 0-10
    result.push(data.capacity / 10);
    // Cost: lower is better (inverted), scale $/MWh
    result.push(10 - Math.min(10, data.cost / 10));
    // Scalability: already 1-10
    result.push(data.scale);
    return result;
  }

  // Create checkboxes for source selection
  const checkboxes = {};
  const defaultSelected = ['Coal', 'Solar PV', 'Wind'];

  sources.forEach((src, idx) => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = 'cb-' + idx;
    cb.checked = defaultSelected.includes(src);
    cb.addEventListener('change', updateChart);

    const lbl = document.createElement('label');
    lbl.htmlFor = 'cb-' + idx;
    lbl.textContent = src;
    lbl.style.fontSize = '13px';
    lbl.style.color = sourceBorders[idx];
    lbl.style.marginRight = '8px';
    lbl.style.fontWeight = 'bold';
    lbl.style.cursor = 'pointer';

    controls.appendChild(cb);
    controls.appendChild(lbl);
    checkboxes[src] = cb;
  });

  // Canvas for chart
  const canvasContainer = document.createElement('div');
  canvasContainer.style.position = 'relative';
  canvasContainer.style.maxHeight = '450px';
  canvasContainer.style.margin = '0 auto';
  wrapper.appendChild(canvasContainer);

  const canvas = document.createElement('canvas');
  canvas.id = 'radarChart';
  canvasContainer.appendChild(canvas);

  // Data table
  const tableDiv = document.createElement('div');
  tableDiv.style.overflowX = 'auto';
  tableDiv.style.marginTop = '15px';
  wrapper.appendChild(tableDiv);

  function buildTable() {
    let html = '<table style="width:100%; border-collapse:collapse; font-size:12px;">';
    html += '<tr style="background:#f0f0f0;"><th style="padding:4px 6px; border:1px solid #ddd;">Source</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">EROI</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">CO₂ (g/kWh)</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">Land (W/m²)</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">Capacity %</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">Cost ($/MWh)</th>';
    html += '<th style="padding:4px 6px; border:1px solid #ddd;">Scalability</th></tr>';

    sources.forEach((src, idx) => {
      const d = rawData[src];
      const selected = checkboxes[src].checked;
      const bg = selected ? sourceColors[idx].replace('0.7', '0.15') : 'white';
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; font-weight:bold;">' + src + '</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">' + d.eroi + ':1</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">' + d.co2 + '</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">' + d.land + '</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">' + d.capacity + '%</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">$' + d.cost + '</td>';
      html += '<td style="padding:4px 6px; border:1px solid #ddd; text-align:center;">' + d.scale + '/10</td>';
      html += '</tr>';
    });
    html += '</table>';
    tableDiv.innerHTML = html;
  }

  // Create chart
  const ctx = canvas.getContext('2d');
  let chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: dimensions,
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 13 } }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.raw.toFixed(1) + '/10';
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          ticks: { stepSize: 2, font: { size: 10 } },
          pointLabels: { font: { size: 12 } },
          grid: { color: 'rgba(0,0,0,0.1)' }
        }
      }
    }
  });

  function updateChart() {
    const datasets = [];
    sources.forEach((src, idx) => {
      if (checkboxes[src].checked) {
        datasets.push({
          label: src,
          data: normalize(rawData[src]),
          backgroundColor: sourceColors[idx].replace('0.7', '0.15'),
          borderColor: sourceBorders[idx],
          borderWidth: 2,
          pointBackgroundColor: sourceBorders[idx],
          pointRadius: 4
        });
      }
    });
    chart.data.datasets = datasets;
    chart.update();
    buildTable();
  }

  // Initial render
  updateChart();
});
