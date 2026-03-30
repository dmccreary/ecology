---
title: Cogeneration System Flow
description: Interactive vis-network flow diagram comparing conventional separate generation (56% efficient) with combined heat and power cogeneration (85% efficient).
image: /sims/cogeneration-flow/cogeneration-flow.png
og:image: /sims/cogeneration-flow/cogeneration-flow.png
twitter:image: /sims/cogeneration-flow/cogeneration-flow.png
social:
   cards: false
quality_score: 76
---

# Cogeneration System Flow

<iframe src="main.html" height="630" width="100%" scrolling="no"></iframe>

[Run the Cogeneration System Flow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim uses a flow diagram to compare two approaches to generating electricity and heat: conventional separate generation and combined heat and power (CHP) cogeneration. The side-by-side layout makes energy losses immediately visible, reinforcing the concept that efficiency means capturing energy that would otherwise be wasted.

On the left, the conventional system shows how fuel input splits between a power plant (producing electricity with significant waste heat) and a separate boiler (producing useful heat with its own losses). Together, the two systems use 200 units of fuel to produce 113 units of useful energy -- only 56% efficient. On the right, the cogeneration system feeds 100 units of fuel into a single CHP unit that produces both electricity and useful heat, delivering 85 units of useful energy from 100 units of fuel -- 85% efficient.

Animated flow particles show energy movement through the system, and waste heat is highlighted in red to make inefficiency visible. Clicking on any node reveals detailed information about that component's energy inputs and outputs. This visual approach helps students grasp why cogeneration is a key strategy for reducing fossil fuel consumption and greenhouse gas emissions.

## How to Use

1. Examine the **left side** showing conventional separate generation: trace the flow from fuel input through the power plant and boiler to useful energy and waste heat.
2. Examine the **right side** showing CHP cogeneration: trace how a single system produces both electricity and useful heat from the same fuel.
3. **Click any node** in the diagram to see detailed energy values for that component.
4. Compare the **waste heat** (red) in both systems -- notice how much more energy is wasted in conventional generation.
5. Note the efficiency percentages: 56% for conventional vs. 85% for cogeneration.
6. Consider where the "extra" energy comes from in cogeneration -- it is waste heat that is captured rather than discarded.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/cogeneration-flow/main.html"
        height="630px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Physics)

### Duration
35 minutes

### Learning Objectives

- Trace energy flow through a cogeneration system and compare total efficiency to conventional separate generation
- Explain why waste heat recovery is the key advantage of combined heat and power systems
- Calculate overall system efficiency from input and output energy values
- Evaluate cogeneration as a strategy for reducing fossil fuel consumption and emissions

### Prerequisites

- Understanding of energy forms (thermal, electrical, chemical)
- Basic concept of efficiency as useful output divided by total input
- Awareness that burning fossil fuels produces both useful energy and waste heat

### Standards Alignment

- **NGSS HS-PS3-3**: Design, build, and refine a device that works within given constraints to convert one form of energy into another form of energy.
- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems.
- **AP Environmental Science**: Topic 6.2 -- Energy Sources and Fuel Types

### Activities

1. **Engage** (5 min): Ask students what happens to the heat produced by a power plant. Where does it go? Introduce the concept that a typical power plant converts only about one-third of fuel energy into electricity, with two-thirds lost as waste heat. What if we could capture that waste?

2. **Explore** (10 min): Students examine the diagram, clicking each node to record the energy values. They create a simple energy budget table for each system: fuel in, electricity out, useful heat out, waste heat. Students calculate the efficiency of each system independently using the formula: efficiency = useful energy output / total fuel input.

3. **Explain** (10 min): Class discussion connecting the diagram to real-world applications. Where is cogeneration used? (Hospitals, universities, district heating, industrial facilities.) Why is it not used everywhere? Discuss barriers: need for both heat and electricity demand at the same location, higher upfront costs, infrastructure requirements. Connect to broader sustainability: if we could convert all conventional plants to CHP, how much fuel would we save?

4. **Extend** (10 min): Students research one real cogeneration facility and create a brief profile: location, fuel type, electricity capacity, heat uses, and estimated CO2 savings compared to separate generation. Share findings with the class.

### Assessment Questions

1. A conventional system uses 200 units of fuel to produce 113 units of useful energy. A CHP system uses 100 units to produce 85 units. Calculate the efficiency of each and explain the difference.
2. Where does the "extra" efficiency in cogeneration come from? What specific energy is captured that conventional systems waste?
3. Why is cogeneration particularly well-suited for hospitals, universities, and industrial complexes? What do these facilities have in common?
4. If a city replaced 10 conventional power plants with CHP systems of equal electrical output, estimate the percentage reduction in total fuel consumption.
5. What are two barriers that prevent cogeneration from being adopted everywhere?

## References

1. U.S. Department of Energy. (2023). Combined Heat and Power Basics. [energy.gov](https://www.energy.gov/eere/amo/combined-heat-and-power-basics)
2. EPA. (2024). Catalog of CHP Technologies. U.S. Environmental Protection Agency.
3. IEA. (2023). Energy Efficiency 2023. International Energy Agency, Chapter on District Heating and CHP.
