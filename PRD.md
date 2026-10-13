# Build a World — PRD v2

Oct 12, 2026 · @Nancy Chen

## 0. What changed from v1, and why

v1 was strong on concept and engineering rigor. Under stress it breaks in five places, and all five can be fixed without adding a second framework.

**How to use this doc:** Sections 1–5 define what and why. Sections 6–10 define how and can be pasted into a coding tool as PRD.md. Visual direction now lives in a separate doc, the **Design Brief** (save it as DESIGN.md). Section 10 has staged prompts; run them in order.

| # | Weak point in v1 | Why it matters | Fix in v2 |
| --- | --- | --- | --- |
| 1 | The run of show is \~66 min with seven participatory beats and no Q&A | Interactive beats always run long. The instructor's first goal is for students to meet someone from the industry, and v1 leaves no time for questions | Three timed variants (45, 60, 75 min), 10 min of protected Q&A, and in-section prompts that are spoken, not written (§5) |
| 2 | Presenter notes are toggled with N on the same screen | If Nancy presents remotely and shares her screen, pressing N shows the notes to the whole class | A presenter window synced to the audience tab with no backend (§7) |
| 3 | The creative direction fights the delivery conditions | Hairlines, dotted rings, grain and 11–13px mono labels are the first things video compression and projectors destroy | A separate Live-mode legibility spec with minimum stroke widths and type sizes (Design Brief §6) |
| 4 | The Co-Star reference is too close for a room of Parsons designers | A lecture about having a point of view, dressed in someone else's, gets clocked in the first minute | Keep the visual grammar, change the stance: "orrery, not horoscope," and credit the reference openly (Design Brief §2) |
| 5 | Content depends on Notion approval and on stories that don't exist yet | Sections 04–07 lean on Notion examples. If approval stalls, half the lecture has holes the week of the class | Notion approval is the first gate. Every Notion slot has a named fallback, and the site itself is the fallback for "Nancy's build" (§4, §6) |

Smaller changes:

- **02** adds a "mobile order app" touchpoint. The screen becomes one dot among many, which makes the reading "The screen is the smallest part of it" literal.
- **05** resolves a contradiction. v1 bans "anything resembling Notion's UI" but asks for a Notion mockup. v2 uses approved screenshots or an abstract wireframe in the site's own visual language.
- **07** draws point of view as an axis running through all three rings. A contradiction shows as a break in the axis, and the repair restores it.
- **08** gives the World field a test: "something a real person would do without being paid or asked twice." This stops students with no users from inventing fake communities.
- **09** adds the reveal v1 promised but dropped: this site, read through its own three circles.
- Requirements now carry priorities (Must, Should, Could), so the build can be cut if time runs short.

Kept as is: the single model, honest placeholders, the local-only privacy stance, hash routing, the workshop data model and the staged build.

## 1. Concept

A lecture website that teaches one idea (products become experiences, and experiences become worlds) and proves it by being a small world itself. Students enter it, move through it, and leave with something they made.

- **Title:** Build a World, Not Just a Product
- **Subtitle:** How products become experiences, and experiences become worlds

### The model (the only framework on the site)

| Circle | Question | Meaning | Coffee-shop example |
| --- | --- | --- | --- |
| Product | What can I do? | The useful core | Get a good cup, reliably |
| Experience | How does it feel? | Everything around using it | Ordering feels welcoming, not intimidating |
| World | What am I part of? | The identity, culture and community people help create | Regulars, tastings, "our place" |

The product sits inside the experience. The experience sits inside the world. **Point of view is not a fourth circle.** It is the axis that runs through all three, and a product is coherent when the axis passes through every ring without breaking. This is how v2 shows POV visually without adding a concept.

### Why the coffee shop, and its limit

The coffee shop works for journalism and psychology majors because nobody needs domain knowledge to reason about it. Its risk is that it is the most familiar example in experience design (the "third place"). Two mitigations:

- Name the cliché out loud in 03 ("You've heard the coffee-shop example. Stay with it; it's about to break."), then use it for the contradiction in 07.
- From 04 onward, every coffee beat is paired with a digital beat (Notion, then Empower in the workshop) so the model never stays in the physical world for long.

### Signature idea: the site is the final case study

A small three-ring mark (the "orrery") is always visible and serves as the progress indicator. It fills from the inside out:

| Sections | Mark state |
| --- | --- |
| 01–02 | Outlines only |
| 03–04 | Product fills |
| 05 | Experience fills |
| 06 | World fills |
| 07 | The POV axis appears through all three |
| 08–09 | The mark becomes the student's own canvas |

In 09, Nancy names it explicitly: the lecture is a product (a talk and a usable canvas), its experience is the journey they just took, and its world is whatever they do with the canvas next. v1 had this idea in the architecture notes but dropped the moment where it is said out loud.

## 2. Why this site exists

**Problem.** Students tend to equate product design with user archetypes, a vision statement and a few polished screens in Figma. The instructor's concern is sharper than "they focus on UI": AI tools will soon make good screens faster than students can. What they need is a point of view about what makes a product good, which AI can't generate for them.

**The site's job:** replace "product = screens" with "product = the relationship," in a form students can reuse that same week.

### Success criteria

| Who | During class | A week later |
| --- | --- | --- |
| Students | Can name the three circles and fill a canvas for Empower or their own project | At least some canvases show up in long-project pitches (ask the instructor) |
| Students | Hear how someone without "design" in their title builds products | Ask Nancy a follow-up question, or reuse the canvas without prompting |
| Nancy | Presents from the site without slides, tab-switching or visible notes | Shares one link as a lasting resource |
| Instructor | Sees students reason beyond the interface in the share-outs | Reuses the canvas in future critiques |

### The AI thread

The instructor invited Nancy partly because of AI. v1 mentions it once. v2 states the idea at three points, one line each, so it lands without becoming its own topic:

- **04:** "AI can generate a solution. It can't decide which problem deserves your attention."
- **07:** "AI can draw any of these circles. It can't choose the belief that runs through them."
- **09:** The site was vibe-coded by someone without "engineer" in her title. The judgment was hers; the typing was shared.

## 3. Audience and constraints

- **Primary audience:** Parsons seniors in a digital product design course, including journalism, psychology and other non-design majors. Assume curiosity, not technical fluency or familiarity with Notion.
- **Their running context:** They are redesigning Empower (a ride-share app where drivers keep 100% of profit) and building their own product for a Shark Tank-style pitch. Coding is optional; some are vibe coding.
- **Presenter:** Nancy, possibly remote over video while traveling. She may present from one laptop with no second monitor.

### Viewing contexts (design for the worst one)

| Context | Who | What breaks first |
| --- | --- | --- |
| Zoom or Meet screen share at 1280×720 | Remote class | Hairlines, dotted strokes, grain, small type, slow motion (it turns into stutter) |
| Classroom projector | In-person class | Gray text, thin light-weight serifs, true black washing out to gray |
| Student laptop | Workshop | Small text inputs beside a large diagram |
| Student phone | Workshop when no laptop is available | Diagram and fields competing for 375px |
| Paper | Students with no device; the takeaway | Anything that relies on screen state |

### Non-goals for v1

Accounts, a backend, a CMS, shared submissions, live polling, AI features, analytics, a prototype builder, or any framework beyond the three circles. The presenter window (§7) is not a backend; it syncs two tabs on the same machine.

## 4. Gating decisions and timeline

Four decisions change what gets built, so they come before Stage 1. Everything else can wait for placeholders.

| Decision | What it changes | Default if unanswered | Ask |
| --- | --- | --- | --- |
| Class date and length | Which run-of-show variant (§5), every milestone below | 60-minute variant | Instructor |
| In person or remote | Whether the presenter window is a Must; Live-mode legibility targets | Assume remote; it is the harder case | Nancy + instructor |
| Students on their own devices? | Whether a QR code and link appear at 01; whether the workshop is digital or paper | Share the link; print 10 blank canvases | Instructor |
| Notion approval to show Notion examples publicly | Content in 04, 05, 06 | Use the fallbacks in §6 | Nancy's manager or comms |

Ask for Notion approval first. It has the longest lead time and the widest blast radius. Ask in the same message that tells Notion about the lecture (already an action item from the instructor call).

### Milestones, counted back from class day (T)

The date isn't fixed yet, so milestones are relative. Nancy's November travel (Athens, Cairo) means anything after T−14 may happen on the road. Plan for that by locking content early.

- [ ] **T−28:** Ask the four gating questions. Request Notion approval.
- [ ] **T−21:** Stages 1–2 built (skeleton, workshop). Content gathering starts.
- [ ] **T−14:** Stage 3 done. Send the draft link to the instructor.
- [ ] **T−10:** Instructor feedback in. Dry run with 2–3 people. Note one change prompted by what they did, not what they said (this becomes the fallback story for 07).
- [ ] **T−7:** Content lock. Every placeholder replaced or deliberately cut. Stages 4–5 (presenter window, visual polish) done.
- [ ] **T−3:** Stage 6 QA, including a real screen-share test over Zoom and recorded playback.
- [ ] **T−1:** Rehearse once on the device and network you'll present from.

## 5. Run of show

The workshop and Q&A are protected; the teaching sections absorb the cuts. v1 summed to \~66 minutes before any discussion overran. v2 plans for overrun by making every in-section prompt spoken ("turn to the person next to you" or "type it in chat"), not written. Writing happens once, in 08.

| # | Section | Live views | Circle focus | Interaction | 45 min | 60 min | 75 min |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Start | Title → About Nancy → Link/QR | None | Mode choice | 1 | 2 | 3 |
| 02 | What is a product? | Prompt → Touchpoints → Reveal → Key line | None → all | Touchpoint select | 3 | 4 | 5 |
| 03 | The three circles | Product → +Experience → +World → Sketch prompt | Builds outward | Circle explorer | 5 | 5 | 7 |
| 04 | Product | Core job → Notion task → Prompt → Key line | Product | Spoken prompt | 2 | 4 | 6 |
| 05 | Experience | Two shops → Three moments → Notion example → Prompt | Experience | Before/after toggle | 5 | 6 | 8 |
| 06 | World | "Our place" → Examples ×3 → Distinction → Key line | World | Example cards | 4 | 6 | 8 |
| 07 | Connect the circles | POV axis → Contradiction → Repair → Nancy's build | All + axis | Contradiction repair | 4 | 6 | 8 |
| 08 | Build your world | Brief → Canvas → Check → Share | All | Workshop canvas | 14 | 15 | 18 |
| 09 | Take it with you | Three questions → This site, read back → Closing line | All | Copy / print | 1 | 2 | 2 |
| — | Q&A | Holding view | — | — | 6 | 10 | 10 |
|  | **Total** |  |  |  | **45** | **60** | **75** |

### Cut rules

- **At 45 min:** 04 becomes one view (core job + key line). 06 shows one example card, not three. 07 skips Nancy's build; it moves into Q&A as a story if asked. 08 drops the formal "Check" view and folds it into the share.
- **Running long live:** Skip forward with the section dots. Never cut 08 below 12 minutes or Q&A below 5.
- **The test of a cut:** If a view can be removed and the key line still lands, remove it.

## 6. Section specs

Each section lists its job, its opening "reading" (the one-line hook, see Design Brief §3), Live views, interaction, Explore-only additions, the Notion fallback where relevant, and presenter notes. Copy in quotes is final unless Nancy changes it.

### 01 — Start

- **Job:** Set the promise and invite people in.
- **Reading:** "You are building more than you think."
- **Views:** (1) Title, subtitle, empty orrery mark. (2) About Nancy: PLACEHOLDER for bio and optional headshot. Lead with the job title that lacks "product," "design" and "engineering," then one line on what she builds anyway. (3) Link and QR code to follow along (shown only when the device decision is yes).
- **Actions:** "Enter the world" (Live), "Explore on your own" (Explore), "Go to the workshop."
- **Presenter note:** The missing title is the hook for 07 and Q&A. Say it here and pay it off later.

### 02 — What is a product?

- **Job:** Break the idea that the product ends at the interface.
- **Reading:** "The screen is the smallest part of it."
- **Interaction (touchpoint select):** Nine toggleable points orbit a coffee cup, each a labeled button: coffee, menu, **mobile order app**, ordering, staff, seating, getting help, regulars, reputation. Students say what counts as "the product"; Nancy toggles. "See the bigger picture" places every point on the ring(s) it belongs to; some span two. Reflective, not scored.
- **Why the app point matters:** It is the only screen in the system, and it ends up as one small dot on the inner rings. The reading becomes something they can see.
- **Key line:** "The interface is where the product appears. The experience is what the product actually is."
- **Explore adds:** The same exercise for Notion and for Empower.

### 03 — The three circles

- **Job:** Teach the single model.
- **Reading:** "Everything you make has an orbit."
- **Views:** One ring per view, each with its question and coffee-shop example.
- **Interaction (circle explorer):** Three buttons (primary) and the clickable SVG (mirror) select a ring and show its definition and example.
- **Key line:** "The product sits inside the experience. The experience sits inside the world."
- **Prompt view (spoken):** "Think of a product you used today. Name one thing in each ring."
- **Presenter note:** Name the coffee-shop cliché before they do.

### 04 — Product

- **Job:** Ground everything in real usefulness.
- **Reading:** "Be useful first. Charm comes later."
- **Content:** The coffee shop's core job. One Notion task (organizing a class project) instead of a feature list. AI line: "AI can generate a solution. It can't decide which problem deserves your attention."
- **Notion fallback:** The same beat using a generic "shared notes app," drawn as an abstract wireframe.
- **Prompt (spoken):** "For \_\_\_, this product makes it possible to \_\_\_."
- **Key line:** "A world needs a reason to enter. Start with something useful."

### 05 — Experience

- **Job:** Show that feeling comes from choices.
- **Reading:** "People will forget the features. They'll remember whether it trusted them." (Replaces v1's line, which paraphrases a widely quoted Maya Angelou line that this audience has seen on a hundred slides.)
- **Interaction (before/after toggle):** One ordering moment, same coffee, two versions. A: jargon menu, "Next!", no guidance. B: plain-language menu, "First time? Here's what we'd recommend," time to decide. Annotations name the four levers: language, guidance, pace, support. A labeled two-option toggle; side by side on desktop, stacked on mobile.
- **Three moments:** Finding your way in. Doing the main thing. When something goes wrong.
- **Notion example:** Blank page vs. a guided class-project template. Use approved real screenshots, framed as screenshots. **Do not build a Notion look-alike mockup.** Notion fallback: an abstract wireframe in the site's own visual language, labeled "illustrative."
- **Prompt (spoken):** "We want this moment to feel \_\_\_, so we will \_\_\_."
- **Key line:** "'Welcoming' is not a visual style. It is something the experience must prove."

### 06 — World

- **Job:** Show that people co-create meaning.
- **Reading:** "The best parts of a world are the ones you didn't make." (Replaces v1's line, which repeated this section's key line.)
- **Content:** The coffee shop becomes "our place": regulars, a local artist's gathering. Name the term once: sociologists call this a "third place."
- **Example cards (×3):** PLACEHOLDER: a template that expresses its creator's identity; a gathering or ritual; a shared joke, phrase or user archetype. Each card: What people made → What the product made possible → What the experience encouraged.
- **Notion fallback:** Use public, non-Notion examples of the same three kinds, or Nancy's own community work outside Notion. Never invent one.
- **Distinction:** Not every useful product needs a fandom. World-building means a coherent context, not manufactured loyalty.
- **Key line:** "You can design the invitation. You cannot script belonging."

### 07 — Connect the circles

- **Job:** Show coherence. The circles should agree.
- **Reading:** "Your product is saying something. Make sure it's one thing."
- **Point of view, drawn as the axis:** "Good coffee should feel approachable, not exclusive." Product: small, clear menu. Experience: basic questions welcome. World: open tastings for beginners. The axis passes cleanly through all three rings.
- **Interaction (contradiction repair):** Show the broken version: the shop says it welcomes everyone, but the menu is full of unexplained jargon. The axis visibly breaks. Students pick the ring where it breaks (Product, Experience or World). Any choice reveals a discussion prompt and one suggested repair; the axis restores. More than one answer can be valid; the point is the argument.
- **AI line:** "AI can draw any of these circles. It can't choose the belief that runs through them."
- **Nancy's build:** PLACEHOLDER: what it lets someone do; the first imperfect version; one judgment call; one change prompted by real behavior. **Fallback:** this site itself, using the dry-run change from T−10.
- **Key line:** "World-building is not adding more things. It is making the things agree."

### 08 — Build your world

- **Job:** Turn the lecture into the student's own brief.
- **Reading:** "Your turn. Be specific."
- **Live views:** (1) Brief and timing. (2) Canvas. (3) Check the connection. (4) 60-second share. Each shows a text time cue; no countdown in v1.
- **Canvas:** The three-ring diagram shows short previews; full answers live in labeled fields beside it (stacked on mobile). Long answers are never forced into a ring.
- **Field helper text that prevents fake worlds:**
  - Belief: "Make a choice. 'For everyone' is not a belief."
  - World: "Something a real person would do without being paid or asked twice."
  - Next test: "Something you could observe within a week."
- **Starter:** Empower or your own project. Helper: "These are proposals, not claims about the real product."
- **Paper path:** The blank print canvas has the same fields in the same order, so a paper student and a laptop student end with the same brief.
- **Output:** Audience, belief, three circles, one connection to strengthen, one next test.

### 09 — Take it with you

- **Job:** Close the loop and hand over the tool.
- **Reading:** "Make one change. Watch someone use it."
- **Views:** (1) The three questions again. (2) **This site, read back:** Product = a lecture and a usable canvas; Experience = the journey they just took; World = what they do with it next. Add one line on how it was vibe-coded. (3) Closing line: "Build something useful. Make the experience meaningful. Leave room for people to make it their own."
- **The mark** becomes the student's filled canvas, if they have one.
- **Downloads:** Blank printable canvas; completed coffee-shop example.
- **Explore adds:** "From canvas to first prototype." PLACEHOLDER for Nancy's list of beginner pitfalls in vibe coding. This is the "how the sausage is made" peek the instructor asked for, kept out of the live talk so it doesn't compete with the thesis. Resource links: PLACEHOLDER, do not invent.

## 7. Product requirements

If time runs short, ship every Must, then Shoulds in table order. Coulds wait for after the lecture.

| Priority | Requirement | Detail |
| --- | --- | --- |
| Must | Live mode | One view at a time. Previous/Next buttons; ← → and Space; Esc exits fullscreen; section dots; progress mark. Content scrolls if it overflows, never crops. |
| Must | Workshop canvas + autosave + export | See data model and export below. This is the most important feature. |
| Must | Keyboard safety | Navigation keys ignored while focus is in an input, textarea, button or other control. |
| Must | Hash routing | `#/live/experience/2`, `#/explore/world`, `#/workshop`. Refresh restores the exact view; invalid routes fall back to the nearest valid section. `#/workshop` keeps the current mode (Explore if none). |
| Must | Placeholders | Every missing story or asset is a visible, labeled block. Nothing invented. |
| Must | Live-mode legibility | Meets Design Brief §6 at 1280×720 over a video call. |
| Should | Presenter window | Press P to open `#/presenter` in a new window: current view, next view, notes, elapsed time. It drives the audience tab through `BroadcastChannel` (same browser, same machine, no network). Nancy shares only the audience tab. If the channel is unavailable, notes fall back to the N toggle with a warning that they're visible on screen. |
| Should | Explore mode | Long-form page from the same content: sticky section nav on desktop, menu on mobile, plus "Explore adds" material. Switching modes keeps the section and draft. |
| Should | Link + QR at 01 and 08 | QR generated at build time as inline SVG from a configured URL. No third-party QR service. |
| Could | Fullscreen | Native API, optional; the site works fully without it. |
| Could | Prompts write to the draft | The spoken prompts in 04–06 offer an optional field that pre-fills the workshop draft. Only if students are on devices. |

### Workshop data model

```ts
type WorkshopDraft = {
  version: 1;
  updatedAt: string;       // ISO
  starter: "empower" | "own";
  projectName: string;
  audience: string;        // We are building for…
  belief: string;          // …and we believe…
  product: string;         // One useful thing they can do
  experienceMoment: string;
  experienceChoice: string;
  world: string;           // One concrete invitation
  connection: string;      // Contradiction or gap we'll fix
  nextTest: string;        // Assumption to test with a real person
};
```

- Autosave to localStorage key `baw.workshop.v1`, debounced \~400 ms, with a quiet "Saved in this browser" status.
- If storage is unavailable or full, keep the draft in memory and show: "This browser won't save your answers. Copy or print before closing."
- A future schema migrates or preserves old drafts. Never silently delete answers.
- Soft character guides are fine; never hard-truncate.

### Export

- **Copy brief:** Plain text in a fixed order; empty fields read "Not yet filled in." If the clipboard fails, open a selectable text box with instructions.
- **Print / Save as PDF:** No navigation; filled rings on page 1; full answers never clipped. A separate "Print blank canvas."
- **Reset:** Confirmation only when a field has content. No field is required to export.

### Privacy

No answers leave the browser. No analytics, trackers, remote fonts or third-party scripts. Say this plainly on the workshop page. Presenter notes must contain nothing private, since the fallback can expose them.

### Accessibility (WCAG 2.2 AA)

- Semantic landmarks, one H1 per view or page, logical heading order, labeled inputs, visible focus.
- Every SVG interaction has an equivalent button or text control. Nothing depends on hover or dragging.
- Live view changes move focus to the new heading and announce through a polite live region.
- `prefers-reduced-motion`: instant state changes, same content and controls.
- 320px width with no horizontal scroll; 200% zoom.

## 8. Technical approach

These are recommendations for a reliable build. Swap them freely as long as §7 still holds.

- **Stack:** Vite + React + TypeScript, plain CSS with custom properties. No component library.
- **Content:** `src/content/lecture.ts`, typed as below. All copy lives here; components hold no lecture text.
- **Design tokens:** `src/styles/tokens.css`, generated from Design Brief §5. Live-mode overrides in one `[data-mode="live"]` block.
- **Fonts:** Self-hosted WOFF2 in `/public/fonts`, subset to Latin.
- **Hosting:** Any static host (Vercel, Netlify, GitHub Pages).

```ts
type CircleId = "product" | "experience" | "world";

type View = {
  id: string;
  headline: string;
  body?: string;
  focus?: CircleId | "all" | "axis" | null;
  interaction?: "touchpoints" | "circleExplorer" | "beforeAfter"
    | "exampleCards" | "contradiction" | "workshop" | "siteReadBack";
  keyLine?: boolean;
  presenterNote?: string;
  placeholder?: string;      // shown as a visible labeled block
  fallback?: string;         // shown when notionApproved is false
  cutAt45?: boolean;         // hidden in the 45-minute variant
};

type Section = {
  id: string;                // "start", "product", ...
  number: string;            // "01"
  navLabel: string;
  reading: string;           // the one-line hook
  minutes: { m45: number; m60: number; m75: number };
  views: View[];             // Live mode
  explore?: { body: string; extras?: string[] };
};

type LectureConfig = {
  variant: "m45" | "m60" | "m75";
  notionApproved: boolean;
  studentsOnDevices: boolean;
  publicUrl: string;         // for the QR code
};
```

`LectureConfig` turns the gating decisions in §4 into flags, so a late answer is a one-line change, not a rebuild.

### Component inventory

| Component | Responsibility |
| --- | --- |
| AppShell | Mode, routing, config, layout |
| LiveStage / ExplorePage | Render the same content two ways |
| PresenterWindow + usePresenterSync | Presenter view and `BroadcastChannel` sync |
| CircleMark | Progress mark and diagram; accepts `focus`, `filled[]`, `axis` |
| TouchpointSelect | 02 |
| CircleExplorer | 03 |
| BeforeAfter | 05 |
| ExampleCard | 06 |
| ContradictionRepair | 07 (axis break and restore) |
| WorkshopCanvas + useWorkshopDraft | 08, storage and fallback |
| exportBrief() / print.css | Copy and print |
| QrCode | Build-time inline SVG |
| PresenterNotes, Placeholder | Utilities |

## 9. Acceptance tests

Done means every item passes on desktop Chrome and Safari and on an iPhone-size screen. New in v2 is marked (new).

**Navigation**

- [ ] All nine sections reachable in both modes; refresh restores the exact view
- [ ] ← → and Space navigate Live mode; typing in any field never changes the view
- [ ] Switching modes keeps the section and the workshop draft
- [ ] Invalid hash routes recover gracefully
- [ ] (new) Switching `variant` hides the right views and the section times match §5
- [ ] (new) Setting `notionApproved: false` shows every fallback and no Notion screenshot

**Presenter**

- [ ] (new) P opens the presenter window; Next in either window moves both
- [ ] (new) Sharing only the audience tab in Zoom shows no notes, timers or controls
- [ ] (new) Closing the presenter window leaves the audience tab working normally

**Teaching interactions**

- [ ] Touchpoints, circle explorer, before/after and contradiction repair work by keyboard only
- [ ] The progress mark fills in the right order and the axis appears at 07
- [ ] Ring names and line styles stay consistent everywhere (Design Brief §5)
- [ ] No color anywhere beyond the approved black, white and grays

**Workshop**

- [ ] The draft survives reload; blocked storage shows the warning and the form still works
- [ ] A 2,000-character answer saves, copies and prints without truncation
- [ ] Copy works; the manual-copy fallback appears when the clipboard is blocked
- [ ] Blank and filled print layouts have no navigation and no clipped text
- [ ] (new) Blank paper canvas and digital canvas have the same fields in the same order
- [ ] Reset asks for confirmation only when content exists

**Quality**

- [ ] No horizontal scroll at 320px
- [ ] (new) Recorded Zoom screen share at 1280×720, played back: every label, ring and line style is distinguishable
- [ ] (new) The QR code scans from 3 m on a projector
- [ ] Reduced motion keeps all content and controls
- [ ] Network tab shows no requests after load except local assets
- [ ] Every placeholder is visibly labeled; no stories or examples are invented

## 10. Staged prompts for your coding tool

Run these in order and test each stage yourself before continuing. Save this doc as `PRD.md` and the Design Brief as `DESIGN.md` in the project root.

### Stage 0 — Project rules (save as CLAUDE.md)

```markdown
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
```

### Stage 1 — Skeleton, config and modes

> Read PRD.md, DESIGN.md and CLAUDE.md. Scaffold Vite + React + TypeScript. Build: tokens.css from DESIGN.md §5 with the Live overrides from §6; the typed content file with all nine sections, readings, three time variants and placeholders/fallbacks (PRD §5–6); LectureConfig; hash routing; LiveStage with Previous/Next and keyboard navigation that ignores keys while typing; a basic Explore page; mode switching that keeps the section; a static CircleMark. No interactions or workshop yet. Stop when the PRD §9 Navigation tests pass and tell me how to verify.

### Stage 2 — Workshop (the most important feature)

> Build WorkshopCanvas and useWorkshopDraft per PRD §6 (08) and §7, including the field helper text. Include debounced localStorage autosave under baw.workshop.v1, the in-memory fallback with warning, Copy brief with manual fallback, print.css for filled and blank canvases (same field order), and Reset with confirmation. Desktop: rings with previews beside full fields. Mobile: stacked labeled cards. Stop when every PRD §9 Workshop test passes and list the edge cases you tested.

### Stage 3 — Teaching interactions

> Build TouchpointSelect (02, including the mobile order app point), CircleExplorer (03), BeforeAfter (05), ExampleCard (06), ContradictionRepair (07, with the axis break and restore) and the site read-back view (09), per PRD §6 and DESIGN.md §7. Each must work by keyboard alone, have button/text equivalents for any SVG, and respect reduced motion. Make CircleMark fill progressively per PRD §1. Stop and give me a keyboard-only test script for each.

### Stage 4 — Presenter window and sharing

> Build PresenterWindow (P key, #/presenter) synced by BroadcastChannel per PRD §7, with current view, next view, notes and elapsed time, and the N-toggle fallback with its warning. Add the build-time QR code for 01 and 08. Stop when the PRD §9 Presenter tests pass.

### Stage 5 — Visual polish

> Apply DESIGN.md in full: Live and Explore themes, type scale, ring system, axis, imagery treatment, motion. Hold Live mode to DESIGN.md §6. Add no features or content. Describe the changes per section, then list anything in DESIGN.md you could not meet and why.

### Stage 6 — QA pass

> Audit against every item in PRD §9. For each, report pass/fail and the evidence. Fix failures, then re-run. Also check heading order, focus visibility, contrast of all gray text on both backgrounds, ring distinguishability at the smallest mark size, 320px layout, 200% zoom, and no external network requests.

## 11. Content needed

Stages 1–3 can be built entirely on placeholders. Every placeholder is replaced or cut by content lock (T−7).

| Item | Section | Owner | Fallback if missing |
| --- | --- | --- | --- |
| Notion approval | 04, 05, 06 | Nancy | Fallbacks in §6 |
| Bio and optional headshot | 01 | Nancy | Text only |
| Notion blank vs. template screenshots | 05 | Nancy | Abstract wireframe, labeled illustrative |
| Three community examples | 06 | Nancy | Public non-Notion examples, or one card at 45 min |
| Personal build story with a first version and a real change | 07 | Nancy | This site + the dry-run change |
| Beginner vibe-coding pitfalls list | 09 Explore | Nancy | Cut the section |
| Resource links | 09 | Nancy | Cut |
| Final font pairing | Design Brief §5 | Nancy | The recommended pairing |
| Archival images, public domain or licensed | 01–09 | Nancy or coding tool | Rings only; the site works without images |
| Public URL for the QR code | 01, 08 | Nancy | Short link typed on screen |
