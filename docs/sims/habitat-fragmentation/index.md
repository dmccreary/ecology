---
title: Habitat Fragmentation Simulator
description: Convert habitat cells to developed land and observe how fragmentation reduces populations, creates edge effects, and isolates wildlife.
image: /sims/habitat-fragmentation/habitat-fragmentation.png
og:image: /sims/habitat-fragmentation/habitat-fragmentation.png
twitter:image: /sims/habitat-fragmentation/habitat-fragmentation.png
social:
   cards: false
quality_score: 83
---

# Habitat Fragmentation Simulator

<iframe src="main.html" height="577" width="100%" scrolling="no"></iframe>

[Run the Habitat Fragmentation Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This simulation presents a top-down view of a 40x40 landscape grid where green cells represent intact habitat and gray cells represent developed land. Orange dots represent individual organisms moving within the habitat. Students can click and drag to "develop" habitat cells, converting them from green to gray, and watch in real time as organisms respond to the shrinking and fragmenting habitat.

The simulation includes several visualization tools that deepen understanding. The "Show Edge Effects" toggle highlights habitat cells near developed edges in lighter green, revealing how much interior habitat is lost even when the total area looks large. The "Show Connectivity" toggle visualizes which habitat fragments remain connected, helping students see isolation patterns. A corridor tool lets students draw thin habitat strips between fragments to test whether wildlife corridors can restore connectivity and slow population decline.

Preset scenarios such as "Road through forest," "Suburban sprawl," and "Agricultural mosaic" demonstrate common real-world fragmentation patterns. A population graph tracks organisms over time, making the relationship between fragmentation and population decline visible and measurable.

## How to Use

1. **Observe the initial state** of continuous habitat with a healthy population of organisms moving freely.
2. **Click and drag** on the grid to develop habitat cells. Watch how organisms in affected areas respond.
3. **Try preset scenarios** using the dropdown to see common fragmentation patterns (road, sprawl, agriculture).
4. **Toggle "Show Edge Effects"** to see how habitat quality degrades near developed borders.
5. **Toggle "Show Connectivity"** to visualize which fragments are still connected to each other.
6. **Use the corridor tool** to draw narrow habitat strips connecting isolated fragments and observe whether populations recover.
7. **Adjust simulation speed** with the speed slider to observe long-term population trends.
8. **Reset** to restore the original continuous habitat and try different development patterns.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/habitat-fragmentation/main.html"
        height="577px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / Biology)

### Duration

50 minutes

### Learning Objectives

- Demonstrate how fragmentation reduces effective habitat area and isolates populations, leading to local extinctions.
- Explain the concept of edge effects and how they reduce interior habitat quality.
- Evaluate the effectiveness of wildlife corridors in maintaining population connectivity.
- Compare different development patterns and their relative impact on biodiversity.

### Prerequisites

- Understanding of habitat as the area where an organism lives and finds resources
- Basic knowledge of population ecology (carrying capacity, population decline)
- Familiarity with the concept of biodiversity

### Standards Alignment

- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity and populations in ecosystems.
- **NGSS HS-LS4-6**: Create or revise a simulation to test a solution to mitigate adverse impacts of human activity on biodiversity.
- **AP Environmental Science**: Topic 16.5 - Habitat Fragmentation; Topic 16.9 - Habitat Connectivity

### Activities

1. **Warm-Up** (5 min): Show students an aerial photo of a fragmented landscape. Ask: "If you were a small mammal, what problems would you face living here?" Collect responses on the board.

2. **Exploration** (15 min): Students start with continuous habitat and make their own development decisions by clicking cells. They record the population count at intervals as they progressively fragment the landscape. After reaching 50% development, they toggle edge effects and calculate how much "effective" interior habitat remains.

3. **Guided Investigation** (20 min): Students reset and try each preset scenario. For each, they record: total habitat remaining, number of fragments, largest fragment size, population after 100 time steps. They rank the three scenarios from least to most harmful and explain why. Then students use the corridor tool to connect the two largest fragments in the "Road through forest" scenario and observe whether population stabilizes.

4. **Synthesis and Discussion** (10 min): Class discussion: Is it better to have one large habitat patch or several small ones (the SLOSS debate)? How do wildlife corridors help, and what are their limitations? Students write a brief policy recommendation for a town planning board considering a new highway through a forested area.

### Assessment Questions

1. You develop 30% of a habitat grid as a single road. Your classmate develops 30% as scattered suburban plots. Which pattern causes more fragmentation and why? Use evidence from the simulation.
2. Explain how edge effects reduce the effective size of a habitat fragment even when total habitat area is the same.
3. A conservation group proposes building a wildlife corridor between two forest fragments. What factors would determine whether this corridor is effective?
4. Using the simulation data, explain why small isolated fragments lose populations faster than one continuous habitat of the same total area.

## References

1. Fahrig, L. (2003). Effects of habitat fragmentation on biodiversity. *Annual Review of Ecology, Evolution, and Systematics*, 34(1), 487-515.
2. Haddad, N. M., et al. (2015). Habitat fragmentation and its lasting impact on Earth's ecosystems. *Science Advances*, 1(2), e1500052.
3. Wilson, E. O. (2016). *Half-Earth: Our Planet's Fight for Life*. Liveright Publishing.
