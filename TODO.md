# TODO

<!-- p5js-v2-audit-2026-09-05 -->
## p5.js 2.x Upgrade: MicroSim Fixes Needed (2026-09-05)

A static scan of this repo's `docs/sims/` MicroSims found **6 sim(s)** using p5.js v1-only APIs that will break if upgraded to p5.js 2.x (the microsim-generator skill's templates now default to p5@2.3.2). Fix these before bumping this repo's MicroSims past p5@1.x.

- [ ] **adaptive-management-cycle** (`docs/sims/adaptive-management-cycle/`)
    - `adaptive-management-cycle.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **biogeochemical-cycles** (`docs/sims/biogeochemical-cycles/`)
    - `biogeochemical-cycles.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
    - `biogeochemical-cycles.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **ecological-succession** (`docs/sims/ecological-succession/`)
    - `ecological-succession.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **global-winds** (`docs/sims/global-winds/`)
    - `global-winds.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **hydrologic-cycle** (`docs/sims/hydrologic-cycle/`)
    - `hydrologic-cycle.js` uses `curveVertex(...)`, renamed to `splineVertex()` in v2 with changed anchor-point rules — rename to `splineVertex()`; drop the old duplicated first/last anchor points and rely on `endShape(CLOSE)` for a smooth closed loop.
- [ ] **soil-explorer** (`docs/sims/soil-explorer/`)
    - `soil-explorer.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.

Reference: [p5.js Teachers' Guide to v2 transition](https://p5js.org/tutorials/v2_transition/)
