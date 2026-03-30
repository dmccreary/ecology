// CLD (Causal Loop Diagram) Symbol Library for p5.js
// Reusable functions for drawing standard CLD notation symbols
// Used in feedback-loop-explorer and other systems thinking MicroSims
//
// Usage:
//   drawLoopIndicator(cx, cy, r, col, label, dc)
//     cx, cy  - center of the symbol
//     r       - radius of the circular arrow (18 works well for most diagrams)
//     col     - p5.js color for the arrow and label
//     label   - 'R' for reinforcing or 'B' for balancing
//     dc      - direction code: 'CW' (clockwise, default) or 'CCW' (counter-clockwise)
//
// Examples:
//   drawLoopIndicator(200, 150, 18, color(220, 100, 50), 'R');        // CW default
//   drawLoopIndicator(200, 150, 18, color(220, 100, 50), 'R', 'CW'); // explicit CW
//   drawLoopIndicator(500, 150, 18, color(50, 130, 200), 'B', 'CCW'); // CCW
//
// To include in a MicroSim's main.html, add before the sim's own script:
//   <script src="../shared-libs/cld-symbols.js"></script>

function drawLoopIndicator(cx, cy, r, col, label, dc) {
  // Draw a circular arrow around a CLD loop label
  // dc: 'CW' for clockwise (default), 'CCW' for counter-clockwise
  if (!dc) dc = 'CW';
  let ccw = (dc === 'CCW');

  let gapAngle = PI / 3; // 60-degree gap at top

  // CW: arc runs in positive direction; CCW: arc runs in negative direction
  let startA, endA;
  if (ccw) {
    startA = -PI / 2 - gapAngle / 2;
    endA = startA - (TWO_PI - gapAngle);
  } else {
    startA = -PI / 2 + gapAngle / 2;
    endA = startA + (TWO_PI - gapAngle);
  }

  noFill();
  stroke(col);
  strokeWeight(2);

  // Draw arc as line segments
  let steps = 40;
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let a = startA + (i / steps) * (endA - startA);
    vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  endShape();

  // Arrowhead at end of arc
  // Tip sits exactly on the arc; triangle points along the tangent
  let tipAngle = endA;
  let tipX = cx + cos(tipAngle) * r;
  let tipY = cy + sin(tipAngle) * r;
  // Tangent along arc direction, with 15 degree adjustment for visual centering
  let tangent;
  if (ccw) {
    tangent = tipAngle - PI / 2 + PI / 12;
  } else {
    tangent = tipAngle + PI / 2 - PI / 12;
  }

  fill(col);
  noStroke();
  push();
  translate(tipX, tipY);
  rotate(tangent);
  triangle(0, 0, -10, -4, -10, 4);
  pop();

  // Label text centered inside the arc
  fill(col);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, cx, cy + 1);
}
