---
title: Ecosystem Services Web
description: Interactive vis-network diagram showing the four categories of ecosystem services with interconnections and a "Remove Service" mode to explore cascading effects.
image: /sims/ecosystem-services-web/ecosystem-services-web.png
og:image: /sims/ecosystem-services-web/ecosystem-services-web.png
twitter:image: /sims/ecosystem-services-web/ecosystem-services-web.png
social:
   cards: false
quality_score: 82
---

# Ecosystem Services Web

<iframe src="main.html" height="600" width="100%" scrolling="no"></iframe>

[Run the Ecosystem Services Web Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive network diagram maps the four categories of ecosystem services -- Provisioning, Regulating, Cultural, and Supporting -- along with their specific component services and the connections between them. Large hub nodes represent the four categories, with smaller nodes for specific services like Pollination, Food Production, Water Purification, and Recreation, all connected by labeled edges describing dependencies and relationships.

The most powerful feature is the "Remove Service" mode. When activated, students can click on any service node to remove it and observe cascading effects across the network. Connected services turn yellow (stressed) or red (critically impaired), dramatically illustrating how the loss of a single ecosystem service can destabilize an entire web of interconnected services. For example, removing Pollination stresses Food Production, which in turn affects Provisioning services broadly.

The color coding distinguishes service categories at a glance: green for Provisioning, blue for Regulating, purple for Cultural, and brown for Supporting. Edge labels describe relationships between services. This network visualization makes the abstract concept of ecosystem service interdependence tangible and interactive, supporting the kind of systems thinking that is essential for environmental decision-making.

## How to Use

1. Explore the network by clicking on service nodes to highlight their connections.
2. Note how the four hub nodes (Provisioning, Regulating, Cultural, Supporting) connect to specific services.
3. Read edge labels to understand the relationships between services.
4. Switch to "Remove Service" mode using the mode selector.
5. Click on a service node to remove it and watch cascading effects (yellow = stressed, red = critically impaired).
6. Try removing different services to compare the severity of cascading effects.
7. Click "Reset" to restore all services and try a different removal scenario.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/ecosystem-services-web/main.html"
        height="600px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

50 minutes

### Learning Objectives

- Assess the interconnections among the four categories of ecosystem services
- Predict consequences of losing specific ecosystem services using the network model
- Evaluate which ecosystem services are most critical based on their connectivity
- Explain why Supporting services underpin all other service categories

### Prerequisites

- Understanding of what ecosystems are and how they function
- Introduction to the concept of ecosystem services
- Basic knowledge of biodiversity and its ecological role

### Standards Alignment

- **NGSS HS-LS2-7**: Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment
- **AP Environmental Science**: Topic 2.7 -- Ecosystem Services
- **NGSS HS-ESS3-3**: Create a computational simulation to illustrate the relationships among management of natural resources, the sustainability of human populations, and biodiversity

### Activities

1. **Warm-Up** (5 min): Ask students: "What did nature do for you today?" Students list everything they can think of (clean air, food, water, recreation, etc.). Group responses into the four service categories on the board, introducing the classification framework.

2. **Network Exploration** (10 min): Students explore the full network in "Explore" mode, clicking each hub node and recording all connected specific services. They create a table with four columns (one per category) listing the services and their connections to other categories.

3. **Removal Scenario Analysis** (20 min): In pairs, students switch to "Remove Service" mode and conduct three experiments: (a) Remove a Supporting service and document all cascading effects. (b) Remove a Provisioning service and compare the cascade. (c) Remove a Cultural service and compare. For each, they record which services turn yellow and red. They rank the four categories by "cascade severity."

4. **Policy Application** (15 min): Present a scenario: "A city wants to fill in a wetland for housing development." Students use the network to identify which ecosystem services would be lost, trace the cascading effects, and write a one-page policy recommendation. They must reference at least three specific service connections from the network.

### Assessment Questions

1. Name and define the four categories of ecosystem services and give two examples of each.
2. Why are Supporting services sometimes called the "foundation" of all ecosystem services? Use evidence from the network diagram.
3. You removed Pollination from the network. Describe the cascade of effects that followed and explain why each connection makes ecological sense.
4. A developer argues that losing one wetland is not significant because there are other wetlands nearby. Use the ecosystem services web to construct a counter-argument.
5. Which single service removal caused the most widespread cascading effects in your experiments? Why do you think this service is so critical?

## References

1. Millennium Ecosystem Assessment. (2005). *Ecosystems and Human Well-being: Synthesis*. Island Press.
2. Costanza, R., et al. (1997). "The Value of the World's Ecosystem Services and Natural Capital." *Nature* 387: 253-260.
3. Daily, G.C. (1997). *Nature's Services: Societal Dependence on Natural Ecosystems*. Island Press.
