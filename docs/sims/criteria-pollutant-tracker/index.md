---
title: Criteria Air Pollutants Source-to-Impact Tracker
description: Interactive vis-network diagram tracing six EPA criteria air pollutants from their sources through atmospheric chemistry to health and environmental impacts.
image: /sims/criteria-pollutant-tracker/criteria-pollutant-tracker.png
og:image: /sims/criteria-pollutant-tracker/criteria-pollutant-tracker.png
twitter:image: /sims/criteria-pollutant-tracker/criteria-pollutant-tracker.png
social:
   cards: false
quality_score: 78
---

# Criteria Air Pollutants Source-to-Impact Tracker

<iframe src="main.html" height="657" width="100%" scrolling="no"></iframe>

[Run the Criteria Air Pollutants Source-to-Impact Tracker Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive network diagram visualizes the complete pathway of the six EPA criteria air pollutants -- from emission sources through atmospheric chemistry to their health and environmental impacts. The three-column layout places pollution sources (vehicles, power plants, industry, natural sources) on the left, the six criteria pollutants plus VOC precursors in the center, and the resulting health and environmental impacts on the right.

The network reveals a crucial insight that textbook lists often obscure: pollutants share sources and interact with each other. For example, NOx and VOCs combine to form ground-level ozone, while SO2 and NOx both contribute to acid rain through different chemical pathways. Special dashed edges show these secondary formation pathways, helping students see air pollution as an interconnected system rather than a list of independent chemicals.

Students can click any node to highlight all connected paths, making it easy to trace a single pollutant from source to impact or to identify which sources contribute to multiple problems. The color coding distinguishes sources (gray), primary pollutants (orange), secondary pollutants (red), health impacts (purple), and environmental impacts (brown).

## How to Use

1. Explore the network by observing the three-column layout: Sources, Pollutants, and Impacts.
2. Click on any pollutant node (center column) to highlight all its source connections and downstream impacts.
3. Click on a source node (left column) to see all pollutants it produces.
4. Click on an impact node (right column) to trace back which pollutants cause it.
5. Look for dashed edges showing secondary formation pathways (e.g., NOx + VOCs forming ozone).
6. Hover over nodes and edges to read detailed descriptions.
7. Drag nodes to rearrange the layout for better visibility.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/criteria-pollutant-tracker/main.html"
        height="657px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

50 minutes

### Learning Objectives

- Trace each criteria air pollutant from its source through atmospheric chemistry to health and environmental impacts
- Explain how pollutants share common sources and interact with each other in the atmosphere
- Distinguish between primary pollutants (emitted directly) and secondary pollutants (formed by chemical reactions)
- Analyze why reducing emissions from a single source can have multiple environmental benefits

### Prerequisites

- Basic chemistry concepts (chemical reactions, molecules)
- Understanding of the atmosphere's composition
- Introduction to the Clean Air Act and EPA regulatory framework

### Standards Alignment

- **NGSS HS-ESS3-6**: Use a computational representation to illustrate the relationships among Earth systems
- **AP Environmental Science**: Topic 7.2 -- Air Pollution
- **NGSS HS-LS2-7**: Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment

### Activities

1. **Warm-Up** (5 min): Show students a photo of smog over a city. Ask: "How many different pollutants do you think are in that air? Where did they come from?" Record predictions on the board.

2. **Guided Exploration** (15 min): Students explore the network diagram, starting by clicking each of the six criteria pollutants and recording in a table: the pollutant name, its sources, and its impacts. Students should note which pollutants share sources.

3. **Analysis Activity** (20 min): Working in pairs, students answer: "If a city closes its coal-fired power plant, which pollutants would decrease? Which impacts would be reduced?" Students trace all paths from the power plant node and write a paragraph explaining the cascading benefits. Repeat for vehicle emissions.

4. **Synthesis Discussion** (10 min): Class discussion on why the Clean Air Act regulates these six specific pollutants. How does the network view help explain why targeting certain sources is more cost-effective than targeting individual pollutants?

### Assessment Questions

1. Explain the difference between a primary pollutant and a secondary pollutant, giving one example of each from the network diagram.
2. Which single pollution source connects to the most criteria pollutants? Why does this make it a high priority for regulation?
3. Trace the complete pathway from vehicle exhaust to acid rain, naming all intermediate steps.
4. Why is ground-level ozone considered a secondary pollutant, and what does this mean for strategies to reduce it?

## References

1. EPA. "Criteria Air Pollutants." [https://www.epa.gov/criteria-air-pollutants](https://www.epa.gov/criteria-air-pollutants)
2. Seinfeld, J.H. & Pandis, S.N. (2016). *Atmospheric Chemistry and Physics*. 3rd ed. Wiley.
3. Jacobson, M.Z. (2012). *Air Pollution and Global Warming: History, Science, and Solutions*. Cambridge University Press.
