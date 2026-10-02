# Implementation Plan

Eleven phases. **Each phase ends with a review gate.** Work stops at the gate
until the phase is reviewed in a browser and changes are requested or approved.

Read alongside `context/brand-direction.md` (the source of truth),
`context/decision-log.md` (what was agreed and why) and
`context/design-system.md` (tokens, contrast, doodle rules).

---

## Working agreement

- **One phase at a time.** No building ahead into the next room.
- **Nothing is committed** without an explicit request. Working tree stays dirty.
- **Verbatim copy.** Where the brand direction supplies copy, it is used as
  written. Only structural or placeholder copy is drafted.
- **Every phase is checked against §24** before it is presented —
  `design-system.md` §11 has the seven questions.
- **Antipatterns** (`design-system.md` §10) are audited before each gate.

## Target structure

```
src/
  index.html                  single shell
  index.tsx                   createRoot
  App.tsx                     intro gate + room stack + scroll
  style.css                   @theme inline tokens, tones, keyframes
  doodles/                    Cloud, Arrow, Underline, HighlightCircle,
                              QuestionMark, ExclamationMark, Scribble,
                              TinyStar, Handwritten        (.tsx)
  primitives/                 Room, Reveal, Photo, Stamp, Barcode,
                              MetricTable, HoverNote        (.tsx)
  rooms/                      Portal, Me, Work, Writings, Life,
                              Journal, Talk               (.tsx)
  data/                       typed content, one file per room
```

**Dependency direction:** `rooms` → `primitives` → `doodles` → nothing.
`data` is imported by `rooms` only. Nothing in `rooms` imports another room.

---

## Phase 1 — Foundation

**Goal:** React 19 boots, tokens exist, old site is gone.

- Install `react`, `react-dom`; dev-dep `@types/react`, `@types/react-dom`
- Remove `feather-icons` (was unused)
- `tsconfig.json`: `jsx: react-jsx`, `module: ESNext`,
  `moduleResolution: bundler`, `target: ES2020`, DOM lib, `strict: true`.
  Do **not** set `noEmit` — ts-loader needs emit. Keep `typescript` at `^5.8.2`.
- `webpack.config.js`: single entry `./src/index.tsx`, single HtmlWebpackPlugin,
  keep the css / asset / `\.tsx?$/` rules. `clean: true` wipes the stale
  four-page `dist/`
- `postcss.config.js`: drop the unused v3 `require('tailwindcss')`
- Delete: `src/projects/`, `src/about/`, `src/blog/`, `src/components/`,
  `src/reusable-components/`, `src/types/`, `src/index.ts`, `src/assets/`,
  `tailwind.config.js`
- `style.css`: `@import "tailwindcss"`, the token system (dark + paper),
  the three font families
- `index.html`: single shell, Google Fonts link, one mount point
- `index.tsx`: `createRoot`, placeholder render

**Gate:** React mounts, palette and fonts live, no leftover old files.

> Note: `dist/` is git-tracked. The next build will show the old four-page output
> as deletions. That is expected, not a mistake.

---

## Phase 2 — Doodles + primitives

**Goal:** Every visual tool exists and is reviewable in isolation.

- Port the six surviving components from `context/doodle-components.jsx` to
  `.tsx`, adding `pathLength="1000"` to every drawing path
- Draw the four missing: `QuestionMark`, `ExclamationMark`, `Scribble`, `TinyStar`
- Move the `DoodleStyles` keyframes into `style.css`; delete the runtime
  `<style>` injector
- Retire `EditorialDot`
- Build primitives: `Room` (id / label / tone wrapper), `Reveal`
  (IntersectionObserver), `Photo` (rotation, settle-on-load, tape, shadow),
  `Stamp`, `Barcode`, `MetricTable`, `HoverNote`
- Add `prefers-reduced-motion` handling
- Add a temporary scratch route rendering every doodle and primitive

**Gate:** review the scratch strip. Check the draw-on animations, the rose, the
weight, whether 9 doodles is too many.

---

## Phase 3 — Opening screen and wayfinding

*(Merges the old Phase 3 "Nav + scroll" and Phase 4 "Intro gate". There is no
intro gate and no top navigation bar.)*

**Goal:** The site opens on the first screen, and you can always find your way.

**First screen** — the page itself, no gate in front of it:

- `Hi, I'm Fatimah.` in Beth Ellen, written on once
- The one short paragraph, verbatim
- No tagline under the name. `Still becoming.` is removed, not replaced
- Handwritten `hello ->` or `you're here.` in Beth Ellen rose
- A small cloud
- One photo if there is one
- Warm and wholesome: generous space, no dividers, no boxes
- The six rooms underneath as a loose list, each with its handwritten note —
  `ME` *where I come from* · `WORK` *things I've actually built* ·
  `WRITINGS` *things I've been writing about ->* · `LIFE` *the other parts of
  me* · `IN PROGRESS` *notes, mostly* · `LET'S TALK` *no reason needed*
- They read like part of the welcome, not like a menu
- **No eyebrow label anywhere.** A heading stands on its own

**Wayfinding** — after the first screen:

- A small quiet floating pill at the bottom centre showing the room you are in
- Tapping it opens the six rooms in a soft overlay
- The pill is a real `<button>`; the overlay traps focus and closes on `Escape`
- It must never cover photographs in the LIFE room on mobile
- A small `Fatimah` in Beth Ellen at the top left of each room, scrolling to top
- Smooth scroll, correct focus handling on jump, skip link
- Scroll-spy drives the pill label and the list's active state

**Gate:** the first screen feels warm and plain rather than empty, the room list
reads as welcome rather than menu, the pill stays out of the way of LIFE photos
on a small screen, and the overlay is fully keyboard operable.

---

## Phase 5 — ME  *(needs 1–2 portraits)*

**Goal:** Quiet and personal. A large portrait bleeding to the edge, text beside
it. Not a résumé.

Copy verbatim from the brand direction, "A little about me".

Also carry across the **facts** from the old site — the sections are gone, the
facts are not:

- BSc Mathematical Sciences, majored Computer Science, Univ. of Ghana Legon, 2018–2022
- General Science, Achimota School, 2015–2018
- Software Developer, PCES, 2023–2025 · National Service Personnel, PCES, 2022–2023
- Summer Intern, Nokwary Technologies, 2021 · Bootcamp, MEST + Soronko Academy, 2020

**ME must not read like a résumé.** Experience, education and skills are shrunk
to a compact block, or move behind a small `CV` pill linking the PDF at
`src/data/me.ts` → `cvUrl`. No `EXPERIENCE` / `EDUCATION` / `SKILLS` labels
above them.

Layout: large portrait bleeding to the edge, text beside it. Mobile first.

**Gate:** portrait frame and photo slots in place, the facts are present but
quiet, and the room does not read as a CV. Expect to rewrite the copy — the
brand direction's register is not a résumé.

---

## Phase 6 — WORK

**Goal:** One card per project, shipping on placeholders.

`OMAYA CARE` · `PCES` · `MEST` · `SMS GATEWAY`

Each card carries an image placeholder and a pill label. Each gets "What I
actually did" — contributions, not company descriptions.

Content arrives incrementally, so the data file is typed and partial-safe:

- `src/data/work.ts` — `Project[]`, each entry with `slug`, `title`, `summary`,
  `contributions[]`, `stack[]`, optional `metrics[]`, optional `href`
- Projects render from data; a project with empty `contributions` still renders
  without breaking the layout
- Stack entries render as small rounded pills

`MetricTable` and `Stamp` get their first real use here. Pill shapes only — no
drop shadows, no gradients.

**Open:** the PCES ambiguity — project versus employer (see `decision-log.md`
open item 4).

**Gate:** layout holds with partial content, cards read as one repeated shape
rather than four layouts, and the pills stay small.

---

## Phase 7 — WRITINGS

**Goal:** Visually very quiet. The quietest room on the site.

Header line verbatim: *"Sometimes I understand what I'm thinking only after I've
written it down."* Then `Things I've written`, then Medium posts — dates, titles,
short descriptions.

Mood: reading desk. Resist adding visual interest it does not need. A single
list, generous space, almost nothing else.

**Gate:** quiet enough? Resist adding visual interest it doesn't need.

---

## Phase 8 — LIFE  *(needs 10–20 candid frames)*

**A paper tone room.** `When I'm not working` — not "My Hobbies".

A photo grid beside the title, and one short line. Photo-led and the most
visually interesting section.

Categories: books, fashion, music, fitness, travel, food, new places, learning
random things, good conversations, quiet moments, trying something I've never
done before.

Rotated frames, uneven spacing, overlap. Photographs used **unedited**. Drop the
photo drop shadow and the tape blur — no shadows anywhere now.

**Gate:** the grid holds its shape with partial content, and the floating room
pill never covers a photograph here on a small screen.

---

## Phase 9 — Journal room  *(no title)*

**The most different room on the site.** It must not look like any other room —
almost a personal journal, like flipping to a page.

**The room has no title.** `Still Becoming` is removed, not renamed, and nothing
anywhere says "becoming", "journey" or "evolving". In the first-screen list and
the overlay it reads `IN PROGRESS` with the note *notes, mostly* (pending
Fatimah's confirmation).

The opening lines stand in for a title, in large Beth Ellen:

> There are things I know I want.
> Things I'm still figuring out.
> Things I haven't even thought of yet.
> I'm learning to be comfortable with all three.

Six entry types: **Currently learning** · **Something I've changed my mind about**
· **Something I want to get better at** · **Something I'm grateful for** ·
**Something I'm praying about** · **Something I'm excited about**

Structure it as a typed `JournalEntry[]` so it can grow over time.

**Gate:** does it feel reflective rather than inspirational-poster, and is it
visibly the most different room rather than a recoloured ME?

---

## Phase 10 — LET'S TALK

A large heading, then one small rounded pill per intent. `Why are you here?` —
six intents, each a prompt and a label:

| Prompt | Label |
|---|---|
| I want to work with you | Work |
| I want to mentor you | Mentorship |
| I'd like you to mentor me | Learning |
| I want to build something with you | Collaboration |
| I think we'd have something interesting to talk about | Ideas |
| I just want to say hi | Hello |

Then real contact routes per intent. Closing: *you don't need a very good reason.*
in Beth Ellen dusty rose with a tiny arrow.

Mood: warm and open. "That last one makes the entire site feel more human."

**Gate:** the six intents all lead somewhere real, or they need contact
infrastructure decided.

---

## Phase 11 — Polish

- Audit against §23 anti-patterns, including **no eyebrow labels above headings**
  and **no shadows or gradients**
- §24 as the final checklist
- Remove the scratch route from Phase 2
- Performance: image sizing, font loading, `contenthash` review
- Keyboard navigation, focus states, skip link, overlay focus trap and `Escape`
- `prefers-reduced-motion` verified end to end
- Check rose stays near 3% across every viewport
- Check dark/paper tones alternate cleanly down the page
- Confirm the floating room pill never covers LIFE photographs on mobile
- Grep for `becoming`, `journey`, `evolving`, and the old `enter` gate strings —
  all should return nothing
- Remove dead code and unused dependencies
- Decide what happens with the committed `dist/`

---

## Build order after the redesign

The build runs **one room at a time**, and each step is verified in the browser
before the next one starts. Do not batch them.

| Step | Work | Stop and review |
|---|---|---|
| 1 | Tokens, tones, fonts, motion, pills | Yes |
| 2 | First screen and wayfinding (pill, overlay, signature, skip link) | Yes |
| 3 | ME | Yes |
| 4 | WORK | Yes |
| 5 | WRITINGS | Yes |
| 6 | LIFE | Yes |
| 7 | Journal room | Yes |
| 8 | LET'S TALK | Yes |
| 9 | Phase 11 polish | Yes |

Routing and doodle behaviour are preserved throughout, except where this plan
explicitly retires them.

---

## Dependencies on you

| Needed | By |
|---|---|
| Paper palette sign-off | Phase 8, more urgent now paper is used on more rooms |
| Nav hover note approval (ME, WORK, LET'S TALK) | Phase 3 |
| Journal room label approval (`IN PROGRESS`) | Phase 3 |
| 1–2 portraits | Phase 5 |
| WORK project content | Phase 6, incremental |
| PCES clarification | Phase 6 |
| 10–20 LIFE photographs | Phase 8 |
| Contact routes per intent | Phase 10 |