import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * MusicNote — something sung rather than said.
 *
 * A single quaver (♪) as a margin doodle, not a glyph: a head that loops back
 * through itself instead of closing neatly, a stem that leans, a flag that
 * curls a little too far, and two flicks of sound off it. Struck, not filled,
 * so it writes itself on with the rest of the vocabulary.
 *
 * First used after the hero's faith line, which is a lyric — the note says so
 * without a citation.
 *
 * `size` is the width; the drawing is 28×44. `delay` holds the draw back so it
 * can follow the text it sits beside.
 */
const PATHS = [
    // Head, with a scribble back through it.
    'M14.5 35.5C15.2 38.6 11.6 41.2 8.6 40.4C6 39.7 6.1 36.4 8.6 35C11 33.6 14 33.4 14.5 35.5C14.9 37.2 12.4 38.8 10.2 38.6',
    // Stem.
    'M14.5 35.5C14.4 27.5 14.9 19.5 14.6 11.2',
    // Flag.
    'M14.6 11.2C18.8 12.6 22.6 15.8 22.4 20.6C22.3 22.4 21.4 23.9 20.2 24.8',
    // Flicks of sound, off the flag.
    'M23.6 6.2C25.6 7.4 26.9 9.4 27.2 11.8',
    'M25.8 15.4L28.4 16.6',
];

export function MusicNote({
    color = ACCENT,
    size = 26,
    animate = true,
    delay = 0,
    className,
    style,
    strokeWidth = 2.4,
}: DoodleProps & { size?: number; delay?: number }) {
    return (
        <svg
            width={size}
            height={(size * 44) / 28}
            viewBox="3 0 28 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            {PATHS.map((d, i) => (
                <path
                    key={d}
                    d={d}
                    {...stroke(color, animate, strokeWidth)}
                    style={animate ? { animationDelay: `${delay + i * 110}ms`, animationDuration: '0.9s' } : undefined}
                />
            ))}
        </svg>
    );
}

export default MusicNote;
