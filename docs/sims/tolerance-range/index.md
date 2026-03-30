---
title: Tolerance Range Explorer
description: Interactive bell curves showing specialist and generalist species tolerance ranges across environmental gradients, with draggable condition markers and zone highlighting.
image: /sims/tolerance-range/tolerance-range.png
og:image: /sims/tolerance-range/tolerance-range.png
twitter:image: /sims/tolerance-range/tolerance-range.png
social:
   cards: false
quality_score: 79
---

# Tolerance Range Explorer

<iframe src="main.html" height="447" width="100%" scrolling="no"></iframe>

[Run the Tolerance Range Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students physically explore the concept of ecological tolerance by manipulating environmental conditions and observing how specialist and generalist species respond differently. Two overlapping bell curves represent the tolerance ranges of a narrow-tolerance specialist (such as brook trout) and a wide-tolerance generalist (such as largemouth bass). Each curve shows how population performance (growth rate) varies across an environmental gradient.

A draggable vertical line represents the current environmental condition. As students move this line, both curves highlight whether each species is in its optimal zone (green), stress zone (yellow), or intolerance zone (red). This immediate visual feedback helps students understand why some species thrive in stable environments while others succeed in variable ones.

A dropdown selector lets students switch between different environmental variables -- temperature, pH, salinity, and dissolved oxygen -- each with its own pair of specialist and generalist species. This variety demonstrates that tolerance range concepts apply universally across environmental factors, not just temperature, and that the same species can be a specialist for one factor and a generalist for another.

## How to Use

1. Observe the two overlapping bell curves: the narrow curve represents a **specialist species** and the wide curve represents a **generalist species**.
2. **Drag the vertical line** left and right along the environmental gradient to change the current condition.
3. Watch how each species' zone changes: **green** (optimal), **yellow** (stress), or **red** (intolerance) as conditions shift.
4. Use the **dropdown** to switch between environmental variables: Temperature, pH, Salinity, or Dissolved Oxygen.
5. Notice how different species pairs appear for each variable, each with different optimal ranges.
6. Find the condition where one species is in its optimal zone while the other is in its stress zone.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/tolerance-range/main.html"
        height="447px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Ecology)

### Duration
40 minutes

### Learning Objectives

- Demonstrate how changes in environmental conditions affect organism survival by manipulating tolerance curves
- Distinguish between specialist and generalist species based on their tolerance range width
- Predict which species will be more vulnerable to environmental change
- Apply tolerance range concepts across multiple environmental variables

### Prerequisites

- Basic understanding of species and their habitats
- Familiarity with the concept of environmental factors (abiotic conditions)
- Introduction to population growth and limiting factors

### Standards Alignment

- **NGSS HS-LS2-6**: Evaluate claims, evidence, and reasoning that the complex interactions in ecosystems maintain relatively consistent numbers and types of organisms
- **NGSS HS-LS4-5**: Evaluate the evidence supporting claims that changes in environmental conditions may result in increases or decreases in biodiversity
- **AP Environmental Science**: Topic 2.2 -- Range of Tolerance

### Activities

1. **Engage** (5 min): Ask students: Why do we find trout in cold mountain streams but bass in warm ponds? Could you put a bass in a mountain stream and expect it to thrive? Introduce the concept that every species has a range of conditions it can tolerate.
2. **Explore** (15 min): Students drag the condition line across the temperature gradient and record in a data table which zone each species is in at 5 degrees C, 15 degrees C, 25 degrees C, 35 degrees C, and 45 degrees C. Repeat for at least one other environmental variable.
3. **Explain** (10 min): Define optimal range, stress zone, and zone of intolerance. Compare specialist (narrow curve) to generalist (wide curve) strategies. Discuss trade-offs: specialists often outperform generalists under optimal conditions but are more vulnerable to environmental change.
4. **Extend** (10 min): Climate change scenario -- If average water temperature increases by 3 degrees C, which species is more at risk? Students use the simulation to find the answer and write a prediction about community composition changes in a warming stream.

### Assessment Questions

1. Define the terms "optimal range," "stress zone," and "zone of intolerance" in the context of species tolerance.
2. Why is a generalist species more likely to survive a sudden environmental change than a specialist?
3. Using the temperature tolerance curves, predict what would happen to a brook trout population if stream temperature increased from 14 degrees C to 22 degrees C.
4. A lake has a pH of 5.0 due to acid rain. Using tolerance range concepts, explain why some fish species disappear while others survive.

## References

1. Shelford, V.E. (1913). *Animal Communities in Temperate America*. University of Chicago Press.
2. Smith, T.M. & Smith, R.L. (2015). *Elements of Ecology* (9th ed.). Pearson.
3. Begon, M., Townsend, C.R., & Harper, J.L. (2006). *Ecology: From Individuals to Ecosystems* (4th ed.). Blackwell Publishing.
