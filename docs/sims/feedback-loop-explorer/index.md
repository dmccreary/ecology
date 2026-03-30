---
title: Feedback Loop Explorer
description: Interactive p5.js split-screen simulation comparing reinforcing and balancing feedback loops with animated causal diagrams and real-time graphs across ecological scenarios.
image: /sims/feedback-loop-explorer/feedback-loop-explorer.png
og:image: /sims/feedback-loop-explorer/feedback-loop-explorer.png
twitter:image: /sims/feedback-loop-explorer/feedback-loop-explorer.png
social:
   cards: false
quality_score: 82
---

# Feedback Loop Explorer

<iframe src="main.html" height="517" width="100%" scrolling="no"></iframe>

[Run the Feedback Loop Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents a side-by-side comparison of the two fundamental types of feedback loops in ecological systems: reinforcing (positive) loops and balancing (negative) loops. The left panel shows a reinforcing loop with animated circular arrows demonstrating amplification, while the right panel shows a balancing loop with animated flow demonstrating counteraction toward equilibrium.

Each panel includes a real-time graph: the reinforcing loop produces exponential growth curves, while the balancing loop produces damped oscillations converging to a set point. A dropdown menu lets students select from multiple ecological scenarios -- reinforcing loops include ice-albedo feedback, erosion cycles, and invasive species spread; balancing loops include predator-prey dynamics, thermoregulation, and nutrient cycling.

Understanding feedback loops is foundational to systems thinking in ecology. Reinforcing loops drive runaway change (algal blooms, population explosions, ice sheet collapse), while balancing loops maintain ecosystem stability (predator-prey regulation, nutrient recycling, climate regulation). Most real ecological systems contain both types interacting simultaneously, and the balance between them determines whether a system remains stable or tips into a new state.

## How to Use

1. **Observe the default scenario** -- both panels animate simultaneously, showing reinforcing (left, warm red/orange) and balancing (right, cool blue/green) loops.
2. **Watch the graphs** -- the reinforcing loop graph shows exponential growth while the balancing loop graph shows oscillation converging to equilibrium.
3. **Read the arrow labels** -- each arrow in the causal diagrams shows the relationship between variables with + or - signs.
4. **Use the dropdown** to switch between ecological scenarios and see how different systems exhibit the same loop types.
5. **Adjust the speed slider** to slow down or speed up the animation for closer observation.
6. **Note the "R" and "B" symbols** marking reinforcing and balancing loops per standard systems notation.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/feedback-loop-explorer/main.html"
        height="517px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Biology)

### Duration
45 minutes

### Learning Objectives

1. Differentiate between reinforcing and balancing feedback loops and predict their effects on system behavior.
2. Identify reinforcing and balancing loops in real ecological scenarios.
3. Explain how the interaction of both loop types determines ecosystem stability.

### Prerequisites

- Basic understanding of cause and effect in ecological systems
- Familiarity with population dynamics concepts
- Ability to read and interpret line graphs

### Standards Alignment

- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity and populations in ecosystems.
- **NGSS HS-ESS2-4**: Use a model to describe how variations in the flow of energy into and out of Earth's systems result in changes in climate.

### Activities

1. **Engage** (5 min): Ask students: "If you push a snowball down a hill, what happens? If you push a pendulum, what happens?" Use these as everyday metaphors for reinforcing (snowball gets bigger) and balancing (pendulum returns to center) feedback. Introduce the simulation.

2. **Explore** (15 min): Students examine all available scenarios in both panels. For each scenario, they draw the causal loop diagram on paper, label all arrows with + or -, and identify the loop type (R or B). They sketch the expected graph shape before looking at the simulation graph to test their prediction.

3. **Explain** (15 min): Class discussion on how reinforcing and balancing loops produce different system behaviors. Introduce vocabulary: positive feedback, negative feedback, equilibrium, exponential growth, oscillation. Discuss why "positive" and "negative" in feedback loops do not mean "good" and "bad." Explore how tipping points occur when reinforcing loops overpower balancing loops.

4. **Extend** (10 min): Students identify both a reinforcing and a balancing feedback loop in a real-world ecological issue of their choice (e.g., deforestation, ocean acidification, invasive species management) and draw labeled causal loop diagrams for each.

### Assessment Questions

1. What is the key difference between a reinforcing and a balancing feedback loop in terms of system behavior over time?
2. In the ice-albedo scenario, explain each step of the reinforcing loop and why it leads to accelerating warming.
3. A lake ecosystem has both a reinforcing loop (algal growth feeds more algal growth through nutrient release from dead algae) and a balancing loop (zooplankton eat algae, controlling their population). What would happen if the zooplankton were removed?

## References

1. Meadows, D. H. (2008). *Thinking in Systems: A Primer*. Chelsea Green Publishing.
2. Sterman, J. D. (2000). *Business Dynamics: Systems Thinking and Modeling for a Complex World*. McGraw-Hill.
3. Ford, A. (2010). *Modeling the Environment* (2nd ed.). Island Press.
