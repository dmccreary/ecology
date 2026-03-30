---
title: Ecosystem Carbon Budget Calculator
description: Calculate GPP, NPP, and NEP for different ecosystems and determine carbon sink or source status.
image: /sims/carbon-budget-calc/carbon-budget-calc.png
og:image: /sims/carbon-budget-calc/carbon-budget-calc.png
twitter:image: /sims/carbon-budget-calc/carbon-budget-calc.png
social:
   cards: false
quality_score: 83
---

# Ecosystem Carbon Budget Calculator

<iframe src="main.html" height="452" width="100%" scrolling="no"></iframe>

[Run the Ecosystem Carbon Budget Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive calculator lets students explore the carbon budget of five ecosystem types by adjusting Gross Primary Productivity (GPP), autotroph respiration (Ra), and heterotroph respiration (Rh). The simulation calculates Net Primary Productivity (NPP = GPP - Ra) and Net Ecosystem Productivity (NEP = NPP - Rh) in real time, with a color-coded indicator showing whether the ecosystem is a carbon sink (green, NEP > 0) or carbon source (red, NEP < 0).

Students can select from Tropical Forest, Temperate Forest, Grassland, Ocean, and Tundra, each with realistic default parameter values. Disturbance buttons (Fire, Drought, Warming) modify the parameters realistically, showing how environmental changes shift the carbon balance. A bar chart visualizes the relative sizes of GPP, Ra, Rh, and NEP.

This supports the Bloom's taxonomy level of **Evaluate**, as students must calculate productivity values, determine carbon balance status, and assess how changing conditions affect whether an ecosystem absorbs or releases carbon -- connecting abstract productivity concepts to real-world climate implications.

## How to Use

1. **Select an ecosystem** from the dropdown (Tropical Forest, Temperate Forest, Grassland, Ocean, or Tundra) to load realistic default values
2. **Adjust the three sliders**: GPP (total photosynthesis), Ra (plant respiration), and Rh (decomposer/animal respiration)
3. **Read the real-time calculations**: NPP = GPP - Ra, NEP = NPP - Rh
4. **Watch the color indicator**: green = carbon sink (absorbing CO2), red = carbon source (releasing CO2), yellow = near balance
5. **Click disturbance buttons** to see how Fire, Drought, or Warming affect the carbon budget:
    - **Fire**: reduces GPP (burned vegetation) and increases Rh temporarily (decomposition of dead material)
    - **Drought**: reduces GPP (less water for photosynthesis)
    - **Warming**: increases both Ra and Rh (higher metabolic rates)
6. **Compare ecosystems** by switching between types and noting how their default carbon budgets differ
7. **Click Reset** to restore the default values for the selected ecosystem

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/carbon-budget-calc/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
15-20 minutes

### Learning Objectives
- Calculate GPP, NPP, and NEP for different ecosystem scenarios
- Determine whether an ecosystem is a carbon sink or source based on its carbon budget
- Predict how disturbances (fire, drought, warming) shift the carbon balance
- Compare carbon budgets across five major ecosystem types
- Explain the relationship between ecosystem productivity and climate change

### Prerequisites
- Understanding of photosynthesis and cellular respiration
- Knowledge of the carbon cycle at a basic level
- Familiarity with the concepts of producers and decomposers
- Understanding that CO2 is a greenhouse gas

### Standards Alignment
- NGSS HS-LS2-5: Develop a model to illustrate the role of photosynthesis and cellular respiration in the cycling of carbon
- AP Environmental Science Topic 1.6: Primary Productivity

### Activities

1. **Warm-Up** (2-3 min): Ask: "Is a forest always absorbing CO2? Can a forest ever release more CO2 than it absorbs?" Record predictions.
2. **Guided Exploration** (5-7 min): Select Tropical Forest and review the default values. Walk through the calculation: GPP (3000) - Ra (1500) = NPP (1500); NPP (1500) - Rh (1200) = NEP (300). Ask: "Is this a sink or source? How much carbon per year?" Then click "Fire" and observe the shift.
3. **Independent Investigation** (5-7 min): Students compare all five ecosystems and record which has the highest NEP (largest sink), which is closest to balance, and which disturbance is most damaging to each. Challenge: "Can you use the sliders to turn a tropical forest into a carbon source? What conditions would cause this in the real world?"
4. **Reflection** (3-5 min): Discuss: "If global warming increases Rh in all ecosystems, what happens to the global carbon balance? How could this create a positive feedback loop that accelerates climate change?"

### Assessment Questions

1. Define GPP, NPP, and NEP. Write the equations that relate them.
2. A temperate forest has GPP = 1800, Ra = 900, and Rh = 700. Calculate NPP and NEP. Is this forest a carbon sink or source?
3. Using the simulation, apply the "Warming" disturbance to a tundra ecosystem. Explain why warming is particularly dangerous for tundra carbon budgets and how this relates to permafrost thawing.
4. Climate scientists warn about a "tipping point" where forests switch from carbon sinks to carbon sources. Using the calculator, demonstrate how increasing temperature (which raises Ra and Rh) could cause this switch. At what point does NEP become negative for a tropical forest?

## References

1. [Net Primary Productivity - Wikipedia](https://en.wikipedia.org/wiki/Net_primary_productivity) - Overview of productivity concepts and global patterns
2. [Carbon Cycle - Wikipedia](https://en.wikipedia.org/wiki/Carbon_cycle) - How carbon moves through Earth's systems
3. [p5.js Reference](https://p5js.org/reference/) - JavaScript library used for the interactive calculator
