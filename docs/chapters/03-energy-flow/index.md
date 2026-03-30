---
title: "Energy Flow in Ecosystems"
description: "How energy enters, moves through, and exits ecosystems — from solar input and primary productivity to thermodynamic constraints and trophic efficiency."
generated_by: claude skill chapter-content-generator
date: 2026-03-29
version: 0.06
---

# Chapter 3: Energy Flow in Ecosystems

## Summary

This chapter examines how energy enters, moves through, and exits ecosystems. Students learn to calculate primary productivity, distinguish between autotrophs and heterotrophs, and understand why ecosystems lose energy at each trophic level. After completing this chapter, students will be able to compare gross and net primary productivity and explain thermodynamic constraints on ecosystem energy budgets.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Primary Productivity
2. Gross Primary Productivity
3. Net Primary Productivity
4. Biomass
5. Autotrophs
6. Heterotrophs
7. Chemosynthesis
8. Thermodynamics in Ecology
9. Entropy in Ecosystems
10. Solar Energy Input
11. Energy Loss as Heat
12. Trophic Efficiency
13. Net Ecosystem Production

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Ecology](../01-foundations-of-ecology/index.md)
- [Chapter 2: Ecosystems and Biomes](../02-ecosystems-and-biomes/index.md)

---

!!! mascot-welcome "Bailey Says: Welcome, Builders!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img">
    Welcome back, explorers! In the last chapter, we toured Earth's biomes and learned the ten percent rule. Now we're going to dig deeper — way deeper — into the *why* behind energy flow. Why does energy always flow one way? Why can't ecosystems recycle energy the way they recycle nutrients? The answers involve physics, chemistry, and some seriously cool math. **Everything's connected** — even physics and ecology! Let's go!

## The Sun: Earth's Energy Engine

Every ecosystem on Earth runs on energy, and almost all of that energy comes from a single source: the sun. Every second, the sun fuses about 600 million tons of hydrogen into helium, releasing energy that radiates outward in all directions. A tiny fraction of that energy — about one two-billionth — reaches Earth.

Even that tiny fraction is enormous. The **solar energy input** to Earth's surface averages about \(1,361 \text{ W/m}^2\) at the top of the atmosphere (the solar constant). After accounting for reflection by clouds and the atmosphere, roughly **47% of incoming solar radiation** reaches Earth's surface.

But here's the critical bottleneck: of all the solar energy that hits Earth's surface, plants and other photosynthetic organisms capture only about **1–2%** of it. That small percentage powers virtually every food chain, every ecosystem, and every living thing on the planet (with a few fascinating exceptions we'll explore later).

Why so little? Several reasons:

- Much of Earth's surface is ocean, desert, or ice with sparse vegetation
- Light hits leaves at varying angles, and not all wavelengths are usable
- Photosynthesis itself is limited by water, CO\(_2\), and temperature
- Only certain wavelengths of light (400–700 nm, called **photosynthetically active radiation** or PAR) drive photosynthesis

#### Diagram: Solar Energy Budget

<iframe src="../../sims/solar-energy-budget/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Solar Energy Budget</summary>
Type: microsim
**sim-id:** solar-energy-budget<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand
**Bloom Verb:** Trace
**Learning Objective:** Students trace the path of solar energy from the sun to its capture by producers, accounting for losses at each step.
**Instructional Rationale:** A Sankey-style flow diagram makes abstract energy quantities tangible and shows why such a small fraction of solar energy enters ecosystems.

A Sankey diagram showing solar energy flowing from left to right. Starting value: 100 units of incoming solar radiation. Branches split at each loss point: reflected by atmosphere (6%), reflected by clouds (20%), absorbed by atmosphere (16%), reflected by surface (4%), absorbed by surface but not captured by plants (53%), captured by photosynthesis (~1%). Each branch is a colored flow ribbon with width proportional to energy amount. Hovering over any branch shows the exact percentage and a brief explanation. The photosynthesis ribbon leads to a "Producers" box that glows green. A slider lets users adjust cloud cover to see how it affects the energy reaching producers. Canvas 800×450. Responsive.
</details>

## Autotrophs: The Self-Feeders

**Autotrophs** are organisms that produce their own food from inorganic raw materials. The word comes from Greek: *auto* (self) + *trophe* (nourishment). Autotrophs are the foundation of every ecosystem because they convert inorganic energy (sunlight or chemical energy) into organic molecules that all other life depends on.

There are two types of autotrophs:

**Photoautotrophs** use sunlight as their energy source. They include:

- Plants (the dominant producers on land)
- Algae (the dominant producers in most aquatic ecosystems)
- Cyanobacteria (the original oxygen-producing photosynthesizers, dating back 2.7 billion years)

**Chemoautotrophs** use chemical energy from inorganic compounds. We'll explore these remarkable organisms in detail shortly.

The chemical equation for photosynthesis is one of the most important in all of biology:

\[
6\text{CO}_2 + 6\text{H}_2\text{O} + \text{light energy} \rightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2
\]

This equation tells a beautiful story: plants take two of the simplest, most abundant molecules on Earth (carbon dioxide and water), add sunlight, and build sugar — the energy currency of life. Oxygen is released as a byproduct. Every breath you take exists because of this reaction.

## Heterotrophs: The Other-Feeders

**Heterotrophs** are organisms that cannot make their own food. They must consume organic molecules produced by other organisms. The word comes from Greek: *hetero* (other) + *trophe* (nourishment).

Heterotrophs include:

- **Herbivores:** Eat producers (cows, caterpillars, parrotfish)
- **Carnivores:** Eat other consumers (wolves, sharks, dragonflies)
- **Omnivores:** Eat both producers and consumers (bears, humans, crows)
- **Detritivores:** Eat dead organic matter (earthworms, dung beetles, millipedes)
- **Decomposers:** Break down dead matter at the molecular level (fungi, bacteria)

Heterotrophs obtain energy through **cellular respiration**, which is essentially the reverse of photosynthesis:

\[
\text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2 \rightarrow 6\text{CO}_2 + 6\text{H}_2\text{O} + \text{ATP (energy)}
\]

Notice the elegant symmetry: photosynthesis builds glucose from CO\(_2\) and water using light energy; respiration breaks glucose apart, releasing CO\(_2\), water, and usable energy (ATP). This is not a coincidence — it's a fundamental feature of how energy cycles through the biosphere.

!!! mascot-thinking "Bailey Says: Think About It!"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img">
    Dam, that's elegant! Photosynthesis and respiration are mirror images of each other. One builds; the other breaks down. One stores energy; the other releases it. But here's the key insight: while *matter* cycles back and forth between these two reactions, *energy* flows in only one direction — from the sun, through organisms, and eventually out as heat. **See how it all fits together?**

## Chemosynthesis: Life Without Sunlight

Not all autotrophs need sunlight. In 1977, scientists in a deep-sea submersible discovered thriving ecosystems around hydrothermal vents on the ocean floor — in complete darkness, under crushing pressure, in water heated to over 400°C. How was this possible?

The answer is **chemosynthesis** — the process of using chemical energy from inorganic molecules (like hydrogen sulfide, methane, or ammonia) to produce organic compounds. Chemosynthetic bacteria at hydrothermal vents use this reaction:

\[
6\text{CO}_2 + 6\text{H}_2\text{O} + 3\text{H}_2\text{S} \rightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 3\text{H}_2\text{SO}_4
\]

These bacteria form the base of an entirely independent food web. Giant tube worms (up to 2 meters long!) harbor billions of chemosynthetic bacteria inside their bodies in a mutualistic relationship. The tube worm provides hydrogen sulfide from vent water; the bacteria provide sugar.

Chemosynthesis has profound implications:

- It proves that life doesn't require sunlight — expanding the possibilities for extraterrestrial life
- Vent communities may represent some of the oldest ecosystems on Earth
- Similar processes occur in caves, deep underground, and in cold seeps on the ocean floor

## The Physics of Ecosystems: Thermodynamics

To truly understand why energy flows the way it does in ecosystems, we need to borrow two fundamental laws from physics. Don't worry — Bailey's here to help make these approachable.

### The First Law of Thermodynamics

The first law states: **Energy cannot be created or destroyed, only converted from one form to another.** In ecological terms, this means:

- The total amount of energy entering an ecosystem must equal the total amount leaving it (plus what's stored)
- When a plant converts sunlight into glucose, it hasn't *created* energy — it has *transformed* light energy into chemical energy
- When a hawk eats a mouse, chemical energy in the mouse's tissues is converted to chemical energy in the hawk's tissues, plus heat

This principle, applied to ecology, is what we call **thermodynamics in ecology**. It means we can track energy through ecosystems like accountants track money — every joule must be accounted for.

### The Second Law of Thermodynamics

The second law states: **Every energy conversion increases the total entropy (disorder) of the universe.** No energy conversion is 100% efficient — some energy is always "lost" as heat.

This is the law that shapes everything about ecosystem structure. It explains:

- Why energy pyramids always narrow at the top
- Why there are more plants than herbivores, and more herbivores than carnivores
- Why food chains rarely exceed 4–5 links
- Why ecosystems need a constant input of energy from the sun

**Entropy in ecosystems** is the tendency for energy to become more dispersed and less available to do work. Every time energy is transferred between organisms — from producer to herbivore to carnivore — some of it degrades into low-quality heat that dissipates into the environment. This heat cannot be recaptured or recycled. It's gone.

This is the fundamental difference between energy and matter in ecosystems. **Matter cycles; energy flows.** Nitrogen, carbon, and water circulate endlessly through ecosystems. But energy takes a one-way trip: in from the sun, out as heat. Ecosystems are open systems with respect to energy.

!!! mascot-encourage "Bailey Says: You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img">
    Thermodynamics can sound intimidating, but here's the core idea in plain language: **every time energy changes form, some of it becomes heat you can't use again.** That's it! That single principle explains why the ten percent rule exists, why top predators are rare, and why all life on Earth depends on a constant stream of fresh energy from the sun. **Let's build on that!**

## Primary Productivity: Measuring Ecosystem Energy

Now let's learn how ecologists measure the energy that enters and flows through ecosystems. The key concept is **primary productivity** — the rate at which producers convert inorganic energy into organic compounds.

### Gross Primary Productivity (GPP)

**Gross primary productivity** (GPP) is the total amount of energy (or carbon) fixed by producers through photosynthesis (or chemosynthesis) per unit area per unit time. Think of GPP as the *total revenue* of an ecosystem — all the energy coming in before any expenses.

GPP is typically measured in:

- grams of carbon per square meter per year (g C/m\(^2\)/yr)
- kilocalories per square meter per year (kcal/m\(^2\)/yr)
- grams of oxygen released per square meter per year

### Net Primary Productivity (NPP)

Producers don't get to keep all the energy they fix. They must use some of it for their own life processes — growth, maintenance, reproduction, and defense. The energy used by producers for their own respiration (\(R_a\)) is subtracted from GPP to give **net primary productivity** (NPP):

\[
\text{NPP} = \text{GPP} - R_a
\]

Where \(R_a\) is autotroph respiration.

NPP represents the energy available to all other organisms in the ecosystem — herbivores, carnivores, decomposers, everyone. It's the "profit" after the producers have paid their metabolic "bills."

Typically, producers use about 40–70% of their GPP for respiration, meaning NPP is only 30–60% of GPP. Here's what that looks like:

| Ecosystem Type | GPP (g C/m²/yr) | NPP (g C/m²/yr) | NPP/GPP Ratio |
|---------------|-----------------|-----------------|---------------|
| Tropical Rainforest | 3,500 | 2,200 | 63% |
| Temperate Forest | 2,500 | 1,200 | 48% |
| Grassland | 1,500 | 600 | 40% |
| Open Ocean | 250 | 125 | 50% |
| Desert | 150 | 90 | 60% |
| Tundra | 150 | 65 | 43% |

Notice something surprising: the open ocean has low productivity per square meter, but because it covers 71% of Earth's surface, it accounts for nearly **half** of all global NPP. Meanwhile, tropical rainforests are the most productive per unit area, but they cover a much smaller area.

#### Diagram: Global NPP Heatmap

<iframe src="../../sims/global-npp-map/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Global NPP Heatmap</summary>
Type: microsim
**sim-id:** global-npp-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze
**Bloom Verb:** Compare
**Learning Objective:** Students compare net primary productivity across different biomes and explain why some regions are more productive than others.
**Instructional Rationale:** A color-coded world map makes geographic patterns in productivity visually obvious and invites students to hypothesize about limiting factors.

A simplified world map with regions colored by NPP value using a gradient from brown (low: desert, tundra, open ocean) through yellow (moderate: grasslands, temperate regions) to dark green (high: tropical rainforests, estuaries). Hovering over a region displays: biome name, NPP in g C/m²/yr, limiting factors (light, water, nutrients, temperature). A bar chart below the map shows total NPP contribution by biome (area × NPP per m²), revealing the ocean's outsized contribution. A toggle switches between "per square meter" and "total contribution" views. Canvas 800×550. Responsive.
</details>

### Biomass

**Biomass** is the total mass of living organic matter in an ecosystem at a given time, usually measured in grams or kilograms per square meter (g/m\(^2\) or kg/m\(^2\)). Biomass is a *standing crop* — a snapshot of how much living material exists right now.

Biomass and productivity are related but different:

- **Productivity** is a rate (how fast new biomass is produced)
- **Biomass** is a quantity (how much biomass exists at one moment)

A fast-growing ecosystem can have low biomass if organisms are consumed or decompose quickly. Phytoplankton in the ocean have extremely high productivity but low biomass because they reproduce and die rapidly. In contrast, a redwood forest has enormous biomass but relatively modest productivity per unit of standing biomass.

This distinction explains a counterintuitive fact: in many ocean ecosystems, the biomass of consumers (zooplankton) can actually exceed the biomass of producers (phytoplankton) at any given moment. This "inverted biomass pyramid" occurs because phytoplankton reproduce so rapidly that their productivity still exceeds consumer demand, even though their standing biomass is small.

!!! mascot-thinking "Bailey Says: Think About It!"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img">
    Wood you believe that a lake can have *more* animal mass than plant mass and still function perfectly? It's like a bakery that sells bread faster than it accumulates on the shelves — the oven (productivity) matters more than the display case (biomass). **Everything's connected** — you can't understand one without the other!

## Energy Loss as Heat

At every step in an ecosystem, energy is lost as heat. This **energy loss as heat** is not a design flaw — it's an unavoidable consequence of the second law of thermodynamics. Every metabolic reaction, every muscle contraction, every chemical transformation releases heat.

Let's trace energy through a simple food chain to see where it goes:

**Step 1: Sunlight hits a plant.**
Of 1,000,000 kcal of solar energy reaching one square meter of forest per year, the plant captures about 10,000 kcal (1%) through photosynthesis. This is the GPP.

**Step 2: The plant uses energy for its own needs.**
The plant uses about 5,000 kcal for respiration (growth, maintenance, defense). This energy is released as heat. The remaining 5,000 kcal becomes NPP — new leaves, stems, roots, seeds.

**Step 3: A caterpillar eats some leaves.**
The caterpillar consumes 500 kcal of plant material. Of that:

- 100 kcal passes through as feces (undigested material)
- 300 kcal is used for respiration and lost as heat
- 100 kcal becomes new caterpillar biomass (growth)

**Step 4: A bird eats the caterpillar.**
The bird gets 100 kcal. Of that:

- 25 kcal lost as feces and urine
- 60 kcal used for respiration and lost as heat
- 15 kcal becomes new bird biomass

At each step, heat escapes into the environment. This heat warms the air, the soil, the water — and eventually radiates into space. It cannot be recaptured by any organism. This is why ecosystems require a constant input of fresh solar energy.

#### Diagram: Energy Flow Tracker

<iframe src="../../sims/energy-flow-tracker/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Energy Flow Tracker</summary>
Type: microsim
**sim-id:** energy-flow-tracker<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze
**Bloom Verb:** Trace
**Learning Objective:** Students trace energy through a food chain, accounting for respiration, waste, and transfer at each trophic level.
**Instructional Rationale:** An animated flow diagram with branching energy paths lets students see exactly where energy goes at each step, making the abstract concept of energy loss concrete.

An animated energy flow diagram showing energy moving left to right through 4 trophic levels. At each level, the flow splits into three branches: respiration/heat (upward red arrows), waste/feces (downward brown arrows), and transfer to next level (forward green arrow). Animated particles flow along paths to represent energy movement. A slider controls initial solar energy input. Each organism box shows: energy in, energy out (respiration, waste, transfer), and efficiency percentage. Running totals display cumulative heat loss. A "pause" button lets students examine any stage. A pie chart at each level shows the proportion going to heat, waste, and growth. Canvas 800×500. Responsive.
</details>

## Trophic Efficiency

**Trophic efficiency** is the percentage of energy transferred from one trophic level to the next. It's a more precise version of the "ten percent rule" we learned in Chapter 2. In reality, trophic efficiency varies considerably:

| Organism Type | Typical Trophic Efficiency |
|--------------|---------------------------|
| Endotherms (warm-blooded) | 1–5% |
| Ectotherms (cold-blooded) | 5–15% |
| Insects | 10–20% |
| Aquatic invertebrates | 10–25% |

Why the variation? **Endotherms** (mammals and birds) burn enormous amounts of energy just to maintain body temperature. A mouse might use 98% of its food energy on metabolism and convert only 2% into new body mass. An insect, which doesn't regulate body temperature, can convert a much higher percentage of food into growth.

This has real ecological consequences. Ecosystems dominated by ectothermic consumers (like coral reefs and tropical forests full of insects and reptiles) can support more trophic levels than ecosystems dominated by endothermic consumers (like African savannas full of mammals).

The formula for trophic efficiency is:

\[
\text{Trophic Efficiency} = \frac{\text{Production at trophic level } n}{\text{Production at trophic level } n-1} \times 100\%
\]

### A Worked Example

Suppose a grassland ecosystem has the following energy values:

- Producers (grasses): NPP = 20,000 kcal/m\(^2\)/yr
- Primary consumers (grasshoppers): Production = 2,400 kcal/m\(^2\)/yr
- Secondary consumers (frogs): Production = 240 kcal/m\(^2\)/yr
- Tertiary consumers (snakes): Production = 12 kcal/m\(^2\)/yr

Trophic efficiencies:

- Level 1 → 2: \(\frac{2,400}{20,000} \times 100\% = 12\%\)
- Level 2 → 3: \(\frac{240}{2,400} \times 100\% = 10\%\)
- Level 3 → 4: \(\frac{12}{240} \times 100\% = 5\%\)

Notice how efficiency drops at higher levels. Snakes (ectotherms) are more efficient than warm-blooded predators would be, but the overall pattern of declining efficiency holds. From the original 20,000 kcal, only 12 kcal reaches the top predator — that's **0.06%** of the original energy.

!!! mascot-tip "Bailey Says: Pro Tip!"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img">
    Here's a handy shortcut for trophic efficiency calculations. If the average efficiency is 10%, just move the decimal point one place to the left for each trophic level: 10,000 → 1,000 → 100 → 10. If the efficiency is 20%, multiply by 0.2 at each step. Real ecologists use the actual measured efficiencies, which vary by species and ecosystem. **Let's build on that!**

## Net Ecosystem Production

So far we've talked about NPP — the energy available to the ecosystem after producers pay their respiratory bills. But what about *all* the respiration in an ecosystem, including consumers and decomposers?

**Net ecosystem production** (NEP) is the total amount of organic matter accumulated by an ecosystem after accounting for respiration by *all* organisms:

\[
\text{NEP} = \text{GPP} - R_{\text{total}}
\]

Where \(R_{\text{total}}\) includes respiration by autotrophs, heterotrophs, and decomposers.

Alternatively:

\[
\text{NEP} = \text{NPP} - R_h
\]

Where \(R_h\) is heterotroph respiration (consumers + decomposers).

NEP tells us whether an ecosystem is gaining or losing carbon:

- **NEP > 0:** The ecosystem is a *carbon sink* — it's storing more carbon than it releases. Young, growing forests are strong carbon sinks.
- **NEP = 0:** The ecosystem is in *carbon balance* — inputs equal outputs. Mature, old-growth forests are often near carbon balance.
- **NEP < 0:** The ecosystem is a *carbon source* — it's releasing more carbon than it stores. This can happen after a wildfire, during drought, or due to deforestation.

Understanding NEP is critical for climate science. Earth's ecosystems collectively act as a carbon sink, absorbing about 25–30% of human CO\(_2\) emissions. But if ecosystems shift from sinks to sources — due to warming, drought, or disturbance — it would accelerate climate change in a dangerous positive feedback loop.

#### Diagram: Ecosystem Carbon Budget Calculator

<iframe src="../../sims/carbon-budget-calc/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ecosystem Carbon Budget Calculator</summary>
Type: microsim
**sim-id:** carbon-budget-calc<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate
**Bloom Verb:** Calculate
**Learning Objective:** Students calculate GPP, NPP, and NEP for different ecosystem scenarios and determine whether an ecosystem is a carbon sink or source.
**Instructional Rationale:** An interactive calculator with adjustable parameters lets students explore how changing conditions (warming, drought, fire) shift the carbon balance, connecting productivity concepts to real-world climate implications.

A dashboard with three panels. Left panel: ecosystem selector dropdown (tropical forest, temperate forest, grassland, ocean, tundra) that sets default GPP, autotroph respiration, and heterotroph respiration values. Center panel: three sliders to adjust GPP, Ra (autotroph respiration), and Rh (heterotroph respiration). A "disturbance" button set (fire, drought, warming) modifies parameters realistically. Right panel: real-time calculation display showing GPP, NPP = GPP - Ra, NEP = NPP - Rh, with a color-coded indicator: green for carbon sink (NEP > 0), red for carbon source (NEP < 0), yellow for balance. A bar chart visualizes the relative sizes of GPP, Ra, Rh, and NEP. Canvas 800×500. Responsive.
</details>

## Source-Checking Spotlight

Claims about ecosystem productivity and carbon storage appear frequently in climate debates. Here's a critical thinking exercise:

**Claim:** "Planting a trillion trees will solve climate change."

This claim went viral after a 2019 study in *Science* estimated that Earth has room for 0.9 billion hectares of new forest canopy. Let's evaluate it:

1. **Find the original study.** Bastin et al. (2019) in *Science* — a peer-reviewed, reputable journal. Good start.
2. **Look for critiques.** Multiple response papers pointed out flaws: the study overestimated available land, underestimated how long trees take to grow, and didn't account for albedo changes (dark forests absorb more heat than light grasslands).
3. **Check the math.** New forests take 50–100 years to reach peak carbon storage. Meanwhile, fossil fuel emissions continue at record pace. Planting trees is helpful but cannot substitute for reducing emissions.
4. **Apply what you've learned.** NPP varies enormously by biome and climate. A tree planted in a tropical rainforest stores carbon much faster than one planted in the taiga. Location matters.

The takeaway: tree planting is valuable but is one tool among many, not a silver bullet. Scientific literacy means looking beyond headlines to understand the assumptions, limitations, and context of any claim.

## Putting It All Together: The Energy Budget of an Ecosystem

Let's build a complete energy budget for a temperate forest ecosystem, synthesizing everything we've learned:

**Energy Input:**

- Solar radiation reaching the forest: 1,000,000 kcal/m\(^2\)/yr
- Energy captured by photosynthesis (GPP): 12,000 kcal/m\(^2\)/yr (1.2%)

**Producer Energy Budget:**

- Autotroph respiration (\(R_a\)): 7,000 kcal/m\(^2\)/yr
- Net Primary Productivity (NPP): 5,000 kcal/m\(^2\)/yr

**Consumer and Decomposer Energy Budget:**

- Consumed by herbivores: 500 kcal/m\(^2\)/yr
- Consumed by decomposers: 4,000 kcal/m\(^2\)/yr
- Heterotroph respiration (\(R_h\)): 4,200 kcal/m\(^2\)/yr

**Net Ecosystem Production:**

- NEP = NPP - \(R_h\) = 5,000 - 4,200 = **800 kcal/m\(^2\)/yr**

This forest is a carbon sink — it's storing 800 kcal/m\(^2\)/yr more than it releases. That stored energy accumulates as wood, leaf litter, and soil organic matter.

Notice the accounting: of the original 1,000,000 kcal of solar energy, only 800 kcal (0.08%) ends up stored in the ecosystem. The rest is either reflected, not captured by photosynthesis, or released as heat through respiration. The second law of thermodynamics is relentless.

#### Diagram: Complete Ecosystem Energy Budget

<iframe src="../../sims/ecosystem-energy-budget/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete Ecosystem Energy Budget</summary>
Type: microsim
**sim-id:** ecosystem-energy-budget<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Create
**Bloom Verb:** Construct
**Learning Objective:** Students construct a complete energy budget for an ecosystem, tracing energy from solar input through GPP, NPP, and NEP.
**Instructional Rationale:** A comprehensive flow diagram with editable values lets students build the energy budget themselves, reinforcing the relationships between all productivity concepts in a single integrated view.

A comprehensive flow diagram showing the complete energy budget. Solar energy enters from the top. A large box represents producers, with GPP entering and two exits: Ra (heat arrow going up-right) and NPP (arrow going down). NPP splits into: consumed by herbivores, consumed by decomposers, and stored as NEP. Consumer boxes show further energy splits into Rh (heat) and secondary production. All heat arrows converge into a "Total Heat Loss" counter. Students can click on any value to edit it; the diagram recalculates all downstream values automatically and highlights inconsistencies in red. A "balance check" verifies that Energy In = Energy Out + Energy Stored. Ecosystem presets available via dropdown. Canvas 800×600. Responsive.
</details>

!!! mascot-thinking "Bailey Says: Systems Thinking!"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img">
    Look at that energy budget one more time. Decomposers process 4,000 out of 5,000 kcal of NPP — that's **80%** of all the energy available to heterotrophs! Decomposers really are the unsung heroes. Without them, nutrients would pile up in dead matter and the whole system would collapse. Dam, that's a critical connection! **Everything's connected!**

## Why This Matters: Real-World Connections

Understanding energy flow isn't just academic — it has urgent practical applications:

**Agriculture and food security.** Humans redirect a significant portion of Earth's NPP for our own use. Estimates suggest we appropriate about 25–40% of terrestrial NPP through agriculture, forestry, and land conversion. As the human population grows, understanding the limits of NPP helps us plan sustainable food systems.

**Climate change.** NEP determines whether ecosystems absorb or release CO\(_2\). As temperatures rise, plant respiration increases faster than photosynthesis in many ecosystems, potentially turning carbon sinks into carbon sources — a dangerous positive feedback loop.

**Renewable energy.** Biofuels are ultimately limited by NPP. Understanding trophic efficiency explains why eating plants is more energy-efficient than eating animals that ate plants — a principle relevant to both personal diet choices and global food policy.

**Conservation.** Protecting high-NPP ecosystems (tropical forests, wetlands, estuaries) preserves the energy base that supports the greatest biodiversity. Ecosystem productivity is a foundation for all the ecological services humans depend on.

## Chapter Summary

In this chapter, you explored the physics and biology of energy flow in ecosystems. You learned that nearly all ecosystem energy comes from **solar energy input**, captured by **autotrophs** through photosynthesis (or by chemoautotrophs through **chemosynthesis**). **Heterotrophs** obtain energy by consuming other organisms.

The **first and second laws of thermodynamics** govern energy flow. Energy cannot be created or destroyed, but every conversion increases **entropy** and results in **energy loss as heat**. This is why ecosystems need constant solar input and why energy flows one way.

You learned to measure ecosystem energy using **primary productivity**: **gross primary productivity** (GPP) is total energy fixed; **net primary productivity** (NPP) is what remains after producer respiration. **Biomass** is the standing stock of organic matter. **Trophic efficiency** measures how effectively energy transfers between trophic levels. **Net ecosystem production** (NEP) accounts for all respiration and tells us whether an ecosystem is a carbon sink or source.

The key insight: energy flows, matter cycles. Every joule of energy that enters an ecosystem will eventually leave as heat. The structure of every food web, the number of trophic levels, the relative abundance of predators and prey — all are consequences of thermodynamics.

---

??? question "Self-Test: Check Your Understanding"

    **1.** What is the difference between GPP and NPP?

    ??? success "Answer"
        GPP (Gross Primary Productivity) is the total energy fixed by producers through photosynthesis. NPP (Net Primary Productivity) is GPP minus autotroph respiration — the energy actually available to the rest of the ecosystem. NPP = GPP - Ra.

    **2.** Why is energy lost as heat at every trophic level?

    ??? success "Answer"
        The second law of thermodynamics states that no energy conversion is 100% efficient. Every metabolic reaction releases some energy as heat, which dissipates into the environment and cannot be recaptured by organisms.

    **3.** A forest has GPP of 15,000 kcal/m²/yr, autotroph respiration of 9,000 kcal/m²/yr, and heterotroph respiration of 4,500 kcal/m²/yr. Calculate NPP and NEP. Is this ecosystem a carbon sink or source?

    ??? success "Answer"
        NPP = GPP - Ra = 15,000 - 9,000 = **6,000 kcal/m²/yr**
        NEP = NPP - Rh = 6,000 - 4,500 = **1,500 kcal/m²/yr**
        Since NEP > 0, this ecosystem is a **carbon sink**.

    **4.** How does chemosynthesis differ from photosynthesis?

    ??? success "Answer"
        Photosynthesis uses light energy to convert CO₂ and H₂O into organic compounds. Chemosynthesis uses chemical energy from inorganic molecules (like hydrogen sulfide) to produce organic compounds. Both are autotrophic processes, but chemosynthesis does not require sunlight.

    **5.** Why do endotherms have lower trophic efficiency than ectotherms?

    ??? success "Answer"
        Endotherms (warm-blooded animals) use a large portion of their food energy to maintain constant body temperature through metabolic heat production. This leaves less energy available for growth and reproduction. Ectotherms don't spend energy on body temperature regulation, so they convert a higher percentage of consumed energy into biomass.

    **6.** Explain why matter cycles but energy flows in ecosystems.

    ??? success "Answer"
        Matter (carbon, nitrogen, water) is recycled through ecosystems via biogeochemical cycles — atoms are reused repeatedly. Energy, however, is degraded to heat at every transfer (second law of thermodynamics) and cannot be recycled. Ecosystems require continuous solar energy input because energy exits as heat and is lost to the system.

---

!!! mascot-celebration "Bailey Says: Incredible Work, Builders!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img">
    You just mastered the physics of ecology! You can now trace energy from the sun through producers, consumers, and decomposers — and you know exactly where every joule goes. You've learned to calculate GPP, NPP, and NEP, and you understand why the second law of thermodynamics shapes every food web on Earth. Dam, that's powerful knowledge! Next up, we'll explore how matter cycles through ecosystems — because while energy flows one way, atoms go around and around forever. **Everything's connected!**

[See Annotated References](./references.md)
