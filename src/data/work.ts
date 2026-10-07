import deymoveHero from '@/assets/work/deymove-hero.jpg';
import deymoveQueue from '@/assets/work/deymove-queue.jpg';
import omayaPitch from '@/assets/work/omaya-pitch.jpg';
import omayaSummit from '@/assets/work/omaya-summit.jpg';
import pcesCode from '@/assets/work/pces-code.jpg';
import pcesDesk from '@/assets/work/pces-desk.jpg';
import visblPitch from '@/assets/work/visbl-pitch.mp4';
import visblPitchPoster from '@/assets/work/visbl-pitch-poster.jpg';
import visblShop from '@/assets/work/visbl-shop.jpg';

/**
 * WORK projects. PLAN Phase 6, decision-log.md §41, §45 and §46.
 *
 * Sources, 2026-10-04: Fatimah's CV (Google Drive) and her Medium post "From
 * Comeasy to Omaya" (10 August 2026). Nothing here goes beyond what those say.
 *
 * Honesty rules, agreed with Fatimah:
 *
 * - `context` says how far it actually got. An idea that stopped at an
 *   idea is still worth showing — say so.
 * - `role` says what *she* did, and with whom. Never imply it was built alone or
 *   that it launched if it didn't.
 * - Professional work is described generically where the client is
 *   confidential.
 *
 * Kept short on purpose — one line each, no task lists. The detail lives in the
 * CV (decision-log.md §47). Every field past `title` is optional; the room
 * renders whatever is here.
 * `placeholder: true` marks an entry still waiting for its story.
 */

export interface Project {
    slug: string;
    title: string;
    /** One plain line: where it was made and how far it got. */
    context?: string;
    /** Her part, and the team around it. Set as a handwritten note. */
    role?: string;
    /** One or two sentences: what it is. */
    summary?: string;
    /** What she actually did. The heart of each entry. */
    did?: readonly string[];
    /** A few small skill tags — what the work took, not the tech stack. */
    skills?: readonly string[];
    /** A line in her own words, from her writing. Set in the hand. */
    aside?: string;
    /** The project's own site, and how the link reads. */
    href?: string;
    linkLabel?: string;
    /**
     * The project's brand colour, taken from its own website, so the frame,
     * the inset border and the title's full stop match it (decision-log.md §57).
     */
    brand?: string;
    /**
     * Up to two images: a hero, shown as a matted print, and an inset that
     * overlaps its corner. Each can carry a magazine-style caption. With none,
     * the spread shows a typographic plate instead (decision-log.md §54).
     */
    images?: readonly {
        src: string;
        alt: string;
        /** Shown under the hero as "fig. 01 · …". */
        caption?: string;
        /** CSS object-position for the crop. */
        position?: string;
        /** A short silent clip to play in this frame; `src` is its poster. */
        video?: string;
    }[];
    placeholder?: boolean;
}

export const PROJECTS: readonly Project[] = [
    {
        slug: 'omaya-care',
        title: 'Omaya Care',
        context: 'Made at MEST, now in incubation',
        brand: '#B0507F',
        href: 'https://omayacare.com',
        linkLabel: 'Visit omayacare.com',
        role: 'my part: product lead, team of four',
        summary: 'Helps hospitals follow up with mothers after discharge, through automated voice calls and WhatsApp.',
        skills: ['User research', 'Product strategy', 'Care workflows', 'AI voice & WhatsApp'],
        images: [
            {
                src: omayaSummit,
                alt: 'The Omaya Care team of four at the Ghana AI Summit & Awards, July 2026',
                caption: 'The team at the Ghana AI Summit & Awards, July 2026',
                position: 'center 70%',
            },
            {
                src: omayaPitch,
                alt: 'Fatimah pitching Omaya Care at MEST, with the product on the screen behind her',
                caption: 'Pitching at MEST',
                position: '42% center',
            },
        ],
    },
    {
        slug: 'pces',
        title: 'Banking software',
        context: 'At PCES, shipped and in use',
        brand: '#3D8BC4',
        href: 'https://pces.mk',
        linkLabel: 'PCES, where I worked',
        role: 'my part: software developer, three years',
        summary: 'Production systems for financial institutions, including a pensioner payment module that turned a manual payout process into a single action.',
        skills: ['Payments', 'APIs', 'Bank bots', 'Leading delivery'],
        images: [
            {
                src: pcesDesk,
                alt: 'Fatimah at her desk at PCES, code on one screen and a document on the laptop',
                caption: 'At my desk at PCES',
                position: '60% center',
            },
            {
                src: pcesCode,
                alt: 'A laptop and a monitor with backend code open, side by side',
                caption: 'A day in the code',
                position: '70% center',
            },
        ],
    },
    {
        slug: 'visbl',
        title: 'Visbl',
        context: 'Made at MEST, to be continued',
        brand: '#F59E0B',
        href: 'https://visbl-website-two.vercel.app/',
        linkLabel: 'See Visbl',
        role: 'built with a MEST team',
        summary: 'Inventory and money tracking for market traders, over WhatsApp.',
        skills: ['Market research', 'WhatsApp bots', 'AI vision'],
        images: [
            {
                src: visblPitchPoster,
                video: visblPitch,
                alt: 'Fatimah pitching Visbl at MEST, with a photo of a market on the screen behind her',
                caption: 'Pitching Visbl at MEST',
            },
            {
                src: visblShop,
                alt: 'Inside a clothing trader’s shop: jackets on hangers and folded stock in plastic on wooden shelves',
                caption: 'A trader’s shop, the kind Visbl was for',
                position: 'center 35%',
            },
        ],
    },
    {
        slug: 'deymove',
        title: 'Deymove',
        context: 'Made at MEST, first called Comeasy, to be continued',
        brand: '#5B95BE',
        href: 'https://www.deymove.co/',
        linkLabel: 'Visit deymove.co',
        role: 'my first idea at MEST',
        summary: 'Rush-hour commuting in Ghana, for the corporate workers who feel it most.',
        skills: ['Customer discovery', 'Problem validation'],
        images: [
            {
                src: deymoveQueue,
                alt: 'Two long lines of commuters waiting at a bus stop at dusk, stretching back down a dirt lot',
                caption: 'Rush hour at the bus stop, taken by me',
                position: 'center 45%',
            },
            {
                src: deymoveHero,
                alt: 'A woman in the back seat of a car in rush-hour traffic, from the Deymove website',
                caption: 'From deymove.co',
                position: 'center 60%',
            },
        ],
    },
];
