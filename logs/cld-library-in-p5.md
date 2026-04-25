# CLD Symbol Library in p5.js

This is a reusable p5.js function for drawing standard Causal Loop Diagram (CLD) notation symbols — a circular arrow with an "R" (reinforcing) or "B" (balancing) label in the center. Supports both clockwise and counter-clockwise directions. Developed during the feedback-loop-explorer MicroSim build on 2026-03-30.

## Usage

```javascript
drawLoopIndicator(cx, cy, r, col, label, dc)
```

| Parameter | Description |
|-----------|-------------|
| `cx, cy` | Center coordinates of the symbol |
| `r` | Radius of the circular arrow (18 works well) |
| `col` | p5.js color for the arrow and label |
| `label` | `'R'` for reinforcing or `'B'` for balancing |
| `dc` | Direction code: `'CW'` for clockwise (default), `'CCW'` for counter-clockwise |

## Example

```javascript
// Clockwise reinforcing loop (default)
drawLoopIndicator(200, 150, 18, color(220, 100, 50), 'R');
drawLoopIndicator(200, 150, 18, color(220, 100, 50), 'R', 'CW');

// Counter-clockwise balancing loop
drawLoopIndicator(500, 150, 18, color(50, 130, 200), 'B', 'CCW');
```

## Source Code

```javascript
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

  let steps = 40;
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let a = startA + (i / steps) * (endA - startA);
    vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  endShape();

  // Arrowhead at end of arc
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
```

## Design Notes

- The arc gap is 60 degrees at the top, giving the arrowhead room
- The arrowhead tangent is rotated 15 degrees from the true tangent for better visual centering on the arc
- The arrow tip sits exactly on the arc path
- `dc` parameter defaults to `'CW'` if omitted, so existing calls without it are unaffected
- Used in: [Feedback Loop Explorer](../sims/feedback-loop-explorer/index.md)
