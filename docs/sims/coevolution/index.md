---
title: Coevolution Arms Race
description: Generation-by-generation simulation showing how reciprocal selection pressures drive trait escalation between predator and prey populations with adjustable mutation and selection parameters.
image: /sims/coevolution/coevolution.png
og:image: /sims/coevolution/coevolution.png
twitter:image: /sims/coevolution/coevolution.png
social:
   cards: false
quality_score: 82
---

# Coevolution Arms Race

<iframe src="main.html" height="510" width="100%" scrolling="no"></iframe>

[Run the Coevolution Arms Race MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim makes the abstract concept of coevolution visible and interactive by simulating an evolutionary arms race between predator and prey populations over multiple generations. Two populations are displayed side by side: predators (red) and prey (green), each represented by horizontal trait bars. Each generation, individuals interact, and those with advantageous traits are more likely to survive and reproduce with variation, causing both populations to escalate their traits over time.

Trait distribution histograms show the population shift in real time, making natural selection tangible. A generation counter and average trait display track the escalation, and at generation 50 a summary panel pauses the simulation to show how much both traits have increased. Students can adjust mutation rate and selection strength sliders to explore how these evolutionary parameters affect the pace and pattern of the arms race.

The simulation offers two modes that demonstrate coevolution through different trait dimensions:

### Speed Mode

Models a classic predator-prey pursuit arms race, like **cheetahs and gazelles**.

- **Predator Speed** — Faster predators are more likely to catch prey. Natural selection favors predators that can outrun their prey.
- **Prey Speed** — Faster prey are more likely to escape. Natural selection favors prey that can outrun their predators.
- **Result** — Both populations escalate toward higher speeds over generations. Neither side gains a lasting advantage because each improvement by one side creates selection pressure on the other.

### Venom Toxicity Mode

Models a biochemical arms race, like **venomous snakes and their prey** (e.g., kingsnakes vs. rattlesnakes, or coral snakes vs. ground squirrels).

- **Predator Venom Strength** — Predators with more potent venom are more likely to subdue prey. Natural selection favors increasingly toxic venom.
- **Prey Resistance** — Prey with greater physiological resistance to venom are more likely to survive encounters. Natural selection favors increased resistance.
- **Result** — Venom potency and prey resistance escalate together. This explains why some venomous species produce far more toxin than seems necessary for any single prey item — they are locked in an ongoing arms race.

Both modes demonstrate the same underlying evolutionary mechanism: **reciprocal selection pressure** drives continuous trait escalation in both populations, illustrating the Red Queen hypothesis — organisms must keep evolving just to maintain their relative fitness.

## How to Use

1. Click **Start Simulation** to begin and watch predator and prey populations evolve generation by generation.
2. Observe the **trait bars** on each individual — longer bars indicate higher trait values (speed or venom/resistance).
3. Watch the **histograms** shift rightward as both populations escalate their traits over generations.
4. At **generation 50**, the simulation pauses and displays a summary of trait escalation. Click **OK** to dismiss and resume.
5. Adjust the **Mutation Rate** slider to increase or decrease the amount of genetic variation introduced each generation.
6. Adjust the **Selection Strength** slider to control how much the trait difference between predator and prey matters for survival.
7. Click **Step** to advance one generation at a time for careful observation.
8. Select **Speed Mode** or **Venom Toxicity Mode** using the radio buttons to switch between arms race scenarios.
9. Click **Reset** to restart the simulation with fresh populations and observe different evolutionary trajectories.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/coevolution/main.html"
        height="550px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Biology / AP Biology)

### Duration
40 minutes

### Learning Objectives

- Predict how reciprocal selection pressures drive trait escalation in coevolving species
- Explain why neither predator nor prey populations gain a lasting advantage in an evolutionary arms race
- Analyze how mutation rate and selection strength affect the pace and outcome of coevolution
- Compare coevolutionary arms races across different trait dimensions (speed, toxicity)

### Prerequisites

- Understanding of natural selection and how traits are inherited
- Familiarity with the concepts of variation, selection, and reproduction
- Basic understanding of predator-prey relationships

### Standards Alignment

- **NGSS HS-LS4-2**: Construct an explanation based on evidence that the process of evolution primarily results from natural selection.
- **NGSS HS-LS4-3**: Apply concepts of statistics and probability to support explanations that organisms with an advantageous heritable trait tend to increase in proportion to organisms lacking this trait.
- **AP Biology**: Topic 7.1 -- Natural Selection

### Activities

1. **Engage** (5 min): Show images of the rough-skinned newt and the garter snake -- a classic coevolution example where newt toxicity and snake resistance have escalated to extraordinary levels. Ask: Why would a newt be toxic enough to kill almost any predator, yet the garter snake can eat it safely? Introduce the concept of an evolutionary arms race.

2. **Explore** (15 min): Students run the simulation three times with different parameters. Run 1: Default settings, run for 50 generations, record predator and prey average trait values. Run 2: Double the mutation rate, run for 50 generations, compare escalation rate. Run 3: Minimize selection strength, run for 50 generations, observe the difference. Then switch to the toxicity arms race and run for 50 generations. Record results in a comparison table.

3. **Explain** (10 min): Class discussion connecting simulation observations to evolutionary theory. Why do both populations escalate together? What would happen if one population stopped evolving? Introduce the Red Queen hypothesis: organisms must constantly evolve just to maintain their relative fitness. Discuss how this applies to real-world examples: cheetah-gazelle speed, bacteria-immune system, insect-pesticide resistance.

4. **Extend** (10 min): Students predict what would happen if a third species were introduced (e.g., a competing predator). Students sketch a diagram showing how the coevolutionary dynamics might change and write a hypothesis testable with the simulation.

### Assessment Questions

1. After 50 generations, predator and prey average speeds both increased by similar amounts. Why does neither population "win" the arms race?
2. What happened to the rate of trait escalation when you increased the mutation rate? Explain why using evolutionary principles.
3. When selection strength was low, the arms race slowed significantly. Explain this result in terms of differential survival and reproduction.
4. Describe the Red Queen hypothesis and explain how this simulation demonstrates it.
5. Give a real-world example of coevolution and identify the reciprocal selection pressures involved.

## References

1. Dawkins, R., & Krebs, J. R. (1979). Arms Races between and within Species. *Proceedings of the Royal Society B*, 205(1161), 489-511.
2. Brodie, E. D., & Brodie, E. D. (1999). Predator-Prey Arms Races. *BioScience*, 49(7), 557-568.
3. Van Valen, L. (1973). A New Evolutionary Law. *Evolutionary Theory*, 1, 1-30. (The Red Queen hypothesis)
