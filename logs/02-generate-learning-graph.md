# Log: Learning Graph Generation

**Date:** 2026-03-29
**Skill:** Learning Graph Generator v0.04
**Model:** Claude Opus 4.6 (1M context)
**Task:** Generate a comprehensive learning graph from the ecology course description

## Prompts

**User prompt 1 (concept list review):**

> use as many concepts as needed

**User prompt 2 (log and next step):**

> please create a detailed log of this in logs/02-generate-learning-graph.md including details of your design decisions. Then run the /book-installer with the install learning graph guide

## Python Program Versions Used

| Program | Version | Purpose |
|---------|---------|---------|
| analyze-graph.py | (from skill v0.04) | DAG validation and quality metrics |
| csv-to-json.py | v0.03 | CSV to vis-network JSON conversion |
| add-taxonomy.py | (from skill v0.04) | Assign taxonomy IDs to concepts |
| taxonomy-distribution.py | (from skill v0.04) | Generate distribution report |

## Design Decisions

### Decision 1: Number of Concepts (380)

The course description supports 250-300 concepts based on its breadth. I chose to generate **380 concepts** because:

- The course covers 11 full units spanning ecology, Earth science, energy, pollution, systems thinking, and scientific literacy -- this is broader than a typical single-discipline course
- Units 10 (Systems Thinking) and 11 (Evaluating Environmental Claims) add ~65 concepts that would not appear in a standard ecology textbook
- Ecology has many specific named biomes, pollutants, energy sources, and policy frameworks that are better represented as individual concepts than lumped together
- 380 is well under the 500-concept maximum, leaving room for future additions without a restructure

### Decision 2: Six Foundational Concepts

I chose **6 root nodes** with zero dependencies:

1. **Ecology** (1) -- the discipline itself, anchoring all biological/ecological concepts
2. **Energy** (13) -- physics foundation needed for energy flow, thermodynamics, and all energy resource topics
3. **Matter** (14) -- chemistry foundation needed for nutrients, biogeochemical cycles, and pollution
4. **Plate Tectonics** (151) -- geological foundation independent of biology, needed for soil, atmosphere, and climate
5. **System** (312) -- the abstract concept underlying all systems thinking content
6. **Hypothesis** (342) -- the scientific method foundation underlying all critical thinking content

**Why these six:** Each represents an independent knowledge domain that feeds into the course. A student could start from any of these entry points. Making them all depend on "Ecology" would create an artificial bottleneck and misrepresent the prerequisite structure -- you don't need to know ecology to understand what a hypothesis is.

### Decision 3: Resolving Circular Dependencies

The initial graph generation produced **6 circular dependencies**. Each represents a genuine conceptual relationship where two ideas inform each other, but a DAG requires choosing a direction. My resolution logic:

| Cycle | Resolution | Rationale |
|-------|-----------|-----------|
| Solar Radiation <-> Solar Energy Input | Removed Solar Radiation dependency from Solar Energy Input | Solar Energy Input is a simpler concept (energy from the sun); Solar Radiation is the more technical treatment requiring it |
| Carbon Dioxide <-> Carbon Cycle | Removed CO2 dependency from Carbon Cycle | You learn about the Carbon Cycle first as a system, then learn CO2 as a specific molecule within it |
| Nitrogen Fixation <-> Nitrogen Cycle | Removed N-Fixation dependency from N-Cycle | The cycle is the overarching framework; fixation is a specific process within it |
| Cost-Benefit Analysis <-> Trade-Offs | Removed CBA dependency from Trade-Offs | Trade-offs is the simpler, more general concept; CBA is a formal method that applies trade-off thinking |
| Scientific Consensus <-> Peer Review | Removed Consensus dependency from Peer Review | Peer review is the process; consensus is the outcome that emerges from it |
| Media Literacy <-> Media Coverage of Science | Removed Media Literacy dependency from Media Coverage | You can describe how media covers science without yet knowing how to critically evaluate media |

**General principle:** When two concepts are mutually informative, I broke the cycle by asking "which concept can be meaningfully taught first without the other?" The simpler or more foundational concept gets taught first.

### Decision 4: Self-Referencing Dependencies

Five concepts initially referenced themselves in the dependency list (IDs 207, 298, 378, 379, 380). This was a generation artifact where the concept was accidentally listed as its own prerequisite. Each was fixed by replacing with appropriate actual dependencies:

- 207 (Urban Runoff Reduction): self-ref replaced with dependencies on Impervious Surfaces and Runoff
- 298 (Habitat Loss): self-ref removed, kept Urbanization and Deforestation
- 378 (Environmental Justice): self-ref replaced with Urbanization and Environmental Misinformation
- 379 (Citizen Science): self-ref replaced with Scientific Method and Population
- 380 (Environmental Ethics): self-ref replaced with Ecology and Sustainability

### Decision 5: 13 Taxonomy Categories

I designed **13 categories** to balance several constraints:

1. **Alignment with course units:** Most categories map to 1-2 course units, making the taxonomy intuitive for students navigating the learning graph
2. **Visual distinctiveness:** 13 categories can each receive a distinct pastel CSS color without colors becoming too similar
3. **Size balance:** No category exceeds 16% (LAND at 15.8%), well under the 30% threshold

| TaxonomyID | Name | Concepts | % | Mapped Units |
|------------|------|----------|---|--------------|
| FOUND | Foundation Concepts | 20 | 5.3% | Prerequisites |
| ECOS | Ecosystems and Biomes | 28 | 7.4% | Unit 1 |
| ENFL | Energy Flow | 15 | 3.9% | Unit 1 (energy topics) |
| CYCL | Biogeochemical Cycles | 20 | 5.3% | Unit 1 (cycles) |
| INTR | Species Interactions | 20 | 5.3% | Unit 2 (interactions) |
| BIOD | Biodiversity and Services | 20 | 5.3% | Unit 2 |
| POPU | Population Ecology | 30 | 7.9% | Unit 3 |
| ERTH | Earth Systems | 26 | 6.8% | Unit 4 |
| LAND | Land, Water, and Energy Use | 60 | 15.8% | Units 5-6 |
| POLL | Pollution | 46 | 12.1% | Units 7-8 |
| GLOB | Global Change | 26 | 6.8% | Unit 9 |
| SYST | Systems Thinking | 30 | 7.9% | Unit 10 |
| CRIT | Critical Thinking and Literacy | 39 | 10.3% | Unit 11 |

**Why LAND is the largest:** Units 5 (Land and Water Use) and 6 (Energy Resources) were combined into one category because both deal with human resource use. Splitting them would create two small categories (agriculture ~25, energy ~35) that don't naturally separate in the dependency graph -- many energy concepts depend on land-use concepts and vice versa.

**Why ECOS and ENFL are separate from CYCL:** Unit 1 (Ecosystems) covers three distinct knowledge areas: biome types, energy flow, and biogeochemical cycles. These have different dependency structures -- biomes branch into specific types with few cross-connections, energy flow is a linear chain, and cycles are interconnected loops. Separate categories make the graph visualization much more readable.

### Decision 6: Color Assignments

Selected **pastel CSS named colors** (not hex codes) for accessibility and readability:

- Used warm colors (LightCoral, PeachPuff, LightPink, MistyRose) for biological topics (Foundation, Interactions, Population, Pollution)
- Used cool colors (PowderBlue, PaleTurquoise, LightSteelBlue, Thistle) for physical/Earth science topics
- Used neutral colors (Honeydew, Lavender, LightYellow) for meta-cognitive topics (Systems Thinking, Critical Thinking, Energy Flow)
- Avoided AliceBlue (too close to white backgrounds) per skill instructions

### Decision 7: Dependency Depth and Breadth

The graph has:

- **Average dependencies per concept:** 1.63 (healthy -- not too sparse, not overly connected)
- **Maximum chain length:** 11 (Matter -> Nutrients -> Biogeochemical Cycles -> Carbon Cycle -> CO2 -> Greenhouse Effect -> Greenhouse Gases -> Global Climate Change -> Ocean Warming -> ENSO Cycle -> El Nino)
- **Terminal nodes:** 181 (47.6%) -- slightly above the 40% recommended range

The high terminal node percentage reflects the course's structure: many specific topics (individual biomes, specific pollutants, individual energy types, specific logical fallacies) are endpoints that nothing else depends on. This is appropriate for a survey course where students learn many specific examples without building further abstraction on top of them.

## Steps Completed

### Step 1: Course Description Quality Assessment

- **Score:** 100/100
- All elements present: title, audience, prerequisites, 11 units, topics excluded, Bloom's Taxonomy learning objectives (60 total across 6 levels)
- Estimated concept capacity: 250-300 concepts
- Saved to `learning-graph/course-description-assessment.md`

### Step 2: Generate Concept Labels

- Generated **380 concepts** organized in 14 thematic sections in the markdown file
- All labels in Title Case, under 32 characters
- Saved to `learning-graph/concept-list.md`

### Step 3: Generate Dependency Graph

- Created CSV with 380 concepts and their prerequisites
- Fixed 5 self-referencing dependencies
- Fixed 6 circular dependencies via DFS cycle detection
- Saved to `learning-graph/learning-graph.csv`

### Step 4: Quality Validation

- Ran `analyze-graph.py` to validate the DAG
- **Valid DAG:** Yes (no cycles)
- **Orphaned Nodes:** 0
- **Connected Components:** 1 (all concepts in a single graph)
- **Foundational Concepts:** 6
- **Terminal Nodes:** 181 (47.6%)
- **Average Dependencies per Concept:** 1.63
- **Maximum Chain Length:** 11
- **Quality Score:** 85/100
- Saved to `learning-graph/quality-metrics.md`

### Step 5: Concept Taxonomy

- Created 13 categories with 3-4 letter abbreviations
- Saved to `learning-graph/concept-taxonomy.md`

### Step 5b: Taxonomy Names JSON

- Created `taxonomy-names.json` mapping IDs to human-readable names
- This prevents the graph viewer legend from showing cryptic IDs

### Step 6: Add Taxonomy to CSV

- Ran `add-taxonomy.py` with custom `taxonomy-config.json`
- Fixed 3 MISC misclassifications:
    - Solar Energy Input (57): MISC -> ENFL
    - Human Population Growth (148): MISC -> POPU
    - Ground-Level Ozone (243): MISC -> POLL
- Fixed 3 misclassified concepts:
    - Deforestation (178): ECOS -> LAND
    - Sustainable Forestry (206): ECOS -> LAND
    - Urban Runoff Reduction (207): CYCL -> LAND

### Steps 7-8: Metadata and Groups

- Created `metadata.json` with Dublin Core fields (title, description, creator, date, version, license)
- Created `color-config.json` with 13 pastel CSS colors

### Step 9: Generate Learning Graph JSON

- Ran `csv-to-json.py` v0.03
- **Output:** `learning-graph.json`
- **380 nodes, 609 edges, 13 groups**

### Step 10: Taxonomy Distribution Report

- Ran `taxonomy-distribution.py`
- Saved to `learning-graph/taxonomy-distribution.md`

### Step 11: Index Page

- Created `learning-graph/index.md` from template
- Customized for ecology textbook
- Updated `mkdocs.yml` navigation with Learning Graph section

## Files Created

| File | Description |
|------|-------------|
| `learning-graph/index.md` | Introduction page for learning graph section |
| `learning-graph/course-description-assessment.md` | Quality assessment (100/100) |
| `learning-graph/concept-list.md` | 380 numbered concepts |
| `learning-graph/learning-graph.csv` | Dependency graph with taxonomy (380 rows) |
| `learning-graph/learning-graph.json` | vis-network JSON (380 nodes, 609 edges, 13 groups) |
| `learning-graph/concept-taxonomy.md` | 13 category definitions |
| `learning-graph/taxonomy-names.json` | Taxonomy ID to name mapping |
| `learning-graph/metadata.json` | Dublin Core metadata |
| `learning-graph/color-config.json` | Category color assignments |
| `learning-graph/taxonomy-config.json` | Keyword-based taxonomy assignment config |
| `learning-graph/quality-metrics.md` | DAG quality validation report |
| `learning-graph/taxonomy-distribution.md` | Category distribution analysis |

## Graph Summary Statistics

| Metric | Value |
|--------|-------|
| Total concepts | 380 |
| Total edges | 609 |
| Taxonomy categories | 13 |
| Foundational concepts (no prerequisites) | 6 |
| Terminal nodes (no dependents) | 181 (47.6%) |
| Orphaned nodes | 0 |
| Connected components | 1 |
| Average dependencies per concept | 1.63 |
| Maximum dependency chain length | 11 |
| Top prerequisite: Population (ID 7) | 21 dependents |
| Top prerequisite: Sustainability (ID 201) | 16 dependents |
| Top prerequisite: Species (ID 6) | 15 dependents |
| Top prerequisite: Energy (ID 13) | 15 dependents |
