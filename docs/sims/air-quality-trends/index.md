---
title: U.S. Air Quality Trends Dashboard
description: Assess Clean Air Act effectiveness by analyzing emission trends for six criteria pollutants alongside GDP.
image: /sims/air-quality-trends/air-quality-trends.png
og:image: /sims/air-quality-trends/air-quality-trends.png
twitter:image: /sims/air-quality-trends/air-quality-trends.png
social:
   cards: false
quality_score: 78
---

# U.S. Air Quality Trends Dashboard

<iframe src="main.html" height="482" width="100%" scrolling="no"></iframe>

[Run the U.S. Air Quality Trends Dashboard MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This multi-line time series chart displays U.S. air pollutant emissions from 1970 to 2025, indexed to 1970 levels (= 100), alongside GDP growth on a secondary axis. Students can visually assess the effectiveness of the Clean Air Act by observing how all six criteria pollutants declined dramatically while the economy grew more than four-fold.

The dual-axis design powerfully counters the common misconception that environmental regulation harms the economy. Six pollutant lines (CO, Lead, NO2, SO2, PM2.5, and O3 precursors) each show different rates of decline, while the GDP line rises steadily. Gray recession bands provide economic context, and key policy milestones are annotated below the chart.

This supports the Bloom's taxonomy level of **Evaluate**, as students must assess the effectiveness of environmental policy by interpreting complex multi-variable data and drawing evidence-based conclusions about the relationship between regulation, pollution, and economic growth.

## How to Use

1. **Hover over any data point** to see exact values for all pollutants and GDP at that year
2. **Click legend items** at the bottom of the chart to toggle individual pollutant lines on and off
3. **Read the left y-axis** for pollutant emissions (indexed, 1970 = 100%) and the **right y-axis** for GDP index
4. **Notice the gray shaded bands** marking recession years for economic context
5. **Read the key milestones** below the chart: 1970 Clean Air Act, 1990 Amendments, 1996 leaded gas ban, 2005 Clean Air Interstate Rule, and 2015 updated ozone standards
6. **Compare decline rates**: Lead (Pb) dropped fastest after the leaded gas ban, while PM2.5 declined most gradually
7. **Observe the GDP line** (green dashed) rising steadily even as all pollutants decline

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/air-quality-trends/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
15-20 minutes

### Learning Objectives
- Assess the effectiveness of the Clean Air Act by analyzing emission trends for all six criteria pollutants
- Interpret dual-axis time series charts to compare pollution trends with economic indicators
- Identify key policy milestones and their impact on emission reduction rates
- Evaluate the claim that environmental regulation harms economic growth using data evidence
- Compare the rates of decline among different pollutants and explain the differences

### Prerequisites
- Understanding of what air pollutants are and their health effects
- Basic graph reading skills (time series, dual axes)
- Knowledge of the concept of environmental regulation
- Familiarity with GDP as an economic indicator

### Standards Alignment
- NGSS HS-ESS3-4: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- AP Environmental Science Topic 7.3: Photochemical Smog and Topic 7.5: Clean Air Act

### Activities

1. **Warm-Up** (3 min): Ask students: "Do you think cleaning up air pollution helps or hurts the economy?" Take a quick poll and record predictions.
2. **Guided Exploration** (5-7 min): Display the chart and identify each line together. Ask: "Which pollutant was eliminated most successfully? What policy caused this?" (Answer: Lead, due to the leaded gasoline ban.) Compare the GDP line to the pollutant lines.
3. **Independent Investigation** (5-7 min): Students toggle individual pollutants on and off to isolate trends. Challenge questions: "Which pollutant is declining slowest? Why might PM2.5 be harder to reduce than Lead? Do recessions cause temporary dips in pollution?"
4. **Reflection** (3-5 min): Return to the warm-up poll. Ask: "Has the data changed your mind? What does the simultaneous decline in pollution and rise in GDP suggest about the relationship between regulation and the economy?"

### Assessment Questions

1. Name the six criteria pollutants regulated under the Clean Air Act.
2. Using the chart, identify which pollutant showed the sharpest decline between 1980 and 1990 and explain what policy change caused it.
3. Compare the trends for SO2 and PM2.5. Why might one decline faster than the other, given that they come from different sources and require different control technologies?
4. A politician claims that environmental regulations will destroy the economy. Using evidence from this chart, construct a counter-argument. What does the simultaneous decline in all six pollutants and the 330% GDP growth from 1970 to 2025 demonstrate?

## References

1. [Clean Air Act - Wikipedia](https://en.wikipedia.org/wiki/Clean_Air_Act_(United_States)) - History and provisions of U.S. air quality legislation
2. [EPA Air Trends](https://www.epa.gov/air-trends) - Official U.S. EPA data on criteria pollutant emission trends
3. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - JavaScript charting library used for the visualization
