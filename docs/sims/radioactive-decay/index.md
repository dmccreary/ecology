---
title: Radioactive Decay Simulator
description: Interactive p5.js MicroSim visualizing exponential decay of radioactive atoms with adjustable half-life and real-time decay curve plotting.
image: /sims/radioactive-decay/radioactive-decay.png
og:image: /sims/radioactive-decay/radioactive-decay.png
twitter:image: /sims/radioactive-decay/radioactive-decay.png
social:
   cards: false
quality_score: 75
---

# Radioactive Decay Simulator

<iframe src="main.html" height="422" width="100%" scrolling="no"></iframe>

[Run the Radioactive Decay Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim helps students visualize the process of radioactive decay, a concept critical to understanding nuclear energy, radiometric dating, and nuclear waste management. Two hundred colored circles represent radioactive atoms that probabilistically decay each time step, changing from bright green (undecayed) to gray (decayed).

A line graph tracks the number of remaining undecayed atoms over time, producing the characteristic exponential decay curve. By adjusting the half-life slider, students can observe how different isotopes decay at different rates while always following the same mathematical pattern. The simulation makes the abstract concept of half-life tangible by connecting probabilistic behavior of individual atoms to predictable large-scale patterns.

This topic connects to ecology through nuclear energy policy, the environmental impact of nuclear waste storage, and the use of radiometric dating to study ecological change over geological timescales.

## How to Use

1. Observe the 200 green circles representing undecayed radioactive atoms.
2. Adjust the **Half-Life slider** to set how many time steps constitute one half-life.
3. Press **Play** to start the simulation and watch atoms randomly decay (turn gray).
4. Observe the decay curve forming on the line graph as undecayed atoms decrease.
5. Use the **Speed slider** to control animation rate.
6. Press **Reset** to restore all atoms and start over with different half-life settings.
7. Note the mathematical formula displayed and compare it to the observed curve.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/radioactive-decay/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
35 minutes

### Learning Objectives

- Visualize exponential decay and predict remaining radioactivity after multiple half-lives.
- Explain how individual probabilistic events produce predictable population-level patterns.
- Calculate the fraction of radioactive material remaining after a given number of half-lives.
- Connect radioactive decay to environmental issues including nuclear waste management.

### Prerequisites

- Understanding of exponential functions (growth and decay)
- Basic concept of atoms and isotopes
- Familiarity with probability concepts

### Standards Alignment

- **NGSS PS1.C**: Nuclear Processes
- **AP Environmental Science**: Topic 6.7 - Nonrenewable Energy Sources (nuclear energy and waste)

### Activities

1. **Engage** (5 min): Ask: "If you have 1000 radioactive atoms and each has a 50% chance of decaying every hour, how many remain after 3 hours?" Students make predictions, then discuss why this is relevant to nuclear waste storage that must last thousands of years.

2. **Explore** (10 min): Students run the simulation with different half-life values. They record how many atoms remain after 1, 2, 3, and 4 half-lives. Students compare their observed values to the predicted values from the formula N = N0 * (1/2)^t.

3. **Explain** (10 min): Discuss why individual atoms are unpredictable but the overall curve is smooth and predictable (law of large numbers). Connect to real isotopes: Carbon-14 (5,730 years), Uranium-238 (4.5 billion years), Plutonium-239 (24,100 years). Discuss implications for nuclear waste storage.

4. **Extend** (10 min): Students calculate how long nuclear waste from a power plant must be stored before it decays to safe levels. If Plutonium-239 has a half-life of 24,100 years and must go through 10 half-lives to be considered safe, how long must it be stored? Discuss the ecological and ethical implications.

### Assessment Questions

1. After 4 half-lives, approximately what fraction of the original radioactive material remains?
2. Why does the decay curve never reach exactly zero?
3. If Isotope A has a half-life of 10 years and Isotope B has a half-life of 1000 years, which is more dangerous in the short term? Which poses a greater long-term storage challenge? Explain.
4. How is radiometric dating used by ecologists to study past ecosystems?

## References

1. Faure, G. & Mensing, T.M. (2004). *Isotopes: Principles and Applications*, 3rd ed. Wiley.
2. U.S. Nuclear Regulatory Commission: Radioactive Waste. [https://www.nrc.gov/waste.html](https://www.nrc.gov/waste.html)
3. HHMI BioInteractive: Radiometric Dating. [https://www.biointeractive.org/](https://www.biointeractive.org/)
