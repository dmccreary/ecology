---
title: Complete Ecosystem Energy Budget
description: Interactive p5.js MicroSim where students construct and balance a complete ecosystem energy budget, tracing energy from solar input through GPP, NPP, and NEP.
image: /sims/ecosystem-energy-budget/ecosystem-energy-budget.png
og:image: /sims/ecosystem-energy-budget/ecosystem-energy-budget.png
twitter:image: /sims/ecosystem-energy-budget/ecosystem-energy-budget.png
social:
   cards: false
quality_score: 85
---

# Complete Ecosystem Energy Budget

<iframe src="main.html" height="567" width="100%" scrolling="no"></iframe>

[Run the Complete Ecosystem Energy Budget MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This comprehensive MicroSim presents the complete energy budget of an ecosystem as an interactive flow diagram. Solar energy enters from the top and flows through producers, consumers, and decomposers, with energy lost as heat at each step. Students can see and edit all the key values: Gross Primary Productivity (GPP), autotrophic respiration (Ra), Net Primary Productivity (NPP), consumption by herbivores and decomposers, Net Ecosystem Productivity (NEP), heterotrophic respiration, and secondary production.

The power of this MicroSim lies in its interactivity. Students can click on any value to edit it, and the diagram automatically recalculates all downstream values, highlighting any inconsistencies in red. A "Balance Check" feature verifies the fundamental constraint that Energy In must equal Energy Out plus Energy Stored, reinforcing the first law of thermodynamics in an ecological context.

Ecosystem presets via a dropdown menu let students compare energy budgets across different ecosystem types, revealing how tropical forests, grasslands, and aquatic systems allocate energy differently. This integrated view connects all the productivity concepts (GPP, NPP, NEP) that are often taught separately, helping students see the complete energy picture.

## How to Use

1. Examine the flow diagram showing energy moving from solar input through producers to consumers and decomposers.
2. Note the values at each step: GPP, Ra, NPP, herbivore consumption, decomposer consumption, and NEP.
3. Click on any value to edit it and watch downstream values recalculate automatically.
4. Values highlighted in red indicate an energy budget inconsistency -- adjust values to balance the budget.
5. Click the "Balance Check" button to verify that Energy In = Energy Out + Energy Stored.
6. Use the ecosystem preset dropdown to compare energy budgets across different ecosystem types.
7. Observe how all heat arrows converge into the Total Heat Loss counter.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/ecosystem-energy-budget/main.html"
        height="567px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

55 minutes

### Learning Objectives

- Construct a complete energy budget for an ecosystem tracing energy from solar input through GPP, NPP, and NEP
- Explain the relationship between GPP, Ra, NPP, and NEP
- Apply the first law of thermodynamics to verify energy balance in an ecosystem
- Compare energy allocation patterns across different ecosystem types

### Prerequisites

- Understanding of photosynthesis and cellular respiration
- Introduction to the concept of trophic levels
- Basic knowledge of the first and second laws of thermodynamics
- Familiarity with the terms producers, consumers, and decomposers

### Standards Alignment

- **NGSS HS-LS2-4**: Use mathematical representations to support claims for the cycling of matter and flow of energy among organisms in an ecosystem
- **AP Environmental Science**: Topic 1.4 -- Primary Productivity
- **NGSS HS-LS2-3**: Construct and revise an explanation based on evidence for the cycling of matter and flow of energy in aerobic and anaerobic conditions

### Activities

1. **Warm-Up** (5 min): Write on the board: "A forest receives 10,000 kJ/m2/day of solar energy. Only about 20 kJ ends up stored in new wood. Where did the rest go?" Have students brainstorm all possible energy pathways.

2. **Guided Budget Construction** (20 min): Using the MicroSim, walk through the energy budget as a class. Start with solar input and trace energy through each step, asking students to predict each value before revealing it. Key questions at each step: "What fraction of energy moves forward? What fraction is lost as heat? Why?"

3. **Independent Exploration** (15 min): Students select different ecosystem presets and complete a comparison table recording GPP, NPP, NEP, and the ratio NPP/GPP for each ecosystem type. They answer: "Which ecosystem is most efficient at storing energy? Which loses the most to respiration? Why might this be?"

4. **Budget Challenge** (15 min): Students intentionally create an unbalanced budget by editing values and then must identify and fix the inconsistencies. This hands-on debugging reinforces understanding of the energy balance constraint. Extension: Students design the energy budget for a hypothetical ecosystem and present it to the class.

### Assessment Questions

1. Define GPP, NPP, and NEP, and write the mathematical equation relating them.
2. Why is NPP always less than GPP? Where does the difference go?
3. An ecosystem has a GPP of 5,000 kJ/m2/yr and an NPP of 2,500 kJ/m2/yr. What is its autotrophic respiration rate? What percentage of GPP is used for plant respiration?
4. If NEP is negative for a year, what does this tell you about the ecosystem? Is it gaining or losing carbon?
5. Why do only about 10% of the energy at one trophic level transfer to the next? Use the energy budget to explain this rule.

## References

1. Chapin, F.S., Matson, P.A. & Vitousek, P. (2011). *Principles of Terrestrial Ecosystem Ecology*. 2nd ed. Springer.
2. Odum, E.P. & Barrett, G.W. (2005). *Fundamentals of Ecology*. 5th ed. Thomson Brooks/Cole.
3. Lindeman, R.L. (1942). "The Trophic-Dynamic Aspect of Ecology." *Ecology* 23(4): 399-417.
