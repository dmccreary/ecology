---
title: Tipping Points Explorer
description: Interactive stability landscape showing how increasing global temperature triggers successive climate tipping points with nonlinear system responses and hysteresis.
image: /sims/tipping-points/tipping-points.png
og:image: /sims/tipping-points/tipping-points.png
twitter:image: /sims/tipping-points/tipping-points.png
social:
   cards: false
quality_score: 85
---

# Tipping Points Explorer

<iframe src="main.html" height="512" width="100%" scrolling="no"></iframe>

[Run the Tipping Points Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim uses the ball-on-landscape metaphor to make abstract tipping point dynamics tangible. Earth's climate state is represented as a ball sitting in a valley on a stability landscape. As global temperature increases, the valley gradually becomes shallower, representing decreasing stability. At the tipping point, the valley disappears entirely and the ball rolls into a new, fundamentally different state.

Students control a temperature slider (0-5 degrees C warming above pre-industrial levels) and watch the stability landscape reshape in real time. A timeline of major tipping elements runs along the bottom, lighting up as their temperature thresholds are crossed: the Greenland Ice Sheet, Amazon Rainforest, West Antarctic Ice Sheet, coral reefs, and Arctic permafrost. Each element includes before-and-after descriptions showing the dramatic state changes that occur when thresholds are exceeded.

A critical feature is the "reverse" mode: when students pull the temperature back down, the system does not snap back to its original state. This demonstrates hysteresis -- the idea that some environmental changes are effectively irreversible on human timescales. This concept is central to understanding why preventing tipping points is far more practical than trying to reverse them.

## How to Use

1. Start with the temperature slider at 0 degrees C (pre-industrial baseline) and observe the ball resting stably in the valley.
2. Slowly increase the **Temperature** slider and watch the stability landscape reshape -- the valley becomes shallower.
3. Note when each **tipping element** along the bottom timeline lights up as its threshold is crossed.
4. Click on different tipping elements to see their individual stability landscapes and before/after ecosystem descriptions.
5. Try pulling the temperature back down to observe **hysteresis** -- the system does not return to its original state.
6. Press **Reset** to return to pre-industrial conditions and explore different tipping element pathways.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/tipping-points/main.html"
        height="512px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Climate Science)

### Duration
50 minutes

### Learning Objectives

- Predict how increasing global temperature activates successive tipping points
- Explain why the climate system response to warming is nonlinear
- Define hysteresis and explain why some climate changes are effectively irreversible
- Evaluate the consequences of crossing specific climate tipping points for ecosystems and human societies

### Prerequisites

- Basic understanding of climate change and greenhouse effect
- Familiarity with global temperature trends
- Introduction to feedback loops (positive and negative)

### Standards Alignment

- **NGSS HS-ESS3-5**: Analyze geoscience data and the results from global climate models to make an evidence-based forecast of the current rate of global or regional climate change
- **NGSS HS-ESS2-4**: Use a model to describe how variations in the flow of energy into and out of Earth's systems result in changes in climate
- **AP Environmental Science**: Topic 9.5 -- Global Climate Change

### Activities

1. **Engage** (5 min): Demonstrate the ball-on-landscape concept physically with a marble and a bowl. Tip the bowl slightly -- the marble returns. Tip it past a certain point -- the marble rolls away and does not come back. This is a tipping point.
2. **Explore** (15 min): Students slowly increase the temperature slider from 0 to 5 degrees C, recording which tipping elements activate at each threshold. They note the before/after state for each element. Then they attempt to reverse the changes by reducing temperature.
3. **Explain** (15 min): Discuss nonlinearity: Why don't ecosystems respond proportionally to temperature changes? Introduce positive feedback loops (ice-albedo feedback, permafrost carbon release). Explain hysteresis using the simulation as evidence. Discuss why the Paris Agreement targets 1.5 and 2.0 degrees C specifically.
4. **Extend** (15 min): Assign each student group a specific tipping element to research. What are the cascading effects if that element tips? How might tipping one element accelerate the tipping of others (cascading tipping points)? Groups present 2-minute summaries.

### Assessment Questions

1. Explain what a climate tipping point is using the ball-and-landscape metaphor from the simulation.
2. Why does pulling the temperature slider back down not restore the original ecosystem state? What is this phenomenon called?
3. At approximately what temperature threshold do coral reefs face irreversible decline? What percentage of marine species depend on coral reef ecosystems?
4. How could the melting of Arctic permafrost create a positive feedback loop that accelerates further warming?
5. Evaluate the argument: "We can always fix climate change later by reducing emissions." Use evidence from the simulation to support your response.

## References

1. Lenton, T.M. et al. (2019). "Climate tipping points -- too risky to bet against." *Nature*, 575, 592-595.
2. IPCC (2021). *Climate Change 2021: The Physical Science Basis*. Contribution of Working Group I to the Sixth Assessment Report.
3. Steffen, W. et al. (2018). "Trajectories of the Earth System in the Anthropocene." *Proceedings of the National Academy of Sciences*, 115(33), 8252-8259.
