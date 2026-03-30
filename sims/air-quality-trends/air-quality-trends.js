// U.S. Air Quality Trends Dashboard - Chart.js
// CANVAS_HEIGHT: 480
// This file uses Chart.js (loaded via CDN in main.html)

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // Title
  const title = document.createElement('h2');
  title.textContent = 'U.S. Air Quality Trends Dashboard (1970-2025)';
  title.style.textAlign = 'center';
  title.style.fontFamily = 'Arial, Helvetica, sans-serif';
  title.style.margin = '10px 0 5px 0';
  title.style.fontSize = '18px';
  main.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Criteria pollutant emissions indexed to 1970 = 100, alongside GDP growth';
  subtitle.style.textAlign = 'center';
  subtitle.style.fontFamily = 'Arial, sans-serif';
  subtitle.style.fontSize = '12px';
  subtitle.style.color = '#666';
  subtitle.style.margin = '0 0 10px 0';
  main.appendChild(subtitle);

  // Canvas for chart
  const canvas = document.createElement('canvas');
  canvas.id = 'aqChart';
  canvas.style.maxWidth = '100%';
  main.appendChild(canvas);

  // Annotation area
  const annotDiv = document.createElement('div');
  annotDiv.style.fontFamily = 'Arial, sans-serif';
  annotDiv.style.fontSize = '11px';
  annotDiv.style.color = '#555';
  annotDiv.style.padding = '10px';
  annotDiv.style.maxWidth = '700px';
  annotDiv.style.margin = '0 auto';
  annotDiv.innerHTML = '<strong>Key Milestones:</strong> ' +
    '1970 — Clean Air Act passed | ' +
    '1990 — Clean Air Act Amendments | ' +
    '1996 — Leaded gasoline fully phased out | ' +
    '2005 — Clean Air Interstate Rule | ' +
    '2015 — Updated ozone standards | ' +
    '<em>Gray bands = recession years</em>';
  main.appendChild(annotDiv);

  // Data: years from 1970 to 2025 (every 5 years for clarity)
  const years = [1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025];

  // All indexed to 1970 = 100
  const co = [100, 90, 79, 67, 58, 46, 36, 28, 21, 16, 13, 11];
  const pb = [100, 85, 68, 12, 5, 2, 1.5, 1, 0.8, 0.6, 0.5, 0.4];
  const no2 = [100, 96, 95, 88, 82, 75, 65, 55, 42, 35, 28, 24];
  const so2 = [100, 88, 78, 65, 57, 42, 35, 28, 18, 12, 8, 6];
  const pm25 = [100, 95, 82, 72, 63, 55, 48, 40, 34, 28, 25, 22];
  const o3voc = [100, 94, 88, 80, 74, 66, 58, 50, 42, 36, 31, 27];
  const gdp = [100, 115, 133, 160, 190, 220, 270, 310, 330, 370, 390, 430];

  // Recession years (approximate, mapped to nearest data point)
  // 1973-75, 1980-82, 1990-91, 2001, 2007-09, 2020
  const recessionBands = [
    { start: 1973, end: 1975 },
    { start: 1980, end: 1982 },
    { start: 1990, end: 1991 },
    { start: 2001, end: 2002 },
    { start: 2007, end: 2009 },
    { start: 2020, end: 2020 }
  ];

  // Custom plugin for recession bands
  const recessionPlugin = {
    id: 'recessionBands',
    beforeDraw(chart) {
      const ctx = chart.ctx;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;

      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';

      for (const band of recessionBands) {
        // Find pixel positions
        const labels = chart.data.labels;
        const x1Idx = labels.findIndex(l => l >= band.start);
        const x2Idx = labels.findIndex(l => l >= band.end);
        if (x1Idx < 0) continue;

        const x1 = xScale.getPixelForValue(x1Idx >= 0 ? x1Idx : 0);
        const x2 = xScale.getPixelForValue(x2Idx >= 0 ? x2Idx : x1Idx);
        const yTop = yScale.top;
        const yBottom = yScale.bottom;

        ctx.fillRect(x1, yTop, Math.max(x2 - x1, 10), yBottom - yTop);
      }
      ctx.restore();
    }
  };

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'CO (Carbon Monoxide)',
          data: co,
          borderColor: '#e63946',
          backgroundColor: 'rgba(230,57,70,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'Pb (Lead)',
          data: pb,
          borderColor: '#d4a373',
          backgroundColor: 'rgba(212,163,115,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'NO₂ (Nitrogen Dioxide)',
          data: no2,
          borderColor: '#e76f51',
          backgroundColor: 'rgba(231,111,81,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'SO₂ (Sulfur Dioxide)',
          data: so2,
          borderColor: '#f4a261',
          backgroundColor: 'rgba(244,162,97,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'PM₂.₅ (Particulate Matter)',
          data: pm25,
          borderColor: '#e9c46a',
          backgroundColor: 'rgba(233,196,106,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'O₃ precursors (VOCs)',
          data: o3voc,
          borderColor: '#bc6c25',
          backgroundColor: 'rgba(188,108,37,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'GDP (Economic Growth)',
          data: gdp,
          borderColor: '#2a9d8f',
          backgroundColor: 'rgba(42,157,143,0.15)',
          borderWidth: 3,
          borderDash: [6, 3],
          pointRadius: 4,
          pointStyle: 'rectRot',
          tension: 0.3,
          fill: true,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              let val = context.parsed.y;
              if (context.datasetIndex === 6) {
                return label + ': ' + val + ' (indexed)';
              }
              return label + ': ' + val + '% of 1970 level';
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            font: { size: 11 }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Pollutant Emissions (1970 = 100)'
          },
          min: 0,
          max: 120,
          ticks: {
            callback: function (value) {
              return value + '%';
            }
          }
        },
        y2: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'GDP Index (1970 = 100)'
          },
          min: 0,
          max: 500,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    },
    plugins: [recessionPlugin]
  });
});
