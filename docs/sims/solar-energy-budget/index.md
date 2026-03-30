---
title: Solar Energy Budget
description: Interactive Sankey diagram showing how solar energy flows from the sun through the atmosphere to producers, with adjustable cloud cover.
image: /sims/solar-energy-budget/solar-energy-budget.png
og:image: /sims/solar-energy-budget/solar-energy-budget.png
twitter:image: /sims/solar-energy-budget/solar-energy-budget.png
social:
   cards: false
quality_score: 78
---

# Solar Energy Budget

<iframe src="main.html" height="402" width="100%" scrolling="no"></iframe>

[Run the Solar Energy Budget MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim uses a Sankey-style flow diagram to visualize how 100 units of incoming solar radiation are partitioned as they travel from the sun to Earth's surface. Energy is lost at each step through reflection by the atmosphere, clouds, and surface, as well as absorption by atmospheric gases. Only about 1% of the original solar energy is ultimately captured by photosynthesis and enters the biological portion of the ecosystem.

The diagram makes these abstract energy quantities tangible by displaying proportionally-sized flow ribbons for each pathway. Students can hover over any branch to see the exact percentage and a brief explanation of that energy loss. A cloud cover slider lets students explore how changing cloud conditions affect the amount of energy reaching producers.

Understanding Earth's energy budget is foundational to ecology because it explains why ecosystems are energy-limited and why food chains rarely exceed four or five trophic levels. The tiny fraction captured by photosynthesis sets the upper bound on all biological productivity.

## How to Use

1. Observe the Sankey diagram showing solar energy flowing from left to right, starting with 100 units of incoming solar radiation.
2. Hover over any colored flow ribbon to see its exact percentage and explanation.
3. Adjust the **Cloud Cover** slider to see how increasing or decreasing cloud cover changes the energy reaching producers.
4. Notice how the green "Captured by Photosynthesis" ribbon is extremely thin compared to other losses.
5. Compare the relative sizes of different energy loss pathways to understand where most solar energy goes.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/solar-energy-budget/main.html"
        height="402px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Ecology)

### Duration
45 minutes

### Learning Objectives

- Trace the path of solar energy from the sun through the atmosphere to producers
- Explain why only a small fraction (~1%) of solar energy is captured by photosynthesis
- Analyze how cloud cover affects the energy budget and ecosystem productivity
- Connect Earth's energy budget to the concept of energy limitation in ecosystems

### Prerequisites

- Basic understanding of photosynthesis
- Familiarity with the concept of energy transfer
- Introduction to ecosystems and producers

### Standards Alignment

- **NGSS HS-LS2-4**: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem
- **NGSS HS-ESS2-2**: Analyze geoscience data to make the claim that one change to Earth's surface can create feedbacks that cause changes to other Earth systems
- **AP Environmental Science**: Topic 1.3 -- Energy Flow in Ecosystems

### Activities

1. **Engage** (5 min): Ask students to estimate what percentage of sunlight actually powers life on Earth. Record predictions on the board.
2. **Explore** (15 min): Students interact with the MicroSim, adjusting cloud cover and hovering over each branch. They record the percentage for each energy pathway in a data table.
3. **Explain** (15 min): Class discussion connecting the energy budget to ecosystem productivity. Why are there so few top predators? Why do food chains rarely exceed 4-5 levels? Relate to the 10% rule of energy transfer.
4. **Extend** (10 min): Students increase cloud cover to maximum and predict what would happen to an ecosystem if cloud cover permanently increased. Write a short paragraph connecting energy budget changes to ecosystem effects.

### Assessment Questions

1. If 1000 kJ of solar energy reaches Earth's atmosphere, approximately how much energy enters the food web through photosynthesis?
2. Explain two reasons why so little solar energy is captured by producers.
3. How would a significant increase in cloud cover affect primary productivity in an ecosystem?
4. Why does the energy budget help explain why there are more herbivores than carnivores in most ecosystems?

## References

1. Chapin, F.S., Matson, P.A., & Vitousek, P.M. (2011). *Principles of Terrestrial Ecosystem Ecology* (2nd ed.). Springer.
2. NASA Earth Observatory. "The Earth's Energy Budget." [https://earthobservatory.nasa.gov](https://earthobservatory.nasa.gov)
3. Odum, E.P. & Barrett, G.W. (2005). *Fundamentals of Ecology* (5th ed.). Thomson Brooks/Cole.
