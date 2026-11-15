# Issue Tracker: Local Markdown

This repository uses local markdown files for issue and ticket tracking. No external CLI or remote service is required.

## Storage Location

- Root tickets directory: `.scratch/`
- Feature work and epic maps: `.scratch/<feature>/`
- Tickets are written as individual `.md` files, e.g.:
  - `.scratch/<feature>/<ticket-id>-<short-slug>.md`
  - `.scratch/general/<ticket-id>-<short-slug>.md`

## Ticket Format

Each ticket file must follow this structure:

```markdown
---
id: TICKET-001
title: "Short description of the task"
status: "open" # open | in-progress | done | closed
labels: ["ready-for-agent"]
created_at: YYYY-MM-DD
---

# TICKET-001: Short description of the task

## Objective
What needs to be done and why.

## Proposed Changes
- File 1: details
- File 2: details

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

## Wayfinding Operations

- **Feature Map / Epic**: Store as `.scratch/<feature>/map.md`. This maps the sub-tasks, sequencing, and dependencies.
- **Child Tickets**: Created alongside `map.md` inside `.scratch/<feature>/` named by their ticket ID.
- **Publishing Tickets**: Simply write the markdown file to `.scratch/<feature>/`.
- **Querying Tickets**: Search or list files in `.scratch/`.

