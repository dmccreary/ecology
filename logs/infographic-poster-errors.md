# Infographic Poster Fact-Check Session Log

**Date:** 2026-04-23
**Session topic:** Fact-checking a one-shot AI-generated infographic poster on biophilic vs. brutalist design benefits
**Source image:** `docs/posters/earth-day-infographic.png` (generated via OpenAI Images 2.0 from a single prompt)

## 1. The Original Poster

A side-by-side comparison infographic titled **"THE EVIDENCE: PEOPLE ARE HAPPIER & HEALTHIER IN BIOPHILIC SPACES"** with two columns:

- **Biophilic Spaces** (left, green): +15% happiness, -23% stress cortisol, +12% cognitive performance, +26% health/recovery, +8-15% productivity
- **Brutalist Spaces** (right, gray): -10% happiness, +15% stress, -9% cognition, -20% health, -7-12% productivity

Cited references at the bottom:

- Browning, W. D., Ryan, C. O., & Clancy, J. O. (2014). *14 Patterns of Biophilic Design.* Terrapin Bright Green.
- Human Spaces, Terrapin Bright Green (2015-2023)
- University of Exeter
- Singapore NUS
- Finnish studies

## 2. Fact-Check Findings

### References (Citations at bottom of poster)

| Reference | Verdict | Notes |
|---|---|---|
| Browning, Ryan & Clancy (2014), *14 Patterns of Biophilic Design* | VALID | Real publication by Terrapin Bright Green, Sept 29, 2014. It is a meta-synthesis of ~500 studies — NOT a source of original percentages. |
| Human Spaces / Interface (2015) | VALID | Survey of 7,600 workers in 16 countries, led by Prof. Sir Cary Cooper. |
| University of Exeter | VALID | Refers to Knight & Haslam (2014), "Relative Benefits of Green vs. Lean Office Space." |
| Singapore NUS | PARTIALLY VALID | NUS has hosted biophilic research but no specific landmark paper matches the poster's numbers. |
| "Finnish studies" | INVALID / MISATTRIBUTED | Forest-bathing (Shinrin-yoku) cortisol research is overwhelmingly **Japanese** (Park, Miyazaki, Li) and Korean, not Finnish. |

### Claim-by-claim analysis

#### Biophilic side

| Claim | Verdict | Evidence |
|---|---|---|
| +15% happiness / well-being | SUPPORTED | Human Spaces 2015 found "15% higher level of well-being." Number is accurate and correctly attributable. |
| -23% stress cortisol | UNSUPPORTED SPECIFIC FIGURE | Antonelli et al. (2019) meta-analysis of forest bathing confirms *significant* cortisol reduction, but no peer-reviewed source produces a clean "-23%" for indoor biophilic design. The number appears in marketing content with no traceable origin. |
| +12% cognitive performance | MISATTRIBUTED | "12%" in the literature typically refers to an *optimal greenery coverage ratio* (Lei et al. 2021), not a cognitive uplift. Actual measured cognitive gains are ~8–14% (e.g., Yin et al. 2019 found 14% short-term memory improvement in VR biophilic studies). |
| +26% health & recovery | NOT SUPPORTED AS STATED | Ulrich (1984) found surgery patients with tree views had ~8.5% shorter stays (7.96 vs 8.7 days) and fewer analgesics — not 26%. UK GBC cites ~18% fewer sick days; some green-certified offices cite up to ~30%. No single study produces "+26%." |
| +8–15% productivity | SUPPORTED RANGE | Knight & Haslam 2014 (Exeter) found 15% productivity gain from plants; Human Spaces 2015 found 6% productivity and 15% creativity. The 8–15% range is defensible. |

#### Brutalist side

All five percentages (-10%, +15%, -9%, -20%, -7-12%) are **unsupported by peer-reviewed research.** The specific numbers do not appear in any locatable study.

- Danckert's work on boredom and elevated cortisol exists but produces no specific "+15% cortisol in brutalist rooms" study.
- A 2023 *Frontiers* systematic review ([architectural form and physiological stress](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2023.1237531/full)) found evidence is *preliminary and heterogeneous.*
- Some researchers argue brutalist architecture can provide grounding for overstimulated minds — the opposite of the poster's framing.

The brutalist numbers appear to be **fabricated mirror-values** invented for visual symmetry.

## 3. Error Count from the One-Shot OpenAI Images 2.0 Generation

Counting each distinct factually incorrect or unverifiable claim:

| # | Error | Category |
|---|---|---|
| 1 | "-23% cortisol" (biophilic) — no primary source | Fabricated statistic |
| 2 | "+12% cognitive performance" (biophilic) — figure conflates greenery coverage ratio with cognitive uplift | Misattributed statistic |
| 3 | "+26% health & recovery" (biophilic) — no study produces this number | Fabricated statistic |
| 4 | "-10% happiness" (brutalist) — no supporting study | Fabricated statistic |
| 5 | "+15% stress" (brutalist) — no supporting study | Fabricated statistic |
| 6 | "-9% cognitive performance" (brutalist) — no supporting study | Fabricated statistic |
| 7 | "-20% health" (brutalist) — no supporting study | Fabricated statistic |
| 8 | "-7–12% productivity" (brutalist) — no supporting study | Fabricated statistic |
| 9 | "Finnish studies" citation — forest-bathing literature is Japanese, not Finnish | Misattributed source |
| 10 | Implicit claim that Terrapin 2014 is an empirical source for the numbers | Category error (it is a meta-synthesis of others' findings) |

**Total errors: 10**
(8 fabricated/misattributed statistics + 2 source attribution errors)

**Error rate:** Of 10 numeric data points, **8 are unsupported** (80% fabrication rate). Of 5 sources cited, **1 is fictional** and **1 is vague/unverifiable** (40% citation error rate).

This illustrates the core risk of one-shot text-to-image generation for fact-based infographics: the model will confidently fabricate plausible-looking statistics and citations to fill the requested visual template, with no verification layer between the prompt and the final rendered pixels.

## 4. Why One-Shot Generation Fails for Fact-Based Infographics

- **The image model cannot verify facts.** Once text enters the rendered image, it is baked into pixels and cannot be corrected without regenerating.
- **Symmetry bias.** A two-column "versus" layout invites the model to invent mirror-statistics for the weaker side to fill the template.
- **Citation hallucination.** The model produces plausible-sounding author names, institutions, and years without checking they exist or match the claims.
- **No separation of concerns.** The same pass that chooses the visual design also sources the data — neither gets full attention.
- **No audit trail.** There is no record of which claim came from which source, making downstream fact-checking slow and ambiguous.

## 5. Recommendation: New Skill — `verified-infographic-generator`

A skill that produces high-quality infographic posters where **planning and fact-verification are done by Claude models** and the text-to-image engine is only invoked in the final rendering step, after all content has been locked.

### Design Principles

1. **Separate facts from pixels.** Never let the image model choose which numbers to display.
2. **Evidence before composition.** No visual layout work begins until every claim has a verified source.
3. **Bake nothing unverified.** Any unverified claim blocks the pipeline or is downgraded to qualitative language.
4. **Preserve an audit trail.** Every number and citation in the final image must be traceable to a specific source and search result.

### Step-by-Step Pipeline

#### Phase 1: Intake & Scoping (Claude)

1. Collect user request: topic, intended comparison, audience, dimensions, style preferences.
2. Generate a **Claim Plan** — a structured list of the factual claims the poster needs to make (typically 5–10 claims).
3. For each claim, record: subject, metric type (percentage, count, range, qualitative), polarity (positive/negative), and desired prominence.
4. Flag any planned comparisons that invite symmetry bias (e.g., "versus" layouts). For these, explicitly allow asymmetric content — missing data on one side is acceptable.

#### Phase 2: Source Discovery (Claude + WebSearch)

5. For each claim, run **at least two independent web searches** with different query phrasings.
6. For each candidate source, record: title, authors, year, publisher/journal, URL, quoted sentence supporting the claim.
7. Prefer: peer-reviewed journals, systematic reviews/meta-analyses, government reports (EPA, NOAA, UK GBC, etc.), and named institutional studies.
8. Reject: blog posts citing unnamed "studies," marketing pages, Wikipedia as sole source, statistics without a traceable primary paper.

#### Phase 3: Verification & Classification (Claude)

9. Classify each claim into one of four buckets:
   - **VERIFIED** — Specific number matches a specific peer-reviewed paper with quoted passage.
   - **DIRECTIONAL** — Effect direction is well-established but the exact number differs across studies; use a range or qualitative label.
   - **QUALITATIVE-ONLY** — Effect is supported but not quantified reliably; use words ("lower," "significant," "elevated").
   - **REJECTED** — No credible source; remove or replace with a VERIFIED claim on a related subject.
10. For every VERIFIED claim, store a citation record: `{claim, value, source_citation, url, quote}`.
11. Produce a **Verification Report** showing claims, verdicts, and evidence. Abort the pipeline if more than 20% of claims are REJECTED — signal to the user that the topic may not support the original framing.

#### Phase 4: User Checkpoint

12. Present the Verification Report to the user. Show exactly which original claims survived, which were softened to qualitative language, and which were dropped.
13. User approves the final claim set, or requests additional sources for a specific claim before proceeding.
14. **No image generation happens before this approval.**

#### Phase 5: Layout Specification (Claude)

15. Draft a structured layout spec in JSON or YAML:
    ```yaml
    poster:
      title: "..."
      dimensions: 1200x680
      palette: [...]
      sections:
        - type: metric_row
          label: "Well-being"
          value: "+15%"
          descriptor: "Self-reported increase (Human Spaces, 2015)"
          source_id: human_spaces_2015
    ```
16. Every text element in the spec must reference a `source_id` from the verification report (or be explicitly marked as a non-factual design element like a title).

#### Phase 6: Image Prompt Assembly (Claude)

17. Programmatically compose the text-to-image prompt from the approved layout spec — NEVER re-author numbers at this stage.
18. Include explicit instructions in the prompt: "Render the following exact text verbatim. Do not substitute, paraphrase, or invent additional statistics."
19. Render a **dry-run check:** the assembled prompt is shown to the user one last time before it is sent to the image model.

#### Phase 7: Final Rendering (Text-to-Image Model)

20. Send the locked prompt to the image model (OpenAI Images 2.0, Gemini, etc.).
21. Save the rendered PNG alongside the verification report and layout spec to `docs/posters/<slug>/` so every poster has its provenance.

#### Phase 8: Post-Render Audit (Claude)

22. OCR the rendered image (or ask Claude to read it multimodally) and confirm every number and citation in the pixels matches the approved layout spec.
23. If the image model has drifted (e.g., rendered "+12%" as "+21%" or hallucinated an extra row), flag as a rendering error and regenerate.
24. Produce a final sidecar file: `<slug>.sources.md` with every claim, number, and full citation — so the poster is independently fact-checkable.

### File Structure for the Skill

```
skills/verified-infographic-generator/
├── SKILL.md                      # Trigger conditions and workflow
├── templates/
│   ├── claim-plan.yaml.j2        # Phase 1 output template
│   ├── verification-report.md.j2 # Phase 3 output template
│   ├── layout-spec.yaml.j2       # Phase 5 output template
│   └── image-prompt.txt.j2       # Phase 6 assembly template
├── scripts/
│   ├── verify_sources.py         # Phase 2 & 3 automation (search + quote extraction)
│   ├── assemble_prompt.py        # Phase 6 prompt composition
│   └── audit_render.py           # Phase 8 OCR + comparison
└── examples/
    └── biophilic-design/         # Worked example from this session
```

### Triggering

Trigger the skill when the user asks for any of:

- "Make a poster about X"
- "Create an infographic comparing X and Y"
- "Generate a data visualization of..."
- Any request that would otherwise produce a one-shot AI image containing numeric claims.

Skip the skill only for:

- Pure decorative images (no factual claims)
- Diagrams where the user supplies the data directly and has already verified it

### Why This Works

- **Fact verification happens in text**, where Claude is strongest and errors can be inspected and corrected cheaply.
- **Image generation is constrained to rendering**, where the model is strongest.
- **The user has a mandatory checkpoint** before any pixels are baked.
- **Every published poster has a sidecar source file**, so if a reader asks "where did this number come from?" there is a definitive answer.
- **Symmetry bias is broken at Phase 1** by allowing asymmetric content as a first-class output.
- **The error rate observed in this session (80% on numeric claims) should drop to near zero** because any unsupported claim is either sourced, softened to qualitative language, or removed before rendering.

### Measured Success Criteria

- 100% of numeric claims in the final image trace to a specific URL and quoted passage.
- 0 citations to non-existent or misattributed sources.
- <5% post-render drift (number of claims that render incorrectly in pixels vs. layout spec).
- Generation time: higher than one-shot (likely 5–15 minutes vs. seconds) but producing an artifact that is defensible for publication.
