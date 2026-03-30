---
title: Pollutant Pathways Map
description: Interactive p5.js landscape cross-section where students trace how different pollutants move through environmental pathways from source to receptor.
image: /sims/pollutant-pathways-map/pollutant-pathways-map.png
og:image: /sims/pollutant-pathways-map/pollutant-pathways-map.png
twitter:image: /sims/pollutant-pathways-map/pollutant-pathways-map.png
social:
   cards: false
quality_score: 80
---

# Pollutant Pathways Map

<iframe src="main.html" height="492" width="100%" scrolling="no"></iframe>

[Run the Pollutant Pathways Map Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This simulation presents a stylized landscape cross-section featuring a factory, farmland, city, river, lake, and ocean. Students select a pollutant type from a dropdown menu -- fertilizer runoff, industrial discharge, sewage, thermal pollution, or pesticide -- and watch animated particles trace that pollutant's path through the landscape. Each pollutant type is color-coded and follows a different route based on its source and transport mechanism.

Along each pathway, information popups appear describing transformation processes such as bioaccumulation and chemical breakdown, affected organisms, and regulatory checkpoints including Clean Water Act permits and Superfund site designations. Toggle buttons let students show or hide point sources, nonpoint sources, treatment facilities, and wetland buffers, revealing how different infrastructure elements intercept or fail to intercept pollutants.

The spatial visualization reinforces systems thinking by revealing hidden connections between distant parts of the landscape. Students discover that a factory discharge upstream affects organisms in the lake downstream, and that nonpoint source pollution from farmland is harder to regulate than point source pollution from a factory. The simulation connects physical geography, chemistry, biology, and environmental policy in a single interactive view.

## How to Use

1. Select a pollutant type from the **dropdown menu**: Fertilizer Runoff, Industrial Discharge, Sewage, Thermal Pollution, or Pesticide.
2. Watch the animated particles trace the pollutant's path from source through the landscape to its final destination.
3. Read the **information popups** that appear along the pathway describing transformation processes and affected organisms.
4. Use the **toggle buttons** to show or hide: point sources, nonpoint sources, treatment facilities, and wetland buffers.
5. Compare pathways by switching between different pollutant types and noting which landscape features each passes through.
6. Notice which pollutants are intercepted by treatment facilities or wetland buffers and which pass through unimpeded.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/pollutant-pathways-map/main.html"
        height="492px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / AP Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Trace how different pollutants move through environmental pathways from source to receptor
- Distinguish between point source and nonpoint source pollution
- Evaluate the effectiveness of different mitigation strategies (treatment plants, wetland buffers) for different pollutant types

### Prerequisites

- Basic understanding of water flow in landscapes (rivers, lakes, groundwater)
- Introduction to types of pollutants and their sources
- Familiarity with the concepts of point source and nonpoint source pollution

### Standards Alignment

- NGSS HS-ESS3-4: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- AP Environmental Science: Topic 8.1 -- Sources of Pollution; Topic 8.3 -- Thermal Pollution; Topic 8.10 -- Pollution and Human Health

### Activities

1. **Landscape Orientation** (5 min): Before selecting any pollutant, have students identify all the features in the landscape: factory, farmland, city, river, lake, ocean. Discuss: How are these connected by water flow? Where might pollution enter the system?

2. **Pollutant Comparison** (15 min): Students work in pairs, each pair assigned two pollutant types. They trace both pollutants through the landscape and fill in a comparison table: source type (point vs. nonpoint), pathway through landscape, transformation processes, affected organisms, and regulatory mechanisms. Pairs share findings with the class.

3. **Mitigation Analysis** (15 min): Students toggle the treatment facilities and wetland buffers on and off for each pollutant type. They record which pollutants are effectively intercepted and which are not. Discuss: Why are nonpoint source pollutants harder to control than point source pollutants? What additional mitigation strategies might work?

4. **Policy Proposal** (10 min): Students draft a one-paragraph policy recommendation for reducing pollution in the watershed shown in the simulation. They must address at least one point source and one nonpoint source pollutant, citing specific mitigation strategies and the regulatory tools available (Clean Water Act permits, Superfund designation).

### Assessment Questions

1. Explain the difference between point source and nonpoint source pollution using two specific examples from the simulation.
2. Trace the pathway of pesticide from farmland to the ocean. At each stage, describe one transformation process that occurs and one organism that is affected.
3. A community wants to reduce pollution entering their lake. Using evidence from the simulation, compare the effectiveness of building a treatment plant versus restoring wetland buffers. Which approach addresses more pollutant types?

## References

1. Manahan, S.E. (2017). *Environmental Chemistry* (10th ed.). CRC Press.
2. EPA. "Summary of the Clean Water Act." United States Environmental Protection Agency. [https://www.epa.gov/laws-regulations/summary-clean-water-act](https://www.epa.gov/laws-regulations/summary-clean-water-act)
3. Carpenter, S.R., et al. (1998). Nonpoint pollution of surface waters with phosphorus and nitrogen. *Ecological Applications*, 8(3), 559-568.
