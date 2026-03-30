---
title: Energy Flow Tracker
description: Interactive p5.js animated simulation tracing energy through a food chain with branching losses to respiration, waste, and transfer at each trophic level.
image: /sims/energy-flow-tracker/energy-flow-tracker.png
og:image: /sims/energy-flow-tracker/energy-flow-tracker.png
twitter:image: /sims/energy-flow-tracker/energy-flow-tracker.png
social:
   cards: false
quality_score: 82
---

# Energy Flow Tracker

<iframe src="main.html" height="487" width="100%" scrolling="no"></iframe>

[Run the Energy Flow Tracker MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides an animated visualization of energy flowing through four trophic levels in a food chain -- from producers to primary, secondary, and tertiary consumers. At each level, the energy flow splits into three branches: respiration and heat loss (upward), waste and feces (downward), and transfer to the next trophic level (forward).

The animation makes the abstract concept of energy loss at each trophic level concrete and visible. Animated particles flow along the branching paths, and each organism box displays the energy entering, the energy lost to respiration and waste, and the transfer efficiency percentage. Students can see at a glance why top predators receive only a tiny fraction of the original solar energy input.

This simulation directly illustrates the second law of thermodynamics as it applies to ecosystems: energy is degraded at every transfer, with most converted to heat through metabolic processes. Understanding this principle is essential for explaining why food chains rarely exceed four or five trophic levels and why ecosystems require continuous energy input from the Sun.

## How to Use

1. **Adjust the solar energy slider** to set the initial energy input entering the producer level.
2. **Press Play** to start the animation and watch energy particles flow through the food chain from left to right.
3. **Observe the branching paths** -- red arrows show energy lost to respiration/heat, brown arrows show waste, and green arrows show energy transferred to the next level.
4. **Read the energy values** displayed on each trophic level box showing energy in, energy out, and efficiency.
5. **Press Pause** to freeze the animation and examine any stage in detail.
6. **Compare efficiency percentages** across levels to understand the cumulative energy loss.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/energy-flow-tracker/main.html"
        height="487px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
45 minutes

### Learning Objectives

1. Trace energy through a food chain, accounting for respiration, waste, and transfer at each trophic level.
2. Calculate the percentage of energy available at each successive trophic level.
3. Explain why food chains are limited to 4-5 trophic levels.

### Prerequisites

- Understanding of food chains and trophic levels
- Basic knowledge of photosynthesis and cellular respiration
- Familiarity with the concept of energy conservation

### Standards Alignment

- **NGSS HS-LS2-4**: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem.
- **NGSS HS-LS1-5**: Use a model to illustrate that cellular respiration is a chemical process whereby the bonds of food molecules and oxygen molecules are broken and new compounds are formed.

### Activities

1. **Engage** (5 min): Ask students: "If a field of grass captures 10,000 kcal of solar energy, how much energy is available to a hawk at the top of the food chain?" Have them guess before using the simulation.

2. **Explore** (15 min): Students set the solar energy slider to 10,000 kcal and record the energy values at each trophic level. They create a data table with columns for Trophic Level, Energy In, Respiration Loss, Waste Loss, Energy Transferred, and Efficiency %. They repeat with different starting values.

3. **Explain** (15 min): Discuss the 10% rule and why it is an approximation. Connect energy loss to the second law of thermodynamics. Explain why large carnivores are rare, why shorter food chains are more energy-efficient, and why vegetarian diets can support more people per acre.

4. **Extend** (10 min): Students calculate how many kilograms of grass are needed to support one kilogram of hawk biomass, working backward through the trophic levels. Discuss implications for conservation of apex predators.

### Assessment Questions

1. If producers capture 50,000 kcal of solar energy, approximately how much energy is available to tertiary consumers? Show your calculation.
2. Where does the "lost" energy at each trophic level actually go? Is it destroyed?
3. Why do most ecosystems have only 4-5 trophic levels rather than 10 or more?

## References

1. Lindeman, R. L. (1942). "The Trophic-Dynamic Aspect of Ecology." *Ecology*, 23(4), 399-417.
2. Odum, E. P. & Barrett, G. W. (2005). *Fundamentals of Ecology* (5th ed.). Thomson Brooks/Cole.
3. Chapin, F. S., Matson, P. A., & Mooney, H. A. (2011). *Principles of Terrestrial Ecosystem Ecology*. Springer.
