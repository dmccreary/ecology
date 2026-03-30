---
title: Eutrophication Cascade
description: Interactive p5.js simulation where students adjust nitrogen and phosphorus inputs and observe cascading effects from algal bloom to dead zone formation in a lake ecosystem.
image: /sims/eutrophication-cascade/eutrophication-cascade.png
og:image: /sims/eutrophication-cascade/eutrophication-cascade.png
twitter:image: /sims/eutrophication-cascade/eutrophication-cascade.png
social:
   cards: false
quality_score: 84
---

# Eutrophication Cascade

<iframe src="main.html" height="492" width="100%" scrolling="no"></iframe>

[Run the Eutrophication Cascade MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim simulates the process of eutrophication -- the ecological cascade that occurs when excess nutrients enter a body of water. Students control nitrogen and phosphorus input levels using sliders and observe the step-by-step consequences: algal bloom formation, oxygen depletion, fish die-off, and dead zone creation.

The simulation displays a cross-section of a lake with animated visual elements: green particles represent algae density on the surface, the water color gradient shifts from healthy blue to oxygen-depleted gray/brown, fish icons flee from or perish in low-oxygen zones, and tiny decomposer bacteria dots accumulate on the bottom consuming dead organic matter. A real-time line chart tracks dissolved oxygen levels over time, providing quantitative data alongside the visual representation.

Eutrophication is one of the most widespread water quality problems worldwide, driven by agricultural runoff, sewage discharge, and urban stormwater. This simulation helps students understand that a seemingly simple input (excess nutrients) triggers a cascade of interconnected consequences -- a classic example of how linear thinking fails in ecological systems where feedback loops amplify initial changes.

## How to Use

1. **Start with low nutrient levels** -- observe the healthy lake with blue water, active fish, and high dissolved oxygen.
2. **Gradually increase the nitrogen slider** and watch algae particles begin to accumulate on the surface.
3. **Increase the phosphorus slider** to see how the combination of nutrients accelerates algal growth.
4. **Watch the cascade unfold** -- algae block light, die, and decompose, consuming dissolved oxygen.
5. **Monitor the oxygen chart** below the lake to track dissolved oxygen dropping toward the dead zone threshold.
6. **Observe fish behavior** -- they flee low-oxygen areas and eventually die if oxygen drops too low.
7. **Return sliders to zero** and observe whether the system recovers, and how quickly.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/eutrophication-cascade/main.html"
        height="492px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
45 minutes

### Learning Objectives

1. Trace the step-by-step cascade from nutrient input to dead zone formation.
2. Identify nitrogen and phosphorus as the primary nutrients driving eutrophication.
3. Explain the role of decomposer bacteria in oxygen depletion.
4. Connect eutrophication to real-world sources such as agricultural runoff.

### Prerequisites

- Understanding of nutrient cycles (nitrogen and phosphorus)
- Basic knowledge of dissolved oxygen and aquatic life requirements
- Familiarity with algae and decomposition

### Standards Alignment

- **NGSS HS-LS2-6**: Evaluate claims, evidence, and reasoning that the complex interactions in ecosystems maintain relatively consistent numbers and types of organisms.
- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems.
- **NGSS HS-ESS3-6**: Use a computational representation to illustrate relationships among Earth systems.

### Activities

1. **Engage** (5 min): Show a satellite image of an algal bloom (Lake Erie or Gulf of Mexico dead zone). Ask students: "What caused this, and why does it kill fish?" Collect hypotheses.

2. **Explore** (15 min): Students systematically test the simulation: (a) Set both nutrients to 0 and record baseline dissolved oxygen. (b) Increase only nitrogen to 50%, then 100%, and record oxygen at each. (c) Reset and repeat with only phosphorus. (d) Set both to 75% and observe the combined effect. Record all observations in a data table.

3. **Explain** (15 min): Walk through the eutrophication cascade step by step: nutrient input causes algal bloom, algae die and sink, decomposer bacteria consume dead algae and use up dissolved oxygen, creating hypoxic conditions (dead zones). Discuss which nutrient is typically the "limiting factor" in freshwater (phosphorus) vs. marine (nitrogen) systems.

4. **Extend** (10 min): Students research the Gulf of Mexico dead zone and write a paragraph explaining how Mississippi River agricultural runoff creates conditions identical to what they observed in the simulation. They propose one management solution and explain how it would interrupt the cascade.

### Assessment Questions

1. List the steps of the eutrophication cascade in order, starting from nutrient input and ending with dead zone formation.
2. Why does reducing nutrient input not immediately restore dissolved oxygen levels?
3. A farmer upstream uses heavy fertilizer on crops near a river that feeds into a lake. Explain the connection between the fertilizer and fish kills in the lake.

## References

1. Smith, V. H. & Schindler, D. W. (2009). "Eutrophication science: where do we go from here?" *Trends in Ecology & Evolution*, 24(4), 201-207.
2. Diaz, R. J. & Rosenberg, R. (2008). "Spreading Dead Zones and Consequences for Marine Ecosystems." *Science*, 321(5891), 926-929.
3. EPA (2023). "Nutrient Pollution: The Problem." https://www.epa.gov/nutrientpollution
