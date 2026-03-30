---
title: Confidence Interval Visualizer
description: Interactive p5.js simulation where students draw repeated samples from a fish population to build intuition about confidence intervals, margin of error, and sample size effects.
image: /sims/confidence-interval-viz/confidence-interval-viz.png
og:image: /sims/confidence-interval-viz/confidence-interval-viz.png
twitter:image: /sims/confidence-interval-viz/confidence-interval-viz.png
social:
   cards: false
quality_score: 79
---

# Confidence Interval Visualizer

<iframe src="main.html" height="452" width="100%" scrolling="no"></iframe>

[Run the Confidence Interval Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim builds statistical intuition by letting students repeatedly sample from a population of fish with hidden mercury levels and observe how confidence intervals behave. Each time students click "Draw Sample," a new sample of N fish is drawn, producing a mean and confidence interval displayed as a horizontal line with error bars. Multiple samples accumulate vertically, creating a visual stack that reveals the fundamental property of confidence intervals: approximately 95% of 95% confidence intervals contain the true population mean.

A dashed vertical line shows the true population mean, and a horizontal red line marks a safety threshold, connecting statistical concepts to real-world regulatory decisions. Sliders control sample size (10-500) and confidence level (80%-99%). As sample size increases, students observe intervals narrowing. As confidence level increases, intervals widen. Intervals that miss the true mean are highlighted in orange, making the meaning of "95% confidence" concrete and memorable.

This visualization addresses a common source of confusion in scientific literacy: what confidence intervals actually mean and how they should inform decisions about environmental safety standards and risk assessment.

## How to Use

1. Click **Draw Sample** to take a random sample of fish and generate a confidence interval (blue horizontal line with error bars).
2. Click **Draw Sample** repeatedly to accumulate 20-30 intervals stacked vertically. Observe how most (but not all) intervals contain the true mean (green dashed line).
3. Count the orange intervals that miss the true mean. At 95% confidence, approximately 1 in 20 should miss.
4. Adjust the **Sample Size** slider (10-500) and draw new samples. Notice how larger samples produce narrower intervals.
5. Adjust the **Confidence Level** slider (80%-99%) and observe how higher confidence produces wider intervals.
6. Observe the red **safety threshold** line and consider: when a confidence interval crosses this line, can we be confident the population is safe?
7. Click **Reset** to clear all samples and start fresh with different parameter settings.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/confidence-interval-viz/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Environmental Science / Statistics)

### Duration
40 minutes

### Learning Objectives

- Interpret confidence intervals and margin of error in environmental measurements
- Explain the relationship between sample size and the width of confidence intervals
- Describe what it means for a confidence interval to "contain" or "miss" the true population parameter
- Apply understanding of statistical uncertainty to environmental regulatory decisions

### Prerequisites

- Basic understanding of mean, variability, and sampling
- Familiarity with the concept of a population vs. a sample
- Understanding of percentages and probability

### Standards Alignment

- **NGSS Science and Engineering Practice 4**: Analyzing and Interpreting Data
- **NGSS Science and Engineering Practice 5**: Using Mathematics and Computational Thinking
- **AP Environmental Science**: Topic 2.1 -- Introduction to Biodiversity; Data analysis skills
- **Common Core HSS-IC.B.4**: Use data from a sample survey to estimate a population mean

### Activities

1. **Engage** (5 min): Present a scenario: A lake is tested for mercury contamination. One sample of 10 fish shows mercury at 4.8 ppm, just below the 5.0 ppm safety limit. Is the lake safe? Ask students to vote. Then ask: what if we tested 100 fish? 500 fish? Introduce the idea that sample size affects our certainty.

2. **Explore** (15 min): Students draw 30 samples at the default settings (sample size 30, 95% confidence). Count how many intervals contain the true mean (green line) and how many miss it (orange). Record the ratio. Then reset and repeat with sample size 10 -- what changes? Reset and repeat with sample size 200. Finally, keep sample size at 30 but change confidence level to 80%, then 99%. Record observations in a data table.

3. **Explain** (10 min): Class discussion connecting observations to concepts. Why did roughly 5% of 95% confidence intervals miss the true mean? Why do larger samples produce narrower intervals? Why does a 99% confidence interval need to be wider than a 95% interval? Introduce the trade-off between confidence and precision. Connect to the safety threshold: a narrow interval entirely below the line is more reassuring than a wide interval that crosses it.

4. **Extend** (10 min): Present students with a real environmental data scenario: an EPA report states the mercury level in a lake is 4.2 ppm with a 95% confidence interval of (3.8, 4.6). The safety standard is 5.0 ppm. Should the lake be declared safe? What if the interval were (3.0, 5.4)? Students write a brief analysis explaining their reasoning using the statistical concepts from the simulation.

### Assessment Questions

1. You drew 20 samples at the 95% confidence level. One interval did not contain the true mean. Is this result surprising? Explain why or why not.
2. Explain why increasing the sample size from 10 to 500 makes the confidence interval narrower without changing the confidence level.
3. A scientist reports a 99% confidence interval that is very wide. A colleague reports a 95% interval that is narrower. Which provides more certainty about where the true mean lies? Explain the trade-off.
4. The mercury level in a lake is measured at 4.5 ppm with a 95% CI of (4.0, 5.0). The safety limit is 5.0 ppm. Would you declare the lake safe? Justify your answer using confidence interval concepts.
5. Why is it misleading to say "there is a 95% probability that the true mean falls within this confidence interval"? What is the correct interpretation?

## References

1. Cumming, G. (2012). *Understanding the New Statistics: Effect Sizes, Confidence Intervals, and Meta-Analysis*. Routledge.
2. EPA. (2024). Fish and Shellfish Advisories and Safe Eating Guidelines. [epa.gov](https://www.epa.gov/fish-tech)
3. Lock, R. H., et al. (2020). *Statistics: Unlocking the Power of Data* (3rd ed.). Wiley. Chapter on Confidence Intervals.
