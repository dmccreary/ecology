// ENSO Cycle Interactive - p5.js
// CANVAS_HEIGHT: 470
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let mode = 0; // 0=Normal, 1=El Nino, 2=La Nina
let targetMode = 0;
let transition = 1.0; // 0 to 1
let modeBtn;
let speedSlider;
let animTime = 0;

// Mode labels
const modeNames = ['Normal', 'El Niño', 'La Niña'];
const modeColors = ['#457b9d', '#e63946', '#1a73e8'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('ENSO cycle showing El Nino and La Nina ocean-atmosphere interactions', LABEL);

  modeBtn = createButton('Switch to El Niño');
  modeBtn.parent(document.querySelector('main'));
  modeBtn.mousePressed(cycleMode);
  modeBtn.style('font-size','13px');
  modeBtn.style('padding','4px 12px');

  speedSlider = createSlider(1, 10, 5, 1);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.style('width', '100px');
}

function draw() {
  updateCanvasSize();
  background(255);

  // Transition animation
  if (transition < 1.0) {
    transition = min(1.0, transition + 0.02 * speedSlider.value());
  }
  animTime += 0.02 * speedSlider.value();

  // Draw area
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill(modeColors[targetMode]); textSize(16); textAlign(CENTER, TOP);
  text('ENSO Cycle: ' + modeNames[targetMode], canvasWidth/2, 8);

  // Cross-section dimensions
  let csL = 20, csR = canvasWidth - 20;
  let csT = 40, csB = 300;
  let csW = csR - csL, csH = csB - csT;
  let oceanTop = csT + csH * 0.35; // atmosphere/ocean boundary
  let thermoclineBase = csB - 30;

  // Sky / Atmosphere
  for (let y = csT; y < oceanTop; y++) {
    let t = (y - csT) / (oceanTop - csT);
    let c = lerpColor(color('#87CEEB'), color('#b0d4e8'), t);
    stroke(c); line(csL, y, csR, y);
  }

  // Land masses
  // Australia/Indonesia (left)
  fill('#6b8e4e'); noStroke();
  beginShape();
  vertex(csL, oceanTop - 20);
  vertex(csL + 40, oceanTop - 35);
  vertex(csL + 60, oceanTop - 25);
  vertex(csL + 50, oceanTop);
  vertex(csL, oceanTop);
  endShape(CLOSE);

  // South America (right)
  fill('#8B7355');
  beginShape();
  vertex(csR, oceanTop - 25);
  vertex(csR - 40, oceanTop - 40);
  vertex(csR - 55, oceanTop - 30);
  vertex(csR - 45, oceanTop);
  vertex(csR, oceanTop);
  endShape(CLOSE);

  // Labels
  noStroke(); fill(255); textSize(9); textAlign(CENTER, CENTER);
  text('Australia', csL + 30, oceanTop - 15);
  text('S. America', csR - 35, oceanTop - 18);

  // Ocean with temperature gradient
  let warmShift = 0;
  if (targetMode === 1) warmShift = lerp(0, 0.4, transition); // El Nino: warm moves east
  else if (targetMode === 2) warmShift = lerp(0, -0.3, transition); // La Nina: warm stays west

  for (let x = csL; x < csR; x++) {
    let nx = (x - csL) / csW; // 0 (west) to 1 (east)
    for (let y = oceanTop; y < csB; y++) {
      let ny = (y - oceanTop) / (csB - oceanTop);
      // Base: warm in west, cool in east
      let warmness = 1 - nx + warmShift;
      warmness = constrain(warmness, 0, 1);
      // Deeper is cooler
      warmness *= (1 - ny * 0.6);

      let coolColor = color(26, 115, 232); // #1a73e8
      let warmColor = color(230, 57, 70);  // #e63946
      let c = lerpColor(coolColor, warmColor, warmness);
      stroke(c);
      point(x, y);
    }
  }

  // Thermocline line
  stroke('#fff'); strokeWeight(2); setLineDash([6, 4]);
  let thermoWestY, thermoEastY;
  if (targetMode === 0) { thermoWestY = oceanTop + csH*0.55; thermoEastY = oceanTop + csH*0.35; }
  else if (targetMode === 1) { thermoWestY = lerp(oceanTop+csH*0.55, oceanTop+csH*0.45, transition); thermoEastY = lerp(oceanTop+csH*0.35, oceanTop+csH*0.55, transition); }
  else { thermoWestY = lerp(oceanTop+csH*0.55, oceanTop+csH*0.6, transition); thermoEastY = lerp(oceanTop+csH*0.35, oceanTop+csH*0.25, transition); }

  beginShape();
  noFill();
  for (let x = csL; x <= csR; x += 5) {
    let t = (x - csL) / csW;
    let ty = lerp(thermoWestY, thermoEastY, t);
    vertex(x, ty);
  }
  endShape();
  setLineDash([]);

  noStroke(); fill(255); textSize(9); textAlign(LEFT, CENTER);
  text('Thermocline', csL + 5, thermoWestY - 8);

  // Trade wind arrows
  let windStrength, windDir;
  if (targetMode === 0) { windStrength = 1.0; windDir = -1; } // west (normal)
  else if (targetMode === 1) { windStrength = lerp(1.0, 0.2, transition); windDir = -1; } // weakened
  else { windStrength = lerp(1.0, 1.5, transition); windDir = -1; } // strengthened

  let arrowY = csT + 30;
  let nArrows = 5;
  for (let i = 0; i < nArrows; i++) {
    let ax = csL + 80 + i * (csW - 120) / nArrows;
    let aLen = 30 * windStrength;
    let sway = sin(animTime + i) * 3;

    stroke('#264653'); strokeWeight(2);
    fill('#264653');
    let endX = ax + windDir * aLen;
    line(ax, arrowY + sway, endX, arrowY + sway);
    // Arrowhead
    triangle(endX, arrowY + sway, endX - windDir*8, arrowY + sway - 4, endX - windDir*8, arrowY + sway + 4);
  }
  noStroke(); fill('#264653'); textSize(9); textAlign(CENTER, TOP);
  text('Trade Winds' + (targetMode===1 ? ' (weak)' : targetMode===2 ? ' (strong)' : ''), canvasWidth/2, arrowY + 8);

  // Upwelling arrows (South American coast)
  if (targetMode !== 1) {
    let upStr = targetMode === 2 ? 1.5 : 1.0;
    stroke('#90be6d'); strokeWeight(2); fill('#90be6d');
    for (let i = 0; i < 3; i++) {
      let ux = csR - 60 + i * 12;
      let uy1 = csB - 20;
      let uy2 = uy1 - 25 * upStr;
      let bob = sin(animTime * 2 + i) * 3;
      line(ux, uy1 + bob, ux, uy2 + bob);
      triangle(ux, uy2 + bob, ux - 4, uy2 + 8 + bob, ux + 4, uy2 + 8 + bob);
    }
    noStroke(); fill('#90be6d'); textSize(8); textAlign(CENTER, TOP);
    text('Upwelling', csR - 48, csB - 50);
  }

  // Rain/cloud icons
  let rainWestX = csL + 60, rainEastX = csR - 60;
  let cloudY = csT + 55;

  // Western rain (always some; more in Normal/La Nina)
  let westRain = targetMode === 1 ? 0.3 : 1.0;
  drawCloud(rainWestX, cloudY, westRain);

  // Eastern rain (El Nino brings rain to east)
  if (targetMode === 1) {
    drawCloud(rainEastX, cloudY, lerp(0, 1.0, transition));
  }

  // Info panel
  let infoY = 310;
  fill('#f8f9fa'); stroke('#ccc'); strokeWeight(1);
  rect(10, infoY, canvasWidth-20, drawHeight - infoY - 5, 6);

  noStroke(); fill('#264653'); textSize(11); textAlign(LEFT, TOP);
  let info = getInfoText(targetMode);
  text(info, 20, infoY + 8, canvasWidth - 40, 100);

  // Controls
  let ox = canvasOffsetX(), oy = canvasOffsetY();
  noStroke(); fill('#264653'); textSize(12); textAlign(LEFT, CENTER);
  text('Speed: ' + speedSlider.value(), 10, drawHeight + 25);
  speedSlider.position(ox + 70, oy + drawHeight + 16);
  modeBtn.position(ox + 200, oy + drawHeight + 14);
}

function drawCloud(x, y, intensity) {
  if (intensity < 0.1) return;
  fill(200, 200, 210, 200 * intensity); noStroke();
  ellipse(x, y, 40, 20);
  ellipse(x - 12, y + 3, 25, 18);
  ellipse(x + 12, y + 3, 25, 18);

  // Rain drops
  if (intensity > 0.3) {
    fill(100, 150, 255, 180 * intensity);
    for (let i = 0; i < 4; i++) {
      let rx = x - 12 + i * 8;
      let ry = y + 14 + ((animTime * 30 + i * 7) % 20);
      ellipse(rx, ry, 3, 5);
    }
  }
}

function getInfoText(m) {
  if (m === 0) return 'NORMAL: Trade winds blow west, pushing warm water toward Australia. Cool, nutrient-rich water upwells along South America. The thermocline tilts — deeper in the west, shallower in the east. Heavy rainfall over the western Pacific.';
  if (m === 1) return 'EL NIÑO: Trade winds weaken or reverse. Warm water spreads eastward across the Pacific. Upwelling stops along South America, reducing nutrients and fish populations. Heavy rain shifts east, bringing drought to Australia and floods to South America.';
  return 'LA NIÑA: Trade winds strengthen. Warm water piles up in the western Pacific. Strong upwelling brings cold, nutrient-rich water to South America. Enhanced rainfall in western Pacific; drought in eastern Pacific. Often follows El Niño.';
}

function cycleMode() {
  targetMode = (targetMode + 1) % 3;
  transition = 0;
  let nextMode = (targetMode + 1) % 3;
  modeBtn.html('Switch to ' + modeNames[nextMode]);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function canvasOffsetX() {
  return document.querySelector('main canvas').getBoundingClientRect().left;
}
function canvasOffsetY() {
  return document.querySelector('main canvas').getBoundingClientRect().top;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
