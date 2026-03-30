---
title: Interactive Stock and Flow Sandbox
description: Hands-on simulation where students manipulate inflow and outflow rates to explore accumulation, depletion, and dynamic equilibrium in ecological systems.
image: /sims/stock-flow-sandbox/stock-flow-sandbox.png
og:image: /sims/stock-flow-sandbox/stock-flow-sandbox.png
twitter:image: /sims/stock-flow-sandbox/stock-flow-sandbox.png
social:
   cards: false
quality_score: 82
---

# Interactive Stock and Flow Sandbox

<iframe src="main.html" height="442" width="100%" scrolling="no"></iframe>

[Run the Interactive Stock and Flow Sandbox MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a hands-on sandbox for exploring the fundamental systems thinking concept of stocks and flows. A central stock is visualized as a tank that fills or drains in real time based on inflow and outflow rates controlled by sliders. A line chart tracks the stock level over time, making accumulation and depletion patterns immediately visible.

The simulation includes preset ecological scenarios that put the abstract stock-and-flow concept into real-world context: a Lake Water Budget (rainfall vs. evaporation), a Deer Population (births vs. deaths), and Carbon in Atmosphere (emissions vs. absorption). Each preset loads appropriate labels and initial values, helping students see the same mathematical pattern across very different ecological systems.

A dynamic equilibrium indicator lights up when inflow equals outflow, reinforcing the important concept that equilibrium does not mean nothing is happening -- it means the rates of change are balanced. This intuition is essential for understanding homeostasis, population dynamics, and biogeochemical cycles throughout ecology.

## How to Use

1. Observe the tank visualization showing the current stock level as a blue water fill.
2. Adjust the **Inflow** slider (0-10 units/sec) and **Outflow** slider (0-10 units/sec) to change the rates.
3. Watch the tank fill or drain in real time and observe the stock level line chart below.
4. Set inflow equal to outflow to achieve **dynamic equilibrium** (the green indicator lights up).
5. Use the **Preset** dropdown to load ecological scenarios: Lake Water Budget, Deer Population, or Carbon in Atmosphere.
6. Experiment with different rate combinations and observe how quickly the stock responds.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/stock-flow-sandbox/main.html"
        height="442px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Systems Thinking)

### Duration
45 minutes

### Learning Objectives

- Construct a mental model of stock and flow dynamics for a simple ecological system
- Predict how a stock changes over time when inflow and outflow rates differ
- Explain the concept of dynamic equilibrium using evidence from the simulation
- Apply stock-and-flow thinking to multiple ecological contexts

### Prerequisites

- Basic understanding of rates (things per unit time)
- Introduction to ecological systems concepts
- Familiarity with line graphs and interpreting trends

### Standards Alignment

- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity
- **NGSS HS-ESS2-6**: Develop a quantitative model to describe the cycling of carbon among the hydrosphere, atmosphere, geosphere, and biosphere
- **AP Environmental Science**: Topic 9.3 -- The Carbon Cycle

### Activities

1. **Engage** (5 min): Show a bathtub analogy -- what happens when you turn on the faucet but leave the drain open? When does the water level stay constant? Introduce the terms stock, inflow, outflow, and equilibrium.
2. **Explore** (15 min): Students set custom inflow/outflow values and sketch predictions before running the simulation. Test: What happens when inflow = 8, outflow = 3? When inflow = outflow = 5? When inflow = 2, outflow = 7?
3. **Explain** (15 min): Switch to ecological presets. For each scenario, students identify what the stock, inflow, and outflow represent in the real system. Discuss: What would cause the deer population to reach equilibrium? What does it mean for atmospheric CO2 when emissions exceed absorption?
4. **Extend** (10 min): Students design their own stock-and-flow scenario for an ecological system not included in the presets (e.g., soil nitrogen, fish population in a lake, groundwater aquifer). They describe the stock, inflow, outflow, and conditions for equilibrium.

### Assessment Questions

1. If the inflow rate is 7 units/sec and the outflow rate is 4 units/sec, what happens to the stock over time? Sketch the expected graph.
2. Explain why dynamic equilibrium does not mean "nothing is changing" in a population.
3. In the Carbon in Atmosphere scenario, what real-world changes would increase the outflow (absorption) to restore equilibrium?
4. How does stock-and-flow thinking help ecologists predict the effects of environmental changes?

## References

1. Meadows, D.H. (2008). *Thinking in Systems: A Primer*. Chelsea Green Publishing.
2. Ford, A. (2010). *Modeling the Environment* (2nd ed.). Island Press.
3. Sterman, J.D. (2000). *Business Dynamics: Systems Thinking and Modeling for a Complex World*. McGraw-Hill.
