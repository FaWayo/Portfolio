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
| — | Room 5 (journal room, no title) — new |
| — | Room 6 (LET'S TALK) — new |

---

## 3. Intro gate

**Decision (overridden by design direction change):** The intro gate and `[ enter ]`
are removed. The site opens directly on the first screen — "Hi, I'm Fatimah."
and the short paragraph — with the room list following underneath. No reveal
transition, nothing replays on load. The first screen and the page are the same
thing. There is no fixed top navigation bar.

**Reasoning:** The user asked to match an inspiration that treats it as one
plain page, without a separate gate. That choice prioritises a continuous,
uninterrupted scroll over the "walking through it" threshold. Removing the gate
also makes the opening genuinely identical whether you arrive or scroll back.

---

## 3a. Navigation — no top bar

**Decision:** Removed the fixed top navigation bar. Navigation now lives in the page:

1. On the first screen, under the opening paragraph, the six rooms appear as a
   loose list, each a link that scrolls to that room, with its Beth Ellen
   handwritten note beside it. They read like part of the welcome, not a menu.
2. After the first screen, a small quiet floating pill sits at the bottom centre
   showing the name of the room in view. Tapping it opens the six-room overlay.
   It must never cover photographs in the LIFE room on mobile.
3. A small `Fatimah` in Beth Ellen at the top left of each room scrolls back to
   the top — a signature, not a bar.

**Accessibility:** the floating pill is a real `<button>`, the overlay traps focus
and closes on `Escape`, and there is a skip link to the room stack.

**Reasoning:** One plain continuous page. Putting the room list in the welcome
avoids a fixed bar while keeping all six rooms reachable. The pill and the
signature give wayfinding without pinning a header over the content. The
`useActiveRoom` scroll listener is retained to drive both the pill label and the
first-screen list's active state, since it already has no dead zones between
sections.

---

## 4. Identity — no logo asset

**Decision:** No logo file. The signature is `Fatimah` handwritten in Beth Ellen at
the top left of each room, and it is also the return-to-top control.

**Reasoning:** Section 21 of the brand direction says "Don't create a complicated
logo. Your name is enough." The previous `src/assets/Logo.svg` (29 KB) and
`Logo.png` were deleted.

---

## 5. Typography

**Decision (superseded again — see §16):** Beth Ellen is the main font of the site
and Instrument Serif is retired entirely.

Beth Ellen sets the greeting, all room titles, the room list, pills and buttons,
captions, doodle notes, journal entries and any short statement. DM Sans keeps
the long-form reading: the intro paragraph, the Me text, Writings descriptions.

The dividing line is length, not taste. One or two sentences in Beth Ellen;
anything longer in DM Sans, because a script face is tiring to read past a couple
of lines.

**Size floor: 18px.** Below that Beth Ellen looks weak rather than intimate.
Room titles go large, not small.

**Constraint:** Beth Ellen is a single-weight (400) Google Font. Nothing set in it
can vary in weight — variation comes from size, colour and rotation instead.
That constraint is why the size floor and the rotation budget matter so much.

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

## 7. Theme — dark and paper tones alternating by room

**Decision:** Every colour stays exactly as it is: the dark tone, the derived
paper tone, dusty rose. No new colours. What changes is *which tone each room
uses* — the rooms strictly **alternate** dark, paper, dark, paper, dark, paper in
nav order (ME, WORK, WRITINGS, LIFE, IN PROGRESS, LET'S TALK), so scrolling feels
like flipping slides. No room breaks the alternation for its own sake.

**Reasoning:** The brand direction defines only a dark palette, and the paper
tone was originally agreed as a single exception for the photo room. The new
slide-deck direction asks for alternation, so paper is used more widely. No new
hue is introduced — the same derived values are reused, which keeps the
contrast work already done in `design-system.md` valid.

**Open:** paper-toned body text at `#6B6560` on `#F2F2F2` is contrast-checked,
but rooms that were never intended to be light now need a review in the browser.

**Rose stays near 3% of any viewport** in both tones.

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
wrote it, except the phrases she has since removed. Only placeholder or
structural copy is drafted.

**Removals (design direction change):**

- `Still becoming.` — the tagline under the name. Deleted, **not replaced**. The
  first screen is now the name and the short paragraph only.
- The phrase `Still Becoming` and the room's title entirely. The room keeps its
  journal feel and its six entry types, but has no title. In navigation it reads
  `IN PROGRESS`, with the note *notes, mostly*. Nothing anywhere says "becoming",
  "journey" or "evolving".
- All small labels above headings — no eyebrows, no tiny letter-spaced caps above
  titles. This covered the name above "Hi, I'm Fatimah.", `ROOMS`, `BACK TO
  START`, `SCROLL`, and the `EXPERIENCE` / `EDUCATION` / `SKILLS` labels. A
  heading stands on its own. Now listed as an anti-pattern in
  `design-system.md` §11 and checked at every gate.

**Reasoning:** The voice section is precise and the sample copy is already in
her words, so the remaining copy is untouched. The removals are deliberate
sparseness — she wants warmth and plainness over density.

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
| Display font | Bebas Neue / Anton / condensed | **None — Beth Ellen instead** | Beth Ellen is the main font. No display font is added. Instrument Serif is retired. |
| Handwritten font | Beth Ellen / Caveat / Permanent Marker | **Beth Ellen only** | And it is now the *primary* face, not just a notebook annotation. |
| Body font | Space Grotesk / DM Sans | **DM Sans only** | |
| Crimson `#E53935` | Primary energetic accent, focal dots, script overlays | **Removed** | Not in the brand palette. |
| Light theme | `#F2F2F2` editorial lookbook, both themes supported | **Dark and paper, alternating by room** | Same two tones, no new colour; the slide-deck structure alternates them. |
| Accent weight | Unquantified, "approx 3–5% of visual space" | **3%, "discovered not announced"** | Tightened in the brand direction. |
| Page model | 4 pages | **1 page, 6 rooms** | |
| Doodle scope | 7 components incl. focal dot | **9 components, no focal dot** | |
| Home | Hero + education + skills + experience | **First screen + room list** | No gate, no `[ enter ]`. |
| Room 5 | `STILL BECOMING` | **Untitled journal room** | The phrase is removed, not renamed. |
| Eyebrow labels | Small caps above titles | **Removed** | A heading stands on its own. |
| Shadows / gradients | Photo drop shadow, tape blur | **Removed** | Pill shapes instead; no shadows, no gradients. |
| Motion | Stroke-draw, cloud drift, photo settle, reveals | **One fade on room entry** | `prefers-reduced-motion` respected throughout. |

---

## 14. Open items

Not blocking. All sit in the unbuilt phases.

1. **Paper palette sign-off** — the derived `#F2F2F2` / `#242222` / `#6B6560` /
   `#D5CFCB` / `#7A4A56` values are ours, contrast-checked but not
   brand-approved. This matters more now that paper tone is used on more rooms
   than just LIFE.
2. **Three nav hover notes are proposals** — ME *where I come from*,
   WORK *things I've actually built*, LET'S TALK *no reason needed*. The other
   three came from the brand direction.
3. **WORK content** — the four projects (Omaya Care, PCES, MEST, SMS Gateway) and
   "what I actually did" for each. Ships as typed scaffolding with placeholders
   until supplied.
4. **PCES ambiguity** — the brand direction lists PCES as a *project* under WORK
   ("banking systems, payment processing, APIs, databases") but the old site
   lists PCES as an *employer* spanning 2022–2025. Needs clarifying: is the case
   study a system built at PCES, or the company itself?
5. **Skills placement** — settled: shrunk, or behind the `CV` link, so ME does
   not read as a résumé.
6. **Journal room label** — `IN PROGRESS` is a placeholder pending Fatimah's
   confirmation. The room has no title; this is only how it reads in the
   navigation list.
7. **Portraits** — ME still has no photographs, only designed placeholders.

---

## 15. Design direction change — 2026-09-30

The design direction changed after Phases 1–5 were built. Recorded here so the
reasoning survives the rebuild.

**Decisions**

| Change | Reason |
|---|---|
| Intro gate and `[ enter ]` removed; site opens on the first screen | Wants one plain page, not a threshold in front of it |
| Top nav bar removed; room list, floating pill, and `Fatimah` signature instead | One continuous page; navigation belongs in the content |
| `Still becoming.` tagline deleted, not replaced | Sparseness. The name and one paragraph are enough |
| `STILL BECOMING` room untitled, shown as `IN PROGRESS` | The phrase is removed outright; the room keeps its journal feel |
| Eyebrow labels removed everywhere | A heading stands on its own |
| Dark/paper tones alternate room by room | Slide-deck feel when scrolling |
| Pill shapes; no shadows, no gradients | Plainer, warmer, retro |
| One fade animation only | Simplicity; doodles keep their behaviour but the extra animations retire. **Superseded by §16** — titles now draw on as well. |
| Experience, education, skills shrink or move behind a `CV` link | ME should not read like a résumé |
| Mobile first | Stacks cleanly on small screens before wide layouts are designed |
| CV link points at a Google Drive PDF | Supplied by Fatimah; `/preview` form links the file rather than Drive's viewer page |

**Type (superseded by §16):** Instrument Serif is the display face for all room
titles and big statements, and no other display font is added. DM Sans carries
small quiet body text. Beth Ellen stays for handwritten notes only, beside the
room names — they are her voice, not labels.

**Colour:** unchanged. Dark tone, paper tone, dusty rose, rose near 3%.

**Conflict to watch:** the one-fade rule describes the *new* motion vocabulary
only. Stroke-draw, cloud drift and photo settle are existing doodle behaviour and
are kept as-is in Step 3, not rebuilt. Anything else added later gets cut.

**The CV link**

```
https://drive.google.com/file/d/1QZa7OBHapcTPIZW0hVTr-EeA6Kp4PLtO/preview
```

Stored in `src/data/me.ts` as `CV_URL`, not hardcoded in the room.

---

## 16. Type and feel change — 2026-09-30

A second direction change, later the same day. This one overrides §5 and the
one-fade rule in §15.

**Type**

| Decision | Reason |
|---|---|
| **Beth Ellen is the main font** — greeting, room titles, room list, pills, buttons, captions, doodle notes, journal entries, short statements | The site should look written, not typeset. A script face as the primary voice does that in a way a serif cannot |
| **Instrument Serif removed completely** — the font link, `--font-serif`, every usage | It was the typeset voice. If the page is to feel handwritten it cannot also be typeset. No display font replaces it |
| **DM Sans keeps the long-form** — intro paragraph, Me text, Writings descriptions | A script face is tiring past a couple of lines. The split is by length, not taste |
| **18px floor on Beth Ellen** | Below that it looks weak rather than intimate |
| Room titles go large, not small | The face suits large sizes |

**Feel**

| Decision | Reason |
|---|---|
| Titles and the greeting **draw themselves in once**, then stay still | Reuses the existing `drawPath` and `pathLength="1000"` work. A title that writes itself once and stops is the clearest signal that a hand made this |
| `Underline` and `HighlightCircle` on a few key words — not every title | Emphasis, not decoration |
| Rotation **under 2°** on titles, pills and photos | Hand-placed, not broken |
| Margin notes at an angle beside content | Something jotted next to a paragraph |
| **Crossed-out word with the real word beside it — at most once or twice on the whole site** | A change of mind caught mid-writing. The rarest device available, so it is rationed |
| Photos sit like taped or pinned prints, slightly off axis | Flat, no shadow, no frame chrome |
| Backgrounds stay flat — no paper texture, no lined notebook, no gradients | Texture images would fight the hand-drawn line work |

**Doodle limits from design-system.md §7 still apply, and rose stays near 3% of
any viewport.** The feel work does not licence more doodles.

**Motion, restated.** This change replaces the one-fade rule. The motion
vocabulary is now: titles draw on once, rooms fade in, and the existing doodle
behaviours (stroke-draw, cloud drift, photo settle) stay. **Nothing loops and
nothing replays** — an animation that plays a second time is wrong.

**Contrast, measured for rose used as text**

| Pair | Ratio |
|---|---|
| Rose `#B88D98` on dark `#242222` | 5.50:1 — passes AA |
| Rose `#7A4A56` on paper `#F2F2F2` | 6.38:1 — passes AA |
| Muted rose `#392F32` on dark `#242222` | 1.23:1 — **surfaces only, never text** |

Rose is safe as text on both tones. Anything that has to be read uses
full-strength ink.

**New anti-patterns added:** Beth Ellen below 18px; long paragraphs in Beth Ellen;
Instrument Serif or any other display font; a third crossed-out word; rotation of
2° or more; underlines under every title.
---

## 18. Navigation and layout change — 2026-09-30

**Supersedes:** §15 (floating bottom pill as the wayfinding), and the "rose near
3% of the viewport" rule from §16.

### 18.1 The nav is words

**Decision:** Wayfinding is a sticky line of six words in Beth Ellen across the
top right, with a small `Fatimah` at the top left. No bar, no background, no
border, no divider, no dots between items, no pill outlines. The floating bottom
pill is removed.

Each word carries its own tilt — a different angle per word, every one under 2°,
stored as `tilt` in `data/rooms.ts` so the angles are deliberate rather than
generated. The active room gets a hand-drawn rose `Underline`, redrawn on change;
hover and focus draw the same mark, lighter. On mobile the words collapse into a
single `rooms` word opening an overlay with a focus trap and Escape.

**Reasoning:** A bar with a background was the thing being replaced, so any
solution that reintroduces one fails on its own terms. Words with no chrome
cannot be mistaken for a template — they read as the top of a page. The active
mark reuses `Underline` deliberately: a nav mark drawn as anything other than the
site's own hand stops feeling handwritten.

**Consequence:** Because the nav has no background, it adopts the `tone-dark` /
`tone-paper` class of the room currently being read, so `text-ink` and
`text-accent` resolve correctly in both tones. This is the only reason a
barless nav stays legible, and it is why a background was not needed.

**Consequence:** `Room` no longer renders a per-room `Fatimah` signature. It sat
at `top-5 left-6`, which is exactly where the sticky nav now is, so every room
would have carried a second signature directly under the first. The nav owns that
affordance alone.

### 18.2 The rose budget replaces the 3% rule

**Decision:** Rose is rationed by role, and the list is closed: **the name**, **one
accent circle per room**, **the active nav mark**, and **doodles**. Not
paragraphs. Not backgrounds. The hero's `Fatimah.` is set in dusty rose and is
the site's main colour moment.

**Reasoning:** A percentage of viewport was never actionable — it bounded an
amount without saying where the colour was allowed to appear, so it was checked
by eye and enforced inconsistently. A closed list of roles can be checked item by
item. Measured contrast is unchanged and still passes: rose is 5.50:1 on dark and
6.38:1 on paper, so the name is safe as text in both tones.

### 18.3 The hero

**Decision:** `Fatimah.` alone — no `Hi, I'm` — in Beth Ellen, very large,
left-aligned, dusty rose. The paragraph beneath is DM Sans at 15–16px, max width
about 36 characters, muted cream, 40–56px below the name. A portrait cutout sits
right with one flat rose circle behind its shoulder, overlapping the photo's
edge. No tagline, no eyebrow, no button, no doodles, no room list.

**Reasoning:** The gap is the design. At a smaller size and a narrower measure
with real space under it, the paragraph reads as a note tucked under a signature
rather than a subtitle welded to the name. The rose name makes the name the
colour moment instead of the colour being a decoration scattered around it. The
circle overlaps the photograph's edge rather than sitting inside it, so the two
shapes read as overlapping paper rather than a framed photo.

### 18.4 Room layouts, described not yet built

Recorded now so the remaining rooms are not redesigned later:

- **Me** — a large portrait bleeding to the left edge, text to the right, a short
  Beth Ellen heading, one flat rose circle overlapping the photo corner.
- **Work** — one large card per project, cards overlapping slightly on a
  diagonal. Each has an image placeholder, a Beth Ellen title, and a small tag
  held on with a piece of tape. Each project gets its own story opening with
  "What I actually did".
- **Writings** — quiet. A list of posts, title in Beth Ellen, one line each,
  plenty of space.
- **Life** — photos like taped prints at different sizes and small rotations,
  some overlapping, a few short Beth Ellen captions. The "When I'm not working"
  heading sits *beside* the photos, not above them.
- **Journal** — the most different room. A journal page. Entries as sticky notes
  or torn paper pieces in the paper tone, each with a short Beth Ellen heading.
- **Let's Talk** — a big Beth Ellen heading and one rounded pill button per
  intent, loose like stickers, not in a neat row.

Rooms alternate between the dark and paper tones as full-width blocks, unchanged.

### 18.5 Materials and hard rules

Sticky notes, torn paper and tape use only the existing palette — dark tone,
paper tone, dusty rose, and the derived greys. Tints are fine; **no new hues**.
**No drop shadows** on any of them: a sticky note held down by a shadow reads as
a UI card, and the tape is what should say "held". Also standing: no eyebrow
labels, no lined-notebook background, no drop shadows anywhere.

### 18.6 Open

The fifth room's name is undecided. `data/rooms.ts` currently uses `Journal` as a
stand-in; changing `label` there updates the nav, the anchor and the room heading
together. Awaiting Fatimah's confirmation.

---

## 19. Hero sizing — the 96px floor is unreachable on a phone — 2026-09-30

**Decision:** The hero name is `min(clamp(96px, 17vw, 320px), 17vw)` at
`line-height: 0.9` on one line. The `96px` floor is honoured everywhere it is
physically possible and `17vw` governs below 565px.

**Reasoning:** The specified size and "must never be clipped at any width" are in
direct conflict on a small screen, and the conflict is arithmetic rather than
judgement. `Fatimah.` measures **5.112em** in Beth Ellen — read from the shipped
font's `hmtx` advance widths and `cmap` glyph mapping, not guessed — so at
`96px` it needs **491px**. A 390px phone leaves 343px after the specified 6vw
padding, and no padding at all would fit it inside 390px. Meanwhile `17vw` needs
86.9vw of the 88vw available, so `17vw` fits at every width with 1.1vw of slack.

**Reasoning for the general rule:** where a fixed size floor and a hard
no-clipping requirement collide, the no-clipping requirement wins. A smaller name
is a design decision; a clipped name is a broken page. The floor is kept in the
expression rather than deleted, so it comes back automatically if the string
shortens or the font changes.

**Consequence:** `--text-display` is no longer a `rem` scale. It is a
viewport-driven clamp sized to this one string, which is why it is paired with a
hardcoded `17vw` cap and a comment rather than reused as a general token. At 1440
the name has only 16px of slack, so it must not acquire letter-spacing, and
`white-space: nowrap` is required to keep the period on the line.

**Also changed in the same pass:** the nav is `fixed` rather than `sticky`, so it
takes no flow space and a `min-h-[100svh]` hero is genuinely one screen; hero and
nav both use `px-[6vw]` so they share their left and right edges; the portrait
placeholder lost its dashed outline and its "portrait" caption in favour of a
flat block, so nothing competes with the name.

---

## 20. Rose is an accent only; the large circle is gone — 2026-09-30

**Supersedes:** the "the name is dusty rose" and "one accent circle per room"
rows of the §18.2 rose budget.

**Decision:** The hero name is **cream**; the period after it is dusty rose. The
large flat rose circle is **removed from the hero and from every room**, and "one
accent circle per room" is struck from the rules. Rose is now confined to five
roles: the period, nav scribbles, the active nav mark, handwritten notes, and
doodles.

**Reasoning:** The circle was the single worst thing on the site. At the sizes
the name is now set at, it overlapped the word and hid a letter, and because it
was in DOM order after the name with no z-index it painted *on top* of it. Once
the name spans the full width and layers in front of the portrait, there is
nothing left for a large flat circle to sit behind — it was only ever working
against the name, never for it. Removing it also removes a large area of the one
colour the budget is trying to ration.

**Reasoning for cream:** rose as a 200px foreground was never an accent, it was
a second brand colour competing with the word it was setting. Cream puts the
emphasis back on the writing, and the single rose period keeps one rose moment
in the hero without spending the budget on the whole name.

**Also in this pass:** the name is no longer in a grid column. `col-span-8` meant
the column decided how wide the name could be, and at 390px the column was
narrower than the word — the actual cause of the clipping, not the font size. It
now spans `1 / -1` and the viewport is the only constraint.

**Measured, not assumed.** `Fatimah.` is **5.1121em** in Beth Ellen, measured in
Chrome at four widths and cross-checked against the font's own `hmtx` advance
widths (5.1120em). The specified `clamp(72px, 14vw, 260px)` overflows a 390px
phone by 24.9px, so the floor is capped at `14vw` and honoured above 514px only.
See design-system.md §12.

---

## 21. The hero is three rows, not a grid — 2026-09-30

**Supersedes:** §20's "the name is no longer in a grid column" and the §12
description of a cutout behind the name.

**Decision:** the hero is a flex column of exactly one screen with three sibling
rows — an empty nav slot, the name in a `flex-1` centred row, and a bottom row
pinned with `mt-auto` holding the paragraph left and one photograph right. The
arch placeholder and the tilted taped print are both gone. The nav wordmark is
gone. The photo is a new `HERO_PHOTO` slot, not `PORTRAITS[0]`.

**Reasoning:** grid tracks were the wrong tool. In a grid the rows are sized by
their content and the slack is distributed by `align-content`, so "the name in
the upper-middle, not touching the bottom row" had to be expressed as a guessed
offset that was wrong at 1366×768, where the name's inline box overlapped the
bottom row by 16px. Three sibling flex rows make it structural instead: rows 1
and 3 are fixed by their content, row 3 is pinned to the bottom, so row 2 takes
whatever is left and the name cannot reach either neighbour at any viewport
height. Measured clearance is 80–195px across the five widths.

**Reasoning for the photo being a separate slot:** the hero reused
`PORTRAITS[0]`, so the site opened on the same face it showed one scroll later.
At 200px that reads as a bug, not a motif.

**Reasoning for `-0.04em`:** optical alignment was specified as "the F's leftmost
edge lines up with the left edge of the paragraph". That is the *ink* edge, and
the ink edge is 0.04em inside the F's advance box — measured, not assumed. So the
name is shifted by its own side bearing rather than by a number chosen to look
right. Residual error is within ±0.6px at all five widths.

**The nowrap threshold is arithmetic.** The paragraph measures 632.6px at 17px DM
Sans. Sharing the row with a 200px photo and a 40px gap it needs 872.6px, which is
`0.88 × vw` — so a genuine single line requires a 992px viewport. Rather than let the
instructions ("one single straight line", "nowrap on desktop") produce a broken
layout, the line is held where it is geometrically possible and the text wraps below
that. The copy was not shortened to force it, because that is the user's sentence and
not mine to rewrite.

> This threshold was previously stated as 1373px, from a claimed sentence width of
> 967.6px. That width was wrong — the real figure is 632.6px, or 37.21px per px of
> type — so the threshold was far too high and the copy wrapped on desktop at 1366
> and 1024 where it easily fitted. Recomputed from measurement.

**Still open:** the mobile column (paragraph full width, photo beneath it) is a
deviation from "left: paragraph, right: photo" — in a row at 390px the text runs
to six lines rather than the two or three asked for. Flagged for review.

**Next, not done:** the nav type change (DM Sans, bold, all caps, cream, ~13–14px,
per-item scribbles) from the previous prompt, minus the wordmark. Not started —
the hero was to be reviewed first.

---

## 22. The nav is DM Sans, not Beth Ellen — 2026-09-30

**Decision:** the six nav words and the mobile `rooms` trigger are set in DM
Sans. No size, weight, tracking or case change came with it — this is the font
only.

**Reasoning:** the nav was the last piece of handwriting above a 260px Beth Ellen
signature, at 20px. The same hand twice, one an eighth the size of the other, and
the eye reads the small one as an echo of the large one rather than as
wayfinding. Splitting the two voices does real work: the name is writing, the
rooms are interface.

**Consequence for the handwriting budget.** The nav is now the only part of the
site that is typeset rather than written, which is what makes the rose `Underline`
and the tilts read as an *accent* on the words instead of as the words themselves.
The tilts stay under 2° and the marks stay doodles; that is now load-bearing
rather than decorative.

**Deliberately not done here.** The earlier nav brief also asked for bold, all
caps, cream at 13–14px, `0.08em` tracking, and per-item doodles (Me circle, Work
underline, Writings scribble, Life star, Journal squiggle, Let's talk circle with
tail). Only the typeface was asked for in this pass, so only the typeface
changed. The all-caps exception to the casing rule is **not** documented yet,
because caps aren't implemented — adding the exception before the thing it
excepts would be a rule about nothing.

---

## 23. Nav spacing is one fluid clamp — 2026-09-30

**Decision:** the six words are spaced `clamp(2.25rem, 3.5vw, 4.5rem)` apart
horizontally, replacing `gap-x-7` plus an `lg:gap-x-9` bump. The mobile overlay
got the same treatment vertically, `clamp(2rem, 5vh, 2.75rem)`.

**Measured, before and after:**

| Viewport | Was | Now |
|---|---|---|
| 768 | 28.0px | 36.0px |
| 1024 | 28.0px | 36.0px |
| 1280 | 36.0px | 44.8px |
| 1366 | 36.0px | 47.8px |
| 1440 | 36.0px | 50.4px |
| 1920 | 36.0px | 67.2px |

**Reasoning:** the old values were a single step at the wrong breakpoint. 1280 is
`lg`, so the step was a proxy for "big enough to afford more space" — but the
thing that actually governs the gap is how much room the row has, and that
changes continuously with the viewport. A `clamp` follows it continuously and
takes the breakpoint with it. The words are a set of items rather than a
sentence, so they are now spaced like a set: at 1920 the gaps are 19% of a word's
width, at 768 they are 127%, and both read as a list.

**Why it is safe to open up.** The row is right-aligned on the 6vw line, so
widening the gaps eats space on the *left*, where there is 1020px free at 1920
and 162.8px at 768 — the tightest width, and still comfortable. Verified at
768/1024/1280/1366/1440/1680/1920: six words on one line every time, right edge
on the 6vw line every time, no horizontal scroll.

**Not changed:** the tilts, the rose `Underline`, the overlay's column gap, and
the rest of the nav brief (bold, all caps, cream at 13–14px, `0.08em` tracking,
per-item doodles) are all still outstanding.

---

## 24. Nav links go grey, and the gaps roughly double — 2026-09-30

**Two changes.** The links move from `text-ink` to `text-muted`, and the spacing
goes from `clamp(2.25rem, 3.5vw, 4.5rem)` to `clamp(2.75rem, 6.5vw, 7.5rem)`.

**Measured gaps, before → after:**

| Viewport | Was | Now |
|---|---|---|
| 768 | 36.0 | 49.9 |
| 1024 | 36.0 | 66.6 |
| 1280 | 44.8 | 83.2 |
| 1366 | 47.8 | 88.8 |
| 1440 | 50.4 | 93.6 |
| 1680 | 58.8 | 109.2 |
| 1920 | 67.2 | 120.0 |

**Reasoning for the grey.** `text-ink` is the same cream the hero name is set in.
A 20px cream word directly under a 260px cream word makes the nav a second
headline, and the eye has no way to tell which one it is supposed to read first.
`text-muted` is the existing tone-aware grey, so the fix needed no new colour:
the name is the brightest thing in the top third of the screen, and the nav
recedes. In the paper tone the same token does the same job against charcoal, so
one class covers both and the contrast holds — 7.23:1 in the dark tone, 5.13:1 on
paper, both clearing AA. Worth noting that the cream nav could not have been made
to pass at these sizes without darkening it past legibility, so the grey is doing
the accessibility work as well as the hierarchy work.

**Reasoning for the spacing.** The words are a set of nav items, not a sentence,
and at 36px they were set closer together than a single word is wide, which made
the row read as a run of text. At 120px on a 1920 screen the gaps are larger than
the words themselves, which reads as a list. 768 is the binding constraint — only
93.3px of slack remains there — so 768 is what caps the fluid value, not the
other way round. Verified one line at all seven widths, right edge on the 6vw
line at all seven, no horizontal scroll.

**Still open from the nav brief:** bold, all caps, 13–14px, `0.08em` tracking,
and the per-item doodles (Me circle, Work underline, Writings scribble, Life
star, Journal squiggle, Let's talk circle with tail). The all-caps exception to
the casing rule is still not documented, because caps still aren't implemented.

## 25. The name sits directly above the sub text, and the gap is measured in ink — 2026-09-30

**The request.** Move `Fatimah.` directly above the sub text, and make it a bit
smaller. Two things were already true and stayed true: the name is bottom-anchored
with the paragraph rather than floating in the upper-middle, and the photograph
stands to the right of both.

**The name and the paragraph became one column.** They were siblings in a single
bottom row with `items-end`. That sounds equivalent and is not: the photograph is
250px tall and the pair is not, so `items-end` pushed the paragraph down to the
photograph's baseline and left the name **246px** above it — a name attached to the
photograph, not to the text it introduces. Measured, not estimated: with the name
as a sibling the gap from the name's box to the paragraph's was 246.4px at 1920 and
218.8px at 1440. Wrapping them in one `min-w-0 md:flex-1` column makes "directly
above" mean 28px at every width, and the paragraph's left edge still lands on the
same line as the name's ink.

**Smaller: 14vw → 11vw, cap 260 → 215.** Not a matter of taste. The name now shares
a horizontal band with the photograph, so it has to clear 200px of photo plus a 40px
gap, not just the margins. The largest size that still clears is 85.9px at 768,
130.3px at 1024 and 285.8px at 1920; 11vw sits under that ceiling at every width
where the photo is beside it. It is a 19–21% reduction, which is more than "a bit"
in the abstract — it is the number the constraint produces.

### The gap: margins are boxes, the eye is ink

The name's margin is a flat **43px**. It is flat because the thing it has to clear is
not a constant, and two font facts push in opposite directions:

- **The name does have ink below its baseline**, so its lowest painted pixel is *not*
  its baseline. A per-glyph canvas scan at 211.2px of type, in the real webfont, gives
  the ink below the baseline as: `t` **18px**, `m` 10px, `a` 8px, `h` 6px, `i` 5px,
  and the **`F` and the period exactly 0**. The `t` is the deepest at every size —
  **0.085em** of the type, consistently from 211.2px down to 42.9px — because of the
  tail on its crossbar stroke. The brief attributed this to the F's bottom swash; the
  F has none. The measurement lands in the same place either way, but the reason is
  the `t`.
- **DM Sans's ascenders rise above the paragraph's line box** (7px at 16–17px type),
  so its first line starts higher than its box does.

Together: **visible air = margin + ascender offset − swash**, and because the swash is
0.085em of the *name's* size it grows with the viewport. A constant only needs to
clear the largest swash to hold a floor, so 43px buys **35 / 37 / 37 / 40 / 46px** of
real ink-to-ink air across 1920 / 1440 / 1366 / 1024 / 390 — every one above the 32px
brief. Getting here took two steps: `1.75rem - 7px` gave 28.0px of air and read too
tight under a 211px name, then `2.25rem - 7px` gave a baseline-to-ink 36.5px that
*looked* flat across all five widths — and was flat only because it measured to the
wrong thing. The block is bottom-anchored, so nothing about the name's own metrics
changed with the viewport; only the paragraph's ascenders did.

### Three wrong measurements, recorded so they are not repeated

1. **A screenshot pixel scan said the overhang was 0.14em.** It was not. Scanning
   the rendered PNG for cream pixels to find the name's ink bottom also caught the
   name's *antialiased edges*, which sit within tolerance of the paragraph's grey —
   and the bounding box of "pixels near grey" is the name's whole shape. That
   produced a fictitious 0.14em and an `em`-based margin.
2. **A margin sweep said 1px of margin moved the gap 0.3px.** Also wrong, and
   backwards: for a bottom-anchored block the relation is 1:1, because adding margin
   grows the block upward while the bottom line stays pinned.
3. **"Fatimah." was assumed to have no descender**, on the reasonable grounds that it
   contains no `g`, `j`, `p`, `q` or `y`. It is true of the F and the period and false
   of the `t`. The consequence was a 36.5px "flat air" figure that was really
   baseline-to-ink and drifted by up to 18px in the opposite direction from what was
   reported. A baseline anchor cannot detect this class of error at all, because it
   assumes what it is trying to check.

The reliable read is to measure **one glyph alone** on a canvas and scan for its
lowest painted pixel — no antialiasing ambiguity, no assumption about which letter
owns the extremity. That is what identified the `t`.

**Verified** at 1920×1000, 1440×900, 1366×768, 1024×800 and 390×844: name
211.2 / 158.4 / 150.3 / 112.6 / 42.9px; paragraph 24.66 / 18.50 / 17.55 / 17.00 /
16.00px, one line at every desktop width and two at 390; F ink within +0.67px of the
paragraph's left edge; **real ink-to-ink air 35 / 37 / 37 / 40 / 46px**; contrast
**9.33:1** sampled from screenshot pixels against the painted backdrop; bottom padding
`max(7vh, 48px)` at all five; one screen and no horizontal scroll everywhere.

**Resolved 2026-10-01: the photograph renders.** `Opening` now draws it as the
second child of the bottom row: `shrink-0`, 4:5, 200px wide from `md` and 140px
below, `self-end` so it takes the right 6vw edge on mobile where the row is a
column. With no `HERO_PHOTO.src` it is a flat `tone-paper` block at the same size,
`aria-hidden`, so nothing moves when the photograph arrives. Checked in headless
Chrome at 1920, 1440, 1024 and a true 390px viewport: 200×250 / 140×175, right edge
on the nav's 6vw line, bottom edge on the paragraph's last line, paragraph still
one line at every desktop width. (Headless Chrome enforces a minimum window width,
so a plain `--window-size=390` screenshot is laid out wider and cropped. Use an
iframe for phone widths.)

The original note follows for the record.

**Open defect, carried forward not papered over: the photograph does not render.**
`OpeningProps.photo` is accepted and `App.tsx` passes it, but there is no photo
element in the JSX and no placeholder. Earlier entries in this log asserting a 4:5
photo at 200×250 / 140×175 "on the 6vw edge" were not reproducible from the DOM and
have been struck. The name's size and horizontal alignment are unchanged, but because
the block is bottom-anchored, raising the margin and the bottom padding necessarily
moves the name's vertical position with them.

**Left for review.** The air above the name is now very large — 508px at 1920,
348px at 390 — because the block is pinned to the bottom line and all the slack
lands there. That is the honest consequence of "directly above" plus a bottom-anchored
block. If it reads as too empty, the fix is to centre the block rather than to
push the paragraph away from its own name again.

---

## 26. Redesign: Black Champagne, three faces, ME after GlamToProfit — 2026-10-01

**Supersedes:** the palette in §6–§7 and §18.2's rose, the two-voice type rule in
§16 and §22, and the ME layout in §18.4. Copy, the six rooms, the nav structure
and the React structure are unchanged.

### 26.1 Palette

**Decision:** "Black Champagne", palette #10 from the dark-feminine sheet
(`~/Downloads/_.jpeg`): `#0E0B0B` noir, `#2B1B1B` cocoa, `#5B3A3A` wine,
`#876A6A` mauve, `#CDB8A6` champagne, plus a derived cream `#F4EDE4` for the light
rooms. Mauve is the single accent and is the same value in both tones.

**Reasoning:** The ME reference is cream and gold. Of the sixteen palettes, this is
the only one whose light end is that champagne, so ME sits inside the palette
rather than beside it. It is also the quietest — it reads as expensive, not pink.

**Consequence:** Mauve is 4.0:1 on noir and 4.2:1 on cream — under AA for body
text. It is restricted to large type, marks, doodles and 18px+ italic notes. Pill
hover changes the border, not the text.

**Consequence:** Cream is derived, not in the palette: champagne is too dark to be
a ground (wine on champagne would be the only muted pair, and champagne itself is
only 1.6:1 against cream as a rule — correct for a hairline, wrong for a ground).

### 26.2 Type: Fraunces, Jost, Mrs Saint Delafield

**Decision:** Three faces with one job each. Fraunces (SOFT 50) for the hero name
and headings, its italic for small notes; Jost for everything read; Mrs Saint
Delafield as the only handwriting, used large across a heading, once per room.
Beth Ellen and DM Sans are retired.

**Reasoning:** Fatimah leaned towards Fraunces, wanted to keep a handwritten feel
alongside an editorial-fashion register, and asked for as few fonts as possible,
all harmonised. A signature script only reads above ~32px, so small notes go to
Fraunces italic rather than a fourth face — its calligraphic italic reads as the
same hand. Jost's geometry matches the wide-tracked caps in the ME reference.

**Measured** (Chrome, webfonts confirmed loaded): `Fatimah.` in Fraunces advances
3.358em, F left side bearing 0.035em, ink below baseline 0.005em. The hero name is
`clamp(64px, 14vw, 270px)` at -0.02em; the photo no longer limits the size. The
sub line in Jost is 34.86px per px of type → `clamp(17px, 1.09vw, 26px)` for 85% of
the name, nowrap from 946px. The §25 Beth Ellen measurements no longer apply.

### 26.3 Tones flip

ME is cream, after its reference. The alternation flips to match: hero dark, ME
cream, WORK dark, WRITINGS cream, LIFE dark, JOURNAL cream, LET'S TALK dark.

### 26.4 ME layout

After the GlamToProfit "about me." page (`~/Downloads/Meet The Beauty
Strategist…jpeg`): full-height 3:5 portrait on the left standing on a full-width
hairline; a vertical hairline at the left margin; on the right, `A little about
me.` in large Fraunces with a mauve full stop, `where I come from` in the script
across its lower edge, a 60% hairline, then the prose in Jost. Under the hairline,
a tracked strip — `SOFTWARE. ✦ PRODUCT. ✦ FAITH.` — **placeholder copy, awaiting
Fatimah's sign-off**. The facts follow as unlabelled hairline rows, then skills
and CV pills. The second portrait and the `more than my work` aside are dropped
from the layout; their data is unchanged.

### 26.5 Fixed along the way

- `NavMark`'s `<svg>` had no `fill="none"`, so the closed ME ellipse painted solid
  black. Invisible on the old charcoal, a black blob on cream.
- The CV pill rendered `&NEARR;` literally — JSX does not know that entity name.
  It is now the `↗` character.

### 26.6 Open

- Layouts for WORK, WRITINGS, LIFE, JOURNAL and LET'S TALK: one reference per room,
  supplied when that room is built. The hero keeps its current layout until then.
- The ME strip's three words.

---

## 27. The hero gets a personality: word, cut-out, signature — 2026-10-01

**Supersedes:** the hero layout in §18.3, §21 and §25, and the hero sizing in §26.2.

**Decision:** After the digital-creator pitch kit (`~/Downloads/Digital Creator
Pitch Kit Templates for Canva Portfolios.jpeg`). Four layers in one screen:

1. `PORTFOLIO` in Fraunces 900 (SOFT 100, opsz 144, -0.03em), mauve, ~88vw wide,
   `aria-hidden` — it is texture. The word is a constant in `Opening.tsx`.
2. A cut-out portrait, 4:5, bottom-anchored and centred, 86svh tall, so the head
   rises into the word's lower half. A silhouette stands in until the PNG exists.
3. `Fatimah.` in Mrs Saint Delafield, cream, rotated -7°, across the word's lower
   left — the page's `h1`, and above the portrait so it is never covered.
4. `SOFTWARE ENGINEER.` and `PRODUCT BUILDER.` in the bottom corners in Jost caps,
   the faith line in Fraunces italic under the first, and one mauve `TinyStar`.

**Reasoning:** Fatimah wanted more personality and her name in handwriting. The
reference supplies the structure — a big printed word with a person stepping
through it — and the signature makes it hers: the reference's script is a small
tag, here it is the name, so it is set large.

**Measured:** `PORTFOLIO` at Fraunces 900 is 5.74em → `clamp(52px, 15.3vw, 300px)`;
`Fatimah.` in the script is 2.41em → `clamp(72px, 11vw, 220px)`. No horizontal
scroll at 1920, 1440, 1024 or 390.

**Consequence:** The copy is unchanged but split: the hero line's three sentences
now sit in the two corners. The Fraunces link now loads weights to 900.

**Open:** the cut-out PNG (`HERO_PHOTO.src`). On a phone the word is ~49px tall
and the silhouette's head sits just below it rather than in it; judge again with
the real photograph, whose head position will differ.

---

## 28. The name is the big word; the script becomes a tag — 2026-10-01

**Supersedes:** §27's word and signature.

**Decision:** The printed word is now `FATIMAH.` — Fraunces 900, mauve, ~88vw, and
the page's `h1` — with its full stop in cream (the word is already the accent, so
the stop inverts). The handwriting shrinks to a tag, `software engineer`, in Mrs
Saint Delafield at `clamp(32px, 3.6vw, 68px)`, hung just under the name's lower
left like the reference's "content creator". The `SOFTWARE ENGINEER.` /
`PRODUCT BUILDER.` corner labels are removed; the faith line stays, bottom left.

**Reasoning:** Fatimah wanted the name as the big word and the script smaller and
saying something else. The tag sits *under* the letters rather than across them:
cream script over mauve ink was unreadable in the first pass.

**Measured:** `FATIMAH.` is 4.87em → `clamp(64px, 18vw, 340px)`; the tag is 4.49em,
~230px at 1440. No horizontal scroll at 1920, 1440, 1024 or 390.

**Open:** the tag wording — `software engineer` for now, `problem solver` was also
floated. It is `HERO_TAG` in `Opening.tsx`.

---

## 29. The hero name goes back to Beth Ellen — 2026-10-01

**Supersedes:** §27–§28's printed word, and the Mrs Saint Delafield choice in §26.2.

**Decision:** No printed word. `Fatimah.` in Beth Ellen, cream with a mauve full
stop, `clamp(60px, 15.6vw, 300px)` (~80% of the width), centred across the top as
the `h1`. The cut-out portrait stands in front of it, covering the lower middle of
the name. `SOFTWARE ENGINEER` sits under the name's right end in Jost caps,
champagne, 0.24em tracking. The faith line and the star stay.

Beth Ellen **replaces** Mrs Saint Delafield site-wide — ME's `where I come from`
overlay included, at `clamp(22px, 2vw, 36px)` — so the system stays at three faces:
Fraunces, Jost, Beth Ellen.

**Reasoning:** Something on the page "looked off". Five variants were rendered side
by side (`/tmp/cmp.png`): Fraunces 900, which read as a retro Cooper-Black poster
and was the culprit; Anton; Jost 800; Anton with a Beth Ellen tag; and Beth Ellen
alone. Fatimah chose Beth Ellen — the most personal, and the hand her site started
in.

**Measured:** Beth Ellen `Fatimah.` is 5.112em (§25). No horizontal scroll at 1920,
1440, 1024 or 390. The tag clears the name's ink with a 12px gap at every width.

**Amended 2026-10-02:** the portrait no longer covers the name — it hid the `im`.
The name moves down to `max(22svh, 120px)`, and the portrait's height is now
derived from the name (`.hero-portrait` in style.css) so the crown of the head
lands 12px under the name's lowest ink at every width. The trade-off: on very
wide screens, where the name is largest, the figure is correspondingly smaller.

**Amended again 2026-10-02:** more air under the nav. `--hero-top` is now
`max(27svh, 150px)` and the name is `clamp(58px, 14.5vw, 280px)` (~74% of the
width), slightly smaller so the portrait keeps its height. Clear air from the nav
to the top of the F's flourish: ~150px at 1440×900, ~165px at 390×844.

---

## 30. One nav mark for every word — 2026-10-02

**Supersedes:** the per-room marks (circle, spark, wave, speech-tail) in `NavMark`
and the `mark` field on `RoomMeta`.

**Decision:** Every nav word shares one hand-drawn mauve underline, full word
width, stroke 2.5. Hover and focus wipe it in left to right (0.45s, the doodle
easing) and wipe it out on leave; the word goes 70% → 100%. The current room's
line is simply shown — it cross-fades between rooms and does not redraw when
hovered.

**Reasoning:** Fatimah found the hover inconsistent: six different shapes in six
different positions made running the mouse along the nav feel arbitrary. The hand
stays in the stroke; it is the same hand each time.

**Fixed along the way:**
- The old dash-draw never completed. The nav path is stretched with
  `vector-effect: non-scaling-stroke`, and Chrome measures dashes on such a path
  in screen pixels, not `pathLength` units, so every mark drew a fixed ~20px stub.
  The reveal is now a `clip-path` wipe on the wrapper, independent of the path.
- Under `prefers-reduced-motion` the old CSS set every mark to opacity 1, so all
  six words were marked at once. Reduced motion now only removes the transition.

**Verification note:** headless Chrome screenshots taken right after a hover can
show a stale mid-transition frame. Forcing two `requestAnimationFrame`s before the
capture, or emulating reduced motion, shows the true state: full width.

---

## 31. The hero portrait — 2026-10-02

**Decision:** `src/assets/hero-portrait.png` — Fatimah's studio portrait
(`~/Downloads/potrait-studio.png`, 1122×1402, 4:5) with the backdrop removed by
macOS Vision subject lifting (`VNGenerateForegroundInstanceMaskRequest`): a mask
only, no pixel regenerated, so the face is exactly the photograph. Wired through
`HERO_PHOTO.src` in `data/me.ts`.

**Placement:** the crown of the hair sits 7.5% down the frame, so the portrait box
is `(100svh − crown) / 0.925` tall with the crown at 0.85em below the name's top —
the hair tucks a quarter of the way up behind the feet of `im` and stops. The
name stays readable at 1920, 1440, 1024 and 390.

**Edges:** the frame is cropped at the shoulders, which on desktop read as a pasted
rectangle. A CSS mask fades the sides over their outer 14% and the bottom over its
last 22%; on a phone the bottom fade also keeps the faith line legible over the
jacket. Display only — the file is untouched.

**Rejected:** `~/Downloads/potrait.png` — opaque white background and 447×558, too
soft at hero size.

**Open:**
- Weight: the PNG is 2.37MB. Convert to WebP with alpha in the Phase 11 pass.
- On very wide screens the figure is modest beside a 280px name; if it should be
  bigger, shrink the name rather than let the hair climb further into it.
- The red blazer is the most saturated colour on the site, outside the palette by
  design — it is a photograph, and photographs are not recoloured (§8).

---

## 32. The portrait travels from the hero into ME — 2026-10-02

**Decision:** One photograph, two homes. `TravellingPortrait.tsx` lifts the hero
cut-out out of `[data-portrait-from]` and carries it, scroll-linked, into ME's photo
slot `[data-portrait-to]`. Progress runs from the top of the page to the moment ME's
top reaches the viewport top, eased in-out. On the way it shrinks and drifts left,
tilts up to −4° mid-flight and lands square; the edge fade relaxes to zero and the
original studio frame (`src/assets/me-portrait.jpg`, JPEG 85, 476KB) crossfades in
over the cut-out, so the backdrop "develops" back and it arrives in the cream room as
a print rather than a sticker.

**Reasoning:** Fatimah wanted the hero picture to end up in About Me, and asked for it
to be "cool". Moving the same image keeps a single face on the page rather than
showing it twice, and the develop-into-a-print beat explains why the photo looks
different in the two rooms.

**How it stays exact:** the cut-out is a Vision mask of the same 1122×1402 frame, so
the two layers align pixel for pixel. The traveller is positioned against the
document, not `fixed`; because its document position moves by about as much as the
page scrolls, it appears to hold still on screen while the hero slides away.
Verified to the pixel at both ends at 1440×900 and 390×844.

**Fallbacks:** each slot keeps its own static `<img>`; the traveller hides them only
after it has measured both slots (`.portrait-travel` on `<html>`). Reduced motion, no
JS or an error leave the static images in place. The traveller is `aria-hidden`; the
static images carry the alt text.

**Consequences:** ME's portrait slot is now 4:5 (the photograph's ratio) rather than
3:5, and is a plain frame rather than `Photo` + `Reveal`, both of which animate and
would move the slot while it is being measured. The ME `where I come from` overlay
is `nowrap` — Beth Ellen is wider than the script it replaced and wrapped on phones.
The ME portrait is no longer "a different frame" from the hero; that rule from §25's
era is retired.

---

## 33. ME portrait: a cut-out in a cocoa arch — 2026-10-02

**Supersedes:** §32's develop-into-a-print crossfade and `me-portrait.jpg`
(deleted).

**Decision:** ME shows the same cut-out as the hero, standing at the bottom of a
cocoa (`#2B1B1B`) arch that is wider than the photograph. The photo's cropped sides
fade into the arch (outer 14%), the bottom does not fade — the figure stands on the
room's hairline — and the head and curls break out over the arch's top onto cream.
The travelling portrait stays a cut-out the whole way: its bottom fade dissolves as
it lands (`--fade-y` 1 → 0), and the arch fades and rises 28px into place over the
second half of the journey (`--portrait-arrive`), so it meets her rather than sitting
empty.

**Reasoning:** Fatimah wanted the About Me photo cut out too. Plain on cream, the
Vision mask's soft outer contour — studio backdrop still caught in the curls — reads
as a dark outline, and the shoulder crop shows as two straight vertical edges. Eight
treatments were mocked up (`/tmp/opt*.png`); the wide cocoa arch hides both: cocoa
is nearest the backdrop colour, so the curl edge vanishes into it, and the sides
fade into it the way the hero fades into noir. Mauve made the faded jacket hazy.

**Geometry:** frame `aspect-[540/525]`, arch from 23% down, landing slot 4:5 at 78%
of the frame width, centred. Verified to the pixel at both ends of the journey at
1440×900 and 390×844.

**Reverted 2026-10-02.** Fatimah preferred §32. The cocoa arch is removed, the
travelling portrait crossfades back into the studio print again, and
`me-portrait.jpg` is re-created from `~/Downloads/potrait-studio.png` (JPEG 85). §32
stands as written; this section is kept only as the record of what was tried.

---

## 34. A hand-drawn ♫ after the faith line — 2026-10-02

`MusicNote` joins the doodle library (now nine): two beamed notes, struck not
filled, mauve, 26px, tilted −10°, drawn on 900ms after the line fades in. It sits
after "love." inside a `nowrap` span so it never wraps onto a line by itself. The
line is a lyric; the note says so without a citation. On a phone it sits over the
portrait, where thin mauve is quieter than on noir.

**Amended 2026-10-02:** the doodle moves to the *start* of the line, before
"Grounded", and is redrawn to read as a margin doodle rather than a glyph: a ♪ and
a rising beamed ♫, heads that loop back through themselves, a doubled beam and four
flicks of sound; 58px, −12°, stroke 2.4, drawn on stroke by stroke from 300ms.

## 35. The hero tag types itself — 2026-10-02

`SOFTWARE ENGINEER` is typed out once by `Typewriter` (primitives), starting 1.5s in
— after the name has written itself on — at ~75ms a character with a stable jitter
and a longer beat after the space. Every character is laid out from the start (the
untyped ones transparent) and the caret is zero-width, so the right-aligned tag
never shifts while it types. The caret blinks three times when done and goes; it
does not loop. Screen readers get the whole phrase from the first frame (`sr-only`);
reduced motion shows it complete.

**Amended again 2026-10-02:** back to a *single* quaver (♪), after "love." — the
scribbled head, leaning stem and curling flag kept, the ♫ dropped, two small flicks
of sound off the flag. 20px wide, +10°, hung slightly low so the flag clears the
line above at every width.

---

## 36. Responsive pass — 2026-10-02

Audited at 320×568, 360×740, 375×667, 414×896, 844×390 (landscape phone),
768×1024, 820×1180, 1024×768, 1180×820, 1280×720, 1366×768, 1536×864 and
2560×1440, with mobile emulation on for phones.

**Fixed:**
- **Phones laid out wider than the screen.** The travelling portrait starts scaled
  wider than a phone and sits outside every room, so it stretched the layout
  viewport: a 320px phone laid out at 391px and `menu` sat off the edge. The page
  is now wrapped in `relative overflow-x-clip` (clip, not hidden — no scroll
  container, so the fixed nav is unaffected), which is also the traveller's
  positioning box.
- **Large screens stopped scaling at laptop size.** The hero name cap rises to
  400px, the nav's size, gap and top padding, the tag, the faith line (now
  `max-w-[14em]`), the ♪ and the star all scale fluidly; ME's heading caps at
  11rem and its prose, facts rows, strip and pills now scale with the viewport.
- **Short landscape screens.** The hero name is also held to 26svh, so at 844×390
  it no longer eats the height the portrait needs; `--hero-top` floor drops to
  112px.
- **ME went two-column too early.** At 768–1023 the portrait got a narrow column
  and read as a thumbnail. ME now stacks below 1024 (`lg`), with the portrait
  capped at `min(26rem, 64svh)` so it fits a landscape phone's height.

**Verified:** no horizontal scroll and `layout width = device width` at every size;
the traveller lands within 2px of its slot everywhere.

---

## 37. ME heading: "About me." — 2026-10-02

**Supersedes:** "A little about me" as the heading (brand-direction §ME, which also
supplies the prose — the prose is unchanged and still verbatim).

**Decision:** `About` / `me.` on two lines in Fraunces, mauve full stop, as in the
GlamToProfit reference. The shorter words take a larger size —
`clamp(4.25rem, 10vw, 14rem)`, leading 0.88 — so the block is bolder rather than
emptier. `where I come from` now hangs from 12% into the heading and runs right; it
was right-anchored, and because "About" is narrower than the handwritten line it
pushed 35px off the left edge of a 320px phone.

**Reasoning:** Fatimah wanted a better title than "A little about me"; "About me."
is shorter, more confident, and matches the room's layout reference.

**Amended 2026-10-02:** the handwritten line is now `the short version`, not
`where I come from` — which read as a hometown, while the prose is about who
Fatimah is. Updated in `data/rooms.ts` (ME's `note`) and `rooms/Me.tsx`.

---

## 38. Typing on every visit, and a note that keeps time — 2026-10-03

**Relaxes** design-system.md §8's "once, no loop" for three elements, at Fatimah's
request.

- **`Typewriter` types on view and retypes on every return** (`replay`, default
  on). An IntersectionObserver at 0.6 starts it; leaving resets it, so a return
  types from scratch. First view waits `delay`, later views `returnDelay` (300ms),
  because the hero name's write-on doesn't replay. Text stays laid out (no shift),
  full text is `sr-only` throughout, reduced motion shows it complete.
- **"the short version"** in ME is now typed, not faded (`delay` 1100ms so the
  heading is mostly written first, 85ms a character).
- **The ♪ plays.** `MusicNote playing`: after the draw-on, the body bops on a
  ~92 bpm beat pivoting on the head, with a bigger bop every second beat, and three
  sound flicks flash out on each hit. The beat animates `<g>` groups so it never
  fights the per-path draw-on. Paused while the hero is off screen
  (`data-offscreen` on #opening); none for reduced motion.

---

## 39. The nav floats once you scroll — 2026-10-03

**Supersedes:** hide-on-scroll-down / show-on-scroll-up, and "no background" for
the scrolled state.

At the very top (≤40px of scroll) the nav is unchanged: bare words over the hero.
Past that it stays fixed and floats as a pill — the room's own `bg-surface` at 80%,
`backdrop-blur-md`, a hairline ring and a soft shadow, inset to 4vw — with an `F.`
(Beth Ellen, mauve full stop) home link on its left. Padding, background and shadow
transition in on the same element, so nothing jumps. Mobile gets the same pill
around `F.` + `menu`.

**Reasoning:** Fatimah wanted the nav "sticky or fixed or somewhat better". The
bare words had no background, so when they came back on scroll-up they sat directly
on ME's paragraphs (visible in the §36 audit). The pill keeps them legible over any
content while still taking the room's colour, and keeping it always visible means
the rooms are one tap away.

---

## 40. ME copy, in Fatimah's words — 2026-10-03

**Supersedes** the brand-direction §ME prose. `ME_PROSE` is now Fatimah's own text,
verbatim (curly apostrophes, British "realise"): the LEGO paragraph, "a lot more
work than LEGO", software and AI changing, building character. The first line —
"Software engineer by training. Product builder. Curious about what else I can
create." — is set as a lede in Fraunces at 1.3em; the rest stay Jost paragraphs.

**Open:** the strip under the room still reads SOFTWARE ✦ PRODUCT ✦ FAITH; faith is
no longer in this copy, so the third word may want to change.


---

## 41. ME is who she is, WORK is what she has done — 2026-10-03

Experience, education, skills and the CV moved from the bottom of ME into WORK
(`src/rooms/Work.tsx`, the first real WORK room). ME now ends on its strip.

WORK reads as pages of a publication rather than cards: each section is a hairline
row with a small tracked label in a narrow left column and content off-centre to
the right — **Selected work → Experience → Education → Skills**. Roles and
qualifications are Fraunces with the organisation beneath in Jost. The CV is a
small utility link under the skills ("The whole thing on one page — download my
CV ↗"), not a pill or a headline.

**Selected work** is a handwritten "being written up — back soon" until project
content arrives. Projects will include idea-stage and team work, labelled honestly:
a stage pill (IDEA / PROTOTYPE / PITCHED / PILOT / SHIPPED) and Fatimah's own role
("In a team of 4, I led…"). Professional work (PCES, SMS Gateway) is in, described
generically where confidentiality applies.

**Open:** the room title still uses the generic `Room` heading, which sits on a
narrower container than the sections; it gets the editorial treatment with the
projects. Nav restructure (ME / WORK / WRITING + a "Now" section) and the hero
intro lines are awaiting Fatimah's call.

---

## 42. Five rooms: ME · WORK · WRITING · LIFE · LET'S TALK — 2026-10-03

The separate JOURNAL room is gone. Journal-style notes belong in WRITING, and a
short "Now" (building, learning, AI) will live in ME. LIFE is the photo room — lots
of candid photographs, scrapbook-style, small handwritten captions. WRITINGS is now
WRITING (id `writing`). Tones still alternate: LET'S TALK moves to paper.

LIFE may become "Journal" if the photos arrive as a visual diary (dates and a note
each) — Fatimah was torn; it is a one-word change in `data/rooms.ts`.

Unbuilt rooms say "coming soon" instead of "built in Phase N".

---

## 43. ME's tagline strip removed — 2026-10-04

`SOFTWARE. ✦ PRODUCT. ✦ FAITH.` is gone. Fatimah said it looked "very AI-ish", and
it did: a three-word tagline with sparkle separators is a stock pattern of
generated templates, any wording in that slot would read the same way, and it was
placeholder copy anyway. ME now ends on the full-width hairline the portrait stands
on, then breathing room before WORK. No doodle replaces it — "the short version" is
the room's one piece of handwriting. Closes the §40 open item about FAITH.

---

## 44. ME type scaled down a step — 2026-10-04

Fatimah felt ME's type was too big and "something looks off". The heading was
144px at 1440 against 18px prose — an 8:1 jump that made the room lurch. Now:
heading `clamp(3.5rem, 7vw, 9.5rem)` (101px at 1440, 56px on a phone, 152px at
2560), handwriting `clamp(1.25rem, 1.6vw, 2.25rem)`, prose
`clamp(16px, 0.4rem + 0.5vw, 21px)` at leading 1.7 and a 34em measure, lede 1.2em.

---

## 45. WORK, after two slide-deck portfolios — 2026-10-04

**References:** a dark UGC-creator portfolio deck (heavy condensed caps with a script
word across them, "PROJECT 01" collages, "LET'S work TOGETHER") and a cream
editorial portfolio template (thin running mastheads with N°, "EXPÉRIENCE" as dated
rows, skills in labelled columns). Both in Fatimah's Downloads, 2026-10-04.

**Decision:** every part of WORK is a page.
- **Masthead** on each page: `FATIMAH — WORK — 2026 — N°02` (N°03 Experience, N°04
  Education, N°05 Skills), Jost 600 caps on a hairline.
- **Title** `SELECTED / WORK.` in Jost 800 caps (Jost 700/800 now loaded), with
  "things I've actually built" typed in Beth Ellen across its foot; its own line on
  phones, where it was wider than the heading and ran off-screen. A short honest
  intro beside it.
- **Projects** from `src/data/work.ts` as numbered spreads: a three-frame collage
  (tinted cocoa / wine / mauve until images arrive, "image to come") with a giant
  `01` on it, and the story beside — context, stage pill, title in heavy caps,
  Fraunces summary, role, "what I did" list, outcome, stack. Alternating sides.
  Every field past `title` is optional. Entries still on brand-brief one-liners
  carry `placeholder: true` and say "the full story is being written" in the hand.
- **Experience / Education** as `period | role over org` rows; **Skills** in four
  labelled columns (`SKILL_GROUPS` in data/me.ts); the **CV** as a plain cream
  rectangle button, as in the reference's "Explore Now".

Heavy Jost caps are WORK's display face — the professional room reads as *set*,
where ME reads as *written* in Fraunces.

**Open:** real content and images for each project; Omaya Care's stage; whether
MEST builds stay one entry or become a list of their own.

---

## 46. WORK filled from the CV and "From Comeasy to Omaya" — 2026-10-04

Sources: Fatimah's CV (Google Drive, the same file `CV_URL` already linked) and her
Medium post "From Comeasy to Omaya" (10 Aug 2026, read via her public RSS feed —
medium.com returns 403 to direct fetches). Nothing goes beyond what they say.

**Projects** (`data/work.ts`), in order:
1. **Omaya Care** — MEST → incubation, MVP, Product Lead in a team of four; four
   things she does; Ghana AI Summit Award 2026; aside "my baby. my heartbeat."
2. **Banking software** — PCES, shipped; pensioner payment automation, teller app,
   card management, bank bot, leading delivery; .NET / C# / Next.js / SQL.
3. **Visbl** — MEST, prototype; market research with traders; WhatsApp build on
   FastAPI, Meta Cloud API, PostgreSQL, Claude Vision; paused, "one I would like to
   come back to".
4. **Comeasy** — MEST, validated; rush-hour commuting for corporate workers;
   "maybe in a different form".

Fatimah wants to keep working on Visbl (and "Deymove"), so those outcomes say so.
`Stage` gains `Validated` and `MVP`. Each project can carry an `aside` — a line in
her own words from the article, set in Beth Ellen.

**Removed:** the SMS Gateway entry (brand brief only; not on the CV) and the
generic "A build a month" entry, now replaced by real builds. Relay is in the
article but lasted two weeks; left out of WORK.

**Experience / education / skills** now follow the CV: Omaya Care (Product Lead,
Sept 2026–now), MEST Africa (Entrepreneur in Training, Jan–Aug 2026), PCES (Nov
2022–Dec 2025, National Service folded in), Nokwary (intern, May–Aug 2021);
bootcamp moved to education with AZ-900 added; skills regrouped as Languages /
Build / Engineering / Product.

**Open:** what Deymove is; whether SMS Gateway belongs anywhere; images.

**Amended 2026-10-04:** Omaya's "my baby. my heartbeat." aside removed — Fatimah
felt it overstated. Comeasy is now **Deymove** ("MEST · started as Comeasy"), with
the outcome saying she'd like to come back to it. SMS Gateway and Relay stay out.

---

## 47. WORK spreads: a stamp and credits instead of labels — 2026-10-04

Fatimah found the project text flat and asked whether "MVP" was necessary. It
wasn't — startup jargon — and the "Project 01 ·" prefix repeated the giant number on
the collage. Each spread is now: context kicker, heavy-caps title, one Fraunces
line, then **credit rows** (ROLE / NOW / STACK, only those that exist) like a
record sleeve. How far it got is said once, as an **ink stamp** on the collage's big
frame — `Ghana AI Summit Award · 2026`, `In production`, `Paused` — using the
`Stamp` primitive, champagne on a blurred surface. `stage` and `outcome` are gone
from `data/work.ts`; `stamp` and `now` replace them. The WORK copy is otherwise one
line per project; the detail lives in the CV.

---

## 48. WORK: friendlier stamps, skills not stack, and "at a glance" — 2026-10-04

- **Stamps:** "In production" → **Shipped**; "Paused" → **To be continued…** (Visbl,
  Deymove), which also says she'd like to come back to them, so the "now" line went.
- **Spreads:** no tech stack. Each project has a few small skill pills — what the
  work took (Omaya: user research, product strategy, care workflows, AI voice &
  WhatsApp) — and her part as a handwritten margin note with a small arrow ("my
  part: product lead, team of four"; "my first idea at MEST").
- **Experience / Education / Skills pages → one "At a glance" page (N°03):** three
  first-look facts under handwritten labels — *now* (Product Lead, Omaya Care),
  *before* (Software Developer, PCES), *studied* (BSc Mathematical Sciences, UG) —
  then the cream CV button with "← the rest is in here" in the hand beside it.
  The full history is the CV's job. `SKILL_GROUPS` and the other EXPERIENCE /
  EDUCATION rows stay in data/me.ts, unused by WORK for now.

---

## 49. WORK motion — 2026-10-04

Fatimah asked for "nice cool animations". Each project spread now assembles as it
scrolls in: the three collage frames drop in staggered and settle; the big number
rises out of a mask; the title rises, the line fades up, the skill pills pop in
one by one; the stamp is **pressed on** (arrives at 2.2×, thunks past its size,
settles) at 900ms; the handwritten role note writes itself on left to right. In
Chrome/Edge the frames also drift at different speeds while scrolling
(`animation-timeline: view()`), so the collage has depth; elsewhere they hold
still. "At a glance" staggers its three facts up, writes their handwritten labels
on, then brings in the CV.

All in CSS under `prefers-reduced-motion: no-preference` ("WORK motion" in
style.css), triggered by the existing `Reveal` `.is-visible`. Only `translate` /
`scale` / `opacity` / `clip-path` animate, so Tailwind's `rotate` tilts survive.
Reduced motion: everything is simply there (verified).

---

## 50. WORK motion replays on every return — 2026-10-04

`Reveal` gains `replay`: a section shows when ≥15% is in view and resets only once
it is *fully* off screen, so nothing vanishes while partly visible. Repeat plays
add `is-replay`, which sets `--m: 0.6` — every WORK motion duration and delay is
multiplied by `--m`, so returns are quicker than the first play. Used on the
project spreads and "at a glance". No new dependencies or bundle weight; the
animations are compositor-friendly (`translate` / `scale` / `opacity` /
`clip-path`). Verified: in view → visible; half out → still visible; fully out →
reset; back in → visible, replay, `--m` 0.6.

---

## 51. No em dashes in site copy — 2026-10-04

Fatimah wants no em dashes anywhere a visitor reads. Removed the two visible ones:
the Banking software summary ("Production systems for banks, including…") and the
marker on the optional "what I did" list (now "·"). Rendered page text, title,
meta description, alt text and aria-labels scanned: none left. En dashes in date
ranges stay. Code comments are untouched.

---

## 52. Omaya's collage gets real images — 2026-10-04

From Fatimah's Downloads: the hospital portal on a tablet (large frame), the
incoming "Oma" call (medium), and the Omaya logo (small). The two AVIFs went in as
they were (33KB, 10KB); the logo was a 1MB traced SVG, rendered to a 360px PNG
(22KB). All live in `src/assets/work/`, with alt text, in `data/work.ts`.

The big project number moved to hang off the collage's bottom-left, under the large
frame, so it sits on noir instead of a white screenshot; it has a soft dark shadow.
(Difference blending was tried first and turned the number green on the pink
image.) Other projects keep their tinted frames until their images arrive.

**Amended 2026-10-04:** real photos of Fatimah replace the logo and dashboard. Large
frame: Fatimah pitching Omaya at MEST (`omaya-pitch.jpg`, 122KB); medium: the team
of four at the Ghana AI Summit & Awards, July 2026 (`omaya-summit.jpg`, from HEIC,
159KB); small: the "Oma" call. The award stamp moved to the foot of the medium
frame, across the team photo, so it never covers a face; one line, smaller on
phones. Images can carry an `object-position` crop. Logo and portal files removed
from assets (originals still in Downloads).

---

## 53. No labels on the pictures; photos as taped prints — 2026-10-04

Fatimah didn't want labels on the picture side. The stamp is gone from every
collage (and its `stampIn` motion). How far a project got moves to the kicker on
the text side, in the accent colour: `PROFESSIONAL · PCES · SHIPPED`,
`MEST · TO BE CONTINUED…`. Omaya has no status; its kicker "MEST → incubation"
already says it. `stamp` in `data/work.ts` is now `status`.

Photos now read as printed prints pinned to the page: a cream border (4px phone,
6px up), a soft shadow, and a strip of translucent champagne tape across the top
of each, at a different tilt per frame. On hover a print lifts (scale 1.04),
straightens and comes to the front; scale/rotate sit on an inner box so they never
fight the entry animation; reduced motion gets only the z-index. Frames without
images keep their tinted blocks, no tape.

**Amended 2026-10-04:** Omaya's small frame is now the hospital portal on a tablet
(`omaya-portal.avif`, 33KB) instead of the incoming-call screen, which was removed.

---

## 54. WORK as a magazine feature — 2026-10-06

**Supersedes** the heavy-caps title, the taped collage, the giant numbers and the
skill pills (§45, §48, §53 visuals). Fatimah found WORK "very AI generic, not
creative me" and wanted it more boujee.

- **Title:** "Proof of / *work*." in Fraunces Light, `clamp(4rem,10.5vw,12rem)`,
  "work" italic champagne; "so far ↘" unchanged. "At a *glance*" matches.
- **Spreads:** picture side 7 cols, story 5, alternating.
  - Hero photo as a matted gallery print: a champagne hairline inset 12–16px from
    the edge; slow 1.2s zoom to 1.05 on hover.
  - Optional inset photo (30% wide) in a cream border, overlapping only the hero's
    foot so it never covers a face. Two images max.
  - Magazine caption under it, Fraunces italic: "fig. 01 · The team at the Ghana AI
    Summit & Awards, July 2026 · Pitching at MEST".
  - No photo yet → a typographic plate: wine panel, hairline mat, the project's
    initial huge in Fraunces italic outline (champagne stroke), "fig. 02 · image
    to come".
  - Story: `N°01 ——— CONTEXT · STATUS`, the title in Fraunces Light with one word
    italic champagne (`titleItalic`: Omaya *Care*, Banking *software*), summary
    in Jost body, a hairline, then skills as one line of Fraunces italic joined
    with "&" (no pills), then the handwritten role note.
- **Motion:** hero unmasks bottom to top from 1.06×; inset slides up; title rises;
  lines fade; note writes on. Replay at 0.6×; nothing for reduced motion.
- **Data:** images gain `caption`; projects gain `titleItalic`; the hospital
  portal image is dropped (two images max); "AI voice & WhatsApp" → "AI voice and
  WhatsApp" so the skills line has one ampersand.

---

## 55. WORK titles match About Me; the story text simplified — 2026-10-06

- Titles now share About Me's setting: Fraunces regular, tight tracking, mauve
  full stop. "Proof of / work." at the same size as "About / me.", project titles
  "Omaya Care." and "Banking software.", "At a glance." No light weight, no
  champagne italic word.
- Removed magazine numbering that read as decoration: "N°01" on spreads, "N°02"
  in the mastheads (now FATIMAH — WORK — 2026), and "fig. 01 ·" on captions.
- The story is now: title · one plain Fraunces italic line saying where it was
  made and how far it got ("Made at MEST, now in incubation"; "At PCES, shipped
  and in use"; "Made at MEST, to be continued") · the summary · skills as one quiet
  muted line ("User research · Product strategy · …") · the handwritten role. No
  caps kicker, no hairlines between parts. `status` and `titleItalic` are gone
  from the data; `context` carries the line.

**2026-10-06:** Banking software gets real photos, pasted by Fatimah: her at her
PCES desk (hero, rotated 180°, 197KB) and a laptop + monitor with code open
(inset, rotated 270°, 135KB), captioned "At my desk at PCES · A day in the code".
The code is unreadable at inset size; the originals show internal PCES source.

---

## 56. Visbl: a trader's shop and a moving pitch — 2026-10-06

Hero: a clothing trader's shop (screenshot from a video Fatimah pasted, cropped
above the player controls; 189KB). Inset: her pitching Visbl at MEST as a short
silent loop (`pitchshortvideovisbl.MOV`, 3.4s portrait, re-encoded to H.264 with
AVFoundation since ffmpeg isn't installed: 442KB, plus a 67KB poster). Portrait
footage suits the 4:5 inset; in the 4:3 hero it would have cropped her head and
feet. Caption: "A trader's shop, the kind Visbl was for · Pitching Visbl at MEST".

`LoopVideo` (primitives): muted, inline, looped, `preload="metadata"`; plays only
while ≥25% on screen and pauses off it; never plays under reduced motion (the
poster is the picture). Images can carry `video`, with `src` as the poster.
Webpack now emits `.mp4` as an asset. Verified: playing on screen, paused when
scrolled away, at 1440 and 390.

The earlier 16s landscape clip (`VisblShortClip.mp4`, compressed to 2.2MB) was
replaced by this one; the original is still in Downloads.

---

## 57. Each project wears its own brand, and links to its site — 2026-10-06

Colours sampled from each live site and set as `brand` on the project; the spread
exposes it as `--brand` for the photo's mat hairline, the inset's border, the
title's full stop, the link underline and (with no photo) the letter plate. Dark
brand colours were lifted so they read on noir:

| Project | Site colour | Used |
|---|---|---|
| Omaya Care | plum #782850 | #B0507F |
| Banking (PCES) | blue #005288 | #3D8BC4 |
| Visbl | amber #F59E0B | #F59E0B |
| Deymove | steel blue #427AA1 | #5B95BE |

**Links** (all checked 200, open in a new tab), under the handwritten note:
"Visit omayacare.com", "PCES, where I worked" (pces.mk — labelled as the company,
since she was part of a team there), "See Visbl" (visbl-website-two.vercel.app),
"Visit deymove.co". Deymove (= Comeasy) gets the hero image from its own site,
captioned "From deymove.co".

**Visbl swap:** hero is now the landscape 16s pitch clip (`VisblShortClip.mp4`,
re-encoded to 960px H.264, 2.0MB, poster at 4s) playing as a silent loop; the
trader's shop is the inset. The 3.4s portrait clip is no longer used (original in
Downloads). Hero frames can now carry `video` too. `Reveal` accepts `style`.

**Open:** the Visbl site now positions it as insurance data for container shops
("visible, verifiable, and insurable"); the summary still says "inventory and money
tracking for market traders".

---

## 58. "At a glance", told rather than listed — 2026-10-06

**Supersedes** the three résumé columns (now / before / studied), the "At a
glance." heading and the cream CV button. Fatimah found it AI-looking.

Now: the masthead (FATIMAH — AT A GLANCE — 2026), then four lines in her voice,
set large in Fraunces (`clamp(1.6rem, …, 3rem)`), organisations in italic, each with
a handwritten margin note saying when and the dates small beneath it:

- *now*, since Sept 2026: "Right now, I'm product lead at *Omaya Care*, building
  follow-up care for new mothers."
- *this year*, Jan to Aug 2026: "Eight months at *MEST*, building a new startup idea
  almost every month." (MEST was missing before.)
- *before that*, 2022 to 2025: "Three years as a software developer at *PCES*,
  writing the software banks run on."
- *where it started*, 2018 to 2022: "Mathematical Sciences, with Computer Science, at
  the *University of Ghana*."

The CV is an underlined Fraunces italic line, "Download my CV ↗", with "← the rest
is in here" in the hand. On phones the note sits beside each line instead of in a
margin. Dates use "to", not dashes. The unused `Page` helper is removed.

**Amended 2026-10-06:** too large. Now compact: an "At a glance." heading set like
the room's other titles (left), and beside it a short list, the when in the hand
("now", "this year", "before that", "the start") with dates small beneath, then one
Jost body-size line each. Shorter lines: "Product lead at *Omaya Care*, building
follow-up care for new mothers." / "Eight months at *MEST*, a new startup idea
almost every month." / "Software developer at *PCES*, building software for
banks." / "Mathematical Sciences and Computer Science at the *University of
Ghana*." The CV line is smaller to match.

---

## 59. WORK ends on one CV line — 2026-10-06

**Supersedes** §58. The CV already holds the history in detail, so WORK no longer
summarises it. After the last project: a single centred "Download my CV ↗" in
Fraunces italic, underlined in mauve, with "the rest is in here" in the hand above
and a small arrow curling down to it. No masthead, no heading, no list.
`EXPERIENCE` / `EDUCATION` / `SKILL_GROUPS` stay in data/me.ts, unused for now.

Also: PCES copy says "financial institutions", not "banks" (project summary).

---

## 60. The nav, circled in pen — 2026-10-06

**Supersedes** the Jost caps words and the shared underline as the "current"
marker (§30). Chosen by Fatimah from three concepts (circled in pen / ribbon
bookmark / ink progress line).

- Words are Fraunces lowercase italic, `clamp(1rem, 1.05vw, 1.35rem)`, like a
  magazine's contents line: me · work · writing · life · let's talk.
- The current room's word is **circled by hand**: `NavCircle` (NavMark.tsx), a
  single looping stroke that overshoots where it began, mauve, 2.2 weight,
  stretching to the word. It mounts only on the current word, so reaching a new
  room draws the loop afresh there (`navCircleDraw`, 0.75s). No draw under reduced
  motion.
- Other words keep the hand-drawn underline, now on hover only.
- "menu" and "close" are Fraunces italic too; the mobile sheet lists the rooms at
  2.5rem italic with the same circle, on a near-solid noir (97%) with a light blur,
  where the page used to show through.
- Unchanged: bare words over the hero, the frosted pill and "F." once you scroll.

---

## 61. The nav moves to a spine on the left edge — 2026-10-06

Fatimah wanted the nav's *position* to be distinctive too. Chosen from three
(book spine / right-margin index / footer corners).

From `lg` (1024) up the nav is a fixed spine down the left edge,
`clamp(48px, 3.6vw, 72px)` wide, no background (it takes the room's tone), a
hairline along its right edge: "F." (Beth Ellen, home link) at the head, the five
words in Fraunces italic set top to bottom (`writing-mode: vertical-rl`), centred
vertically, the current one circled in pen (§60, the circle stretches to the
vertical word), and a small "2026" at the foot. No hover underline on the spine.
The page's 6vw margin is always wider than the spine, so nothing sits under it.

Below `lg`, phones and tablets keep "F." + "menu" top right and the full-screen
sheet. The top of every page is now free on desktop. ME's own vertical margin
hairline is removed; the spine's hairline replaces it.

---

## 62. The CV as a pill button — 2026-10-07

The CV line becomes a refined button: a full pill outlined in a hairline
(`border-ink/30`), "Download my CV" in Fraunces italic `clamp(1.25rem,…,2rem)`, and
the arrow in a mauve disc at its right end (44px, 56px from `sm`). On hover or
keyboard focus cream fills the pill from its foot (0.5s), the words turn noir, the
disc turns noir and the arrow nudges up-right. Reduced motion: no fill slide.
"the rest is in here" stays above in the hand, its arrow curling down to the pill.

**Amended 2026-10-07:** the button's words are now spaced Jost caps
(semibold, 0.28em tracking, `clamp(0.75rem,…,0.95rem)`) instead of Fraunces
italic, matching the projects' "VISIT OMAYACARE.COM" links. Chosen by Fatimah.

---

## 63. WRITING: her Medium posts as a quiet contents page — 2026-10-07

`src/rooms/Writing.tsx`, data in `src/data/writing.ts` from her public feed (10
posts, Dec 2023 to Sep 2026; titles, dates and opening lines unchanged). Cream
room, as the brief asks for it to be quiet.

- Masthead FATIMAH — WRITING — 2026; "Writing." set like the other room titles,
  "things I've been writing about" in the hand beneath.
- **Featured** = the newest post ("My Sweet Mama"): its cover at 4:5 with a cream
  hairline mat, "9 SEP 2026 · 3 MIN READ", the title large in Fraunces, her opening
  line in italic quotes, "READ IT ON MEDIUM ↗".
- **Index** of the other nine: date · title (Fraunces) · read time ↗, between
  hairlines; on hover the title turns mauve and nudges right, and on desktop the
  post's cover fades in tilted at the row's end.
- "EVERYTHING ON MEDIUM" pill button to medium.com/@fawayo.

Cover photos come from her own posts, compressed to 640px (66–112KB). "From Idea to
Reality" used a MonkeyUser comic, someone else's artwork, so it has no cover here.
Read time = words ÷ 230, rounded up. New posts go at the top of `POSTS` and the
newest becomes featured.

The pill button and the masthead are now shared primitives (`PillLink`,
`Masthead`); the CV button uses `PillLink`, whose fill is the room's ink so it
works on noir and cream.

---

## 64. LET'S TALK, and the site's sign-off — 2026-10-07

`src/rooms/Talk.tsx` (cream). Masthead FATIMAH — LET'S TALK — 2026; "Let's talk."
like every room title, "no reason needed" in the hand; one line, "Building
something, hiring, or just want to say hello? My inbox is open." Then the email
address itself as the headline link, large Fraunces italic underlined in mauve,
with a small "COPY" (clipboard, announces "Copied"); a "SAY HELLO" pill
(`PillLink`, mailto); LinkedIn, GitHub, Medium in spaced caps. Footer: "FATIMAH
WAYO · GHANA · 2026" and "BACK TO THE TOP ↑".

Contact details from the CV. The phone number is deliberately left off. LIFE is
still waiting on photos.

---

## 65. LET'S TALK as a postcard — 2026-10-07

**Supersedes** §64's layout. Fatimah wanted it "much much better and more
creative" and chose the postcard (over a fill-in-the-blanks letter and a
signature sign-off).

After the masthead and "Let's talk.", a large postcard (`max-w-5xl`, warm paper
#FBF6EF, hairline ring, soft shadow) lies tilted −1.5°; on hover it straightens
and lifts (motion-safe). Two halves split by a hairline, stacked on phones:

- **Note** in Beth Ellen: "Dear you," (wine) / "building something, hiring, or
  just want to say hello? Write to me. No reason needed." / "Fatimah" + TinyStar.
- **Postal side:** a wine postage stamp with a real perforated edge (mask: holes
  centred on the rim every 10px + solid centre; 80×100, 90×110 from `sm`) bearing
  "F." and "GHANA"; an SVG ink postmark half over it (rings, "ACCRA · GHANA · 2026"
  on a textPath, "OCT", wavy cancel lines, mauve); then "TO" and ruled address
  lines: the email as a Fraunces italic mailto link with "copy", and linkedin /
  github / medium written in the hand, each ↗.

"SAY HELLO" pill below; footer unchanged. **Open:** the postmark assumes Accra.

**Amended 2026-10-07:** socials. Medium removed (it's in WRITING). Now LinkedIn
(Fatimah Wayo), GitHub @FaWayo, Instagram @faawayo and @daviina._, X @faawayo,
Snapchat @fawayo (her share link resolved to snapchat.com/@fawayo; all links are
clean profile URLs, tracking parameters dropped, all checked 200). Each sits on a
ruled address line with a small wine line icon and the handle in Fraunces italic
(matching the email line), two columns from `sm`. The handwriting stays for the
note only.

---

## 66. Section openers in her hand — 2026-10-07

**Supersedes** the running head "FATIMAH ——— WORK ——— 2026" (tracked Jost caps
between ruled lines), which Fatimah found AI-ish. `Masthead` now writes the room's
name in Beth Ellen, lowercase, mauve ("work", "writing", "let's talk"), then a
hand-drawn wavy line across the page (stretches, constant 1.4 stroke) ending in a
small `TinyStar`. Like a margin note in a journal. Decorative (`aria-hidden`); the
room titles are unchanged.

Both Instagrams stay (@faawayo is her finsta; she chose to keep it, unlabelled).

## 67. The openers are dated, not titled — 2026-10-07

The handwritten room name repeated the title right below it, so the opener is now
a **handwritten date**, like the top of a journal entry, then the wavy line, now
thinner (0.9 stroke, 70% opacity), and a smaller star (14px). Dates, dd/mm/yyyy:
- WORK: 07/10/2026, when it was last updated. Change it when the work changes.
- WRITING: the newest post's date, read from `POSTS` (09/09/2026 now).
- LET'S TALK: "today", the reader's own date, as if written the day they read it.

## 68. No openers at all — 2026-10-07

**Supersedes** §66–67. Fatimah preferred no header line above the room titles.
`Masthead` is deleted; WORK, WRITING and LET'S TALK now open straight on their
titles, like ME.

**Amended 2026-10-07:** a plain hairline is back above the WORK, WRITING and LET'S
TALK titles, no text, `h-px bg-ink/15`, the same weight and colour as the nav
spine's edge, so the two read as one ruled system.

## 69. The room hairline meets the spine — 2026-10-07

The hairline above WORK, WRITING and LET'S TALK now runs, on desktop, from the
nav spine's edge (`ml: spine width − 6vw`) to the right edge of the screen
(`-mr-[6vw]`), the same weight and colour as the spine, so the two make one
corner. It draws itself in from the left (scale 0→1, 1.2s) as the room arrives,
replaying on return; reduced motion shows it whole. On phones it sits within the
page margins. `Reveal` children are now optional.
