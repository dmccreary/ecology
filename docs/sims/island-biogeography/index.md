---
title: Island Biogeography Simulator
description: Interactive p5.js simulation demonstrating how island size and distance from mainland affect species richness through immigration and extinction dynamics.
image: /sims/island-biogeography/island-biogeography.png
og:image: /sims/island-biogeography/island-biogeography.png
twitter:image: /sims/island-biogeography/island-biogeography.png
social:
   cards: false
quality_score: 82
---

# Island Biogeography Simulator

<iframe src="main.html" height="632" width="100%" scrolling="no"></iframe>

[Run the Island Biogeography Simulator Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This simulation brings MacArthur and Wilson's theory of island biogeography to life. Students manipulate two key variables -- island size and distance from the mainland -- and observe how these factors control species richness through the balance of immigration and extinction rates. Colored dots representing different species colonize the island via animated arcs from the mainland, while extinctions are shown as dots fading out.

A real-time graph plots species count over time, clearly showing the equilibrium point where immigration rate equals extinction rate. As students adjust the sliders, they can see this equilibrium shift: larger islands support more species (lower extinction rate), and closer islands receive more colonizers (higher immigration rate). The "Fast Forward" button lets students quickly reach equilibrium to compare parameter combinations.

This interactive approach lets students discover the species-area relationship and distance effect through experimentation rather than memorization, building intuition about a foundational concept in conservation biology and habitat fragmentation.

## How to Use

1. Observe the mainland on the left edge and the island in the center of the display.
2. Adjust the **Island Size** slider to make the island larger or smaller and observe how this affects extinction rate and equilibrium species count.
3. Adjust the **Distance from Mainland** slider to move the island closer or farther from the mainland, noting how immigration rate changes.
4. Watch the species graph in the corner to see the equilibrium point where immigration and extinction rates balance.
5. Click **Fast Forward** to quickly reach equilibrium for the current settings.
6. Use **Pause** to freeze the simulation and examine the current state.
7. Click **Reset** to clear all species and start a new colonization from scratch.
8. Compare: set a large near island versus a small far island and note the difference in equilibrium species counts.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/island-biogeography/main.html"
        height="632px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Biology / AP Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Predict how island size and distance from mainland affect species richness
- Explain the equilibrium theory of island biogeography using immigration and extinction rates
- Apply island biogeography principles to real-world conservation scenarios such as habitat fragmentation

### Prerequisites

- Understanding of species diversity and richness concepts
- Basic knowledge of immigration and extinction in ecological contexts
- Familiarity with reading line graphs over time

### Standards Alignment

- NGSS HS-LS2-2: Use mathematical representations to support explanations of factors affecting biodiversity
- AP Environmental Science: Topic 2.3 -- Biodiversity

### Activities

1. **Prediction Phase** (5 min): Before interacting with the simulation, students write predictions: "Which will have more species -- a large island close to the mainland or a small island far from the mainland? Why?" Collect predictions for later comparison.

2. **Guided Exploration** (15 min): As a class, systematically test four combinations: large-near, large-far, small-near, small-far. For each, record the equilibrium species count, immigration rate, and extinction rate. Students fill in a 2x2 data table.

3. **Independent Investigation** (15 min): Students explore intermediate slider positions to answer: "Is island size or distance more important for species richness?" They create graphs of equilibrium species count vs. each variable while holding the other constant.

4. **Real-World Application** (10 min): Discuss how island biogeography applies to habitat fragments on land. "How is a forest patch surrounded by farmland like an island?" Students brainstorm how this theory informs wildlife corridor design and nature reserve planning.

### Assessment Questions

1. Using the equilibrium model, explain why a large island close to the mainland has the highest species richness.
2. A nature reserve is being planned. Using island biogeography theory, would you recommend one large reserve or several small ones? Justify your answer.
3. How does the concept of immigration rate in island biogeography relate to wildlife corridors connecting fragmented habitats?

## References

1. MacArthur, R.H., & Wilson, E.O. (1967). *The Theory of Island Biogeography*. Princeton University Press.
2. Lomolino, M.V. (2000). A call for a new paradigm of island biogeography. *Global Ecology and Biogeography*, 9(1), 1-6.
3. Whittaker, R.J., & Fernandez-Palacios, J.M. (2007). *Island Biogeography: Ecology, Evolution, and Conservation*. Oxford University Press.
