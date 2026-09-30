# ~~SUPERSEDED~~ — Digital Portfolio Build & Context Spec (v2)

> **Do not build from this document.** It is kept for history only.
>
> **Superseded by `brand-direction.md`**, which is the source of truth.
> Specific conflicts are itemised in `decision-log.md` §13.
>
> The main things this document got wrong, all since dropped:
>
> - **Crimson `#E53935` is gone.** It was this spec's primary accent. The brand
>   direction's palette has no crimson, and section 11 says doodles are "mostly
>   dusty rose, occasionally `#B5AEAA`".
> - **The light editorial lookbook theme is gone.** This spec supported both a
>   dark theme and an off-white `#F2F2F2` theme. The brand direction defines one
>   dark palette. (A derived paper tone on LIFE is the single exception.)
> - **Bebas Neue / Anton / Caveat / Space Grotesk are gone.** The brand
>   direction defines exactly three voices: DM Sans, Instrument Serif, Beth Ellen.
> - **The four-page structure is gone.** Superseded by one long-scroll page with
>   six rooms.
> - **`focal dots` are gone.** Not in the brand direction's doodle vocabulary.
>
> Read `brand-direction.md` instead.

---

> **Project**: The Architecture of a Human-Centered Digital Portfolio  
> **Brand Concept**: Personal Notebook × Editorial Magazine × High-Fashion Lookbook × Interactive Portfolio  
> **North Star**: Make it feel like Fatimah opened her notebook, added her work, thoughts, photographs, questions, and doodles, and the whole thing became a website.

---

## 1. Design System & Tokens

### Color Palette & Visual Balance
*Supports both the **Dark Warm Notebook** theme (`#242222`) and the **High-Contrast Editorial Lookbook** theme (`#F2F2F2` off-white with stark black typography). The Crimson/Vermilion overlay is used as an energetic focal accent (approx. 3-5% of visual space).*

```json
{
  "colors": {
    "backgroundPrimary": "#242222",   /* Deep Charcoal: warm, almost brown (Dark Theme) */
    "backgroundLight": "#F2F2F2",     /* Off-White / Pale Cool Grey (Editorial Light Theme) */
    "textPrimary": "#F3EFEB",         /* Warm Ivory: headings, body, nav (Dark) */
    "textEditorial": "#000000",       /* Stark Black: editorial display headers (Light) */
    "textSecondary": "#B5AEAA",       /* Warm Grey: captions, metadata, dates */
    "borderDivider": "#46413F",       /* Charcoal Grey: dividers, subtle grid lines */
    "accentSignature": "#B88D98",     /* Dusty Rose: doodles, notes, subtle links */
    "accentCrimson": "#E53935",       /* Vibrant Crimson Red: handwritten overlays, focal dots, stamps */
    "accentDeep": "#392F32"          /* Muted Rose: hover surfaces, subtle blocks */
  },
  "visualBalance": {
    "background": "70%",
    "typography": "20%",
    "gridAndDividers": "6%",
    "crimsonAndRoseAccents": "4%"
  }
}
```

---

### Typography Hierarchy

1. **Space Grotesk / DM Sans** (Structured Display & Technical Voice)
   - **Usage**: Navigation, body copy, buttons, labels, project descriptions, metadata, technical stacks.
   - **Characteristics**: Crisp, geometric, modern, highly legible.
   - **Sample CSS**: `font-family: 'Space Grotesk', 'DM Sans', sans-serif;`

2. **Bebas Neue / Anton / Condensed Serif** (Editorial Lookbook Header)
   - **Usage**: Oversized section headers (`PORTFOLIO`, `ABOUT US`, `THE WORK`, `CASE STUDY`, `LOOKBOOK`).
   - **Characteristics**: Tall, heavy, condensed, high-impact magazine style.
   - **Sample CSS**: `font-family: 'Bebas Neue', sans-serif; text-transform: uppercase; letter-spacing: 0.05em;`

3. **Instrument Serif** (Reflective Voice)
   - **Usage**: Major section sub-titles (e.g., *Still Becoming*), pull quotes, key reflective statements.
   - **Sample CSS**: `font-family: 'Instrument Serif', serif;`

4. **Beth Ellen / Caveat / Permanent Marker** (Handwritten & Script Overlay Voice)
   - **Usage**: Cursive signature overlays (`Not Just`, `Iconic`, signatures), margin notes, doodle labels, arrows, tiny observations.
   - **Color**: `#E53935` (Crimson Red) or `#B88D98` (Dusty Rose)
   - **Sample CSS**: `font-family: 'Caveat', cursive; color: #E53935; position: absolute; transform: rotate(-6deg);`

---

## 2. Micro-Details & Tactical Layering

### 1. Cursive Script Overlays
- Layer handwritten cursive script (in Crimson `#E53935` or Dusty Rose `#B88D98`) directly across or adjacent to heavy condensed titles.
- Example: An oversized `PORTFOLIO` header with a crimson cursive script `Not Just` written diagonally across it.

### 2. Solid Focal Dots / Badges
- Solid red circular accent dots (`width: 24px; height: 24px; background: #E53935; border-radius: 50%;`) placed precisely on grid intersections or dividing lines between text blocks and monochrome portraits.

### 3. Metadata Stamps & Barcode Aesthetics
- Small, technical issue stamps, date badges (`15 MAY 2030`), issue tags (`ICONIC / ISSUE 01`), and minimalist CSS barcode blocks embedded in card footers and margins.

### 4. Metric Case Study Split Tables
- Clean, horizontal ruled rows for case study metrics (`RESULT: 27% / 36% / 65%`) with structured typography and grayscale imagery.

---

## 3. Spatial Architecture (The 6 Rooms)

### Homepage (Portal)
- **Concept**: Minimalist entrance (`Still becoming. [ enter ]`).
- **Layout**: Centered, generous negative space with crimson handwritten annotation (`hello →` or `not just a portfolio`).

### Room 1: ME (Quiet & Personal)
- **Mood**: Reflective, quiet, personal lookbook layout.
- **Layout**: Structured magazine grid with asymmetric typography, taped polaroid elements, and red accent dots.

### Room 2: WORK (Structured & Confident)
- **Mood**: Grid-based, clear, authoritative case-study layout.
- **Structure**: Show specific stories and role contributions with metric tables and sticky note metadata cards:
  - **OMAYA CARE**: Postpartum care, hospitals, mothers, health professionals.
  - **PCES**: Banking systems, payment processing, APIs, databases.
  - **MEST**: Startups, customer discovery, AI integrations, experiments.
  - **SMS GATEWAY**: FastAPI, async integrations, provider abstraction, testing, production bugs.

### Room 3: WRITINGS (Visually Quiet Reading Desk)
- **Mood**: Uncluttered, minimalist.
- **Header Line**: *"Sometimes I understand what I'm thinking only after I've written it down."*

### Room 4: LIFE (Visual Scrapbook & Lookbook)
- **Mood**: Asymmetric visual gallery & scrapbook collage.
- **Categories**: Books, fashion, music, fitness, travel, food, new places, learning random things, quiet moments.
- **Treatment**: Slightly rotated photos, candid moments, small taped notes (`sofa talk`, `hello world`).

### Room 5: STILL BECOMING (Emotional Center)
- **Mood**: Personal journal / notebook style.
- **Styling**: Distinct serif typography and prominent handwritten annotations.

### Room 6: LET'S TALK (Intent-Based Contact Gateway)
- **Mood**: Warm, open, relational contact card layout.
- **Prompt**: *"Why are you here?"* (`Work`, `Mentorship`, `Learning`, `Collaboration`, `Ideas`, `Hello`).

---

## 4. Anti-Patterns (What to Avoid)

- **Visuals**: Neon, excessive pink, gradients everywhere, glassmorphism, 3D objects, stock photos, fake paper textures.
- **Copy**: Corporate buzzwords ("passionate about", "impact-driven", "leveraging technology", "innovative solutions").
