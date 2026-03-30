---
title: Biomagnification Through a Food Web
description: Compare pollutant concentrations across trophic levels and see why top predators are most affected.
image: /sims/biomagnification-food-web/biomagnification-food-web.png
og:image: /sims/biomagnification-food-web/biomagnification-food-web.png
twitter:image: /sims/biomagnification-food-web/biomagnification-food-web.png
social:
   cards: false
quality_score: 81
---

# Biomagnification Through a Food Web

<iframe src="main.html" height="532" width="100%" scrolling="no"></iframe>

[Run the Biomagnification Through a Food Web MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive simulation demonstrates biomagnification -- the process by which pollutant concentrations increase at each successive trophic level in a food web. A four-level trophic pyramid displays representative organisms from producers through tertiary consumers, with colored concentration bars that update in real time as students adjust the initial water pollution level.

Students use a slider to set the initial pollutant concentration in water (0.001 to 0.1 ppm), and the visualization shows approximately 10x magnification at each trophic level. When concentrations exceed a danger threshold at higher trophic levels, organisms flash red to indicate toxic exposure. Hovering over organisms reveals exact concentration values.

This supports the Bloom's taxonomy level of **Analyze**, as students must compare concentrations across levels and explain the multiplicative pattern that makes top predators like eagles and orcas most vulnerable to persistent pollutants such as DDT, mercury, and PCBs.

## How to Use

1. **Adjust the concentration slider** at the bottom to set the initial pollutant level in water (0.001 to 0.1 ppm)
2. **Observe the concentration bars** next to each trophic level -- they show the relative toxin concentration using a yellow-to-red color gradient
3. **Watch for red flashing** at higher trophic levels when concentrations exceed the danger threshold of 5.0 ppm
4. **Read the trophic level labels**: Producers (phytoplankton, algae), Primary Consumers (zooplankton, snail), Secondary Consumers (bass, fox), Tertiary Consumers (eagle, orca)
5. **Hover over organisms** to see exact concentration values in ppm
6. **Notice the ~10x multiplication** at each level: if water has 0.01 ppm, producers have ~0.01, primary consumers ~0.1, secondary consumers ~1.0, and tertiary consumers ~10.0 ppm
7. **Experiment with low values** (0.001 ppm) to see how even tiny initial concentrations become dangerous at the top

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/biomagnification-food-web/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
15-20 minutes

### Learning Objectives
- Compare pollutant concentrations across trophic levels and explain why top predators are most affected
- Calculate the approximate magnification factor between adjacent trophic levels
- Predict when toxin concentrations will exceed danger thresholds based on initial water pollution levels
- Connect biomagnification to real-world examples like DDT in bald eagles and mercury in tuna
- Explain why persistent, fat-soluble pollutants are most subject to biomagnification

### Prerequisites
- Understanding of food webs and trophic levels
- Knowledge of the concepts of producer, consumer, and predator
- Basic understanding of what pollutants are
- Familiarity with parts per million (ppm) as a concentration unit

### Standards Alignment
- NGSS HS-LS2-4: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem
- AP Environmental Science Topic 8.5: Bioaccumulation and Biomagnification

### Activities

1. **Warm-Up** (3 min): Ask: "If a lake has a tiny amount of mercury -- just 0.01 ppm -- do you think it's safe to eat fish from that lake? Why or why not?" Record predictions.
2. **Guided Exploration** (5-7 min): Set the slider to 0.01 ppm. Walk through each trophic level together, noting the concentration. Ask: "What is the concentration at the tertiary consumer level? Is it safe?" Then show what happens at 0.05 ppm initial concentration.
3. **Independent Investigation** (5-7 min): Challenge students to find the threshold initial concentration where tertiary consumers first exceed the danger level. Then ask: "At what initial concentration do secondary consumers become endangered? Primary consumers?" Have them record their findings in a table.
4. **Reflection** (3-5 min): Connect to real-world cases: DDT and bald eagle eggshell thinning, mercury advisories for pregnant women eating tuna, PCBs in Great Lakes fish. Ask: "Why did banning DDT help eagle populations recover?"

### Assessment Questions

1. What is the approximate magnification factor for pollutant concentration between each trophic level in this simulation?
2. If the initial water concentration is 0.005 ppm, calculate the expected concentration at each trophic level. At which level does the concentration first exceed 1.0 ppm?
3. Why are persistent, fat-soluble chemicals (like DDT and mercury) more subject to biomagnification than water-soluble chemicals? What property of these molecules causes them to accumulate in tissues?
4. A factory releases a "safe" level of 0.02 ppm of a persistent chemical into a river. Using this simulation, argue whether this concentration is truly safe for the entire food web. What does this example teach about how we should set pollution standards?

## References

1. [Biomagnification - Wikipedia](https://en.wikipedia.org/wiki/Biomagnification) - Overview of biomagnification processes and notable historical examples
2. [EPA: Mercury and Fish Consumption](https://www.epa.gov/mercury/how-people-are-exposed-mercury) - Health advisories related to mercury biomagnification in aquatic food webs
3. [p5.js Reference](https://p5js.org/reference/) - JavaScript library used for the interactive simulation
