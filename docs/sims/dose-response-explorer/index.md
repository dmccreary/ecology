---
title: Interactive Dose-Response Curve Explorer
description: Interactive p5.js MicroSim for exploring dose-response curves, LD50 values, threshold effects, and toxicological principles with multiple substances.
image: /sims/dose-response-explorer/dose-response-explorer.png
og:image: /sims/dose-response-explorer/dose-response-explorer.png
twitter:image: /sims/dose-response-explorer/dose-response-explorer.png
social:
   cards: false
quality_score: 79
---

# Interactive Dose-Response Curve Explorer

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Interactive Dose-Response Curve Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim allows students to explore one of the fundamental concepts in toxicology: the dose-response relationship. A coordinate plane displays dose on a logarithmic x-axis (mg/kg) against percent response on a linear y-axis (0-100%), with a sigmoid curve showing how biological response increases with dose for a selected substance.

Students can choose from several substances including DDT, caffeine, nicotine, aspirin, table salt, and ethanol, each with different LD50 values and curve shapes. A draggable vertical marker lets students read the predicted response at any dose. The LD50 point -- the dose that produces a 50% response -- is highlighted with a dashed red horizontal line, making this critical toxicological value easy to identify and compare across substances.

A threshold mode toggle demonstrates how some toxicological responses remain at zero until a critical dose is reached, then rise sharply. Sliders control curve steepness and threshold position, helping students build intuition about how different substances affect organisms in fundamentally different ways.

## How to Use

1. Select a substance from the dropdown menu to view its dose-response curve.
2. Drag the vertical marker line across the graph to read the predicted response at different doses.
3. Locate the LD50 value where the curve crosses the 50% response line (dashed red).
4. Compare curves for different substances to see which are more toxic (lower LD50).
5. Toggle the threshold mode checkbox to see how threshold effects differ from standard sigmoid curves.
6. Adjust the steepness slider to see how curve shape affects the dose range over which response changes rapidly.
7. Adjust the threshold slider (in threshold mode) to explore how the critical dose affects the response pattern.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/dose-response-explorer/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Interpret dose-response curves to identify LD50 values and threshold effects
- Compare the relative toxicity of different substances using LD50 values
- Explain the concept "the dose makes the poison" using evidence from dose-response curves
- Distinguish between threshold and non-threshold dose-response models

### Prerequisites

- Basic understanding of graphs with logarithmic scales
- Introduction to the concept of toxicity
- Familiarity with concentration and dosage units

### Standards Alignment

- **NGSS HS-LS2-7**: Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment
- **AP Environmental Science**: Topic 8.9 -- Dose-Response Relationships
- **NGSS HS-ETS1-4**: Use a computer simulation to model the impact of proposed solutions

### Activities

1. **Warm-Up** (5 min): Present the Paracelsus quote: "The dose makes the poison." Ask students to explain what this means using everyday examples (water, vitamins, caffeine). Can something harmless in small amounts become dangerous?

2. **Interactive Exploration** (15 min): Students explore the MicroSim and complete a data table recording the LD50, curve steepness, and relative toxicity ranking for each available substance. They rank substances from most to least toxic and write one sentence explaining their ranking method.

3. **Guided Analysis** (15 min): Students toggle to threshold mode and compare it to the standard sigmoid curve. In pairs, they discuss: "Why does the existence of threshold effects matter for setting environmental safety standards?" They draw both curve types in their notebooks and label key features (LD50, threshold, steep region, plateau).

4. **Application Activity** (10 min): Present a scenario: "A factory releases a chemical with an LD50 of 500 mg/kg in fish. The current concentration in a nearby river is 2 mg/kg. Should residents be concerned?" Students use the MicroSim to model this scenario and write a brief risk assessment.

### Assessment Questions

1. Substance A has an LD50 of 50 mg/kg and Substance B has an LD50 of 5,000 mg/kg. Which is more toxic? Explain your reasoning.
2. What does the steepness of a dose-response curve tell you about a substance's effects? Why might a steep curve be more dangerous than a gradual one?
3. Explain why threshold effects are important for setting safe exposure limits for pollutants in drinking water.
4. A pesticide has an LD50 of 100 mg/kg in rats. Does this mean a dose of 99 mg/kg is safe? Explain using what you know about dose-response curves.

## References

1. Casarett, L.J. & Doull, J. (2013). *Casarett and Doull's Toxicology: The Basic Science of Poisons*. 8th ed. McGraw-Hill.
2. EPA. "Basics of Dose-Response." [https://www.epa.gov/risk/dose-response](https://www.epa.gov/risk/dose-response)
3. Klaassen, C.D. (2019). *Casarett and Doull's Toxicology*. McGraw-Hill Education.
