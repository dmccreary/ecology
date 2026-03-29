# Log: Course Description Generation

**Date:** 2026-03-29
**Start Time:** ~5:00 PM CDT
**Model:** Claude Opus 4.6 (1M context)
**Task:** Generate a comprehensive course description for the Ecology interactive intelligent textbook

## Prompt 1: Initial Course Description

**User prompt:**

> Please create a detailed course description for this interactive intelligent textbook about Ecology. The audience is high school students. I want you to include all the topics that are covered under the US AP Ecology recommendations by the college board, but make it clear in the course description that this course is not affiliated with the College Board in any way and is not endorsed by the College board. I also want you to put a special focus on System Thinking and Critical Thinking skills. Add content that will help student become better at spotting misinformation in social media and the press.

### Analysis

1. **Identified the correct College Board program:** The College Board does not offer a standalone "AP Ecology" course. The relevant program is **AP Environmental Science (APES)**, which covers ecology as a major component alongside Earth systems, energy, pollution, and global change.

2. **Researched AP Environmental Science framework:** Used a subagent to compile the complete APES topic list across all 9 units (~95 topics) and 4 Big Ideas from the College Board's course and exam description.

3. **Key design decisions:**
    - Structured Units 1-9 to align with the 9 APES units, preserving all required topics
    - Added **Unit 10: Systems Thinking and Ecological Reasoning** as a dedicated systems thinking unit covering stock-and-flow diagrams, causal loop diagrams, feedback loops, leverage points, emergence, resilience, regime shifts, scale, and mental models
    - Added **Unit 11: Evaluating Environmental Claims** as a dedicated misinformation/critical thinking unit covering scientific method, logical fallacies, source evaluation, statistical literacy, media literacy, case studies in environmental misinformation, and constructive skepticism
    - Added "Systems Thinking Focus" and "Critical Thinking Focus" callouts within each content unit to integrate these skills throughout the course rather than isolating them
    - Included a prominent disclaimer box (using MkDocs Material admonition syntax) stating the course is not affiliated with or endorsed by the College Board
    - Set reading level at Grade 10 (Flesch-Kincaid) for the high school audience

4. **Additional sections included:**
    - Learning Objectives (8 high-level objectives)
    - Bloom's Taxonomy integration table
    - Assessment strategy
    - Topics summary table
    - Big Ideas (4 overarching themes from APES)
    - Science Practices (7 practices from APES framework)
    - Pedagogical approach describing MicroSims, learning graphs, glossary, and quizzes
    - Course duration estimate

### Output

Created `docs/course-description.md` and added it to the `mkdocs.yml` navigation.

---

## Prompt 2: Bloom's Taxonomy Learning Objectives

**User prompt:**

> Add an additional section at the end of the course-description.md file that list the Learning Objectives with a single level 2 section for each of the 2001 Bloom Taxonomy levels

### Analysis

1. **Identified the correct taxonomy version:** The 2001 revised Bloom's Taxonomy by Anderson and Krathwohl, which uses verb-based level names:
    - Remember (formerly Knowledge)
    - Understand (formerly Comprehension)
    - Apply (formerly Application)
    - Analyze (formerly Analysis)
    - Evaluate (formerly Evaluation)
    - Create (formerly Synthesis -- moved to the top)

2. **Design decisions:**
    - Created 10 specific, measurable learning objectives per level (60 total)
    - Each objective uses an action verb appropriate to its taxonomy level
    - Objectives are drawn from actual course content across all 11 units
    - Lower levels (Remember, Understand) focus on foundational ecological knowledge
    - Middle levels (Apply, Analyze) emphasize quantitative skills, data interpretation, and systems analysis
    - Higher levels (Evaluate, Create) integrate the critical thinking and misinformation detection themes
    - Used level 3 headings (###) for each Bloom's level under a single level 2 heading (##) as requested

### Output

Appended the "Learning Objectives by Bloom's Taxonomy Level" section to the end of `docs/course-description.md` with 60 learning objectives across 6 levels.

---

## Files Created or Modified

| File | Action | Description |
|------|--------|-------------|
| `docs/course-description.md` | Created, then updated | Full course description with 11 units and 60 Bloom's Taxonomy learning objectives |
| `mkdocs.yml` | Modified | Added "Course Description" to site navigation |

## Timeline

| Step | Elapsed Time (approx.) | Description |
|------|----------------------|-------------|
| Prompt 1 start | 0:00 | User submits initial course description request |
| Subagent research | 0:00 - 4:00 | AP Environmental Science topic research via web search |
| Course description written | 4:00 - 5:30 | Generated and wrote `course-description.md`, updated `mkdocs.yml` |
| Prompt 2 start | ~6:00 | User requests Bloom's Taxonomy learning objectives |
| Bloom's objectives written | 6:00 - 7:30 | Appended 60 learning objectives to course description |
| Prompt 3 start | ~8:00 | User requests log file creation |
| Log file written | 8:00 - 9:00 | Created this log file |
| **Total session time** | **~10 minutes** | |

## Token and Resource Usage

| Component | Input Tokens (approx.) | Output Tokens (approx.) |
|-----------|----------------------|------------------------|
| Subagent: APES topic research | 15,000 | 24,000 |
| Prompt 1: Course description generation | 30,000 | 8,000 |
| Prompt 2: Bloom's Taxonomy objectives | 35,000 | 4,500 |
| Prompt 3: Log file creation | 40,000 | 3,000 |
| **Estimated total** | **~120,000** | **~39,500** |

- Subagent used 23 tool calls (web searches and page fetches) consuming ~38,700 tokens
- Total course description output: approximately 270 lines of markdown
- Covers all ~95 APES topics plus additional systems thinking and misinformation literacy content
