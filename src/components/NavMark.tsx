import { ACCENT, stroke } from '@/doodles/shared';

/**
 * The mark under a nav word: one hand-drawn underline, the same for every word.
 *
 * ## One mark, not six
 *
 * The words used to carry a different gesture each — a circle on ME, a spark
 * on LIFE, a wave on JOURNAL, a speech-tailed circle on LET'S TALK. Each was
 * defensible alone, but hovering along the nav meant a different shape, a
 * different position and a different footprint on every word, which read as
 * inconsistency rather than personality (decision-log.md §30). The hand is
 * still here — the stroke is drawn, slightly uneven, and writes itself on — it
 * is just the same hand every time.
 *
 * ## Why this is not the library `Underline`
 *
 * `Underline` is drawn for a room, 190–240px wide, with two staggered strokes.
 * Under 13px caps those read as one broken line. This is a single stroke drawn
 * for a 100-unit band, sharing the library's `stroke()` so `pathLength="1000"`,
 * the round caps and the joins are identical.
 *
 * The SVG stretches to the word's width, so the path carries
 * `vector-effect="non-scaling-stroke"`: the curve stretches, the weight does
 * not, and "ME" and "LET'S TALK" get the same line.
 */

const PATH = 'M3 7C22 4 44 9 64 6C76 4.5 88 6.5 97 5';

export interface NavMarkProps {
    /** Whether its room is the current one. Drives visibility from CSS. */
    active: boolean;
    color?: string;
    className?: string;
}

export function NavMark({ active, color = ACCENT, className }: NavMarkProps) {
    return (
        <span
            aria-hidden="true"
            data-active={active ? 'true' : undefined}
            className={`nav-mark pointer-events-none absolute -inset-x-1 top-full h-2.5 ${className ?? ''}`}
        >
            <svg
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
                className="h-full w-full overflow-visible"
                focusable="false"
            >
                <path d={PATH} {...stroke(color, false, 2.5)} vectorEffect="non-scaling-stroke" />
            </svg>
        </span>
    );
}

export default NavMark;
