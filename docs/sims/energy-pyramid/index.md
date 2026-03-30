---
title: Energy Pyramid Simulator
description: Interactive p5.js pyramid visualization where students calculate energy available at each trophic level by adjusting producer input and transfer efficiency.
image: /sims/energy-pyramid/energy-pyramid.png
og:image: /sims/energy-pyramid/energy-pyramid.png
twitter:image: /sims/energy-pyramid/energy-pyramid.png
social:
   cards: false
quality_score: 81
---

# Energy Pyramid Simulator

<iframe src="main.html" height="452" width="100%" scrolling="no"></iframe>

[Run the Energy Pyramid Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays a classic ecological energy pyramid with 4-5 horizontal bars representing trophic levels, where bar widths are proportional to available energy. Two sliders let students control the producer energy input (1,000 to 100,000 kcal) and the transfer efficiency between levels (5% to 20%, defaulting to the standard 10%).

The pyramid redraws in real time as students manipulate the sliders, making it visually obvious how small changes in transfer efficiency have dramatic effects on the energy available to top predators. Each bar displays the trophic level name, energy in kilocalories, and the percentage of original energy remaining. A color gradient from green (producers) to red (top predators) reinforces the declining energy theme.

A dropdown toggle lets students switch between three pyramid views: energy (kcal), biomass (kg), and numbers of organisms. This comparison reveals that while energy always forms a classic upright pyramid, numbers pyramids can sometimes be inverted (as when a single tree supports many insects), deepening understanding of why ecologists prefer energy pyramids as the most consistent representation.

## How to Use

1. **Set the producer energy input** using the first slider to establish the base of the pyramid.
2. **Adjust the transfer efficiency** slider to see how changes from 5% to 20% affect energy at each level.
3. **Read the labels** on each bar to see the trophic level name, energy value, and percentage of original energy.
4. **Use the view toggle** to switch between energy, biomass, and numbers views.
5. **Compare extreme settings** -- try 5% efficiency vs. 20% efficiency and note how top predator energy changes dramatically.
6. **Note the calculation panel** on the side showing the math at each level.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/energy-pyramid/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
40 minutes

### Learning Objectives

1. Calculate energy available at each trophic level using the ten percent rule.
2. Explain how small changes in transfer efficiency dramatically affect top-predator energy.
3. Compare energy, biomass, and numbers pyramids and explain when each is most useful.

### Prerequisites

- Understanding of trophic levels and food chains
- Basic multiplication and percentage calculations
- Knowledge of producers and consumers

### Standards Alignment

- **NGSS HS-LS2-4**: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem.
- **NGSS HS-LS2-1**: Use mathematical and/or computational representations to support explanations of factors that affect carrying capacity.

### Activities

1. **Engage** (5 min): Present the question: "If a grassland produces 100,000 kcal of energy, how much is available for wolves?" Have students predict before using the simulation.

2. **Explore** (15 min): Students complete a calculation worksheet: (a) Set producer energy to 10,000 kcal and efficiency to 10%, record energy at each level. (b) Repeat with 5% and 20% efficiency. (c) Switch to biomass and numbers views and sketch what they see.

3. **Explain** (10 min): Discuss why the 10% rule is an approximation, what happens to the other 90% (respiration, waste, movement), and why this limits food chain length. Compare the three pyramid types and discuss when numbers pyramids can be inverted.

4. **Extend** (10 min): Students solve a real-world problem: "A nature reserve supports 5 wolves, each needing 3,000 kcal/day. Working backward through the pyramid, how much producer energy must the reserve generate daily?" They verify their calculation with the simulation.

### Assessment Questions

1. At 10% transfer efficiency with 50,000 kcal of producer energy, how much energy reaches the quaternary consumers? Show your work.
2. Why does doubling the transfer efficiency from 10% to 20% more than double the energy available to top predators?
3. Under what circumstances could a numbers pyramid be inverted while the energy pyramid remains upright?

## References

1. Lindeman, R. L. (1942). "The Trophic-Dynamic Aspect of Ecology." *Ecology*, 23(4), 399-417.
2. Odum, H. T. (1957). "Trophic Structure and Productivity of Silver Springs, Florida." *Ecological Monographs*, 27(1), 55-112.
3. Campbell, N. A. & Reece, J. B. (2008). *Biology* (8th ed.). Pearson Benjamin Cummings. Chapter 54.
