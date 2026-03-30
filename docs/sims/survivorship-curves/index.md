---
title: Survivorship Curve Explorer
description: Interactive graph comparing Type I, II, and III survivorship curves with real species data overlays and hover-to-reveal demographic details.
image: /sims/survivorship-curves/survivorship-curves.png
og:image: /sims/survivorship-curves/survivorship-curves.png
twitter:image: /sims/survivorship-curves/survivorship-curves.png
social:
   cards: false
quality_score: 82
---

# Survivorship Curve Explorer

<iframe src="main.html" height="452" width="100%" scrolling="no"></iframe>

[Run the Survivorship Curve Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays the three classic survivorship curve types on a semi-logarithmic graph, allowing students to visually compare how different life history strategies affect survival patterns across a lifespan. Type I curves (humans, elephants) show high survival through most of life followed by rapid mortality in old age. Type II curves (robins, songbirds) show a constant mortality rate throughout life. Type III curves (sea turtles, oysters, oak trees) show extremely high juvenile mortality with few survivors living to old age.

A species selector dropdown lets students choose specific organisms and see their data points overlaid on the corresponding curve type. This connection between abstract demographic curves and real organisms students recognize builds intuition about life history trade-offs -- why some species invest heavily in a few offspring while others produce thousands with minimal parental care.

Hovering over any point on a curve reveals the exact survival statistics at that point, expressed as both a percentage of the original cohort surviving and the percentage of maximum lifespan reached. This interactivity encourages students to make precise quantitative observations rather than just noting general curve shapes.

## How to Use

1. Observe the three survivorship curves displayed simultaneously: **Type I** (blue, concave), **Type II** (green, straight diagonal), and **Type III** (red, convex).
2. Note the **log scale** on the y-axis showing number of survivors from 1 to 1000.
3. Use the **Species** dropdown to select a real species (Human, Elephant, Robin, Songbird, Sea Turtle, Oyster, Oak Tree).
4. Observe which curve type the selected species matches and see its data points overlaid.
5. Hover over any point on a curve to see: "At X% of maximum lifespan, Y% of the population survives."
6. Compare species within the same curve type and across types to build understanding of life history strategies.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/survivorship-curves/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Ecology)

### Duration
45 minutes

### Learning Objectives

- Compare the three survivorship curve types and describe the mortality pattern each represents
- Match real species to the appropriate survivorship curve type based on their life history traits
- Explain the relationship between reproductive strategy and survivorship pattern
- Interpret semi-logarithmic survivorship graphs quantitatively

### Prerequisites

- Understanding of population concepts (birth rate, death rate, cohort)
- Basic familiarity with logarithmic scales
- Introduction to species reproductive strategies (r-selected vs. K-selected)

### Standards Alignment

- **NGSS HS-LS2-1**: Use mathematical and/or computational representations to support explanations of factors that affect carrying capacity
- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity
- **AP Environmental Science**: Topic 3.3 -- Survivorship Curves

### Activities

1. **Engage** (5 min): Ask students: If 1000 sea turtle eggs hatch, how many do you think survive to adulthood? What about 1000 human babies? Record guesses and revisit after the simulation.
2. **Explore** (15 min): Students cycle through each species in the dropdown, recording which curve type it matches and its maximum lifespan. They hover over each curve at 25%, 50%, and 75% of maximum lifespan to fill in a data table comparing survival rates across types.
3. **Explain** (15 min): Connect survivorship patterns to reproductive strategies. Type I organisms invest heavily in few offspring (K-selected traits). Type III organisms produce vast numbers with high juvenile mortality (r-selected traits). Discuss energy trade-offs: parental care vs. offspring quantity.
4. **Extend** (10 min): Students choose a species not in the simulation and predict which survivorship curve type it would follow, justifying their answer with evidence about its reproductive strategy, parental care, and typical causes of mortality.

### Assessment Questions

1. Describe the key difference in mortality patterns between Type I and Type III survivorship curves.
2. Why do sea turtles lay hundreds of eggs while elephants typically have one calf at a time? Explain using survivorship curve concepts.
3. A species has a constant 10% mortality rate per year regardless of age. Which survivorship curve type does it follow, and why does the log-scale graph show a straight line?
4. Predict the survivorship curve type for a species of salmon that dies shortly after spawning. Justify your prediction.
5. How would you expect human survivorship curves to differ between a developed and a developing country?

## References

1. Deevey, E.S. (1947). "Life Tables for Natural Populations of Animals." *The Quarterly Review of Biology*, 22(4), 283-314.
2. Molles, M.C. (2015). *Ecology: Concepts and Applications* (7th ed.). McGraw-Hill.
3. Pianka, E.R. (1970). "On r- and K-Selection." *The American Naturalist*, 104(940), 592-597.
