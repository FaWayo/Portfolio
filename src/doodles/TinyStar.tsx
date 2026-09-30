import type { DoodleProps } from './shared';
import { ACCENT, stroke } from './shared';

/**
 * TinyStar — occasional moments that feel special.
 *
 * New. Not in doodle-components.jsx; required by brand-direction §10.
 * Struck rather than filled so it draws on with everything else.
 */
export function TinyStar({
    color = ACCENT,
    size = 28,
    animate = true,
    className,
    style,
    strokeWidth = 2.6,
}: DoodleProps & { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M20 4C22 14 26 18 36 20C26 22 22 26 20 36C18 26 14 22 4 20C14 18 18 14 20 4Z"
                {...stroke(color, animate, strokeWidth)}
            />
        </svg>
    );
}

export default TinyStar;