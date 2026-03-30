---
title: The Carbon Cycle
description: Interactive p5.js simulation showing carbon fluxes between atmosphere, ocean, terrestrial biosphere, and lithosphere with adjustable fossil fuel, deforestation, and ocean temperature parameters.
image: /sims/carbon-cycle/carbon-cycle.png
og:image: /sims/carbon-cycle/carbon-cycle.png
twitter:image: /sims/carbon-cycle/carbon-cycle.png
social:
   cards: false
quality_score: 82
---

# The Carbon Cycle

<iframe src="main.html" height="462" width="100%" scrolling="no"></iframe>

[Run the The Carbon Cycle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim models the global carbon cycle by showing how carbon moves between four major reservoirs: the atmosphere, oceans, terrestrial biosphere, and lithosphere. Animated carbon particles flow along labeled pathways representing key processes such as photosynthesis, respiration, decomposition, combustion, ocean absorption, and volcanic emission. Real-time bar charts display the changing size of each reservoir as fluxes shift.

Students can manipulate three sliders to explore how human activities and environmental changes alter the carbon balance. Increasing fossil fuel burning or deforestation rates adds carbon to the atmosphere, while changing ocean temperature affects CO2 solubility. A running counter displays atmospheric CO2 in parts per million, and when levels cross 450 ppm the background tints red as a visual warning of dangerous warming thresholds.

The simulation begins at pre-industrial baseline values and updates continuously, allowing students to observe both fast fluxes (photosynthesis, respiration) and slow fluxes (volcanic emissions, lithosphere storage) and to reason about how perturbations propagate through the system.

## How to Use

1. Click the **Start** button to begin the simulation and watch carbon particles flow between reservoirs.
2. Adjust the **Fossil Fuel Burning** slider (0-3x current rate) to increase or decrease anthropogenic carbon emissions and observe how atmospheric CO2 responds.
3. Move the **Deforestation Rate** slider (0-100%) to simulate loss of terrestrial carbon sinks and note the effect on land and atmosphere reservoirs.
4. Change the **Ocean Temperature** slider to explore how warming oceans absorb less CO2, shifting the balance toward the atmosphere.
5. Watch the **CO2 ppm counter** and the **reservoir bar charts** to track changes in real time.
6. Notice the red background tint when CO2 exceeds 450 ppm, indicating a dangerous threshold.
7. Click **Reset** to return all values to the pre-industrial baseline and start a new experiment.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/carbon-cycle/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Distinguish between fast carbon fluxes (photosynthesis, respiration) and slow carbon fluxes (volcanic emissions, lithosphere storage)
- Predict how changes in fossil fuel burning, deforestation, and ocean temperature affect atmospheric CO2 concentration
- Analyze cause-and-effect relationships within the carbon cycle system
- Evaluate the relative magnitude of natural vs. anthropogenic carbon fluxes

### Prerequisites

- Basic understanding of photosynthesis and cellular respiration
- Familiarity with the concept of chemical reservoirs and fluxes
- Understanding of parts per million (ppm) as a unit of concentration

### Standards Alignment

- **NGSS HS-ESS2-6**: Develop a quantitative model to describe the cycling of carbon among the hydrosphere, atmosphere, geosphere, and biosphere.
- **NGSS HS-ESS3-6**: Use a computational representation to illustrate the relationships among Earth systems and how those relationships are being modified due to human activity.
- **AP Environmental Science**: Topic 1.3 -- Biogeochemical Cycles

### Activities

1. **Engage** (5 min): Ask students what happens to the CO2 released when they drive a car or heat a building. Where does it go? Introduce the four carbon reservoirs and have students predict which is largest.

2. **Explore** (15 min): Students interact with the simulation individually or in pairs. First, run the simulation at baseline settings to observe natural carbon cycling. Then systematically increase fossil fuel burning to 3x while keeping other sliders constant. Record the CO2 ppm at 10-year intervals. Reset and repeat with deforestation at 100%. Reset and repeat with elevated ocean temperature. Document observations in a data table.

3. **Explain** (15 min): Class discussion connecting observations to concepts. Why does deforestation increase atmospheric CO2 even though no fossil fuels are burned? Why does a warmer ocean release more CO2? Compare the magnitude of natural fluxes to human perturbations. Introduce the concept of carbon sinks and sources.

4. **Extend** (10 min): Challenge students to find a combination of slider settings that keeps CO2 below 450 ppm. Discuss what real-world policies or technologies correspond to each slider. Students write a brief paragraph explaining one feedback loop they observed.

### Assessment Questions

1. If fossil fuel burning doubles, what happens to the rate of ocean CO2 absorption, and why?
2. Explain why deforestation is considered both a carbon source and the loss of a carbon sink.
3. A warming ocean absorbs less CO2. How does this create a positive feedback loop for climate change?
4. Compare the size of the lithosphere carbon reservoir to the atmosphere. Why does even a small percentage release from the lithosphere have large atmospheric effects?
5. Design an experiment using this simulation to test whether reducing deforestation or reducing fossil fuel burning is more effective at lowering atmospheric CO2.

## References

1. Friedlingstein, P., et al. (2023). Global Carbon Budget 2023. *Earth System Science Data*, 15, 5301-5369.
2. NASA Earth Observatory. (2024). The Carbon Cycle. [earthobservatory.nasa.gov](https://earthobservatory.nasa.gov/features/CarbonCycle)
3. IPCC (2021). Climate Change 2021: The Physical Science Basis. Chapter 5: Global Carbon and Other Biogeochemical Cycles.
