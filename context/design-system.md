# Design System

Implementation reference for the tokens, type scale, tone rules and doodle
vocabulary. The rules themselves come from `brand-direction.md`; this document
records how they are expressed in code.

The live values are in `src/style.css`. This document is the map, not the source.

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

These do **not** change with tone. They are the raw brand colours.

| Token | Value | Use |
|---|---|---|
| `--color-charcoal` | `#242222` | primary background |
| `--color-ivory` | `#F3EFEB` | primary text |
| `--color-grey` | `#B5AEAA` | secondary text, borders on paper |
| `--color-rule-dark` | `#46413F` | dividers on dark |
| `--color-rose` | `#B88D98` | dusty rose accent |
| `--color-muted-rose` | `#392F32` | hover surfaces, small blocks |

---

## 2. The dark tone

```css
:root, .tone-dark {
  --room-bg:     #242222;   /* deep charcoal, warm almost-brown */
  --room-ink:    #F3EFEB;   /* warm ivory — never #FFFFFF */
  --room-muted:  #B5AEAA;   /* warm grey */
  --room-rule:   #46413F;   /* charcoal grey */
  --room-accent: #B88D98;   /* dusty rose */
}
```

---

## 3. The paper tone — derived, needs sign-off

> **Not from the brand direction.** The direction defines only a dark palette.
> These values were derived to give LIFE's photography somewhere to sit. They are
> contrast-checked but have not been brand-approved. Revisit if LIFE feels wrong.

```css
.tone-paper {
  --room-bg:     #F2F2F2;
  --room-ink:    #242222;
  --room-muted:  #6B6560;   /* darkened from #B5AEAA */
  --room-rule:   #D5CFCB;   /* #46413F is too heavy on light */
  --room-accent: #7A4A56;   /* darkened from #B88D98 */
}
```

Applied to **LIFE only**. ME stays dark with its portrait in an editorial frame.
WORK stays dark — section 20 calls for structured and confident.

---

## 4. Contrast

Measured WCAG ratios. Every pair below clears 4.5:1 (AA) unless marked.

**On dark `#242222`**

| Foreground | Ratio | Verdict |
|---|---|---|
| Ivory `#F3EFEB` | 15.0:1 | AAA |
| Warm grey `#B5AEAA` | 6.7:1 | AA |
| Dusty rose `#B88D98` | 5.5:1 | AA |
| Muted rose `#392F32` | 1.2:1 | **decorative only** — never text |

**On paper `#F2F2F2`**

| Foreground | Ratio | Verdict |
|---|---|---|
| Charcoal `#242222` | 14.2:1 | AAA |
| Warm grey `#6B6560` | 5.1:1 | AA |
| Darkened rose `#7A4A56` | 6.4:1 | AA |
| `#46413F` rule | 8.4:1 | fine as a border, too heavy visually |

**The trap**

The brand values `#B5AEAA` and `#B88D98` are the *dark*-tone tokens. On paper
they collapse:

- `#B88D98` on `#F2F2F2` — **2.6:1**, fails
- `#B5AEAA` on `#F2F2F2` — **1.9:1**, fails

That is why the paper tone carries darkened variants. Never use the raw brand
grey or rose inside `.tone-paper`.

---

## 5. Typography

Three voices. No fourth.

| Voice | Family | Role |
|---|---|---|
| Structured | **DM Sans** | nav, body, buttons, labels, project descriptions, dates, metadata |
| Editorial | **Instrument Serif** | large section titles, major statements, reflective phrases, pull quotes |
| Notebook | **Beth Ellen** | margin notes, annotations, doodle labels, captions, tiny observations |

Google Fonts:

```
https://fonts.googleapis.com/css2?family=Beth+Ellen&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&display=swap
```

**Hierarchy**

| Level | Family | Treatment |
|---|---|---|
| Major title | Instrument Serif | large, ivory |
| Section title | Instrument Serif or DM Sans | context dependent |
| Body | DM Sans | ivory, comfortable line height |
| Metadata | DM Sans | small, uppercase, warm grey |
| Notebook annotation | Beth Ellen | dusty rose |

**Rules**

- Beth Ellen is never a body font.
- Never use pure white `#FFFFFF`. Ivory keeps the dark interface soft.
- Instrument Serif carries the large-title role that Bebas Neue held in v2. It is
  softer and more elegant — this is the intended result, not a downgrade.

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
- **Restrained** — not every section gets one. §11 is explicit.
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
margin — see §12. The bubbles are drawn as closed wobbly paths rather than
`<circle>` so they stay hand-drawn, are stroked at 75% of the cloud's weight so
they read as secondary, and are staggered 0.5s / 0.8s / 1.05s so the trail
appears to trail off.

---

## 8. Motion

**Think:** writing, revealing, sliding, drifting, unfolding, settling.
**Not:** spinning, glitching, bouncing, exploding, floating 3D objects.

| Interaction | Behaviour |
|---|---|
| Handwriting draws itself | stroke reveal |
| Underlines animate | dusty-rose line draws beneath |
| Arrows draw themselves | stroke reveal |
| Photographs shift | a rotated photo settles into place |
| Notes appear on scroll | handwritten comment enters after the main content |
| Clouds drift | very subtly |
| Hover reveals | nav items and projects reveal a small handwritten note |

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

---

## 10. Anti-patterns

Check every phase against this. From section 23.

**Visually:** neon, gradients everywhere, excessive pink, glassmorphism, giant 3D
objects, excessive rounded cards, stock photography, excessive animation,
decorative fonts everywhere, fake paper textures, literal notebook backgrounds,
doodles covering every available surface.

**In copy:** "passionate about", "impact-driven", "innovative solutions",
"leveraging technology", "empowering communities", "dynamic professional",
"results-driven", "thought leader", "AI-powered" when it isn't necessary, forced
inspirational lessons.

---

## 11. Pre-commit checklist

Section 24, applied before anything is accepted.

1. Does it sound like me?
2. Does it look like my notebook?
3. Does it contribute something?
4. Is the feminine detail subtle?
5. Is there enough space?
6. Is the animation helping?
7. Does it show who I am, not just what I do?