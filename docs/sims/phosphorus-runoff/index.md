---
title: Phosphorus Runoff and Eutrophication
description: Interactive p5.js simulation showing how fertilizer application rates drive phosphorus runoff, algal blooms, oxygen depletion, and fish kills in a connected farm-to-lake system.
image: /sims/phosphorus-runoff/phosphorus-runoff.png
og:image: /sims/phosphorus-runoff/phosphorus-runoff.png
twitter:image: /sims/phosphorus-runoff/phosphorus-runoff.png
social:
   cards: false
quality_score: 84
---

# Phosphorus Runoff and Eutrophication

<iframe src="main.html" height="482" width="100%" scrolling="no"></iframe>

[Run the Phosphorus Runoff Simulation Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This cause-and-effect simulation lets students manipulate fertilizer application on farmland and observe the downstream cascade of eutrophication in real time. The left side shows farmland with an adjustable fertilizer application slider (low to excessive). When rain is triggered, orange phosphorus particles wash off the field into a stream flowing to a lake on the right side. As phosphorus accumulates, algae blooms on the lake surface, an oxygen meter drops as decomposers consume the dead algae, and fish begin turning belly-up when dissolved oxygen falls below a critical threshold.

A timeline graph at the bottom tracks three variables simultaneously: phosphorus input, algae density, and dissolved oxygen over simulated weeks. This reveals the delayed cause-and-effect chain -- phosphorus input leads to algal growth, which leads to oxygen depletion -- helping students understand why eutrophication is a time-lagged process. The "Add Buffer Strip" button places riparian vegetation along the stream bank that intercepts some phosphorus before it reaches the lake, demonstrating a real-world mitigation strategy.

The simulation builds predictive reasoning by letting students experiment with different fertilizer levels and observe how the system responds. Students learn that the relationship between fertilizer input and ecological damage is not linear -- there are tipping points beyond which the lake ecosystem collapses rapidly.

## How to Use

1. Set the **Fertilizer Application** slider to a level (low, medium, high, or excessive).
2. Click **Rain** to trigger precipitation and watch phosphorus particles (orange dots) wash off the field into the stream.
3. Observe the lake on the right: algae (green) grows on the surface as phosphorus enters.
4. Watch the **oxygen meter** on the side decline as decomposers consume dead algae.
5. Note when fish at the bottom begin turning belly-up, indicating a fish kill from oxygen depletion.
6. Monitor the **timeline graph** at the bottom to see the delayed relationship between phosphorus input, algae density, and dissolved oxygen.
7. Click **Add Buffer Strip** to place vegetation along the stream bank and observe how it reduces phosphorus reaching the lake.
8. Compare runs with different fertilizer levels and with or without the buffer strip.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/phosphorus-runoff/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / AP Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Predict the downstream effects of excess phosphorus input on aquatic ecosystems
- Explain the eutrophication cascade from nutrient loading through algal bloom to hypoxia
- Evaluate the effectiveness of buffer strips as a mitigation strategy for agricultural runoff

### Prerequisites

- Understanding of the phosphorus cycle basics
- Familiarity with concepts of producers, consumers, and decomposers in aquatic ecosystems
- Introduction to water quality and dissolved oxygen

### Standards Alignment

- NGSS HS-ESS3-4: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- AP Environmental Science: Topic 8.4 -- Eutrophication; Topic 1.5 -- Biogeochemical Cycles (Phosphorus)

### Activities

1. **Prediction Phase** (5 min): Show students a picture of a lake with an algal bloom. Ask: "What caused this? What do you think is happening under the surface?" Record predictions and revisit after the simulation.

2. **Controlled Experiment** (15 min): Students run four trials with increasing fertilizer levels (low, medium, high, excessive), each time triggering rain and recording: weeks until algal bloom appears, peak algae density, minimum dissolved oxygen level, and whether fish died. They organize results in a data table and identify the tipping point where the ecosystem collapses.

3. **Mitigation Testing** (10 min): Students repeat the excessive fertilizer trial but add the buffer strip first. They compare results to the same trial without the buffer and calculate what percentage of phosphorus was intercepted. Discuss: Is the buffer strip alone sufficient at the highest fertilizer levels?

4. **Case Study Connection** (15 min): Present the Lake Erie algal bloom crisis or the Gulf of Mexico dead zone. Students use their simulation data to explain the real-world mechanism. They write a policy recommendation addressing both source reduction (fertilizer management) and mitigation (buffer strips, wetlands) strategies.

### Assessment Questions

1. Explain the step-by-step mechanism by which excess phosphorus leads to fish kills, including the role of algae and decomposers.
2. Using your simulation data, at what fertilizer application level does the lake ecosystem reach a tipping point? What evidence supports your answer?
3. A city proposes building a new housing development next to a lake. Drawing on this simulation, recommend three measures to prevent eutrophication of the lake.

## References

1. Carpenter, S.R. (2008). Phosphorus control is critical to mitigating eutrophication. *Proceedings of the National Academy of Sciences*, 105(32), 11039-11040.
2. Schindler, D.W., et al. (2008). Eutrophication of lakes cannot be controlled by reducing nitrogen input. *Proceedings of the National Academy of Sciences*, 105(32), 11254-11258.
3. Mayer, P.M., et al. (2007). Meta-analysis of nitrogen removal in riparian buffers. *Journal of Environmental Quality*, 36(4), 1172-1180.
