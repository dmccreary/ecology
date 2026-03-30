---
title: Resource Partitioning in Warblers
description: Interactive p5.js MicroSim showing how five warbler species partition foraging zones on a conifer tree to reduce interspecific competition.
image: /sims/resource-partitioning/resource-partitioning.png
og:image: /sims/resource-partitioning/resource-partitioning.png
twitter:image: /sims/resource-partitioning/resource-partitioning.png
social:
   cards: false
quality_score: 80
---

# Resource Partitioning in Warblers

<iframe src="main.html" height="597" width="100%" scrolling="no"></iframe>

[Run the Resource Partitioning in Warblers MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim recreates Robert MacArthur's classic 1958 study of warbler resource partitioning -- one of the foundational observations in community ecology. A large conifer tree is displayed with five warbler species, each shown as a colored bird icon occupying a distinct foraging zone on the tree. Semi-transparent colored overlays highlight each species' preferred foraging area.

The five species -- Cape May Warbler (top crown), Blackburnian Warbler (upper interior), Bay-breasted Warbler (middle interior), Black-throated Green Warbler (mid-outer branches), and Myrtle Warbler (lower branches) -- animate within their respective zones. Hovering over any bird reveals a popup with species name, preferred height range, foraging behavior, and primary food sources.

The "Show Overlap" toggle reveals areas where foraging zones intersect, displayed as a competition intensity heat map. This visual overlay makes the abstract niche concept concrete and spatial, demonstrating how coexisting species minimize competition by partitioning shared resources along spatial dimensions.

## How to Use

1. Observe the five warbler species positioned in their respective foraging zones on the conifer tree.
2. **Hover over any bird** to see a popup with species name, foraging zone, behavior description, and primary food.
3. Note how each species occupies a different vertical zone on the tree, reducing direct competition.
4. Click the **Show Overlap** toggle to see where foraging zones overlap and the resulting competition intensity.
5. Compare the zones: Which species have the most overlap? Which are most separated?
6. Consider why five similar species can coexist on a single tree.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/resource-partitioning/main.html"
        height="597px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
40 minutes

### Learning Objectives

- Compare how different species partition resources within a shared habitat to reduce interspecific competition.
- Explain the competitive exclusion principle and how resource partitioning allows coexistence.
- Identify the niche dimensions (spatial, temporal, dietary) along which species can partition resources.
- Connect MacArthur's warbler study to broader ecological principles.

### Prerequisites

- Understanding of competition as an ecological interaction
- Basic vocabulary: niche, habitat, species, competition
- Familiarity with food webs and trophic relationships

### Standards Alignment

- **NGSS LS2.A**: Interdependent Relationships in Ecosystems
- **NGSS LS4.C**: Adaptation
- **AP Environmental Science**: Topic 2.4 - Species Interactions

### Activities

1. **Engage** (5 min): Pose the question: "If five bird species all eat insects from the same tree, why don't four of them go extinct from competition?" Discuss the competitive exclusion principle (Gause's Law) and how it seems to predict only one species should survive.

2. **Explore** (15 min): Students interact with the simulation, hovering over each warbler to learn its foraging zone and behavior. They create a data table listing each species, its zone on the tree, height range, and primary food. Students toggle the overlap view and identify which species pairs have the most competition.

3. **Explain** (10 min): Discuss MacArthur's original 1958 study and how it demonstrated that apparent competition can be resolved through niche differentiation. Explain the three dimensions of resource partitioning: spatial (where), temporal (when), and dietary (what). The warbler example primarily shows spatial partitioning.

4. **Extend** (10 min): Students brainstorm other examples of resource partitioning: African savanna grazers eating at different heights, marine organisms occupying different depths, insects active at different times of day. They draw a diagram of resource partitioning for a system of their choice.

### Assessment Questions

1. How do the five warbler species avoid competitive exclusion despite living on the same tree?
2. What would you predict would happen to the other warbler species if the Cape May Warbler went extinct? Explain using niche concepts.
3. Besides spatial partitioning, name two other ways species can partition resources. Give an example of each.
4. How does resource partitioning relate to biodiversity? Would you expect more or less partitioning in species-rich tropical forests compared to species-poor boreal forests?

## References

1. MacArthur, R.H. (1958). Population ecology of some warblers of northeastern coniferous forests. *Ecology*, 39(4), 599-619.
2. Hardin, G. (1960). The competitive exclusion principle. *Science*, 131(3409), 1292-1297.
3. Schoener, T.W. (1974). Resource partitioning in ecological communities. *Science*, 185(4145), 27-39.
