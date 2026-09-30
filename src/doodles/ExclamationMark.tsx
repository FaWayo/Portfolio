import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * ExclamationMark — excitement, surprise, something that matters.
 *
 * New. Not in doodle-components.jsx; required by brand-direction §10.
 */
export function ExclamationMark({
    color = ACCENT,
    size = 110,
    animate = true,
    className,
    style,
    strokeWidth = 4,
}: DoodleProps & { size?: number }) {
    const dot = animate ? { animationDelay: '0.55s' } : undefined;

    return (
        <svg
            width={size * 0.71}
            height={size}
            viewBox="0 0 100 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M49 18C54 46 44 74 49 104" {...stroke(color, animate, strokeWidth)} />
            <path d="M49 126L49 127" {...stroke(color, animate, strokeWidth)} style={dot} />
        </svg>
    );
}

export default ExclamationMark;