import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * Heart — a small heart drawn in one go, the way you'd sign off a note: the
 * stroke overshoots where it began. First used after the signature on the
 * LET'S TALK postcard.
 */
export function Heart({ color = ACCENT, size = 22, animate = true, className, style, strokeWidth = 2.2 }: DoodleProps & { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M12.2 20.4C9 18 3.6 14.3 3.4 9.4 3.2 6.3 5.6 4.1 8.2 4.4c1.8.2 3.1 1.6 3.9 3.3.9-1.8 2.3-3.4 4.4-3.5 2.6-.1 4.6 2.2 4.2 5.1-.6 4.4-5.4 7.9-8.6 10.9-.3.3-.9.4-1.4.1"
                {...stroke(color, animate, strokeWidth)}
            />
        </svg>
    );
}

export default Heart;
