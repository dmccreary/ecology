# Ecology Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/ecology/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fecology-blue?logo=github)](https://github.com/dmccreary/ecology)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/ecology/](https://dmccreary.github.io/ecology/)

## Overview

This is an interactive, AI-generated intelligent textbook on **Ecology** designed for high school students (grades 9-12) and introductory college courses. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, 85 interactive MicroSims (p5.js simulations), graphic novel stories of famous ecologists, and AI-assisted content generation.

The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses a concept dependency graph of 380 concepts to ensure proper prerequisite sequencing. Every chapter emphasizes **systems thinking** — understanding how ecosystems function as interconnected webs of relationships, feedback loops, and emergent behaviors. The content is designed to be positive, energetic, and fun, guided by **Bailey the Beaver**, the textbook's learning mascot who helps students see that "Everything's connected!"

Whether you're a student exploring ecology for the first time, an educator looking for structured course materials with interactive elements, or a curious learner who wants to understand how the natural world works, this textbook provides comprehensive coverage across 17 chapters — from foundational ecology and energy flow to climate change, biodiversity policy, and scientific literacy.

## Site Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 380 |
| Chapters | 17 |
| Markdown Files | 173 |
| Total Words | ~319,000 |
| Interactive MicroSims | 85 |
| Graphic Novel Stories | 20 |
| Glossary Terms | 381 |
| Quiz Questions | 170 |
| FAQ Questions | 108 |
| Images | 160 |

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/ecology.git
cd ecology
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
pip install mkdocs-glightbox
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to [http://localhost:8000](http://localhost:8000)

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

### Using the Book

**Navigation:**

- Use the left sidebar to browse chapters
- Click on the search icon to search all content
- Each chapter builds on concepts from previous chapters

**Interactive MicroSims:**

- Found in the "MicroSims" section with 85 simulations
- Each simulation runs standalone in your browser
- Adjust parameters with sliders and controls
- Topics range from predator-prey dynamics to biogeochemical cycles

**Graphic Novel Stories:**

- Found in the "Stories" section
- 12-panel illustrated narratives about famous ecologists and environmental events
- From John Snow's cholera investigation to the Yellowstone wolf reintroduction

**Customization:**

- Edit markdown files in `docs/` to modify content
- Modify `mkdocs.yml` to change site structure
- Add your own MicroSims in `docs/sims/`
- Customize theme in `docs/css/extra.css`

## Repository Structure

```
ecology/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 17 chapter directories
│   │   ├── 01-foundations-of-ecology/
│   │   │   ├── index.md          # Chapter content
│   │   │   └── references.md    # Chapter references
│   │   └── ...
│   ├── sims/                      # 85 interactive p5.js MicroSims
│   │   ├── predator-prey/
│   │   │   ├── main.html         # Standalone simulation
│   │   │   └── index.md          # Documentation page
│   │   └── ...
│   ├── stories/                   # 20 graphic novel narratives
│   │   ├── yellowstone-wolves/
│   │   └── ...
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── concept-list.md       # 380 concepts
│   │   ├── concept-taxonomy.md   # Taxonomy categorization
│   │   └── quality-metrics.md    # Quality analysis
│   ├── img/                       # Images and mascot assets
│   ├── css/                       # Custom stylesheets
│   ├── js/                        # Custom JavaScript
│   ├── glossary.md                # 381 glossary terms
│   ├── faq.md                     # 108 frequently asked questions
│   ├── course-description.md      # Full course description
│   └── index.md                   # Homepage
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/ecology/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [LICENSE.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive theme with powerful features
- **[p5.js](https://p5js.org/)** — Creative coding library powering 85 interactive MicroSims
- **[vis-network](https://visjs.org/)** — Network visualization library for learning graph exploration
- **[MathJax](https://www.mathjax.org/)** — Beautiful math rendering in the browser
- **[GLightbox](https://biati-digital.github.io/glightbox/)** — Image lightbox gallery
- **[Python](https://www.python.org/)** — Data processing and site generation
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

Special thanks to the educators and ecologists whose work inspires this textbook, and to the open source community for making interactive educational resources possible.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
