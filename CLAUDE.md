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
