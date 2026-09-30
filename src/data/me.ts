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
 * Skills have no room of their own in the brand direction, so they live here as
 * an editorial ruled column rather than the old pill tags — see decision-log.md
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
 * Portrait slots. No photographs exist yet, so `src` is undefined and Photo
 * renders its designed placeholder. The old site had a single illustrated
 * Hero-Img.svg, which was deleted with the rest of the old assets.
 */
export const PORTRAITS: readonly { src?: string; alt: string; rotate: number; caption?: string }[] = [
    { rotate: -2.5, alt: 'A portrait of Fatimah' },
    { rotate: 2, alt: 'A candid moment from everyday life' },
];
