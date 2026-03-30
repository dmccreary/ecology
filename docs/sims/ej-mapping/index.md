---
title: Environmental Justice Mapping Tool
description: Interactive p5.js MicroSim where students correlate pollution sources, income levels, health outcomes, and green space across a fictional city to identify patterns of environmental injustice.
image: /sims/ej-mapping/ej-mapping.png
og:image: /sims/ej-mapping/ej-mapping.png
twitter:image: /sims/ej-mapping/ej-mapping.png
social:
   cards: false
quality_score: 83
---

# Environmental Justice Mapping Tool

<iframe src="main.html" height="602" width="100%" scrolling="no"></iframe>

[Run the Environmental Justice Mapping Tool MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents a simplified map of a fictional city divided into districts, with toggleable overlay layers that reveal patterns of environmental injustice. Students can turn on and off four data layers: pollution sources (factories, highways, waste sites shown as red markers), income levels (color gradient from dark/low to light/high), health outcomes (asthma and cancer rates as proportional circles), and green space access (green shading).

By toggling layers in different combinations, students visually discover that pollution sources, low income, poor health outcomes, and lack of green space tend to cluster in the same districts -- while wealthier districts enjoy cleaner air, better health, and more parks. Clicking on any district reveals detailed demographic and environmental statistics, making the disparities concrete and quantifiable.

Advanced features include a "Propose Policy" tool where students can place new facilities or green spaces and see predicted impact changes, district-by-district comparison views, and a "Flip Perspective" button that presents the same data from the viewpoint of different stakeholders (resident, developer, city planner, environmental advocate). Discussion prompts appear as students discover patterns, guiding them toward deeper analysis of environmental justice issues.

## How to Use

1. Start with the pollution and income layers toggled on to see the initial data distribution.
2. Toggle layers on and off using the checkboxes to discover visual correlations between datasets.
3. Click on individual districts to view detailed demographics, pollution data, and health statistics.
4. Turn on all four layers simultaneously to see the full pattern of environmental injustice.
5. Use the "Propose Policy" tool to place new green spaces or relocate pollution sources and observe predicted impacts.
6. Click the "Flip Perspective" button to see how different stakeholders view the same data.
7. Compare districts side by side to quantify the disparities.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/ej-mapping/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

55 minutes

### Learning Objectives

- Correlate the locations of environmental hazards with demographic data to identify patterns of environmental injustice
- Analyze how income, race, pollution exposure, and health outcomes are spatially related
- Evaluate environmental justice claims using quantitative evidence from the mapping tool
- Propose evidence-based policy solutions to address environmental inequities

### Prerequisites

- Basic understanding of pollution types and sources
- Introduction to public health concepts (disease rates, health disparities)
- Familiarity with the concept of socioeconomic status
- Basic map reading skills

### Standards Alignment

- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- **AP Environmental Science**: Topic 8.12 -- Environmental Justice
- **NGSS HS-ETS1-3**: Evaluate a solution to a complex real-world problem based on prioritized criteria and trade-offs

### Activities

1. **Warm-Up** (5 min): Show a real-world environmental justice map (e.g., EPA EJScreen). Ask: "Do you think all communities face the same level of pollution exposure? Why or why not?" Students write a prediction about what patterns they expect to find.

2. **Layer-by-Layer Discovery** (15 min): Students explore the fictional city map one layer at a time, recording observations. First, only pollution sources. Then, only income levels. Then both together. They write: "What pattern did you notice? Was it what you expected?" Repeat with health outcomes and green space layers.

3. **Data Analysis** (15 min): In pairs, students click on three high-pollution districts and three low-pollution districts, recording income, health statistics, and green space for each. They calculate average values for each group and create a comparison chart. Discussion: "What is the relationship between pollution exposure and income? Is this pattern fair?"

4. **Policy Proposal** (20 min): Using the "Propose Policy" tool, each group develops a three-part policy to reduce environmental injustice in the city. They must: (a) identify the two most impacted districts, (b) propose specific interventions (green space addition, pollution source relocation, health services), and (c) use the tool's impact predictions to justify their recommendations. Groups present their proposals in a mock city council format.

### Assessment Questions

1. Describe the spatial pattern you observed between pollution sources and income levels. What does this pattern suggest about environmental justice?
2. District A has a median income of $25,000, an asthma rate of 22%, and 5% green space. District B has a median income of $90,000, an asthma rate of 4%, and 40% green space. What do these numbers suggest about environmental equity in this city?
3. A factory owner says: "We located here because land was cheap." A resident says: "The factory made our property values drop, trapping us here." Analyze both perspectives using evidence from the mapping tool.
4. What policy would you prioritize to address environmental injustice: reducing pollution sources, adding green space, or improving healthcare access? Justify your answer with evidence.
5. Why is mapping important for environmental justice advocacy? What can a map reveal that a simple data table cannot?

## References

1. Bullard, R.D. (1990). *Dumping in Dixie: Race, Class, and Environmental Quality*. Westview Press.
2. EPA. "EJScreen: Environmental Justice Screening and Mapping Tool." [https://www.epa.gov/ejscreen](https://www.epa.gov/ejscreen)
3. Mohai, P., Pellow, D. & Roberts, J.T. (2009). "Environmental Justice." *Annual Review of Environment and Resources* 34: 405-430.
