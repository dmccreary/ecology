---
title: Resilience Ball-in-Basin Model
description: Interactive p5.js MicroSim demonstrating ecosystem resilience and regime shifts using the ball-in-basin metaphor with adjustable disturbance and resilience.
image: /sims/resilience-basin/resilience-basin.png
og:image: /sims/resilience-basin/resilience-basin.png
twitter:image: /sims/resilience-basin/resilience-basin.png
social:
   cards: false
quality_score: 83
---

# Resilience Ball-in-Basin Model

<iframe src="main.html" height="402" width="100%" scrolling="no"></iframe>

[Run the Resilience Ball-in-Basin Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim uses the ball-in-basin metaphor to make the abstract concept of ecosystem resilience and regime shifts physically intuitive. A ball representing the current ecosystem state sits in a landscape of two basins: a green "Healthy Forest" basin and a brown "Degraded Grassland" basin, separated by a ridge that represents the tipping point threshold.

Students apply disturbances by adjusting the disturbance slider, which pushes the ball toward the threshold. Small disturbances cause the ball to rock but return to its stable state. A sufficiently large disturbance pushes the ball over the ridge into the degraded state -- a regime shift that is difficult to reverse. The resilience slider controls the depth of the healthy basin: a deeper basin means the ecosystem can absorb larger disturbances before shifting.

The "Slow Degradation" button demonstrates how gradual environmental changes (pollution, habitat loss, climate change) can erode resilience over time, making the system increasingly vulnerable until even a small disturbance triggers a catastrophic shift. This demonstrates why preventing gradual degradation is just as important as avoiding sudden shocks.

## How to Use

1. Observe the ball sitting in the green "Healthy Forest" basin.
2. Adjust the **Disturbance slider** to push the ball toward the threshold -- small values cause it to rock and return, large values push it over.
3. Adjust the **Resilience slider** to change the depth of the healthy basin -- deeper basins resist larger disturbances.
4. Click the **Slow Degradation** button to watch resilience gradually erode until the system tips.
5. Observe the real-time labels showing current state, resilience level, and distance to threshold.
6. Experiment with combinations: What happens with high resilience and high disturbance? Low resilience and small disturbance?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/resilience-basin/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Predict when a system will undergo a regime shift based on disturbance magnitude and resilience.
- Explain the ball-in-basin metaphor for ecosystem stability and tipping points.
- Analyze how gradual environmental degradation can make systems vulnerable to sudden collapse.
- Connect the resilience model to real-world examples of ecosystem regime shifts.

### Prerequisites

- Understanding of ecosystem stability and disturbance concepts
- Basic understanding of feedback loops (positive and negative)
- Familiarity with examples of ecosystem change (deforestation, coral bleaching)

### Standards Alignment

- **NGSS LS2.C**: Ecosystem Dynamics, Functioning, and Resilience
- **NGSS ESS3.C**: Human Impacts on Earth Systems
- **AP Environmental Science**: Topic 2.8 - Ecological Tolerance; Topic 9.10 - Sustainability

### Activities

1. **Engage** (5 min): Show before/after images of ecosystem regime shifts: clear lake to algae-choked lake, coral reef to algae-covered rubble, forest to grassland. Ask: "What caused these changes? Can they be reversed?" Introduce the concept of tipping points.

2. **Explore** (15 min): Students experiment with the simulation, finding the minimum disturbance needed to cause a regime shift at different resilience levels. They create a data table: resilience level vs. disturbance threshold. Then they use the Slow Degradation button and record what happens to the threshold over time.

3. **Explain** (15 min): Discuss resilience theory: stable states, basins of attraction, thresholds, and hysteresis (why it is harder to restore an ecosystem than to degrade it). Connect the ball-in-basin model to specific examples: Lake Erie eutrophication, Caribbean coral reef collapse, Sahel desertification. Explain why the degraded state is also stable (positive feedback loops maintain it).

4. **Extend** (10 min): Students choose a real ecosystem and draw their own ball-in-basin diagram, labeling the stable states, threshold, and specific factors that affect resilience. They write a management recommendation explaining how to keep the system in the healthy basin.

### Assessment Questions

1. In the ball-in-basin model, what does the depth of a basin represent? What does the ridge between basins represent?
2. Explain why gradual environmental degradation can be more dangerous than a single large disturbance.
3. Give a real-world example of a regime shift in an ecosystem. What was the "ball," what were the two "basins," and what pushed the system over the threshold?
4. Why is it often harder to restore a degraded ecosystem than it was to degrade it? Use the model to explain.

## References

1. Walker, B. & Salt, D. (2006). *Resilience Thinking: Sustaining Ecosystems and People in a Changing World*. Island Press.
2. Scheffer, M. et al. (2001). Catastrophic shifts in ecosystems. *Nature*, 413, 591-596.
3. Folke, C. et al. (2004). Regime shifts, resilience, and biodiversity in ecosystem management. *Annual Review of Ecology, Evolution, and Systematics*, 35, 557-581.
