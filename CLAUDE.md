# Project: Build a World, Not Just a Product

Sources of truth: PRD.md (what and how), DESIGN.md (how it looks and moves).
If something is unclear, ask before inventing.

Rules
- One framework only: Product / Experience / World as nested rings.
  Point of view is the axis through them, not a fourth concept.
- All lecture copy lives in src/content/lecture.ts. No hard-coded copy in components.
- Gating decisions live in LectureConfig. Never hard-code a variant or Notion content.
- Never fabricate Nancy's stories, community examples, screenshots or links.
  Use <Placeholder> with a clear label.
- Never build a mockup that imitates Notion's UI.
- No backend, analytics, remote fonts or third-party scripts.
- Accessibility is a requirement: keyboard, labels, focus, reduced motion.
- Motion only to explain scope or connection.
- Visual system per DESIGN.md. Live mode must meet DESIGN.md section 6.
- Images: public-domain or licensed only; log each in CREDITS.md.
- After each task: summarize changes, list manual tests, note open questions.
