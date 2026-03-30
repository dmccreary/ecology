---
title: Waste Management Decision Flowchart
description: Interactive decision tree using vis-network where students navigate waste management choices, comparing environmental impact scores for each pathway.
image: /sims/waste-management-flow/waste-management-flow.png
og:image: /sims/waste-management-flow/waste-management-flow.png
twitter:image: /sims/waste-management-flow/waste-management-flow.png
social:
   cards: false
quality_score: 76
---

# Waste Management Decision Flowchart

<iframe src="main.html" height="600" width="100%" scrolling="no"></iframe>

[Run the Waste Management Decision Flowchart MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim presents the waste hierarchy as an interactive decision flowchart built with vis-network. Starting from "You have waste!", students navigate through a series of branching decision questions: Can you avoid creating this waste? Can you reuse it? Is it recyclable? Is it compostable? Each path leads to a different waste management endpoint -- reduction, reuse, recycling, composting, incineration, or landfill -- with color-coded environmental impact scores ranging from green (best) to red (worst).

The interactive flowchart forces active decision-making rather than passive reading about waste management options. Clicking any node reveals detailed information in a side panel, including estimated decomposition times, energy savings from recycling versus virgin production, and greenhouse gas impacts. This transforms abstract waste hierarchy concepts into concrete, quantitative comparisons.

By exploring multiple paths through the flowchart, students discover that the best environmental outcome always starts at the top of the waste hierarchy (reduce, then reuse) and that options lower on the hierarchy (incineration, landfill) carry significantly higher environmental costs. This experience builds the intuition needed to make better waste decisions in daily life and to evaluate community waste management policies.

## How to Use

1. Start at the top node: "You have waste!" and read the first decision question.
2. Click on decision nodes (diamond shapes) to follow different paths through the flowchart.
3. Click on any **endpoint node** (colored boxes) to see detailed environmental impact information in the side panel.
4. Compare the **environmental impact scores** (green = best, red = worst) across different endpoints.
5. Trace multiple paths to see how different decisions lead to different outcomes.
6. Read the side panel statistics for each option: decomposition time, energy savings, and greenhouse gas impact.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/waste-management-flow/main.html"
        height="600px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science)

### Duration
45 minutes

### Learning Objectives

- Prioritize waste management strategies using the waste hierarchy (reduce, reuse, recycle, compost, incinerate, landfill)
- Evaluate trade-offs between convenience, cost, and environmental impact for each waste management option
- Analyze the environmental consequences of different waste disposal methods
- Apply the waste hierarchy to real-world waste decisions

### Prerequisites

- Basic understanding of solid waste and pollution
- Familiarity with recycling concepts
- Introduction to greenhouse gases and their sources

### Standards Alignment

- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems
- **NGSS HS-ETS1-3**: Evaluate a solution to a complex real-world problem based on prioritized criteria and trade-offs
- **AP Environmental Science**: Topic 8.10 -- Solid Waste Disposal

### Activities

1. **Engage** (5 min): Bring in a bag of typical household waste items (plastic bottle, newspaper, banana peel, old t-shirt, broken electronics). Ask students: What would you do with each of these? Record responses.
2. **Explore** (15 min): Students navigate the flowchart for each waste item from the bag, recording which endpoint they reach and the environmental impact score. They also record the side panel statistics (decomposition time, energy savings) for each endpoint.
3. **Explain** (15 min): Introduce the waste hierarchy formally. Why is reduction better than recycling? Discuss the energy and resource costs at each level. Compare landfill decomposition times (plastic bag: 500+ years) with composting times (banana peel: 2-5 weeks). Discuss why "recycling" is not always the best answer.
4. **Extend** (10 min): Students conduct a mini waste audit of their school lunch. Categorize each waste item using the flowchart and calculate a total environmental impact score. Propose three changes that would move the school's waste profile toward the top of the hierarchy.

### Assessment Questions

1. List the waste hierarchy from most to least environmentally preferable. Why is "reduce" at the top rather than "recycle"?
2. A plastic water bottle can be recycled, but a reusable water bottle eliminates the waste entirely. Compare the environmental impact of these two approaches using evidence from the flowchart.
3. Why might waste-to-energy incineration be preferable to landfilling in some situations? What are its drawbacks?
4. Design a waste reduction plan for your school cafeteria that moves at least three waste streams higher on the waste hierarchy.

## References

1. EPA. "Sustainable Materials Management: Non-Hazardous Materials and Waste Management Hierarchy." [https://www.epa.gov/smm/sustainable-materials-management-non-hazardous-materials-and-waste-management-hierarchy](https://www.epa.gov/smm/sustainable-materials-management-non-hazardous-materials-and-waste-management-hierarchy)
2. McDougall, F.R. et al. (2001). *Integrated Solid Waste Management: A Life Cycle Inventory* (2nd ed.). Blackwell Science.
3. Hoornweg, D. & Bhada-Tata, P. (2012). *What a Waste: A Global Review of Solid Waste Management*. World Bank.
