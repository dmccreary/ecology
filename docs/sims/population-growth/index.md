---
title: Population Growth Simulator
description: Interactive p5.js MicroSim modeling exponential and logistic population growth with adjustable parameters for initial population, growth rate, and carrying capacity.
image: /sims/population-growth/population-growth.png
og:image: /sims/population-growth/population-growth.png
twitter:image: /sims/population-growth/population-growth.png
social:
   cards: false
quality_score: 80
---

# Population Growth Simulator

<iframe src="main.html" height="512" width="100%" scrolling="no"></iframe>

[Run the Population Growth Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim allows students to explore two fundamental models of population growth: exponential growth and logistic growth. By adjusting parameters such as initial population size (N0), intrinsic growth rate (r), and carrying capacity (K), students can observe how populations change over time under different conditions.

The simulation plots population size against time, displaying the characteristic J-curve of exponential growth and the S-curve of logistic growth. When both models are shown simultaneously, students can directly compare how the introduction of carrying capacity transforms unlimited growth into a pattern that levels off. The inflection point at K/2 is marked on the logistic curve, highlighting where growth rate is at its maximum.

Real-time parameter manipulation builds intuition about how r and K interact to shape population trajectories. Watching the J-curve transform into an S-curve as carrying capacity is introduced creates a memorable understanding of why no population can grow without limits.

## How to Use

1. Use the **N0 slider** to set the initial population size (1-100 individuals).
2. Adjust the **growth rate (r) slider** to change how fast the population reproduces (0.01-1.0).
3. Set the **carrying capacity (K) slider** to define the environmental limit (100-10,000).
4. Toggle between **Exponential** and **Logistic** checkboxes to display one or both growth curves.
5. Press **Play** to start the simulation and watch the population change over time.
6. Use the **Speed slider** to control animation speed.
7. Press **Reset** to clear the graph and start over with new parameters.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/population-growth/main.html"
        height="512px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Model exponential and logistic population growth by adjusting parameters and observing resulting curves.
- Explain the relationship between growth rate (r), carrying capacity (K), and population size (N).
- Predict how changes in environmental conditions affect population growth patterns.
- Compare exponential and logistic growth models and identify when each applies.

### Prerequisites

- Basic understanding of population ecology vocabulary (population, growth rate, carrying capacity)
- Familiarity with interpreting line graphs
- Understanding of exponential functions from algebra

### Standards Alignment

- **NGSS LS2.A**: Interdependent Relationships in Ecosystems
- **NGSS LS2.C**: Ecosystem Dynamics, Functioning, and Resilience
- **AP Environmental Science**: Topic 3.2 - Population Growth and Resource Availability

### Activities

1. **Engage** (5 min): Ask students: "Can any population grow forever? Why or why not?" Discuss examples of populations that have exploded and then crashed (deer on Kaibab Plateau, invasive species). Introduce the simulation.

2. **Explore** (15 min): Students experiment with the exponential model first. They set different values of r and N0 and observe the J-curve. Then they enable the logistic model, add carrying capacity, and observe the S-curve. Students record observations about what happens when r is very high vs. very low, and when K changes.

3. **Explain** (15 min): Class discussion connecting observations to the equations dN/dt = rN (exponential) and dN/dt = rN(1 - N/K) (logistic). Students identify the inflection point at K/2 and explain why growth rate peaks there. Discuss real-world factors that determine carrying capacity.

4. **Extend** (10 min): Students predict what will happen to a population of 50 organisms with r=0.5 and K=500, then test their prediction. They explore scenarios: What if carrying capacity suddenly drops (habitat destruction)? What if growth rate increases (reduced predation)?

### Assessment Questions

1. Why does the logistic growth curve level off while the exponential curve does not?
2. A population of rabbits has r = 0.3 and K = 1000. At what population size is the growth rate fastest? Explain your reasoning.
3. Give two real-world examples of factors that would reduce a population's carrying capacity.
4. If you removed all predators from an ecosystem, would you expect the prey population to follow exponential or logistic growth? Explain.

## References

1. Gotelli, N.J. (2008). *A Primer of Ecology*, 4th ed. Sinauer Associates.
2. Molles, M.C. (2015). *Ecology: Concepts and Applications*, 7th ed. McGraw-Hill.
3. HHMI BioInteractive: Population Dynamics. [https://www.biointeractive.org/](https://www.biointeractive.org/)
