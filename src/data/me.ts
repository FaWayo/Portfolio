import heroPortrait from '@/assets/hero-portrait.png';
import mePortrait from '@/assets/me-portrait.jpg';

/**
 * ME room content.
 *
 * The prose is verbatim from brand-direction §ME — do not tighten it. The
 * register is deliberately not a résumé: the brand direction is explicit that
 * the site "shouldn't make you feel like your entire existence is a GitHub
 * repository."
 *
 * The facts below are carried across from the old four-page site. The old
 * sections are gone; the facts are not. See decision-log.md §13.
 */

export interface TimelineEntry {
    /** Display range, e.g. "2023 – 2025". */
    period: string;
    role: string;
    org: string;
    detail?: string;
}

export interface EducationEntry {
    period: string;
    qualification: string;
    detail?: string;
    org: string;
}

/** brand-direction §ME — "A little about me", verbatim. */
export const ME_PROSE: readonly string[] = [
    "I'm a software engineer by training, but I've never been interested in being only one thing.",
    "I like understanding how things work. I like building. I like learning from people who know more than I do. I like writing when I have something worth saying.",
    "My faith is a big part of how I make sense of where I've been, where I am, and where I'm going.",
    "And I'm interested in having a life that is bigger than my work.",
];

/**
 * Experience, from the old site's Experience timeline. PCES appears as an
 * employer here spanning 2022–2025; decision-log.md §14 item 4 flags that the
 * brand direction also lists PCES as a WORK project, which is still unresolved.
 */
export const EXPERIENCE: readonly TimelineEntry[] = [
    {
        period: '2023 – 2025',
        role: 'Software Developer',
        org: 'Process Crafting Expert Services',
    },
    {
        period: '2022 – 2023',
        role: 'National Service Personnel',
        org: 'Process Crafting Expert Services',
    },
    { period: '2021', role: 'Summer Intern', org: 'Nokwary Technologies' },
    { period: '2020', role: 'Bootcamp', org: 'MEST and Soronko Academy' },
];

/** Education, from the old site's Education timeline. */
export const EDUCATION: readonly EducationEntry[] = [
    {
        period: '2018 – 2022',
        qualification: 'BSc Mathematical Sciences',
        detail: 'Majored in Computer Science',
        org: 'University of Ghana, Legon',
    },
    { period: '2015 – 2018', qualification: 'General Science', org: 'Achimota School' },
];

/**
 * Skills have no room of their own in the brand direction, so they sit here
 * behind the `CV` link as pills rather than a ruled column — see decision-log.md
 * §14 item 5. Order is unchanged from the old site.
 */
export const SKILLS: readonly string[] = [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'C#',
    'SQL',
    'React',
    '.NET',
    'Express',
    'Node.js',
    'Git',
    'Figma',
    'Azure',
    'Problem Solving',
];

/**
 * The résumé, as a Google Drive PDF.
 *
 * The `/preview` form links the file itself rather than Drive's viewer chrome,
 * and `target="_blank"` is why this opens in a new tab. ME keeps the facts
 * visible but small; this is where the full document lives.
 */
export const CV_URL =
    'https://drive.google.com/file/d/1QZa7OBHapcTPIZW0hVTr-EeA6Kp4PLtO/preview';

/**
 * Portrait slots. No photographs exist yet, so `src` is undefined and Photo
 * renders its designed placeholder. The old site had a single illustrated
 * Hero-Img.svg, which was deleted with the rest of the old assets.
 */
export const PORTRAITS: readonly { src?: string; alt: string; rotate: number; caption?: string }[] = [
    {
        src: mePortrait,
        rotate: 0,
        alt: 'Fatimah in a red blazer and a gold flower pendant, photographed in a studio against a dark backdrop',
    },
    { rotate: 1.5, alt: 'A candid moment from everyday life' },
];

/**
 * The photograph in the opening screen, kept deliberately separate from
 * `PORTRAITS`. It must be a **cut-out** — a PNG with a transparent background,
 * 4:5 — because the hero stands the figure in front of the name
 * (decision-log.md §31). A rectangular photo would hide the name.
 *
 * The current file is a studio portrait whose backdrop was removed with macOS
 * Vision subject lifting: a mask only, no pixels regenerated. The crown of the
 * hair sits 7.5% down the frame, which `.hero-portrait` in style.css is
 * calibrated to — replace the photo with one framed differently and that
 * number has to change too.
 *
 * It is deliberately the *same* photograph as `PORTRAITS[0]`: the cut-out is a
 * mask of that frame, pixel for pixel, which is what lets TravellingPortrait.tsx
 * carry it from the hero into ME and crossfade the backdrop back in on the way
 * (decision-log.md §32). Replace one and the other must be re-cut from it.
 */
export const HERO_PHOTO: { src?: string; alt: string } = {
    src: heroPortrait,
    alt: 'Fatimah in a red blazer and a gold flower pendant, looking straight at the camera',
};
