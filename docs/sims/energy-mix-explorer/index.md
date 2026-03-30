---
title: Global Energy Mix Scenario Explorer
description: Interactive p5.js simulation where students design an energy portfolio by adjusting sliders for 8 energy sources and observe real-time sustainability metrics.
image: /sims/energy-mix-explorer/energy-mix-explorer.png
og:image: /sims/energy-mix-explorer/energy-mix-explorer.png
twitter:image: /sims/energy-mix-explorer/energy-mix-explorer.png
social:
   cards: false
quality_score: 83
---

# Global Energy Mix Scenario Explorer

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the Global Energy Mix Scenario Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim puts students in the role of energy policy designer. Using sliders for eight energy sources -- coal, oil, natural gas, nuclear, solar, wind, hydro, and biomass -- students create an energy portfolio and immediately see the consequences across multiple sustainability metrics: total CO2 emissions, land use, water use, average EROI, estimated cost per kilowatt-hour, and an overall sustainability score.

The sliders auto-normalize to 100%, so changing one source automatically adjusts the others, mimicking the real constraint that total energy supply must meet demand. Preset buttons ("Current Mix," "All Fossil," "All Renewable," "Balanced") let students quickly compare common scenarios before designing their own.

The simulation builds systems thinking by revealing that every energy choice involves trade-offs. A portfolio that minimizes CO2 may require enormous land area. A cheap mix may produce heavy emissions. The challenge mode asks students to achieve a sustainability score of 80 or higher while keeping costs under 12 cents per kilowatt-hour, forcing them to balance competing objectives just as real policymakers must.

## How to Use

1. **Start with a preset** -- click "Current Mix" to see the approximate global energy mix and its metrics.
2. **Try "All Fossil" and "All Renewable"** presets to see the extremes.
3. **Adjust individual sliders** to increase or decrease each energy source's share.
4. **Watch the metrics update** in real time as you change the mix.
5. **Attempt the challenge** -- try to reach a sustainability score of 80+ while keeping cost under 12 cents/kWh.
6. **Compare your solution** with classmates to see different approaches to the same constraints.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/energy-mix-explorer/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science)

### Duration
50 minutes

### Learning Objectives

1. Design an energy portfolio that meets demand constraints while minimizing ecological footprint.
2. Evaluate trade-offs between cost, emissions, land use, and reliability in energy planning.
3. Explain why achieving sustainability requires balancing multiple competing objectives.

### Prerequisites

- Basic understanding of renewable and nonrenewable energy sources
- Awareness of climate change and CO2 emissions
- Familiarity with percentages and proportional reasoning

### Standards Alignment

- **NGSS HS-ESS3-2**: Evaluate competing design solutions for developing, managing, and utilizing energy resources.
- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems.
- **NGSS HS-ETS1-3**: Evaluate a solution to a complex real-world problem based on prioritized criteria and trade-offs.

### Activities

1. **Engage** (5 min): Show the current global energy mix (approximately 80% fossil fuels). Ask: "If you were in charge, how would you change this? What would you need to consider?" Collect student ideas on the board.

2. **Explore** (15 min): Students work individually or in pairs to complete three tasks: (a) Record the metrics for the "Current Mix" preset, (b) Record metrics for "All Renewable," and (c) Design their own optimized mix. They record all metrics in a comparison table.

3. **Explain** (15 min): Class discussion on findings. Why can't we simply switch to "All Renewable" immediately? Discuss grid reliability, intermittency, land use requirements, and cost. Introduce the concept of energy transitions and why they take decades.

4. **Extend** (15 min): Challenge mode -- students attempt to achieve sustainability score 80+ with cost under 12 cents/kWh. They document their strategy and trade-offs in a written reflection. Compare solutions across the class.

### Assessment Questions

1. What trade-offs did you encounter when trying to maximize the sustainability score while minimizing cost?
2. Why does the "All Renewable" scenario still have a sustainability score below 100?
3. A politician proposes switching your country to 100% solar power. Using data from the simulation, write three questions you would ask about the feasibility of this plan.

## References

1. IEA (2023). *World Energy Outlook 2023*. International Energy Agency.
2. Jacobson, M. Z. & Delucchi, M. A. (2011). "Providing all global energy with wind, water, and solar power." *Energy Policy*, 39(3), 1154-1169.
3. Smil, V. (2010). *Energy Transitions: History, Requirements, Prospects*. Praeger.
