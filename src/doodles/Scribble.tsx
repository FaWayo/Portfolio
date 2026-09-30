import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * Scribble — casual notes and visual texture.
 *
 * New. Not in doodle-components.jsx; required by brand-direction §10.
 * Looser and lower-contrast than Underline: texture rather than emphasis.
 */
export function Scribble({
    color = ACCENT,
    width = 200,
    height = 60,
    animate = true,
    className,
    style,
    strokeWidth = 2.4,
}: DoodleProps & { width?: number; height?: number }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M8 40C24 12 40 12 46 34C52 56 68 54 74 32C80 10 96 14 100 34C106 54 122 52 128 30C134 8 150 12 154 32C160 52 178 50 192 26"
                {...stroke(color, animate, strokeWidth)}
            />
        </svg>
    );
}

export default Scribble;