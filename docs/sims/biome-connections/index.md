---
title: Biome Connections Network
description: Assess how material and energy flows connect different biomes across the planet using a network graph.
image: /sims/biome-connections/biome-connections.png
og:image: /sims/biome-connections/biome-connections.png
twitter:image: /sims/biome-connections/biome-connections.png
social:
   cards: false
quality_score: 81
---

# Biome Connections Network

<iframe src="main.html" height="600" width="100%" scrolling="no"></iframe>

[Run the Biome Connections Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive network graph reveals the often non-obvious connections between the world's major biomes through material and energy flows. Thirteen biome nodes (7 terrestrial and 6 aquatic) are connected by edges representing bird migration, water flow, nutrient transport, and atmospheric connections. The visualization uses a physics-based layout with color coding -- green for terrestrial biomes and blue for aquatic biomes.

Clicking any biome node highlights all its connections and displays details in a sidebar panel. The "Disrupt" feature simulates what happens when a selected biome is degraded, with connected biomes flashing yellow and showing impact descriptions. This systems-level view reinforces that no biome exists in isolation.

This supports the Bloom's taxonomy level of **Evaluate**, as students must assess the relative importance of different biome connections and predict cascading effects when one biome is disrupted. The visualization makes abstract systems thinking tangible by showing how disrupting one node propagates through the entire network.

## How to Use

1. **Click any biome node** to highlight its connections and see detailed information in the side panel
2. **Read the edge labels** to understand the type of connection between biomes (migration, water flow, nutrient transport, atmospheric)
3. **Select a biome from the dropdown** at the top and click **"Disrupt Biome"** to simulate what happens when that biome is degraded
4. **Observe the yellow flash** on connected biomes showing how disruption propagates through the network
5. **Read the impact descriptions** in the sidebar to understand the cascading consequences
6. **Click "Reset View"** to restore the original network state
7. **Notice the color coding**: green nodes are terrestrial biomes, blue nodes are aquatic biomes
8. **Drag nodes** to rearrange the layout and explore the network structure

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/biome-connections/main.html"
        height="600px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
15-20 minutes

### Learning Objectives
- Assess how material and energy flows connect different biomes across the planet
- Identify at least four types of connections between biomes (migration, water flow, nutrient transport, atmospheric)
- Predict cascading effects when one biome is disrupted
- Evaluate which biomes are most critical to global ecological stability based on their connectivity
- Explain why conservation requires a systems-level perspective

### Prerequisites
- Knowledge of the major terrestrial and aquatic biome types
- Understanding of food webs and energy flow
- Basic familiarity with migration and nutrient cycling
- Concept of ecosystems as interconnected systems

### Standards Alignment
- NGSS HS-LS2-2: Use mathematical representations to support and revise explanations of factors affecting biodiversity
- AP Environmental Science Topic 1.1: Introduction to Ecosystems

### Activities

1. **Warm-Up** (2-3 min): Ask students: "Can a forest fire in Siberia affect ocean life in the Pacific? How?" Accept all hypotheses and revisit after the exploration.
2. **Guided Exploration** (5-7 min): Click through 3-4 biomes as a class. For each, identify its connections and classify them by type. Ask: "Which biome has the most connections? What does that suggest about its ecological importance?"
3. **Independent Investigation** (5-7 min): Have students use the Disrupt feature on three different biomes and record the cascading impacts. Challenge: "Which biome disruption causes the most widespread damage? Which biome is most isolated?"
4. **Reflection** (3-5 min): Return to the warm-up question. Discuss: "Now that you see the connections, how does deforestation in one biome affect distant oceans? Why does this mean that environmental protection must be global?"

### Assessment Questions

1. Name four types of connections that link biomes to each other.
2. Click on a tropical rainforest node. What biomes is it connected to, and through what mechanisms? Why does this make tropical deforestation a global concern?
3. Compare the impact of disrupting a highly connected biome versus a relatively isolated one. What pattern do you observe? How does this inform conservation priorities?
4. A country argues that protecting its wetlands is unnecessary because wetlands are "just swamps." Using the network diagram, construct an argument for why wetland conservation benefits biomes beyond the country's borders.

## References

1. [Biome - Wikipedia](https://en.wikipedia.org/wiki/Biome) - Overview of the world's major terrestrial and aquatic biomes
2. [Ecosystem Connectivity - Wikipedia](https://en.wikipedia.org/wiki/Ecological_connectivity) - How material and energy flows connect ecosystems across landscapes
3. [vis.js Network Documentation](https://visjs.github.io/vis-network/docs/network/) - JavaScript library used for the interactive network graph
