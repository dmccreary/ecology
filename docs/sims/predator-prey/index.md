---
title: Predator-Prey Population Dynamics
description: Interactive p5.js MicroSim modeling Lotka-Volterra predator-prey oscillations with an animated meadow and real-time population graphs.
image: /sims/predator-prey/predator-prey.png
og:image: /sims/predator-prey/predator-prey.png
twitter:image: /sims/predator-prey/predator-prey.png
social:
   cards: false
quality_score: 82
---

# Predator-Prey Population Dynamics

<iframe src="main.html" height="697" width="100%" scrolling="no"></iframe>

[Run the Predator-Prey Population Dynamics MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim brings the classic Lotka-Volterra predator-prey relationship to life through an agent-based simulation. The top panel displays an animated meadow where green dots (prey/hares) and red dots (predators/lynx) move and interact. When a predator contacts a prey item, the prey is consumed. Prey reproduce at a set rate, while predators die if they fail to feed within a time window.

The bottom panel plots real-time population curves for both species, producing the characteristic oscillating waves seen in natural predator-prey systems. Students can adjust prey birth rate, predation efficiency, and predator death rate to observe how parameter changes affect the amplitude, frequency, and stability of population cycles.

Special scenario buttons allow students to introduce sudden disturbances -- a disease event that halves the prey population, or complete predator removal -- to observe cascading effects on population dynamics. These scenarios mirror real ecological events and help students understand why maintaining predator populations is critical for ecosystem stability.

## How to Use

1. Observe the animated meadow where green dots (prey) and red dots (predators) move and interact.
2. Watch the population graph below as it traces prey and predator numbers over time.
3. Adjust the **Prey Birth Rate** slider to change how quickly prey reproduce.
4. Adjust the **Predation Efficiency** slider to change how effectively predators catch prey.
5. Adjust the **Predator Death Rate** slider to change how quickly unfed predators die.
6. Click **Add Disease** to instantly reduce prey by 50% and observe the cascading effect.
7. Click **Remove Predators** to see what happens when predators are eliminated.
8. Click **Reset** to return to starting conditions (200 prey, 20 predators).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/predator-prey/main.html"
        height="697px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Model predator-prey oscillations and predict how changing parameters affects population dynamics.
- Analyze the feedback loops that create cyclical population patterns.
- Predict the consequences of removing predators or introducing disease to an ecosystem.
- Connect simulation behavior to real-world examples such as the lynx-hare cycle.

### Prerequisites

- Basic understanding of food webs and trophic levels
- Familiarity with population growth concepts
- Ability to interpret line graphs with multiple variables

### Standards Alignment

- **NGSS LS2.A**: Interdependent Relationships in Ecosystems
- **NGSS LS2.C**: Ecosystem Dynamics, Functioning, and Resilience
- **AP Environmental Science**: Topic 3.3 - Carrying Capacity

### Activities

1. **Engage** (5 min): Show the classic Hudson Bay Company fur trading records for lynx and snowshoe hare pelts. Ask students what pattern they notice and what might cause it. Introduce the simulation as a way to test their hypotheses.

2. **Explore** (15 min): Students run the simulation with default parameters and sketch the population curves. They record what happens when they increase prey birth rate, increase predation efficiency, or increase predator death rate. Students document at least three parameter combinations and their results.

3. **Explain** (15 min): Discuss the feedback loops: more prey leads to more predators, which leads to fewer prey, which leads to fewer predators. Students use the "Remove Predators" button to observe trophic cascades. Connect to real examples: wolf reintroduction in Yellowstone, sea otter-urchin-kelp relationships.

4. **Extend** (10 min): Students use the "Add Disease" button and predict what will happen before pressing it. They write a paragraph explaining why predator removal does not lead to permanently high prey populations, using evidence from the simulation.

### Assessment Questions

1. Explain why predator and prey populations oscillate rather than reaching a stable equilibrium.
2. What happened when you removed all predators? Why did the prey population eventually crash even without predators?
3. If a disease reduced the prey population by 50%, predict what would happen to the predator population over the next several generations.
4. How does this simulation relate to the reintroduction of wolves to Yellowstone National Park?

## References

1. Lotka, A.J. (1925). *Elements of Physical Biology*. Williams & Wilkins.
2. Elton, C. & Nicholson, M. (1942). The ten-year cycle in numbers of the lynx in Canada. *Journal of Animal Ecology*, 11(2), 215-244.
3. Ripple, W.J. & Beschta, R.L. (2012). Trophic cascades in Yellowstone. *Biological Conservation*, 145(1), 205-213.
