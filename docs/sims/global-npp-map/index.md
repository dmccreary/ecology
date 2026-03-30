---
title: Global NPP Heatmap
description: Compare net primary productivity across biomes using an interactive heatmap with per-square-meter and total contribution views.
image: /sims/global-npp-map/global-npp-map.png
og:image: /sims/global-npp-map/global-npp-map.png
twitter:image: /sims/global-npp-map/global-npp-map.png
social:
   cards: false
quality_score: 80
---

# Global NPP Heatmap

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Global NPP Heatmap MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This simulation visualizes net primary productivity (NPP) across Earth's major biomes using a color-coded heatmap. Each biome is displayed with colors ranging from brown (low productivity, such as deserts and tundra) through yellow (moderate, such as grasslands) to dark green (high, such as tropical rainforests and coral reefs). Hovering over any biome reveals its name, NPP value in grams of carbon per square meter per year, and the key limiting factors that constrain productivity in that region.

A toggle switches between two views: "per square meter" shows the intrinsic productivity of each biome type, while "total contribution" multiplies NPP by the biome's total area to reveal the outsized contribution of the open ocean. Despite its low per-area productivity, the ocean's enormous extent makes it the single largest contributor to global primary productivity.

This visualization helps students move beyond memorizing NPP values to understanding the ecological reasoning behind productivity patterns. By comparing biomes side-by-side, students can hypothesize about how temperature, water availability, sunlight, and nutrient supply interact as limiting factors.

## How to Use

1. **Observe the heatmap** to see which biomes have the highest and lowest NPP values per square meter.
2. **Hover over each biome** to view its name, NPP value (g C/m2/yr), and the limiting factors that constrain its productivity.
3. **Toggle the "Show Total Contribution" checkbox** to switch between per-square-meter productivity and total global contribution (area x NPP).
4. **Compare the two views** to discover why the open ocean contributes more total productivity than tropical rainforests despite having much lower per-area NPP.
5. **Identify patterns** relating temperature, precipitation, and nutrient availability to productivity across different biomes.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/global-npp-map/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / Biology)

### Duration

40 minutes

### Learning Objectives

- Compare net primary productivity across different biomes and explain why some regions are more productive than others.
- Identify the limiting factors (light, water, nutrients, temperature) that constrain productivity in each biome.
- Distinguish between per-area productivity and total global contribution of biomes.
- Explain why the open ocean is the largest total contributor to global NPP despite low per-area productivity.

### Prerequisites

- Understanding of photosynthesis as the basis of primary productivity
- Basic knowledge of Earth's major biomes
- Familiarity with the concept of limiting factors

### Standards Alignment

- **NGSS HS-LS2-4**: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem.
- **AP Environmental Science**: Topic 3.2 - Net Primary Productivity; Topic 2.2 - Biomes

### Activities

1. **Warm-Up** (5 min): Ask students to rank five biomes (tropical rainforest, desert, open ocean, tundra, temperate forest) from highest to lowest productivity. Record predictions.

2. **Exploration** (10 min): Students explore the heatmap in per-square-meter mode. They record the NPP value and limiting factors for each biome, noting which biomes are most and least productive and why.

3. **Guided Investigation** (15 min): Students toggle to the total contribution view. They answer: Which biome contributes most to global NPP? Why is this surprising? Students calculate the ratio of ocean total contribution to rainforest total contribution and explain the role of area. Students identify three biomes where different limiting factors dominate.

4. **Synthesis and Discussion** (10 min): Class discussion on how climate change might shift NPP patterns. What happens to ocean productivity if temperatures rise? How might desertification reduce global NPP? Students write a paragraph explaining why per-area NPP alone is insufficient for understanding a biome's global importance.

### Assessment Questions

1. Explain why tropical rainforests have the highest per-area NPP. What combination of factors makes them so productive?
2. A student claims the ocean is unimportant for global productivity because its per-area NPP is low. Evaluate this claim using evidence from the simulation.
3. If global temperatures rise by 3 degrees C, predict how NPP might change in tundra and desert biomes. Explain your reasoning.
4. Why do estuaries have higher NPP than the open ocean despite both being aquatic ecosystems?

## References

1. Field, C. B., et al. (1998). Primary production of the biosphere: Integrating terrestrial and oceanic components. *Science*, 281(5374), 237-240.
2. Chapin, F. S., Matson, P. A., & Vitousek, P. M. (2011). *Principles of Terrestrial Ecosystem Ecology* (2nd ed.). Springer.
3. Schlesinger, W. H., & Bernhardt, E. S. (2013). *Biogeochemistry: An Analysis of Global Change* (3rd ed.). Academic Press.
