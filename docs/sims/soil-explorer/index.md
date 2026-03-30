---
title: Soil Horizons and Texture Explorer
description: Interactive p5.js MicroSim with split-screen soil profile horizons and texture triangle for classifying soil types.
image: /sims/soil-explorer/soil-explorer.png
og:image: /sims/soil-explorer/soil-explorer.png
twitter:image: /sims/soil-explorer/soil-explorer.png
social:
   cards: false
quality_score: 81
---

# Soil Horizons and Texture Explorer

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the Soil Horizons and Texture Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a split-screen interactive tool for exploring two related but distinct soil science concepts. The left panel displays a cross-section soil profile showing all five major horizons (O, A, B, C, and R) with realistic colors and textures. Hovering over each horizon reveals its description, typical depth, composition, and ecological role. Animated earthworms, roots, and fungi appear at appropriate depths.

The right panel features an interactive soil texture triangle. Three sliders for sand, silt, and clay percentages (constrained to sum to 100%) move a dot on the triangle, showing the current soil classification in real time. The classification name (sandy loam, silty clay, etc.) updates dynamically, along with descriptions of that soil type's drainage characteristics, nutrient retention capacity, and best agricultural uses.

By combining both concepts in one tool, students understand that soil structure (horizons) and composition (texture) work together to determine soil properties. This foundational knowledge is essential for understanding nutrient cycling, water filtration, plant ecology, and land management.

## How to Use

1. **Left panel**: Hover over each colored layer in the soil profile to see the horizon name, depth range, composition, and ecological role.
2. Observe the animated organisms (earthworms, roots, fungi) at their characteristic depths.
3. **Right panel**: Adjust the **Sand, Silt, and Clay sliders** to change the soil composition.
4. Watch the dot move on the texture triangle as you adjust the proportions.
5. Read the soil classification name and description that update in real time.
6. Try to find specific soil types: What slider combination gives you "loam"? What about "clay"?
7. Notice how the sliders are constrained to always sum to 100%.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/soil-explorer/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Classify soil types using the texture triangle and identify soil horizons in a profile diagram.
- Describe the composition and ecological role of each soil horizon (O, A, B, C, R).
- Explain how soil texture (sand, silt, clay proportions) affects drainage, nutrient retention, and plant growth.
- Connect soil properties to ecosystem services and agricultural productivity.

### Prerequisites

- Basic understanding of weathering and erosion processes
- Familiarity with the rock cycle
- Understanding that soil is a non-renewable resource on human timescales

### Standards Alignment

- **NGSS ESS2.A**: Earth's Materials and Systems
- **NGSS ESS3.A**: Natural Resources
- **AP Environmental Science**: Topic 4.2 - Soil Formation and Erosion; Topic 5.4 - Soil Composition

### Activities

1. **Engage** (5 min): Bring in (or show images of) three soil samples: sand, clay, and loam. Ask students to predict which would be best for growing crops and why. Introduce the simulation.

2. **Explore** (15 min): Students explore the soil profile, hovering over each horizon and recording its name, depth, and role in a data table. Then they move to the texture triangle and find slider combinations for at least five different soil classifications, recording the sand/silt/clay percentages and properties of each.

3. **Explain** (15 min): Discuss how soil forms through weathering, biological activity, and time. Explain why the O and A horizons are most ecologically important (organic matter, nutrients, organisms). Connect texture to practical outcomes: sandy soils drain fast but lose nutrients; clay soils hold water but can waterlog roots; loam is the agricultural ideal. Discuss why topsoil loss through erosion is such a serious environmental problem.

4. **Extend** (10 min): Students are given a scenario: "A farmer wants to grow tomatoes. The soil test shows 70% sand, 20% silt, 10% clay." They use the texture triangle to classify the soil, describe its properties, and recommend amendments. Then they explain which soil horizon the farmer should be most concerned about preserving.

### Assessment Questions

1. List the five soil horizons in order from surface to bedrock and describe the ecological importance of each.
2. A soil sample is 40% sand, 40% silt, and 20% clay. Use the texture triangle to classify this soil. Would it be good for agriculture? Why or why not?
3. Why is topsoil (A horizon) considered a non-renewable resource on human timescales?
4. How does soil texture affect water filtration and nutrient availability for plants?

## References

1. Brady, N.C. & Weil, R.R. (2016). *The Nature and Properties of Soils*, 15th ed. Pearson.
2. USDA Natural Resources Conservation Service: Soil Texture Calculator. [https://www.nrcs.usda.gov/](https://www.nrcs.usda.gov/)
3. Jenny, H. (1941). *Factors of Soil Formation*. McGraw-Hill.
