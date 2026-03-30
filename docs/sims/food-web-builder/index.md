---
title: Interactive Food Web Builder
description: Build a temperate forest food web by connecting organisms with feeding relationships, then test trophic cascades by removing species.
image: /sims/food-web-builder/food-web-builder.png
og:image: /sims/food-web-builder/food-web-builder.png
twitter:image: /sims/food-web-builder/food-web-builder.png
social:
   cards: false
quality_score: 78
---

# Interactive Food Web Builder

<iframe src="main.html" height="607" width="100%" scrolling="no"></iframe>

[Run the Interactive Food Web Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
Note: This is a vis-network simulation. Drag nodes to rearrange the web layout.

## About This MicroSim

This simulation lets you construct a temperate forest food web by clicking pairs of organisms to create feeding relationships (prey to predator). The network includes producers (oak tree, grass, berries), primary consumers (caterpillar, rabbit, mouse, deer), secondary consumers (frog, snake, fox), tertiary consumers (owl, hawk), and a decomposer (mushroom). Nodes are color-coded by trophic level: green for producers, blue for primary consumers, orange for secondary consumers, and red for tertiary consumers.

After building your web, use the "Check Web" button to validate your connections against known feeding relationships. The real power of this simulation emerges when you select and remove a species using the dropdown menu. When a species is removed, broken connections turn red, affected organisms flash, and population impact arrows appear showing which species would increase or decrease as a result of the trophic cascade.

This hands-on approach to food web construction helps students move beyond memorizing "who eats whom" to understanding the interconnected nature of ecosystems and predicting the consequences of species loss.

## How to Use

1. **Create feeding links** by clicking two organisms in sequence. The first click selects the prey, the second click selects the predator, and an arrow is drawn from prey to predator.
2. **Check your web** by clicking the "Check Web" button to see which connections are correct, incorrect, or missing.
3. **Remove a species** by selecting one from the "Remove Species" dropdown and clicking the "Remove Species" button.
4. **Observe the cascade** as broken edges turn red and affected species show population impact arrows (up or down).
5. **Reset** to try different removal scenarios and compare the cascading effects.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/food-web-builder/main.html"
        height="607px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / Biology)

### Duration

45 minutes

### Learning Objectives

- Construct a food web showing feeding relationships among organisms in a temperate forest ecosystem.
- Classify organisms by trophic level (producer, primary consumer, secondary consumer, tertiary consumer, decomposer).
- Predict the effects of removing a species on other populations in the food web (trophic cascade).
- Explain why biodiversity and interconnectedness contribute to ecosystem stability.

### Prerequisites

- Understanding of producers, consumers, and decomposers
- Familiarity with the concept of energy transfer between trophic levels
- Basic knowledge of temperate forest organisms

### Standards Alignment

- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity and populations in ecosystems.
- **NGSS HS-LS2-6**: Evaluate claims, evidence, and reasoning that the complex interactions in ecosystems maintain relatively consistent numbers and types of organisms.
- **AP Environmental Science**: Topic 2.5 - Food Webs and Trophic Levels

### Activities

1. **Warm-Up** (5 min): As a class, brainstorm organisms found in a temperate forest and discuss what they eat. Review the difference between food chains and food webs.

2. **Exploration** (15 min): Students open the simulation and build their own food web by connecting organisms with feeding links. Encourage students to think carefully about each connection before clicking. Use the "Check Web" button to see how accurate their web is.

3. **Guided Investigation** (15 min): Students select and remove three different species (one from each trophic level) one at a time. For each removal, they record which species are affected, whether populations increase or decrease, and explain the mechanism behind the cascade. Students compare results: does removing a producer versus a top predator cause a bigger cascade?

4. **Reflection and Discussion** (10 min): Class discussion: Which species removal caused the most disruption? Why? Introduce the concept of keystone species. Ask students to identify which organism in this web might be considered a keystone species based on their observations.

### Assessment Questions

1. If the fox population were eliminated from this ecosystem, predict what would happen to the rabbit and grass populations. Explain the chain of effects.
2. Why does removing a single species from a food web affect more organisms than removing a single link from a food chain?
3. A farmer introduces a pesticide that kills all caterpillars. Trace the effects through at least three other species in the web.
4. Explain why decomposers are essential to the food web even though they are not prey for other organisms.

## References

1. Paine, R. T. (1966). Food web complexity and species diversity. *The American Naturalist*, 100(910), 65-75.
2. Estes, J. A., et al. (2011). Trophic downgrading of planet Earth. *Science*, 333(6040), 301-306.
3. Campbell, N. A., & Reece, J. B. (2008). *Biology* (8th ed.). Pearson Education. Chapter 54: Community Ecology.
