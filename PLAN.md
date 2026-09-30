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
                              Becoming, Talk               (.tsx)
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

## Phase 3 — Nav + scroll

**Goal:** The skeleton you navigate by.

- Six-room nav: `ME WORK WRITINGS LIFE STILL BECOMING LET'S TALK`
- `HoverNote` on each nav item (three notes are proposals — see
  `decision-log.md` §14)
- Scroll-spy: active room reflected in nav
- Smooth scroll, correct focus handling on jump
- `Fatimah Wayo` wordmark top-left, returns to the intro
- Rooms render as empty `min-h-screen` sections so scrolling is testable

**Gate:** nav reads correctly, scroll-spy tracks, wordmark works.

---

## Phase 4 — Intro gate

**Goal:** The north star, literally.

- Section 19 copy **verbatim**
- `Still becoming.` in Instrument Serif
- `[ enter ]`
- Handwritten `hello ->` or `you're here.` in Beth Ellen rose
- A small cloud
- Reveal transition into the site — "walking through it"
- Replays on every fresh load; wordmark returns to it
- No motion may block reading or clicking

**Gate:** does it feel like almost ridiculously simple, or did it creep toward a
landing page?

---

## Phase 5 — ME  *(needs 1–2 portraits)*

Copy verbatim from the brand direction, "A little about me".

Also carry across the **facts** from the old site — the sections are gone, the
facts are not:

- BSc Mathematical Sciences, majored Computer Science, Univ. of Ghana Legon, 2018–2022
- General Science, Achimota School, 2015–2018
- Software Developer, PCES, 2023–2025 · National Service Personnel, PCES, 2022–2023
- Summer Intern, Nokwary Technologies, 2021 · Bootcamp, MEST + Soronko Academy, 2020

Skills have no room of their own in the brand direction. Proposed: an editorial
ruled column here, not pill tags — HTML/CSS, JavaScript, TypeScript, C#, SQL,
React, .NET, Express, Node.js, Git, Figma, Azure, Problem Solving.

Mood: quiet, personal. More typography and portrait.

**Gate:** portrait frame and photo slots in place. Expect to rewrite the copy —
the brand direction's register is not a résumé.

---

## Phase 6 — WORK

**Goal:** "Things I've built" + four case studies, shipping on placeholders.

`OMAYA CARE` · `PCES` · `MEST` · `SMS GATEWAY`

Each gets "What I actually did" — contributions, not company descriptions.

Content arrives incrementally, so the data file is typed and partial-safe:

- `src/data/work.ts` — `Project[]`, each entry with `slug`, `title`, `summary`,
  `contributions[]`, `stack[]`, optional `metrics[]`, optional `href`
- Projects render from data; a project with empty `contributions` still renders
  without breaking the layout

`MetricTable` and `Stamp` get their first real use here.

**Open:** the PCES ambiguity — project versus employer (see `decision-log.md` §14).

**Gate:** layout holds with partial content. Confirm the WORK visual language is
"structured, confident".

---

## Phase 7 — WRITINGS

Header line verbatim: *"Sometimes I understand what I'm thinking only after I've
written it down."* Then `Things I've written`, then Medium posts — dates, titles,
short descriptions.

Mood: reading desk. Visually very quiet. Occasional clouds and annotations.

**Gate:** quiet enough? Resist adding visual interest it doesn't need.

---

## Phase 8 — LIFE  *(needs 10–20 candid frames)*

**The paper tone room.** `When I'm not working` — not "My Hobbies".

Categories: books, fashion, music, fitness, travel, food, new places, learning
random things, good conversations, quiet moments, trying something I've never
done before.

Photo-led and the most visually interesting section. Rotated frames, uneven
spacing, overlap, tape. Photographs used **unedited**.

**Gate:** first real test of the paper tone — this is where the derived palette
either works or needs adjusting.

---

## Phase 9 — STILL BECOMING

**The emotional centre.** Must feel different from everything else — almost a
personal journal.

Title `Still Becoming` in large Instrument Serif. Opening copy verbatim:

> There are things I know I want.
> Things I'm still figuring out.
> Things I haven't even thought of yet.
> I'm learning to be comfortable with all three.

Six entry types: **Currently learning** · **Something I've changed my mind about**
· **Something I want to get better at** · **Something I'm grateful for** ·
**Something I'm praying about** · **Something I'm excited about**

Structure it as a typed `BecomingEntry[]` so it can evolve over time — that is
the point of the section.

**Gate:** does it feel reflective rather than inspirational-poster?

---

## Phase 10 — LET'S TALK

`Why are you here?` — six intents, each a prompt and a label:

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

- Audit against §23 anti-patterns
- §24 as the final checklist
- Remove the scratch route from Phase 2
- Performance: image sizing, font loading, `contenthash` review
- Keyboard navigation, focus states, skip link
- `prefers-reduced-motion` verified end to end
- Check rose stays near 3% across every viewport
- Remove dead code and unused dependencies
- Decide what happens with the committed `dist/`

---

## Dependencies on you

| Needed | By |
|---|---|
| Paper palette sign-off | Phase 8 |
| Nav hover note approval (ME, WORK, LET'S TALK) | Phase 3 |
| 1–2 portraits | Phase 5 |
| WORK project content | Phase 6, incremental |
| PCES clarification | Phase 6 |
| 10–20 LIFE photographs | Phase 8 |
| Contact routes per intent | Phase 10 |