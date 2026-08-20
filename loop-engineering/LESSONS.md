# LESSONS — the continuously-updated observation log

This file is the loop's memory for *how the loop itself behaves*. Every time a
round goes right or wrong, record the observation here so the skeleton improves
from practice. Each new loop engineering project should copy this file.

## How to log

- **What happened** (one line, factual)
- **Which move/cost/part it touched**
- **What to change in SKELETON.md / SKILL.md as a result**

## Observations

- **What happened:** Math.random() used for badge rotation re-rolled on every TiltCard mousemove rerender, causing stamp jitter.
- **Move/cost:** Verification (evaluator caught render-time randomness).
- **Change to make:** Deterministic values keyed by data id, never Math.random() in JSX render output.
- **What happened:** Hover-only interactions are dead on touch devices.
- **Move/cost:** Verification.
- **Change to make:** Always pair hover reveals with a mobile media-query fallback that forces content visible.
