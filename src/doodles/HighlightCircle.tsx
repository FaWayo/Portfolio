import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * HighlightCircle — highlighting something.
 *
 * Source component defaulted to crimson #E53935. Crimson is gone from the brand
 * direction, so the default is now the room accent. See decision-log §6.
 */
export function HighlightCircle({
    color = ACCENT,
    size = 70,
    animate = true,
    className,
    style,
    strokeWidth = 3,
}: DoodleProps & { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M50 12C22 10 10 32 12 58C14 82 38 90 64 88C88 86 92 60 88 38C84 18 58 8 36 14C22 18 12 32 15 48"
                {...stroke(color, animate, strokeWidth)}
            />
        </svg>
    );
}

export default HighlightCircle;