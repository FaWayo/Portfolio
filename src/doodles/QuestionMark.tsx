import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * QuestionMark — curiosity, uncertainty, things you're still figuring out.
 *
 * New. Not in doodle-components.jsx; required by brand-direction §10.
 */
export function QuestionMark({
    color = ACCENT,
    size = 110,
    animate = true,
    className,
    style,
    strokeWidth = 3.5,
}: DoodleProps & { size?: number }) {
    const dot = animate ? { animationDelay: '0.7s' } : undefined;

    return (
        <svg
            width={size * 0.77}
            height={size}
            viewBox="0 0 100 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M28 40C26 12 70 6 74 36C77 60 49 62 49 88" {...stroke(color, animate, strokeWidth)} />
            <path d="M49 110L49 111" {...stroke(color, animate, strokeWidth)} style={dot} />
        </svg>
    );
}

export default QuestionMark;