---
title: Age Structure Diagram Explorer
description: Interpret population pyramids to predict demographic trends for 10 countries with compare mode.
image: /sims/age-structure/age-structure.png
og:image: /sims/age-structure/age-structure.png
twitter:image: /sims/age-structure/age-structure.png
social:
   cards: false
quality_score: 83
---

# Age Structure Diagram Explorer

<iframe src="main.html" height="547" width="100%" scrolling="no"></iframe>

[Run the Age Structure Diagram Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive population pyramid explorer lets students compare the age structures of 10 countries representing the full range of global demographic profiles. From Niger's ultra-expansive youth bulge to Japan's inverted aging pyramid, each country illustrates a different stage of the demographic transition.

The visualization displays classic population pyramids with horizontal bars for male (left, blue) and female (right, pink) populations in 5-year age increments. Animated transitions when switching countries help students see how the pyramid shape changes. A compare mode places two pyramids side-by-side with matched scales, making demographic differences immediately visible. Key statistics including total population, median age, dependency ratio, total fertility rate (TFR), and projected 2050 population appear below each pyramid.

This supports the Bloom's taxonomy level of **Analyze**, as students must interpret visual patterns in the data and use them to predict future population trends. The reproductive age group (15-49) is highlighted in a darker shade to draw attention to the demographic engine of population change.

## How to Use

1. **Select a country** from the dropdown menu to view its population pyramid
2. **Observe the pyramid shape**: expansive (wide base = rapid growth), stationary (even sides = stable), or constrictive (narrow base = decline)
3. **Read the statistics** below the pyramid: population, median age, dependency ratio, TFR, and 2050 projection
4. **Note the highlighted reproductive age bands** (darker shades for ages 15-49) -- these drive future population growth
5. **Click "Compare"** to enter side-by-side mode and select a second country from the new dropdown
6. **Compare two countries** to see how different demographic profiles produce different pyramid shapes on the same scale
7. **Click "Single"** to return to single-country view
8. **Watch the animated transitions** when switching countries to see how the bars shift

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/age-structure/main.html"
        height="547px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / Environmental Science)

### Duration
15-20 minutes

### Learning Objectives
- Interpret age structure diagrams to predict future population trends for different countries
- Classify population pyramids as expansive, stationary, or constrictive
- Compare demographic profiles across countries at different stages of the demographic transition
- Relate total fertility rate and median age to pyramid shape and projected population change
- Explain how the dependency ratio affects a country's economic and social capacity

### Prerequisites
- Understanding of population growth concepts (birth rate, death rate)
- Basic knowledge of the demographic transition model
- Familiarity with the concept of fertility rate
- Ability to read and interpret bar charts

### Standards Alignment
- NGSS HS-LS2-1: Use mathematical and/or computational representations to support explanations of factors that affect carrying capacity
- AP Environmental Science Topic 3.3: Age Structure Diagrams

### Activities

1. **Warm-Up** (2-3 min): Show students the Nigeria pyramid and the Japan pyramid side by side. Ask: "Which country is growing faster? How can you tell just from the shape?"
2. **Guided Exploration** (5-7 min): Walk through four contrasting countries (Nigeria, India, USA, Japan). For each, have students identify the shape type, note the TFR and median age, and predict whether the population will grow or shrink by 2050.
3. **Independent Investigation** (5-7 min): Students use compare mode to answer: "What makes China's pyramid unusual? How does the UAE's pyramid differ from all others? Why does Germany's pyramid show an immigration bulge?"
4. **Reflection** (3-5 min): Discuss: "If you were a government planner in Japan, what challenges would this pyramid predict? What about in Nigeria?" Connect age structure to resource needs, healthcare, and education.

### Assessment Questions

1. What does a wide base on a population pyramid indicate about a country's birth rate?
2. Compare Nigeria and Japan using the compare mode. List three specific differences in their demographic statistics and explain what each difference means for the country's future.
3. China's pyramid shows an unusual constrictive pattern. What policy caused this shape, and what economic challenges does it predict for the next 25 years?
4. The UAE has a massive male surplus in the 25-49 age group. What causes this unusual pattern, and why does it result in an extremely low dependency ratio of 18%?

## References

1. [Population Pyramid - Wikipedia](https://en.wikipedia.org/wiki/Population_pyramid) - Overview of age structure diagrams and demographic interpretation
2. [UN World Population Prospects](https://population.un.org/wpp/) - Source data for global population projections
3. [p5.js Reference](https://p5js.org/reference/) - JavaScript library used for the interactive visualization
