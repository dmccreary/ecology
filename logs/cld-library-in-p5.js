// CLD (Causal Loop Diagram) Symbol Library for p5.js
// Reusable functions for drawing standard CLD notation symbols
// Used in feedback-loop-explorer and other systems thinking MicroSims
//
// Usage:
//   drawLoopIndicator(cx, cy, r, col, label)
//     cx, cy  - center of the symbol
//     r       - radius of the circular arrow (18 works well for most diagrams)
//     col     - p5.js color for the arrow and label
//     label   - 'R' for reinforcing or 'B' for balancing
//
// Example:
//   drawLoopIndicator(200, 150, 18, color(220, 100, 50), 'R');
//   drawLoopIndicator(500, 150, 18, color(50, 130, 200), 'B');

function drawLoopIndicator(cx, cy, r, col, label) {
  // Draw a clockwise circular arrow (CLD standard notation)
  // Arc spans ~300 degrees, leaving a 60-degree gap for the arrowhead
  let gapAngle = PI / 3;
  let startA = -PI / 2 + gapAngle / 2;
  let endA = startA + TWO_PI - gapAngle;

  noFill();
  stroke(col);
  strokeWeight(2);

  // Draw arc as line segments (clockwise)
  let steps = 40;
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let a = startA + (i / steps) * (endA - startA);
    vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  endShape();

  // Arrowhead at the end of the arc
  // Tip sits exactly on the arc; triangle points along the tangent
  let tipAngle = endA;
  let tipX = cx + cos(tipAngle) * r;
  let tipY = cy + sin(tipAngle) * r;
  // Tangent for clockwise motion, rotated 15° CCW for visual centering
  let tangent = tipAngle + PI / 2 - PI / 12;

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
