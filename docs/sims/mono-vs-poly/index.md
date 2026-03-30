---
title: Monoculture vs. Polyculture Ecosystem Comparison
description: Interactive p5.js split-screen simulation comparing pest spread, drought resilience, and long-term yield stability in monoculture versus polyculture farming systems.
image: /sims/mono-vs-poly/mono-vs-poly.png
og:image: /sims/mono-vs-poly/mono-vs-poly.png
twitter:image: /sims/mono-vs-poly/mono-vs-poly.png
social:
   cards: false
quality_score: 80
---

# Monoculture vs. Polyculture Ecosystem Comparison

<iframe src="main.html" height="532" width="100%" scrolling="no"></iframe>

[Run the Monoculture vs. Polyculture Comparison Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This split-screen simulation places monoculture and polyculture farming systems side by side so students can directly observe how crop diversity affects ecological resilience. The left panel shows a monoculture field with a grid of identical crop plants, while the right panel shows a polyculture field with three to four different crop types randomly distributed. Both fields experience identical stress events triggered by buttons.

Three types of stress events reveal the differences: pest outbreaks spread faster through monoculture because identical hosts are adjacent, droughts affect monoculture more severely because polyculture retains soil moisture through ground cover diversity, and after multiple seasons nutrient depletion causes monoculture yields to decline while polyculture remains stable. A season counter and yield tracker for both systems let students quantify these differences over time.

Bar charts below the fields display cumulative yield, pesticide use, and soil health scores, making the long-term consequences of each system visible. The "Run 10 Seasons" button provides a time-lapse comparison that dramatically illustrates how small per-season differences compound into large cumulative effects.

## How to Use

1. Observe the two fields: monoculture (left, identical green plants) and polyculture (right, mixed colored plants).
2. Click **Pest Outbreak** to release pests into both fields. Watch how quickly they spread in each system.
3. Click **Drought** to trigger a drought event and compare how each system responds.
4. Click **Run 10 Seasons** to see how yield, soil health, and pesticide use diverge over time.
5. Monitor the bar charts below for cumulative yield, pesticide use, and soil health comparisons.
6. Note the season counter and observe how monoculture yield declines with nutrient depletion over many seasons.
7. Click **Reset** to start a new comparison from scratch.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/mono-vs-poly/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science / AP Environmental Science)

### Duration

45 minutes

### Learning Objectives

- Compare the ecological resilience of monoculture and polyculture systems under pest, drought, and nutrient stress
- Analyze how crop diversity affects long-term soil health and yield stability
- Evaluate the trade-offs between monoculture efficiency and polyculture resilience

### Prerequisites

- Basic understanding of agricultural practices and crop production
- Familiarity with concepts of biodiversity and ecosystem services
- Introduction to soil science and nutrient cycling

### Standards Alignment

- NGSS HS-LS2-6: Evaluate claims about the effect of group behavior on individual and species' chances of survival
- AP Environmental Science: Topic 5.3 -- Agricultural Practices; Topic 5.5 -- Sustainable Agriculture

### Activities

1. **Prediction Phase** (5 min): Students write predictions for three questions: Which system will lose more crops to a pest outbreak? Which will handle drought better? Which will produce more food after 20 seasons? Collect predictions for later comparison.

2. **Controlled Experiments** (15 min): As a class, test each stress event individually. After each event, students record observations in a data table comparing monoculture and polyculture responses. Discuss: Why did pests spread faster in the monoculture? Why did polyculture retain more moisture?

3. **Long-Term Analysis** (15 min): Students run the 10-season simulation multiple times, recording cumulative yield, pesticide use, and soil health data. They create a line graph showing yield over time for both systems and identify the "crossover point" where polyculture cumulative yield surpasses monoculture.

4. **Debate and Synthesis** (10 min): Hold a class discussion from two perspectives: a farmer who needs maximum short-term yield versus a conservation biologist. When is monoculture justified? What policies could incentivize polyculture adoption? Students write a one-paragraph recommendation.

### Assessment Questions

1. Explain the biological mechanism that causes pest outbreaks to spread faster in monocultures than in polycultures.
2. A farmer wants to switch from monoculture to polyculture but is concerned about short-term yield loss. Using data from the simulation, advise this farmer on the long-term benefits.
3. How do the concepts demonstrated in this simulation connect to the broader idea that biodiversity provides ecosystem services?

## References

1. Altieri, M.A. (1999). The ecological role of biodiversity in agroecosystems. *Agriculture, Ecosystems & Environment*, 74(1-3), 19-31.
2. Lin, B.B. (2011). Resilience in agriculture through crop diversification: Adaptive management for environmental change. *BioScience*, 61(3), 183-193.
3. Letourneau, D.K., et al. (2011). Does plant diversity benefit agroecosystems? A synthetic review. *Ecological Applications*, 21(1), 9-21.
