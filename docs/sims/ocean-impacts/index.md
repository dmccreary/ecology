---
title: Ocean Impacts Dashboard
description: Interactive Chart.js dashboard with four synchronized panels showing ocean temperature, pH, sea level, and coral bleaching trends from 1880 to 2025.
image: /sims/ocean-impacts/ocean-impacts.png
og:image: /sims/ocean-impacts/ocean-impacts.png
twitter:image: /sims/ocean-impacts/ocean-impacts.png
social:
   cards: false
quality_score: 81
---

# Ocean Impacts Dashboard

<iframe src="main.html" height="697px" width="100%" scrolling="no"></iframe>

[Run the Ocean Impacts Dashboard Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This multi-panel dashboard presents four synchronized line charts showing key ocean health indicators from 1880 to 2025: sea surface temperature anomaly, ocean pH, global mean sea level, and coral bleaching events per decade. All four charts share a common time axis, and a vertical reference line moves together across all panels when students hover or click, making it easy to identify correlations between different ocean impacts at any point in time.

The dashboard teaches students to read real climate data and notice how multiple ocean impacts track together. As atmospheric CO2 increases, ocean temperature rises, pH drops (ocean acidification), sea level rises from thermal expansion and ice melt, and coral bleaching events become more frequent. Seeing all four trends simultaneously reinforces the systems-thinking approach central to understanding climate change impacts.

A "Toggle Normalized Overlay" button standardizes all four curves to the same scale for direct comparison, revealing how closely these indicators correlate. The data is based on published NOAA, IPCC, and ReefBase datasets, simplified for educational clarity.

## How to Use

1. Examine each of the four panels individually to understand the overall trend in each indicator.
2. Hover over any chart to see a synchronized vertical line appear across all four panels, showing values at the same time point.
3. Click on specific time points to compare all four indicators at once.
4. Click **Toggle Normalized Overlay** to overlay all four trends on the same scale and see their correlations.
5. Look for major events annotated on the charts, such as El Nino years and volcanic eruptions.
6. Toggle individual data series on or off by clicking their labels in the chart legends.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/ocean-impacts/main.html"
        height="697px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / AP Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Compare trends in ocean temperature, pH, sea level, and coral bleaching events over time
- Identify correlations between multiple ocean impact indicators
- Analyze how increasing atmospheric CO2 drives interconnected changes in ocean systems

### Prerequisites

- Basic understanding of climate change and the greenhouse effect
- Ability to read and interpret line graphs
- Introduction to ocean chemistry (pH scale)
- Familiarity with coral reef ecosystems

### Standards Alignment

- NGSS HS-ESS3-5: Analyze geoscience data and the results from global climate models to make an evidence-based forecast of the current rate of global or regional climate change
- AP Environmental Science: Topic 9.4 -- Ocean Warming; Topic 9.5 -- Ocean Acidification

### Activities

1. **Data Literacy Warm-Up** (5 min): Display only the temperature panel. Ask: "What overall trend do you see? When does the rate of change appear to accelerate?" Establish skills for reading time-series data before adding complexity.

2. **Guided Multi-Panel Analysis** (15 min): Reveal all four panels. Students work in pairs to answer: When temperature rises, what happens to pH? To sea level? To bleaching events? Students use the hover feature to find specific years where all four indicators show notable changes. Record observations in a correlation table.

3. **Normalized Comparison** (10 min): Students click the normalized overlay button and observe how the four curves align. Discuss: Which indicators track most closely together? Which shows the greatest acceleration? Why might some indicators lag behind others?

4. **Evidence-Based Writing** (15 min): Students write a one-page evidence brief using data from the dashboard to support the claim: "Ocean impacts from climate change are interconnected and accelerating." They must cite at least three specific data points from the dashboard with dates and values.

### Assessment Questions

1. Using the dashboard data, explain the mechanism that connects rising atmospheric CO2 to declining ocean pH.
2. Compare the rate of change in sea level between 1900-1960 and 1960-2025. What accounts for the acceleration?
3. A skeptic argues that coral bleaching is caused by local pollution, not climate change. Using the correlation between temperature anomaly and bleaching events shown in the dashboard, construct a counterargument.

## References

1. IPCC (2021). *Climate Change 2021: The Physical Science Basis*. Contribution of Working Group I to the Sixth Assessment Report.
2. NOAA. "Global Climate Dashboard." National Oceanic and Atmospheric Administration. [https://www.climate.gov/](https://www.climate.gov/)
3. Hoegh-Guldberg, O., et al. (2007). Coral reefs under rapid climate change and ocean acidification. *Science*, 318(5857), 1737-1742.
