# Design System

Implementation reference for the tokens, type scale, tone rules and doodle
vocabulary. The rules themselves come from `brand-direction.md`; this document
records how they are expressed in code.

The live values are in `src/style.css`. This document is the map, not the source.

> **2026-10-01 redesign (decision-log.md §26).** §1–§5 are current. Sections
> after §5 were written for the previous palette and type, and are read through
> this mapping until each is revised: **rose → mauve**, **charcoal → noir**,
> **ivory → cream**, **paper `#F2F2F2` → cream `#F4EDE4`**, **Beth Ellen → Fraunces**
> (room headings) **or Fraunces italic** (notes) — except the hero name, which is Beth Ellen again, **DM Sans → Jost**. The hero
> measurements in §12 are Beth Ellen's and are superseded by the `.hero-name`
> note in `style.css`.

---

## 1. Theme mechanism

The site is dark by default. One room (LIFE) uses a derived paper tone.

Semantic colour is expressed through CSS custom properties that flip per
section, mapped into Tailwind via `@theme inline`. Because `inline` makes
utilities emit `var(--room-*)` directly, a single class change repaints the whole
room — no duplicated component styles.

```css
@theme inline {
  --color-surface: var(--room-bg);
  --color-ink:     var(--room-ink);
  --color-muted:   var(--room-muted);
  --color-rule:    var(--room-rule);
  --color-accent:  var(--room-accent);
}

:root, .tone-dark  { /* the brand palette */ }
.tone-paper        { /* derived, needs sign-off */ }
```

| Token | Utility | Used for |
|---|---|---|
| `--room-bg` | `bg-surface` | room background |
| `--room-ink` | `text-ink` | headings, body copy, nav |
| `--room-muted` | `text-muted` | captions, metadata, dates |
| `--room-rule` | `border-rule` | dividers, card outlines |
| `--room-accent` | `text-accent` / `border-accent` | doodles, annotations, links, selected nav |

A `<Room tone="dark" | "paper">` wrapper sets the class. Do not hard-code hex
values inside components — use the semantic tokens, so a room reflows when its
tone changes.

### Fixed palette

"Black Champagne" — palette #10 from the dark-feminine sheet, plus one derived
cream. These do **not** change with tone. See decision-log.md §26.

| Token | Value | Use |
|---|---|---|
| `--color-noir` | `#0E0B0B` | dark rooms |
| `--color-cocoa` | `#2B1B1B` | raised dark surface (overlay, placeholders) |
| `--color-wine` | `#5B3A3A` | hairlines on dark, muted text on cream |
| `--color-mauve` | `#876A6A` | the accent |
| `--color-champagne` | `#CDB8A6` | muted text on dark, hairlines on cream |
| `--color-cream` | `#F4EDE4` | light rooms, ink on dark — **derived** |

---

## 2. The dark tone

```css
:root, .tone-dark {
  --room-bg:     #0E0B0B;   /* noir */
  --room-ink:    #F4EDE4;   /* cream — never #FFFFFF */
  --room-muted:  #CDB8A6;   /* champagne */
  --room-rule:   #5B3A3A;   /* wine */
  --room-accent: #876A6A;   /* mauve */
}
```

---

## 3. The paper tone — cream

```css
.tone-paper {
  --room-bg:     #F4EDE4;   /* cream */
  --room-ink:    #0E0B0B;   /* noir */
  --room-muted:  #5B3A3A;   /* wine */
  --room-rule:   #CDB8A6;   /* champagne */
  --room-accent: #876A6A;   /* mauve — the same in both tones */
}
```

Rooms alternate from the hero down: hero dark, ME cream, WORK dark, WRITINGS
cream, LIFE dark, JOURNAL cream, LET'S TALK dark.

---

## 4. Contrast

Measured WCAG ratios.

| Pair | Ratio | Verdict |
|---|---|---|
| Cream on noir | 16.9:1 | AAA |
| Champagne on noir | 10.3:1 | AAA |
| Mauve on noir | 4.0:1 | **large text, marks and doodles only** |
| Wine on noir | 2.0:1 | hairlines only |
| Noir on cream | 16.9:1 | AAA |
| Wine on cream | 8.6:1 | AAA |
| Mauve on cream | 4.2:1 | **large text, marks and doodles only** |
| Champagne on cream | 1.6:1 | hairlines only |

**The rule:** mauve never carries body copy or small labels. It is the name's
full stop, the heading's full stop, the script overlay, the nav marks, doodles,
and the margin notes at 18px+. Pill hover moves the *border* to mauve and leaves
the text in ink.

---

## 5. Typography

Three faces, one job each. No fourth.

| Voice | Family | Role |
|---|---|---|
| Display | **Fraunces** (variable, SOFT 50) | the hero name, room headings, numbers; italic for margin notes and captions |
| Read | **Jost** 400/500 | paragraphs, the nav, pills, facts, dates, tracked caps |
| Hand | **Beth Ellen** | the hero name, and one overlay word-group per room |

Google Fonts:

```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Jost:wght@400;500;600&family=Beth+Ellen&display=swap
```

**Why these three sit together.** Fraunces's soft, high-contrast curves are the
bridge between a hand-drawn marker script and a geometric sans: its italic is
calligraphic enough to sit beside Beth Ellen, and its roman holds Jost steady.
Beth Ellen came back for the hero (decision-log.md §29) and replaced Mrs Saint
Delafield everywhere, so the site stays at three faces.

**Floors**

- Beth Ellen is never below **18px**, and is kept to large moments. Anything
  handwritten that has to be small is **Fraunces italic** instead.
- Fraunces italic notes are never below **18px**.
- Jost body is 16px on mobile, 17–18px on desktop, line height 1.75.

**Hierarchy**

| Level | Family | Treatment |
|---|---|---|
| Hero name | Beth Ellen | `clamp(60px, 15.6vw, 300px)`, cream, mauve full stop, portrait in front |
| Room title | Fraunces 400 | large, tight leading (0.92–0.95), ink |
| Overlay word | Beth Ellen | 22–36px, mauve, rotated about -3°, across the heading's lower edge |
| Margin note, caption | Fraunces italic | 18px minimum, mauve |
| Paragraph | Jost 400 | 17–18px, 1.75, ink |
| Pill / label | Jost 500 | 12px caps, 0.12em tracking, ink |
| Metadata, dates | Jost | small, muted, tabular numbers |

**Rules**

- No eyebrow labels. No small letter-spaced caps *above* a heading, ever. A
  tracked strip *below* content (ME's footer strip) is a different thing.
- Never use pure white `#FFFFFF`.
- One Beth Ellen word-group per room. Used twice, a hand reads as a font.

---

## 6. Visual balance

`70% charcoal / 20% ivory / 7% grey and borders / 3% dusty rose`

The rose is **discovered, not announced**. The site must never read as a pink
website. If rose creeps past roughly 5% of any single viewport, something has
gone wrong — usually a hover state that stays warm too long, or an accent border
applied to a whole row.

`#392F32` is the safe surface for hover states and small blocks — it is rose, but
dark enough to read as a surface rather than an accent.

---

## 7. Doodles

Nine components. Vocabulary from section 10 of the brand direction.

| Component | Meaning | Default colour |
|---|---|---|
| `Cloud` | ideas, thoughts, dreams, things you're wondering about | rose |
| `Arrow` | direction, connection, attention | rose |
| `QuestionMark` | curiosity, uncertainty, still figuring out | rose |
| `ExclamationMark` | excitement, surprise, something that matters | rose |
| `HighlightCircle` | highlighting something | rose |
| `Underline` | emphasis | rose |
| `Scribble` | casual notes and visual texture | rose |
| `TinyStar` | occasional moments that feel special | rose |
| `Handwritten` | margin note, annotation text | rose |

Grey `#B5AEAA` is the secondary option for any of them. **No crimson exists.**

**Rules**

- **Imperfect** — hand-drawn lines, not mathematically perfect SVG shapes.
- **Restrained** — not every section gets one. §14 is explicit.
- **Functional** — a doodle should point at something, highlight something, add
  a thought, create movement, or reveal personality. If it does none of these,
  remove it.
- **Slightly unexpected** — a cloud in a margin beats a cloud placed where the
  grid wanted it.

**Retired:** `EditorialDot`. Section 10 has no "focal dot" in the vocabulary.

**Implementation note:** every drawing path carries `pathLength="1000"`. The
`drawPath` keyframe animates `stroke-dashoffset` from `1000`, so the path's
`pathLength` must be normalised or short paths over-draw. This was a bug in the
original `doodle-components.jsx`.

**Cloud variant:** `Cloud` carries three trailing thought bubbles by default
(`bubbles={false}` to opt out), trailing either `down-left` or `down-right`. This
is what makes it read as something occurring rather than a shape parked in a
margin — see §15. The bubbles are drawn as closed wobbly paths rather than
`<circle>` so they stay hand-drawn, are stroked at 75% of the cloud's weight so
they read as secondary, and are staggered 0.5s / 0.8s / 1.05s so the trail
appears to trail off.

---

## 8. Motion

**Think:** writing, drawing itself in, drifting, settling.
**Not:** spinning, glitching, bouncing, exploding, floating 3D objects.

| Interaction | Behaviour |
|---|---|
| Titles and the greeting | **draw themselves in once** on first appearance, then stay still forever |
| Room entry | one simple fade |
| Underlines and circles | draw themselves, same as any hand-drawn line |
| Clouds drift | very subtly (existing doodle behaviour) |
| Photographs shift | a rotated photo settles into place (existing doodle behaviour) |

**Draw-on is the signature.** A title that writes itself once and then stops is
what makes the site feel written rather than typeset. The existing `drawPath`
approach and `pathLength="1000"` normalisation carry straight over — see §7. It
fires once on first appearance, never replays, and never re-runs on scroll-back.

**Nothing loops, nothing repeats.** If an animation plays a second time, it is
wrong.

**Principles**

- Slow enough to notice. Fast enough not to annoy. Subtle enough to feel natural. Meaningful enough to justify existing.
- **Motion must never delay access to content.** The site is a portfolio, not an
  amusement park. Nothing above may block reading or scrolling.
- Respect `prefers-reduced-motion`.

The original `doodle-components.jsx` timings: `drawPath` 1.4s
`cubic-bezier(0.16, 1, 0.3, 1)`, `floatCloud` 6s ease-in-out infinite,
`pulseDot` 2s ease-in-out infinite.

---

## 9. Layout

Editorial grid underneath, intentional asymmetry on top. Section 15 warns
against "someone forgot to align the divs" — asymmetry must look deliberate.

Techniques available: asymmetric columns, oversized headings, offset images,
overlapping photographs, text at unexpected points, large negative space,
occasional vertical text, marginal annotations.

**Slide deck.** Rooms alternate between the dark tone and the paper tone, so
scrolling feels like turning pages. Each room is full width.

**Mobile first.** Every layout is designed for a small screen first, then widened.
Stacks read better than side-by-side columns at phone widths, and the direction
asks for it explicitly.

**Pills, not boxes.** Small rounded pills for labels, tags and interactive
chips. No card shadows, no gradients, no heavy dividers — separation comes from
space, not from rules around content.

**Slightly off-axis.** Titles, pills and photographs carry a small uneven
rotation — **under 2 degrees**. It should read as a hand placing something, not
as something crooked. If you can see that it is crooked, it is too much.

**Hand-placed photographs.** Photos sit like taped or pinned prints, slightly off
axis. No drop shadow, no blur, no frame chrome.

**Flat backgrounds, always.** No paper texture images, no lined-notebook
backgrounds, no gradients. A flat tone and nothing else.

### 9.1 The rose budget

**This replaces the "rose near 3% of the viewport" rule.** A percentage of
viewport was never actionable — it couldn't tell you where rose was allowed, only
how much of it. Rose is now rationed by *role*, and the list is closed.

**Rose is an accent only.** It appears in exactly five places:

| Where | How |
|---|---|
| **The period in the name** | The hero's `Fatimah` is cream; the `.` after it is dusty rose. One character. |
| **Nav scribbles** | The hand-drawn mark on hover, focus and active state. |
| **The active nav mark** | The scribble under the current room. |
| **Handwritten notes** | Margin notes, captions, room notes. |
| **Doodles** | The existing `§14` vocabulary: circles, arrows, question marks, stars, scribbles. |

**Not the name. Not paragraphs. Not backgrounds.** Those three are the ways this
budget gets broken, and they are the things to catch in review.

The name itself is **cream** (`--room-ink`), like the earlier hero. The large flat
rose circle is **removed entirely** — from the hero and from every room. It was
sitting in front of the name and hiding a letter, and with the name now layered
in front of the portrait there is nothing for it to sit behind. There is no
"one accent circle per room" any more.

### 9.2 Sticky notes, tape and torn paper

Journal entries and project tags may be rendered as sticky notes or torn paper,
and tags may be held on with a piece of tape. All three use **only the existing
palette** — dark tone, paper tone, dusty rose, and the derived greys. Tints of
those are fine (an alpha or a lightness step on `--room-bg`).

**No new hues.** A sticky note must be a tint of a colour already in the site, not
a new colour that happens to look like one. No drop shadows on any of them —
a sticky note held down by a shadow reads as a UI card, and the tape is the
thing that should say "held".

### 9.3 No invented chrome

No eyebrow labels or small caps above a heading. No lined-notebook background.
No drop shadows anywhere. These are hard rules, not preferences.

---

## 12. The hero

One screen, two parts, top to bottom: **the nav, then a single lower block** that
holds the name, the paragraph, and one photograph. The name and the paragraph are
one left column — the paragraph sits *directly under* the name — and the photograph
stands to their right.

**No arch placeholder. No tilted taped print. No caption, no label, no doodles,
no circle, no tagline, no eyebrow, no button, no room list.** The hero is three
things and the nav is the wayfinding.

**The name.** `Fatimah.` — the name alone, no `Hi, I'm`. Beth Ellen, left-aligned,
one line, period included, immediately above the paragraph it introduces.

**Colour:** the name is **cream** (`--room-ink`). The period after it is the only
part in dusty rose — one character, and the largest use of rose on the site. See
§9.1.

Sizing is `--text-display: clamp(56px, 11vw, 215px)` at `line-height: 0.9`, with
`.hero-name` taking `min(var(--text-display), 11vw)`. Never `overflow: hidden` on
the name or any ancestor; `white-space: nowrap` keeps the period on the line.

**Why 11vw and not more.** The name has to clear the photograph beside it, not just
the margins. `Fatimah.` measures **5.112em** wide in Beth Ellen, **measured** by
rendering the real woff2 on a canvas and reading the advance back, then
cross-checked against the font's own `hmtx` table (`5.1120em`) — the two agree to
four decimals, so this is a measurement and not an estimate. At 11vw the name is
56.2vw of the 88vw the 6vw padding leaves, and the largest size that still clears a
200px photograph plus a 40px gap is 85.9px at 768, 130.3px at 1024 and 285.8px at
1920. 11vw sits under that ceiling everywhere the photograph is beside it, and the
215px cap catches the very top. The `56px` floor is unreachable on a phone — 11vw
of 390px is 42.9px — and is left in the token for any future use that wants it. A
name that eats its own margin is a broken layout, so the fit wins.

**Optical alignment — the side bearing.** The F carries a **0.04em** left side
bearing, also measured by scanning the canvas for the first column containing
ink. The name is therefore shifted `-0.04em` so the *ink* of the F lines up with
the left edge of the paragraph, not the name's box. `-0.04em` of the name's own
font-size, so it tracks the size automatically. Measured alignment error is
within **±0.7px** at every width. Do not "fix" this with a margin in pixels; the
ink edge, not the box edge, is what has to line up.

**The two parts.** The section is a flex column of exactly one screen,
`min-h-[100svh]`, `px-[6vw]`, `pb-[6vh]`:

| Part | What | How |
|---|---|---|
| 1 | Nav slot | Fixed height, empty. The nav is `fixed` above the section, so the slot only reserves room for it. |
| 2 | The lower block | `mt-auto`, so it is pinned to the `max(7vh, 48px)` bottom line and **all the slack collects above the name**. Inside it, a row at `md` and up: the name + paragraph column on the left (`md:flex-1`), the photograph on the right — **not currently rendered, see the open defect below**. |

The block is bottom-anchored rather than centred, which is the point of the
change: the name and the paragraph travel together as one unit, so "directly
above" stays true at every width instead of the photograph's height tearing them
apart.

**Name to paragraph: at least 32px of visible air, ink to ink.** The name's margin
is a flat **43px**. It is flat because the thing it clears is not a constant —
margins are measured from the box, but the eye measures ink, and here the two
disagree in *both* directions:

- **The name has ink below its baseline**, so its lowest painted pixel is not its
  baseline. Measured per character at 211.2px of type, the ink below the baseline
  is `t` **18px**, `m` 10px, `a` 8px, `h` 6px, `i` 5px, and the **`F` and the period
  exactly 0**. The `t` is the culprit — a tail on the crossbar stroke — and it is
  the deepest at every size: **0.085em** of the type, consistently from 211.2px down
  to 42.9px.
- DM Sans's ascenders rise **above the paragraph's line box** (7px at 16–17px type),
  so its first line begins higher than its box.

So the rule is **air = margin + ascender offset − swash**, with the swash growing
with the viewport. A constant only has to clear the largest swash to satisfy the
32px floor everywhere: 43px gives **35 / 37 / 37 / 40 / 46px** of air across the five
widths. Note the brief blamed the F's bottom swash — the F has no ink below its
baseline at all. The measurement lands in the same place either way, but the
culprit is the `t`. Recorded in full, including two wrong attempts, in
`decision-log.md` §25.

**The paragraph.** DM Sans 400, cream at **80% opacity**, fluid between
**17px and 26px**: `clamp(17px, 1.2846vw, 26px)` from `md`, **16px** below it.
One straight line on desktop, `white-space: nowrap` from **992px**.

**Why 992px and not `md`.** The one-line rule is arithmetic, not taste. The sentence
measures **632.6px** at 17px DM Sans — 37.21px per px of type, not the 967.6px an
earlier note claimed, which had produced a 1373px threshold that was far too high
and wrapped the copy to three lines on a phone when it only ever needed two. Sharing
the row with a 200px photograph and a 40px gap leaves `0.88 × vw − 240px`, so one
unwrapped line needs **992px**. In the fluid range above 1325px it is 47.81vw against
`0.88 × vw − 240`, satisfied from 600px. At 16px on a phone the sentence is 595.6px
of text in 343.2px, so it lands on **two** lines.

**The 1.2846vw figure.** The name is 5.112em wide, so hitting 85% of its width — the
middle of the 80–90% asked for — means `0.85 × 5.112 × 11 / 37.21` = **1.2846vw**,
which sits inside the clamp at every width from 1366 up. The **17px floor binds
below that**: at 1024px the line is 17px, which is **110%** of the name's width, and
reaching 85% there would need 13.2px. The floor wins, because it is the stated clamp.
At 390px the brief fixes 16px outright, so the percentage rule does not apply.

Below `md` the block is a **column**. In a row at 390px the photograph's 140px would
leave 179px for the text and the sentence would run to six lines; stacked, it gets
the full 343px and lands on two. `self-end` keeps the photograph on the 6vw right
edge in both directions.

**The photograph.** One picture. Straight edges, **no rotation, no tape, no
shadow, no frame, no caption**. **200px wide at 4:5 on desktop** (250px tall),
**140px on mobile**. Placeholder drawn in the paper tone at the same size and
ratio until a photograph exists, so nothing shifts when one arrives.

It is a **different frame from the ME room's portrait** — it is a separate
`HERO_PHOTO` slot in `data/me.ts`, filled separately, precisely so the site
doesn't open on the same face it shows one scroll later.

**Verified in Chrome** at all five required widths. Ink figures are anchored to the
real baseline with a zero-height inline-block and read from per-glyph canvas scans,
not from `getBoundingClientRect`, because for this face the box and the ink disagree.
Contrast is sampled from real screenshot pixels against the painted backdrop, not
computed from the token:

| Viewport | Name | ¶ size | ¶ lines | % of name | F ink vs ¶ | **Name ink → ¶ ink** | Pad below ¶ | Contrast |
|---|---|---|---|---|---|---|---|---|
| 1920×1000 | 211.2px | 24.66px | 1 | 84.5% | +0.56px | **35px** | 70px (7vh) | 9.33:1 |
| 1440×900 | 158.4px | 18.50px | 1 | 84.9% | +0.67px | **37px** | 63px (7vh) | 9.33:1 |
| 1366×768 | 150.3px | 17.55px | 1 | 85.0% | 0.00px | **37px** | 53.8px (7vh) | 9.33:1 |
| 1024×800 | 112.6px | 17.00px | 1 | 110% | +0.50px | **40px** | 56px (7vh) | 9.33:1 |
| 390×844 | 42.9px | 16.00px | 2 | n/a (fixed 16px) | +0.30px | **46px** | 59.1px (7vh) | 9.33:1 |

One screen at all five, bottom padding of `max(7vh, 48px)` at all five, no horizontal
scroll at all five, and no name/paragraph collision at any of them. The air above the
name is large by design — the block is pinned to the bottom line, so the slack all
lands there rather than between the name and its own paragraph.

> **Open defect: the photograph is not rendering.** `OpeningProps.photo` is accepted
> and `App.tsx` passes it, but there is no photo element in the JSX and no placeholder
> either, so the hero currently draws the name and paragraph only. Earlier rows in
> this file claiming a `200×250` / `140×175` photo "on the 6vw right edge" were not
> reproducible and have been removed rather than carried forward. Note also that the
> block is bottom-anchored, so raising the paragraph's margin lifts the name with it —
> the name's size and horizontal alignment are untouched, but its vertical position
> moves by exactly the change in margin plus padding.

---

## 13. Navigation

**Words only.** No bar, no background, no border, no divider lines, no dots
between items, no pill outlines. A line of handwriting across the top of a page.

| Part | Rule |
|---|---|
| **Position** | Fixed, top of the viewport. The six room words, **right-aligned**. There is nothing on the left. |
| **Type** | **DM Sans.** The one place on the site that is not a piece of writing. |
| **Colour** | **`text-muted`, not `text-ink`.** The links are the tone-aware grey, so the hero name stays the brightest thing in the top third of the screen. Rose on hover, focus and active is the only thing that lifts a link. |
| **Handwriting** | The nav words are typeset; the one shared mark under them is the handwriting. |
| **Order** | Page order: Me, Work, Writings, Life, *Journal*, Let's Talk. |
| **Spacing** | `gap-x-[clamp(2.75rem,6.5vw,7.5rem)]` — **50px** at 768, rising fluidly to **120px** at 1920. The words are a set of items, not a sentence, so they are spaced like a set. |
| **Tilt** | Every word a **different** angle, each **under 2°**. Stored per room as `tilt` in `data/rooms.ts`. |
| **Active room** | One hand-drawn mauve underline, `NavMark`, the same for every word. Cross-fades between rooms; never redraws. |
| **Hover / focus** | The same underline, wiped in left to right over 0.45s and wiped out on leave; the word rises from 70% to 100%. Focus included. The current room's line does not redraw on hover. |
| **Mobile** | The words collapse into one small `rooms` word, top right, which opens the six in a soft overlay. Focus trap, Escape closes, focus returns to the trigger. |

**The gap is one fluid value, not a step function.** It was `gap-x-7` with an
`lg:` bump to `gap-x-9` — a single step at 1280, a breakpoint that corresponds to
nothing real. It then moved to `clamp(2.25rem, 3.5vw, 4.5rem)` and finally to
`clamp(2.75rem, 6.5vw, 7.5rem)`, which is roughly double. Measured gaps between
adjacent word boxes:

| Viewport | 768 | 1024 | 1280 | 1366 | 1440 | 1680 | 1920 |
|---|---|---|---|---|---|---|---|
| Gap | 49.9 | 66.6 | 83.2 | 88.8 | 93.6 | 109.2 | 120.0 |

Six words on one line at every one of those, the right edge still on the 6vw
line, and space still free on the left: 756.6px at 1920, 93.3px at 768 — 768 is
the tightest width, and it is what caps the fluid value rather than the other
way round. The mobile overlay uses the same idea vertically,
`gap-y-[clamp(2rem,5vh,2.75rem)]`, which is 42.2px at 390.

**The nav is DM Sans, the hero is Beth Ellen, and that difference is the point.**
The nav used to be Beth Ellen too, which made it the only handwriting on the site
beside the hero name and the room titles. Two words sitting above a 211px
signature compete with it: the same hand twice, one of them a tenth of the
size, and the eye reads the small one as an echo of the large one rather than as
wayfinding. DM Sans gives the nav its own voice and makes the hierarchy legible —
the name is writing, the rooms are interface. Room titles keep Beth Ellen,
because the nav is furniture and the titles are content.

**The links are grey and the name is cream.** The links use `text-muted` — the
tone-aware grey — rather than `text-ink`, which is the same cream the hero name is
set in. A 20px cream link sitting directly under a 211px cream signature makes
the nav read as a second headline competing to be read first. With the links
grey, the name is unambiguously the brightest thing in the top third of the
screen, and the nav sits back where furniture belongs. Rose on hover, focus and
active is the only thing that lifts a link above its neighbours.

The greys were chosen partly because they clear AA on their own backgrounds, which
the cream nav could not have. Measured in the browser, in both tones:

| | Dark tone | Paper tone |
|---|---|---|
| Background | `#242222` | `#F2F2F2` |
| Hero name | `#F3EFEB` — **13.83:1** | `#242222` |
| Nav link, inactive | `#B5AEAA` — **7.23:1** | `#6B6560` — **5.13:1** |
| Nav link, active | `#B88D98` — **5.50:1** | `#7A4A56` — **6.38:1** |

All three pass AA for normal text (4.5:1) in both tones.

**The nav has no background, so it takes the tone of the room behind it.** The
nav carries the `tone-dark` / `tone-paper` class of whichever room is currently
being read, so `text-ink` and `text-accent` resolve to the correct pair in both
tones and the words stay legible. This is why it can be barless: the alternative
is a bar, and a bar is exactly what this is replacing.

**No wordmark.** The small `Fatimah` that sat at the top left is **gone**, and
with it its button, its `goHome` handler and its rotation. It duplicated the
hero name one screen below it, and the place it was actually earning its keep —
telling you who the site belongs to when you are deep in a room — needs nothing,
because the nav is `fixed` and so is on screen regardless.

**No per-room signature.** A second `Fatimah` in the top left of every room landed
directly underneath the nav's, so it is gone too.

---

## 14. Handwritten feel

The page should look written, not typeset. All of this is done **with
restraint** — the moment it becomes busy it stops looking like a notebook and
starts looking like a template.

| Technique | Where | How often |
|---|---|---|
| Titles and the greeting draw themselves in | Room titles, the greeting | Once each, on first appearance |
| Hand-drawn underline | A few key words | **Not under every title** — pick a few |
| Hand-drawn circle | A few key words | Same |
| Uneven rotation, under 2° | Titles, pills, photos | Everywhere it suits |
| Margin notes | Beside paragraphs, at an angle | As often as there's something to say |
| Crossed-out word with the real word beside it | Only where the copy fits | **At most once or twice on the whole site** |

**The crossed-out word** is the rarest thing here. It means a change of mind
caught mid-writing. Two is a lot. If a third place suggests itself, it does not
get one.

**Underlines and circles** reuse the existing `Underline` and `HighlightCircle`
components. They are emphasis, not decoration — if the word does not need
emphasis, the line is not there.

---

## 15. Anti-patterns

Check every phase against this. From section 23.

**Visually:** neon, gradients everywhere, excessive pink, glassmorphism, giant 3D
objects, excessive rounded cards, stock photography, excessive animation,
decorative fonts everywhere, fake paper textures, literal notebook backgrounds,
doodles covering every available surface, drop shadows, eyebrows/small labels
above headings, dividers for the sake of decoration, rotation of 2° or more,
a third crossed-out word, underlines under every title.

**Layout and navigation:**

- A nav bar, or any background, border or divider on the nav. It is words.
- Dots or slashes between nav items.
- Two nav words at the same angle.
- A second `Fatimah` in a room — the nav owns it.
- A floating pill, or any other wayfinding that isn't the nav.
- A sticky note or piece of tape in a colour that isn't a tint of the existing
  palette.

**In type:**

- **Beth Ellen below 18px.** It looks weak, not intimate. Cut it.
- **Long paragraphs in Beth Ellen.** A script face is tiring past a couple of
  lines. One or two sentences in Beth Ellen; anything longer in DM Sans.
- Instrument Serif, or any other display font, anywhere.
- Rose or muted rose carrying text that has to be read.

**In copy:** "passionate about", "impact-driven", "innovative solutions",
"leveraging technology", "empowering communities", "dynamic professional",
"results-driven", "thought leader", "AI-powered" when it isn't necessary, forced
inspirational lessons.

---

## 16. Pre-commit checklist

Section 24, applied before anything is accepted.

1. Does it sound like me?
2. Does it look like my notebook?
3. Does it contribute something?
4. Is the feminine detail subtle?
5. Is there enough space?
6. Is the animation helping?
7. Does it show who I am, not just what I do?

**Added for the redesign:**

8. Is there a small label above any heading? Cut it.
9. Is there a drop shadow or a gradient anywhere? Cut it.
10. Is anything set in Beth Ellen under 18px? Raise it.
11. Is a paragraph of more than two sentences in Beth Ellen? Move it to DM Sans.
12. Does it still read correctly at phone width?
13. Does the nav stay readable over both the dark and the paper tone?
14. Does any word here say becoming, journey or evolving? Cut it.
15. Is the rotation under 2°? Anything more looks broken, not hand-made.
16. Have we used a third crossed-out word? Cut the least good one.
17. Does this title actually need an underline?
18. Is rose being used anywhere outside the §9.1 budget — the name, one circle per
    room, the active nav mark, doodles? Cut it.
19. Is any sticky note, tag or tape a new hue rather than a tint of the palette?
20. Has the hero grown a tagline, an eyebrow, a button, a doodle or a room list?
    Cut all five.