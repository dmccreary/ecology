---
title: Invasive Species Impact Network
description: Introduce invasive species into a native food web and watch cascade effects ripple through the ecosystem over simulated time steps.
image: /sims/invasive-species/invasive-species.png
og:image: /sims/invasive-species/invasive-species.png
twitter:image: /sims/invasive-species/invasive-species.png
social:
   cards: false
quality_score: 81
---

# Invasive Species Impact Network

<iframe src="main.html" height="482" width="100%" scrolling="no"></iframe>

[Run the Invasive Species Impact Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This simulation displays a native ecosystem food web as a network of species icons connected by feeding relationships. All species start with healthy green population bars. When you click the "Introduce Invasive Species" button, a new species (shown with a red pulsing icon) enters the web and begins disrupting native populations. Over simulated time steps, the invasive species' prey populations shrink, their bars turning yellow then red. Secondary effects cascade outward: predators that depended on those prey also decline, while species released from herbivore pressure may grow unchecked.

A dropdown selector lets students choose between three invasive species scenarios -- Burmese Python, Zebra Mussel, and Kudzu -- each producing a different cascade pattern through the food web. The Burmese Python targets mammals, reducing prey for native predators. The Zebra Mussel filters plankton, collapsing aquatic food chains. Kudzu smothers native plants, disrupting the base of the web. A "Remove Invasive" button tests whether the ecosystem can recover after the invader is eliminated.

A timeline at the bottom tracks population changes over time, making it easy to identify which species are affected first, which are affected most severely, and how long the cascade takes to propagate through the entire web.

## How to Use

1. **Observe the healthy food web** with all species showing green population bars at equilibrium.
2. **Select an invasive species** from the dropdown menu (Burmese Python, Zebra Mussel, or Kudzu).
3. **Click "Introduce Invasive Species"** and watch the red pulsing icon enter the web.
4. **Observe the cascade** as prey populations decline (bars turn yellow, then red), predators starve (secondary effects), and released species grow.
5. **Watch the timeline** at the bottom to track how quickly effects spread through the web.
6. **Click "Remove Invasive"** to test whether the ecosystem recovers, and note which species bounce back and which do not.
7. **Compare scenarios** by trying all three invasive species and noting the different cascade patterns each produces.
8. **Reset** to restore the original ecosystem and try a different scenario.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/invasive-species/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / Biology)

### Duration

45 minutes

### Learning Objectives

- Assess how the introduction of an invasive species cascades through a native food web.
- Trace direct and indirect effects of invasive species on multiple trophic levels.
- Compare different types of invasive species (predator, filter feeder, plant) and their distinct cascade patterns.
- Evaluate whether ecosystem recovery is possible after invasive species removal.

### Prerequisites

- Understanding of food webs and trophic levels
- Basic knowledge of population dynamics (growth, decline, carrying capacity)
- Familiarity with the concept of invasive species

### Standards Alignment

- **NGSS HS-LS2-2**: Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity and populations in ecosystems.
- **NGSS HS-LS2-6**: Evaluate claims, evidence, and reasoning that the complex interactions in ecosystems maintain relatively consistent numbers and types of organisms.
- **AP Environmental Science**: Topic 5.7 - Invasive Species; Topic 2.5 - Food Webs

### Activities

1. **Warm-Up** (5 min): Show photos of three invasive species (Burmese python in the Everglades, zebra mussels on a Great Lakes pier, kudzu covering a forest). Ask students to predict how each might affect native species.

2. **Exploration** (10 min): Students introduce the Burmese Python and observe the cascade for at least 30 time steps. They record which species are affected first (direct prey), which are affected second (predators of prey), and any unexpected effects (species that increase). Students sketch the cascade pathway.

3. **Guided Investigation** (20 min): Students systematically test all three scenarios. For each, they create a table recording: species directly affected, species indirectly affected, time to first secondary effect, most severely impacted species, and whether the ecosystem recovers after removal. Students compare: Which invasive species caused the most widespread damage? Which cascade was fastest?

4. **Synthesis and Discussion** (10 min): Class discussion: Why is it often harder to remove an invasive species than to prevent its introduction? Use the "Remove Invasive" results to discuss ecosystem hysteresis (the system may not return to its original state). Connect to real-world examples: Why have Burmese pythons been so devastating to Everglades mammals?

### Assessment Questions

1. When the Burmese Python is introduced, rabbit and deer populations decline. Explain why fox and wolf populations also decline even though the python does not eat them.
2. Compare the cascade patterns of the three invasive species scenarios. Which affects the most trophic levels and why?
3. After removing the invasive species, some native populations recover but others do not. Explain why complete ecosystem recovery may be impossible even after the invader is removed.
4. A lake manager discovers zebra mussels in a local reservoir. Using evidence from this simulation, write a brief report explaining the potential cascade effects on the lake ecosystem.

## References

1. Simberloff, D. (2013). *Invasive Species: What Everyone Needs to Know*. Oxford University Press.
2. Dorcas, M. E., et al. (2012). Severe mammal declines coincide with proliferation of invasive Burmese pythons in Everglades National Park. *Proceedings of the National Academy of Sciences*, 109(7), 2418-2422.
3. Strayer, D. L. (2010). Alien species in fresh waters: ecological effects, interactions with other stressors, and prospects for the future. *Freshwater Biology*, 55, 152-174.
