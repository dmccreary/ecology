---
title: Sample Size Effect on Reliability
description: Interactive p5.js MicroSim demonstrating how sample size affects the reliability of ecological sampling estimates through repeated sampling visualization.
image: /sims/sample-size-effect/sample-size-effect.png
og:image: /sims/sample-size-effect/sample-size-effect.png
twitter:image: /sims/sample-size-effect/sample-size-effect.png
social:
   cards: false
quality_score: 78
---

# Sample Size Effect on Reliability

<iframe src="main.html" height="442" width="100%" scrolling="no"></iframe>

[Run the Sample Size Effect on Reliability MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates one of the most important concepts in scientific literacy: why sample size matters. A population of 10,000 organisms has a true survival rate (default 60%) that students try to estimate by drawing samples of various sizes. Each sample's estimated survival rate is plotted as a dot on a number line, color-coded by distance from the true value.

With small samples (N=5), the dots scatter wildly across the number line -- some samples suggest 100% survival while others suggest 0%. With large samples (N=500), the dots cluster tightly around the true value. A histogram accumulates showing the distribution of estimates, and key statistics (range, standard deviation, percentage within 5% of truth) update in real time.

A "headlines" panel generates fake news headlines from extreme samples, illustrating how cherry-picking small studies can produce misleading conclusions. This makes the abstract statistical concept tangible and connects directly to scientific literacy skills that students need for evaluating ecological research claims.

## How to Use

1. Observe the true survival rate marked as a blue line on the number line.
2. Adjust the **Sample Size slider** (5-500) to set how many organisms are sampled each time.
3. Click **Take Sample** to draw one random sample and see the estimate plotted as a dot.
4. Click **Auto Sample** to rapidly draw many samples and watch the distribution build.
5. Compare the spread of dots at small sample sizes (5-10) vs. large sample sizes (200-500).
6. Watch the statistics panel: range, standard deviation, and percentage of samples near the true value.
7. Read the generated "headlines" panel to see how small samples produce misleading conclusions.
8. Click **Reset** to clear all samples and try a different sample size.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/sample-size-effect/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Environmental Science)

### Duration
40 minutes

### Learning Objectives

- Compare the reliability of conclusions drawn from small versus large sample sizes.
- Explain why larger samples produce more reliable estimates of population parameters.
- Evaluate ecological research claims by considering sample size and variability.
- Recognize how misleading conclusions can arise from small or cherry-picked samples.

### Prerequisites

- Basic understanding of averages and percentages
- Familiarity with the concept of sampling in ecology (mark-recapture, quadrats)
- Understanding that scientists study samples because they cannot measure entire populations

### Standards Alignment

- **NGSS Practice 4**: Analyzing and Interpreting Data
- **NGSS Practice 5**: Using Mathematics and Computational Thinking
- **AP Environmental Science**: Science Practices - Data Analysis

### Activities

1. **Engage** (5 min): Show two real contradictory headlines about the same ecological topic (e.g., "Bee Populations Thriving!" vs. "Bee Populations Collapsing!"). Ask how both could be published. Introduce the idea that sample size and sampling method determine what conclusions you can draw.

2. **Explore** (15 min): Students take 20 samples at N=5 and record the range and standard deviation. Then they reset and take 20 samples at N=100, recording the same statistics. They repeat at N=500. Students create a table comparing sample size to variability.

3. **Explain** (10 min): Discuss the law of large numbers and why larger samples converge on the true value. Introduce the concept of confidence intervals. Explain why ecological studies specify sample sizes and why peer reviewers check them. Connect to real sampling methods: how many quadrats do you need? How many fish must you tag?

4. **Extend** (10 min): Students read the "headlines" generated from extreme small samples and write a paragraph explaining why a single small study should not drive policy decisions. They propose a minimum sample size for a hypothetical study of frog survival rates in a local pond.

### Assessment Questions

1. Why do small samples produce more variable estimates than large samples?
2. A news article claims "Species X survival rate is 90%!" based on a study of 8 animals. How confident should you be in this conclusion? Explain.
3. An ecologist wants to estimate the percentage of trees infected by a beetle in a national forest. Would a sample of 10 trees or 500 trees give a more reliable estimate? Why?
4. How does understanding sample size help you evaluate claims about environmental issues in the news?

## References

1. Gotelli, N.J. & Ellison, A.M. (2013). *A Primer of Ecological Statistics*, 2nd ed. Sinauer Associates.
2. Krebs, C.J. (2014). *Ecology: The Experimental Analysis of Distribution and Abundance*, 6th ed. Pearson.
3. Ioannidis, J.P.A. (2005). Why most published research findings are false. *PLoS Medicine*, 2(8), e124.
