# Build a World — Design Handoff (full lecture)

This is the source of truth for **how the site looks, moves and navigates**. `PRD.md` covers what to build and how it behaves. `DESIGN.md` is the Orrery design system.

**When the docs conflict:** PRD.md wins on behavior, this file wins on look, motion and navigation, and DESIGN.md wins on anything this file doesn't cover. Orrery's legibility rule (Live mode readable over a 1280×720 Zoom share) overrides everything.

---

## 0. Folder map

```
PRD.md                    product requirements (v2)
DESIGN.md                 Orrery design system rules (README)
DESIGN-HANDOFF.md         this file
BUILD-PROMPT.md           staged prompts for Claude Code
design/
  screens/*.dc.html       39 reference mockups (37 Live views + 2 Explore pages)
  tokens/tokens.json      Orrery tokens
  tokens/tokens.css       CSS custom properties + @font-face (fonts at ../fonts/)
  tokens/bundle.css       Orrery component classes (.orr-ring, .orr-btn, .orr-field …)
  assets/cutouts/*.png    16 die-cut engravings (grayscale, white border, transparent outside)
  assets/CREDITS.md
  fonts/*.woff2           Newsreader (variable, opsz, roman + italic), IBM Plex Mono 400/500 (OFL)
```

### 0.1 How to read the mockups

`*.dc.html` files come from a design tool. They are **references for layout and visuals, not code to ship.**

Syntax:
- `<x-dc>` holds the markup.
- `{{name}}` is a value computed in `renderVals()` in the `<script type="text/x-dc">` block at the bottom of the file.
- `<sc-if value="{{x}}">` renders conditionally. `<sc-for list="{{xs}}" as="x">` repeats.
- `onClick="{{fn}}"` binds a handler.
- `data-props` declares design variants.
- `<dc-import name="X" prop="…">` embeds `X.dc.html` with props. Nine views are thin wrappers like this. Build those as *the same component in a different state*, never as a copy.

What carries over and what doesn't:
- **Absolute pixel positions** describe the canonical **1280×720 Live stage** (§2.1). Reproduce them inside that stage.
- **Inline Previous/Next links** in the mockups only prototype the flow. The real navigation is §3.
- **Copy** in the mockups is final unless §8 marks it as draft. In the app, every string lives in `src/content/lecture.ts`.

---

## 1. Direction in one paragraph

Co-Star's visual grammar with an orrery's stance: "you build the mechanism; nothing is read to you." That means:
- Black Live frames, Newsreader serif at large sizes, small widely spaced Plex Mono labels.
- Four corner labels on every frame, so it reads like a page from an almanac.
- Die-cut engravings captioned like museum objects ("FIG. 06 · RAVEN" / "THE REGULAR WHO KEEPS COMING BACK").
- Ruled tables, not cards.
- One shape repeated everywhere: three nested rings (ratio 1 : 2 : 3) and a point-of-view axis at −58°.

Layout grammar:
- **Arrival screens are centered:** title, key lines, closing, read-back, Q&A.
- **Teaching screens are off-center:** diagram on one side, text on the other.
- **Spoken prompts are left-aligned italic sentences with drawn blanks.**

The layout tells students what kind of moment they're in before they read a word.

---

## 2. Global system

### 2.1 The Live stage
- **Fixed design coordinates.** Render every Live view inside a fixed **1280×720** stage. Scale it uniformly to fit the window (`transform: scale(min(vw/1280, vh/720))`), centered, letterboxed in `--ground` black. Text, rings and cutouts then sit exactly where the mockups put them on any projector or screen share.
- **Stroke width stays fixed.** Rings use `vector-effect: non-scaling-stroke`, so their thickness doesn't change with the scale.
- **Overflow scrolls, never crops.** If a view's content is taller than the stage (rare; the workshop on small screens), the stage scrolls.
- **Phones get Explore.** Live mode is not used below 768px wide; there, `#/live/...` shows the Explore section page with a "Presenter view is designed for large screens" note.
- **Safe area:** 64px left/right, 48px top/bottom.

### 2.2 Corner anatomy (every Live view)

| Corner | Contents | Style |
|---|---|---|
| Top left | Section metadata, e.g. `05 / 09 · EXPERIENCE · NEAR ORBIT` | `.orr-label.orr-muted`, 18px in Live |
| Top right | Progress mark, 64×64 (state per §2.4) | |
| Bottom left | Plate label, e.g. `PLATE 05 · R = 2 · FOUR LEVERS` | `.orr-label.orr-muted` |
| Bottom right | Nav: 9 section dots, then `Previous`, `Next` | text buttons in `muted` |

Section dots:
- **Past:** outline, `.orr-tp`.
- **Current:** filled `.orr-core`, r 5.
- **Future:** faint, `.orr-core--unfilled`.

The dots are clickable: each one jumps to that section's first view (§3.1).

### 2.3 Type in Live
- **Headlines:** Newsreader 400 (never 300 in Live), `font-variation-settings: 'opsz' 72`.
- **Size floors:** body 28px, labels 18px.
- **Word limit:** at most 30 body words per view.
- **Readings** (the italic hook that opens a section): 28–30px.

### 2.4 Rings, axis and progress mark
- **Radii** are always in the ratio 1 : 2 : 3. The core dot is r/4.
- **Product and Experience rings:** solid.
- **World ring:** dashed `10 6` in Live, dotted `0 6` in Explore and print.
- **Unfilled rings** (not reached yet): `faint` colour with dash `2 3`.
- **Axis:** at −58° through the center, running 12% past the World ring, with a tick at each end.
- **Broken axis:**
  - a gap of r × 0.18 (≥ 20px in Live) either side of the offending ring
  - the outer segments swung to −52°
  - the mark mirrors the break
- **Ring labels:** mono capitals with a `ground`-coloured stroke behind the text (`paint-order: stroke`), which knocks out the ring. Set them at an angle that stays clear of the axis: −90°, 180° or −120°.
- **Classes:** use `.orr-ring`, `.orr-ring--world`, `.orr-ring--unfilled`, `.orr-core`, `.orr-axis`, `.orr-mark` from `bundle.css`. Never inline stroke widths.
- **Progress mark state by section:**

  | Sections | Mark |
  |---|---|
  | 01–02 | Empty (all rings unfilled) |
  | 03–04 | Product filled |
  | 05 | Product + Experience filled |
  | 06 | All three filled |
  | 07, 08, 09, Q&A | All filled + axis |

  In 08 and 09 the mark mirrors the student's draft if one exists.

### 2.5 Cutouts
- **Count:** one per view at most. The site must work with none.
- **In Live:** only the cutouts listed in §7, which are all safe for screen-share, and only at **240px tall or more**.
- **Caption:** two `.orr-label` lines (the second `.orr-muted`), beside the image. Never put an image behind text or text on an image.
- **Credit:** log in `CREDITS.md` as **"Engravings generated and curated by Nancy Chen."**

---

## 3. Navigation

### 3.1 Routes (hash routing, static-host friendly)

| Route | Shows |
|---|---|
| `#/` | 01.1 Title |
| `#/live/:section/:view` | One Live view, e.g. `#/live/experience/2` (sections by id, views 1-based) |
| `#/explore/:section` | Explore page scrolled to that section |
| `#/workshop` | Student workshop canvas (Explore theme) |
| `#/presenter` | Presenter window (PRD §7) |

- A refresh restores the exact view.
- Invalid routes fall back to the nearest valid section and view.
- Section ids: `start`, `what-is-a-product`, `circles`, `product`, `experience`, `world`, `connect`, `workshop`, `take-it`, `qa`.

### 3.2 Live controls

| Input | Action |
|---|---|
| `→`, `Space`, `PageDown`, Next button | Next view (into the next section at the end of one) |
| `←`, `PageUp`, Previous button | Previous view |
| Section dot | Jump to that section's view 1 |
| `Home` / `End` | First view / Q&A |
| `P` | Open the presenter window (BroadcastChannel sync, PRD §7) |
| `N` | Notes toggle fallback, only if BroadcastChannel is unavailable, with an on-screen warning |
| `Esc` | Exit fullscreen |
| `F` | Optional fullscreen |

- **Keyboard safety:** ignore every navigation key while focus is in an `input`, `textarea`, `select`, `button`, `[contenteditable]` or any interactive component. Interactive views keep Tab, Enter and Space for their own controls.
- **Interactive views do not trap navigation.** `→` always advances. Their state resets when you leave and come back, except the workshop draft.

### 3.3 Mode switching
- The `Live | Explore` toggle sits in the Explore header. In Live, `E` switches to Explore.
- Switching keeps the current section and the workshop draft (PRD §7).
- The title screen's three actions route to:
  - `Enter the world` → `#/live/start/2`
  - `Explore on your own` → `#/explore/start`
  - `Go to the workshop` → `#/workshop`

### 3.4 Run-of-show variants
`LectureConfig.variant` (`m45` | `m60` | `m75`) hides the views flagged `cutAt45` and changes the minute labels. The 45-minute cut rules are in PRD §5. The views listed in §4 are the 60-minute variant.

### 3.5 Focus and announcements
- On every view change, move focus to the new view's H1 (`tabindex="-1"`) and announce "Section name, view n of m" in a polite live region.
- Use exactly one H1 per view. The Three Questions view has a visually hidden H1.

---

## 4. View map (60-minute variant, 37 Live views)

"Mockup" names the file in `design/screens/`. "State" is the props to pass when the view reuses a component.

| # | Route | View | Mockup | Component / state | Cutout | Interactive | cutAt45 |
|---|---|---|---|---|---|---|---|
| 01.1 | start/1 | Title | Main | — | jupiter | links | |
| 01.2 | start/2 | About Nancy | About | — | placeholder headshot | | |
| 01.3 | start/3 | Follow along (link + QR) | FollowAlong | shown only if `studentsOnDevices` | — | | |
| 02.1 | what-is-a-product/1 | Prompt: where does it begin and end? | WhatIsProduct | — | — | | |
| 02.2 | what-is-a-product/2 | Touchpoints | Touchpoints | `TouchpointSelect start="orbit"` | telescope | ✓ | |
| 02.3 | what-is-a-product/3 | Reveal | Reveal → Touchpoints | `TouchpointSelect start="mapped"` | telescope | ✓ | ✓ |
| 02.4 | what-is-a-product/4 | Key line | KeyLine02 → KeyLine | `KeyLine section="02"` | telescope | | |
| 03.1 | circles/1 | Product | Circles1 → CircleExplorer | `CircleExplorer start="product"` | nautilus | ✓ | |
| 03.2 | circles/2 | + Experience | CircleExplorer | `start="experience"` | nautilus | ✓ | |
| 03.3 | circles/3 | + World | Circles3 → CircleExplorer | `start="world"` | nautilus | ✓ | |
| 03.4 | circles/4 | Sketch prompt + key line | Sketch | — | — | | |
| 04.1 | product/1 | Core job | CoreJob | — | apple-half | | |
| 04.2 | product/2 | One task (Notion or fallback) | OneTask | `notionApproved` swaps the drawing for a screenshot | — | | ✓ |
| 04.3 | product/3 | Spoken prompt | Prompt | `SpokenPrompt section="04"` | — | | ✓ |
| 04.4 | product/4 | Key line | KeyLine04 → KeyLine | `KeyLine section="04"` | stag-beetle | | |
| 05.1 | experience/1 | Same coffee, two shops | BeforeAfter | `BeforeAfter start="B"` | — | ✓ | |
| 05.2 | experience/2 | Three moments | ThreeMoments | — | — | | |
| 05.3 | experience/3 | Blank page vs. template | BlankVsTemplate | `notionApproved` swap | — | | ✓ |
| 05.4 | experience/4 | Spoken prompt | Prompt05 → Prompt | `SpokenPrompt section="05"` | — | | |
| 05.5 | experience/5 | Key line | KeyLine05 → KeyLine | `KeyLine section="05"` | hawk-moth | | |
| 06.1 | world/1 | "Our place" | OurPlace | — | constellation | | |
| 06.2 | world/2 | Examples ×3 | ExampleCards | `ExampleCard` ×3 (×1 at 45) | raven | | |
| 06.3 | world/3 | Distinction | Distinction | — | quartz-cluster | | ✓ |
| 06.4 | world/4 | Key line | KeyLine | `KeyLine section="06"` | winged-key | | |
| 07.1 | connect/1 | Point of view (coherent) | PointOfView → Contradiction | `ContradictionRepair start="coherent"` | — | ✓ | |
| 07.2 | connect/2 | Contradiction → repair | Contradiction | `start="broken"` | — | ✓ | |
| 07.3 | connect/3 | Nancy's build | NancysBuild | placeholders + fallback | alembic | | ✓ (moves to Q&A) |
| 07.4 | connect/4 | Key line | KeyLine07 → KeyLine | `KeyLine section="07"` | anchor | | |
| 08.1 | workshop/1 | Brief + timing | WorkshopBrief | — | — | | |
| 08.2 | workshop/2 | Canvas (projected) | WorkshopLive | — | — | | |
| 08.3 | workshop/3 | Check the connection | CheckConnection | — | — | | ✓ (fold into share) |
| 08.4 | workshop/4 | 60-second share | Share | — | telescope | | |
| 09.1 | take-it/1 | Three questions | ThreeQuestions | — | — | | |
| 09.2 | take-it/2 | This site, read back | Readback | `studentCanvas` when a draft exists | ouroboros | | |
| 09.3 | take-it/3 | Closing line | Closing | — | fern | | |
| 09.4 | take-it/4 | Take it with you | TakeItWithYou | downloads | — | links | |
| QA | qa/1 | Questions | QandA | — | — | | |

Student pages (Explore theme): `Workshop.dc.html` → `#/workshop`; `Explore.dc.html` → `#/explore/:section` (mockup shows section 05).

---

## 5. Reusable view templates

Build these as components. They cover 15 of the 37 views.

1. **KeyLine `{section}`**
   - Centered layout. Cutout (240px) top-center, caption to its right.
   - Then a `KEY LINE` label over a 96px rule.
   - Then the line at 64px, centered, `text-wrap: balance`, max width 1060px.
   - Variants: 02, 04, 05, 06, 07. Copy, cutout and caption for each are in the mockup's `renderVals`.
2. **SpokenPrompt `{section}`**
   - Left-aligned in the lower third.
   - Label: `SPOKEN PROMPT · SAY IT TO THE PERSON NEXT TO YOU, OR TYPE IT IN CHAT`, over a 96px rule.
   - The sentence in 68px italic, with each blank drawn as an inline 220px underline (3px).
   - A muted line underneath.
   - No image, so it never reads as a key line.
   - Variants: 04, 05, 06, 07.
3. **CircleMark** (rings, axis, states)
4. **LiveStage** (corners, safe area, scaling)

---

## 6. Motion

Motion explains scope or connection; anything else is cut.
- Nothing runs longer than 1s.
- Over video, animate opacity and stroke only. No slides, zooms, parallax or full-screen fades.
- No ambient motion in Live.
- Under `prefers-reduced-motion`, every state appears instantly in its final form.

| Moment | What moves | Duration and easing | Token |
|---|---|---|---|
| View enters | Text blocks fade in, one after another in DOM order: meta, reading, headline, body, lists. Opacity 0→1 only | 200ms each, 80ms stagger, ease-out | `t-line`, `t-stagger` |
| View leaves | Nothing animates out; the outgoing view is removed at once | 0 | — |
| Cutout enters | Fade 0→1 with the first text block | 200ms | `t-line` |
| A ring is reached for the first time (mark on section change; diagram in 03) | Stroke draws in via `stroke-dashoffset` | 500ms in Live, 700ms in Explore, ease-out | `t-ring-draw-live`, `t-ring-draw` |
| 02 "See the bigger picture" | Rings draw in, then touchpoints move from the orbit to their rings (animate `left`/`top`) | Rings 500ms, then points 500ms | `t-touchpoint` |
| 02 touchpoint toggle | Dot fill changes instantly; no animation | 0 | — |
| 03 ring select | Ring style changes (unfilled ↔ ink) and the label colour changes; the text panel's three lines re-run the line fade | Ring 500ms draw; text 200ms | |
| 05 Shop A/B toggle | Instant. Opacity animation reads as mush over video | 0 | — |
| 07 break | Outer axis segments rotate −58° → −52° and the gap opens | 400ms, ease-out | `t-axis` |
| 07 repair | Segments rotate back, gap closes, repair text fades in | 400ms axis, then 200ms text | `t-axis`, `t-line` |
| 08 workshop | A ring draws in the first time its field gets content. The axis draws when Connection gets content | 700ms (Explore) | `t-ring-draw` |
| Explore mark | Optional slow rotation, one turn per 120s, Explore only | 120s linear | `t-mark-turn` |
| Presenter sync | No animation; the audience tab follows instantly | 0 | — |

Implementation notes:
- Drive all durations from CSS custom properties.
- Use CSS transitions and keyframes only. No animation library.
- To re-run the line fade, re-key the view container when the view index changes.

---

## 7. Cutout map

| File | Live-safe | Used on | Caption (label / meaning) |
|---|---|---|---|
| jupiter.png | ✓ | 01.1 | Fig. 01 · Jupiter / A world with its own moons |
| telescope.png | ✓ | 02.2, 02.3, 02.4, 08.4 | Fig. 02 · Telescope / Your product, seen from outside (08.4: Seen from outside, by someone else) |
| nautilus.png | ✓ | 03.1–03.3 | Fig. 03 · Nautilus / Growth in proportion |
| apple-half.png | ✓ | 04.1 | Fig. 04 · Apple, halved / The core, cut open |
| stag-beetle.png | ✓ | 04.4 | Fig. 04 · Stag beetle / The product, examined |
| hawk-moth.png | ✓ | 05.5 | Fig. 05 · Hawk moth / Drawn to the light, not told to come |
| constellation.png | ✓ | 06.1 | Fig. 06 · Constellation / A shape people agree to see |
| raven.png | ✓ | 06.2 | Fig. 06 · Raven / The regular who keeps coming back |
| quartz-cluster.png | ✓ | 06.3 | Fig. 06.3 · Quartz cluster / Many small parts, one thing |
| winged-key.png | ✓ | 06.4 | Fig. 06 · Winged key / The invitation |
| alembic.png | ✓ | 07.3 | Fig. 07 · Alembic / A rough version, refined |
| anchor.png | ✓ | 07.4 | Fig. 07 · Anchor / The core that holds |
| ouroboros.png | ✓ | 09.2 | Fig. 09 · Ouroboros / A ring that feeds itself |
| fern.png | ✓ | 09.3 | Fig. 09 · Fern / A pattern that keeps growing |
| platonic-solids.png | Explore only | Workshop page | Fig. 08 · Platonic solids / Build from first principles |
| moon-phases.png | Explore only | Explore page, 05 | Fig. 05.2 · Moon phases / One thing, seen in stages |

Every cutout needs descriptive alt text. Suggested strings are in the mockups.

---

## 8. Content status

### Placeholders (visible and labelled; never invent replacements)
- Headshot (01.2)
- QR code and public URL (01.3, 08.2, 09.4)
- Notion screenshots: 04.2 and 05.3. Both show an "illustrative" stand-in drawing while `notionApproved` is false.
- Three community examples (06.2)
- Nancy's build story (07.3; fallback is this site plus the change from the dry run)
- Prototype resources (09.4)

### Draft copy (written for the mockups; Nancy must approve)
- **01.2 bio:** "No 'product,' 'design' or 'engineering' in my title." / "I build products anyway: dashboards, backends, tools vibe-coded into Notion. Before that, six businesses across food, wine, e-commerce and music." / "Also teaches AI, marketing and psychology at NYU." This view is marked "Draft bio — confirm before class".
- **Headlines:**
  - 04.1: "Before a product means something, it has to do something."
  - 04.2: "Organizing a class project." / "That's the job. Every feature either serves it or waits."
  - 05.2: "Three moments decide how it feels."
  - 05.3: "Same tool. Different feeling."
  - 06.1: "Then it becomes 'our place.'"
  - 06.2: "Look for what people made."
  - 07.3: "One of my builds, read through the three circles."
  - 09.4: "Keep the canvas. Use it this week."
- **05.2 coffee examples:** "Reading the menu for the first time." / "Ordering, then waiting." / "The wrong drink arrives."
- **05.1 Shop A / Shop B menu text**, and the **07.2 discussion prompts and repairs**
- **Cutout caption meanings** and all **plate labels**

---

## 9. Decisions that deviate from earlier briefs

Confirm with Nancy before changing any of these.

| Earlier brief | Built as | Why |
|---|---|---|
| Sans-serif body and buttons | Newsreader + IBM Plex Mono | Orrery type system |
| Ring strokes lighter outward | Equal weight; told apart by line style plus label | Orrery: rings identical everywhere |
| Vertical POV axis | −58° everywhere | Matches the progress mark. **Least certain call** |
| Cards with fills or borders | Ruled lists; dashed boxes only for placeholders | Orrery: no filled cards |
| Key line: "nothing else" | Adds one centered cutout | Character pass Nancy asked for; drop the image if it competes |
| Privacy line "No answers leave this browser." | "Your answers stay on this device. Nothing is sent anywhere." | Orrery microcopy |
| Responsive Live layout | Fixed 1280×720 stage scaled to fit | Pixel fidelity on projectors and shares |

---

## 10. Design acceptance checks

Run these in addition to PRD §9.

- [ ] All 37 Live views exist in the order in §4; `m45` hides exactly the views marked `cutAt45`.
- [ ] The Live stage scales uniformly and letterboxes in black. Nothing reflows between 1280×720 and 1920×1080.
- [ ] Every Live view has all four corner elements; the nav recedes in muted.
- [ ] The progress mark matches §2.4 on every view, and newly reached rings draw in on section change.
- [ ] Every transition in §6 is implemented, and under reduced motion none of them animates.
- [ ] `→` advances from every view, including interactive ones; typing in any field never navigates.
- [ ] The P presenter window drives the audience tab; only the audience tab is shared.
- [ ] Every cutout matches §7: correct view, at least 240px tall in Live, two-line caption, alt text.
- [ ] Every placeholder in §8 is visibly labelled; no invented examples, links or screenshots.
- [ ] Recorded Zoom playback at half width: ring styles, the 07 axis break and every label stay readable.
