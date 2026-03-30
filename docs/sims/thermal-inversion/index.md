---
title: Thermal Inversion Simulator
description: Split-screen particle simulation comparing normal atmospheric conditions with thermal inversion, showing how pollutants accumulate when trapped by a warm air layer.
image: /sims/thermal-inversion/thermal-inversion.png
og:image: /sims/thermal-inversion/thermal-inversion.png
twitter:image: /sims/thermal-inversion/thermal-inversion.png
social:
   cards: false
quality_score: 80
---

# Thermal Inversion Simulator

<iframe src="main.html" height="462" width="100%" scrolling="no"></iframe>

[Run the Thermal Inversion Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim makes the invisible dynamics of atmospheric pollution visible through an animated particle simulation. Under normal atmospheric conditions, temperature decreases with altitude, allowing warm polluted air to rise and disperse. During a thermal inversion, a layer of warm air aloft acts as a "lid," trapping pollutants near the ground where people live and breathe.

The simulation shows pollution particles (small gray and brown dots) emitted from sources at ground level. Under normal conditions, the particles rise and disperse throughout the atmosphere. During a thermal inversion, particles accumulate below the warm layer, creating visible haze that thickens over time. A temperature profile graph alongside each panel shows the critical difference in atmospheric temperature structure.

An AQI-style pollution concentration meter (color-coded green through purple) tracks air quality in real time, demonstrating how rapidly conditions can deteriorate during an inversion event. Students can adjust the emission rate and toggle between normal and inversion modes to directly compare the outcomes, building an intuitive understanding of why geography and weather patterns make some cities particularly vulnerable to smog events.

## How to Use

1. Click **Play** to start the simulation and observe pollution particles emitting from ground-level sources.
2. Toggle between **Normal** and **Inversion** modes to see how atmospheric temperature structure affects pollutant behavior.
3. Adjust the **Emission Rate** slider to control how many pollution particles are released per unit time.
4. Watch the temperature profile graphs on the side of each panel to see the difference between normal (temperature decreasing with altitude) and inverted (warm layer aloft) conditions.
5. Monitor the **AQI pollution meter** below the panels as it changes from green (Good) through yellow, orange, red, and purple (Very Unhealthy).
6. Observe how hours of elapsed time correlate with pollution concentration buildup during an inversion.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/thermal-inversion/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Explain how thermal inversions trap pollutants near the ground
- Compare normal and inverted atmospheric temperature profiles
- Analyze the relationship between emission rates, atmospheric conditions, and air quality
- Connect thermal inversion events to real-world smog and public health impacts

### Prerequisites

- Basic understanding of air pollution sources and types
- Familiarity with temperature and altitude relationships
- Introduction to the concept of air quality

### Standards Alignment

- **NGSS HS-ESS2-4**: Use a model to describe how variations in the flow of energy into and out of Earth's systems result in changes in climate
- **NGSS HS-ESS3-6**: Use a computational representation to illustrate the relationships among Earth systems and how those relationships are being modified due to human activity
- **AP Environmental Science**: Topic 7.2 -- Air Pollution

### Activities

1. **Engage** (5 min): Show photos of Los Angeles or Beijing during severe smog events. Ask: Why do some days have much worse air quality than others, even if pollution sources stay the same?
2. **Explore** (15 min): Students run the simulation in normal mode first, observing how particles disperse. Then switch to inversion mode with the same emission rate and record observations every simulated hour. Create a two-column comparison chart noting particle behavior, visibility, and AQI readings.
3. **Explain** (15 min): Draw the two temperature profiles on the board. Explain that warm air rises (convection) under normal conditions, carrying pollutants away. During an inversion, the warm layer above acts as a ceiling. Discuss real-world examples: Los Angeles basin geography, London's Great Smog of 1952, winter inversions in mountain valleys.
4. **Extend** (10 min): Students experiment with different emission rates under inversion conditions. At what emission rate does AQI stay in the "Good" range even during an inversion? Discuss policy implications: Should cities issue pollution advisories based on weather forecasts?

### Assessment Questions

1. Draw and label the temperature profiles for normal atmospheric conditions and a thermal inversion.
2. Explain why a thermal inversion causes pollution to accumulate near the ground instead of dispersing.
3. A city in a mountain valley experiences frequent winter inversions. What policies would you recommend to protect public health during these events?
4. Why do coastal cities like Los Angeles experience more thermal inversions than cities on flat plains?

## References

1. Jacobson, M.Z. (2012). *Air Pollution and Global Warming: History, Science, and Solutions* (2nd ed.). Cambridge University Press.
2. EPA. "Air Quality Index (AQI) Basics." [https://www.airnow.gov/aqi/aqi-basics/](https://www.airnow.gov/aqi/aqi-basics/)
3. Lutgens, F.K. & Tarbuck, E.J. (2016). *The Atmosphere: An Introduction to Meteorology* (13th ed.). Pearson.
