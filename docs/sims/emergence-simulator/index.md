---
title: Emergence Simulator
description: Interactive p5.js flocking simulation demonstrating how complex system-level patterns emerge from simple individual rules using the boids algorithm.
image: /sims/emergence-simulator/emergence-simulator.png
og:image: /sims/emergence-simulator/emergence-simulator.png
twitter:image: /sims/emergence-simulator/emergence-simulator.png
social:
   cards: false
quality_score: 78
---

# Emergence Simulator

<iframe src="main.html" height="517" width="100%" scrolling="no"></iframe>

[Run the Emergence Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates the concept of **emergence** -- the phenomenon where complex, organized patterns arise from simple rules followed by individual agents. Using the classic boids flocking algorithm, the simulation shows how three basic behaviors (separation, alignment, and cohesion) can produce the beautiful, coordinated flocking patterns seen in bird murmurations and fish schools.

Each agent in the simulation follows only its nearest neighbors and has no awareness of the flock as a whole. Yet when dozens of agents interact simultaneously, coherent group behavior "emerges" without any central control. The agents are colored by their heading direction using the HSB color wheel, so flocks display flowing color patterns that make group alignment visually obvious.

This concept is central to ecology because ecosystems themselves are emergent systems -- the stability of a food web, the spatial patterns in a forest, and the cycling of nutrients all emerge from the interactions of individual organisms following simple behavioral rules.

## How to Use

1. **Observe the default state** -- when the simulation loads, agents move with moderate separation, alignment, and cohesion values, producing loose flocking behavior.
2. **Set all sliders to zero** -- watch how agents move randomly with no coordination.
3. **Increase the Separation slider** -- agents avoid crowding but do not flock together.
4. **Increase the Alignment slider** -- agents begin to steer in similar directions, forming streams.
5. **Increase the Cohesion slider** -- agents pull toward group centers, forming tight clusters.
6. **Combine all three rules** -- observe how realistic flocking emerges from the interaction of these simple rules.
7. **Click Reset** to randomize agent positions and start fresh.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/emergence-simulator/main.html"
        height="517px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
45 minutes

### Learning Objectives

1. Explain how complex system-level patterns emerge from simple individual rules.
2. Identify the three boid rules (separation, alignment, cohesion) and describe each one's effect.
3. Connect the concept of emergence to real ecological systems such as flocking, schooling, and ecosystem self-organization.

### Prerequisites

- Basic understanding of ecosystems and organism interactions
- Familiarity with the idea that organisms respond to local environmental cues

### Standards Alignment

- **NGSS HS-LS2-6**: Evaluate claims about the effects of group behavior on individual and species' chances to survive and reproduce.
- **NGSS HS-ESS3-6**: Use a computational representation to illustrate relationships among Earth systems.

### Activities

1. **Engage** (5 min): Ask students: "How do thousands of starlings fly in a murmuration without a leader?" Show a short video of bird murmuration. Introduce the idea that no single bird is in charge.

2. **Explore** (15 min): Students open the simulation and systematically test each slider independently, recording observations in a table with columns for Separation, Alignment, Cohesion, and Observed Behavior. They should test at least 5 different slider combinations.

3. **Explain** (15 min): Class discussion connecting observations to the concept of emergence. Introduce vocabulary: emergence, self-organization, agent-based model. Ask students to identify other ecological examples of emergence (ant colonies, coral reef formation, nutrient cycling).

4. **Extend** (10 min): Students write a paragraph explaining how one real ecological system (e.g., ant foraging trails, fish schooling for predator avoidance) demonstrates emergence, using evidence from their simulation exploration.

### Assessment Questions

1. Why does flocking behavior appear even though no single agent knows about the overall flock pattern?
2. What happens when you remove the cohesion rule but keep alignment high? How does this relate to real animal groups?
3. Give an example of emergence in an ecosystem that does not involve animal movement.

## References

1. Reynolds, C. W. (1987). "Flocks, Herds, and Schools: A Distributed Behavioral Model." *Computer Graphics*, 21(4), 25-34.
2. Camazine, S. et al. (2001). *Self-Organization in Biological Systems*. Princeton University Press.
3. Levin, S. A. (1998). "Ecosystems and the Biosphere as Complex Adaptive Systems." *Ecosystems*, 1(5), 431-436.
