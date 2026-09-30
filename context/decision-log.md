# Decision Log

Every architectural and design decision agreed during the build, with reasoning.
Later decisions override earlier ones. Where this log and `brand-direction.md`
conflict, the brand direction wins on anything of voice or visual taste, and this
log wins on anything technical.

---

## 1. Stack

**Decision:** React 19 + TypeScript + Webpack 5 + Tailwind CSS v4.

**Reasoning:** The original project was vanilla TS. `context/doodle-components.jsx`
was React, so React was adopted rather than the doodles being ported away from it.
React was chosen over staying vanilla because the component model suits a
six-room, data-driven single page.

**Pinned versions**

| Package | Version | Note |
|---|---|---|
| `react`, `react-dom` | 19.x | |
| `typescript` | `^5.8.2` | **Do not bump to 7.x.** TypeScript 7 is the Go port and will likely break `ts-loader`. |
| `tailwindcss` | `^4.x` | v4 uses CSS-first `@theme`, not `tailwind.config.js`. |
| `webpack` | `^5.x` | |

**React 19 ships no types of its own.** Its `package.json` `exports["."]` has only
`default` and `react-server` — no `types` condition. Types come entirely from
`@types/react`, which does ship `jsx-runtime.d.ts`. This is why the build works
under either module resolution mode.

---

## 2. Page structure

**Decision:** One long-scroll page containing six rooms, with anchor navigation.
All four existing HTML pages deleted.

**Reasoning:** The original was a 4-page site (home, projects, about, blog) with
three pages that were literal placeholders containing only the words
"Projects Page" / "About Page" / "Blog Page". The six-room model in the brand
direction does not map onto a four-page structure, and the spec's "asymmetric
editorial grid" reads as one continuous scroll.

**Mapping from the old site**

| Old | New |
|---|---|
| `index.html` (hero / education / skills / experience) | Removed entirely. Content facts reseeded into Room 1 (ME). |
| `projects.html` | Room 2 (WORK) |
| `about.html` | Room 1 (ME) |
| `blog.html` | Room 3 (WRITINGS) |
| — | Room 4 (LIFE) — new |
| — | Room 5 (STILL BECOMING) — new |
| — | Room 6 (LET'S TALK) — new |

---

## 3. Intro gate

**Decision:** A full-screen intro (the "ridiculously simple" homepage) with an
`[ enter ]` button that reveals the six rooms. The intro **replays on every fresh
load**. The nav wordmark jumps back to the intro.

**Reasoning:** The brand direction asks for a deliberately minimal homepage that
does not contain the whole biography, where `enter` "reveals the rest of the site
almost like you're walking through it." Replaying it every load makes that
moment repeatable rather than a one-time splash. No `sessionStorage` flag.

---

## 4. Identity — no logo asset

**Decision:** No logo file. The wordmark is `Fatimah Wayo` in DM Sans or
Instrument Serif, with a sparse handwritten `FW` or `Fatimah` in Beth Ellen used
sparingly.

**Reasoning:** Section 21 of the brand direction says "Don't create a complicated
logo. Your name is enough." The previous `src/assets/Logo.svg` (29 KB) and
`Logo.png` were deleted.

---

## 5. Typography

**Decision:** Exactly three voices — DM Sans (structured), Instrument Serif
(editorial), Beth Ellen (notebook).

**Reasoning:** This matches the brand direction. Note the departure from v2,
below.

**Constraint:** Beth Ellen is a single-weight (400) Google Font. Handwritten
annotations cannot vary in weight — variation has to come from size, colour and
rotation instead.

---

## 6. Colour — no crimson

**Decision:** No crimson anywhere. The accent system is dusty rose `#B88D98`
plus warm grey `#B5AEAA`.

**Reasoning:** The brand direction's palette defines six colours and crimson is
not among them. Section 11 says doodles are "mostly dusty rose, occasionally
`#B5AEAA`." The crimson `#E53935` that appeared throughout v2 was considered and
explicitly rejected.

**Consequence:** `EditorialDot` from the old doodle library is retired — section
10's vocabulary has no "focal dot."

---

## 7. Theme — dark throughout, paper tone on LIFE only

**Decision:** Dark everywhere. LIFE uses a derived "paper" tone so photography
isn't sunk into charcoal.

**Reasoning:** The brand direction defines only a dark palette. The v2 light
lookbook theme is gone. A small light treatment for the photo room was agreed as
a deliberate exception.

**The paper palette is derived, not from the brand direction** — see
`design-system.md`. It is contrast-checked but needs Fatimah's sign-off.

---

## 8. Photography

**Decision:** Photo slots are built first with a deliberate placeholder
treatment, so every layout is reviewable before any image exists. When
photographs arrive they are used **unedited** — no filter, no forced treatment.

**Reasoning:** Section 14 says "Don't force every photo into the same filter.
Let real colour exist." Presentation choices (slight rotation, uneven spacing,
overlap, tape, settle-on-load) are ours to make; the pixels are not.

**Deadlines**

| Phase | Needs |
|---|---|
| Phase 5 (ME) | 1–2 portraits |
| Phase 8 (LIFE) | 10–20 candid frames |

Suggested: mix of landscape and portrait, web-sized (~400 KB or under).

---

## 9. Copy

**Decision:** All copy comes verbatim from the brand direction wherever Fatimah
wrote it. Only placeholder or structural copy is drafted.

**Reasoning:** The voice section is precise and the sample copy is already in
her words. Rewriting it would be a downgrade.

---

## 10. Doodles

**Decision:** Nine doodle components, ported from `doodle-components.jsx` plus
four additions to match section 10's vocabulary.

Additions needed: **question mark, exclamation mark, scribble, tiny star.**

Port fix: every drawing path gets `pathLength="1000"`. The original animates
`stroke-dashoffset` from a hardcoded `1000`, which only looks correct for paths
that genuinely are 1000 units long.

Also: `DoodleStyles`' runtime `<style>` injector moves into `style.css`.

---

## 11. Build configuration notes

- `tsconfig.json`: `jsx: "react-jsx"`, `module: "ESNext"`,
  `moduleResolution: "bundler"`, `target: "ES2020"`, `lib` including DOM,
  `strict: true`.
- `tsconfig.json`: **`noEmit` is deliberately not set** — ts-loader requires emit.
- `postcss.config.js`: remove the unused `const tailwindcss = require('tailwindcss')`
  (a v3 leftover; v4 loads Tailwind via `@tailwindcss/postcss`).
- `tailwind.config.js`: **deleted.** Tailwind v4 ignores it. Its `animate-drop-in`
  keyframes and font families were never applied to the old build either.
- Fast Refresh is **not** configured. Dev server does a full reload on save,
  which is acceptable for a static site. Adding it later requires babel or swc
  alongside ts-loader.

---

## 12. Deliberately deferred

**`dist/` is committed to git.** `.gitignore` contains only `/node_modules`.
Agreed to leave this alone for now rather than fix it during a redesign.
Webpack's `output.clean` will remove the stale multi-page output on next build,
which will show up as deletions in `git status` — that is expected.

---

## 13. Deltas from `portfolio-build-context-v2.md`

Recorded so these do not get re-added by accident.

| Item | v2 | Now | Why |
|---|---|---|---|
| Display font | Bebas Neue / Anton / condensed | **None** | Brand direction defines exactly three voices. Instrument Serif carries the large-title role. |
| Handwritten font | Beth Ellen / Caveat / Permanent Marker | **Beth Ellen only** | Brand direction lists one notebook voice. |
| Body font | Space Grotesk / DM Sans | **DM Sans only** | |
| Crimson `#E53935` | Primary energetic accent, focal dots, script overlays | **Removed** | Not in the brand palette. |
| Light theme | `#F2F2F2` editorial lookbook, both themes supported | **Dark only** (+ paper tone on LIFE) | Brand direction defines one palette. |
| Accent weight | Unquantified, "approx 3–5% of visual space" | **3%, "discovered not announced"** | Tightened in the brand direction. |
| Page model | 4 pages | **1 page, 6 rooms** | |
| Doodle scope | 7 components incl. focal dot | **9 components, no focal dot** | |
| Home | Hero + education + skills + experience | **Intro gate + `[ enter ]`** | |

---

## 14. Open items

Not blocking Phase 1. All sit in Phase 5+.

1. **Paper palette sign-off** — the derived `#F2F2F2` / `#242222` / `#6B6560` /
   `#D5CFCB` / `#7A4A56` values are ours, contrast-checked but not
   brand-approved.
2. **Three nav hover notes are proposals** — ME *where I come from*,
   WORK *things I've actually built*, LET'S TALK *no reason needed*. The other
   three came from the brand direction.
3. **WORK content** — the four projects and "what I actually did" for each.
   Ships as typed scaffolding with placeholders until supplied.
4. **PCES ambiguity** — the brand direction lists PCES as a *project* under WORK
   ("banking systems, payment processing, APIs, databases") but the old site
   lists PCES as an *employer* spanning 2022–2025. Needs clarifying: is the case
   study a system built at PCES, or the company itself?
5. **Skills placement** — the brand direction has no skills room. Currently
   planned for ME as an editorial ruled column rather than pill tags.