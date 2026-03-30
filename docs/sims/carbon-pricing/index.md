---
title: Carbon Pricing Comparison
description: Side-by-side simulation comparing carbon tax and cap-and-trade mechanisms, allowing students to adjust policy parameters and observe long-term emissions outcomes.
image: /sims/carbon-pricing/carbon-pricing.png
og:image: /sims/carbon-pricing/carbon-pricing.png
twitter:image: /sims/carbon-pricing/carbon-pricing.png
social:
   cards: false
quality_score: 78
---

# Carbon Pricing Comparison

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Carbon Pricing Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a side-by-side comparison of two major carbon pricing mechanisms: a carbon tax and a cap-and-trade system. On the left side, students set a carbon tax rate in dollars per ton and watch how factories with different abatement cost curves respond by reducing emissions. On the right side, students set an emissions cap and observe how permits trade at a market-determined price.

Each side displays factory icons emitting CO2, a cost or price indicator, a total emissions counter, and a graph tracking emissions over time. The simulation lets students run 10-year projections to see long-term outcomes and overlay both emissions curves for direct comparison. This hands-on approach helps students discover the trade-offs between price certainty (carbon tax) and quantity certainty (cap-and-trade) rather than simply being told about them.

By experimenting with different tax rates and cap levels, students develop an intuition for how economic incentives drive emissions reductions and why policymakers debate these approaches. The comparative format encourages critical evaluation of each mechanism's advantages and limitations.

## How to Use

1. Adjust the **Carbon Tax** slider (0-200 $/ton) on the left panel and observe how factories reduce emissions based on whether the tax exceeds their individual abatement costs.
2. Adjust the **Emissions Cap** slider on the right panel and watch how the permit market establishes a trading price as factories buy and sell allowances.
3. Click **Run 10 Years** to simulate long-term emissions trajectories under both systems simultaneously.
4. Click **Compare** to overlay both emissions curves on a single graph for direct visual comparison.
5. Click **Reset** to return to baseline settings and try different parameter combinations.
6. Try matching the total emissions reduction across both systems and compare which achieves the reduction at lower total cost.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/carbon-pricing/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Economics)

### Duration
45 minutes

### Learning Objectives

- Compare the mechanisms, advantages, and limitations of carbon tax and cap-and-trade systems
- Evaluate how different policy parameters affect emissions reductions and economic costs
- Explain the concepts of price certainty vs. quantity certainty in environmental policy
- Analyze how individual factory cost curves determine the overall effectiveness of each policy

### Prerequisites

- Basic understanding of supply and demand concepts
- Familiarity with greenhouse gas emissions and climate change
- Understanding of the concept of externalities in economics

### Standards Alignment

- **NGSS HS-ESS3-4**: Evaluate or refine a technological solution that reduces impacts of human activities on natural systems.
- **AP Environmental Science**: Topic 9.7 -- Sustainability
- **C3 Framework (Economics)**: D2.Eco.1.9-12 -- Analyze how incentives influence choices

### Activities

1. **Engage** (5 min): Ask students: "If you wanted to reduce pollution from factories, would you rather set a price on pollution or set a limit on total pollution?" Take a class poll and have students justify their choice. Introduce the terms carbon tax and cap-and-trade.

2. **Explore** (15 min): Students work in pairs with the simulation. First, set the carbon tax to $50/ton and record total emissions and cost to industry. Then set the cap to achieve approximately the same emissions level and compare the market price of permits to the tax rate. Try extreme values (very high tax, very low cap) and observe what happens to different factories. Run 10-year projections under each system.

3. **Explain** (15 min): Class discussion comparing results. Key questions: Why do some factories reduce more under the tax than others? What determines the permit price under cap-and-trade? Which system gives government more certainty about revenue? Which gives more certainty about emissions levels? Introduce the concepts of price certainty vs. quantity certainty and discuss real-world examples (EU ETS, British Columbia carbon tax).

4. **Extend** (10 min): Students write a policy brief recommending either a carbon tax or cap-and-trade for their state/country. They must cite evidence from their simulation experiments and address at least one counterargument.

### Assessment Questions

1. Under a carbon tax, why do factories with low abatement costs reduce emissions more than factories with high abatement costs?
2. If the government sets the emissions cap too high, what happens to the permit price and why?
3. A factory can reduce emissions at a cost of $30/ton. Under a $50/ton carbon tax, will it reduce or pay the tax? Explain.
4. Compare the revenue predictability of a carbon tax vs. cap-and-trade from the government's perspective.
5. Which system would you recommend for a country with rapidly growing emissions? Justify your answer using evidence from the simulation.

## References

1. Stavins, R. N. (2020). The Future of US Carbon-Pricing Policy. *Environmental and Energy Policy and the Economy*, 1, 8-64.
2. World Bank. (2024). State and Trends of Carbon Pricing 2024. Washington, DC.
3. Schmalensee, R., & Stavins, R. N. (2017). Lessons Learned from Three Decades of Experience with Cap and Trade. *Review of Environmental Economics and Policy*, 11(1), 59-79.
