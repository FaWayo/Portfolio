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

/**
 * Fatimah's own words, verbatim (2026-10-03, decision-log.md §40). The first
 * line is set as a lede in the room — see rooms/Me.tsx.
 */
export const ME_PROSE: readonly string[] = [
    'Software engineer by training. Product builder. Curious about what else I can create.',
    'I’ve always liked making things. As a kid, it was LEGO. I could spend time putting pieces together, taking them apart, and seeing what else they could become. Software gave me that same feeling, just with a lot more possibilities.',
    'It has turned out to be a lot more work than LEGO.',
    'Software keeps changing, and so do I. Now AI has entered the picture, and I’m still testing the waters, figuring out what’s possible, what I can build with it, and what comes next. Change happens so quickly that sometimes you don’t realise how much you’ve changed until you look back and see that you’re not quite the person who started.',
    'It has been a journey of building things, but also building character. And to think, this is only the beginning.',
];

/**
 * Experience, from the CV (2026-10-04). PCES is both an employer here and a
 * project in WORK — the row says where, the project says what she did there.
 * National Service is folded into the PCES row, as on the CV.
 */
export const EXPERIENCE: readonly TimelineEntry[] = [
    { period: 'Sept 2026 – now', role: 'Product Lead', org: 'Omaya Care' },
    { period: 'Jan – Aug 2026', role: 'Entrepreneur in Training', org: 'MEST Africa' },
    {
        period: 'Nov 2022 – Dec 2025',
        role: 'Software Developer',
        org: 'Process Crafting Expert Services (PCES)',
        detail: 'Joined through National Service and grew into full-time development.',
    },
    { period: 'May – Aug 2021', role: 'Software Developer Intern', org: 'Nokwary Technologies' },
];

/** Education and training, from the CV (2026-10-04). Achimota kept from the old site. */
export const EDUCATION: readonly EducationEntry[] = [
    {
        period: '2018 – 2022',
        qualification: 'BSc Mathematical Sciences',
        detail: 'Computer Science',
        org: 'University of Ghana, Legon',
    },
    { period: '2021', qualification: 'Software Development Bootcamp', org: 'MEST Africa & Soronko Academy' },
    { period: 'Certification', qualification: 'Microsoft Azure Fundamentals (AZ-900)', org: 'Microsoft' },
    { period: '2015 – 2018', qualification: 'General Science', org: 'Achimota School' },
];

/**
 * Skills, grouped into columns in WORK (decision-log.md §45), from the CV's
 * key skills plus the stack named in its experience (2026-10-04).
 */
export const SKILL_GROUPS: readonly { label: string; skills: readonly string[] }[] = [
    { label: 'Languages', skills: ['TypeScript', 'JavaScript', 'C#', 'Python', 'SQL'] },
    { label: 'Build', skills: ['React', 'Next.js', '.NET', 'FastAPI', 'Azure'] },
    { label: 'Engineering', skills: ['REST API design', 'AI API integration', 'Bot development'] },
    { label: 'Product', skills: ['Product development', 'Requirements gathering', 'UI/UX prototyping', 'Product pitching'] },
];

/** Every skill, flat. */
export const SKILLS: readonly string[] = SKILL_GROUPS.flatMap((group) => group.skills);

/**
 * The résumé, as a Google Drive PDF.
 *
 * The `/preview` form links the file itself rather than Drive's viewer chrome,
 * and `target="_blank"` is why this opens in a new tab. WORK links it as a
 * small button; this is where the full document lives.
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
