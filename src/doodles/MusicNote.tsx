import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * MusicNote — something sung rather than said.
 *
 * A single quaver (♪) as a margin doodle, not a glyph: a head that loops back
 * through itself instead of closing neatly, a stem that leans, a flag that
 * curls a little too far, and three flicks of sound off it. Struck, not filled,
 * so it writes itself on with the rest of the vocabulary.
 *
 * With `playing` it keeps time once drawn: it bops on a ~92 bpm beat, a bigger
 * bop every second beat, and the flicks flash out on each hit
 * (decision-log.md §38). Paused while off screen, still for reduced motion.
 *
 * First used after the hero's faith line, which is a lyric — the note says so
 * without a citation.
 *
 * `size` is the width; the drawing is 30×44. `delay` holds the draw back so it
 * can follow the text it sits beside.
 */
const BODY = [
    // Head, with a scribble back through it.
    'M14.5 35.5C15.2 38.6 11.6 41.2 8.6 40.4C6 39.7 6.1 36.4 8.6 35C11 33.6 14 33.4 14.5 35.5C14.9 37.2 12.4 38.8 10.2 38.6',
    // Stem.
    'M14.5 35.5C14.4 27.5 14.9 19.5 14.6 11.2',
    // Flag.
    'M14.6 11.2C18.8 12.6 22.6 15.8 22.4 20.6C22.3 22.4 21.4 23.9 20.2 24.8',
];

const FLICKS = [
    // Off the flag, and one off the other side, so a hit sounds both ways.
    'M23.6 6.2C25.6 7.4 26.9 9.4 27.2 11.8',
    'M25.8 15.4L28.4 16.6',
    'M6.2 24.6C4.8 22.8 4.3 20.6 4.8 18.4',
];

export function MusicNote({
    color = ACCENT,
    size = 26,
    animate = true,
    delay = 0,
    playing = false,
    className,
    style,
    strokeWidth = 2.4,
}: DoodleProps & { size?: number; delay?: number; playing?: boolean }) {
    // The draw-on runs on the paths; the beat runs on the groups, so the two
    // animations never fight over one element. The beat starts once the last
    // stroke has drawn — see `.note-playing` in style.css.
    const draw = (d: string, i: number) => (
        <path
            key={d}
            d={d}
            {...stroke(color, animate, strokeWidth)}
            style={animate ? { animationDelay: `${delay + i * 110}ms`, animationDuration: '0.9s' } : undefined}
        />
    );
    const beatStart = { '--beat-start': `${delay + 1300}ms` } as React.CSSProperties;

    return (
        <svg
            width={size}
            height={(size * 44) / 28}
            viewBox="1 0 30 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${playing ? 'note-playing ' : ''}overflow-visible ${className ?? ''}`}
            style={{ ...beatStart, ...style }}
            aria-hidden="true"
            focusable="false"
        >
            <g className="note-body">{BODY.map((d, i) => draw(d, i))}</g>
            <g className="note-flicks">{FLICKS.map((d, i) => draw(d, BODY.length + i))}</g>
        </svg>
    );
}

export default MusicNote;
