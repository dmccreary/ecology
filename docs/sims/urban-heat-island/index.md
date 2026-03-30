---
title: Urban Heat Island Profile
description: Interactive cross-section visualization showing how urban land cover creates temperature differences, with tools to add trees, green roofs, and reflective surfaces.
image: /sims/urban-heat-island/urban-heat-island.png
og:image: /sims/urban-heat-island/urban-heat-island.png
twitter:image: /sims/urban-heat-island/urban-heat-island.png
social:
   cards: false
quality_score: 81
---

# Urban Heat Island Profile

<iframe src="main.html" height="442" width="100%" scrolling="no"></iframe>

[Run the Urban Heat Island Profile MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents an interactive cross-section of a landscape transitioning from rural areas through suburbs to an urban core and back again. The bottom layer shows land cover types -- green vegetation, gray impervious surfaces, and blue water features -- while buildings of varying heights rise from the urban zones. A red temperature curve overlaid on the landscape reveals the classic urban heat island profile, with temperatures peaking over the dense urban core and dipping over parks and vegetated areas.

The key interactive feature allows students to click on locations to add trees, green roofs, or reflective surfaces and watch the temperature curve respond in real time. This cause-and-effect interaction directly connects mitigation strategies to measurable temperature outcomes, building understanding of why urban planning decisions matter for environmental health.

A time-of-day slider reveals how the heat island effect changes from day to night. During the day, impervious surfaces absorb solar radiation. At night, they release stored heat, keeping urban areas warmer than surrounding rural areas. This day-night comparison is essential for understanding why urban heat islands affect nighttime cooling and human health, particularly during heat waves.

## How to Use

1. Observe the cross-section landscape showing the transition from rural (left) through suburban to urban core (center) and back to rural (right).
2. Note the **red temperature curve** showing higher temperatures over the urban core and lower temperatures over vegetated areas.
3. Click on locations in the landscape to **add or remove trees**, green roofs, or reflective surfaces, and watch the temperature curve update.
4. Adjust the **Time of Day** slider to see how the heat island effect varies between day and night.
5. Compare temperature differences between vegetated parks and adjacent impervious surfaces.
6. Experiment with adding green infrastructure to the urban core and measure the temperature reduction.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/urban-heat-island/main.html"
        height="442px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science)

### Duration
50 minutes

### Learning Objectives

- Analyze how urban land cover types drive temperature differences between cities and surrounding areas
- Explain the mechanisms behind the urban heat island effect (albedo, thermal mass, evapotranspiration)
- Evaluate the effectiveness of different mitigation strategies (trees, green roofs, reflective surfaces)
- Compare daytime and nighttime heat island dynamics

### Prerequisites

- Understanding of basic energy concepts (absorption, reflection, radiation)
- Familiarity with land use types (urban, suburban, rural)
- Introduction to albedo and surface properties

### Standards Alignment

- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- **NGSS HS-ESS2-4**: Use a model to describe how variations in the flow of energy into and out of Earth's systems result in changes in climate
- **AP Environmental Science**: Topic 5.11 -- Urban Land Use and Sprawl

### Activities

1. **Engage** (5 min): Show a thermal satellite image of a city. Ask: Why are some parts of the city much hotter than others? What do the hottest areas have in common? Introduce the term "urban heat island."
2. **Explore** (15 min): Students record baseline temperatures at five locations across the profile (rural, suburban, park, urban core, suburban). Then they systematically add trees to the urban core and record new temperatures. Repeat with green roofs and reflective surfaces. Create a data table comparing the temperature reduction from each strategy.
3. **Explain** (15 min): Discuss three mechanisms: (a) Albedo -- dark surfaces absorb more heat than light surfaces. (b) Evapotranspiration -- plants cool the air by releasing water vapor. (c) Thermal mass -- concrete and asphalt store heat and release it at night. Use the time-of-day slider to demonstrate nighttime heat retention.
4. **Extend** (15 min): Students design an urban heat island mitigation plan for their own community. Given a limited budget, which strategies would they prioritize? Justify choices using data from the simulation. Consider equity: Which neighborhoods are most affected by heat islands?

### Assessment Questions

1. Explain three mechanisms that cause urban areas to be warmer than surrounding rural areas.
2. Using data from the simulation, which mitigation strategy produced the greatest temperature reduction in the urban core?
3. Why is the urban heat island effect often stronger at night than during the day?
4. A city is planning to reduce its heat island effect by 2 degrees C. Design a combination of strategies that could achieve this goal, using evidence from the simulation.
5. How does the urban heat island effect disproportionately affect low-income neighborhoods, and what environmental justice implications does this raise?

## References

1. Oke, T.R. (1982). "The Energetic Basis of the Urban Heat Island." *Quarterly Journal of the Royal Meteorological Society*, 108(455), 1-24.
2. EPA. "Heat Island Effect." [https://www.epa.gov/heatislands](https://www.epa.gov/heatislands)
3. Santamouris, M. (2014). "Cooling the Cities -- A Review of Reflective and Green Roof Mitigation Technologies." *Solar Energy*, 103, 682-703.
