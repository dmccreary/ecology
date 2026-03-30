---
title: Ocean Zones Interactive
description: Interactive p5.js vertical cross-section of the ocean from surface to 6000m, showing physical conditions and representative organisms at each depth zone.
image: /sims/ocean-zones/ocean-zones.png
og:image: /sims/ocean-zones/ocean-zones.png
twitter:image: /sims/ocean-zones/ocean-zones.png
social:
   cards: false
quality_score: 79
---

# Ocean Zones Interactive

<iframe src="main.html" height="697" width="100%" scrolling="no"></iframe>

[Run the Ocean Zones Interactive Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization presents a vertical cross-section of the ocean from the surface (0 m) down to the deep ocean (6,000 m). A background color gradient shifts from light blue at the surface to complete black in the abyssal zone, giving students an intuitive sense of how light diminishes with depth. Ocean zones are labeled and separated by dashed lines, with a draggable depth indicator that students can move up and down through the water column.

As the depth indicator moves, a sidebar updates in real time with the current zone name, depth range, temperature, pressure, light level, and two to three representative organisms shown with small icons. A light intensity meter displays photosynthetically available radiation declining to zero, reinforcing the concept that photosynthesis is limited to the upper ocean. This helps students grasp the enormous scale of ocean depth and the dramatic gradient of physical conditions.

The visualization makes abstract depth measurements concrete by placing familiar organisms at their correct depths and connecting physical conditions (light, temperature, pressure) to the biological communities found in each zone. Students develop an understanding of why different organisms are adapted to specific ocean layers.

## How to Use

1. Observe the full ocean cross-section with its color gradient from light blue (surface) to black (deep ocean).
2. Drag the **depth indicator** downward through the water column to explore each zone.
3. Read the sidebar information that updates as you move through zones: zone name, depth range, temperature, pressure, and light level.
4. Note the representative organisms displayed for each zone and consider their adaptations.
5. Watch the **light intensity meter** decline as you descend, reaching zero in the aphotic zones.
6. Compare conditions between zones by moving the depth indicator back and forth between them.
7. Use the depth slider below the visualization for precise control over your position in the water column.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/ocean-zones/main.html"
        height="697px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Biology / Environmental Science)

### Duration

35 minutes

### Learning Objectives

- Describe the physical conditions (light, temperature, pressure) of each ocean zone
- Identify representative organisms found at different ocean depths
- Explain how physical gradients determine the distribution of marine life

### Prerequisites

- Basic understanding of marine ecosystems
- Familiarity with how light, temperature, and pressure change with depth (conceptual level)
- Introduction to organism adaptations

### Standards Alignment

- NGSS HS-LS4-5: Evaluate the evidence supporting claims that changes in environmental conditions may result in changes to an ecosystem
- AP Environmental Science: Topic 1.2 -- Terrestrial and Aquatic Biomes

### Activities

1. **Quick Sketch** (5 min): Before using the simulation, students sketch what they think the ocean looks like at 100 m, 1,000 m, and 5,000 m depth. Include temperature, light level, and one organism they think lives there. Save for later comparison.

2. **Guided Zone Tour** (10 min): As a class, slowly descend through all five zones. At each zone boundary, pause and record zone name, depth range, temperature, pressure, light level, and representative organisms in a data table. Discuss what changes most dramatically at each transition.

3. **Adaptation Analysis** (10 min): Students work in pairs. Each pair is assigned one zone and must explain: Why can the organisms in this zone survive here but not in other zones? What specific adaptations do they need for the temperature, pressure, and light conditions? Share findings with the class.

4. **Gradient Graphing** (10 min): Students create three graphs: temperature vs. depth, light vs. depth, and pressure vs. depth using data from the simulation. Discuss: Which variable changes linearly? Which changes exponentially? Where is the sharpest gradient?

### Assessment Questions

1. Explain why photosynthesis can only occur in the epipelagic zone and describe the consequences for food webs in deeper zones.
2. A deep-sea fish is brought to the surface. Using the pressure data from the simulation, explain what would happen to the organism and why.
3. Compare the mesopelagic and bathypelagic zones. What physical factor changes most dramatically between them, and how does this affect the organisms found in each?

## References

1. Garrison, T.S., & Ellis, R. (2016). *Oceanography: An Invitation to Marine Science* (9th ed.). Cengage Learning.
2. Ramirez-Llodra, E., et al. (2010). Deep, diverse and definitely different: Unique attributes of the world's largest ecosystem. *Biogeosciences*, 7, 2851-2899.
3. NOAA. "Ocean Zones." National Ocean Service. [https://oceanservice.noaa.gov/](https://oceanservice.noaa.gov/)
