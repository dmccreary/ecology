---
title: Solar Radiation and Albedo Simulator
description: Interactive p5.js MicroSim demonstrating how surface albedo affects energy absorption, temperature, and climate feedback loops.
image: /sims/solar-albedo/solar-albedo.png
og:image: /sims/solar-albedo/solar-albedo.png
twitter:image: /sims/solar-albedo/solar-albedo.png
social:
   cards: false
quality_score: 79
---

# Solar Radiation and Albedo Simulator

<iframe src="main.html" height="472" width="100%" scrolling="no"></iframe>

[Run the Solar Radiation and Albedo Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim makes the concept of albedo -- the fraction of incoming solar radiation reflected by a surface -- tangible and visual. Students select different surface types (fresh snow, sea ice, ocean, forest, desert, city) and watch as incoming yellow solar arrows strike the surface and are reflected or absorbed in proportion to the albedo value.

High-albedo surfaces like fresh snow (0.85) reflect most incoming radiation, keeping the surface cool, while low-albedo surfaces like ocean (0.06) absorb almost all radiation, warming significantly. A temperature gauge and numerical energy budget display incoming, reflected, and absorbed radiation in real time. The surface appearance changes to match the selected type, and a red glow indicates absorbed energy.

The "Climate Feedback" toggle reveals the ice-albedo feedback loop -- one of the most important positive feedback mechanisms in climate science. As ice melts, it exposes darker ocean, which absorbs more energy, causing more warming, which melts more ice. This animated cycle diagram connects surface-level physics to global climate dynamics.

## How to Use

1. Select a **surface type** from the dropdown: Fresh Snow, Sea Ice, Ocean, Forest, Desert, or City.
2. Observe the yellow incoming arrows and white reflected arrows -- more reflection means higher albedo.
3. Watch the **temperature gauge** rise or fall based on net absorbed energy.
4. Read the **energy budget display**: incoming radiation, reflected radiation, absorbed radiation, and albedo value.
5. Compare surfaces: Which absorbs the most? Which reflects the most?
6. Toggle the **Climate Feedback** checkbox to see the ice-albedo positive feedback loop animation.
7. Switch between ice and ocean surfaces to understand how melting ice accelerates warming.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/solar-albedo/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
40 minutes

### Learning Objectives

- Calculate the net energy absorbed by different surfaces and predict how albedo changes affect local temperature.
- Explain the relationship between surface albedo and energy balance.
- Describe the ice-albedo positive feedback loop and its role in climate change.
- Predict how land-use changes (deforestation, urbanization) affect local and global energy budgets.

### Prerequisites

- Basic understanding of solar radiation and the electromagnetic spectrum
- Familiarity with the concept of energy transfer (absorption and reflection)
- Understanding of the greenhouse effect at an introductory level

### Standards Alignment

- **NGSS ESS2.D**: Weather and Climate
- **NGSS ESS3.D**: Global Climate Change
- **AP Environmental Science**: Topic 9.2 - Global Climate Change; Topic 9.4 - The Greenhouse Effect

### Activities

1. **Engage** (5 min): Ask students: "Why do you wear light-colored clothing on a hot day?" Connect personal experience to the scientific concept of albedo. Ask what would happen if all the ice in the Arctic melted -- would it affect global temperature?

2. **Explore** (15 min): Students cycle through all six surface types and record the albedo value, absorbed radiation, and resulting temperature for each. They rank the surfaces from highest to lowest albedo and create a bar chart. Students toggle the feedback loop and describe what they observe.

3. **Explain** (10 min): Discuss Earth's average albedo (approximately 0.30) and the energy budget. Explain the ice-albedo feedback: warming melts ice, exposing dark ocean, which absorbs more heat, causing more warming. This is a positive feedback loop that amplifies climate change. Discuss the urban heat island effect as another albedo-related phenomenon (cities have lower albedo than surrounding vegetation).

4. **Extend** (10 min): Students calculate: If Arctic ice cover decreases from 7 million km2 to 4 million km2, and the albedo changes from 0.60 (ice) to 0.06 (ocean), how much additional energy is absorbed? Students discuss the implications for global climate and local ecosystems that depend on ice (polar bears, seals, Arctic marine food webs).

### Assessment Questions

1. Rank the following surfaces from highest to lowest albedo: forest, fresh snow, ocean, desert. Explain how albedo affects the temperature of each surface.
2. Explain the ice-albedo feedback loop in your own words. Why is it called a "positive" feedback even though its effects may be harmful?
3. A developer wants to replace a forest (albedo 0.15) with a parking lot (albedo 0.10). How would this change affect local temperature? What about if they used white concrete (albedo 0.55) instead?
4. How does the concept of albedo help explain why climate change is accelerating in Arctic regions faster than elsewhere on Earth?

## References

1. Trenberth, K.E. et al. (2009). Earth's global energy budget. *Bulletin of the American Meteorological Society*, 90(3), 311-324.
2. Pistone, K. et al. (2014). Observational determination of albedo decrease caused by vanishing Arctic sea ice. *PNAS*, 111(9), 3322-3326.
3. NASA Earth Observatory: Arctic Sea Ice. [https://earthobservatory.nasa.gov/](https://earthobservatory.nasa.gov/)
