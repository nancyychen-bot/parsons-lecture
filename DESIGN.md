Orrery is the visual system for **Build a World, Not Just a Product**: a lecture site drawn as a chart of a product's universe. Black, white, serif and mono, and nothing but rings and the axis through them. An orrery is a hand-built model of a solar system — made to understand a world, not to predict a fate. Every rule below follows from that: **you build the mechanism; nothing is read to you.**

When two rules conflict, the one higher on this page wins. Legibility over a compressed 1280×720 Zoom share beats everything.

## Principles

1. **Legible before beautiful.** If it doesn't survive a re-encoded screen share, it isn't done. Atmosphere is never paid for in legibility.
2. **Rings are the only shape.** Rings are the navigation, the diagrams, the progress mark and the canvas. Straight lines are reserved for the axis, rules and text. Every rectangle is `radius-none`.
3. **Black, white and space.** Nothing gets color. Emphasis comes from scale, weight, line style and silence.
4. **Every interaction teaches.** A motion explains scope (rings expanding) or connection (the axis aligning), or it is cut.
5. **One idea per view.** A Live view that needs two headlines is two views.
6. **Honest placeholders.** Missing content is labelled in the same visual language (`Placeholder`), never faked.
7. **The paper version is real.** Print is a designed output.

## Content fundamentals

Voice: calm, exact, slightly uncanny, with dry wit. A quiet voice telling you something true about your work — not a classroom slide, not a SaaS landing page.

- Short, declarative, **second person**. Sentence case everywhere; labels are set UPPERCASE in `label` by CSS, so write them in sentence case in content.
- One idea per line. Let the space do the work.
- **Instructions, not predictions.** "Make one change" — never "You will change." This is the line between this site and a horoscope.
- Blunt but kind: unsettling enough to stick, never mean.
- No borrowed aphorisms. If a line sounds like a poster, rewrite it.
- No emoji. No exclamation marks.

**Readings** open every section, set in `reading`. A reading is the hook; the section's key line is the lesson. They must never say the same thing.

| # | Reading |
| --- | --- |
| 01 | You are building more than you think. |
| 02 | The screen is the smallest part of it. |
| 03 | Everything you make has an orbit. |
| 04 | Be useful first. Charm comes later. |
| 05 | People will forget the features. They'll remember whether it trusted them. |
| 06 | The best parts of a world are the ones you didn't make. |
| 07 | Your product is saying something. Make sure it's one thing. |
| 08 | Your turn. Be specific. |
| 09 | Make one change. Watch someone use it. |

**Microcopy** — use verbatim:

| Moment | Copy |
| --- | --- |
| Autosave | Saved in this browser |
| Storage blocked | This browser won't save your answers. Copy or print before closing. |
| Empty field on export | Not yet filled in |
| Placeholder label | PLACEHOLDER — [what goes here] |
| Privacy note | Your answers stay on this device. Nothing is sent anywhere. |
| Corner metadata | 05 / 09 · EXPERIENCE · NEAR ORBIT |

## Color

Two themes. **Explore** is white (reading, print). **Live** is black (projectors, screen share). Print is always Explore.

- Set text and every ring, axis and rule in `ink` on `ground`.
- Secondary text is `muted`. In Live it is lighter (#b3b3b3, 10:1) than a gray on black would normally be — compression eats contrast.
- `faint` is **never text**. It marks things not reached yet: unfilled rings, inactive touchpoints, placeholder borders (3:1).
- An inverted black panel inside Explore uses `black` with `paper` text and `muted-on-black` for secondary text.
- Never place a dark gray (#1a1a1a–#333333) on black: projectors render both as black.
- There is no accent. Focus is a 2px solid `focus` outline, 2px offset. Links are underlined `ink`. Selection, hover and active states change fill (outline → solid), never hue.

## Typography

**Newsreader** (variable, with an optical-size axis) for display and body; **IBM Plex Mono** for labels and inputs. Both are SIL OFL and self-hosted from `fonts/` — no remote fonts.

| Style | Use |
| --- | --- |
| `display` | Section headlines, Explore. Weight 300. `clamp(2.5rem, 5vw, 4.5rem)` |
| `reading` | The italic hook at the top of each section; the belief on the axis |
| `body` | Running text. Max 64 characters a line (`measure`) |
| `label` | Corner metadata, ring names, buttons. UPPERCASE, +0.1em |
| `field` | Workshop inputs. 16px exactly (iOS zooms below it) |
| `live-display` | Live headline. Weight **400** — projectors swallow 300 |
| `live-body` | Live body. 28px floor, 30 words a view maximum |
| `live-label` | Live labels. 18px floor |

Set the optical size with the style (`font-variation-settings: 'opsz' N`); don't fake display sizes with the body cut.

## The ring system

One model, repeated until a student can draw it from memory.

| Element | Treatment | Meaning |
| --- | --- | --- |
| Product | Solid core dot (r/4) inside a solid ring at r | The useful core |
| Experience | Solid ring at 2r | Near orbit |
| World | Dotted ring at 3r (`dash-world`, round caps) | Far orbit — co-created, porous |
| Axis | A straight line through the center, `axis-overshoot` past World, ticks at both ends | Point of view |
| Axis, broken | A gap where it crosses the offending ring; outer segments swung 6° | A contradiction |
| Touchpoint | `touchpoint` circle on a ring with a mono label; selected = filled | A part of the product |
| Unfilled ring | `faint`, `dash-unfilled` | Not reached yet |

- Radii are always 1 : 2 : 3.
- Tell rings apart by line style **and** a label — never style alone.
- Line weights come from `stroke-*`; Live uses the `-live` values. Dots become dashes when they get small or go over video: `dash-world-mark` (40px mark), `dash-world-live`, `dash-world-mark-live`.
- Labels on a diagram knock the ring out behind them (a `ground` stroke under the text), so a label never sits on a line.
- Point of view is **not a fourth ring**. Never add one.

Components: `CircleMark` (every state), `ContradictionRepair` (07), `TouchpointSelect` (02).

## Layout

- **Explore:** a centered `measure` column (640px); diagrams may break out to `breakout` (960px). `space-section` (160px) between sections. Mobile gutter `space-3`.
- **Live:** one 1280×720 frame. Essential content stays `space-8` (64px) from left and right and `space-6` (48px) from top and bottom. Headline in the lower-left third, diagram right of center, progress mark top right. See `LiveStage`.
- **Corners** hold small mono metadata, at least `space-6` from every edge. It is decorative: if Zoom crops it, nothing is lost.
- **Surfaces:** hairline rules, square corners, no shadows, no gradients, no filled cards.

## Imagery: the cutouts

The engravings in **Instruments**, **Specimens**, **Sky** and **Symbols** are die-cut stickers: grayscale, with a white `paper` border and a transparent outside. They are atmosphere, never argument — the site must work with zero images.

- Lead with **Instruments**. They carry the stance: made mechanisms, rings you can turn. Specimens and Sky are supporting cast; Symbols are used once, on purpose.
- Label an image like a museum object (`Cutout`): name in `label`, one line of meaning in `label` + `muted`.
- Never put an image behind text, and never put text on an image.
- One cutout per view at most. Crop boldly or not at all; never tile them as a sticker sheet.
- **In Live**, use only cutouts marked *Live-safe* in their group's notes (bold silhouettes), at 240px tall or more. Fine hatching — astrolabes, armillaries, the moon chart — turns to mush and compression blocks over video; keep it to Explore and print.
- Print them on white only; the die-cut border disappears into the page, which is intended.
- **Credit.** These are generated and curated by Nancy Chen, not archival. Say so in `CREDITS.md` and the colophon ("Engravings generated and curated by Nancy Chen"). Never caption one as a period engraving or public domain.
- Any new image: public domain or open access (The Met, Library of Congress, Smithsonian, NASA), grayscale, logged in `CREDITS.md`.

## Motion

| Motion | Duration | Purpose |
| --- | --- | --- |
| A ring draws (stroke-dashoffset, ease-out) | `t-ring-draw`, `t-ring-draw-live` in Live | Scope expanding |
| Text enters line by line | `t-line`, `t-stagger` between lines | One idea at a time |
| The axis aligns or breaks | `t-axis` | Coherence or contradiction |
| Touchpoints settle onto rings | `t-touchpoint` | Where things belong |
| Explore mark turns (optional) | `t-mark-turn` per turn | The only ambient motion; never in Live |

Nothing runs longer than 1s. Over video, animate opacity and stroke only — no full-screen fades or slides. Under `prefers-reduced-motion`, everything appears in its final state and nothing rotates.

## Live mode, summarized

Same look, thicker bones. Switch the theme to `live` and every component picks up: 2.5px rings, 3.5px axis, dashed World ring, 64px mark, 14px touchpoints, 18px labels, 28px body, `#b3b3b3` secondary text, no texture, no ambient motion, 30 body words a view. Test it by sharing only the audience tab in a real Zoom call at 1280×720, recording it, and playing it back at half width on a 13-inch laptop: every ring identifiable by line style, every label readable, the 07 axis break visible.

## Print

White page, black ink, the same two fonts. Rings at `stroke-ring-print`; World dotted at 0.75pt. Letter and A4, 0.6in margins. The filled canvas fits on page 1; full answers continue on page 2, never clipped. No navigation in print.

## Avoid

- Any color accent — focus rings and links included.
- Emoji, rounded UI, drop shadows, gradients, filled cards.
- Nebulae, star fields, glowing "space".
- Zodiac signs, horoscopes, astrology language, fortune-telling imagery (palms, all-seeing eyes, planetary glyphs).
- Co-Star's name anywhere but the one colophon credit. Anything resembling Notion's UI.
- Scroll hijacking, parallax, autoplay.
- Grain, halftone and hairlines in Live.
- A second framework, model or diagram type.
