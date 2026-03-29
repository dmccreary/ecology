# Ecology Intelligent Textbook - Project Instructions

## Site URLs

- **Production:** https://dmccreary.github.io/ecology/
- **Local dev:** http://127.0.0.1:8000/ecology/

## "Commit and Publish" Workflow

When the user says **"commit and publish"**, perform all of the following steps in order:

1. **Check for missing nav links** -- ensure all markdown files under `docs/` are referenced in `mkdocs.yml` nav. Add any missing entries.
2. **Git add and commit** -- stage all changed files and commit with a detailed message.
3. **Git push** -- push to origin.
4. **mkdocs gh-deploy** -- deploy to GitHub Pages.

## mkdocs serve

Assume `mkdocs serve` is always running in the user's terminal. **Never** start or kill mkdocs serve processes.

## Localhost Links

Whenever you create or modify a markdown file under `docs/`, return the localhost link so the user can preview it immediately. Format:

```
http://127.0.0.1:8000/ecology/{path-to-page}/
```

For example: `http://127.0.0.1:8000/ecology/course-description/`

## MicroSim Paths

When generating MicroSims, use the repository name in the path:

```
http://127.0.0.1:8000/ecology/sims/{sim-name}/main.html
```

## Interactive Infographic Overlays

The `/interactive-infographic-overlay` skill is ideal for many diagrams in this ecology textbook. Use it whenever complex infographic diagrams can explain complex concepts and systems -- for example, ecosystem component relationships, biogeochemical cycles, food webs, trophic level energy flow, feedback loops, habitat cross-sections, and biome comparisons. Ecology is a highly visual, systems-oriented subject, and interactive overlays with callout labels, explore/quiz modes, and hover definitions are a natural fit for helping students understand interconnected concepts. Prefer this skill over static diagrams whenever the content involves spatial relationships, layered systems, or annotated scientific illustrations.

## Learning Mascot: Bailey the Beaver

### Character Overview

- **Name**: Bailey
- **Species**: Beaver
- **Personality**: Industrious, curious, practical, encouraging
- **Primary Catchphrase**: "Everything's connected!"
- **Secondary Catchphrase**: "Let's build on that!"
- **Visual**: Warm brown beaver with tan underbelly, green hard hat, buck-toothed smile, hands always free (no hand props)

### Voice Characteristics

- Uses simple, encouraging language appropriate for grades 9-12
- Emphasizes connections and systems thinking in dialogue
- Occasionally uses building/engineering metaphors ("Let's construct our understanding", "Building block by block")
- Refers to students as "builders" or "explorers"
- Signature phrases: "Everything's connected!", "Let's build on that!", "See how it all fits together?"

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Section completion | mascot-celebration | End of major sections |
| Difficult content | mascot-encourage | Where students may struggle |

### Do's and Don'ts

**Do:**

- Use Bailey to introduce new topics warmly
- Include a catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Bailey more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Bailey's personality or speech patterns
- Put any props or tools in Bailey's hands

## Content Generation Style Guide

### Overall Tone

The textbook should feel **positive, energetic, optimistic, and fun**. Ecology is inherently fascinating — every page should convey genuine excitement about the natural world. Students should finish each section feeling curious, empowered, and eager to learn more. Avoid dry, encyclopedic prose. Write like an enthusiastic field guide leader who can't wait to show students the next amazing thing.

### Bailey's Humor and Personality

Bailey the Beaver is **funny, punny, and playful**. Lean into this:

- **Beaver puns are always welcome**: "Dam, that's interesting!" / "I'm not going to sugarcoat this — okay, maybe I'll bark-coat it." / "Wood you believe how cool this is?"
- **Ecology wordplay**: "This topic is really growing on me!" / "Let's branch out!" / "That's a whale of a concept!"
- **Self-aware humor**: Bailey knows the puns are corny and owns it — "Yes, I went there. No regrets."
- **Jokes should serve learning**: Every joke should connect to the concept being taught. Humor is a memory anchor, not filler.
- **Keep it grade 9-12 appropriate**: Playful and clever, never sarcastic or mean-spirited.

### Writing Energy and Style

- **Lead with wonder**: Open topics with a surprising fact, a "what if" question, or a mind-blowing connection. ("Did you know a single teaspoon of healthy soil contains more microorganisms than there are people on Earth?")
- **Use active voice and direct address**: "You're about to discover..." not "It will be shown that..."
- **Short paragraphs, punchy sentences**: Break up walls of text. One idea per paragraph.
- **Celebrate complexity**: When something is complicated, frame it as exciting, not intimidating. ("This is where ecology gets really wild — buckle up, builders!")
- **Connect to students' lives**: Relate ecological concepts to things students actually experience — their food, their neighborhood, their weather, their social media feeds.

### Systems Thinking Focus

Every chapter should reinforce that **ecology is about connections, feedbacks, and emergent behavior**:

- **Always ask "what's connected to what?"**: When introducing any organism, process, or concept, explicitly trace its connections to other parts of the system.
- **Highlight feedback loops**: Identify and label positive and negative feedback loops whenever they appear. Use Bailey's catchphrase: "Everything's connected!"
- **Think in webs, not chains**: Avoid oversimplifying to linear cause-and-effect. Show students that real ecosystems have multiple interacting causes and effects.
- **Scale awareness**: Help students zoom in and out — from molecular to organismal to ecosystem to biosphere. ("Let's zoom out and see the bigger picture here.")
- **Unintended consequences**: When discussing human impacts, always explore second- and third-order effects. ("When we removed the wolves, what happened next? And after that?")
- **Use "what would happen if..." prompts**: Pose hypothetical removal or addition scenarios to build intuition about system dynamics.

### Critical Thinking Skills

Build critical thinking into every chapter through explicit prompts and modeling:

- **Question assumptions**: Regularly ask "How do we know this?" and "What evidence supports this claim?"
- **Compare and contrast**: When presenting ecological theories or models, show where they agree, where they diverge, and what's still debated.
- **Distinguish correlation from causation**: Explicitly call out this distinction whenever presenting ecological data or studies.
- **Evaluate experimental design**: When citing studies, briefly discuss sample sizes, controls, and limitations so students learn to think like scientists.
- **Encourage respectful disagreement**: Frame scientific debate as healthy and productive. ("Scientists are still arguing about this — and that's a good thing!")
- **Use Bailey's thinking pose** for critical thinking prompts: "Hmm, let's chew on this for a moment..." (beaver pun intended)

### Media Literacy and Misinformation Detection

Ecology is a frequent target of misinformation. **Every chapter should include at least one opportunity to build media literacy skills.** Use Bailey's warning pose for these sections.

#### Detecting Misinformation — Teach Students to Ask:

1. **Who is the source?** Is it a peer-reviewed journal, a university, a government agency (EPA, NOAA, USGS), or an anonymous blog? ("Bailey says: Always check the source — not all websites are created equal!")
2. **Who funded the research?** Follow the money. Studies funded by industries with a financial stake in the outcome deserve extra scrutiny.
3. **Is it peer-reviewed?** Peer review isn't perfect, but it's the best filter we have. Teach the difference between a journal article and an opinion piece.
4. **Does it cherry-pick data?** Watch for studies that highlight one data point while ignoring the broader trend. ("One cold winter doesn't disprove climate change — that's like saying lunch disproves hunger.")
5. **Does it use emotional language instead of evidence?** Scientific claims should be supported by data, not fear or outrage.
6. **Can you find the original study?** If an article cites "a new study," track down the actual paper. Headlines often distort findings.
7. **What do other experts say?** Look for scientific consensus. One contrarian study doesn't overturn decades of research.

#### Red Flags in Ecology-Related Content:

- **"Scientists don't want you to know..."** — Real science is published openly.
- **Absolute certainty with no caveats** — Real scientists express uncertainty and confidence intervals.
- **Anonymous or untraceable authors** — Credible researchers put their names on their work.
- **No citations or links to primary sources** — Trustworthy articles show their evidence.
- **Conspiracy framing** — Claims that entire scientific communities are coordinating deception.
- **Social media posts as primary sources** — A viral tweet or TikTok is not a peer-reviewed study.

#### Bailey's Media Literacy Catchphrases:

- "Trust, but verify — like a scientist!"
- "If it sounds too simple, dig deeper!"
- "Check the source before you share, builders!"
- "Extraordinary claims need extraordinary evidence!"
- "Don't let anyone dam up the flow of good information!"

### Integrating Skepticism with Optimism

The tone should be **skeptical but never cynical**. Students should learn to question claims while remaining hopeful about ecological solutions:

- **Frame fact-checking as empowering**, not exhausting. ("You now have the tools to spot bad science — that's a superpower!")
- **Pair every environmental problem with real solutions** that are already working somewhere in the world.
- **Highlight student agency**: "You don't have to be a scientist to make a difference — but thinking like one sure helps!"
- **Celebrate good science journalism** when you see it — teach students what reliable reporting looks like, not just what to avoid.
- **Use Bailey's encouraging pose** when transitioning from critical analysis back to optimism: "Now that we've sorted fact from fiction, let's build on what we actually know!"
