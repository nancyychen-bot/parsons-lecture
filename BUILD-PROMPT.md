# Build a World — Prompts for Claude Code

How to use this file:
1. Unzip this kit into an empty project folder.
2. Optional but recommended: export PNGs of every artboard from the design canvas (Share › Export) into `design/exports/`. The `.dc.html` mockups only render inside the design tool, so these images are the visual reference to compare against.
3. Paste **Prompt 0** as your first message.
4. Then run Prompts 1–7 **one at a time**. Test each stage yourself before sending the next.

---

## Prompt 0 — Kickoff (paste this first)

```
You're building "Build a World, Not Just a Product": a lecture website that is
presented live (black, one view at a time, 1280×720) and kept by students
afterwards (white, long-form, plus a workshop canvas).

Read these files, in this order, before writing any code:
1. PRD.md: what to build and how it behaves (v2; §5–§9 are the spec)
2. DESIGN-HANDOFF.md: how it looks, moves and navigates. Source of truth for the
   37 Live views (§4), navigation (§3) and motion (§6)
3. DESIGN.md: the Orrery design system rules
4. design/tokens/tokens.json, tokens.css, bundle.css
5. Skim design/screens/*.dc.html. These are reference mockups in a design-tool
   syntax (DESIGN-HANDOFF §0.1). They do NOT run standalone. Read their markup
   for exact positions, sizes and copy. If design/exports/*.png exists, treat it
   as the visual ground truth.

Then create CLAUDE.md in the project root with exactly the rules below, and reply
with:
(a) a one-paragraph summary of the product in your own words
(b) the component list you plan to build, mapped to the view map in DESIGN-HANDOFF §4
(c) every question or conflict you found between the docs
Do not write app code yet.

--- CLAUDE.md ---
# Project: Build a World, Not Just a Product

Sources of truth: PRD.md (behavior) · DESIGN-HANDOFF.md (look, motion, navigation,
view map) · DESIGN.md (Orrery rules). If they conflict, follow the priority stated at
the top of DESIGN-HANDOFF.md. If something is unclear, ask before inventing.

Non-negotiables
- One framework only: Product / Experience / World as nested rings (1 : 2 : 3).
  Point of view is the axis at −58°, never a fourth ring.
- All lecture copy lives in src/content/lecture.ts. Components hold no lecture text.
- Gating decisions live in LectureConfig (variant, notionApproved, studentsOnDevices,
  publicUrl). Never hard-code a variant or Notion content.
- Never fabricate Nancy's stories, community examples, screenshots, links or
  resources. Use <Placeholder label="..."> exactly where DESIGN-HANDOFF §8 lists one.
- Never build anything that imitates Notion's UI. Stand-in drawings are labelled
  "Illustrative".
- Black, white and grays only. No accent colour, rounded corners, shadows,
  gradients or emoji. Square corners everywhere; rings are the only curves.
- Live views render inside a fixed 1280×720 stage scaled to fit (DESIGN-HANDOFF §2.1).
  Reproduce the mockup positions inside that stage.
- Live legibility floors: body 28px, labels 18px, headline weight 400, ring stroke
  2.5px, axis 3.5px, at most 30 body words per view, cutouts at least 240px tall.
- Motion follows DESIGN-HANDOFF §6 exactly: opacity and stroke only, ≤1s, nothing
  ambient in Live, instant under prefers-reduced-motion.
- No backend, analytics, remote fonts or third-party scripts. Self-host the fonts.
  The network tab shows only local assets.
- Accessibility (WCAG 2.2 AA): one H1 per view, labelled controls, visible 2px focus
  ring, keyboard-only operation, a button equivalent for every SVG interaction,
  focus moves to the new H1 on every view change.
- Images: only design/assets/cutouts. Credit "Engravings generated and curated by
  Nancy Chen" in CREDITS.md and the colophon.
- After each task: summarise the changes, give a manual test script, list open
  questions. Don't start the next stage until asked.
--- end ---
```

---

## Prompt 1 — Skeleton, tokens, content model, stage, routing

```
Stage 1. Scaffold Vite + React + TypeScript with plain CSS and custom properties.
No component library, no CSS framework, no animation library.

Build:
1. src/styles/tokens.css from design/tokens/tokens.css, plus bundle.css as
   src/styles/orrery.css. Fonts go in /public/fonts; fix the url() paths.
   Cutouts go in /public/cutouts.
2. src/content/lecture.ts. Type it per PRD §8, and add these fields to View:
   cutout?: {src, alt, fig, meaning}
   plate?: string
   meta: string
   markState: 0 | 1 | 2 | 3 | "axis"
   Populate ALL 37 Live views from DESIGN-HANDOFF §4, in order, with their exact
   copy (take it from the mockups), cutAt45 flags, placeholders and fallbacks.
   Section ids are listed in DESIGN-HANDOFF §3.1.
3. LectureConfig with defaults: variant m60, notionApproved false,
   studentsOnDevices true, publicUrl "".
4. LiveStage: the fixed 1280×720 stage, uniformly scaled and letterboxed in black,
   with the four corners (meta, CircleMark, plate, nav dots + Previous/Next) per
   DESIGN-HANDOFF §2.2.
5. CircleMark with states 0–3, the clean axis and the broken axis, using the
   .orr-* classes only.
6. Hash routing and every control in DESIGN-HANDOFF §3.1–3.2. That includes the
   keyboard-safety rule, section-dot jumps, Home/End, refresh restoring the exact
   view, invalid-route recovery, and the variant filtering (§3.4).
7. Every view renders for now as a simple placeholder template: meta, H1 and body
   from lecture.ts. The real layouts come in Stage 2.

Stop when every PRD §9 Navigation test passes. Tell me exactly how to verify it,
including a list of 5 hash URLs to paste.
```

---

## Prompt 2 — Static views at pixel fidelity

```
Stage 2. Build the layout for every NON-interactive Live view in DESIGN-HANDOFF §4.
Match the mockup markup in design/screens (and design/exports/*.png if present):
same positions inside the 1280×720 stage, same type sizes, rules, captions and
cutouts.

Do these first as reusable components:
- KeyLine (variants 02, 04, 05, 06, 07)
- SpokenPrompt (variants 04, 05, 06, 07; blanks drawn as inline underlines)
- Cutout (figure + two-line museum caption)
- Placeholder (dashed faint border, "PLACEHOLDER — …" label)

Then build the one-off views: Title, About, FollowAlong, WhatIsProduct, Sketch,
CoreJob, OneTask, ThreeMoments, BlankVsTemplate, OurPlace, ExampleCards,
Distinction, NancysBuild, WorkshopBrief, WorkshopLive, CheckConnection, Share,
ThreeQuestions, Readback, Closing, TakeItWithYou, QandA.

Rules:
- Centered layout only on the arrival views (DESIGN-HANDOFF §1).
- notionApproved=false shows the illustrative stand-ins on 04.2 and 05.3.
- studentsOnDevices=false hides view 01.3 and the URL lines.
- The QR code is generated at build time as inline SVG from publicUrl (no
  third-party service). With an empty URL, show the placeholder.

Stop and give me a table: view → mockup file → anything you could not match and why.
```

---

## Prompt 3 — Workshop canvas (the most important feature)

```
Stage 3. Build WorkshopCanvas + useWorkshopDraft per PRD §6 (section 08) and §7, and
the student page design in design/screens/Workshop.dc.html (Explore theme, #/workshop).

Must have:
- Field order and helper text exactly as DESIGN-HANDOFF §4 and the mockup describe.
- Autosave debounced ~400ms to localStorage key baw.workshop.v1, with the
  "Saved in this browser" status in role=status.
- In-memory fallback with the PRD warning when storage is blocked.
- Live ring preview: a ring fills (and draws in) the first time its field has
  content; the axis appears when Connection has content.
- Copy brief (fixed order, "Not yet filled in" for empty fields) with a manual-copy
  text box fallback.
- print.css for the filled canvas (rings on page 1, answers never clipped) and a
  separate blank canvas with the same fields in the same order.
- Reset with an inline confirmation, only when any field has content.
- 09.2 Readback shows "Yours: …" lines when a draft exists; the 08/09 mark mirrors
  the draft.

Stop when every PRD §9 Workshop test passes. List the edge cases you tested,
including a 2,000-character answer.
```

---

## Prompt 4 — Teaching interactions

```
Stage 4. Build the interactive views as components that take a `start` prop, so the
wrapper views in DESIGN-HANDOFF §4 are the same component in a different state:

- TouchpointSelect (02.2 orbit, 02.3 mapped). Nine aria-pressed buttons. Exact orbit
  and mapped positions are in the Touchpoints mockup's renderVals. Labels sit on the
  side away from the centre. The status line goes in role=status.
- CircleExplorer (03.1–03.3). Buttons are the primary control; the SVG rings are
  mirrors with ~40px hit areas. Rings beyond the selected one render unfilled.
- BeforeAfter (05.1). A Shop A/B toggle; the active panel shows the four numbered
  lever callouts; the inactive panel is dimmed to 0.45.
- ContradictionRepair (07.1 coherent, 07.2 broken). Three states (coherent →
  broken → repaired). Any ring choice repairs. Picking the same ring again
  re-breaks. "Break it again" button. The repair is announced politely. The mark
  mirrors the axis state.

Each one must work by keyboard alone. State resets when the view is left and
re-entered. → still advances while focus is anywhere other than a control.

Stop and give me a keyboard-only test script for each.
```

---

## Prompt 5 — Motion

```
Stage 5. Implement every row of the motion table in DESIGN-HANDOFF §6, and nothing
beyond it.

- Durations come from the timing tokens as CSS custom properties.
- CSS transitions and keyframes only.
- View enter: staggered opacity fade, re-keyed on view change. View leave: instant.
- Ring draws: stroke-dashoffset, using pathLength="1" on the circles so the dash maths
  is size-independent. Keep non-scaling-stroke.
- Touchpoint move: left/top transitions; rings draw first, then the points move.
- Axis break/repair: rotate the outer segment groups −58° ↔ −52° and animate the gap.
- The mark draws a newly reached ring only on the first arrival in a section, not on
  every view.
- prefers-reduced-motion: every animation off, final states shown instantly, same
  content and controls.
- No transform, slide or full-screen fade anywhere in Live mode.

Stop and describe each motion, with the file and line where it lives, plus how to
toggle reduced motion to check it.
```

---

## Prompt 6 — Presenter window, Explore mode, mode switching

```
Stage 6.
1. PresenterWindow at #/presenter, opened with P.
   - Shows: current view (scaled), next view, presenter notes, elapsed time and the
     section's minute budget for the active variant.
   - Syncs with the audience tab over BroadcastChannel; Next/Previous in either
     window moves both.
   - Without BroadcastChannel: the N toggle with an on-screen warning.
   - Closing it leaves the audience tab working.
2. ExplorePage at #/explore/:section, matching design/screens/Explore.dc.html:
   - header with the Live|Explore toggle
   - a 224px section list (sticky on desktop; a sticky dropdown on mobile)
   - 640px reading column
   - interactions inline as ruled figures
   - placeholders inline
   - prev/next section buttons at the bottom
   - "Explore adds" material from PRD §6
   It renders every section from lecture.ts, not just 05.
3. Mode switching keeps the section and the workshop draft. E switches from Live to
   Explore. Below 768px, Live routes show the Explore section with a short note.

Stop when every PRD §9 Presenter test passes, and tell me how to run the
screen-share test.
```

---

## Prompt 7 — QA pass

```
Stage 7. Audit against every checkbox in PRD §9 AND DESIGN-HANDOFF §10. For each
item report pass/fail with evidence (what you ran or checked). Fix the failures and
re-run.

Also check:
- heading order
- focus visibility on black and on white
- contrast of every muted text on both grounds
- ring distinguishability in the 64px mark
- 320px layout and 200% zoom on the Explore and workshop pages
- no network requests after load
- the m45 / m60 / m75 variants and notionApproved true/false

Use Playwright to screenshot all 37 Live views at 1280×720. Put them side by side
with design/exports (if present) in a single review.html, and list every visible
difference.
```

---

## Afterwards (when Nancy has the content)

```
Replace placeholders with the content in /content-drop. Change only lecture.ts and
public/ assets. Report every placeholder that is still unfilled, and confirm that no
invented content remains.
```
